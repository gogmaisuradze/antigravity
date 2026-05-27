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
        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[#f1bf62] bg-white/5">
          <Calendar className="w-6 h-6" />
        </div>
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
        {/* Row for Name/Surname and Phone number aligned next to each other */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
          {/* Name & Surname Field Combined */}
          <div>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="სახელი გვარი"
              className="w-full bg-transparent border-b border-white/10 py-3 text-base text-white placeholder-[#c6c6ce]/40 focus:outline-none focus:border-[#f1bf62] transition-colors font-bold"
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
              className="w-full bg-transparent border-b border-white/10 py-3 text-base text-white placeholder-[#c6c6ce]/40 focus:outline-none focus:border-[#f1bf62] transition-colors font-bold"
              required
            />
          </div>
        </div>

        {/* Unified iOS-Style Circular Date Selector */}
        <div className="space-y-3 py-2">
          <label className="block text-[12px] font-extrabold uppercase tracking-widest text-[#c6c6ce]/80 mb-1 text-center w-full">
            დაბადების თარიღი (დაატრიალეთ როლიკი ჩასასწორებლად)
          </label>
          
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
          
          {/* Real-time calculated birthdate confirmation text */}
          <div className="text-center mt-2">
            <p className="text-[13px] text-[#c6c6ce]/85 font-bold tracking-wider uppercase">
              არჩეული თარიღი: {day} {months.find(m => m.value === month)?.label}, {year}
            </p>
          </div>
        </div>

        {/* Unified iOS-Style Circular Theme/Topic Selector */}
        <div className="space-y-3 py-2">
          <label className="block text-[12px] font-extrabold uppercase tracking-widest text-[#c6c6ce]/80 mb-1 text-center w-full">
            ანალიზის თემა (დაატრიალეთ როლიკი ასარჩევად)
          </label>
          
          <div className="relative bg-[#1e2022]/40 rounded-2xl py-2 px-6 shadow-2xl border border-white/5 max-w-[480px] mx-auto overflow-hidden select-none">
            {/* Horizontal highlighted selection band in center of the roller */}
            <div className="absolute top-[50%] -translate-y-[50%] left-2 right-2 h-9 bg-white/5 rounded-lg pointer-events-none z-0" />
            
            {/* The single theme roller */}
            <div className="relative flex flex-row items-center justify-center z-10 w-full">
              <div className="w-full max-w-[280px]">
                <RollerPicker
                  variant="ios-dark"
                  items={themeItems}
                  selectedValue={selectedTheme}
                  onChange={setSelectedTheme}
                />
              </div>
            </div>
          </div>
          
          {/* Real-time theme name and description flat below the roulette without background wrappers */}
          <div className="text-center mt-4 px-4 max-w-[440px] mx-auto space-y-1.5">
            <h4 className="text-[14px] font-extrabold text-[#f1bf62] uppercase tracking-wider">
              {THEMES.find(t => t.value === selectedTheme)?.label}
            </h4>
            <p className="text-[12px] sm:text-[13px] text-[#c6c6ce]/75 font-semibold leading-relaxed">
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
