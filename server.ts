import express from "express";
import path from "path";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3002;

app.use(express.json());

// Path to store profiles
const DATA_DIR = path.join(process.cwd(), "data");
const PROFILES_FILE = path.join(DATA_DIR, "profiles.json");
const VIEWS_FILE = path.join(DATA_DIR, "views.json");

// Ensure data folder and file exists
async function initDb() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(PROFILES_FILE);
    } catch {
      await fs.writeFile(PROFILES_FILE, JSON.stringify({}, null, 2));
    }
    try {
      await fs.access(VIEWS_FILE);
    } catch {
      await fs.writeFile(VIEWS_FILE, JSON.stringify({ total: 0, pages: {} }, null, 2));
    }
  } catch (err) {
    console.error("Error initializing mock DB file:", err);
  }
}

const TELEGRAM_BOT_TOKEN = '8563426842:AAEuhg8EXmAV18NXtlAaiky0ZzWGvNXkJQU';
const TELEGRAM_CHAT_ID = '443575738';

async function sendTelegramNotification(message: string) {
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown"
      })
    });
  } catch (error) {
    console.error("Error sending Telegram notification:", error);
  }
}

// Lazy initialization of Gemini client
let aiInstance: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please manage it in Settings -> Secrets.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// Helper: sleep
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper: Call Gemini API with retries for transient 503/429/Unavailable errors
async function generateContentWithRetry(params: {
  model: string;
  contents: string | any[];
  config?: any;
}, maxRetries = 4, delayMs = 2000): Promise<any> {
  const ai = getAI();
  let lastError: any = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent(params);
      return response;
    } catch (error: any) {
      lastError = error;
      
      // Convert error to a string representation for robust matching
      let errorStr = "";
      try {
        errorStr = typeof error === 'string' ? error : (error.message || JSON.stringify(error) || String(error));
      } catch {
        errorStr = String(error);
      }

      const status = error.status || error.code || (errorStr.includes('503') ? 503 : null);
      const isTransient = 
        status === 503 || 
        status === 429 || 
        status === 'UNAVAILABLE' ||
        errorStr.includes('503') || 
        errorStr.includes('429') || 
        errorStr.includes('high demand') || 
        errorStr.includes('temporary') || 
        errorStr.includes('UNAVAILABLE');

      if (isTransient && attempt < maxRetries) {
        console.warn(`Gemini API call failed with transient error (attempt ${attempt}/${maxRetries}): ${errorStr}. Retrying in ${delayMs}ms...`);
        await sleep(delayMs);
        // Exponential backoff with a bit of randomness (jitter) to prevent thundering herd
        delayMs = Math.round(delayMs * 1.8 + Math.random() * 500);
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}

// Helper: load profiles
async function loadProfiles(): Promise<Record<string, any>> {
  await initDb();
  try {
    const data = await fs.readFile(PROFILES_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

// Helper: save profiles
async function saveProfiles(profiles: Record<string, any>) {
  await initDb();
  await fs.writeFile(PROFILES_FILE, JSON.stringify(profiles, null, 2), "utf-8");
}

// In-memory cache for views to avoid concurrent read-write issues
interface ViewsData {
  total: number;
  pages: Record<string, number>;
  ips: string[];
  pageIps: Record<string, string[]>;
}

let viewsCache: ViewsData | null = null;

async function loadViews(): Promise<ViewsData> {
  if (viewsCache) return viewsCache;
  await initDb();
  try {
    const data = await fs.readFile(VIEWS_FILE, "utf-8");
    const parsed = JSON.parse(data);
    viewsCache = {
      total: parsed.total || 0,
      pages: parsed.pages || {},
      ips: parsed.ips || [],
      pageIps: parsed.pageIps || {}
    };
    return viewsCache;
  } catch {
    viewsCache = { total: 0, pages: {}, ips: [], pageIps: {} };
    return viewsCache;
  }
}

async function saveViews(views: ViewsData) {
  viewsCache = views;
  await initDb();
  await fs.writeFile(VIEWS_FILE, JSON.stringify(views, null, 2), "utf-8");
}

// REST API endpoints

// 0. Record and get page/site views
app.post("/api/views", async (req, res) => {
  try {
    const { page } = req.body;
    const views = await loadViews();
    
    // Get client IP address (supporting proxy forwarding)
    const xForwardedFor = req.headers["x-forwarded-for"];
    let ip = "";
    if (typeof xForwardedFor === "string") {
      ip = xForwardedFor.split(",")[0].trim();
    } else if (Array.isArray(xForwardedFor)) {
      ip = xForwardedFor[0].trim();
    } else {
      ip = req.socket.remoteAddress || "";
    }
    
    if (!ip) {
      ip = "unknown";
    }
    
    // Track unique IP globally
    if (!views.ips.includes(ip)) {
      views.ips.push(ip);
      views.total = views.ips.length;
    }
    
    // Track unique IP per page
    if (page) {
      const pageKey = String(page);
      views.pageIps[pageKey] = views.pageIps[pageKey] || [];
      if (!views.pageIps[pageKey].includes(ip)) {
        views.pageIps[pageKey].push(ip);
        views.pages[pageKey] = views.pageIps[pageKey].length;
      }
    }
    
    await saveViews(views);
    res.json({ 
      success: true, 
      total: views.total, 
      pageViews: page ? (views.pages[String(page)] || 0) : 0 
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 1. Get profile by phone number (returns simple info if exists)
app.get("/api/profile/:phone", async (req, res) => {
  try {
    const { phone } = req.params;
    const cleanPhone = phone.trim().replace(/\s+/g, "");
    const profiles = await loadProfiles();
    const profile = profiles[cleanPhone];
    
    if (profile) {
      res.json({ success: true, exists: true, name: profile.name, surname: profile.surname, profile });
    } else {
      res.json({ success: true, exists: false });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 1.5. Delete profile data
app.delete("/api/profile/:phone", async (req, res) => {
  try {
    const { phone } = req.params;
    const cleanPhone = phone.trim().replace(/\s+/g, "");
    const profiles = await loadProfiles();
    
    if (profiles[cleanPhone]) {
      const deletedProfile = profiles[cleanPhone];
      delete profiles[cleanPhone];
      await saveProfiles(profiles);
      
      // Send Telegram Notification
      const tgMsg = `🗑️ *აიდი მოდელები: პროფილი წაიშალა* 👤\n\n` +
                    `• *სახელი:* ${deletedProfile.name} ${deletedProfile.surname}\n` +
                    `• *ტელეფონი:* \`${cleanPhone}\`\n` +
                    `• *დრო:* ${new Date().toLocaleString('ka-GE')}`;
      if (deletedProfile.name !== "სანი" || deletedProfile.surname !== "სანი") {
        sendTelegramNotification(tgMsg);
      }
      
      res.json({ success: true, message: "პროფილი წარმატებით წაიშალა" });
    } else {
      res.json({ success: true, message: "პროფილი უკვე წაშლილია" });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Create or Update a profile
app.post("/api/profile", async (req, res) => {
  try {
    const { name, surname, birthPlace, day, month, year, phone } = req.body;
    
    if (!name || !surname || !birthPlace || !day || !month || !year || !phone) {
      return res.status(400).json({ success: false, error: "ყველა ველი სავალდებულოა!" });
    }

    const cleanPhone = phone.trim().replace(/\s+/g, "");
    const profiles = await loadProfiles();
    
    const newProfile = {
      phone: cleanPhone,
      name: name.trim(),
      surname: surname.trim(),
      birthPlace: birthPlace.trim(),
      day: Number(day),
      month: Number(month),
      year: Number(year),
      createdAt: new Date().toISOString()
    };

    profiles[cleanPhone] = newProfile;
    await saveProfiles(profiles);

    // Send Telegram Notification on profile save/update
    const geoMonths = ["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"];
    const monthLabel = geoMonths[Number(month) - 1] || month;
    const tgMsg = `👤 *აიდი მოდელები: ახალი პროფილი / განახლება* 🌌\n\n` +
                  `• *სახელი:* ${name.trim()}\n` +
                  `• *გვარი:* ${surname.trim()}\n` +
                  `• *ტელეფონი:* \`${cleanPhone}\`\n` +
                  `• *დაბადების თარიღი:* ${day} ${monthLabel}, ${year}\n` +
                  `• *დაბადების ადგილი:* ${birthPlace.trim()}\n` +
                  `• *დრო:* ${new Date().toLocaleString('ka-GE')}`;
    if (name.trim() !== "სანი" || surname.trim() !== "სანი") {
      sendTelegramNotification(tgMsg);
    }

    res.json({ success: true, profile: newProfile });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. Generate specific Zodiac or spiritual reading
app.post("/api/generate-reading", async (req, res) => {
  const calcLabels: { [key: string]: string } = {
    horoscope: "დასავლური ჰოროსკოპი",
    enneagram: "ენიაგრამა",
    psychomatrix: "ფსიქო მატრიცა",
    numerology: "ნუმეროლოგია",
    human_design: "ადამიანის დიზაინი",
    vedic: "ვედური ასტროლოგია",
    bazi: "ბა-ძი (BaZi)",
    archetype: "არქეტიპული ანალიზი"
  };

  try {
    const { phone, type } = req.body;
    if (!phone || !type) {
      return res.status(400).json({ success: false, error: "ტელეფონის ნომერი და ტიპი სავალდებულოა" });
    }

    const cleanPhone = phone.trim().replace(/\s+/g, "");
    const profiles = await loadProfiles();
    const profile = profiles[cleanPhone];

    if (!profile) {
      return res.status(404).json({ success: false, error: "პროფილი ამ ნომრით ვერ მოიძებნა" });
    }

    // Send Telegram Notification for calculation request
    const typeLabel = calcLabels[type] || type;
    const tgMsg = `🔮 *აიდი მოდელები: ანალიზის გათვლა!* 🌌\n\n` +
                  `• *მომხმარებელი:* ${profile.name} ${profile.surname}\n` +
                  `• *ტელეფონი:* \`${cleanPhone}\`\n` +
                  `• *არჩეული თემა:* *${typeLabel}*\n` +
                  `• *დრო:* ${new Date().toLocaleString('ka-GE')}`;
    
    const isTestUser = profile.name === "სანი" && profile.surname === "სანი";
    if (!isTestUser) {
      sendTelegramNotification(tgMsg);
    }

    if (isTestUser) {
      return res.json({
        success: true,
        type,
        title: `${typeLabel} (სატესტო რეჟიმი)`,
        content: `### 🔮 სატესტო ანალიზი: ${profile.name} ${profile.surname}\n\n` +
                 `ეს არის **სატესტო რეჟიმი** გვერდების და ფორმების მუშაობის სტატუსის შესამოწმებლად.\n\n` +
                 `* **სისტემის სტატუსი:** გამართული (OK)\n` +
                 `* **მონაცემთა ბაზა (JSON):** წარმატებით დაუკავშირდა (პროფილი ნაპოვნია).\n` +
                 `* **ანალიზის ტიპი:** \`${type}\` (${typeLabel}).\n` +
                 `* **ტელეფონის ნომერი:** \`${cleanPhone}\`.\n\n` +
                 `Gemini AI და Telegram-ის შეტყობინებები სატესტო რეჟიმში შეჩერებულია, რათა თავიდან აიცილოთ ზედმეტი მოთხოვნები. ყველა ფორმა და ვიზუალიზაცია მუშაობს გამართულად!`
      });
    }

    let promptTitle = "";
    let systemInstruction = "შენ ხარ პროფესიონალი ასტროლოგი, ფსიქოლოგი და ეზოთერიკული სწავლოებების ექსპერტი. პასუხი გაეცი ქართულ ენაზე, მარკდაუნის (Markdown) ლამაზი ფორმატირებით, გამოიყენე სათაურები, სიები და სტრუქტურირებული პარაგრაფები. პასუხი უნდა იყოს ძალიან საინტერესო, პოზიტიური, ღრმა და რჩევებით სავსე.";
    let prompt = "";

    const userProfileStr = `სახელი: ${profile.name} ${profile.surname}, დაბადების ადგილი: ${profile.birthPlace}, დაბადების თარიღი: ${profile.day}/${profile.month}/${profile.year}.`;

    switch (type) {
      case "horoscope":
        promptTitle = "დასავლური ჰოროსკოპი (ზოდიაქო)";
        prompt = `დაითვალე და დაადგინე ზოდიაქოს ნიშანი დაბადების თარიღის მიხედვით: ${userProfileStr}.
შემდეგ შეადგინე დასავლური ჰოროსკოპის სრული ანალიზი:
1. ზოდიაქოს ნიშანი და ელემენტი (ცეცხლი, მიწა, ჰაერი, წყალი)
2. ძირითადი ხასიათის თვისებები (დადებითი და უარყოფითი მხარეები)
3. მიმდინარე კოსმოსური ტრენდები და განვითარების გზები შენი დაბადების რუკის მიხედვით.
4. პრაქტიკული რჩევები ყოველდღიური ცხოვრებისთვის.`;
        break;

      case "enneagram":
        promptTitle = "ენიაგრამა (Enneagram)";
        prompt = `გამოთვალე და შეადგინე ენიაგრამის შესაძლო ტიპის ანალიზი ამ პიროვნებისთვის: ${userProfileStr}.
ვინაიდან არ გვაქვს ტესტი, დაბადების თარიღის ენერგეტიკული ვიბრაციითა და ასტროლოგიური მახასიათებლებით განსაზღვრე მისი სავარაუდო დომინანტური ტიპი. დეტალურად აღწერე:
1. ენიაგრამის ტიპი (დასახელება, ნომერი)
2. ძირითადი შიში და ძირითადი სურვილი კორონარულ ფსიქოტიპში
3. სტრესისა და განვითარების (ინტეგრაცია/დეზინტეგრაცია) მიმართულებები
4. რეკომენდაციები პიროვნული ზრდისთვის.`;
        break;

      case "psychomatrix":
        promptTitle = "ფსიქომატრიცა (პითაგორას კვადრატი)";
        prompt = `ამ მონაცემების მიხედვით: ${userProfileStr}
წარმოადგინე მათემატიკური და ფსიქოლოგიური ანალიზი პითაგორას ფსიქომატრიცის მიხედვით. 
გთხოვთ დაიანგარიშო პითაგორას სპეციალური რიცხვები (ჯამები და გამოკლებები) და ააგო სრული კვადრატის განმარტება:
1. ხასიათი (1-იანები)
2. ენერგია (2-იანები)
3. ინტერესი (3-იანები)
4. ჯანმრთელობა (4-იანები)
5. ინტუიცია (5-იანები)
6. შრომისმოყვარეობა (6-იანები)
7. იღბალი (7-იანები)
8. ვალდებულება/პასუხისმგებლობა (8-იანები)
9. მეხსიერება/ინტელექტი (9-იანები)
მიეცი თითოეული სექტორის ხარისხის შეფასება და ზოგადი ნუმეროლოგიური ფსიქოტიპის პორტრეტი.`;
        break;

      case "numerology":
        promptTitle = "ნუმეროლოგია";
        prompt = `დაითვალე დაბადების თარიღის მიხედვით ბედისწერის რიცხვი (Life Path Number), მაგალითად ყველა ციფრის შეჯამებით ერთ ციფრამდე (ან 11, 22, 33 მასტერ რიცხვებამდე) შემდეგი მონაცემების საფუძველზე: ${userProfileStr}.
აღწერე:
1. ბედისწერის რიცხვი და მისი ზოგადი მნიშვნელობა.
2. ცხოვრებისეული მისია და გამოწვევები.
3. ყველაზე შესაფერისი კარიერული მიმართულებები.
4. სასიყვარულო და პარტნიორული ვიბრაციები.`;
        break;

      case "human_design":
        promptTitle = "ადამიანის დიზაინი (Human Design)";
        prompt = `დაბადების თარიღის და ადგილის მიხედვით გააკეთე ადამიანის დიზაინის (Human Design) შეფასება: ${userProfileStr}.
აღწერე მისი სავარაუდო სტრუქტურა კოსმოსური ტრანზიტებით:
1. ენერგეტიკული ტიპი (მაგ: გენერატორი, პროექტორი, მანიფესტორი, რეფლექტორი, მანიფესტირებადი გენერატორი)
2. პროფილი (მაგ: 1/3, 2/4, 3/5, 4/6, 5/1 და ა.შ.) და მისი მნიშვნელობა
3. სტრატეგია და შინაგანი ავტორიტეტი გადაწყვეტილების მისაღებად
4. ცხოვრებისეული თემა (გზა) და "არასაკუთარი თავის" (Not-Self) თემა.`;
        break;

      case "vedic":
        promptTitle = "ვედური ასტროლოგია (Jyotish)";
        prompt = `ამ მონაცემების მიხედვით: ${userProfileStr}
გააკეთე ვედური ასტროლოგიის (ჯიოტიში) მოკლე განხილვა:
1. მთვარის ნიშანი (რაში) და მისი გავლენა ქვეცნობიერზე
2. სავარაუდო ნაკშატრა (ვარსკვლავური სახლი) და მისი მმართველი პლანეტა
3. კარმული ამოცანები (რაჰუ და კეტუს მდგომარეობა) და სულიერი გაკვეთილები.
4. მიმართულება სულიერი ბედნიერებისთვის (პურუშართა).`;
        break;

      case "bazi":
        promptTitle = "ბა-ძი (BaZi - ბედისწერის ოთხი სვეტი)";
        prompt = `მონაცემების საფუძველზე: ${userProfileStr}
გააკეთე ჩინური ასტროლოგიის BaZi ანალიზი:
1. წლობრივი ცხოველი (დედამიწის ტოტი) და მისი გავლენა გარე სამყაროსთან კონტაქტზე
2. ელემენტების ბალანსი (ხე, ცეცხლი, მიწა, ლითონი, წყალი) და რომელი ელემენტია დომინანტი ან დეფიციტური.
3. დღის მბრძანებელი (Day Master) - პიროვნების ბირთვი.
4. იღბლიანი პერიოდები და რჩევები ენერგეტიკული ბალანსის მხარდასაჭერად.`;
        break;

      case "archetype":
        promptTitle = "არქეტიპული ანალიზი (იუნგის მიხედვით)";
        prompt = `დაბადების თარიღის და ასტრო-ნუმეროლოგიური ვიბრაციების გათვალისწინებით: ${userProfileStr}
განსაზღვრე მისი წამყვანი ფსიქოლოგიური არქეტიპები კარლ იუნგის თორმეტი არქეტიპიდან (მაგ. გმირი, მზრუნველი, შემოქმედი, მეამბოხე, ბრძენი და ა.შ.):
1. წამყვანი არქეტიპი და მისი გამოვლინება ხასიათში.
2. ჩრდილოვანი მხარე (Shadow self) და მასთან მუშაობის გზები.
3. შინაგანი მოტივატორი და ღირებულებები.
4. ცხოვრებისეული როლი და განვითარების პოტენციალი.`;
        break;

      default:
        return res.status(400).json({ success: false, error: "არასწორი ტიპი" });
    }

    const response = await generateContentWithRetry({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 1.0,
      }
    });

    res.json({
      success: true,
      type,
      title: promptTitle,
      content: response.text || "ვერ მოხერხდა პასუხის გენერირება."
    });

  } catch (error: any) {
    const cleanPhone = req.body?.phone ? req.body.phone.trim().replace(/\s+/g, "") : "უცნობი";
    const typeLabel = req.body?.type ? (calcLabels[req.body.type] || req.body.type) : "უცნობი";
    const tgMsg = `🚨 *აიდი მოდელები: შეცდომა ანალიზის გენერირებისას!* ⚠️\n\n` +
                  `• *ტელეფონი:* \`${cleanPhone}\`\n` +
                  `• *ანალიზის ტიპი:* *${typeLabel}*\n` +
                  `• *შეცდომა:* \`${error.message || error}\`\n` +
                  `• *დრო:* ${new Date().toLocaleString('ka-GE')}`;
    sendTelegramNotification(tgMsg);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3.5. Generate Balance Model (4 Dimensions) analysis using Gemini
app.post("/api/balance-analysis", async (req, res) => {
  try {
    const { bodyScore, achievementScore, contactScore, futureScore, phone } = req.body;
    
    if (bodyScore === undefined || achievementScore === undefined || contactScore === undefined || futureScore === undefined) {
      return res.status(400).json({ success: false, error: "ყველა სფეროს პროცენტი სავალდებულოა!" });
    }

    const total = Number(bodyScore) + Number(achievementScore) + Number(contactScore) + Number(futureScore);
    if (total !== 100) {
      return res.status(400).json({ success: false, error: "პროცენტების ჯამი აუცილებლად უნდა იყოს 100%!" });
    }

    let userProfileStr = "";
    let isTestUser = false;
    
    if (phone) {
      const cleanPhone = phone.trim().replace(/\s+/g, "");
      const profiles = await loadProfiles();
      const profile = profiles[cleanPhone];
      if (profile) {
        isTestUser = profile.name === "სანი" && profile.surname === "სანი";
        userProfileStr = `მომხმარებლის სახელი: ${profile.name} ${profile.surname}, დაბადების თარიღი: ${profile.day}/${profile.month}/${profile.year}.`;
        
        // Send Telegram Notification
        const tgMsg = `⚖️ *ბალანსის მოდელი: ტესტირება დასრულებულია* 📊\n\n` +
                      `• *მომხმარებელი:* ${profile.name} ${profile.surname}\n` +
                      `• *ტელეფონი:* \`${cleanPhone}\`\n\n` +
                      `*ენერგიის გადანაწილება (ბალანსი):*\n` +
                      `• 🟢 *სხეული/ჯანმრთელობა:* ${bodyScore}%\n` +
                      `• 🔵 *საქმე/მიღწევები:* ${achievementScore}%\n` +
                      `• 🔴 *კონტაქტები/ურთიერთობები:* ${contactScore}%\n` +
                      `• 🟣 *მომავალი/ფანტაზია:* ${futureScore}%\n\n` +
                      `• *დრო:* ${new Date().toLocaleString('ka-GE')}`;
        if (!isTestUser) {
          sendTelegramNotification(tgMsg);
        }
      }
    }

    if (isTestUser) {
      return res.json({
        success: true,
        title: "ცხოვრების ბალანსის მოდელის ანალიზი (სატესტო)",
        content: `### ⚖️ ცხოვრების ბალანსის მოდელის სატესტო ანალიზი\n\n` +
                 `ეს არის **სატესტო რეჟიმი** ბალანსის ფორმისა და ვიზუალიზაციის შესამოწმებლად.\n\n` +
                 `#### 📊 თქვენ მიერ შეყვანილი ენერგიის ბალანსი:\n` +
                 `* 🟢 **სხეული/ჯანმრთელობა:** ${bodyScore}%\n` +
                 `* 🔵 **საქმე/მიღწევები:** ${achievementScore}%\n` +
                 `* 🔴 **კონტაქტები/ურთიერთობები:** ${contactScore}%\n` +
                 `* 🟣 **მომავალი/ფანტაზია:** ${futureScore}%\n\n` +
                 `* **სისტემის სტატუსი:** გამართული (OK)\n` +
                 `* **Gemini AI:** გვერდი ავლილია სატესტო რეჟიმისთვის.\n` +
                 `* **Telegram შეტყობინებები:** დაბლოკილია სატესტო რეჟიმისთვის.\n\n` +
                 `ყველა ფორმა, დიაგრამის გამოთვლა და ანალიზის მოდული მუშაობს იდეალურად!`
      });
    }

    const systemInstruction = "შენ ხარ პროფესიონალი პოზიტიური ფსიქოთერაპევტი და Nossrat Peseschkian-ის ოთხი სფეროს ბალანსის მოდელის ექსპერტი. პასუხი გაეცი ქართულ ენაზე, მარკდაუნის (Markdown) ლამაზი ფორმატირებით. პასუხი უნდა იყოს ძალიან სიღრმისეული, მხარდამჭერი, ემპათიური და პრაქტიკული რეკომენდაციებით სავსე. მიმართე მომხმარებელს მეგობრულად და პროფესიონალურად.";
    
    const prompt = `ჩაატარე სიღრმისეული ფსიქოლოგიური ანალიზი პოზიტიური ფსიქოთერაპიის ბალანსის მოდელის მიხედვით.
${userProfileStr ? `მონაცემები: ${userProfileStr}\n` : ""}
ენერგიის განაწილება ოთხ სფეროზე არის შემდეგი:
- სხეული / ჯანმრთელობა (ძილი, კვება, ფიზიკური აქტივობა, დასვენება): ${bodyScore}% (იდეალურია 25%)
- მიღწევები / სამუშაო (კარიერა, სწავლა, ფინანსები, საოჯახო საქმეები): ${achievementScore}% (იდეალურია 25%)
- კონტაქტები / ურთიერთობები (ოჯახი, მეგობრები, სოციუმი, პარტნიორი): ${contactScore}% (იდეალურია 25%)
- მომავალი / ფანტაზია (სამომავლო გეგმები, მედიტაცია, სულიერი პრაქტიკა, ცხოვრების საზრისი): ${futureScore}% (იდეალურია 25%)

გთხოვთ, შეადგინო სიღრმისეული ანალიზი:
1. **ამჟამინდელი მდგომარეობის დეტალური ფსიქოლოგიური სურათი**: როგორ მოქმედებს ენერგიის ეს განაწილება მომხმარებლის ყოველდღიურობაზე, მენტალურ ჰიგიენასა და ემოციურ ფონზე.
2. **დისბალანსის წერტილები და მათი მიზეზები**: რომელი სფეროა ყველაზე მეტად გადატვირთული (ჰიპერ-კომპენსაცია) და სად არის რესურსების დეფიციტი (ჰიპო-კომპენსაცია).
3. **პოტენციური ფსიქოსომატური რისკები**: თუ სხეულის ან სხვა სფერო უგულებელყოფილია, რა სახის ფსიქოსომატური რეაქციები შეიძლება გამოვლინდეს.
4. **ნაბიჯ-ნაბიჯ სტრატეგია წონასწორობის აღდგენისთვის**: მინიმუმ 3-4 ძალიან კონკრეტული, ყოველდღიურად განხორციელებადი პრაქტიკული რეკომენდაცია თითოეული პრობლემური სფეროს ჰარმონიზაციისთვის.`;

    const response = await generateContentWithRetry({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.95,
      }
    });

    res.json({
      success: true,
      title: "ცხოვრების ბალანსის მოდელის ანალიზი",
      content: response.text || "ვერ მოხერხდა ანალიზის გენერირება."
    });

  } catch (error: any) {
    const cleanPhone = req.body?.phone ? req.body.phone.trim().replace(/\s+/g, "") : "უცნობი";
    const tgMsg = `🚨 *ბალანსის მოდელი: შეცდომა ანალიზისას!* ⚠️\n\n` +
                  `• *ტელეფონი:* \`${cleanPhone}\`\n` +
                  `• *შეცდომა:* \`${error.message || error}\`\n` +
                  `• *დრო:* ${new Date().toLocaleString('ka-GE')}`;
    sendTelegramNotification(tgMsg);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. Generate compatibility analysis between two registered phones
app.post("/api/compatibility", async (req, res) => {
  try {
    const { phoneA, phoneB } = req.body;
    if (!phoneA || !phoneB) {
      return res.status(400).json({ success: false, error: "ორივე ტელეფონის ნომერი სავალდებულოა" });
    }

    const cleanA = phoneA.trim().replace(/\s+/g, "");
    const cleanB = phoneB.trim().replace(/\s+/g, "");

    const profiles = await loadProfiles();
    const profileA = profiles[cleanA];
    const profileB = profiles[cleanB];

    if (!profileA) {
      return res.status(400).json({ success: false, error: `პირველი მომხმარებელი (${phoneA}) ვერ მოიძებნა. ჯერ გაიარეთ რეგისტრაცია.` });
    }
    if (!profileB) {
      return res.status(404).json({ success: false, error: `მეორე მომხმარებელი (${phoneB}) ვერ მოიძებნა. გაუზიარეთ აპლიკაცია და სთხოვეთ შეავსოს.` });
    }

    const isTestUser = (profileA.name === "სანი" && profileA.surname === "სანი") || 
                       (profileB.name === "სანი" && profileB.surname === "სანი");

    // Send Telegram Notification for compatibility check
    const tgMsg = `👩‍❤️‍👨 *აიდი მოდელები: თავსებადობის გათვლა!* 💕\n\n` +
                  `• *მომხმარებელი A:* ${profileA.name} ${profileA.surname} (\`${cleanA}\`)\n` +
                  `• *მომხმარებელი B:* ${profileB.name} ${profileB.surname} (\`${cleanB}\`)\n` +
                  `• *დრო:* ${new Date().toLocaleString('ka-GE')}`;
    if (!isTestUser) {
      sendTelegramNotification(tgMsg);
    }

    if (isTestUser) {
      return res.json({
        success: true,
        profileA,
        profileB,
        compatibilityScore: 99,
        dimensions: { astrological: 99, psychological: 99, vibrational: 99, karmic: 99 },
        narrative: `### 👩‍❤️‍👨 სატესტო თავსებადობის ანალიზი\n\n` +
                   `ეს არის **სატესტო რეჟიმი** თავსებადობის გვერდის შესამოწმებლად.\n\n` +
                   `* **მომხმარებელი A:** ${profileA.name} ${profileA.surname}\n` +
                   `* **მომხმარებელი B:** ${profileB.name} ${profileB.surname}\n` +
                   `* **სისტემის სტატუსი:** გამართული (OK)\n` +
                   `* **თავსებადობის ქულა:** 99%\n\n` +
                   `Gemini AI და Telegram-ის შეტყობინებები სატესტო რეჟიმში შეჩერებულია. ყველა ფუნქცია და გამოთვლა მუშაობს გამართულად!`
      });
    }

    const systemInstruction = "შენ ხარ პროფესიონალი ურთიერთობების ფსიქოლოგი და სინასტრიული ასტროლოგიის უმაღლესი კლასის ექსპერტი. პასუხი გაეცი ქართულ ენაზე, მარკდაუნის (Markdown) ლამაზი ფორმატირებით. პასუხი უნდა იყოს ძალიან ინფორმაციული, მხარდამჭერი, საინტერესო, პრაქტიკული და გულახდილი.";
    
    // JSON schema for output compatibility scores
    const jsonPrompt = `შეადარე ორი პიროვნება:
პირი ა: სახელი: ${profileA.name} ${profileA.surname}, დაბადების თარიღი: ${profileA.day}/${profileA.month}/${profileA.year}, ადგილი: ${profileA.birthPlace}
პირი ბ: სახელი: ${profileB.name} ${profileB.surname}, დაბადების თარიღი: ${profileB.day}/${profileB.month}/${profileB.year}, ადგილი: ${profileB.birthPlace}

გამოთვალე თავსებადობის ქულები (0-დან 100-მდე) შემდეგ განზომილებებში:
1. ასტროლოგიური თავსებადობა (astrological)
2. ფსიქოლოგიური და ენიაგრამული თავსებადობა (psychological)
3. ვიბრაციული და ნუმეროლოგიური თავსებადობა (vibrational)
4. კარმული და ბედისწერის თავსებადობა (karmic)
5. საერთო ჯამური თავსებადობის პროცენტი (compatibilityScore)

ასევე დაწერე დეტალური ანალიზი (narrative) ქართულ ენაზე, რომელიც მოიცავს:
- ძლიერ კავშირებს და საერთო მხარეებს
- შესაძლო კონფლიქტურ ზონებს და გამოწვევებს
- რეკომენდაციებს ერთად ჰარმონიული თანაცხოვრების თუ მეგობრობისთვის.

დააბრუნე პასუხი აუცილებლად JSON ფორმატში, შემდეგი სტრუქტურით:
{
  "compatibilityScore": number,
  "dimensions": {
    "astrological": number,
    "psychological": number,
    "vibrational": number,
    "karmic": number
  },
  "narrative": string
}
`;

    const response = await generateContentWithRetry({
      model: "gemini-2.5-flash",
      contents: jsonPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            compatibilityScore: { type: Type.INTEGER, description: "საერთო თავსებადობის ქულა 0-100" },
            dimensions: {
              type: Type.OBJECT,
              properties: {
                astrological: { type: Type.INTEGER },
                psychological: { type: Type.INTEGER },
                vibrational: { type: Type.INTEGER },
                karmic: { type: Type.INTEGER }
              },
              required: ["astrological", "psychological", "vibrational", "karmic"]
            },
            narrative: { type: Type.STRING, description: "დეტალური ფსიქოლოგიური და ასტროლოგიური განმარტება ქართულად" }
          },
          required: ["compatibilityScore", "dimensions", "narrative"]
        }
      }
    });

    const resultText = response.text || "{}";
    const data = JSON.parse(resultText);

    res.json({
      success: true,
      profileA,
      profileB,
      compatibilityScore: data.compatibilityScore || 75,
      dimensions: data.dimensions || { astrological: 70, psychological: 80, vibrational: 75, karmic: 70 },
      narrative: data.narrative || "შეცდომა ანალიზის გენერირებისას."
    });

  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Proxy endpoint for n8n AI Chat Agent to avoid CORS issues and protect webhook URL
app.post("/api/n8n-chat", async (req, res) => {
  try {
    const { message, sessionId, sourceUrl } = req.body;
    
    if (!message) {
      return res.status(400).json({ success: false, error: "შეტყობინება ცარიელია" });
    }

    const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://meticulous-oyster.pikapod.net/webhook/idc-website-chat';

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        sessionId,
        sourceUrl,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("n8n webhook response error:", errorText);
      return res.status(response.status).json({ success: false, error: "ვერ მოხერხდა n8n სერვერთან დაკავშირება" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error: any) {
    console.error("Error in n8n-chat proxy:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Setup Vite middleware for development, serve index.html for unknown routes
async function startServer() {
  await initDb();

  if (process.env.NODE_ENV !== "production" && !process.env.RENDER) {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        watch: {
          ignored: ['**/data/**']
        }
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
