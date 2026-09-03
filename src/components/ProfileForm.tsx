import React, { useState, useEffect } from "react";
import { BirthProfile, CalculationType } from "../types";
import { MapPin, Calendar, ShieldAlert, Sparkles, RefreshCw } from "lucide-react";
import { RollerPicker, playTickSound, getSharedAudioContext } from "./RollerPicker";
import { API_URLS } from "../config";

const THEMES = [
  { value: CalculationType.HOROSCOPE, label: "დასავლური ჰოროსკოპი", description: "ზოდიაქოს ნიშანი, ხასიათი, სტიქიები და კოსმოსური ტრენდები.", numeral: "I", requiresTime: true },
  { value: CalculationType.ENNEAGRAM, label: "ენიაგრამა", description: "თქვენი ფსიქოტიპი, ფარული მოტივაციები, შიშები და ზრდის გზები.", numeral: "II", requiresTime: false },
  { value: CalculationType.PSYCHOMATRIX, label: "ფსიქო მატრიცა", description: "პითაგორას ციფრული მატრიცა: ჯანმრთელობა, იღბალი, ენერგია და ნიჭი.", numeral: "III", requiresTime: false },
  { value: CalculationType.NUMEROLOGY, label: "ნუმეროლოგია", description: "ბედისწერის რიცხვი, თქვენი უმაღლესი მისია და ცხოვრებისეული გზა.", numeral: "IV", requiresTime: false },
  { value: CalculationType.HUMAN_DESIGN, label: "ადამიანის დიზაინი", description: "ენერგეტიკული ტიპი, პროფილი, ავტორიტეტი და ცხოვრებისეული სტრატეგია.", numeral: "V", requiresTime: true },
  { value: CalculationType.VEDIC, label: "ვედური ასტროლოგია", description: "ჯიოტიში: მთვარის ნიშანი, ნაკშატრები და კარმული ვალდებულებები.", numeral: "VI", requiresTime: true },
  { value: CalculationType.BAZI, label: "ბა-ძი (BaZi)", description: "ბედისწერის 4 სვეტი: დღის მბრძანებელი და 5 ელემენტის ბალანსი.", numeral: "VII", requiresTime: true },
  { value: CalculationType.ARCHETYPE, label: "არქეტიპული ანალიზი", description: "იუნგის 12 ფსიქოლოგიური არქეტიპი და ჩრდილოვანი მხარეები.", numeral: "VIII", requiresTime: false },
];

const getTarotIllustration = (type: CalculationType) => {
  switch (type) {
    case CalculationType.HOROSCOPE:
      return (
        <svg className="w-12 h-12 text-[#E0AC6B] transition-all duration-500 group-hover:scale-115" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Cosmic orbital circles */}
          <circle cx="50" cy="50" r="40" strokeDasharray="3 3" opacity="0.4" />
          <circle cx="50" cy="50" r="28" strokeWidth="0.8" opacity="0.6" />
          {/* Mystic crescent moon and sun merging */}
          <path d="M50 25 A 25 25 0 0 1 75 50 A 25 25 0 0 0 50 25" fill="#E0AC6B" fillOpacity="0.25" />
          <circle cx="50" cy="50" r="10" fill="currentColor" fillOpacity="0.1" />
          {/* Diamond stars / constellation lines */}
          <path d="M50 15 L50 20 M50 80 L50 85 M15 50 L20 50 M80 50 L85 50" />
          <path d="M50 35 L48 44 L39 46 L48 48 L50 57 L52 48 L61 46 L52 44 Z" fill="currentColor" />
          {/* Floating tiny dots */}
          <circle cx="28" cy="28" r="1.5" fill="currentColor" />
          <circle cx="72" cy="72" r="1" fill="currentColor" />
          <circle cx="30" cy="68" r="1.2" fill="currentColor" />
          <circle cx="70" cy="30" r="1.5" fill="currentColor" />
        </svg>
      );
    case CalculationType.ENNEAGRAM:
      return (
        <svg className="w-12 h-12 text-[#E0AC6B] transition-all duration-500 group-hover:scale-115" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Outer sacred circle */}
          <circle cx="50" cy="50" r="42" opacity="0.5" />
          <circle cx="50" cy="50" r="45" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
          {/* Enneagram-inspired geometric nested triangles */}
          <path d="M50 8 L86 72 L14 72 Z" strokeWidth="1.2" />
          <path d="M50 92 L86 28 L14 28 Z" strokeWidth="0.8" opacity="0.4" />
          <circle cx="50" cy="50" r="14" strokeWidth="0.8" strokeDasharray="4 2" fill="currentColor" fillOpacity="0.1" />
          {/* Point markers */}
          <circle cx="50" cy="8" r="2.5" fill="currentColor" />
          <circle cx="86" cy="72" r="2.5" fill="currentColor" />
          <circle cx="14" cy="72" r="2.5" fill="currentColor" />
          {/* Radiating geometry */}
          <line x1="50" y1="8" x2="50" y2="92" strokeWidth="0.5" opacity="0.3" />
          <line x1="14" y1="72" x2="86" y2="28" strokeWidth="0.5" opacity="0.3" />
          <line x1="86" y1="72" x2="14" y2="28" strokeWidth="0.5" opacity="0.3" />
        </svg>
      );
    case CalculationType.PSYCHOMATRIX:
      return (
        <svg className="w-12 h-12 text-[#E0AC6B] transition-all duration-500 group-hover:scale-115" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Abstract logarithmic spiral of life within matrix frame */}
          <rect x="15" y="15" width="70" height="70" rx="10" strokeDasharray="4 4" opacity="0.3" />
          <path d="M15 38 H85 M15 62 H85 M38 15 V85 M62 15 V85" strokeWidth="0.8" opacity="0.5" />
          {/* Fibonacci Spiral representing mathematical nature */}
          <path d="M50 50 A 5 5 0 0 1 55 50 A 10 10 0 0 1 45 50 A 20 20 0 0 1 65 50 A 30 30 0 0 1 35 50 A 40 40 0 0 1 75 50" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
          {/* Sparkling dots on grid intersections */}
          <circle cx="38" cy="38" r="2" fill="currentColor" />
          <circle cx="62" cy="62" r="2" fill="currentColor" />
          <circle cx="38" cy="62" r="1.5" fill="currentColor" opacity="0.7" />
          <circle cx="62" cy="38" r="1.5" fill="currentColor" opacity="0.7" />
          <circle cx="50" cy="50" r="3" fill="#E0AC6B" className="animate-pulse" />
        </svg>
      );
    case CalculationType.NUMEROLOGY:
      return (
        <svg className="w-12 h-12 text-[#E0AC6B] transition-all duration-500 group-hover:scale-115" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Overlapping circles (Vesica Piscis) */}
          <circle cx="40" cy="50" r="24" opacity="0.6" />
          <circle cx="60" cy="50" r="24" opacity="0.6" />
          <circle cx="50" cy="50" r="38" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" />
          {/* Mystical Infinity symbol */}
          <path d="M35 50 C 35 40, 47 40, 50 50 C 53 60, 65 60, 65 50 C 65 40, 53 40, 50 50 C 47 60, 35 60, 35 50 Z" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
          {/* Cosmic rays */}
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
        <svg className="w-12 h-12 text-[#E0AC6B] transition-all duration-500 group-hover:scale-115" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Crown energy center triangle */}
          <polygon points="50,12 60,25 40,25" strokeWidth="1.2" fill="currentColor" fillOpacity="0.1" />
          {/* Ajna inverted triangle */}
          <polygon points="50,42 60,30 40,30" strokeWidth="0.8" />
          {/* Heart / Throat channel lines and circles */}
          <circle cx="50" cy="52" r="7" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15" />
          <polygon points="50,68 64,84 36,84" strokeWidth="1.2" />
          {/* Connected energy gates and channels */}
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
        <svg className="w-12 h-12 text-[#E0AC6B] transition-all duration-500 group-hover:scale-115" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Sacred lotus mandala */}
          <circle cx="50" cy="50" r="42" strokeDasharray="4 4" opacity="0.3" />
          {/* Multi-layered stars/lotus petals */}
          <path d="M50 15 C45 30 30 45 15 50 C30 55 45 70 50 85 C55 70 70 55 85 50 C70 45 55 30 50 15 Z" strokeWidth="1.2" fill="currentColor" fillOpacity="0.1" />
          <path d="M50 25 C47 35 35 47 25 50 C35 53 47 65 50 75 C53 65 65 53 75 50 C65 47 53 35 50 25 Z" strokeWidth="0.8" fill="#E0AC6B" fillOpacity="0.2" />
          {/* Central sun orb */}
          <circle cx="50" cy="50" r="8" fill="currentColor" />
          <circle cx="50" cy="50" r="12" strokeWidth="0.5" opacity="0.7" />
          {/* Karma dots */}
          <circle cx="25" cy="25" r="1" fill="currentColor" />
          <circle cx="75" cy="25" r="1" fill="currentColor" />
          <circle cx="25" cy="75" r="1" fill="currentColor" />
          <circle cx="75" cy="75" r="1" fill="currentColor" />
        </svg>
      );
    case CalculationType.BAZI:
      return (
        <svg className="w-12 h-12 text-[#E0AC6B] transition-all duration-500 group-hover:scale-115" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Yin Yang absolute balance sphere */}
          <circle cx="50" cy="50" r="42" opacity="0.4" />
          <path d="M50 8 A 21 21 0 0 0 50 50 A 21 21 0 0 1 50 92 A 42 42 0 0 0 50 8 Z" fill="currentColor" fillOpacity="0.15" />
          <circle cx="50" cy="29" r="4" fill="currentColor" />
          <circle cx="50" cy="71" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          {/* 5 elements surrounding curves */}
          <path d="M22 30 Q 35 20 50 30" strokeWidth="0.8" opacity="0.7" />
          <path d="M78 30 Q 65 20 50 30" strokeWidth="0.8" opacity="0.7" />
          <path d="M22 70 Q 35 80 50 70" strokeWidth="0.8" opacity="0.7" />
          <path d="M78 70 Q 65 80 50 70" strokeWidth="0.8" opacity="0.7" />
          <circle cx="50" cy="50" r="15" strokeWidth="0.5" strokeDasharray="3 2" opacity="0.5" />
        </svg>
      );
    case CalculationType.ARCHETYPE:
      return (
        <svg className="w-12 h-12 text-[#E0AC6B] transition-all duration-500 group-hover:scale-115" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Mystical Consciousness Eye */}
          <path d="M12 50 C 30 22, 70 22, 88 50 C 70 78, 30 78, 12 50 Z" strokeWidth="1.2" fill="currentColor" fillOpacity="0.1" />
          <circle cx="50" cy="50" r="16" strokeWidth="1" />
          {/* Glowing pupil */}
          <circle cx="50" cy="50" r="7" fill="currentColor" />
          <circle cx="47" cy="47" r="1.8" fill="#121416" />
          {/* Ethereal rays */}
          <path d="M50 15 L50 24 M50 76 L50 85 M15 50 L24 50 M76 50 L85 50" strokeWidth="0.8" />
          <path d="M25 25 L32 32 M75 25 L68 32 M25 75 L32 68 M75 75 L68 68" strokeWidth="0.8" />
          {/* Crescent moon shadows */}
          <path d="M78 40 A 10 10 0 0 1 78 60 A 8 8 0 0 0 78 40" fill="currentColor" opacity="0.6" />
          <path d="M22 40 A 10 10 0 0 0 22 60 A 8 8 0 0 1 22 40" fill="currentColor" opacity="0.6" />
        </svg>
      );
    default:
      return null;
  }
};
const playExitCapSound = () => {};
const playErrorSound = () => {};


interface ProfileFormProps {
  onProfileSaved: (profile: BirthProfile, initialTheme: CalculationType) => void;
  savedProfile: BirthProfile | null;
  loading: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ onProfileSaved, savedProfile, loading }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthPlace, setBirthPlace] = useState("საქართველო");
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(1995);
  const [birthTime, setBirthTime] = useState(() => {
    return savedProfile?.birthTime || "";
  });
  const [phone, setPhone] = useState(() => {
    return savedProfile?.phone || "";
  });
  const [selectedTheme, setSelectedTheme] = useState<CalculationType | null>(null);
  const [hoveredTheme, setHoveredTheme] = useState<CalculationType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [useStandardCalendar, setUseStandardCalendar] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1024);
  const [savedProfiles, setSavedProfiles] = useState<{ name: string; surname: string; phone: string; day: number; month: number; year: number; birthPlace: string }[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("saved_profiles");
      if (stored) {
        setSavedProfiles(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error reading saved_profiles:", e);
    }
  }, []);

  const handleSelectSavedProfile = (p: typeof savedProfiles[0]) => {
    playTickSound();
    setFirstName(p.name);
    setLastName(p.surname);
    setPhone(p.phone);
    setDay(p.day);
    setMonth(p.month);
    setYear(p.year);
    setBirthPlace(p.birthPlace || "საქართველო");
  };

  const handleDeleteSavedProfile = (e: React.MouseEvent, phoneToDelete: string) => {
    e.stopPropagation();
    playExitCapSound();
    const updated = savedProfiles.filter(p => p.phone !== phoneToDelete);
    setSavedProfiles(updated);
    localStorage.setItem("saved_profiles", JSON.stringify(updated));
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    if (window.innerWidth < 768) {
      setUseStandardCalendar(true);
    }
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keyboard Arrow Keys Navigation for Tarot Cards
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept arrow keys if the user is actively typing in inputs
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setSelectedTheme((prev) => {
          if (prev === null) {
            playExitCapSound();
            return THEMES[THEMES.length - 1].value;
          }
          const currIdx = THEMES.findIndex((t) => t.value === prev);
          const nextIdx = (currIdx - 1 + THEMES.length) % THEMES.length;
          playExitCapSound();
          return THEMES[nextIdx].value;
        });
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setSelectedTheme((prev) => {
          if (prev === null) {
            playExitCapSound();
            return THEMES[0].value;
          }
          const currIdx = THEMES.findIndex((t) => t.value === prev);
          const nextIdx = (currIdx + 1) % THEMES.length;
          playExitCapSound();
          return THEMES[nextIdx].value;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const cardSpacing = windowWidth < 480 ? 34 : windowWidth < 640 ? 42 : windowWidth < 768 ? 52 : windowWidth < 1024 ? 62 : 78;
  const cardScale = windowWidth < 480 ? 0.8 : windowWidth < 640 ? 0.9 : 1.0;

  // Auto-fill from saved profile
  useEffect(() => {
    if (savedProfile) {
      setFirstName(savedProfile.name || "");
      setLastName(savedProfile.surname || "");
      setBirthPlace(savedProfile.birthPlace || "საქართველო");
      setDay(savedProfile.day);
      setMonth(savedProfile.month);
      setYear(savedProfile.year);
      setPhone(savedProfile.phone);
    }
  }, [savedProfile]);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { value: 1, label: "იანვარი" },
    { value: 2, label: "თებერვალი" },
    { value: 3, label: "მარტი" },
    { value: 4, label: "აპრილი" },
    { value: 5, label: "მაისი" },
    { value: 6, label: "ივნისი" },
    { value: 7, label: "ივლისი" },
    { value: 8, label: "აგვისტო" },
    { value: 9, label: "სექტემბერი" },
    { value: 10, label: "ოქტომბერი" },
    { value: 11, label: "ნოემბერი" },
    { value: 12, label: "დეკემბერი" },
  ];
  
  const currentYear = 2026;
  const years = Array.from({ length: 120 }, (_, i) => currentYear - i); // extended for flexibility

  const daysItems = days.map((d) => ({ value: d, label: String(d) }));
  const monthsItems = months.map((m) => ({ value: m.value, label: m.label }));
  const yearsItems = years.map((y) => ({ value: y, label: String(y) }));
  const themeItems = THEMES.map((t) => ({ value: t.value, label: t.label }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanName = firstName.trim();
    const cleanSurname = lastName.trim();

    if (cleanName.length < 2) {
      playErrorSound();
      return setError("სახელი უნდა შედგებოდეს მინიმუმ 2 ასოსგან და არ უნდა შეიცავდეს ციფრებს");
    }
    if (cleanSurname.length < 2) {
      playErrorSound();
      return setError("გვარი უნდა შედგებოდეს მინიმუმ 2 ასოსგან და არ უნდა შეიცავდეს ციფრებს");
    }
    if (/\d/.test(cleanName) || /\d/.test(cleanSurname)) {
      playErrorSound();
      return setError("სახელი და გვარი არ უნდა შეიცავდეს ციფრებს");
    }

    const cleanPhone = phone.trim().replace(/\s+/g, "");
    let normalizedPhone = cleanPhone;
    if (normalizedPhone.startsWith("+995")) {
      normalizedPhone = normalizedPhone.slice(4);
    } else if (normalizedPhone.startsWith("995")) {
      normalizedPhone = normalizedPhone.slice(3);
    }

    if (!/^5\d{8}$/.test(normalizedPhone)) {
      playErrorSound();
      return setError("ტელეფონის ნომერი აუცილებლად უნდა იწყებოდეს 5-ით და შედგებოდეს 9 ციფრისგან (მაგ: 5XXXXXXXX)");
    }

    if (/^(.)\1+$/.test(normalizedPhone) || /(.)\1{5,}/.test(normalizedPhone)) {
      playErrorSound();
      return setError("გთხოვთ შეიყვანოთ სწორი ტელეფონის ნომერი (არ უნდა შედგებოდეს მხოლოდ ერთნაირი ან განმეორებადი ციფრებისგან)");
    }

    if (!selectedTheme) {
      playErrorSound();
      return setError("გთხოვთ აირჩიოთ ანალიზის თემა");
    }

    const finalBirthPlace = birthPlace.trim() || "საქართველო";

    try {
      const response = await fetch(API_URLS.saveProfile, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cleanName,
          surname: cleanSurname,
          birthPlace: finalBirthPlace,
          day,
          month,
          year,
          birthTime: birthTime.trim() || undefined,
          phone: normalizedPhone
        }),
      });

      const data = await response.json();
      if (data.success) {
        try {
          const stored = localStorage.getItem("saved_profiles");
          let list = stored ? JSON.parse(stored) : [];
          if (!Array.isArray(list)) list = [];
          const newProfile = {
            name: cleanName,
            surname: cleanSurname,
            phone: normalizedPhone,
            day,
            month,
            year,
            birthTime: birthTime.trim() || undefined,
            birthPlace: finalBirthPlace
          };
          list = list.filter((p: any) => p.phone !== normalizedPhone);
          list.unshift(newProfile);
          localStorage.setItem("saved_profiles", JSON.stringify(list));
        } catch (e) {
          console.error("Error updating saved_profiles:", e);
        }
        const profileObj = {
          ...data.profile,
          birthTime: birthTime.trim() || undefined
        };
        onProfileSaved(profileObj, selectedTheme);
      } else {
        playErrorSound();
        setError(data.error || "შეცდომა შენახვისას");
      }
    } catch (err: any) {
      playErrorSound();
      setError("ვერ დაუკავშირდა სერვერს. სცადეთ მოგვიანებით.");
    }
  };

  return (
    <div id="profile-form-container" className="w-full bg-white border border-[#D8C4B6] backdrop-blur-md pt-8 px-8 pb-14 rounded-2xl shadow-sm overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-[#1C3D63]"></div>

      {/* Centered top header */}
      <div className="flex flex-col items-center justify-center text-center space-y-3 mb-8">
        <button 
          type="button"
          onClick={() => {
            setUseStandardCalendar(!useStandardCalendar);
            playExitCapSound();
          }}
          className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all cursor-pointer ${
            useStandardCalendar 
              ? 'bg-[#1C3D63] text-white border-[#1C3D63] shadow-sm scale-105' 
              : 'bg-[#F4F7F7] text-[#1C3D63] border-[#D8C4B6] hover:bg-[#E5ECEC] hover:scale-105'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest font-label">კალენდარი</span>
        </button>
        <div>
          <h2 className="text-xl font-bold tracking-[0.2em] text-[#1C3D63] uppercase font-headline">
            აიდი მოდელები
          </h2>
          <p className="text-sm sm:text-base text-[#3B5E63] tracking-widest uppercase font-bold mt-1">
            იდენტობის მატრიცა
          </p>
          <p className="text-[11px] sm:text-[12px] tracking-wider text-[#8E8276] font-semibold uppercase mt-2">
            შეიყვანეთ თქვენი მონაცემები სინქრონიზაციისთვის
          </p>
        </div>
      </div>

      {savedProfiles.length > 0 && (
        <div className="mb-6 max-w-[480px] mx-auto w-full space-y-2 font-sans text-left">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#1C3D63]">
            დამახსოვრებული პროფილები:
          </span>
          <div className="flex flex-wrap gap-2">
            {savedProfiles.map((p) => (
              <div
                key={p.phone}
                onClick={() => handleSelectSavedProfile(p)}
                className="group flex items-center space-x-2 px-3 py-1.5 bg-[#F4F7F7] hover:bg-[#E5ECEC] border border-[#D8C4B6] hover:border-[#1C3D63] rounded-xl cursor-pointer transition-all duration-300 active:scale-95 text-xs text-[#222222] hover:text-[#1C3D63]"
              >
                <span className="font-bold truncate max-w-[120px]">
                  {p.name} {p.surname}
                </span>
                <span className="text-[9px] text-[#8E8276] group-hover:text-[#1C3D63] font-semibold font-mono">
                  {p.phone}
                </span>
                <button
                  type="button"
                  onClick={(e) => handleDeleteSavedProfile(e, p.phone)}
                  className="w-4 h-4 rounded-full bg-white group-hover:bg-[#1C3D63]/20 text-[#8E8276] hover:text-[#1C3D63] flex items-center justify-center transition-colors cursor-pointer border border-[#D8C4B6]"
                  title="წაშლა"
                >
                  <span className="text-[10px] font-black leading-none font-sans">×</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div id="error-alert" className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl tracking-wide flex items-start space-x-2.5 font-semibold">
          <ShieldAlert className="w-4.5 h-4.5 shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      <form id="profile-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Separate Name and Surname Fields, side-by-side grid, narrowed to match compact theme */}
        <div className="grid grid-cols-2 gap-5 pb-2 max-w-[480px] mx-auto w-full">
          {/* Name Input */}
          <div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="სახელი"
              className="w-full bg-transparent border-b border-[#D8C4B6] py-3 text-base text-[#222222] placeholder-[#8E8276] focus:outline-none focus:border-[#1C3D63] transition-colors font-bold"
              required
            />
          </div>

          {/* Surname Input */}
          <div>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="გვარი"
              className="w-full bg-transparent border-b border-[#D8C4B6] py-3 text-base text-[#222222] placeholder-[#8E8276] focus:outline-none focus:border-[#1C3D63] transition-colors font-bold"
              required
            />
          </div>
        </div>

        {/* Phone Field */}
        <div className="pb-2 max-w-[480px] mx-auto w-full">
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="ტელ:"
            className="w-full bg-transparent border-b border-[#D8C4B6] py-3 text-base text-[#222222] placeholder-[#8E8276] focus:outline-none focus:border-[#1C3D63] transition-colors font-bold"
            required
          />
        </div>

        {/* Unified Date Selector with Calendar Toggle Button */}
        <div className="space-y-3 pt-4 pb-3 md:pt-6 md:pb-4 max-w-[480px] mx-auto w-full">
          <div className="flex items-center justify-between">
            <label className="text-[12px] font-extrabold uppercase tracking-widest text-[#1C3D63] flex items-center gap-2">
              <span>📅 დაბადების თარიღი</span>
            </label>
            
            {/* Calendar / Roller Toggle Button */}
            <button
              type="button"
              onClick={() => {
                setUseStandardCalendar(!useStandardCalendar);
                playExitCapSound();
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[#D8C4B6] bg-[#F4F7F7] hover:bg-[#E5ECEC] text-[#1C3D63] text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:scale-105"
              title={useStandardCalendar ? "როლიკით არჩევა" : "კალენდრიდან არჩევა"}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{useStandardCalendar ? "⚙️ როლიკი" : "📅 კალენდარი"}</span>
            </button>
          </div>
          
          {useStandardCalendar ? (
            <div className="relative bg-[#F4F7F7] rounded-2xl py-3 px-5 shadow-sm border border-[#D8C4B6] max-w-[480px] mx-auto overflow-hidden">
              <input
                type="date"
                value={`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val) {
                    const parts = val.split('-');
                    if (parts.length === 3) {
                      const y = parseInt(parts[0], 10);
                      const m = parseInt(parts[1], 10);
                      const d = parseInt(parts[2], 10);
                      if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
                        setYear(y);
                        setMonth(m);
                        setDay(d);
                      }
                    }
                  }
                }}
                className="w-full bg-transparent border-0 py-2 text-lg text-[#1C3D63] focus:outline-none font-bold text-center tracking-widest cursor-pointer"
                required
              />
            </div>
          ) : (
            <div className="relative bg-[#F4F7F7] rounded-2xl py-4 px-6 shadow-sm border border-[#D8C4B6] max-w-[480px] mx-auto overflow-hidden select-none">
              {/* Horizontal highlighted selection band in center across all column rollers */}
              <div className="absolute top-[50%] -translate-y-[50%] left-2 right-2 h-11 bg-[#E5ECEC] rounded-lg pointer-events-none z-0" />
              
              {/* The side-by-side rollers */}
              <div className="relative flex flex-row items-center justify-between gap-4 z-10 w-full">
                {/* Month */}
                <div className="flex-[2] min-w-[145px] sm:min-w-[160px]">
                  <RollerPicker
                    variant="ios-dark"
                    items={monthsItems}
                    selectedValue={month}
                    onChange={setMonth}
                  />
                </div>

                {/* Day */}
                <div className="flex-[0.8] min-w-[50px] sm:min-w-[60px]">
                  <RollerPicker
                    variant="ios-dark"
                    items={daysItems}
                    selectedValue={day}
                    onChange={setDay}
                  />
                </div>

                {/* Year */}
                <div className="flex-[1.2] min-w-[80px] sm:min-w-[90px]">
                  <RollerPicker
                    variant="ios-dark"
                    items={yearsItems}
                    selectedValue={year}
                    onChange={setYear}
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Real-time calculated birthdate confirmation text */}
          <div className="text-center mt-2">
            <p className="text-[13px] text-[#3B5E63] font-bold tracking-wider uppercase">
              არჩეული თარიღი: {day} {months.find(m => m.value === month)?.label}, {year}
            </p>
          </div>
        </div>

        {/* Birth Time Input Field for ID Models requiring exact time */}
        <div className="pt-2 pb-4 max-w-[480px] mx-auto w-full">
          <div className="flex items-center justify-between mb-2">
            <label className="text-[12px] font-extrabold uppercase tracking-widest text-[#1C3D63] flex items-center gap-2">
              <span>⏰ დაბადების საათი</span>
              <span className="text-[10px] text-[#8E8276] font-semibold lowercase tracking-normal">(არასავალდებულო)</span>
            </label>
            {THEMES.find(t => t.value === (hoveredTheme || selectedTheme))?.requiresTime && (
              <span className="text-[10px] bg-[#E0AC6B]/15 border border-[#E0AC6B]/40 text-[#1C3D63] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse flex items-center gap-1">
                ✦ საჭიროა ზუსტი ანალიზისთვის
              </span>
            )}
          </div>
          <div className="relative bg-[#F4F7F7] rounded-2xl py-3 px-5 border border-[#D8C4B6] shadow-sm flex items-center justify-between">
            <input
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              className="w-full bg-transparent border-0 text-base text-[#1C3D63] focus:outline-none font-bold text-center tracking-widest cursor-pointer"
            />
            {birthTime && (
              <button
                type="button"
                onClick={() => setBirthTime("")}
                className="text-xs text-[#8E8276] hover:text-[#1C3D63] ml-2 cursor-pointer font-bold"
                title="წაშლა"
              >
                ✕
              </button>
            )}
          </div>
          <p className="text-[11px] text-[#8E8276] font-medium text-center mt-1.5 leading-relaxed">
            * ადამიანის დიზაინის, ჰოროსკოპის, ბაზისა და ვედური ასტროლოგიის მოდელებისთვის საათი უზრუნველყოფს მაქსიმალურ სიზუსტეს.
          </p>
        </div>

        {/* Active / Hovered Card detailed description box */}
        {(() => {
          const activeDisplayTheme = THEMES.find(t => t.value === (hoveredTheme || selectedTheme));
          return (
            <div className="p-6 md:p-8 rounded-2xl bg-[#F4F7F7] border-2 border-[#1C3D63] shadow-sm max-w-2xl mx-auto text-center space-y-3 transform transition-all duration-500 hover:scale-[1.02] my-6">
              {activeDisplayTheme ? (
                <>
                  <h4 className="text-lg md:text-xl font-extrabold text-[#1C3D63] uppercase tracking-[0.15em] flex items-center justify-center gap-2.5 font-headline">
                    <Sparkles className="w-5 h-5 text-[#E0AC6B] animate-pulse" />
                    {activeDisplayTheme.label}
                  </h4>
                  <p className="text-sm md:text-base text-[#3B5E63] font-medium leading-relaxed min-h-[50px] font-sans">
                    {activeDisplayTheme.description}
                  </p>
                </>
              ) : (
                <>
                  <h4 className="text-lg md:text-xl font-extrabold text-[#1C3D63] uppercase tracking-[0.15em] flex items-center justify-center gap-2.5 font-headline animate-pulse">
                    <Sparkles className="w-5 h-5 text-[#E0AC6B] animate-spin" style={{ animationDuration: '4s' }} />
                    აირჩიეთ ანალიზის თემა
                  </h4>
                  <p className="text-sm md:text-base text-[#3B5E63] font-medium leading-relaxed min-h-[50px] font-sans">
                    მიიტანეთ მაუსი ან დააწკაპუნეთ სასურველ ბარათზე დეტალური აღწერის სანახავად და სინქრონიზაციისთვის
                  </p>
                </>
              )}
            </div>
          );
        })()}

        {/* Mystical Tarot Card Deck Theme Selector */}
        <div className="py-2">
          {windowWidth < 640 ? (
            /* MOBILE VERSION: Separate 2-Column Button Menu + Single Active Card Preview */
            <div className="space-y-6">
              {/* Separate Mobile Menu */}
              <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto px-2">
                {THEMES.map((theme) => {
                  const isSelected = selectedTheme === theme.value;
                  return (
                    <button
                      key={theme.value}
                      type="button"
                      onClick={() => {
                        if (selectedTheme === theme.value) {
                          setSelectedTheme(null);
                          playExitCapSound();
                        } else {
                          setSelectedTheme(theme.value);
                          playExitCapSound();
                        }
                      }}
                      onDoubleClick={() => {
                        setSelectedTheme(theme.value);
                        playExitCapSound();
                        setTimeout(() => {
                          const formEl = document.getElementById("profile-form") as HTMLFormElement;
                          if (formEl) formEl.requestSubmit();
                        }, 10);
                      }}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-xl border text-[11px] font-black uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer ${
                        isSelected
                          ? "bg-[#1C3D63] text-white border-[#1C3D63] shadow-sm scale-[1.02]"
                          : "bg-[#F4F7F7] text-[#222222] border-[#D8C4B6] hover:bg-[#E5ECEC]"
                      }`}
                    >
                      <span className="truncate mr-1">{theme.label.split(" (")[0]}</span>
                      <span className={`text-[10px] font-extrabold font-headline shrink-0 ${isSelected ? "text-white/80" : "text-[#E0AC6B]"}`}>
                        {theme.numeral}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Single Active Card Preview or Ornate Card Back */}
              <div 
                style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
                className="flex items-center justify-center h-[240px] relative mt-4 select-none overflow-visible"
              >
                {selectedTheme ? (
                  /* FRONT OF SELECTED CARD */
                  (() => {
                    const theme = THEMES.find(t => t.value === selectedTheme)!;
                    return (
                      <div
                        style={{
                          transform: "rotateY(0deg) translate3d(0, 0, 30px) scale(1.1)",
                          transformStyle: "preserve-3d",
                        }}
                        className="w-[130px] aspect-[2/3.1] rounded-2xl p-3 bg-white border-2 border-[#1C3D63] shadow-md flex flex-col items-center justify-between animate-pulse"
                      >
                        <div className="absolute inset-1 rounded-[12px] border border-[#E0AC6B]/35 pointer-events-none">
                          <div className="absolute top-1 left-1 text-[7px] text-[#E0AC6B]/40">✦</div>
                          <div className="absolute top-1 right-1 text-[7px] text-[#E0AC6B]/40">✦</div>
                          <div className="absolute bottom-1 left-1 text-[7px] text-[#E0AC6B]/40">✦</div>
                          <div className="absolute bottom-1 right-1 text-[7px] text-[#E0AC6B]/40">✦</div>
                        </div>

                        <span className="text-[10px] font-serif font-extrabold tracking-widest text-[#E0AC6B] mt-1 z-10 uppercase">
                          {theme.numeral}
                        </span>

                        <div className="flex-grow flex items-center justify-center py-2 z-10 w-full scale-105">
                          {getTarotIllustration(theme.value)}
                        </div>

                        <span className="text-[10px] font-extrabold text-center tracking-wider leading-tight text-[#1C3D63] z-10 pb-1.5 uppercase">
                          {theme.label.split(" (")[0]}
                        </span>
                      </div>
                    );
                  })()
                ) : (
                  /* ORNATE MYSTICAL CARD BACK */
                  <div
                    style={{
                      transform: "rotateY(0deg) translate3d(0, 0, 0px)",
                      transformStyle: "preserve-3d",
                    }}
                    className="w-[130px] aspect-[2/3.1] rounded-2xl p-3 bg-[#F4F7F7] border border-[#D8C4B6] shadow-sm flex flex-col items-center justify-between opacity-90"
                  >
                    <div className="absolute inset-1 rounded-[12px] border border-[#D8C4B6] pointer-events-none">
                      <div className="absolute top-1 left-1 text-[7px] text-[#8E8276]/30">✦</div>
                      <div className="absolute top-1 right-1 text-[7px] text-[#8E8276]/30">✦</div>
                      <div className="absolute bottom-1 left-1 text-[7px] text-[#8E8276]/30">✦</div>
                      <div className="absolute bottom-1 right-1 text-[7px] text-[#8E8276]/30">✦</div>
                    </div>

                    <span className="text-[8px] font-black tracking-[0.25em] text-[#8E8276] uppercase mt-1 z-10">
                      🔮
                    </span>

                    {/* Ornate mystical mandala pattern */}
                    <div className="flex-grow flex items-center justify-center py-2 z-10 w-full text-[#E0AC6B]/30">
                      <svg className="w-10 h-10 animate-[spin_30s_linear_infinite]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                        <circle cx="50" cy="50" r="40" strokeDasharray="3 3" />
                        <circle cx="50" cy="50" r="28" />
                        <circle cx="50" cy="50" r="16" strokeDasharray="1 2" />
                        <path d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M22 78 L78 22" />
                      </svg>
                    </div>

                    <span className="text-[8px] font-black text-center tracking-[0.15em] leading-tight text-[#8E8276] z-10 pb-1.5 uppercase font-headline">
                      კოდი
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* DESKTOP/TABLET VERSION: Original 3D Tarot card deck */
            <div 
              style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
              className="relative w-full h-[280px] sm:h-[320px] md:h-[360px] flex items-center justify-center overflow-visible mt-2 mb-4 select-none px-4"
            >
              {THEMES.map((theme, index) => {
                const isSelected = selectedTheme === theme.value;
                const isHovered = hoveredTheme === theme.value;
                
                const handleCardClick = () => {
                  if (selectedTheme === theme.value) {
                    setSelectedTheme(null);
                    playExitCapSound();
                  } else {
                    setSelectedTheme(theme.value);
                    playExitCapSound();
                    
                    const cleanName = firstName.trim();
                    const cleanSurname = lastName.trim();
                    const cleanPhone = phone.trim().replace(/\s+/g, "");
                    let normalizedPhone = cleanPhone;
                    if (normalizedPhone.startsWith("+995")) normalizedPhone = normalizedPhone.slice(4);
                    else if (normalizedPhone.startsWith("995")) normalizedPhone = normalizedPhone.slice(3);

                    const isNameValid = cleanName.length >= 2 && !/\d/.test(cleanName);
                    const isSurnameValid = cleanSurname.length >= 2 && !/\d/.test(cleanSurname);
                    const isPhoneValid = /^5\d{8}$/.test(normalizedPhone) && !/^(.)\1+$/.test(normalizedPhone) && !/(.)\1{5,}/.test(normalizedPhone);

                    if (isNameValid && isSurnameValid && isPhoneValid) {
                      setTimeout(() => {
                        const formEl = document.getElementById("profile-form") as HTMLFormElement;
                        if (formEl) {
                          formEl.requestSubmit();
                        }
                      }, 50);
                    }
                  }
                };

                const handleCardDoubleClick = () => {
                  setSelectedTheme(theme.value);
                  playExitCapSound();
                  setTimeout(() => {
                    const formEl = document.getElementById("profile-form") as HTMLFormElement;
                    if (formEl) {
                      formEl.requestSubmit();
                    }
                  }, 10);
                };

                const distanceFromCenter = index - 3.5;
                const dx = distanceFromCenter * cardSpacing;
                const dy = 0;
                const rotY = 0;
                const rotZ = 0;

                let transformStr = `translate3d(calc(-50% + ${dx}px), ${dy}px, 0px) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${cardScale * 0.95})`;
                let zIndexVal = 20 + index;

                if (isHovered) {
                  transformStr = `translate3d(calc(-50% + ${dx}px), -55px, 120px) rotateY(0deg) rotateZ(0deg) scale(${cardScale * 1.35})`;
                  zIndexVal = 100;
                } else if (isSelected) {
                  transformStr = `translate3d(calc(-50% + ${dx}px), -25px, 60px) rotateY(0deg) rotateZ(0deg) scale(${cardScale * 1.2})`;
                  zIndexVal = 80;
                }

                return (
                  <div
                    key={theme.value}
                    onClick={handleCardClick}
                    onDoubleClick={handleCardDoubleClick}
                    onMouseEnter={() => setHoveredTheme(theme.value)}
                    onMouseLeave={() => setHoveredTheme(null)}
                    style={{
                      transform: transformStr,
                      zIndex: zIndexVal,
                      transformOrigin: "bottom center",
                      transformStyle: "preserve-3d",
                    }}
                    className={`absolute left-1/2 bottom-10 w-[105px] sm:w-[125px] md:w-[140px] aspect-[2/3.1] rounded-2xl p-2.5 sm:p-3 bg-white border transition-all duration-500 cursor-pointer flex flex-col items-center justify-between select-none group shadow-sm ${
                      isHovered 
                        ? "border-[#1C3D63] shadow-md"
                        : isSelected
                        ? "border-[#1C3D63] shadow-md bg-[#F4F7F7]"
                        : "border-[#D8C4B6] hover:border-[#1C3D63]"
                    }`}
                  >
                    <div className={`absolute inset-1 sm:inset-1.5 rounded-[10px] sm:rounded-[12px] border pointer-events-none transition-colors duration-500 ${
                      isSelected || isHovered ? "border-[#E0AC6B]/35" : "border-[#D8C4B6]"
                    }`}>
                      <div className="absolute top-1 left-1 text-[7px] text-[#E0AC6B]/40 font-serif">✦</div>
                      <div className="absolute top-1 right-1 text-[7px] text-[#E0AC6B]/40 font-serif">✦</div>
                      <div className="absolute bottom-1 left-1 text-[7px] text-[#E0AC6B]/40 font-serif">✦</div>
                      <div className="absolute bottom-1 right-1 text-[7px] text-[#E0AC6B]/40 font-serif">✦</div>
                    </div>

                    <span className={`text-[8.5px] sm:text-[9.5px] font-serif font-extrabold tracking-widest text-center mt-1 z-10 transition-colors uppercase ${
                      isSelected || isHovered ? "text-[#E0AC6B]" : "text-[#8E8276]"
                    }`}>
                      {theme.numeral}
                    </span>

                    <div className="flex-grow flex items-center justify-center py-2 z-10 w-full">
                      {getTarotIllustration(theme.value)}
                    </div>

                    <span className={`text-[8px] sm:text-[9.5px] font-extrabold text-center tracking-wider leading-tight z-10 pb-1.5 transition-colors uppercase ${
                      isSelected || isHovered ? "text-[#1C3D63]" : "text-[#3B5E63] group-hover:text-[#1C3D63]"
                    }`}>
                      {theme.label.split(" (")[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Action Button Container */}
        <div className="flex justify-center w-full mt-14 mb-4">
          <button
            type="submit"
            disabled={loading}
            onClick={playExitCapSound}
            className={`transition-all duration-700 ease-in-out cursor-pointer active:scale-95 flex items-center justify-center border font-bold uppercase tracking-widest disabled:opacity-80 text-[12px] shadow-sm ${
              loading 
                ? "w-14 h-14 rounded-full bg-transparent border-[#1C3D63] text-[#1C3D63]" 
                : "w-full max-w-[480px] h-14 rounded-xl bg-[#1C3D63] border-[#1C3D63] text-white hover:bg-[#254F7F]"
            }`}
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 animate-spin text-[#1C3D63]" />
            ) : (
              <>
                <Sparkles className="w-4.5 h-4.5 fill-white flex-shrink-0 text-white mr-2" />
                <span>
                  {savedProfile ? "მონაცემების განახლება" : "დაწყება"}
                </span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
