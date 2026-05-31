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

// Ensure data folder and file exists
async function initDb() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(PROFILES_FILE);
    } catch {
      await fs.writeFile(PROFILES_FILE, JSON.stringify({}, null, 2));
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

// REST API endpoints

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
      delete profiles[cleanPhone];
      await saveProfiles(profiles);
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
    const tgMsg = `👤 *იდენტობის მატრიცა: ახალი პროფილი / განახლება* 🌌\n\n` +
                  `• *სახელი:* ${name.trim()}\n` +
                  `• *გვარი:* ${surname.trim()}\n` +
                  `• *ტელეფონი:* \`${cleanPhone}\`\n` +
                  `• *დაბადების თარიღი:* ${day} ${monthLabel}, ${year}\n` +
                  `• *დაბადების ადგილი:* ${birthPlace.trim()}\n` +
                  `• *დრო:* ${new Date().toLocaleString('ka-GE')}`;
    sendTelegramNotification(tgMsg);

    res.json({ success: true, profile: newProfile });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. Generate specific Zodiac or spiritual reading
app.post("/api/generate-reading", async (req, res) => {
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
    const typeLabel = calcLabels[type] || type;
    const tgMsg = `🔮 *იდენტობის მატრიცა: ანალიზის გათვლა!* 🌌\n\n` +
                  `• *მომხმარებელი:* ${profile.name} ${profile.surname}\n` +
                  `• *ტელეფონი:* \`${cleanPhone}\`\n` +
                  `• *არჩეული თემა:* *${typeLabel}*\n` +
                  `• *დრო:* ${new Date().toLocaleString('ka-GE')}`;
    sendTelegramNotification(tgMsg);

    const ai = getAI();
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

    const response = await ai.models.generateContent({
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

    const ai = getAI();
    let userProfileStr = "";
    
    if (phone) {
      const cleanPhone = phone.trim().replace(/\s+/g, "");
      const profiles = await loadProfiles();
      const profile = profiles[cleanPhone];
      if (profile) {
        userProfileStr = `მომხმარებლის სახელი: ${profile.name} ${profile.surname}, დაბადების თარიღი: ${profile.day}/${profile.month}/${profile.year}.`;
        
        // Send Telegram Notification
        const tgMsg = `⚖️ *ცხოვრების განზომილება: ტესტირება დასრულებულია* 📊\n\n` +
                      `• *მომხმარებელი:* ${profile.name} ${profile.surname}\n` +
                      `• *ტელეფონი:* \`${cleanPhone}\`\n\n` +
                      `*ენერგიის გადანაწილება (ბალანსი):*\n` +
                      `• 🟢 *სხეული/ჯანმრთელობა:* ${bodyScore}%\n` +
                      `• 🔵 *საქმე/მიღწევები:* ${achievementScore}%\n` +
                      `• 🔴 *კონტაქტები/ურთიერთობები:* ${contactScore}%\n` +
                      `• 🟣 *მომავალი/ფანტაზია:* ${futureScore}%\n\n` +
                      `• *დრო:* ${new Date().toLocaleString('ka-GE')}`;
        sendTelegramNotification(tgMsg);
      }
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

    const response = await ai.models.generateContent({
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

    const ai = getAI();
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

    const response = await ai.models.generateContent({
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
