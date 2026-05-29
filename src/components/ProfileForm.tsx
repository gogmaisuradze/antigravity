import React, { useState, useEffect } from "react";
import { BirthProfile, CalculationType } from "../types";
import { MapPin, Calendar, ShieldAlert, Sparkles, RefreshCw } from "lucide-react";
import { RollerPicker } from "./RollerPicker";

const THEMES = [
  { value: CalculationType.HOROSCOPE, label: "დასავლური ჰოროსკოპი", description: "ზოდიაქოს ნიშანი, ხასიათი, სტიქიები და კოსმოსური ტრენდები.", numeral: "I" },
  { value: CalculationType.ENNEAGRAM, label: "ენიაგრამა", description: "თქვენი ფსიქოტიპი, ფარული მოტივაციები, შიშები და ზრდის გზები.", numeral: "II" },
  { value: CalculationType.PSYCHOMATRIX, label: "ფსიქო მატრიცა", description: "პითაგორას ციფრული მატრიცა: ჯანმრთელობა, იღბალი, ენერგია და ნიჭი.", numeral: "III" },
  { value: CalculationType.NUMEROLOGY, label: "ნუმეროლოგია", description: "ბედისწერის რიცხვი, თქვენი უმაღლესი მისია და ცხოვრებისეული გზა.", numeral: "IV" },
  { value: CalculationType.HUMAN_DESIGN, label: "ადამიანის დიზაინი", description: "ენერგეტიკული ტიპი, პროფილი, ავტორიტეტი და ცხოვრებისეული სტრატეგია.", numeral: "V" },
  { value: CalculationType.VEDIC, label: "ვედური ასტროლოგია", description: "ჯიოტიში: მთვარის ნიშანი, ნაკშატრები და კარმული ვალდებულებები.", numeral: "VI" },
  { value: CalculationType.BAZI, label: "ბა-ძი (BaZi)", description: "ბედისწერის 4 სვეტი: დღის მბრძანებელი და 5 ელემენტის ბალანსი.", numeral: "VII" },
  { value: CalculationType.ARCHETYPE, label: "არქეტიპული ანალიზი", description: "იუნგის 12 ფსიქოლოგიური არქეტიპი და ჩრდილოვანი მხარეები.", numeral: "VIII" },
];

const getTarotIllustration = (type: CalculationType) => {
  switch (type) {
    case CalculationType.HOROSCOPE:
      return (
        <svg className="w-12 h-12 text-[#f1bf62] transition-all duration-500 group-hover:scale-115" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Cosmic orbital circles */}
          <circle cx="50" cy="50" r="40" strokeDasharray="3 3" opacity="0.4" />
          <circle cx="50" cy="50" r="28" strokeWidth="0.8" opacity="0.6" />
          {/* Mystic crescent moon and sun merging */}
          <path d="M50 25 A 25 25 0 0 1 75 50 A 25 25 0 0 0 50 25" fill="#f1bf62" fillOpacity="0.25" />
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
        <svg className="w-12 h-12 text-[#f1bf62] transition-all duration-500 group-hover:scale-115" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
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
        <svg className="w-12 h-12 text-[#f1bf62] transition-all duration-500 group-hover:scale-115" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
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
          <circle cx="50" cy="50" r="3" fill="#f1bf62" className="animate-pulse" />
        </svg>
      );
    case CalculationType.NUMEROLOGY:
      return (
        <svg className="w-12 h-12 text-[#f1bf62] transition-all duration-500 group-hover:scale-115" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
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
        <svg className="w-12 h-12 text-[#f1bf62] transition-all duration-500 group-hover:scale-115" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
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
        <svg className="w-12 h-12 text-[#f1bf62] transition-all duration-500 group-hover:scale-115" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Sacred lotus mandala */}
          <circle cx="50" cy="50" r="42" strokeDasharray="4 4" opacity="0.3" />
          {/* Multi-layered stars/lotus petals */}
          <path d="M50 15 C45 30 30 45 15 50 C30 55 45 70 50 85 C55 70 70 55 85 50 C70 45 55 30 50 15 Z" strokeWidth="1.2" fill="currentColor" fillOpacity="0.1" />
          <path d="M50 25 C47 35 35 47 25 50 C35 53 47 65 50 75 C53 65 65 53 75 50 C65 47 53 35 50 25 Z" strokeWidth="0.8" fill="#f1bf62" fillOpacity="0.2" />
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
        <svg className="w-12 h-12 text-[#f1bf62] transition-all duration-500 group-hover:scale-115" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
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
        <svg className="w-12 h-12 text-[#f1bf62] transition-all duration-500 group-hover:scale-115" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
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


interface ProfileFormProps {
  onProfileSaved: (profile: BirthProfile, initialTheme: CalculationType) => void;
  savedProfile: BirthProfile | null;
  loading: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ onProfileSaved, savedProfile, loading }) => {
  const [fullName, setFullName] = useState("");
  const [birthPlace, setBirthPlace] = useState("საქართველო");
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(1995);
  const [phone, setPhone] = useState(() => {
    return savedProfile?.phone || "";
  });
  const [selectedTheme, setSelectedTheme] = useState<CalculationType>(CalculationType.HOROSCOPE);
  const [hoveredTheme, setHoveredTheme] = useState<CalculationType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [useStandardCalendar, setUseStandardCalendar] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1024);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardSpacing = windowWidth < 480 ? 34 : windowWidth < 640 ? 46 : windowWidth < 768 ? 68 : windowWidth < 1024 ? 80 : 96;
  const cardScale = windowWidth < 480 ? 0.75 : windowWidth < 640 ? 0.85 : 1.0;

  // Auto-fill from saved profile
  useEffect(() => {
    if (savedProfile) {
      setFullName(`${savedProfile.name} ${savedProfile.surname}`.trim());
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

    const nameParts = fullName.trim().split(/\s+/);
    if (!fullName.trim() || nameParts.length < 2) {
      return setError("გთხოვთ შეიყვანოთ სახელი და გვარი (უნდა შეიცავდეს ორ სიტყვას)");
    }
    const name = nameParts[0];
    const surname = nameParts.slice(1).join(" ");

    const trimmedPhone = phone.trim();
    if (!trimmedPhone) {
      return setError("გთხოვთ შეიყვანოთ ტელეფონის ნომერი");
    }

    const finalBirthPlace = birthPlace.trim() || "საქართველო";

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          surname: surname.trim(),
          birthPlace: finalBirthPlace,
          day,
          month,
          year,
          phone: trimmedPhone
        }),
      });

      const data = await response.json();
      if (data.success) {
        onProfileSaved(data.profile, selectedTheme);
      } else {
        setError(data.error || "შეცდომა შენახვისას");
      }
    } catch (err: any) {
      setError("ვერ დაუკავშირდა სერვერს. სცადეთ მოგვიანებით.");
    }
  };

  return (
    <div id="profile-form-container" className="w-full bg-[#1e2022]/60 border border-white/5 backdrop-blur-md p-8 rounded-2xl shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-[#f1bf62]"></div>

      {/* Centered top header "იდენტობის მატრიცა გააშუალედე ზევით ყველაფერი" */}
      <div className="flex flex-col items-center justify-center text-center space-y-3 mb-8">
        <button 
          type="button"
          onClick={() => setUseStandardCalendar(!useStandardCalendar)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all cursor-pointer ${
            useStandardCalendar 
              ? 'bg-[#f1bf62] text-[#121416] border-[#f1bf62] shadow-[0_0_15px_rgba(241,191,98,0.3)] scale-105' 
              : 'bg-white/5 text-[#f1bf62] border-white/20 hover:bg-white/10 hover:scale-105'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest font-label">კალენდარი</span>
        </button>
        <div>
          <h2 className="text-xl font-bold tracking-[0.2em] text-[#f1bf62] uppercase font-headline">
            იდენტობის მატრიცა
          </h2>
          <p className="text-[12px] sm:text-[13px] tracking-wider text-[#c6c6ce]/70 font-semibold uppercase mt-1">
            შეიყვანეთ თქვენი მონაცემები სინქრონიზაციისთვის
          </p>
        </div>
      </div>

      {error && (
        <div id="error-alert" className="mb-6 p-4 bg-red-950/20 border border-red-500/20 text-red-300 text-xs rounded-xl tracking-wide flex items-start space-x-2.5 font-semibold">
          <ShieldAlert className="w-4.5 h-4.5 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      <form id="profile-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Row for Name/Surname and Phone number aligned next to each other, narrowed to match compact theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2 max-w-[480px] mx-auto w-full">
          {/* Name & Surname Field Combined */}
          <div>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="სახელი გვარი"
              className="w-full bg-transparent border-b border-white/30 py-3 text-base text-white placeholder-white/60 focus:outline-none focus:border-[#f1bf62] transition-colors font-bold"
              required
            />
          </div>

          {/* Phone Field */}
          <div>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="ტელ:"
              className="w-full bg-transparent border-b border-white/30 py-3 text-base text-white placeholder-white/60 focus:outline-none focus:border-[#f1bf62] transition-colors font-bold"
              required
            />
          </div>
        </div>

        {/* Unified iOS-Style Circular Date Selector or Standard Calendar alternative */}
        <div className="space-y-3 py-2">
          <label className="block text-[12px] font-extrabold uppercase tracking-widest text-[#c6c6ce]/80 mb-1 text-center w-full">
            {useStandardCalendar 
              ? "დაბადების თარიღი (დააწკაპუნეთ კალენდრიდან ასარჩევად)" 
              : "დაბადების თარიღი (დაატრიალეთ როლიკი ჩასასწორებლად)"}
          </label>
          
          {useStandardCalendar ? (
            <div className="relative bg-[#1e2022]/40 rounded-2xl py-4 px-6 shadow-2xl border border-white/10 max-w-[480px] mx-auto overflow-hidden">
              <input
                type="date"
                value={`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val) {
                    const [y, m, d] = val.split('-').map(Number);
                    setYear(y);
                    setMonth(m);
                    setDay(d);
                  }
                }}
                className="w-full bg-transparent border-0 py-1 text-base text-white focus:outline-none font-bold text-center tracking-widest cursor-pointer [color-scheme:dark]"
                style={{ colorScheme: 'dark' }}
                required
              />
            </div>
          ) : (
            <div className="relative bg-[#1e2022]/40 rounded-2xl py-2 px-6 shadow-2xl border border-white/5 max-w-[480px] mx-auto overflow-hidden select-none">
              {/* Horizontal highlighted selection band in center across all column rollers */}
              <div className="absolute top-[50%] -translate-y-[50%] left-2 right-2 h-9 bg-white/5 rounded-lg pointer-events-none z-0" />
              
              {/* The side-by-side rollers */}
              <div className="relative flex flex-row items-center justify-between gap-4 z-10 w-full">
                {/* Month */}
                <div className="flex-1 min-w-[120px]">
                  <RollerPicker
                    variant="ios-dark"
                    items={monthsItems}
                    selectedValue={month}
                    onChange={setMonth}
                  />
                </div>

                {/* Day */}
                <div className="flex-1 min-w-[65px]">
                  <RollerPicker
                    variant="ios-dark"
                    items={daysItems}
                    selectedValue={day}
                    onChange={setDay}
                  />
                </div>

                {/* Year */}
                <div className="flex-1 min-w-[80px]">
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
            <p className="text-[13px] text-[#c6c6ce]/85 font-bold tracking-wider uppercase">
              არჩეული თარიღი: {day} {months.find(m => m.value === month)?.label}, {year}
            </p>
          </div>
        </div>

        {/* Mystical Tarot Card Deck Theme Selector */}
        <div className="space-y-6 py-4">
          <label className="block text-[12px] font-extrabold uppercase tracking-widest text-[#c6c6ce]/80 mb-1 text-center w-full">
            ანალიზის თემა (აირჩიეთ ტაროს კარტი)
          </label>
          
          <div className="relative w-full h-[280px] sm:h-[320px] md:h-[360px] flex items-center justify-center overflow-visible my-10 select-none px-4">
            {THEMES.map((theme, index) => {
              const isSelected = selectedTheme === theme.value;
              const isHovered = hoveredTheme === theme.value;
              
              const handleCardClick = () => {
                setSelectedTheme(theme.value);
                
                // If form is already filled out, automatically submit the form to calculate the matrix
                const nameParts = fullName.trim().split(/\s+/);
                const trimmedPhone = phone.trim();
                if (fullName.trim() && nameParts.length >= 2 && trimmedPhone) {
                  setTimeout(() => {
                    const formEl = document.getElementById("profile-form") as HTMLFormElement;
                    if (formEl) {
                      formEl.requestSubmit();
                    }
                  }, 50);
                }
              };

              const distanceFromCenter = index - 3.5;
              const dx = distanceFromCenter * cardSpacing;
              const dy = Math.abs(distanceFromCenter) * Math.abs(distanceFromCenter) * (windowWidth < 640 ? 1.5 : 2.5);
              const rot = distanceFromCenter * (windowWidth < 640 ? 4.5 : 6);

              let transformStr = `translate3d(calc(-50% + ${dx}px), ${dy}px, 0px) rotate(${rot}deg) scale(${cardScale})`;
              let zIndexVal = 10 + Math.round(10 - Math.abs(distanceFromCenter));

              if (isHovered) {
                transformStr = `translate3d(calc(-50% + ${dx}px), -45px, 80px) rotate(0deg) scale(${cardScale * 1.3})`;
                zIndexVal = 100;
              } else if (isSelected) {
                transformStr = `translate3d(calc(-50% + ${dx}px), -15px, 40px) rotate(${rot * 0.3}deg) scale(${cardScale * 1.15})`;
                zIndexVal = 80;
              }

              return (
                <div
                  key={theme.value}
                  onClick={handleCardClick}
                  onMouseEnter={() => setHoveredTheme(theme.value)}
                  onMouseLeave={() => setHoveredTheme(null)}
                  style={{
                    transform: transformStr,
                    zIndex: zIndexVal,
                    transformOrigin: "bottom center",
                  }}
                  className={`absolute left-1/2 bottom-4 w-[86px] sm:w-[105px] md:w-[115px] aspect-[2/3.1] rounded-2xl p-2.5 sm:p-3 bg-gradient-to-b from-[#1a1c1e] to-[#121416] border transition-all duration-500 cursor-pointer flex flex-col items-center justify-between select-none group ${
                    isHovered 
                      ? "border-[#f1bf62] shadow-[0_20px_45px_rgba(241,191,98,0.35)]"
                      : isSelected
                      ? "border-[#f1bf62] shadow-[0_0_30px_rgba(241,191,98,0.25)] bg-[#f1bf62]/5"
                      : "border-white/10 hover:border-white/20 opacity-75 hover:opacity-100"
                  }`}
                >
                  {/* Ornate Inner Border like authentic Tarot Cards */}
                  <div className={`absolute inset-1 sm:inset-1.5 rounded-[10px] sm:rounded-[12px] border pointer-events-none transition-colors duration-500 ${
                    isSelected || isHovered ? "border-[#f1bf62]/35" : "border-white/5"
                  }`}>
                    {/* Stars in the corners of the card */}
                    <div className="absolute top-1 left-1 text-[7px] text-[#f1bf62]/40 font-serif">✦</div>
                    <div className="absolute top-1 right-1 text-[7px] text-[#f1bf62]/40 font-serif">✦</div>
                    <div className="absolute bottom-1 left-1 text-[7px] text-[#f1bf62]/40 font-serif">✦</div>
                    <div className="absolute bottom-1 right-1 text-[7px] text-[#f1bf62]/40 font-serif">✦</div>
                  </div>

                  {/* Top: Roman Numeral representing card's order */}
                  <span className={`text-[8.5px] sm:text-[9.5px] font-serif font-extrabold tracking-widest text-center mt-1 z-10 transition-colors uppercase ${
                    isSelected || isHovered ? "text-[#f1bf62]" : "text-[#c6c6ce]/40"
                  }`}>
                    {theme.numeral}
                  </span>

                  {/* Center: Thematic Mystical Illustration Drawing */}
                  <div className="flex-grow flex items-center justify-center py-2 z-10 w-full">
                    {getTarotIllustration(theme.value)}
                  </div>

                  {/* Bottom: Card Label Cover Title */}
                  <span className={`text-[8px] sm:text-[9.5px] font-extrabold text-center tracking-wider leading-tight z-10 pb-1 sm:pb-1.5 transition-colors uppercase ${
                    isSelected || isHovered ? "text-[#f1bf62]" : "text-[#c6c6ce]/75 group-hover:text-white"
                  }`}>
                    {theme.label.split(" (")[0]}
                  </span>
                </div>
              );
            })}
          </div>
          
          {/* Active / Hovered Card detailed description box */}
          {(() => {
            const activeDisplayTheme = THEMES.find(t => t.value === (hoveredTheme || selectedTheme));
            return (
              <div className="mt-4 p-5 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-xl shadow-xl max-w-xl mx-auto text-center space-y-2 transform transition-all duration-500 hover-glow">
                <h4 className="text-[14px] font-extrabold text-[#f1bf62] uppercase tracking-widest flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#f1bf62] animate-pulse" />
                  {activeDisplayTheme?.label}
                </h4>
                <p className="text-[12px] sm:text-[13px] text-[#c6c6ce]/85 font-semibold leading-relaxed min-h-[40px]">
                  {activeDisplayTheme?.description}
                </p>
              </div>
            );
          })()}
        </div>

        {/* Action Button Container */}
        <div className="flex justify-center w-full mt-8">
          <button
            type="submit"
            disabled={loading}
            className={`transition-all duration-700 ease-in-out cursor-pointer active:scale-95 flex items-center justify-center border font-bold uppercase tracking-widest disabled:opacity-80 text-[12px] shadow-[0_0_20px_rgba(241,191,98,0.2)] ${
              loading 
                ? "w-14 h-14 rounded-full bg-transparent border-[#f1bf62]/80 text-[#f1bf62]" 
                : "w-full max-w-[480px] h-14 rounded-xl bg-[#f1bf62] border-[#f1bf62] text-[#121416] hover:bg-[#f1bf62]/90 hover:shadow-[0_0_25px_rgba(241,191,98,0.4)]"
            }`}
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 animate-spin text-[#f1bf62]" />
            ) : (
              <>
                <Sparkles className="w-4.5 h-4.5 fill-[#121416] flex-shrink-0 text-[#121416] mr-2" />
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
