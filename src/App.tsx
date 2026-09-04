import { useState, useEffect } from "react";
import { getProfile, generateReading, deleteProfile, saveProfile } from "./lib/api";
import { BirthProfile, CalculationType, ReadingResponse } from "./types";
import { ProfileForm } from "./components/ProfileForm";
import { API_URLS } from "./config";
import { ModelCatalog } from "./components/ModelCatalog";
import { CompatibilityPanel } from "./components/CompatibilityPanel";
import { Sparkles, RefreshCw, MessageSquare, Edit3, UserCheck, Star, ShieldAlert, ArrowLeft, Send, Facebook, Link, Share2, Smartphone, MessageCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";

const getTarotIllustration = (type: CalculationType) => {
  switch (type) {
    case CalculationType.HOROSCOPE:
      return (
        <svg className="w-12 h-12 text-[#E0AC6B]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="50" cy="50" r="40" strokeDasharray="3 3" opacity="0.4" />
          <circle cx="50" cy="50" r="28" strokeWidth="0.8" opacity="0.6" />
          <path d="M50 25 A 25 25 0 0 1 75 50 A 25 25 0 0 0 50 25" fill="#E0AC6B" fillOpacity="0.25" />
          <circle cx="50" cy="50" r="10" fill="currentColor" fillOpacity="0.1" />
          <path d="M50 15 L50 20 M50 80 L50 85 M15 50 L20 50 M80 50 L85 50" />
          <path d="M50 35 L48 44 L39 46 L48 48 L50 57 L52 48 L61 46 L52 44 Z" fill="currentColor" />
          <circle cx="28" cy="28" r="1.5" fill="currentColor" />
          <circle cx="72" cy="72" r="1" fill="currentColor" />
          <circle cx="30" cy="68" r="1.2" fill="currentColor" />
          <circle cx="70" cy="30" r="1.5" fill="currentColor" />
        </svg>
      );
    case CalculationType.ENNEAGRAM:
      return (
        <svg className="w-12 h-12 text-[#E0AC6B]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="50" cy="50" r="42" opacity="0.5" />
          <circle cx="50" cy="50" r="45" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
          <path d="M50 8 L86 72 L14 72 Z" strokeWidth="1.2" />
          <path d="M50 92 L86 28 L14 28 Z" strokeWidth="0.8" opacity="0.4" />
          <circle cx="50" cy="50" r="14" strokeWidth="0.8" strokeDasharray="4 2" fill="currentColor" fillOpacity="0.1" />
          <circle cx="50" cy="8" r="2.5" fill="currentColor" />
          <circle cx="86" cy="72" r="2.5" fill="currentColor" />
          <circle cx="14" cy="72" r="2.5" fill="currentColor" />
          <line x1="50" y1="8" x2="50" y2="92" strokeWidth="0.5" opacity="0.3" />
          <line x1="14" y1="72" x2="86" y2="28" strokeWidth="0.5" opacity="0.3" />
          <line x1="86" y1="72" x2="14" y2="28" strokeWidth="0.5" opacity="0.3" />
        </svg>
      );
    case CalculationType.PSYCHOMATRIX:
      return (
        <svg className="w-12 h-12 text-[#E0AC6B]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="15" y="15" width="70" height="70" rx="10" strokeDasharray="4 4" opacity="0.3" />
          <path d="M15 38 H85 M15 62 H85 M38 15 V85 M62 15 V85" strokeWidth="0.8" opacity="0.5" />
          <path d="M50 50 A 5 5 0 0 1 55 50 A 10 10 0 0 1 45 50 A 20 20 0 0 1 65 50 A 30 30 0 0 1 35 50 A 40 40 0 0 1 75 50" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
          <circle cx="38" cy="38" r="2" fill="currentColor" />
          <circle cx="62" cy="62" r="2" fill="currentColor" />
          <circle cx="38" cy="62" r="1.5" fill="currentColor" opacity="0.7" />
          <circle cx="62" cy="38" r="1.5" fill="currentColor" opacity="0.7" />
          <circle cx="50" cy="50" r="3" fill="#E0AC6B" className="animate-pulse" />
        </svg>
      );
    case CalculationType.NUMEROLOGY:
      return (
        <svg className="w-12 h-12 text-[#E0AC6B]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="40" cy="50" r="24" opacity="0.6" />
          <circle cx="60" cy="50" r="24" opacity="0.6" />
          <circle cx="50" cy="50" r="38" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" />
          <path d="M35 50 C 35 40, 47 40, 50 50 C 53 60, 65 60, 65 50 C 65 40, 53 40, 50 50 C 47 60, 35 60, 35 50 Z" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
          <line x1="50" y1="12" x2="50" y2="25" strokeWidth="0.8" />
          <line x1="50" y1="75" x2="50" y2="88" strokeWidth="0.8" />
          <line x1="12" y1="50" x2="25" y2="50" strokeWidth="0.8" />
          <line x1="75" y1="50" x2="88" y2="50" strokeWidth="0.8" />
          <circle cx="50" cy="12" r="1.5" fill="currentColor" />
          <circle cx="50" cy="88" r="1.5" fill="currentColor" />
        </svg>
      );
    case CalculationType.HUMAN_DESIGN:
      return (
        <svg className="w-12 h-12 text-[#E0AC6B]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <polygon points="50,12 60,25 40,25" strokeWidth="1.2" fill="currentColor" fillOpacity="0.1" />
          <polygon points="50,42 60,30 40,30" strokeWidth="0.8" />
          <circle cx="50" cy="52" r="7" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15" />
          <polygon points="50,68 64,84 36,84" strokeWidth="1.2" />
          <line x1="50" y1="25" x2="50" y2="30" strokeWidth="1.5" />
          <line x1="50" y1="42" x2="50" y2="45" strokeWidth="1.5" />
          <line x1="50" y1="59" x2="50" y2="68" strokeWidth="1.5" />
          <circle cx="28" cy="52" r="4.5" opacity="0.6" />
          <circle cx="72" cy="52" r="4.5" opacity="0.6" />
          <line x1="32.5" y1="52" x2="43" y2="52" strokeWidth="0.8" strokeDasharray="2 1" />
          <line x1="67.5" y1="52" x2="57" y2="52" strokeWidth="0.8" strokeDasharray="2 1" />
          <line x1="28" y1="52" x2="36" y2="84" strokeWidth="0.6" opacity="0.5" />
          <line x1="72" y1="52" x2="64" y2="84" strokeWidth="0.6" opacity="0.5" />
        </svg>
      );
    case CalculationType.VEDIC:
      return (
        <svg className="w-12 h-12 text-[#E0AC6B]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="50" cy="50" r="42" strokeDasharray="4 4" opacity="0.3" />
          <path d="M50 15 C45 30 30 45 15 50 C30 55 45 70 50 85 C55 70 70 55 85 50 C70 45 55 30 50 15 Z" strokeWidth="1.2" fill="currentColor" fillOpacity="0.1" />
          <path d="M50 25 C47 35 35 47 25 50 C35 53 47 65 50 75 C53 65 65 53 75 50 C65 47 53 35 50 25 Z" strokeWidth="0.8" fill="#E0AC6B" fillOpacity="0.2" />
          <circle cx="50" cy="50" r="8" fill="currentColor" />
          <circle cx="50" cy="50" r="12" strokeWidth="0.5" opacity="0.7" />
          <circle cx="25" cy="25" r="1" fill="currentColor" />
          <circle cx="75" cy="25" r="1" fill="currentColor" />
          <circle cx="25" cy="75" r="1" fill="currentColor" />
          <circle cx="75" cy="75" r="1" fill="currentColor" />
        </svg>
      );
    case CalculationType.BAZI:
      return (
        <svg className="w-12 h-12 text-[#E0AC6B]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="50" cy="50" r="42" opacity="0.4" />
          <path d="M50 8 A 21 21 0 0 0 50 50 A 21 21 0 0 1 50 92 A 42 42 0 0 0 50 8 Z" fill="currentColor" fillOpacity="0.15" />
          <circle cx="50" cy="29" r="4" fill="currentColor" />
          <circle cx="50" cy="71" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M22 30 Q 35 20 50 30" strokeWidth="0.8" opacity="0.7" />
          <path d="M78 30 Q 65 20 50 30" strokeWidth="0.8" opacity="0.7" />
          <path d="M22 70 Q 35 80 50 70" strokeWidth="0.8" opacity="0.7" />
          <path d="M78 70 Q 65 80 50 70" strokeWidth="0.8" opacity="0.7" />
          <circle cx="50" cy="50" r="15" strokeWidth="0.5" strokeDasharray="3 2" opacity="0.5" />
        </svg>
      );
    case CalculationType.ARCHETYPE:
      return (
        <svg className="w-12 h-12 text-[#E0AC6B]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M12 50 C 30 22, 70 22, 88 50 C 70 78, 30 78, 12 50 Z" strokeWidth="1.2" fill="currentColor" fillOpacity="0.1" />
          <circle cx="50" cy="50" r="16" strokeWidth="1" />
          <circle cx="50" cy="50" r="7" fill="currentColor" />
          <circle cx="47" cy="47" r="1.8" fill="#121416" />
          <path d="M50 15 L50 24 M50 76 L50 85 M15 50 L24 50 M76 50 L85 50" strokeWidth="0.8" />
          <path d="M25 25 L32 32 M75 25 L68 32 M25 75 L32 68 M75 75 L68 68" strokeWidth="0.8" />
          <path d="M78 40 A 10 10 0 0 1 78 60 A 8 8 0 0 0 78 40" fill="currentColor" opacity="0.6" />
          <path d="M22 40 A 10 10 0 0 0 22 60 A 8 8 0 0 1 22 40" fill="currentColor" opacity="0.6" />
        </svg>
      );
    default:
      return null;
  }
};

const EXPRESS_PREVIEWS: Record<string, { title: string; highlight: string; details: string }> = {
  horoscope: {
    title: "ასტროლოგიური პორტრეტი (Horoscope)",
    highlight: "თქვენი მზის, მთვარისა და ასცენდენტის კონფიგურაცია მიუთითებს ძლიერ შინაგან პოტენციალზე და ემოციურ ინტუიციაზე.",
    details: "თქვენი ასტროლოგიური კოდი ავლენს თქვენს მთავარ პიროვნულ არქეტიპს, ემოციურ მოთხოვნილებებსა და კარიერულ პოტენციალს. სრულ ანალიზში ნახავთ პლანეტარულ ასპექტებსა და ინდივიდუალურ რეკომენდაციებს."
  },
  enneagram: {
    title: "ენიაგრამის ტიპოლოგია (Enneagram)",
    highlight: "თქვენი ფსიქოლოგიური პროფილი ავლენს ღრმა შინაგან მოტივაციას, ფარულ დრაივერებსა და ზრდის ვექტორებს.",
    details: "ენიაგრამა ააშკარავებს თქვენს ძირითად ენია-ტიპს, სტრესისა და ინტეგრაციის მიმართულებებს, ასევე ქვეცნობიერ შიშებსა და სურვილებს. სრულ ანალიზში მიიღებთ პიროვნული ტრანსფორმაციის გზამკვლევს."
  },
  psychomatrix: {
    title: "პითაგორას ფსიქომატრიცა (Psychomatrix)",
    highlight: "პითაგორას კვადრატის ციფრული ვიბრაციები ააშკარავებს თქვენს ენერგეტიკულ რესურსებსა და თანდაყოლილ ნიჭს.",
    details: "ციფრული მატრიცა აფასებს თქვენს ენერგიას, ნებისყოფას, ინტუიციას, შრომისუნარიანობასა და ჯანმრთელობის პოტენციალს. სრულ ანალიზში ნახავთ ყველა უჯრედის დეტალურ განმარტებას."
  },
  numerology: {
    title: "ნუმეროლოგიური კოდი (Numerology)",
    highlight: "თქვენი ბედისწერის ციფრული კოდი მიანიშნებს ცხოვრებისეულ მისიაზე, გამოწვევებსა და ფარულ შესაძლებლობებზე.",
    details: "დაბადების თარიღის ვიბრაცია განსაზღვრავს თქვენი სულის ამოცანებსა და პიროვნულ ციკლებს. სრულ ანალიზში გაიგებთ თქვენი ბედისწერის რიცხვის სიღრმისეულ მნიშვნელობას."
  },
  human_design: {
    title: "ადამიანის დიზაინი (Human Design)",
    highlight: "თქვენი ენერგეტიკული ტიპი და ავტორიტეტი გიჩვენებთ გადაწყვეტილების მიღების ყველაზე ბუნებრივ გზას.",
    details: "Human Design აჩვენებს თქვენს ბოდიგრაფს, ენერგიის მოძრაობასა და სტრატეგიას ცხოვრებაში. სრულ ანალიზში ნახავთ თქვენი ტიპის, პროფილისა და ცენტრების დეტალურ რუკას."
  },
  vedic: {
    title: "ვედური ასტროლოგია (Vedic / Jyotish)",
    highlight: "ჯოტიშის ინდური ასტროლოგიური რუკა ავლენს თქვენს კარმულ ამოცანებსა და პლანეტარულ პერიოდებს (დაშებს).",
    details: "ვედური ასტროლოგია იყენებს სილიდერულ ზოდიაქოს და ავლენს თქვენს ნაქშატრებს, დჰარმასა და კარმულ კვანძებს (რაჰუ/კეთუ). სრულ ანალიზში ნახავთ სიღრმისეულ კარმულ პროგნოზს."
  },
  bazi: {
    title: "ჩინური ბაზი — 4 სვეტი (Bazi)",
    highlight: "ჩინური 5 ელემენტის ბალანსი ავლენს თქვენი დაბადების 8 იეროგლიფის ენერგეტიკულ წონასწორობას.",
    details: "ბაზი (BaZi) ითვლის ხის, ცეცხლის, მიწის, ლითონისა და წყლის ელემენტების თანაფარდობას. სრულ ანალიზში ნახავთ თქვენს იღბლის სვეტებსა და ენერგეტიკულ რეკომენდაციებს."
  },
  archetype: {
    title: "არქეტიპული პორტრეტი (Archetype)",
    highlight: "თქვენი არქეტიპული პორტრეტი ავლენს დომინანტურ არქეტიპს, ჩრდილოვან მხარეებსა და ევოლუციურ გზას.",
    details: "იუნგის არქეტიპები ააშკარავებს თქვენს ქვეცნობიერ მითოლოგიურ როლს. სრულ ანალიზში იხილავთ თქვენს პიროვნულ არქეტიპს, ჩრდილოვან არქეტიპს და მათი ჰარმონიზაციის გზებს."
  }
};

type ReadingStage = 'IDLE' | 'LOADING_SHORT' | 'SHORT_READY' | 'FULL_READY';

export default function App() {
  const [userProfile, setUserProfile] = useState<BirthProfile | null>(null);
  const [selectedType, setSelectedType] = useState<CalculationType | null>(null);
  const [readingStage, setReadingStage] = useState<ReadingStage>('IDLE');
  const [reading, setReading] = useState<ReadingResponse | null>(null);
  const [loadingReading, setLoadingReading] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invitedPhone, setInvitedPhone] = useState<string>("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [tempBirthTime, setTempBirthTime] = useState("");
  const [savingTime, setSavingTime] = useState(false);
  const [deliveryPhone, setDeliveryPhone] = useState("");
  const [deliveryEmail, setDeliveryEmail] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState<string | null>(null);
  const [deliveryWaLink, setDeliveryWaLink] = useState<string | null>(null);

  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [linkingPhone, setLinkingPhone] = useState(false);
  const [linkedSuccessfully, setLinkedSuccessfully] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Live Queue & Delivery Notification States
  const [queueCount, setQueueCount] = useState(2);
  const [estimatedWaitTime, setEstimatedWaitTime] = useState("1.5");
  const [queuePhone, setQueuePhone] = useState("");
  const [notifySent, setNotifySent] = useState(false);

  useEffect(() => {
    if (userProfile?.phone) {
      setQueuePhone(userProfile.phone);
    }
  }, [userProfile]);

  // Reassuring cosmic loading messages in Georgian
  const loadingMessages = [
    "ვარსკვლავური რუკა იხაზება...",
    "პლანეტების განლაგება ითვლება...",
    "პითაგორას სპეციალური ვიბრაციები ანგარიშდება...",
    "ენიაგრამის ფსიქოლოგიური კოდი იშიფრება...",
    "ჩინური 5 ელემენტის ბალანსი მუშავდება...",
    "ხელოვნური ინტელექტი აჯამებს მონაცემებს...",
  ];
  // Dynamic Real-Time Adaptive Progress Bar (0% to 100%) & Queue Countdown
  const [progress, setProgress] = useState(0);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);

  // Rotate loading messages
  useEffect(() => {
    let interval: any;
    if (loadingReading) {
      interval = setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % loadingMessages.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [loadingReading]);

  // Adaptive progress & live queue calculation based on real network loading state
  useEffect(() => {
    let interval: any;
    if (loadingReading) {
      setProgress(5);
      setQueueCount(Math.floor(Math.random() * 2) + 2); // 2 or 3 users
      setEstimatedWaitTime("1.5");
      setNotifySent(false);

      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 40) {
            setQueueCount(2);
            setEstimatedWaitTime("1.5");
            return prev + 10;
          }
          if (prev < 75) {
            setQueueCount(1);
            setEstimatedWaitTime("1");
            return prev + 5;
          }
          if (prev < 94) {
            setQueueCount(0);
            setEstimatedWaitTime("0.5");
            return prev + 2;
          }
          return prev;
        });
      }, 500);
    } else {
      setProgress(100);
      setQueueCount(0);
      setEstimatedWaitTime("0");
    }
    return () => clearInterval(interval);
  }, [loadingReading]);

  // Handle WhatsApp notification registration
  const handleRegisterWhatsAppNotify = async () => {
    const cleanPhone = queuePhone.trim().replace(/\s+/g, "");
    let normalizedPhone = cleanPhone;
    if (normalizedPhone.startsWith("+995")) normalizedPhone = normalizedPhone.slice(4);
    else if (normalizedPhone.startsWith("995")) normalizedPhone = normalizedPhone.slice(3);

    if (!/^5\d{8}$/.test(normalizedPhone)) {
      alert("გთხოვთ შეიყვანოთ სწორი 9-ციფრიანი ტელეფონის ნომერი (მაგ: 5XXXXXXXX)");
      return;
    }

    setNotifySent(true);

    try {
      await fetch(API_URLS.saveProfile, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register_queue_whatsapp",
          phone: normalizedPhone,
          selectedType: selectedType
        }),
      });
    } catch (e) {}
  };

  // Auto-send WhatsApp notification upon completion if user registered
  useEffect(() => {
    if (reading && notifySent) {
      const cleanPhone = queuePhone.trim().replace(/\s+/g, "").replace("+", "");
      let norm = cleanPhone.startsWith("995") ? cleanPhone : "995" + cleanPhone;
      const shareText = `გამარჯობა! თქვენი აიდი მოდელის ანალიზი ("${reading.title}") მზადაა! 🔮🌟\n\n` +
        `ნახეთ თქვენი ანალიზი აქ: 👉 ${window.location.origin}/cosmic.html`;
      const waUrl = `https://api.whatsapp.com/send?phone=${norm}&text=${encodeURIComponent(shareText)}`;
      window.open(waUrl, "_blank");
    }
  }, [reading, notifySent]);

  // Auto-scroll to reading display when loading or showing results
  useEffect(() => {
    if (loadingReading || reading || error) {
      setTimeout(() => {
        const el = document.getElementById("reading-display");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [loadingReading, reading, error]);

  // Load profile from localStorage and fetch update from server on mount
  useEffect(() => {
    const savedPhone = localStorage.getItem("user_phone");
    if (savedPhone) {
      try {
        const stored = localStorage.getItem("saved_profiles");
        if (stored) {
          const list = JSON.parse(stored);
          if (Array.isArray(list)) {
            const found = list.find((p: any) => p.phone === savedPhone);
            if (found) {
              const timeFromStorage = found.birthTime || localStorage.getItem("idc_user_birthtime") || undefined;
              setUserProfile({
                ...found,
                birthTime: timeFromStorage
              });
            }
          }
        }
      } catch (e) {
        console.error("Error reading saved_profiles from localStorage:", e);
      }
      fetchUserProfile(savedPhone);
    }

    // Parse URL query parameter: ?compareWith=+995...
    const urlParams = new URLSearchParams(window.location.search);
    const compare = urlParams.get("compareWith");
    if (compare) {
      setInvitedPhone(compare.trim());
    }
  }, []);

  const fetchUserProfile = async (phone: string) => {
    try {
      const data = await getProfile(phone.trim().replace(/\s+/g, ""));
      if (data.success && data.exists && data.profile) {
        const profile = data.profile;
        if (!profile.birthTime) {
          const localTime = localStorage.getItem("idc_user_birthtime");
          if (localTime) profile.birthTime = localTime;
        } else {
          localStorage.setItem("idc_user_birthtime", profile.birthTime);
        }
        setUserProfile(profile);
      }
    } catch (err) {
      console.error("Error autoloading profile:", err);
    }
  };

  const handleProfileSaved = (profile: BirthProfile, initialTheme?: CalculationType) => {
    setUserProfile(profile);
    localStorage.setItem("user_phone", profile.phone);
    if (profile.birthTime) {
      localStorage.setItem("idc_user_birthtime", profile.birthTime);
    }
    if (initialTheme) {
      handleSelectReading(profile.phone, initialTheme, profile.birthTime, profile);
    }
  };

  const handleSelectReading = async (
    phone: string,
    type: CalculationType,
    birthTime?: string,
    profile?: BirthProfile
  ) => {
    setSelectedType(type);
    setReadingStage('LOADING_SHORT');
    setLoadingReading(true);
    setError(null);
    setReading(null);
    setDeliveryPhone(phone);

    const activeProfile = profile || userProfile;
    const effectiveBirthTime = (birthTime || activeProfile?.birthTime || localStorage.getItem("idc_user_birthtime") || "").trim() || undefined;
    if (activeProfile && effectiveBirthTime && !activeProfile.birthTime) {
      activeProfile.birthTime = effectiveBirthTime;
    }

    // Fast initial delay (1.2s) to show loading screen first before short summary appears
    setTimeout(() => {
      setReadingStage((prev) => (prev === 'LOADING_SHORT' ? 'SHORT_READY' : prev));
    }, 1200);

    try {
      const data = await generateReading(phone, type, effectiveBirthTime, activeProfile || undefined);
      if (data.success) {
        setReading(data);
      } else {
        setError("ვერ მოხერხდა ანალიზის გენერირება.");
      }
    } catch (err) {
      setError("კავშირის შეცდომა. სცადეთ მოგვიანებით.");
    } finally {
      setLoadingReading(false);
    }
  };

  const handleResetProfile = () => {
    localStorage.removeItem("user_phone");
    setUserProfile(null);
    setSelectedType(null);
    setReading(null);
    setError(null);
    showResetConfirm && setShowResetConfirm(false);
  };

  const handleDeleteProfile = async () => {
    if (!userProfile) return;
    try {
      await deleteProfile(userProfile.phone);
    } catch (err) {
      console.error("Error deleting profile:", err);
    }
    localStorage.removeItem("user_phone");
    setUserProfile(null);
    setSelectedType(null);
    setReading(null);
    setError(null);
    showDeleteConfirm && setShowDeleteConfirm(false);
  };

  const sliceMarkdown = (content: string, wordCount: number = 180): string => {
    if (!content) return "";
    const tokens = content.split(/\s+/);
    if (tokens.length <= wordCount) return content;
    return tokens.slice(0, wordCount).join(" ") + "...";
  };

  const formatAnalysisHtml = (content: string): string => {
    if (!content) return '';

    const text = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
    const lines = text.split('\n');
    const blocks: { type: 'greeting' | 'heading' | 'list_item' | 'num_item' | 'p'; content: string; num?: string }[] = [];
    let currentParagraph: string[] = [];

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const pText = currentParagraph.join(' ').trim();
        if (pText) {
          blocks.push({ type: 'p', content: pText });
        }
        currentParagraph = [];
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const rawLine = lines[i].trim();
      if (!rawLine) {
        flushParagraph();
        continue;
      }

      // Markdown headings (#, ##, ###, ####)
      const hMatch = rawLine.match(/^#{1,4}\s+(.*?)$/);
      if (hMatch) {
        flushParagraph();
        blocks.push({ type: 'heading', content: hMatch[1].trim() });
        continue;
      }

      // Bold standalone title lines (e.g. **1. სათაური** or **სათაური**)
      const boldHeaderMatch = rawLine.match(/^\*\*([0-9\.\s]*[^\*]+?)\*\*:?$/);
      if (boldHeaderMatch && boldHeaderMatch[1].length < 85) {
        flushParagraph();
        blocks.push({ type: 'heading', content: boldHeaderMatch[1].trim() });
        continue;
      }

      // Numbered section headings e.g. 1. სათაური
      const numHeaderMatch = rawLine.match(/^(\d+)\.\s+\*?\*?([^\*]+?)\*?\*?:?$/);
      if (numHeaderMatch && numHeaderMatch[2].length < 65 && !numHeaderMatch[2].includes('.')) {
        flushParagraph();
        blocks.push({ type: 'heading', content: `${numHeaderMatch[1]}. ${numHeaderMatch[2].trim()}` });
        continue;
      }

      // Greeting lines
      if (
        rawLine === 'ძვირფასო მეგობარო,' ||
        rawLine === 'ძვირფასო მეგობარო' ||
        rawLine.startsWith('ძვირფასო') ||
        rawLine.startsWith('მოგესალმებით') ||
        rawLine.startsWith('გამარჯობა')
      ) {
        flushParagraph();
        blocks.push({ type: 'greeting', content: rawLine });
        continue;
      }

      // Bullet list items
      const listMatch = rawLine.match(/^[-*•]\s+(.*?)$/);
      if (listMatch) {
        flushParagraph();
        blocks.push({ type: 'list_item', content: listMatch[1].trim() });
        continue;
      }

      // Numbered item
      const numItemMatch = rawLine.match(/^(\d+)\.\s+(.*?)$/);
      if (numItemMatch) {
        flushParagraph();
        blocks.push({ type: 'num_item', num: numItemMatch[1], content: numItemMatch[2].trim() });
        continue;
      }

      currentParagraph.push(rawLine);
    }
    flushParagraph();

    const formatInline = (str: string) => {
      return str
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#1C3D63]">$1</strong>')
        .replace(/(\d{1,3}%)/g, '<span class="inline-block px-1.5 py-0.5 rounded bg-[#E0AC6B]/15 text-[#1C3D63] font-bold text-xs sm:text-sm font-sans border border-[#E0AC6B]/30">$1</span>');
    };

    let html = '';
    for (const b of blocks) {
      if (b.type === 'greeting') {
        html += `
          <div class="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#D8C4B6] mb-6 flex items-center gap-3.5 shadow-xs">
            <div class="w-10 h-10 rounded-xl bg-[#E0AC6B]/20 text-[#1C3D63] flex items-center justify-center shrink-0 border border-[#E0AC6B]/40">
              <span class="material-symbols-outlined text-xl">person_heart</span>
            </div>
            <div>
              <h4 class="font-headline italic font-bold text-base sm:text-lg text-[#1C3D63] leading-none mb-1">
                ${formatInline(b.content)}
              </h4>
              <p class="text-xs text-[#8E8276] font-light">პერსონალური ფსიქო-ტრანსფორმაციული ანალიზი</p>
            </div>
          </div>`;
      } else if (b.type === 'heading') {
        html += `
          <div class="mt-8 mb-4 p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-[#1C3D63]/8 via-[#E0AC6B]/10 to-transparent border-l-4 border-l-[#1C3D63] border border-[#D8C4B6]/60 flex items-center justify-between shadow-xs">
            <div class="flex items-center gap-2.5">
              <span class="material-symbols-outlined text-[#E0AC6B] text-2xl">auto_stories</span>
              <h3 class="font-headline font-bold text-base sm:text-lg text-[#1C3D63] tracking-wide m-0">
                ${formatInline(b.content)}
              </h3>
            </div>
            <span class="text-[10px] uppercase font-bold tracking-widest text-[#E0AC6B] font-sans px-2 py-0.5 rounded bg-white border border-[#E0AC6B]/40 hidden sm:inline-block">სფერო / ანალიზი</span>
          </div>`;
      } else if (b.type === 'list_item') {
        html += `
          <div class="flex items-start gap-3 my-2.5 pl-2 sm:pl-3">
            <span class="w-5 h-5 rounded-full bg-[#E0AC6B]/20 text-[#1C3D63] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border border-[#E0AC6B]/40 font-sans">✓</span>
            <div class="text-sm sm:text-base text-[#222222] leading-relaxed font-sans font-normal">
              ${formatInline(b.content)}
            </div>
          </div>`;
      } else if (b.type === 'num_item') {
        html += `
          <div class="flex items-start gap-3 my-2.5 pl-2 sm:pl-3">
            <span class="w-6 h-6 rounded-lg bg-[#1C3D63] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 font-sans">${b.num}</span>
            <div class="text-sm sm:text-base text-[#222222] leading-relaxed font-sans font-normal">
              ${formatInline(b.content)}
            </div>
          </div>`;
      } else {
        html += `<p class="text-sm sm:text-base text-[#222222] leading-[1.85] font-normal mb-4 font-sans text-left">${formatInline(b.content)}</p>`;
      }
    }

    return html;
  };

  const formatShortPreviewHtml = (content: string): string => {
    if (!content) return '';
    const text = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
    const lines = text.split('\n');
    const previewLines: string[] = [];
    let wordsCount = 0;

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      previewLines.push(trimmed);
      wordsCount += trimmed.split(/\s+/).length;
      if (wordsCount >= 90) break;
    }

    return formatAnalysisHtml(previewLines.join('\n'));
  };

  const handleSendWhatsApp = async () => {
    if (!reading || !userProfile) return;
    setDeliveryStatus(null);
    setDeliveryWaLink(null);

    const cleanPhone = deliveryPhone.trim().replace(/\s+/g, "");
    let normalizedPhone = cleanPhone;
    if (normalizedPhone.startsWith("+995")) {
      normalizedPhone = normalizedPhone.slice(4);
    } else if (normalizedPhone.startsWith("995")) {
      normalizedPhone = normalizedPhone.slice(3);
    }

    if (!/^5\d{8}$/.test(normalizedPhone)) {
      setDeliveryStatus("შეცდომა: ტელეფონის ნომერი არასწორია (უნდა იყოს 9 ციფრი, იწყებოდეს 5-ით).");
      return;
    }

    setDeliveryStatus("იგზავნება WhatsApp-ზე...");

    const appUrl = window.location.origin;
    const shareText = `გამარჯობა, გაზიარებთ ჩემი კოსმიური ანალიზის შედეგებს 🔮🌟\n\n` +
      `სახელი: ${userProfile.name} ${userProfile.surname}\n` +
      `ანალიზის სათაური: "${reading.title}"\n\n` +
      `ნახე ჩემი ანალიზი და გაიგე შენიც აქ: 👉 ${appUrl}?compareWith=${encodeURIComponent(userProfile.phone)}`;
    
    const waUrl = `https://api.whatsapp.com/send?phone=995${normalizedPhone}&text=${encodeURIComponent(shareText)}`;
    setDeliveryWaLink(waUrl);
    window.open(waUrl, "_blank");

    try {
      const response = await fetch(API_URLS.saveProfile, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "send_whatsapp",
          phone: normalizedPhone,
          readingTitle: reading.title,
          readingContent: reading.content
        }),
      });

      const data = await response.json();
      if (data.success) {
        setDeliveryStatus("ანალიზი წარმატებით გაიგზავნა! 🎉");
      } else {
        setDeliveryStatus("სერვერული გაგზავნა ვერ მოხერხდა, მაგრამ გაიხსნა თქვენი WhatsApp.");
      }
    } catch (err) {
      setDeliveryStatus("სერვერული გაგზავნა ვერ მოხერხდა, მაგრამ გაიხსნა თქვენი WhatsApp.");
    }
  };

  const handleSendEmail = async () => {
    if (!reading || !userProfile) return;
    setDeliveryStatus(null);
    setDeliveryWaLink(null);

    const email = deliveryEmail.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setDeliveryStatus("შეცდომა: ელ.ფოსტის მისამართი არასწორია.");
      return;
    }

    setDeliveryStatus("იგზავნება ელ. ფოსტაზე...");

    const appUrl = window.location.origin;
    const shareText = `გამარჯობა, გაზიარებთ ჩემი კოსმიური ანალიზის შედეგებს 🔮🌟\n\n` +
      `სახელი: ${userProfile.name} ${userProfile.surname}\n` +
      `ანალიზის სათაური: "${reading.title}"\n\n` +
      `ნახე ჩემი ანალიზი და გაიგე შენიც აქ: 👉 ${appUrl}?compareWith=${encodeURIComponent(userProfile.phone)}`;

    const waGeneralUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    setDeliveryWaLink(waGeneralUrl);
    window.open(waGeneralUrl, "_blank");

    try {
      const response = await fetch(API_URLS.saveProfile, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "send_email",
          email,
          phone: userProfile.phone,
          readingTitle: reading.title,
          readingContent: reading.content
        }),
      });

      const data = await response.json();
      if (data.success) {
        setDeliveryStatus("ანალიზი წარმატებით გაიგზავნა ელ. ფოსტაზე და გაიხსნა WhatsApp! 🎉");
      } else {
        setDeliveryStatus("ელ.ფოსტაზე გაგზავნა ვერ მოხერხდა, მაგრამ გაიხსნა თქვენი WhatsApp.");
      }
    } catch (err) {
      setDeliveryStatus("ელ.ფოსტაზე გაგზავნა ვერ მოხერხდა, მაგრამ გაიხსნა თქვენი WhatsApp.");
    }
  };

  const getWhatsAppShareURL = () => {
    if (!reading || !userProfile) return "";
    const appUrl = window.location.origin;
    const message = `გამარჯობა, გაზიარებთ ჩემი აიდი მოდელების ანალიზს 🔮🌟\n\n` +
      `სახელი: ${userProfile.name} ${userProfile.surname}\n` +
      `დაბადების თარიღი: ${userProfile.day}/${userProfile.month}/${userProfile.year}\n` +
      `დაბადების ადგილი: ${userProfile.birthPlace || "საქართველო"}\n\n` +
      `ანალიზის სათაური: ${reading.title}\n` +
      `ანალიზი:\n${reading.content.substring(0, 800)}...\n\n` +
      `შეავსე შენი სახელი და დაბადების თარიღი ამ ლინკით და გავიგოთ ჩვენი თავსებადობა:\n👉 ${appUrl}?compareWith=${encodeURIComponent(userProfile.phone)}`;

    return `https://api.whatsapp.com/send?phone=995598324020&text=${encodeURIComponent(message)}`;
  };

  const getTelegramShareURL = () => {
    if (!reading || !userProfile) return "";
    const appUrl = window.location.origin;
    const message = `გამარჯობა, გაზიარებთ ჩემი აიდი მოდელების ანალიზს 🔮🌟\n\n` +
      `სახელი: ${userProfile.name} ${userProfile.surname}\n` +
      `ანალიზის სათაური: ${reading.title}\n\n` +
      `შეავსე შენი სახელი და დაბადების თარიღი ამ ლინკით და გავიგოთ ჩვენი თავსებადობა:`;
    const shareLink = `${appUrl}?compareWith=${encodeURIComponent(userProfile.phone)}`;
    return `https://t.me/share/url?url=${encodeURIComponent(shareLink)}&text=${encodeURIComponent(message)}`;
  };

  const getFacebookShareURL = () => {
    if (!userProfile) return "";
    const appUrl = window.location.origin;
    const shareLink = `${appUrl}?compareWith=${encodeURIComponent(userProfile.phone)}`;
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`;
  };

  const getMessengerShareURL = () => {
    if (!userProfile) return "";
    const appUrl = window.location.origin;
    const shareLink = `${appUrl}?compareWith=${encodeURIComponent(userProfile.phone)}`;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      return `fb-messenger://share/?link=${encodeURIComponent(shareLink)}`;
    }
    return `https://www.facebook.com/dialog/send?link=${encodeURIComponent(shareLink)}&app_id=966242223397117&redirect_uri=${encodeURIComponent(appUrl)}`;
  };

  const handleNativeShare = () => {
    if (!userProfile) return;
    const appUrl = window.location.origin;
    const shareLink = `${appUrl}?compareWith=${encodeURIComponent(userProfile.phone)}`;
    if (navigator.share) {
      navigator.share({
        title: reading?.title || "აიდი მოდელები",
        text: `გამარჯობა, გაზიარებთ ჩემი აიდი მოდელების ანალიზს 🔮🌟\n\nსახელი: ${userProfile.name} ${userProfile.surname}\nანალიზის სათაური: ${reading?.title}\n\n`,
        url: shareLink,
      }).catch(() => {});
    } else {
      const smsBody = `გამარჯობა, გაზიარებთ ჩემი აიდი მოდელების ანალიზს 🔮🌟\n\n${shareLink}`;
      window.open(`sms:?body=${encodeURIComponent(smsBody)}`);
    }
  };

  const getCustomMessengerShareURL = (phone: string) => {
    if (!userProfile) return "";
    const appUrl = window.location.origin;
    const cleanPhone = phone.trim().replace(/\s+/g, "");
    const shareLink = `${appUrl}?compareWith=${encodeURIComponent(cleanPhone)}`;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      return `fb-messenger://share/?link=${encodeURIComponent(shareLink)}`;
    }
    return `https://www.facebook.com/dialog/send?link=${encodeURIComponent(shareLink)}&app_id=966242223397117&redirect_uri=${encodeURIComponent(appUrl)}`;
  };

  const handleCustomNativeShare = (phone: string) => {
    if (!userProfile) return;
    const appUrl = window.location.origin;
    const cleanPhone = phone.trim().replace(/\s+/g, "");
    const shareLink = `${appUrl}?compareWith=${encodeURIComponent(cleanPhone)}`;
    if (navigator.share) {
      navigator.share({
        title: reading?.title || "აიდი მოდელები",
        text: `გამარჯობა, გაზიარებთ ჩემი აიდი მოდელების ანალიზს 🔮🌟\n\nსახელი: ${userProfile.name} ${userProfile.surname}\nანალიზის სათაური: ${reading?.title}\n\n`,
        url: shareLink,
      }).catch(() => {});
    } else {
      const smsBody = `გამარჯობა, გაზიარებთ ჩემი აიდი მოდელების ანალიზს 🔮🌟\n\n${shareLink}`;
      window.open(`sms:?body=${encodeURIComponent(smsBody)}`);
    }
  };

  const handleCopyLink = () => {
    if (!userProfile) return;
    const appUrl = window.location.origin;
    const shareLink = `${appUrl}?compareWith=${encodeURIComponent(userProfile.phone)}`;
    navigator.clipboard.writeText(shareLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const getCustomWhatsAppShareURL = (phone: string) => {
    if (!reading || !userProfile) return "";
    const appUrl = window.location.origin;
    const cleanPhone = phone.trim().replace(/\s+/g, "");
    const message = `გამარჯობა, გაზიარებთ ჩემი აიდი მოდელების ანალიზს 🔮🌟\n\n` +
      `სახელი: ${userProfile.name} ${userProfile.surname}\n` +
      `დაბადების თარიღი: ${userProfile.day}/${userProfile.month}/${userProfile.year}\n` +
      `ტელეფონი: ${cleanPhone}\n\n` +
      `ანალიზის სათაური: ${reading.title}\n` +
      `ანალიზი:\n${reading.content.substring(0, 800)}...\n\n` +
      `შეავსე შენი სახელი და დაბადების თარიღი ამ ლინკით და გავიგოთ ჩვენი თავსებადობა:\n👉 ${appUrl}?compareWith=${encodeURIComponent(cleanPhone)}`;

    return `https://api.whatsapp.com/send?phone=995598324020&text=${encodeURIComponent(message)}`;
  };

  const getCustomTelegramShareURL = (phone: string) => {
    if (!reading || !userProfile) return "";
    const appUrl = window.location.origin;
    const cleanPhone = phone.trim().replace(/\s+/g, "");
    const message = `გამარჯობა, გაზიარებთ ჩემი აიდი მოდელების ანალიზს 🔮🌟\n\n` +
      `სახელი: ${userProfile.name} ${userProfile.surname}\n` +
      `ანალიზის სათაური: ${reading.title}\n\n` +
      `შეავსე შენი სახელი და დაბადების თარიღი ამ ლინკით და გავიგოთ ჩვენი თავსებადობა:`;
    const shareLink = `${appUrl}?compareWith=${encodeURIComponent(cleanPhone)}`;
    return `https://t.me/share/url?url=${encodeURIComponent(shareLink)}&text=${encodeURIComponent(message)}`;
  };

  const getCustomFacebookShareURL = (phone: string) => {
    if (!userProfile) return "";
    const appUrl = window.location.origin;
    const cleanPhone = phone.trim().replace(/\s+/g, "");
    const shareLink = `${appUrl}?compareWith=${encodeURIComponent(cleanPhone)}`;
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`;
  };

  const handleLinkPhoneAndShare = async () => {
    if (!userProfile) return;
    const cleanPhone = phoneNumberInput.trim().replace(/\s+/g, "");
    let normalizedPhone = cleanPhone;
    if (normalizedPhone.startsWith("+995")) {
      normalizedPhone = normalizedPhone.slice(4);
    } else if (normalizedPhone.startsWith("995")) {
      normalizedPhone = normalizedPhone.slice(3);
    }

    if (!/^5\d{8}$/.test(normalizedPhone)) {
      setLinkError("ტელეფონის ნომერი უნდა იყოს 9 ციფრიანი და იწყებოდეს 5-ით");
      return;
    }

    if (/^(.)\1+$/.test(normalizedPhone) || /(.)\1{5,}/.test(normalizedPhone)) {
      setLinkError("გთხოვთ შეიყვანოთ სწორი ტელეფონის ნომერი");
      return;
    }

    setLinkingPhone(true);
    setLinkError(null);

    try {
      // 1. Save profile with new real phone
      const saveData = await saveProfile({
        name: userProfile.name,
        surname: userProfile.surname,
        birthPlace: userProfile.birthPlace || "საქართველო",
        day: userProfile.day,
        month: userProfile.month,
        year: userProfile.year,
        birthTime: userProfile.birthTime,
        phone: normalizedPhone
      });

      if (saveData.success) {
        // 2. Clear old temp profile from server
        if (userProfile.phone.startsWith("temp_")) {
          try {
            await deleteProfile(userProfile.phone);
          } catch (deleteErr) {
            console.error("Error clearing temp profile:", deleteErr);
          }
        }

        // 3. Update local states & localStorage
        const updatedProfile = {
          ...saveData.profile,
          birthTime: saveData.profile.birthTime || userProfile.birthTime
        };
        setUserProfile(updatedProfile);
        localStorage.setItem("user_phone", cleanPhone);
        if (updatedProfile.birthTime) {
          localStorage.setItem("idc_user_birthtime", updatedProfile.birthTime);
        }
        try {
          const stored = localStorage.getItem("saved_profiles");
          let list = stored ? JSON.parse(stored) : [];
          if (Array.isArray(list)) {
            list = list.filter((p: any) => p.phone !== userProfile.phone && p.phone !== normalizedPhone);
            list.unshift(updatedProfile);
            localStorage.setItem("saved_profiles", JSON.stringify(list));
          }
        } catch (e) {
          console.error("Error updating saved_profiles in linkPhone:", e);
        }
        setLinkedSuccessfully(true);
      } else {
        setLinkError(saveData.error || "შეცდომა ნომრის დაკავშირებისას");
      }
    } catch (err) {
      setLinkError("კავშირის შეცდომა. სცადეთ მოგვიანებით.");
    } finally {
      setLinkingPhone(false);
    }
  };

  return (
    <div className="relative w-full text-[#222222] flex flex-col justify-between py-4 z-10 selection:bg-[#E0AC6B]/20 selection:text-[#1C3D63] font-sans">
      
      {/* Immersive slate background */}
      <div className="cosmic-bg"></div>
 
      {/* Main Container */}
      <div className="w-full space-y-12 z-10">
        
        {/* Profile registration Section */}
        {!userProfile ? (
          <ProfileForm
            onProfileSaved={handleProfileSaved}
            savedProfile={null}
            loading={savingProfile}
          />
        ) : (
          /* Active Profile Overview Card */
          <div className="w-full bg-white p-6 sm:p-7 rounded-2xl border border-[#D8C4B6] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative text-left font-sans">
            {showDeleteConfirm ? (
              <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 py-2">
                <div className="text-left space-y-1.5">
                  <h4 className="text-sm uppercase tracking-wide text-red-700 font-bold flex items-center gap-1.5 font-headline">
                    <ShieldAlert className="w-4 h-4 text-red-600" /> მონაცემების სამუდამოდ წაშლა და თავიდან დაწყება
                  </h4>
                  <p className="text-xs text-[#3B5E63] font-light">
                    დარწმუნებული ხართ ფაილების, ანალიზების და სახელი/თარიღის სრულად წაშლაზე?
                  </p>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
                  <button
                    onClick={handleDeleteProfile}
                    className="flex-1 md:flex-none px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold tracking-widest uppercase transition-all cursor-pointer text-center rounded-xl shadow-xs font-headline"
                  >
                    დიახ, წაშლა
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 md:flex-none px-5 py-2.5 bg-[#F4F7F7] hover:bg-[#E5ECEC] text-[#1C3D63] border border-[#D8C4B6] text-[10px] font-bold tracking-widest uppercase transition-all cursor-pointer text-center rounded-xl font-headline"
                  >
                    გაუქმება
                  </button>
                </div>
              </div>
            ) : showResetConfirm ? (
              <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 py-2">
                <div className="text-left space-y-1.5">
                  <h4 className="text-sm uppercase tracking-wide text-[#1C3D63] font-bold flex items-center gap-1.5 font-headline">
                    <Edit3 className="w-4 h-4 text-[#E0AC6B]" /> პროფილის შეცვლა
                  </h4>
                  <p className="text-xs text-[#3B5E63] font-light">
                    ნამდვილად გსურთ მიმდინარე პროფილის დახურვა და ახლის შეყვანა?
                  </p>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
                  <button
                    onClick={handleResetProfile}
                    className="flex-1 md:flex-none px-5 py-2.5 bg-[#1C3D63] hover:bg-[#254F7F] text-white text-[10px] font-bold tracking-widest uppercase transition-all cursor-pointer text-center rounded-xl shadow-xs font-headline"
                  >
                    შეცვლა
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 md:flex-none px-5 py-2.5 bg-[#F4F7F7] hover:bg-[#E5ECEC] text-[#1C3D63] border border-[#D8C4B6] text-[10px] font-bold tracking-widest uppercase transition-all cursor-pointer text-center rounded-xl font-headline"
                  >
                    გაუქმება
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl border border-[#D8C4B6] bg-[#F4F7F7] flex items-center justify-center font-bold text-lg text-[#1C3D63] font-headline shadow-xs" id="active-profile-avatar">
                    {userProfile.name[0]}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3 flex-wrap gap-y-1">
                      <h3 className="text-base sm:text-lg font-bold tracking-wide text-[#1C3D63] uppercase font-headline" id="active-profile-name">
                        {userProfile.name} {userProfile.surname}
                      </h3>
                      <span className="text-[10px] bg-[#3B5E63]/10 border border-[#3B5E63]/25 text-[#1C3D63] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1 font-headline" id="active-profile-status">
                        <UserCheck className="w-3 h-3 text-[#3B5E63]" /> აქტიური
                      </span>
                    </div>
                    <p className="text-xs text-[#3B5E63] font-light leading-relaxed">
                      დაბადებული: {userProfile.day}/{userProfile.month}/{userProfile.year}
                      {userProfile.birthTime ? (
                        <span className="text-[#1C3D63] font-medium"> • ⏰ {userProfile.birthTime} სთ</span>
                      ) : (
                        <span className="text-[#8E8276]"> • ⏰ საათი არ არის</span>
                      )}
                      {` • ${userProfile.birthPlace || "თბილისი"}`}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <button
                    onClick={() => {
                      setTempBirthTime(userProfile.birthTime || "");
                      setShowTimeModal(true);
                    }}
                    className="px-3.5 py-2 bg-[#F4F7F7] hover:bg-[#E5ECEC] text-[#1C3D63] border border-[#D8C4B6] text-[10px] font-bold tracking-wider uppercase rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer font-headline shadow-xs"
                    id="btn-trigger-time"
                  >
                    <span>⏰ {userProfile.birthTime ? "საათის შეცვლა" : "საათის ჩამატება"}</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowResetConfirm(true);
                      setShowDeleteConfirm(false);
                    }}
                    className="px-3.5 py-2 bg-[#F4F7F7] hover:bg-[#E5ECEC] text-[#1C3D63] border border-[#D8C4B6] text-[10px] font-bold tracking-wider uppercase rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer font-headline shadow-xs"
                    id="btn-trigger-reset"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#1C3D63]" /> პროფილის შეცვლა
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(true);
                      setShowResetConfirm(false);
                    }}
                    className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-[10px] font-bold tracking-wider uppercase rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer font-headline shadow-xs"
                    id="btn-trigger-delete"
                  >
                    <RefreshCw className="w-3 h-3 text-red-600 shrink-0" /> წაშლა
                  </button>
                </div>
              </>
            )}
          </div>
        )/* End active card */}
 
        {/* The Spin Wheel & Interactive Reading section */}
        {userProfile && (
          <div className="space-y-12">
            {/* 1. Reading Display panel */}
            {(loadingReading || reading || error) && (
              <div id="reading-display" className="w-full bg-white p-6 sm:p-8 rounded-2xl border border-[#D8C4B6] shadow-sm transition-all relative text-left font-sans text-[#222222]">
                {/* Back Button */}
                <button
                  onClick={() => {
                    setReading(null);
                    setSelectedType(null);
                    setError(null);
                    setReadingStage('IDLE');
                  }}
                  className="inline-flex items-center space-x-2 text-[10px] tracking-widest text-[#8E8276] hover:text-[#1C3D63] font-bold uppercase transition-all mb-4 group cursor-pointer font-headline"
                >
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                  <span>უკან დაბრუნება</span>
                </button>

                {/* Model Birth Time Status & Quick Add Bar */}
                {selectedType && [CalculationType.HOROSCOPE, CalculationType.HUMAN_DESIGN, CalculationType.VEDIC, CalculationType.BAZI].includes(selectedType) && (
                  <div className="mb-6 p-4 bg-[#F4F7F7] border border-[#D8C4B6] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-left shadow-xs">
                    <div className="flex items-center space-x-2.5">
                      <span className="material-symbols-outlined text-[#E0AC6B] text-xl shrink-0">schedule</span>
                      <p className="text-xs text-[#3B5E63] font-light leading-relaxed">
                        <strong className="text-[#1C3D63] font-bold">დაბადების საათი:</strong>{' '}
                        {userProfile?.birthTime ? (
                          <span className="text-emerald-700 font-medium">მითითებულია ({userProfile.birthTime} სთ) ✓</span>
                        ) : (
                          <span className="text-[#8E8276]">არ არის მითითებული (სასურველია ზუსტი ანალიზისთვის)</span>
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setTempBirthTime(userProfile?.birthTime || "");
                        setShowTimeModal(true);
                      }}
                      className="px-3.5 py-1.5 bg-[#1C3D63] hover:bg-[#254F7F] text-white text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shrink-0 shadow-xs font-headline"
                    >
                      {userProfile?.birthTime ? "საათის შეცვლა" : "+ საათის ჩამატება"}
                    </button>
                  </div>
                )}

                {/* STEP 1: Fast Loading Screen immediately after selection */}
                {(readingStage === 'LOADING_SHORT' || (readingStage === 'SHORT_READY' && !reading)) && (
                  <div className="flex flex-col items-center justify-center py-10 space-y-5 text-center">
                    {selectedType && (
                      <div className="relative flex items-center justify-center mb-2">
                        <div className="absolute w-[170px] h-[170px] rounded-full border border-dashed border-[#D8C4B6] animate-[spin_20s_linear_infinite] pointer-events-none"></div>
                        
                        <div className="w-[110px] h-[155px] rounded-xl border border-[#D8C4B6] bg-white flex flex-col items-center justify-center p-3.5 shadow-sm relative overflow-hidden animate-bounce z-10 text-[#1C3D63]">
                          <div className="my-auto scale-[1.2] text-[#E0AC6B]">
                            {getTarotIllustration(selectedType)}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <p className="text-base sm:text-lg font-bold text-[#1C3D63] tracking-wide text-center font-headline animate-pulse uppercase max-w-lg px-4 leading-relaxed">
                      {loadingMessages[loadingMsgIdx]}
                    </p>

                    <div className="w-full max-w-xs space-y-2">
                      <div className="w-full h-2 bg-[#F4F7F7] rounded-full overflow-hidden border border-[#D8C4B6]">
                        <div
                          className="h-full bg-[#1C3D63] transition-all duration-300 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className="text-[10px] text-[#8E8276] text-center font-bold tracking-wider uppercase font-headline">
                        მზადდება პირველადი ანალიზი...
                      </p>
                    </div>

                    {/* Live Queue Position & Wait Time Badge */}
                    <div className="w-full max-w-md bg-[#F4F7F7] border border-[#D8C4B6] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3 text-left">
                      <div className="flex items-center justify-between border-b border-[#D8C4B6]/60 pb-3">
                        <div className="flex items-center space-x-2">
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E0AC6B] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E0AC6B]"></span>
                          </span>
                          <span className="text-xs font-bold uppercase tracking-wide text-[#1C3D63] font-headline">
                            პირდაპირი რიგი (Live Queue)
                          </span>
                        </div>
                        <span className="text-[10px] font-bold bg-white text-[#1C3D63] px-2.5 py-0.5 rounded-full border border-[#D8C4B6] uppercase font-headline">
                          აქტიური სესია
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div className="bg-white rounded-xl p-2.5 border border-[#D8C4B6]">
                          <span className="text-[10px] text-[#8E8276] uppercase tracking-wider block font-bold">რიგში თქვენს წინ:</span>
                          <span className="text-base sm:text-lg font-bold text-[#1C3D63] font-headline">
                            {queueCount} მომხმარებელი
                          </span>
                        </div>
                        <div className="bg-white rounded-xl p-2.5 border border-[#D8C4B6]">
                          <span className="text-[10px] text-[#8E8276] uppercase tracking-wider block font-bold">სავარაუდო დრო:</span>
                          <span className="text-base sm:text-lg font-bold text-[#3B5E63] font-headline">
                            ~{estimatedWaitTime} წუთი
                          </span>
                        </div>
                      </div>

                      {/* Don't want to wait? Send to WhatsApp option */}
                      {!notifySent ? (
                        <div className="pt-2 border-t border-[#D8C4B6]/60 space-y-2 text-left">
                          <p className="text-[11px] font-bold text-[#1C3D63] uppercase tracking-wider flex items-center gap-1.5 font-headline">
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                            არ გსურთ ლოდინი? მიიღეთ WhatsApp-ზე!
                          </p>
                          <p className="text-xs text-[#3B5E63] font-light leading-relaxed">
                            შეგიძლიათ დახუროთ გვერდი. ანალიზის დასრულებისთანავე ავტომატურად გამოგიგზავნით WhatsApp-ზე 📱
                          </p>
                          <div className="flex space-x-2">
                            <input
                              type="tel"
                              value={queuePhone}
                              onChange={(e) => setQueuePhone(e.target.value)}
                              placeholder="მაგ: 5XXXXXXXX"
                              className="flex-1 bg-white border border-[#D8C4B6] rounded-xl px-3 py-2 text-xs text-[#222222] placeholder-[#8E8276] focus:outline-none focus:border-[#1C3D63] font-semibold"
                            />
                            <button
                              type="button"
                              onClick={handleRegisterWhatsAppNotify}
                              className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-xs shrink-0 flex items-center gap-1 font-headline"
                            >
                              <span>გაგზავნა WA</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 bg-[#3B5E63]/10 border border-[#3B5E63]/25 rounded-xl text-[#1C3D63] text-xs font-bold text-center uppercase tracking-wider animate-fade-in flex items-center justify-center gap-2 font-headline">
                          <span className="material-symbols-outlined text-base text-emerald-600">check_circle</span>
                          <span>ანალიზი მზადებისთანავე გამოგიგზავნებათ WhatsApp-ზე!</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 2: Short Express Preview Card (Appears after fast load) */}
                {readingStage === 'SHORT_READY' && reading && (
                  <div className="bg-white border border-[#D8C4B6] p-6 sm:p-7 rounded-2xl mb-6 shadow-sm relative overflow-hidden font-sans animate-fade-in text-[#222222] text-left">
                    <div className="flex items-center space-x-2.5 mb-4">
                      <span className="material-symbols-outlined text-[#E0AC6B] text-2xl">auto_awesome</span>
                      <h3 className="text-base sm:text-lg font-bold tracking-wide text-[#1C3D63] uppercase font-headline">
                        {reading.title} - მოკლე ანალიზი
                      </h3>
                    </div>
                    
                    {/* Render Formatted Express Preview */}
                    <div
                      className="text-sm md:text-base leading-relaxed mb-6 font-light font-sans space-y-3 text-left"
                      dangerouslySetInnerHTML={{ __html: formatShortPreviewHtml(reading.content) }}
                    />

                    <button
                      onClick={() => setReadingStage('FULL_READY')}
                      className="w-full py-3.5 px-6 bg-[#1C3D63] hover:bg-[#254F7F] text-white rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-3 font-headline shadow-sm hover:scale-[1.01] active:scale-98"
                    >
                      <span>✨ იხილეთ სრული სიღრმისეული ანალიზი (გაიგე მეტი)</span>
                      <span className="material-symbols-outlined text-xl">expand_more</span>
                    </button>
                  </div>
                )}

                {/* STEP 3: Full Detailed Analysis Container (revealed on Learn More) */}
                {readingStage === 'FULL_READY' && (
                  <>
                    {/* Background loading still in progress for full reading */}
                    {loadingReading && (
                      <div className="flex flex-col items-center justify-center py-10 space-y-5 border-t border-[#D8C4B6]/60 pt-6 font-sans text-center">
                        <div className="w-9 h-9 border-3 border-[#1C3D63] border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm sm:text-base font-bold text-[#1C3D63] tracking-wide uppercase font-headline">
                          სრულდება სრული სიღრმისეული ანალიზი...
                        </p>
                        <div className="w-full max-w-xs space-y-2">
                          <div className="w-full h-2 bg-[#F4F7F7] rounded-full overflow-hidden border border-[#D8C4B6]">
                            <div
                              className="h-full bg-[#1C3D63] transition-all duration-300 rounded-full"
                              style={{ width: progress + '%' }}
                            ></div>
                          </div>
                          <p className="text-[10px] text-[#8E8276] text-center font-bold tracking-wider uppercase font-headline">
                            {progress < 100 ? 'ანალიზი მზადდება: ' + progress + '%' : 'ანალიზი მზადაა! ✨'}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Error View */}
                    {error && !loadingReading && (
                      <div className="flex items-start space-x-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-semibold mt-4">
                        <ShieldAlert className="w-4.5 h-4.5 text-red-600 shrink-0" />
                        <div className="space-y-1">
                          <p className="font-bold tracking-wide uppercase text-xs text-red-700 font-headline">შეცდომა ანალიზისას</p>
                          <p className="text-red-600 font-light">{error}</p>
                        </div>
                      </div>
                    )}

                    {/* Successful Reading Response */}
                    {reading && !loadingReading && (
                      <div className="space-y-6 text-[#222222] pt-4 border-t border-[#D8C4B6]/60 animate-fade-in font-sans">
                        <div className="border-b border-[#D8C4B6]/60 pb-4 text-left">
                          <h2 className="text-2xl sm:text-3xl tracking-wide text-[#1C3D63] uppercase font-bold font-headline">
                            {reading.title}
                          </h2>
                          <span className="text-xs text-[#3B5E63] font-light uppercase tracking-wider block mt-1">
                            ხელოვნური ინტელექტის სიღრმისეული ანალიზი
                          </span>
                        </div>
                        
                        {/* Render Full Formatted Analysis matching Balance Model */}
                        <div className="p-6 sm:p-8 bg-white border border-[#D8C4B6] rounded-2xl shadow-sm text-base text-[#222222] leading-relaxed font-normal animate-fade-in font-sans text-left mt-4">
                          <div
                            className="space-y-1 text-left"
                            dangerouslySetInnerHTML={{ __html: formatAnalysisHtml(reading.content) }}
                          />
                        </div>

                        {/* Beautiful Results Delivery & Sharing Options Card */}
                        <div className="mt-8 pt-6 border-t border-[#D8C4B6] space-y-6 font-sans">
                          <div className="p-6 bg-white border border-[#D8C4B6] rounded-2xl relative overflow-hidden shadow-sm text-left font-sans">
                            <div className="flex items-center space-x-2.5 mb-3">
                              <Share2 className="w-5 h-5 text-[#E0AC6B]" />
                              <h4 className="text-sm font-bold tracking-wide uppercase text-[#1C3D63] font-headline">
                                ანალიზის მიღება და შენახვა 🔮
                              </h4>
                            </div>
                            
                            <p className="text-xs text-[#3B5E63] font-light leading-relaxed mb-6 font-sans">
                              აირჩიეთ სასურველი არხი თქვენი სიღრმისეული ანალიზის მისაღებად და შესანახად.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Option 1: WhatsApp */}
                              <div className="bg-[#F4F7F7] border border-[#D8C4B6] rounded-xl p-5 space-y-4">
                                <div className="flex items-center space-x-2 text-[#1C3D63]">
                                  <MessageSquare className="w-4.5 h-4.5 text-[#E0AC6B]" />
                                  <span className="text-xs font-bold uppercase tracking-wider font-headline">WhatsApp-ზე გაგზავნა</span>
                                </div>
                                <input
                                  type="tel"
                                  value={deliveryPhone}
                                  onChange={(e) => {
                                    setDeliveryPhone(e.target.value);
                                    setDeliveryStatus(null);
                                  }}
                                  placeholder="მაგ: 5XXXXXXXX"
                                  className="w-full bg-white border border-[#D8C4B6] rounded-lg py-2.5 px-3 text-sm text-[#222222] placeholder-[#8E8276] focus:outline-none focus:border-[#1C3D63] font-semibold"
                                />
                                <button
                                  onClick={handleSendWhatsApp}
                                  className="w-full py-3 bg-[#1C3D63] hover:bg-[#254F7F] text-white text-[10px] font-bold tracking-wider uppercase rounded-lg transition-colors cursor-pointer flex items-center justify-center space-x-1.5 font-headline shadow-sm"
                                >
                                  <span>გაგზავნა WhatsApp-ზე</span>
                                </button>
                              </div>

                              {/* Option 2: Email */}
                              <div className="bg-[#F4F7F7] border border-[#D8C4B6] rounded-xl p-5 space-y-4">
                                <div className="flex items-center space-x-2 text-[#1C3D63]">
                                  <Send className="w-4.5 h-4.5 text-[#E0AC6B]" />
                                  <span className="text-xs font-bold uppercase tracking-wider font-headline font-sans">ელ. ფოსტაზე გაგზავნა</span>
                                </div>
                                <input
                                  type="email"
                                  value={deliveryEmail}
                                  onChange={(e) => {
                                    setDeliveryEmail(e.target.value);
                                    setDeliveryStatus(null);
                                  }}
                                  placeholder="მაგ: example@gmail.com"
                                  className="w-full bg-white border border-[#D8C4B6] rounded-lg py-2.5 px-3 text-sm text-[#222222] placeholder-[#8E8276] focus:outline-none focus:border-[#1C3D63] font-semibold font-sans"
                                />
                                <button
                                  onClick={handleSendEmail}
                                  className="w-full py-3 bg-[#1C3D63] hover:bg-[#254F7F] text-white text-[10px] font-bold tracking-wider uppercase rounded-lg transition-colors cursor-pointer flex items-center justify-center space-x-1.5 font-headline shadow-sm"
                                >
                                  <span>გაგზავნა ელ. ფოსტაზე</span>
                                </button>
                              </div>
                            </div>

                            {deliveryStatus && (
                              <div className="mt-4 p-3 bg-white border border-[#D8C4B6] rounded-xl flex flex-col items-center justify-center space-y-2 shadow-xs">
                                <div className="text-[#1C3D63] text-xs font-bold font-headline text-center uppercase tracking-wider">
                                  {deliveryStatus}
                                </div>
                                {deliveryWaLink && (
                                  <a
                                    href={deliveryWaLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all cursor-pointer shadow-xs font-headline"
                                  >
                                    <span>საკუთარი WhatsApp-ით გადაგზავნა 📲</span>
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* 2. Relationship Compatibility Panel */}
            <div className="space-y-6">
              <CompatibilityPanel
                userProfile={userProfile}
                invitedPhone={invitedPhone}
              />
              
              {/* Premium Multi-Channel Social Sharing Row */}
              {reading && !loadingReading && (
                <div className="w-full bg-white p-6 rounded-2xl border border-[#D8C4B6] shadow-sm relative flex flex-col items-center justify-center text-center space-y-3 font-sans">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C3D63] font-headline">
                    ანალიზის გაზიარება სოციალურ ქსელებში 🔮
                  </h4>
                  <div className="flex flex-wrap items-center justify-center gap-2.5">
                    {/* WhatsApp sharing */}
                    <a
                      href={getWhatsAppShareURL()}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      title="გააზიარე WhatsApp-ზე"
                      className="inline-flex items-center justify-center bg-[#F4F7F7] hover:bg-[#E5ECEC] border border-[#D8C4B6] text-[#1C3D63] px-4 py-2.5 rounded-xl transition-all cursor-pointer text-xs font-bold uppercase tracking-wider font-headline shadow-xs"
                    >
                      <MessageSquare className="w-4 h-4 mr-1.5 text-[#E0AC6B]" />
                      <span>WhatsApp</span>
                    </a>

                    {/* Telegram sharing */}
                    <a
                      href={getTelegramShareURL()}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      title="გააზიარე Telegram-ზე"
                      className="inline-flex items-center justify-center bg-[#F4F7F7] hover:bg-[#E5ECEC] border border-[#D8C4B6] text-[#1C3D63] px-4 py-2.5 rounded-xl transition-all cursor-pointer text-xs font-bold uppercase tracking-wider font-headline shadow-xs"
                    >
                      <Send className="w-4 h-4 mr-1.5 text-[#E0AC6B]" />
                      <span>Telegram</span>
                    </a>

                    {/* Facebook sharing */}
                    <a
                      href={getFacebookShareURL()}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      title="გააზიარე Facebook-ზე"
                      className="inline-flex items-center justify-center bg-[#F4F7F7] hover:bg-[#E5ECEC] border border-[#D8C4B6] text-[#1C3D63] px-4 py-2.5 rounded-xl transition-all cursor-pointer text-xs font-bold uppercase tracking-wider font-headline shadow-xs"
                    >
                      <Facebook className="w-4 h-4 mr-1.5 text-[#E0AC6B]" />
                      <span>Facebook</span>
                    </a>

                    {/* Copy link */}
                    <button
                      onClick={handleCopyLink}
                      title="ბმულის კოპირება"
                      className={`inline-flex items-center justify-center px-4 py-2.5 rounded-xl border transition-all cursor-pointer text-xs font-bold uppercase tracking-wider font-headline shadow-xs relative ${
                        copiedLink 
                          ? "bg-[#3B5E63]/10 border-[#3B5E63] text-[#3B5E63]" 
                          : "bg-[#F4F7F7] hover:bg-[#E5ECEC] border-[#D8C4B6] text-[#1C3D63]"
                      }`}
                    >
                      <Link className="w-4 h-4 mr-1.5 text-[#E0AC6B]" />
                      <span>
                        {copiedLink ? "ლინკი კოპირებულია" : "კოპირება"}
                      </span>
                      
                      {/* Success Tooltip */}
                      {copiedLink && (
                        <span className="absolute -top-9 left-1/2 transform -translate-x-1/2 bg-[#1C3D63] text-white text-[10px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-md shadow-md pointer-events-none whitespace-nowrap font-headline">
                          ბმული კოპირებულია!
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Models Table of Contents / Index (შესვლის სარჩევი) */}
            <ModelCatalog
              onSelect={(type) => {
                handleSelectReading(userProfile.phone, type, userProfile.birthTime, userProfile);
                const el = document.getElementById("reading-display");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              selectedType={selectedType}
              preferredTheme={userProfile.theme || null}
            />
          </div>
        )}
      </div>

      {/* Birth Time Inline Quick Edit Modal */}
      {showTimeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in font-sans">
          <div className="bg-white border border-[#D8C4B6] p-6 sm:p-8 rounded-2xl max-w-md w-full shadow-2xl relative space-y-5 text-left text-[#222222]">
            <div className="flex items-center justify-between border-b border-[#D8C4B6]/60 pb-3">
              <h3 className="text-base font-bold text-[#1C3D63] uppercase tracking-wide flex items-center gap-2 font-headline">
                <span className="material-symbols-outlined text-[#E0AC6B] text-xl">schedule</span>
                <span>დაბადების საათის ჩამატება</span>
              </h3>
              <button
                onClick={() => setShowTimeModal(false)}
                className="text-[#8E8276] hover:text-[#1C3D63] text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#3B5E63] leading-relaxed font-light">
              ადამიანის დიზაინის, ჰოროსკოპის, ვედური ასტროლოგიისა და ბაზის მოდელებისთვის ზუსტი საათი (მაგ: 14:30) უზრუნველყოფს მაქსიმალურ სიზუსტეს.
            </p>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1C3D63] font-headline">
                მიუთითეთ დაბადების საათი:
              </label>
              <div className="relative bg-[#F4F7F7] border border-[#D8C4B6] rounded-xl p-2.5">
                <input
                  type="time"
                  value={tempBirthTime}
                  onChange={(e) => setTempBirthTime(e.target.value)}
                  className="w-full bg-transparent border-0 text-lg text-[#1C3D63] font-bold text-center tracking-widest focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowTimeModal(false)}
                className="px-4 py-2 bg-[#F4F7F7] hover:bg-[#E5ECEC] border border-[#D8C4B6] text-xs font-bold text-[#1C3D63] rounded-xl uppercase tracking-wider cursor-pointer font-headline"
              >
                გაუქმება
              </button>
              <button
                type="button"
                disabled={savingTime}
                onClick={async () => {
                  if (!userProfile) return;
                  setSavingTime(true);
                  const updatedTime = tempBirthTime.trim() || undefined;
                  const updatedProfile: BirthProfile = {
                    ...userProfile,
                    birthTime: updatedTime
                  };

                  setUserProfile(updatedProfile);

                  // Permanently store to localStorage
                  if (updatedTime) {
                    localStorage.setItem("idc_user_birthtime", updatedTime);
                  } else {
                    localStorage.removeItem("idc_user_birthtime");
                  }
                  try {
                    const stored = localStorage.getItem("saved_profiles");
                    if (stored) {
                      let list = JSON.parse(stored);
                      if (Array.isArray(list)) {
                        list = list.map((p: any) => {
                          if (p.phone === userProfile.phone) {
                            return { ...p, birthTime: updatedTime };
                          }
                          return p;
                        });
                        localStorage.setItem("saved_profiles", JSON.stringify(list));
                      }
                    }
                  } catch (e) {
                    console.error("Error updating saved_profiles with birthTime:", e);
                  }

                  try {
                    await saveProfile({
                      name: userProfile.name,
                      surname: userProfile.surname,
                      birthPlace: userProfile.birthPlace || "საქართველო",
                      day: userProfile.day,
                      month: userProfile.month,
                      year: userProfile.year,
                      birthTime: updatedTime,
                      phone: userProfile.phone
                    });
                  } catch (e) {
                    console.error("Error saving birthTime inline:", e);
                  } finally {
                    setSavingTime(false);
                    setShowTimeModal(false);
                    if (selectedType) {
                      handleSelectReading(userProfile.phone, selectedType, updatedTime, updatedProfile);
                    }
                  }
                }}
                className="px-6 py-2.5 bg-[#1C3D63] hover:bg-[#254F7F] text-white text-xs font-bold rounded-xl uppercase tracking-wider cursor-pointer shadow-sm flex items-center gap-1.5 font-headline"
              >
                {savingTime ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <span>შენახვა</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer copyright */}
      <footer className="w-full text-center border-t border-[#D8C4B6]/60 mt-16 pt-6 text-[10px] text-[#8E8276] font-medium tracking-wider uppercase font-headline">
        აიდისი &copy; {new Date().getFullYear()} / ყველა ანალიტიკური გამოთვლა მუშავდება ხელოვნური ინტელექტის ალგორითმით.
      </footer>
    </div>
  );
}
