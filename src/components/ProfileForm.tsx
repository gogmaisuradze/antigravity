import React, { useState, useEffect } from "react";
import { BirthProfile, CalculationType } from "../types";
import { MapPin, Calendar, ShieldAlert, Sparkles, RefreshCw, ArrowLeft, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { RollerPicker, playTickSound, getSharedAudioContext } from "./RollerPicker";
import { API_URLS } from "../config";
import OrbitCarousel, { defaultOrbitModels, OrbitItem } from "./ui/orbiting-carousel-with-animated-icons";

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
  const [calMonth, setCalMonth] = useState(1);
  const [calYear, setCalYear] = useState(1995);
  const [dateInputText, setDateInputText] = useState("01 / 01 / 1995");
  const [birthTime, setBirthTime] = useState(() => {
    return savedProfile?.birthTime || "";
  });
  const [phone, setPhone] = useState(() => {
    return savedProfile?.phone || "";
  });
  const [selectedTheme, setSelectedTheme] = useState<CalculationType | null>(() => {
    return CalculationType.HOROSCOPE;
  });
  const [viewMode, setViewMode] = useState<'ORBIT' | 'FORM'>('ORBIT');
  const [hoveredTheme, setHoveredTheme] = useState<CalculationType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [useStandardCalendar, setUseStandardCalendar] = useState(true);
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
    const d = p.day || 1;
    const m = p.month || 1;
    const y = p.year || 1995;
    setDay(d);
    setMonth(m);
    setYear(y);
    setCalMonth(m);
    setCalYear(y);
    setDateInputText(`${String(d).padStart(2, '0')} / ${String(m).padStart(2, '0')} / ${y}`);
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
      const d = savedProfile.day || 1;
      const m = savedProfile.month || 1;
      const y = savedProfile.year || 1995;
      setDay(d);
      setMonth(m);
      setYear(y);
      setCalMonth(m);
      setCalYear(y);
      setDateInputText(`${String(d).padStart(2, '0')} / ${String(m).padStart(2, '0')} / ${y}`);
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
  const WDS_KA = ['ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ', 'კვი'];

  const handleDaySelect = (d: number) => {
    setDay(d);
    setMonth(calMonth);
    setYear(calYear);
    setDateInputText(`${String(d).padStart(2, '0')} / ${String(calMonth).padStart(2, '0')} / ${calYear}`);
    playTickSound();
  };

  const handlePrevMonth = () => {
    playTickSound();
    if (calMonth === 1) {
      setCalMonth(12);
      setCalYear((prev) => Math.max(1920, prev - 1));
    } else {
      setCalMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    playTickSound();
    if (calMonth === 12) {
      setCalMonth(1);
      setCalYear((prev) => Math.min(2026, prev + 1));
    } else {
      setCalMonth((prev) => prev + 1);
    }
  };

  const handleMonthSelect = (m: number) => {
    setCalMonth(m);
    const maxD = new Date(calYear, m, 0).getDate();
    if (day > maxD) {
      setDay(maxD);
      setDateInputText(`${String(maxD).padStart(2, '0')} / ${String(m).padStart(2, '0')} / ${calYear}`);
    } else {
      setMonth(m);
      setDateInputText(`${String(day).padStart(2, '0')} / ${String(m).padStart(2, '0')} / ${calYear}`);
    }
  };

  const handleYearSelect = (y: number) => {
    setCalYear(y);
    const maxD = new Date(y, calMonth, 0).getDate();
    if (day > maxD) {
      setDay(maxD);
      setDateInputText(`${String(maxD).padStart(2, '0')} / ${String(calMonth).padStart(2, '0')} / ${y}`);
    } else {
      setYear(y);
      setDateInputText(`${String(day).padStart(2, '0')} / ${String(calMonth).padStart(2, '0')} / ${y}`);
    }
  };

  const handleDateTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    val = val.replace(/[^\d/.\-\s]/g, "");

    const digits = val.replace(/\D/g, "");
    let formatted = val;

    if (!val.includes("/") && !val.includes(".") && !val.includes("-")) {
      if (digits.length > 4) {
        formatted = `${digits.slice(0, 2)} / ${digits.slice(2, 4)} / ${digits.slice(4, 8)}`;
      } else if (digits.length > 2) {
        formatted = `${digits.slice(0, 2)} / ${digits.slice(2, 4)}`;
      } else {
        formatted = digits;
      }
    }

    setDateInputText(formatted);

    let d = 0, m = 0, y = 0;
    if (digits.length >= 8) {
      d = parseInt(digits.slice(0, 2), 10);
      m = parseInt(digits.slice(2, 4), 10);
      y = parseInt(digits.slice(4, 8), 10);
    } else {
      const parts = formatted.split(/[/\-.\s]+/).filter(Boolean);
      if (parts.length === 3) {
        d = parseInt(parts[0], 10);
        m = parseInt(parts[1], 10);
        y = parseInt(parts[2], 10);
      }
    }

    if (d >= 1 && d <= 31 && m >= 1 && m <= 12 && y >= 1900 && y <= 2026) {
      const maxD = new Date(y, m, 0).getDate();
      const clampedD = Math.min(maxD, d);
      setDay(clampedD);
      setMonth(m);
      setYear(y);
      setCalMonth(m);
      setCalYear(y);
    }
  };

  const handleDateTextBlur = () => {
    const digits = dateInputText.replace(/\D/g, "");
    let d = day;
    let m = month;
    let y = year;

    if (digits.length >= 8) {
      d = parseInt(digits.slice(0, 2), 10);
      m = parseInt(digits.slice(2, 4), 10);
      y = parseInt(digits.slice(4, 8), 10);
    } else {
      const parts = dateInputText.split(/[/\-.\s]+/).filter(Boolean);
      if (parts.length >= 3) {
        d = parseInt(parts[0], 10) || day;
        m = parseInt(parts[1], 10) || month;
        y = parseInt(parts[2], 10) || year;
      }
    }

    if (y < 100) {
      y = y > 26 ? 1900 + y : 2000 + y;
    }

    const validYear = Math.max(1920, Math.min(2026, y || 1995));
    const validMonth = Math.max(1, Math.min(12, m || 1));
    const maxD = new Date(validYear, validMonth, 0).getDate();
    const validDay = Math.max(1, Math.min(maxD, d || 1));

    setDay(validDay);
    setMonth(validMonth);
    setYear(validYear);
    setCalMonth(validMonth);
    setCalYear(validYear);
    setDateInputText(`${String(validDay).padStart(2, '0')} / ${String(validMonth).padStart(2, '0')} / ${validYear}`);
  };

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

    // Ensure final date is strictly in sync with what user might have typed
    let finalDay = day;
    let finalMonth = month;
    let finalYear = year;
    if (useStandardCalendar && dateInputText) {
      const digits = dateInputText.replace(/\D/g, "");
      if (digits.length >= 8) {
        const d = parseInt(digits.slice(0, 2), 10);
        const m = parseInt(digits.slice(2, 4), 10);
        let y = parseInt(digits.slice(4, 8), 10);
        if (y < 100) y = y > 26 ? 1900 + y : 2000 + y;
        if (y >= 1920 && y <= 2026 && m >= 1 && m <= 12) {
          const maxD = new Date(y, m, 0).getDate();
          finalDay = Math.min(maxD, Math.max(1, d));
          finalMonth = m;
          finalYear = y;
        }
      }
    }

    const profileObj: BirthProfile = {
      name: cleanName,
      surname: cleanSurname,
      birthPlace: finalBirthPlace,
      day: finalDay,
      month: finalMonth,
      year: finalYear,
      birthTime: birthTime.trim() || undefined,
      phone: normalizedPhone
    };

    // 1. Immediately store to local storage so user data is permanently safe and ready
    try {
      const stored = localStorage.getItem("saved_profiles");
      let list = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(list)) list = [];
      list = list.filter((p: any) => p.phone !== normalizedPhone);
      list.unshift(profileObj);
      localStorage.setItem("saved_profiles", JSON.stringify(list));
      localStorage.setItem("user_phone", normalizedPhone);
    } catch (e) {
      console.error("Error updating saved_profiles:", e);
    }

    // 2. Dispatch background save to n8n backend without blocking user experience
    fetch(API_URLS.saveProfile, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profileObj),
    })
      .then(async (r) => {
        if (!r.ok) {
          console.warn("Backend saveProfile returned status:", r.status);
        }
      })
      .catch((err) => {
        console.warn("Backend saveProfile network error:", err);
      });

    // 3. Immediately launch analysis with the profile and chosen theme!
    onProfileSaved(profileObj, selectedTheme);
  };

  return (
    <div id="profile-form-container" className="w-full bg-white border border-[#D8C4B6] backdrop-blur-md pt-8 px-3 sm:px-6 md:px-8 pb-14 rounded-3xl shadow-sm overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-[#1C3D63]"></div>

      {/* Centered top header */}
      <div className="flex flex-col items-center justify-center text-center space-y-3 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#1C3D63] uppercase font-headline">
            აიდი მოდელები
          </h2>
          <p className="text-sm sm:text-base text-[#3B5E63] tracking-widest uppercase font-bold mt-1">
            იდენტობის მატრიცა & 8 მოდელი
          </p>
          <p className="text-[11px] sm:text-[12px] tracking-wider text-[#8E8276] font-semibold uppercase mt-1">
            {viewMode === 'ORBIT'
              ? "გაეცანით 8 მოდელს ორბიტაზე და აირჩიეთ სასურველი მიმართულება"
              : "შეიყვანეთ თქვენი მონაცემები სინქრონიზაციისა და ანალიზისთვის"}
          </p>
        </div>
      </div>

      {/* 2-Step Navigation Tab Bar */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
        <button
          type="button"
          onClick={() => {
            setViewMode('ORBIT');
            playExitCapSound();
          }}
          className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
            viewMode === 'ORBIT'
              ? 'bg-[#1C3D63] text-white shadow-md scale-[1.02]'
              : 'bg-[#F4F7F7] text-[#1C3D63] border border-[#D8C4B6] hover:bg-[#E5ECEC]'
          }`}
        >
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
            viewMode === 'ORBIT' ? 'bg-[#E0AC6B] text-[#1C3D63]' : 'bg-[#D8C4B6] text-white'
          }`}>1</span>
          <span>მოდელების ორბიტა</span>
        </button>

        <div className="w-4 sm:w-8 h-[2px] bg-[#D8C4B6]" />

        <button
          type="button"
          onClick={() => {
            setViewMode('FORM');
            playExitCapSound();
          }}
          className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
            viewMode === 'FORM'
              ? 'bg-[#1C3D63] text-white shadow-md scale-[1.02]'
              : 'bg-[#F4F7F7] text-[#1C3D63] border border-[#D8C4B6] hover:bg-[#E5ECEC]'
          }`}
        >
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
            viewMode === 'FORM' ? 'bg-[#E0AC6B] text-[#1C3D63]' : 'bg-[#D8C4B6] text-white'
          }`}>2</span>
          <span>მონაცემების შევსება</span>
        </button>
      </div>

      {viewMode === 'ORBIT' ? (
        <div className="w-full flex flex-col items-center space-y-6">
          <OrbitCarousel
            selectedIndex={THEMES.findIndex(t => t.value === selectedTheme)}
            onSelect={(item) => {
              const matched = THEMES.find(t => t.value === item.id);
              if (matched) setSelectedTheme(matched.value);
            }}
            onProceed={(item) => {
              const matched = THEMES.find(t => t.value === item.id);
              if (matched) setSelectedTheme(matched.value);
              setViewMode('FORM');
              setTimeout(() => {
                const el = document.getElementById("profile-form-container");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 50);
            }}
          />

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setViewMode('FORM');
                playExitCapSound();
              }}
              className="px-6 py-3 bg-[#1C3D63] hover:bg-[#254F7F] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-98"
            >
              <span>მონაცემების შევსებაზე გადასვლა</span>
              <ArrowRight className="w-4 h-4 text-[#E0AC6B]" />
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full">
          {/* Active Model Indicator Banner */}
          <div className="mb-6 p-4 bg-[#F4F7F7] border-2 border-[#1C3D63] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 max-w-[480px] mx-auto w-full shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1C3D63] text-[#E0AC6B] font-headline font-black text-xs flex items-center justify-center shrink-0">
                {THEMES.find(t => t.value === selectedTheme)?.numeral || "I"}
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-[#E0AC6B] tracking-wider block">არჩეული მოდელი:</span>
                <strong className="text-xs sm:text-sm text-[#1C3D63] font-headline italic">
                  {THEMES.find(t => t.value === selectedTheme)?.label || "დასავლური ჰოროსკოპი"}
                </strong>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setViewMode('ORBIT')}
              className="px-3 py-1.5 bg-white hover:bg-[#E5ECEC] border border-[#D8C4B6] text-[#1C3D63] text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer shrink-0 shadow-sm flex items-center gap-1"
            >
              <span>🔄 ორბიტაზე შეცვლა</span>
            </button>
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
            <div className="bg-white border border-[#D8C4B6] rounded-2xl p-4 sm:p-5 shadow-sm max-w-[480px] mx-auto w-full select-none">
              {/* Direct Keyboard Typing Field */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-[#1C3D63] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E0AC6B]" />
                    <span>თარიღის პირდაპირი აკრეფა:</span>
                  </label>
                  <span className="text-[10px] text-[#8E8276] font-semibold">დღე / თვე / წელი</span>
                </div>
                <div className="relative bg-[#FAF7F2] rounded-xl border border-[#D8C4B6] focus-within:border-[#1C3D63] focus-within:bg-white shadow-inner flex items-center overflow-hidden px-3 py-1 transition-all">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={dateInputText}
                    onChange={handleDateTextChange}
                    onBlur={handleDateTextBlur}
                    placeholder="დღე / თვე / წელი (მაგ: 15/05/1995)"
                    className="w-full bg-transparent border-0 py-1.5 text-base sm:text-lg font-bold text-[#1C3D63] tracking-widest text-center focus:outline-none font-sans"
                  />
                  {dateInputText && (
                    <button
                      type="button"
                      onClick={() => {
                        setDateInputText("");
                      }}
                      className="text-[#8E8276] hover:text-[#1C3D63] p-1 text-xs cursor-pointer"
                      title="გასუფთავება"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Month / Year Switcher Bar (Booking Calendar Style) */}
              {(() => {
                const daysInCalMonth = new Date(calYear, calMonth, 0).getDate();
                const firstDayInCalMonth = new Date(calYear, calMonth - 1, 1).getDay();
                const calStartOffset = (firstDayInCalMonth + 6) % 7;

                return (
                  <div>
                    {/* Calendar Month & Year Selector with Navigation Arrows */}
                    <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-[#D8C4B6]/40">
                      <div className="flex items-center gap-2">
                        <select
                          value={calMonth}
                          onChange={(e) => handleMonthSelect(Number(e.target.value))}
                          className="bg-[#FAF7F2] border border-[#D8C4B6] text-[#1C3D63] font-bold text-xs sm:text-sm rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#1C3D63] cursor-pointer hover:bg-[#E5ECEC] transition-all"
                        >
                          {months.map((m) => (
                            <option key={m.value} value={m.value}>
                              {m.label}
                            </option>
                          ))}
                        </select>

                        <select
                          value={calYear}
                          onChange={(e) => handleYearSelect(Number(e.target.value))}
                          className="bg-[#FAF7F2] border border-[#D8C4B6] text-[#1C3D63] font-bold text-xs sm:text-sm rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#1C3D63] cursor-pointer hover:bg-[#E5ECEC] transition-all"
                        >
                          {years.map((y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={handlePrevMonth}
                          className="w-8 h-8 rounded-lg border border-[#D8C4B6] bg-white hover:bg-[#1C3D63] hover:text-white text-[#1C3D63] flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
                          title="წინა თვე"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNextMonth}
                          className="w-8 h-8 rounded-lg border border-[#D8C4B6] bg-white hover:bg-[#1C3D63] hover:text-white text-[#1C3D63] flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
                          title="შემდეგი თვე"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Days of week & Grid (.cal-grid from booking modal) */}
                    <div className="cal-grid grid grid-cols-7 gap-1.5 mb-3 text-center">
                      {WDS_KA.map((wd) => (
                        <div key={wd} className="wd">
                          {wd}
                        </div>
                      ))}

                      {/* Empty padding cells */}
                      {Array.from({ length: calStartOffset }).map((_, i) => (
                        <div key={`empty-${i}`} className="day empty" />
                      ))}

                      {/* Month Days */}
                      {Array.from({ length: daysInCalMonth }, (_, i) => i + 1).map((d) => {
                        const isSelected = d === day && calMonth === month && calYear === year;
                        return (
                          <button
                            key={d}
                            type="button"
                            onClick={() => handleDaySelect(d)}
                            className={`day ${isSelected ? "sel" : ""}`}
                          >
                            <span>{d}</span>
                            {isSelected && <span className="day-dot" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Verified Date Notification Badge */}
                    <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#D8C4B6] flex items-center justify-between text-xs mt-3">
                      <span className="text-[11px] sm:text-xs font-bold text-[#1C3D63] flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#E0AC6B]" />
                        <span>
                          არჩეულია: {day} {months.find((m) => m.value === month)?.label}, {year}
                        </span>
                      </span>
                      <span className="text-[9px] bg-[#E0AC6B] text-[#1C3D63] font-black px-2 py-0.5 rounded-full uppercase">
                        მზადაა
                      </span>
                    </div>
                  </div>
                );
              })()}
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

        {/* Modern Model Selector Bar */}
        <div className="py-4 max-w-2xl mx-auto w-full">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1C3D63] flex items-center gap-1.5 font-headline">
              <Sparkles className="w-3.5 h-3.5 text-[#E0AC6B]" />
              <span>აიდი მოდელები (8 მიმართულება):</span>
            </span>
            <button
              type="button"
              onClick={() => setViewMode('ORBIT')}
              className="text-[11px] font-bold text-[#1C3D63] hover:text-[#254F7F] underline cursor-pointer flex items-center gap-1"
            >
              <span>✦ ორბიტაზე ნახვა</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {THEMES.map((theme) => {
              const isSelected = selectedTheme === theme.value;
              return (
                <button
                  key={theme.value}
                  type="button"
                  onClick={() => {
                    setSelectedTheme(theme.value);
                    playExitCapSound();
                  }}
                  className={`p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#1C3D63] text-white border-[#1C3D63] shadow-md scale-[1.02]"
                      : "bg-[#F4F7F7] text-[#222222] border-[#D8C4B6] hover:bg-[#E5ECEC] hover:border-[#1C3D63]"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-[#E0AC6B] flex items-center">
                      <Sparkles className="w-3 h-3" />
                    </span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#E0AC6B]" />}
                  </div>
                  <strong className="text-xs font-headline italic leading-tight truncate">
                    {theme.label.split(" (")[0]}
                  </strong>
                </button>
              );
            })}
          </div>
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
  )}
</div>
  );
};
