import { useState, useEffect } from "react";
import { getProfile, generateReading, deleteProfile, saveProfile } from "./lib/api";
import { BirthProfile, CalculationType, ReadingResponse } from "./types";
import { ProfileForm } from "./components/ProfileForm";
import { SpinWheel } from "./components/SpinWheel";
import { CompatibilityPanel } from "./components/CompatibilityPanel";
import { Sparkles, RefreshCw, MessageSquare, Edit3, UserCheck, Star, ShieldAlert, ArrowLeft, Send, Facebook, Link, Share2, Smartphone, MessageCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";

const getTarotIllustration = (type: CalculationType) => {
  switch (type) {
    case CalculationType.HOROSCOPE:
      return (
        <svg className="w-12 h-12 text-[#f1bf62]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="50" cy="50" r="40" strokeDasharray="3 3" opacity="0.4" />
          <circle cx="50" cy="50" r="28" strokeWidth="0.8" opacity="0.6" />
          <path d="M50 25 A 25 25 0 0 1 75 50 A 25 25 0 0 0 50 25" fill="#f1bf62" fillOpacity="0.25" />
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
        <svg className="w-12 h-12 text-[#f1bf62]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
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
        <svg className="w-12 h-12 text-[#f1bf62]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="15" y="15" width="70" height="70" rx="10" strokeDasharray="4 4" opacity="0.3" />
          <path d="M15 38 H85 M15 62 H85 M38 15 V85 M62 15 V85" strokeWidth="0.8" opacity="0.5" />
          <path d="M50 50 A 5 5 0 0 1 55 50 A 10 10 0 0 1 45 50 A 20 20 0 0 1 65 50 A 30 30 0 0 1 35 50 A 40 40 0 0 1 75 50" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
          <circle cx="38" cy="38" r="2" fill="currentColor" />
          <circle cx="62" cy="62" r="2" fill="currentColor" />
          <circle cx="38" cy="62" r="1.5" fill="currentColor" opacity="0.7" />
          <circle cx="62" cy="38" r="1.5" fill="currentColor" opacity="0.7" />
          <circle cx="50" cy="50" r="3" fill="#f1bf62" className="animate-pulse" />
        </svg>
      );
    case CalculationType.NUMEROLOGY:
      return (
        <svg className="w-12 h-12 text-[#f1bf62]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
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
        <svg className="w-12 h-12 text-[#f1bf62]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
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
        <svg className="w-12 h-12 text-[#f1bf62]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="50" cy="50" r="42" strokeDasharray="4 4" opacity="0.3" />
          <path d="M50 15 C45 30 30 45 15 50 C30 55 45 70 50 85 C55 70 70 55 85 50 C70 45 55 30 50 15 Z" strokeWidth="1.2" fill="currentColor" fillOpacity="0.1" />
          <path d="M50 25 C47 35 35 47 25 50 C35 53 47 65 50 75 C53 65 65 53 75 50 C65 47 53 35 50 25 Z" strokeWidth="0.8" fill="#f1bf62" fillOpacity="0.2" />
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
        <svg className="w-12 h-12 text-[#f1bf62]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
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
        <svg className="w-12 h-12 text-[#f1bf62]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
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

  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [linkingPhone, setLinkingPhone] = useState(false);
  const [linkedSuccessfully, setLinkedSuccessfully] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Reassuring cosmic loading messages in Georgian
  const loadingMessages = [
    "ვარსკვლავური რუკა იხაზება...",
    "პლანეტების განლაგება ითვლება...",
    "პითაგორას სპეციალური ვიბრაციები ანგარიშდება...",
    "ენიაგრამის ფსიქოლოგიური კოდი იშიფრება...",
    "ჩინური 5 ელემენტის ბალანსი მუშავდება...",
    "ხელოვნური ინტელექტი აჯამებს მონაცემებს...",
  ];
  // Dynamic Real-Time Adaptive Progress Bar (0% to 100%)
  const [progress, setProgress] = useState(0);

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

  // Adaptive progress calculation based on real network loading state
  useEffect(() => {
    let interval: any;
    if (loadingReading) {
      setProgress(5);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 40) return prev + 10;
          if (prev < 75) return prev + 5;
          if (prev < 94) return prev + 2;
          return prev;
        });
      }, 500);
    } else {
      setProgress(100);
    }
    return () => clearInterval(interval);
  }, [loadingReading]);

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
      if (data.success && data.exists) {
        setUserProfile(data.profile);
      }
    } catch (err) {
      console.error("Error autoloading profile:", err);
    }
  };

  const handleProfileSaved = (profile: BirthProfile, initialTheme?: CalculationType) => {
    setUserProfile(profile);
    localStorage.setItem("user_phone", profile.phone);
    if (initialTheme) {
      handleSelectReading(profile.phone, initialTheme, true);
    }
  };

  const handleSelectReading = async (phone: string, type: CalculationType, shouldFreeze = false) => {
    setSelectedType(type);
    setReadingStage('LOADING_SHORT');
    setLoadingReading(true);
    setError(null);
    setReading(null);

    // Fast initial delay (1.2s) to show loading screen first before short summary appears
    setTimeout(() => {
      setReadingStage((prev) => (prev === 'LOADING_SHORT' ? 'SHORT_READY' : prev));
    }, 1200);

    try {
      const data = await generateReading(phone, type);
      if (data.success) {
        setReading(data);
      } else {
        setError("ვერ მოხერხდა ანალიზის გენერირება.");
      }
    } catch (err) {
      setError("კავშირის შეცდომა. სცადეთ მოგვიანებით.");
    } finally {
      if (!shouldFreeze) {
        setLoadingReading(false);
      }
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

        // 3. Update local states
        const updatedProfile = saveData.profile;
        setUserProfile(updatedProfile);
        localStorage.setItem("user_phone", cleanPhone);
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
    <div className="relative w-full text-[#c6c6ce] flex flex-col justify-between py-4 z-10 selection:bg-white/10 selection:text-white">
      
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
          <div className="w-full bg-[#1e2022]/60 p-7 rounded-2xl border border-[#f1bf62]/10 hover:border-[#f1bf62]/20 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative backdrop-blur-md transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(241,191,98,0.03)]">
            <div className="absolute top-0 left-0 w-[2px] h-full bg-[#f1bf62] rounded-l-2xl"></div>
            
            {showDeleteConfirm ? (
              <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 py-2">
                <div className="text-left space-y-1.5">
                  <h4 className="text-sm uppercase tracking-widest text-red-400 font-bold flex items-center gap-1.5 font-headline">
                    <ShieldAlert className="w-4 h-4 text-red-400" /> მონაცემების სამუდამოდ წაშლა და თავიდან დაწყება
                  </h4>
                  <p className="text-[12px] text-[#c6c6ce]/80 uppercase tracking-wider font-semibold">
                    დარწმუნებული ხართ ფაილების, ანალიზების და სახელი/თარიღის სრულად წაშლაზე?
                  </p>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
                  <button
                    onClick={handleDeleteProfile}
                    className="flex-1 md:flex-none px-5 py-3 bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold tracking-widest uppercase transition-all cursor-pointer text-center rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                  >
                    დიახ, წაშლა
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 md:flex-none px-5 py-3 bg-white/5 hover:bg-white/10 text-[#c6c6ce] hover:text-white border border-white/10 text-[11px] font-bold tracking-widest uppercase transition-all cursor-pointer text-center rounded-xl"
                  >
                    გაუქმება
                  </button>
                </div>
              </div>
            ) : showResetConfirm ? (
              <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 py-2">
                <div className="text-left space-y-1.5">
                  <h4 className="text-sm uppercase tracking-widest text-white font-bold flex items-center gap-1.5 font-headline">
                    <Edit3 className="w-4 h-4 text-white" /> პროფილის შეცვლა
                  </h4>
                  <p className="text-[12px] text-[#c6c6ce]/80 uppercase tracking-wider font-semibold">
                    ნამდვილად გსურთ მიმდინარე პროფილის დახურვა და ახლის შეყვანა?
                  </p>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
                  <button
                    onClick={handleResetProfile}
                    className="flex-1 md:flex-none px-5 py-3 bg-[#f1bf62] hover:bg-[#f1bf62]/90 text-[#121416] text-[11px] font-bold tracking-widest uppercase transition-all cursor-pointer text-center rounded-xl shadow-[0_0_15px_rgba(241,191,98,0.3)]"
                  >
                    შეცვლა
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 md:flex-none px-5 py-3 bg-white/5 hover:bg-white/10 text-[#c6c6ce] hover:text-white border border-white/10 text-[11px] font-bold tracking-widest uppercase transition-all cursor-pointer text-center rounded-xl"
                  >
                    გაუქმება
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-4">
                  <div className="w-13 h-13 rounded-full border border-white/20 bg-white/5 flex items-center justify-center font-bold text-lg text-[#f1bf62] shadow-[0_0_10px_rgba(241,191,98,0.2)]" id="active-profile-avatar">
                    {userProfile.name[0]}
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-3 flex-wrap gap-y-1">
                      <h3 className="text-base font-bold tracking-wide text-[#f1bf62] uppercase font-headline" id="active-profile-name">
                        {userProfile.name} {userProfile.surname}
                      </h3>
                      <span className="text-[10px] bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-lg font-bold uppercase tracking-widest flex items-center gap-1" id="active-profile-status">
                        <UserCheck className="w-3 h-3 text-emerald-400" /> აქტიური
                      </span>
                    </div>
                    <p className="text-[12px] text-[#c6c6ce]/70 font-semibold uppercase tracking-widest leading-relaxed">
                      დაბადებული: {userProfile.day}/{userProfile.month}/{userProfile.year} • {userProfile.birthPlace}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => {
                      setShowResetConfirm(true);
                      setShowDeleteConfirm(false);
                    }}
                    className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-[#c6c6ce] hover:text-white border border-white/10 text-[10px] font-bold tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer self-start sm:self-auto"
                    id="btn-trigger-reset"
                  >
                    <Edit3 className="w-4 h-4 text-[#c6c6ce]" /> პროფილის შეცვლა
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(true);
                      setShowResetConfirm(false);
                    }}
                    className="px-5 py-2.5 bg-red-950/20 hover:bg-red-900/30 text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/30 text-[10px] font-bold tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer self-start sm:self-auto"
                    id="btn-trigger-delete"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-red-450 shrink-0" /> წაშლა და თავიდან დაწყება
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
              <div id="reading-display" className="w-full bg-[#1e2022]/60 p-8 rounded-2xl border border-white/5 shadow-2xl transition-all relative backdrop-blur-md">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#f1bf62] rounded-t-2xl"></div>
                
                {/* Back Button */}
                <button
                  onClick={() => {
                    setReading(null);
                    setSelectedType(null);
                    setError(null);
                    setReadingStage('IDLE');
                  }}
                  className="inline-flex items-center space-x-2 text-[11px] tracking-widest text-[#c6c6ce] hover:text-[#f1bf62] font-bold uppercase transition-all mb-6 group cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                  <span>უკან დაბრუნება</span>
                </button>

                {/* STEP 1: Fast Loading Screen immediately after selection */}
                {readingStage === 'LOADING_SHORT' && (
                  <div className="flex flex-col items-center justify-center py-12 space-y-6">
                    {selectedType && (
                      <div className="relative flex items-center justify-center mb-2">
                        <div className="absolute w-[180px] h-[180px] rounded-full border border-dashed border-[#f1bf62]/30 animate-[spin_20s_linear_infinite] pointer-events-none"></div>
                        <div className="absolute w-[150px] h-[150px] rounded-full border border-[#f1bf62]/15 animate-[spin_10s_linear_infinite_reverse] pointer-events-none"></div>
                        
                        <div className="w-[120px] h-[170px] rounded-xl border-2 border-[#f1bf62]/35 bg-[#1e2022]/95 flex flex-col items-center justify-center p-3.5 shadow-[0_15px_35px_rgba(0,0,0,0.9),0_0_25px_rgba(241,191,98,0.15)] relative overflow-hidden animate-bounce z-10">
                          <div className="my-auto text-[#f1bf62] scale-[1.3] drop-shadow-[0_0_12px_rgba(241,191,98,0.45)]">
                            {getTarotIllustration(selectedType)}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <p className="text-[17px] sm:text-[21px] font-black text-[#f1bf62] tracking-[0.2em] text-center font-headline animate-pulse uppercase max-w-lg px-4 leading-relaxed">
                      {loadingMessages[loadingMsgIdx]}
                    </p>

                    <div className="w-full max-w-xs space-y-2">
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
                        <div
                          className="h-full bg-gradient-to-r from-[#f1bf62] via-[#ffda8b] to-[#f1bf62] transition-all duration-300 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className="text-[11px] text-[#c6c6ce]/80 text-center font-black tracking-wider uppercase font-sans">
                        მზადდება პირველადი ანალიზი...
                      </p>
                    </div>
                  </div>
                )}

                {/* STEP 2 & 3: Short Express Preview Card (Appears after fast load) */}
                {(readingStage === 'SHORT_READY' || readingStage === 'FULL_READY') && selectedType && EXPRESS_PREVIEWS[selectedType] && (
                  <div className="bg-[#1e2022]/80 border border-[#f1bf62]/30 p-6 rounded-2xl mb-6 shadow-2xl backdrop-blur-md relative overflow-hidden animate-fade-in">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#f1bf62]"></div>
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="material-symbols-outlined text-[#f1bf62] text-2xl animate-pulse">auto_awesome</span>
                      <h3 className="text-lg font-black tracking-widest text-[#f1bf62] uppercase font-headline">
                        {EXPRESS_PREVIEWS[selectedType].title}
                      </h3>
                    </div>
                    <p className="text-sm font-bold text-white/95 leading-relaxed mb-2 font-sans">
                      {EXPRESS_PREVIEWS[selectedType].highlight}
                    </p>
                    <p className="text-xs text-[#c6c6ce]/80 leading-relaxed font-medium">
                      {EXPRESS_PREVIEWS[selectedType].details}
                    </p>

                    {readingStage === 'SHORT_READY' && (
                      <button
                        onClick={() => setReadingStage('FULL_READY')}
                        className="w-full mt-6 py-4 px-6 bg-gradient-to-r from-[#f1bf62]/20 via-[#b8860b]/30 to-[#f1bf62]/20 hover:from-[#f1bf62]/35 hover:to-[#f1bf62]/35 border border-[#f1bf62]/50 hover:border-[#f1bf62] text-[#f1bf62] hover:text-white rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest transition-all cursor-pointer shadow-[0_10px_25px_rgba(241,191,98,0.2)] flex flex-col items-center justify-center gap-2 hover:scale-[1.01] active:scale-98 font-headline relative overflow-hidden group"
                      >
                        <div className="flex items-center gap-3">
                          <span>{reading ? "✅ სრული ანალიზი მზადაა — დააჭირეთ სანახავად (გაიგე მეტი)" : "✨ სრული სიღრმისეული ანალიზის ნახვა (გაიგე მეტი)"}</span>
                          <span className="material-symbols-outlined text-xl animate-bounce">expand_more</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#f1bf62] to-[#ffda8b] transition-all duration-300 rounded-full"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </button>
                    )}
                  </div>
                )}

                {/* STEP 3: Full Detailed Analysis Container (revealed on Learn More) */}
                {readingStage === 'FULL_READY' && (
                  <>
                    {/* Background loading still in progress for full reading */}
                    {loadingReading && (
                      <div className="flex flex-col items-center justify-center py-10 space-y-6 border-t border-white/10 pt-6 font-sans">
                        <div className="w-10 h-10 border-4 border-[#f1bf62] border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-[15px] font-black text-[#f1bf62] tracking-[0.15em] text-center font-headline animate-pulse uppercase max-w-lg px-4 leading-relaxed">
                          სრულდება სრული სიღრმისეული ანალიზი...
                        </p>
                        <div className="w-full max-w-xs space-y-2">
                          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
                            <div
                              className="h-full bg-gradient-to-r from-[#f1bf62] via-[#ffda8b] to-[#f1bf62] transition-all duration-300 rounded-full"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                          <p className="text-[11px] text-[#c6c6ce]/80 text-center font-black tracking-wider uppercase font-sans">
                            {progress < 100 ? `ანალიზი მზადდება: ${progress}%` : "ანალიზი მზადაა! ✨"}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Error View */}
                    {error && !loadingReading && (
                      <div className="flex items-start space-x-3 p-4 bg-red-950/20 border border-red-500/20 rounded-xl text-red-300 text-sm font-semibold mt-4">
                        <ShieldAlert className="w-4.5 h-4.5 text-red-400 shrink-0" />
                        <div className="space-y-1">
                          <p className="font-extrabold tracking-wider uppercase text-[11px] text-[#f1bf62] font-headline">შეცდომა ანალიზისას</p>
                          <p className="text-[#c6c6ce]/80">{error}</p>
                        </div>
                      </div>
                    )}

                    {/* Successful Reading Response */}
                    {reading && !loadingReading && (
                      <div className="space-y-6 text-[#c6c6ce] pt-4 border-t border-white/10 animate-fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-5 gap-3">
                      <div>
                        <h2 className="text-2xl sm:text-3xl tracking-widest text-[#f1bf62] uppercase font-black font-headline drop-shadow-[0_2px_12px_rgba(241,191,98,0.3)]">
                          {reading.title}
                        </h2>
                        <span className="text-[11px] sm:text-xs text-[#c6c6ce]/80 font-black tracking-widest uppercase block mt-1.5">
                          ხელოვნური ინტელექტის უნივერსალური ანალიზი
                        </span>
                      </div>
                    </div>
                    
                    {/* Render Markdown Response elegantly */}
                    <div className="text-[#c6c6ce] text-sm md:text-base leading-relaxed max-w-none overflow-hidden font-medium">
                      <ReactMarkdown
                        components={{
                          h1: ({node, ...props}) => <h1 className="text-xl sm:text-2xl font-black text-[#f1bf62] font-headline tracking-widest mt-6 mb-2 border-b border-white/5 pb-2 uppercase" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-lg sm:text-xl font-black text-[#f1bf62] font-headline tracking-wider mt-5 mb-2 uppercase" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-base sm:text-lg font-bold text-[#f1bf62] font-headline mt-4 mb-1.5 uppercase" {...props} />,
                          p: ({node, ...props}) => <p className="text-sm sm:text-base text-[#c6c6ce]/90 leading-relaxed my-2.5 font-medium" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc pl-6 my-3 space-y-2 text-sm sm:text-base text-[#c6c6ce]/80 font-medium" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-3 space-y-2 text-sm sm:text-base text-[#c6c6ce]/80 font-medium" {...props} />,
                          li: ({node, ...props}) => <li className="marker:text-[#f1bf62]" {...props} />,
                          strong: ({node, ...props}) => <strong className="text-[#f1bf62] font-black" {...props} />,
                          hr: ({node, ...props}) => <hr className="border-white/10 my-6" {...props} />,
                        }}
                      >
                        {reading.content}
                      </ReactMarkdown>
                    </div>

                    {/* Optional request for phone number to send to WhatsApp */}
                    {userProfile && userProfile.phone.startsWith("temp_") && (
                      <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                        <div className="p-6 bg-[#1e2022]/40 border border-white/5 rounded-2xl relative overflow-hidden shadow-2xl">
                          <div className="absolute top-0 left-0 w-[2px] h-full bg-[#f1bf62] rounded-l-2xl"></div>
                          
                          <div className="flex items-center space-x-2.5 mb-2">
                            <MessageSquare className="w-4.5 h-4.5 text-[#f1bf62]" />
                            <h4 className="text-sm font-black tracking-widest uppercase text-[#f1bf62] font-headline">
                              მიიღეთ სრული პასუხი ტელეფონზე (WhatsApp) 📱
                            </h4>
                          </div>
                          
                          <p className="text-[12px] text-[#c6c6ce]/80 font-semibold uppercase tracking-wider leading-relaxed">
                            შეიყვანეთ თქვენი ტელეფონის ნომერი, რათა სრული პასუხი გაიგზავნოს WhatsApp-ზე და შეინახოთ თქვენი კოსმიური პროფილი მუდმივ ბაზაში.
                          </p>
                          
                          {!linkedSuccessfully ? (
                            <div className="mt-4 flex flex-col sm:flex-row gap-3">
                              <div className="flex-1">
                                <input
                                  type="tel"
                                  value={phoneNumberInput}
                                  onChange={(e) => {
                                    setPhoneNumberInput(e.target.value);
                                    setLinkError(null);
                                  }}
                                  placeholder="მაგ: +995555123456"
                                  className="w-full bg-transparent border-b border-white/10 py-3 text-base text-white placeholder-[#c6c6ce]/40 focus:outline-none focus:border-[#f1bf62] transition-colors font-semibold"
                                />
                                {linkError && (
                                  <p className="text-red-400 text-[11px] font-bold uppercase tracking-wider mt-1.5">{linkError}</p>
                                )}
                              </div>
                              
                              <button
                                onClick={handleLinkPhoneAndShare}
                                disabled={linkingPhone}
                                className="px-5 py-3.5 bg-[#f1bf62] hover:bg-[#f1bf62]/90 text-[#121416] text-[11px] font-bold tracking-widest uppercase rounded-xl transition-colors duration-200 shrink-0 self-start sm:self-auto flex items-center justify-center space-x-1.5 disabled:opacity-50 cursor-pointer shadow-[0_0_15px_rgba(241,191,98,0.3)]"
                              >
                                {linkingPhone ? (
                                  <>
                                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#121416]" />
                                    <span>მიმდინარეობს...</span>
                                  </>
                                ) : (
                                  <span>გაგზავნა & შენახვა</span>
                                )}
                              </button>
                            </div>
                          ) : (
                            <div className="mt-4 p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl space-y-3">
                              <p className="text-[12px] text-emerald-400 uppercase tracking-wider font-bold">
                                პროფილი წარმატებით შეინახა ტელეფონზე! 🎉
                              </p>
                              
                              <div className="flex flex-wrap gap-2.5">
                                <a
                                  href={getCustomWhatsAppShareURL(phoneNumberInput)}
                                  target="_blank"
                                  referrerPolicy="no-referrer"
                                  className="inline-flex items-center justify-center bg-gradient-to-b from-white/8 to-white/2 hover:from-[#f1bf62]/20 hover:to-[#b8860b]/10 border border-white/10 hover:border-[#f1bf62]/40 text-[#c6c6ce] hover:text-[#f1bf62] py-3 px-5 rounded-xl transition-all cursor-pointer hover:scale-[1.03] active:scale-95 shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.5)] text-[10px] font-black uppercase tracking-widest"
                                >
                                  <MessageSquare className="w-3.5 h-3.5 mr-2 text-[#f1bf62]" />
                                  <span>WhatsApp</span>
                                </a>

                                <a
                                  href={getCustomTelegramShareURL(phoneNumberInput)}
                                  target="_blank"
                                  referrerPolicy="no-referrer"
                                  className="inline-flex items-center justify-center bg-gradient-to-b from-white/8 to-white/2 hover:from-[#f1bf62]/20 hover:to-[#b8860b]/10 border border-white/10 hover:border-[#f1bf62]/40 text-[#c6c6ce] hover:text-[#f1bf62] py-3 px-5 rounded-xl transition-all cursor-pointer hover:scale-[1.03] active:scale-95 shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.5)] text-[10px] font-black uppercase tracking-widest"
                                >
                                  <Send className="w-3.5 h-3.5 mr-2 text-[#f1bf62]" />
                                  <span>Telegram</span>
                                </a>

                                <a
                                  href={getCustomMessengerShareURL(phoneNumberInput)}
                                  target="_blank"
                                  referrerPolicy="no-referrer"
                                  className="inline-flex items-center justify-center bg-gradient-to-b from-white/8 to-white/2 hover:from-[#f1bf62]/20 hover:to-[#b8860b]/10 border border-white/10 hover:border-[#f1bf62]/40 text-[#c6c6ce] hover:text-[#f1bf62] py-3 px-5 rounded-xl transition-all cursor-pointer hover:scale-[1.03] active:scale-95 shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.5)] text-[10px] font-black uppercase tracking-widest"
                                >
                                  <MessageCircle className="w-3.5 h-3.5 mr-2 text-[#f1bf62]" />
                                  <span>Messenger</span>
                                </a>

                                <a
                                  href={getCustomFacebookShareURL(phoneNumberInput)}
                                  target="_blank"
                                  referrerPolicy="no-referrer"
                                  className="inline-flex items-center justify-center bg-gradient-to-b from-white/8 to-white/2 hover:from-[#f1bf62]/20 hover:to-[#b8860b]/10 border border-white/10 hover:border-[#f1bf62]/40 text-[#c6c6ce] hover:text-[#f1bf62] py-3 px-5 rounded-xl transition-all cursor-pointer hover:scale-[1.03] active:scale-95 shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.5)] text-[10px] font-black uppercase tracking-widest"
                                >
                                  <Facebook className="w-3.5 h-3.5 mr-2 text-[#f1bf62]" />
                                  <span>Facebook</span>
                                </a>

                                <button
                                  onClick={() => handleCustomNativeShare(phoneNumberInput)}
                                  className="inline-flex items-center justify-center bg-gradient-to-b from-white/8 to-white/2 hover:from-[#f1bf62]/20 hover:to-[#b8860b]/10 border border-white/10 hover:border-[#f1bf62]/40 text-[#c6c6ce] hover:text-[#f1bf62] py-3 px-5 rounded-xl transition-all cursor-pointer hover:scale-[1.03] active:scale-95 shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.5)] text-[10px] font-black uppercase tracking-widest cursor-pointer"
                                >
                                  <Smartphone className="w-3.5 h-3.5 mr-2 text-[#f1bf62]" />
                                  <span>ტელეფონში</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}

            {/* 2. Relationship Compatibility Panel */}
            <div className="space-y-6">
              {/* Temporarily Disabled - missing n8n workflow */}
              {false && (
                <CompatibilityPanel
                  userProfile={userProfile}
                  invitedPhone={invitedPhone}
                />
              )}
              
              {/* Premium Multi-Channel Social Sharing Row */}
              {reading && !loadingReading && (
                <div className="w-full bg-[#1e2022]/60 p-6 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-md relative flex flex-col items-center justify-center text-center space-y-4">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-[#f1bf62] rounded-t-2xl"></div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-[#f1bf62] font-headline">
                    ანალიზის გაზიარება სოციალურ ქსელებში 🔮
                  </h4>
                  <div className="flex flex-wrap items-center justify-center gap-2.5 p-1.5 bg-white/3 border border-white/5 rounded-2xl backdrop-blur-md shadow-2xl relative self-start sm:self-auto">
                    {/* WhatsApp sharing */}
                    <a
                      href={getWhatsAppShareURL()}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      title="გააზიარე WhatsApp-ზე"
                      className="inline-flex items-center justify-center bg-gradient-to-b from-white/8 to-white/2 hover:from-[#f1bf62]/20 hover:to-[#b8860b]/10 border border-white/10 hover:border-[#f1bf62]/40 text-[#c6c6ce] hover:text-[#f1bf62] px-4 py-3 rounded-xl transition-all cursor-pointer hover:scale-[1.03] active:scale-95 shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.5)] text-[10px] font-black uppercase tracking-widest"
                    >
                      <MessageSquare className="w-3.5 h-3.5 mr-2 text-[#f1bf62]" />
                      <span>WhatsApp</span>
                    </a>

                    {/* Telegram sharing */}
                    <a
                      href={getTelegramShareURL()}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      title="გააზიარე Telegram-ზე"
                      className="inline-flex items-center justify-center bg-gradient-to-b from-white/8 to-white/2 hover:from-[#f1bf62]/20 hover:to-[#b8860b]/10 border border-white/10 hover:border-[#f1bf62]/40 text-[#c6c6ce] hover:text-[#f1bf62] px-4 py-3 rounded-xl transition-all cursor-pointer hover:scale-[1.03] active:scale-95 shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.5)] text-[10px] font-black uppercase tracking-widest"
                    >
                      <Send className="w-3.5 h-3.5 mr-2 text-[#f1bf62]" />
                      <span>Telegram</span>
                    </a>

                    {/* Facebook sharing */}
                    <a
                      href={getFacebookShareURL()}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      title="გააზიარე Facebook-ზე"
                      className="inline-flex items-center justify-center bg-gradient-to-b from-white/8 to-white/2 hover:from-[#f1bf62]/20 hover:to-[#b8860b]/10 border border-white/10 hover:border-[#f1bf62]/40 text-[#c6c6ce] hover:text-[#f1bf62] px-4 py-3 rounded-xl transition-all cursor-pointer hover:scale-[1.03] active:scale-95 shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.5)] text-[10px] font-black uppercase tracking-widest"
                    >
                      <Facebook className="w-3.5 h-3.5 mr-2 text-[#f1bf62]" />
                      <span>Facebook</span>
                    </a>

                    {/* Copy link */}
                    <button
                      onClick={handleCopyLink}
                      title="ბმულის კოპირება"
                      className={`inline-flex items-center justify-center px-4 py-3 rounded-xl border transition-all cursor-pointer hover:scale-[1.03] active:scale-95 shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.5)] relative text-[10px] font-black uppercase tracking-widest ${
                        copiedLink 
                          ? "bg-[#f1bf62]/15 border-[#f1bf62] text-[#f1bf62] shadow-[0_0_15px_rgba(241,191,98,0.2)]" 
                          : "bg-gradient-to-b from-white/8 to-white/2 border-white/10 text-white hover:border-[#f1bf62] hover:text-[#f1bf62]"
                      }`}
                    >
                      <Link className="w-3.5 h-3.5 mr-2 text-[#f1bf62]" />
                      <span>
                        {copiedLink ? "ლინკი კოპირებულია" : "კოპირება"}
                      </span>
                      
                      {/* Success Tooltip */}
                      {copiedLink && (
                        <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[#f1bf62] text-[#121416] text-[10px] font-black uppercase tracking-wider py-1.5 px-3 rounded-md shadow-lg pointer-events-none animate-bounce z-50 whitespace-nowrap border border-white/10">
                          ბმული კოპირებულია!
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Spinner (ბზრიალა) container */}
            <div className="bg-[#1e2022]/60 p-6 rounded-2xl border border-white/5 shadow-2xl overflow-hidden relative backdrop-blur-md">
              <SpinWheel
                onSelect={(type) => handleSelectReading(userProfile.phone, type)}
                selectedType={selectedType}
                disabled={false}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer copyright */}
      <footer className="w-full text-center border-t border-white/10 mt-24 pt-6 text-[10px] text-[#c6c6ce]/40 font-bold tracking-[0.2em] uppercase">
        კოსმო-ანალიტიკა აეთერია &copy; {new Date().getFullYear()} / ყველა ანალიტიკური გამოთვლა მუშავდება ხელოვნური ინტელექტის ალგორითმით.
      </footer>
    </div>
  );
}
