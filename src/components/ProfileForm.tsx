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
        <svg className="w-12 h-12 text-[#f1bf62] transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          <path d="M16 8a4 4 0 0 0-4-4v8z" fill="currentColor" opacity="0.15" />
          <circle cx="7" cy="7" r="0.5" fill="currentColor" />
          <circle cx="17" cy="17" r="0.5" fill="currentColor" />
        </svg>
      );
    case CalculationType.ENNEAGRAM:
      return (
        <svg className="w-12 h-12 text-[#f1bf62] transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M12 3L2 20h20L12 3z" />
          <path d="M12 8a3 3 0 0 0-3 3c0 2 3 5 3 5s3-3 3-5a3 3 0 0 0-3-3z" fill="currentColor" opacity="0.15" />
          <circle cx="12" cy="11.5" r="1.5" fill="currentColor" />
          <path d="M8 12h8" />
        </svg>
      );
    case CalculationType.PSYCHOMATRIX:
      return (
        <svg className="w-12 h-12 text-[#f1bf62] transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M5 5v14h14L5 5z" />
          <path d="M5 19L19 19L5 5z" fill="currentColor" opacity="0.15" />
          <path d="M9 19v-4M13 19v-8M5 15h4M5 11h8" />
        </svg>
      );
    case CalculationType.NUMEROLOGY:
      return (
        <svg className="w-12 h-12 text-[#f1bf62] transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
          <path d="M12 3a9 9 0 0 0 0 18V3z" fill="currentColor" opacity="0.15" />
          <path d="M7 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" />
          <path d="M11 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" />
        </svg>
      );
    case CalculationType.HUMAN_DESIGN:
      return (
        <svg className="w-12 h-12 text-[#f1bf62] transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M12 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" fill="currentColor" opacity="0.2" />
          <path d="M12 6v10M6 14l6-4 6 4M12 16l-3 5M12 16l3 5" />
          <circle cx="12" cy="10" r="1" fill="currentColor" />
          <circle cx="12" cy="14" r="1.5" fill="currentColor" />
          <circle cx="6" cy="14" r="1" fill="currentColor" />
          <circle cx="18" cy="14" r="1" fill="currentColor" />
        </svg>
      );
    case CalculationType.VEDIC:
      return (
        <svg className="w-12 h-12 text-[#f1bf62] transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="5" fill="currentColor" opacity="0.15" />
          <path d="M12 2v20M2 12h20M5 5l14 14M5 19L19 5" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case CalculationType.BAZI:
      return (
        <svg className="w-12 h-12 text-[#f1bf62] transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3a9 9 0 0 0 0 18 4.5 4.5 0 0 0 0-9 4.5 4.5 0 0 1 0-9z" fill="currentColor" opacity="0.25" />
          <circle cx="12" cy="7.5" r="1.5" fill="currentColor" />
          <circle cx="12" cy="16.5" r="1.5" fill="currentColor" />
        </svg>
      );
    case CalculationType.ARCHETYPE:
      return (
        <svg className="w-12 h-12 text-[#f1bf62] transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="12" cy="9" r="6" />
          <path d="M6 15c0-4 3-6 6-6s6 2 6 6M12 15v5M9 20h6" />
          <path d="M12 3a6 6 0 0 0-6 6c0 2.5 1.5 4.5 3.5 5.5" fill="currentColor" opacity="0.15" />
          <circle cx="10" cy="8" r="0.8" fill="currentColor" />
          <circle cx="14" cy="8" r="0.8" fill="currentColor" />
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
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 max-w-6xl mx-auto w-full px-2 py-4 select-none">
            {THEMES.map((theme) => {
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

              return (
                <div
                  key={theme.value}
                  onClick={handleCardClick}
                  onMouseEnter={() => setHoveredTheme(theme.value)}
                  onMouseLeave={() => setHoveredTheme(null)}
                  className={`relative w-full aspect-[2/3] rounded-2xl p-3 bg-gradient-to-b from-[#1a1c1e] to-[#121416] border transition-all duration-500 cursor-pointer flex flex-col items-center justify-between select-none group ${
                    isHovered 
                      ? "border-[#f1bf62] shadow-[0_20px_45px_rgba(241,191,98,0.3)] -translate-y-6 scale-105 z-30"
                      : isSelected
                      ? "border-[#f1bf62] shadow-[0_0_25px_rgba(241,191,98,0.2)] bg-[#f1bf62]/5 -translate-y-3 scale-102 z-20"
                      : "border-white/10 hover:border-white/20 translate-y-0 scale-100 opacity-80 hover:opacity-100"
                  }`}
                >
                  {/* Ornate Inner Border like authentic Tarot Cards */}
                  <div className={`absolute inset-1.5 rounded-[12px] border pointer-events-none transition-colors duration-500 ${
                    isSelected || isHovered ? "border-[#f1bf62]/35" : "border-white/5"
                  }`}>
                    {/* Stars in the corners of the card */}
                    <div className="absolute top-1 left-1 text-[8px] text-[#f1bf62]/40 font-serif">✦</div>
                    <div className="absolute top-1 right-1 text-[8px] text-[#f1bf62]/40 font-serif">✦</div>
                    <div className="absolute bottom-1 left-1 text-[8px] text-[#f1bf62]/40 font-serif">✦</div>
                    <div className="absolute bottom-1 right-1 text-[8px] text-[#f1bf62]/40 font-serif">✦</div>
                  </div>

                  {/* Top: Roman Numeral representing card's order */}
                  <span className={`text-[10px] font-serif font-extrabold tracking-widest text-center mt-1 z-10 transition-colors uppercase ${
                    isSelected || isHovered ? "text-[#f1bf62]" : "text-[#c6c6ce]/40"
                  }`}>
                    {theme.numeral}
                  </span>

                  {/* Center: Thematic Mystical Illustration Drawing */}
                  <div className="flex-grow flex items-center justify-center py-2 z-10">
                    {getTarotIllustration(theme.value)}
                  </div>

                  {/* Bottom: Card Label Cover Title */}
                  <span className={`text-[10px] sm:text-[10.5px] font-extrabold text-center tracking-wider leading-tight z-10 pb-1.5 transition-colors uppercase ${
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

        {/* Action Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 bg-[#f1bf62] hover:bg-[#f1bf62]/90 text-[#121416] font-bold uppercase tracking-widest py-4 px-6 rounded-xl shadow-[0_0_15px_rgba(241,191,98,0.3)] transition-all cursor-pointer active:scale-98 flex items-center justify-center space-x-2.5 disabled:opacity-50 text-[12px]"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4.5 h-4.5 animate-spin text-[#121416]" />
              <span>მიმდინარეობს სინქრონიზაცია...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4.5 h-4.5 fill-[#121416] flex-shrink-0 text-[#121416]" />
              <span>
                {savedProfile ? "მონაცემების განახლება" : "დაწყება"}
              </span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
