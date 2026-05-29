import React, { useState, useEffect } from "react";
import { BirthProfile, CalculationType } from "../types";
import { MapPin, Calendar, ShieldAlert, Sparkles, RefreshCw } from "lucide-react";
import { RollerPicker } from "./RollerPicker";

const THEMES = [
  { value: CalculationType.HOROSCOPE, label: "დასავლური ჰოროსკოპი", description: "ზოდიაქოს ნიშანი, ხასიათი, სტიქიები და კოსმოსური ტრენდები." },
  { value: CalculationType.ENNEAGRAM, label: "ენიაგრამა", description: "თქვენი ფსიქოტიპი, ფარული მოტივაციები, შიშები და ზრდის გზები." },
  { value: CalculationType.PSYCHOMATRIX, label: "ფსიქო მატრიცა", description: "პითაგორას ციფრული მატრიცა: ჯანმრთელობა, იღბალი, ენერგია და ნიჭი." },
  { value: CalculationType.NUMEROLOGY, label: "ნუმეროლოგია", description: "ბედისწერის რიცხვი, თქვენი უმაღლესი მისია და ცხოვრებისეული გზა." },
  { value: CalculationType.HUMAN_DESIGN, label: "ადამიანის დიზაინი", description: "ენერგეტიკული ტიპი, პროფილი, ავტორიტეტი და ცხოვრებისეული სტრატეგია." },
  { value: CalculationType.VEDIC, label: "ვედური ასტროლოგია", description: "ჯიოტიში: მთვარის ნიშანი, ნაკშატრები და კარმული ვალდებულებები." },
  { value: CalculationType.BAZI, label: "ბა-ძი (BaZi)", description: "ბედისწერის 4 სვეტი: დღის მბრძანებელი და 5 ელემენტის ბალანსი." },
  { value: CalculationType.ARCHETYPE, label: "არქეტიპული ანალიზი", description: "იუნგის 12 ფსიქოლოგიური არქეტიპი და ჩრდილოვანი მხარეები." },
];

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
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
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

      <form onSubmit={handleSubmit} className="space-y-6">
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

        {/* Visual CD/Vinyl Record Album Grid Theme Selector */}
        <div className="space-y-4 py-2">
          <label className="block text-[12px] font-extrabold uppercase tracking-widest text-[#c6c6ce]/80 mb-2 text-center w-full">
            ანალიზის თემა (აირჩიეთ ფირფიტა)
          </label>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {THEMES.map((theme) => {
              const isSelected = selectedTheme === theme.value;
              return (
                <div
                  key={theme.value}
                  onClick={() => setSelectedTheme(theme.value)}
                  className={`relative overflow-hidden rounded-2xl p-4 transition-all duration-500 cursor-pointer flex flex-col items-center justify-center aspect-square select-none group border ${
                    isSelected 
                      ? "bg-[#f1bf62]/10 border-[#f1bf62] shadow-[0_15px_30px_rgba(241,191,98,0.2)] -translate-y-2 scale-105" 
                      : "bg-[#1e2022]/40 border-white/5 hover:border-white/20 hover:-translate-y-1"
                  }`}
                >
                  {/* Vinyl Record / CD Disc emerging out of the sleeve when selected */}
                  <div className="relative w-20 h-20 mb-3 flex items-center justify-center">
                    {/* Vinyl Sleeve Back (Static) */}
                    <div className="absolute inset-0 rounded-lg bg-black/40 border border-white/10 z-10" />

                    {/* Vinyl Record (Spins & slides upwards when selected) */}
                    <div 
                      className={`absolute w-18 h-18 rounded-full bg-[#121416] border-4 border-[#222]/80 flex items-center justify-center shadow-lg transition-all duration-700 z-20 ${
                        isSelected 
                          ? "-translate-y-8 rotate-[360deg] scale-105 border-[#f1bf62]/30 shadow-[0_8px_20px_rgba(241,191,98,0.15)]" 
                          : "translate-y-0 rotate-0 group-hover:-translate-y-2 group-hover:rotate-45"
                      }`}
                    >
                      {/* Vinyl Ridges / Grooves */}
                      <div className="absolute inset-1.5 rounded-full border border-white/5 opacity-60"></div>
                      <div className="absolute inset-3 rounded-full border border-white/5 opacity-40"></div>
                      <div className="absolute inset-4.5 rounded-full border border-white/5 opacity-30"></div>
                      
                      {/* Center Sticker */}
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                        isSelected ? "bg-[#f1bf62]" : "bg-white/10"
                      }`}>
                        {/* Spindle hole */}
                        <div className="w-1.5 h-1.5 rounded-full bg-[#121416]"></div>
                      </div>
                    </div>
                  </div>

                  {/* Album Sleeve Cover Label */}
                  <span className={`text-[11px] sm:text-[12px] font-bold tracking-wider text-center leading-tight z-30 transition-colors uppercase ${
                    isSelected ? "text-[#f1bf62]" : "text-[#c6c6ce]/80 group-hover:text-white"
                  }`}>
                    {theme.label.split(" (")[0]}
                  </span>
                </div>
              );
            })}
          </div>
          
          {/* Active selected Album description box */}
          <div className="mt-6 p-5 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-xl shadow-xl max-w-xl mx-auto text-center space-y-2 transform transition-all duration-500 hover-glow">
            <h4 className="text-[14px] font-extrabold text-[#f1bf62] uppercase tracking-widest flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-[#f1bf62]" />
              {THEMES.find(t => t.value === selectedTheme)?.label}
            </h4>
            <p className="text-[12px] sm:text-[13px] text-[#c6c6ce]/85 font-semibold leading-relaxed">
              {THEMES.find(t => t.value === selectedTheme)?.description}
            </p>
          </div>
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
