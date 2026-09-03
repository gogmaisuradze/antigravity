import React, { useState, useEffect } from "react";
import { BirthProfile, CompatibilityResponse } from "../types";
import { Heart, Send, CheckCircle2, AlertTriangle, MessageSquare, Sparkles, RefreshCw, ChevronRight, ArrowLeft } from "lucide-react";
// Note: Prefer standard text rendering or react-markdown if needed. Let's just render the response elegantly with styled blocks or simple split paragraphs since react-markdown config without className is requested or we can use custom elements.
// Wait! The framework guidelines say: "Prefer using react-markdown to render Markdown. The className prop has been removed from react-markdown." 
// Let's import ReactMarkdown from "react-markdown" cleanly!
import ReactMarkdown from "react-markdown";
import { API_URLS } from "../config";

interface CompatibilityPanelProps {
  userProfile: BirthProfile;
  invitedPhone?: string; // prefilled from query string
}

export const CompatibilityPanel: React.FC<CompatibilityPanelProps> = ({ userProfile, invitedPhone }) => {
  const [partnerPhone, setPartnerPhone] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [partnerSurname, setPartnerSurname] = useState("");
  const [partnerBirthDate, setPartnerBirthDate] = useState(""); // "YYYY-MM-DD"
  const [checking, setChecking] = useState(false);
  const [partnerProfile, setPartnerProfile] = useState<any | null>(null);
  const [partnerStatus, setPartnerStatus] = useState<"unchecked" | "not_found" | "found">("unchecked");
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState<CompatibilityResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Auto-fill invited partner phone from query parameter
  useEffect(() => {
    if (invitedPhone) {
      const clean = invitedPhone.trim().replace(/\s+/g, "");
      setPartnerPhone(clean);
      checkPartnerStatus(clean);
    }
  }, [invitedPhone]);

  const checkPartnerStatus = async (phoneToCheck: string) => {
    const cleanPhone = phoneToCheck.trim().replace(/\s+/g, "");
    if (!cleanPhone) return;

    setChecking(true);
    setError(null);
    setResult(null);
    setPartnerProfile(null);

    try {
      const response = await fetch(API_URLS.getProfile(cleanPhone));
      const data = await response.json();
      
      if (data.success) {
        if (data.exists) {
          setPartnerStatus("found");
          setPartnerProfile(data.profile);
          // Auto-fill form values!
          setPartnerName(data.profile.name || "");
          setPartnerSurname(data.profile.surname || "");
          if (data.profile.year && data.profile.month && data.profile.day) {
            const y = data.profile.year;
            const m = String(data.profile.month).padStart(2, '0');
            const d = String(data.profile.day).padStart(2, '0');
            setPartnerBirthDate(`${y}-${m}-${d}`);
          }
        } else {
          setPartnerStatus("not_found");
        }
      } else {
        setError(data.error || "შეცდომა სტატუსის შემოწმებისას");
      }
    } catch (err) {
      setError("ვერ მოხერხდა ნომრის სტატუსის შემოწმება");
    } finally {
      setChecking(false);
    }
  };

  const handleCalculate = async () => {
    const cleanPhone = partnerPhone.trim().replace(/\s+/g, "");
    if (!cleanPhone) {
      setError("ტელეფონის ნომერი სავალდებულოა!");
      return;
    }
    if (!partnerName.trim()) {
      setError("პარტნიორის სახელი სავალდებულოა!");
      return;
    }
    if (!partnerSurname.trim()) {
      setError("პარტნიორის გვარი სავალდებულოა!");
      return;
    }
    if (!partnerBirthDate) {
      setError("დაბადების თარიღი სავალდებულოა!");
      return;
    }

    setCalculating(true);
    setError(null);

    try {
      const [year, month, day] = partnerBirthDate.split('-').map(Number);
      
      // Register or update partner profile first
      const regResponse = await fetch(API_URLS.saveProfile, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: cleanPhone,
          name: partnerName.trim(),
          surname: partnerSurname.trim(),
          birthPlace: "თბილისი",
          day,
          month,
          year,
        }),
      });

      const regData = await regResponse.json();
      if (!regData.success) {
        setError(regData.error || "პარტნიორის მონაცემების შენახვა ვერ მოხერხდა");
        setCalculating(false);
        return;
      }

      // Compute compatibility with complete partner payload and 90s timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 90000); // 90 seconds timeout

      const response = await fetch(API_URLS.compatibility, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          phoneA: userProfile.phone,
          phoneB: cleanPhone,
          partnerName: partnerName.trim(),
          partnerSurname: partnerSurname.trim(),
          partnerDay: day,
          partnerMonth: month,
          partnerYear: year,
          partnerBirthdate: partnerBirthDate,
        }),
      });

      clearTimeout(timeoutId);

      const data = await response.json();
      if (data.success || data.content) {
        setResult({
          compatibilityScore: data.compatibilityScore || 85,
          dimensions: data.dimensions || {
            astrological: 88,
            psychological: 82,
            vibrational: 90,
            karmic: 85
          },
          narrative: data.content || data.narrative || "",
          waLink: data.waLink || undefined,
          waCode: data.waCode || undefined,
        });
      } else {
        setError(data.error || "გამოთვლა ვერ განხორციელდა");
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError("გამოთვლას დასჭირდა მოსალოდნელზე მეტი დრო (Timeout). გთხოვთ სცადოთ თავიდან.");
      } else {
        setError("კავშირის შეცდომა. სცადეთ მოგვიანებით.");
      }
    } finally {
      setCalculating(false);
    }
  };

  // Build the WhatsApp sharing link for invitation
  const getWhatsAppInviteLink = () => {
    const appUrl = window.location.origin;
    const messageText = `გამარჯობა! მინდა გავიგო ჩვენი კოსმოსური და ფსიქოლოგიური თავსებადობა (ჰოროსკოპის, ენიაგრამის, ნუმეროლოგიის და ბა-ძის მიხედვით) ❤️ 
 
გთხოვ, სულ რამდენიმე წამში შეავსო შენი მონაცემები ამ სპეციალური ლინკით, რის შემდეგაც ავტომატურად გამოვითვლით თავსებადობას:
👉 ${appUrl}?compareWith=${encodeURIComponent(userProfile.phone)}`;

    return `https://api.whatsapp.com/send?text=${encodeURIComponent(messageText)}`;
  };

  // Build WhatsApp sharing link for the final result
  const getWhatsAppResultLink = () => {
    if (!result) return "";
    const appUrl = window.location.origin;
    const messageText = `ჩვენი კოსმოსური თავსებადობა გაანგარიშებულია ხელოვნური ინტელექტის მიხედვით! 🧬❤️
 
საერთო თავსებადობის ქულაა: %${result.compatibilityScore}
✨ ასტროლოგიური: %${result.dimensions.astrological}
🧠 ფსიქოლოგიური: %${result.dimensions.psychological}
🔮 ნუმეროლოგიური: %${result.dimensions.vibrational}
🌀 კარმული: %${result.dimensions.karmic}
 
გახსენი აპლიკაცია, რომ წაიკითხო ხელოვნური ინტელექტის ვრცელი ერთობლივი ანალიზი:
👉 ${appUrl}?compareWith=${encodeURIComponent(userProfile.phone)}`;

    return `https://api.whatsapp.com/send?text=${encodeURIComponent(messageText)}`;
  };

  return (
    <div id="compatibility-panel-container" className="w-full max-w-2xl mx-auto bg-[#1e2022]/60 border border-white/5 backdrop-blur-md p-4 sm:p-8 rounded-2xl shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-[#1C3D63]"></div>

      <div className="flex flex-col items-center justify-center text-center space-y-3 mb-8">
        <div className="w-11 h-11 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-[#E0AC6B]">
          <Heart className="w-5 h-5 fill-red-500/10 text-red-400" />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold tracking-[0.15em] text-[#E0AC6B] uppercase font-headline">
            ნახე სხვასთან თავსებადობა
          </h2>
          <p className="text-[12px] tracking-wider text-[#c6c6ce]/70 font-semibold uppercase mt-1 max-w-md mx-auto">
            გამოთვალეთ თქვენი და სასურველი ადამიანის ასტრო-ფსიქოლოგიური კავშირის რეზონანსი
          </p>
        </div>
      </div>

      {invitedPhone && partnerStatus === "found" && (
        <div className="mb-6 p-4 bg-emerald-950/20 border border-emerald-500/20 text-emerald-350 text-xs rounded-xl flex items-start space-x-3 font-semibold">
          <Sparkles className="w-4.5 h-4.5 shrink-0 text-emerald-400 animate-pulse" />
          <span className="leading-relaxed">
            თქვენ მოწვეული ხართ თავსებადობის შესამოწმებლად მომხმარებელთან: <strong className="text-white font-bold">{partnerName} {partnerSurname}</strong>. მონაცემები შევსებულია, შეგიძლიათ დაიწყოთ სინქრონიზაცია!
          </span>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-950/20 border border-red-500/20 text-red-300 text-xs rounded-xl flex items-start space-x-2 font-semibold">
          <AlertTriangle className="w-4.5 h-4.5 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Inputs Section */}
      <div className="space-y-6 max-w-[480px] mx-auto w-full">
        <div>
          <label className="block text-[12px] uppercase tracking-widest text-[#c6c6ce]/80 mb-2 font-bold">
            ტელეფონი:
          </label>
          <div className="flex space-x-3">
            <input
              type="tel"
              value={partnerPhone}
              onChange={(e) => {
                setPartnerPhone(e.target.value);
                setPartnerStatus("unchecked");
                setResult(null);
              }}
              placeholder="მაგ: +995555123456"
              className="flex-1 bg-transparent border-b border-white/10 py-3 text-base text-white placeholder-[#c6c6ce]/40 focus:outline-none focus:border-[#E0AC6B] font-medium transition-colors"
            />
            <button
              onClick={() => checkPartnerStatus(partnerPhone)}
              disabled={checking || !partnerPhone.trim()}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[11px] font-bold tracking-widest uppercase rounded-xl flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
            >
              {checking ? (
                <RefreshCw className="w-4.5 h-4.5 animate-spin text-white" />
              ) : (
                <span>მოძიება</span>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-[12px] uppercase tracking-widest text-[#c6c6ce]/80 mb-2 font-bold">
              სახელი:
            </label>
            <input
              type="text"
              value={partnerName}
              onChange={(e) => {
                setPartnerName(e.target.value);
                setResult(null);
              }}
              placeholder="მაგ: მარიამი"
              className="w-full bg-transparent border-b border-white/10 py-3 text-base text-white placeholder-[#c6c6ce]/40 focus:outline-none focus:border-[#E0AC6B] font-medium transition-colors"
            />
          </div>

          <div>
            <label className="block text-[12px] uppercase tracking-widest text-[#c6c6ce]/80 mb-2 font-bold">
              გვარი:
            </label>
            <input
              type="text"
              value={partnerSurname}
              onChange={(e) => {
                setPartnerSurname(e.target.value);
                setResult(null);
              }}
              placeholder="მაგ: კობახიძე"
              className="w-full bg-transparent border-b border-white/10 py-3 text-base text-white placeholder-[#c6c6ce]/40 focus:outline-none focus:border-[#E0AC6B] font-medium transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-[12px] uppercase tracking-widest text-[#c6c6ce]/80 mb-2 font-bold">
            დაბადების თარიღი:
          </label>
          <div className="relative bg-[#1e2022]/40 rounded-2xl py-4 px-6 shadow-2xl border border-white/10 max-w-[280px] overflow-hidden">
            <input
              type="date"
              value={partnerBirthDate}
              onChange={(e) => {
                setPartnerBirthDate(e.target.value);
                setResult(null);
              }}
              className="w-full bg-transparent border-0 py-1 text-base text-white focus:outline-none font-bold text-center tracking-widest cursor-pointer [color-scheme:dark]"
              style={{ colorScheme: 'dark' }}
            />
          </div>
        </div>

        {/* Dynamic Status UI */}
        {partnerStatus === "found" && (
          <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl space-y-2 shadow-xs">
            <div className="flex items-center space-x-2 text-emerald-350 text-xs font-semibold">
              <CheckCircle2 className="w-4.5 h-4.5 shrink-0 text-emerald-400" />
              <span className="tracking-wide text-[12px]">
                სისტემამ მოძებნა დარეგისტრირებული მომხმარებელი: <strong className="text-white font-bold">{partnerName} {partnerSurname}</strong> (მზადყოფნა აქტიურია)
              </span>
            </div>
          </div>
        )}

        {partnerStatus === "not_found" && (
          <div className="p-4 bg-[#1e2022]/45 border border-white/5 rounded-xl space-y-3 shadow-xs">
            <div className="flex items-start space-x-2 text-[#c6c6ce] text-xs font-semibold">
              <Sparkles className="w-4.5 h-4.5 shrink-0 text-[#E0AC6B]" />
              <span className="tracking-wide text-[12px] leading-relaxed">
                ნომერი არ არის ბაზაში, მაგრამ შეგიძლიათ ხელით შეიყვანოთ მონაცემები და სისტემა მაინც გამოთვლის თავსებადობას!
              </span>
            </div>
            <div>
              <a
                href={getWhatsAppInviteLink()}
                target="_blank"
                referrerPolicy="no-referrer"
                className="inline-flex bg-white/5 hover:bg-white/10 text-white font-bold text-[10px] tracking-widest uppercase py-2 px-3 rounded-lg border border-white/10 items-center space-x-1.5 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5 text-white" />
                <span>გაუგზავნე მოწვევა WhatsApp-ზე</span>
              </a>
            </div>
          </div>
        )}

        {!result && (
          <button
            onClick={handleCalculate}
            disabled={calculating}
            className="w-full bg-[#1C3D63] hover:bg-[#254F7F] text-white font-bold text-[11px] tracking-widest uppercase py-4 px-6 rounded-xl shadow-[0_0_15px_rgba(28,61,99,0.3)] transition-all active:scale-98 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            {calculating ? (
              <>
                <RefreshCw className="w-4.5 h-4.5 animate-spin text-white" />
                <span>მიმდინარეობს კოსმიური სინქრონიზაცია AI-ით...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4.5 h-4.5 text-white animate-pulse" />
                <span>თავსებადობის ანალიზის გააქტიურება</span>
              </>
            )}
          </button>
        )}

        {/* Results Visual Blocks */}
        {result && (
          <div className="mt-8 space-y-6">
            <button
              onClick={() => setResult(null)}
              className="inline-flex items-center space-x-2 text-[11px] tracking-widest text-[#c6c6ce] hover:text-[#E0AC6B] font-bold uppercase transition-all mb-2 group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>უკან დაბრუნება (თავსებადობა)</span>
            </button>

            {/* Main Score Radial/Card */}
            <div className="p-4 sm:p-8 bg-[#1e2022]/40 border border-white/5 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E0AC6B]/5 rounded-full blur-3xl"></div>
              
              <span className="text-[12px] uppercase tracking-[0.25em] text-[#c6c6ce]/70 font-bold mb-3">
                თავსებადობის კოეფიციენტი
              </span>

              {/* Big Score text */}
              <div className="text-7xl font-bold text-[#E0AC6B] mb-2 font-headline tracking-tighter glow-text-gold">
                %{result.compatibilityScore}
              </div>

              {/* Match description word */}
              <span className="text-[11px] font-black tracking-widest text-[#E0AC6B] px-4 py-2 border border-white/10 bg-[#1e2022]/90 uppercase rounded-xl shadow-2xl">
                {result.compatibilityScore >= 90 ? "იდეალური კავშირი 🌌" : 
                 result.compatibilityScore >= 75 ? "მაღალი ჰარმონია ✨" : 
                 result.compatibilityScore >= 50 ? "კარგი თავსებადობა ⚖️" : "კარმული გაკვეთილი 🌀"}
              </span>

              {/* Individual Dimensions Grid */}
              <div className="grid grid-cols-2 gap-4 w-full mt-8">
                {/* 1. Astrological */}
                <div className="p-4 bg-[#1e2022]/60 border border-white/5 rounded-xl flex flex-col items-center shadow-xl">
                  <span className="text-[10px] uppercase tracking-widest text-[#c6c6ce]/75 font-bold">ასტროლოგიური</span>
                  <span className="text-lg font-mono text-[#E0AC6B] font-extrabold mt-1">%{result.dimensions.astrological}</span>
                  <div className="w-full bg-white/10 h-[4px] rounded-full mt-3.5 overflow-hidden">
                    <div className="bg-[#E0AC6B] h-full rounded-full" style={{ width: `${result.dimensions.astrological}%` }}></div>
                  </div>
                </div>

                {/* 2. Psychological */}
                <div className="p-4 bg-[#1e2022]/60 border border-white/5 rounded-xl flex flex-col items-center shadow-xl">
                  <span className="text-[10px] uppercase tracking-widest text-[#c6c6ce]/75 font-bold">ფსიქოლოგიური</span>
                  <span className="text-lg font-mono text-[#E0AC6B] font-extrabold mt-1">%{result.dimensions.psychological}</span>
                  <div className="w-full bg-white/10 h-[4px] rounded-full mt-3.5 overflow-hidden">
                    <div className="bg-[#E0AC6B] h-full rounded-full" style={{ width: `${result.dimensions.psychological}%` }}></div>
                  </div>
                </div>

                {/* 3. Vibrational */}
                <div className="p-4 bg-[#1e2022]/60 border border-white/5 rounded-xl flex flex-col items-center shadow-xl">
                  <span className="text-[10px] uppercase tracking-widest text-[#c6c6ce]/75 font-bold">ნუმეროლოგიური</span>
                  <span className="text-lg font-mono text-[#E0AC6B] font-extrabold mt-1">%{result.dimensions.vibrational}</span>
                  <div className="w-full bg-white/10 h-[4px] rounded-full mt-3.5 overflow-hidden">
                    <div className="bg-[#E0AC6B] h-full rounded-full" style={{ width: `${result.dimensions.vibrational}%` }}></div>
                  </div>
                </div>

                {/* 4. Karmic */}
                <div className="p-4 bg-[#1e2022]/60 border border-white/5 rounded-xl flex flex-col items-center shadow-xl">
                  <span className="text-[10px] uppercase tracking-widest text-[#c6c6ce]/75 font-bold">კარმული რეზონანსი</span>
                  <span className="text-lg font-mono text-[#E0AC6B] font-extrabold mt-1">%{result.dimensions.karmic}</span>
                  <div className="w-full bg-white/10 h-[4px] rounded-full mt-3.5 overflow-hidden">
                    <div className="bg-[#E0AC6B] h-full rounded-full" style={{ width: `${result.dimensions.karmic}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative Explanation in Georgian */}
            <div className="p-0 pt-4 sm:p-6 bg-transparent sm:bg-[#1e2022]/60 border-0 sm:border border-white/5 rounded-2xl space-y-4 shadow-none sm:shadow-2xl text-[#c6c6ce]">
              <h4 className="text-sm font-black tracking-wider uppercase text-[#E0AC6B] border-b border-white/10 pb-3 flex items-center font-headline">
                <Sparkles className="w-4.5 h-4.5 mr-2 text-[#E0AC6B] shrink-0" />
                ამომწურავი კოსმიური და ფსიქოლოგიური ანალიზი:
              </h4>
              
              <div className="text-sm md:text-base text-[#c6c6ce] leading-relaxed max-w-none overflow-hidden font-medium">
                <ReactMarkdown
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-xl sm:text-2xl font-black text-[#E0AC6B] font-headline tracking-widest mt-6 mb-2 border-b border-white/5 pb-2 uppercase" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-lg sm:text-xl font-black text-[#E0AC6B] font-headline tracking-wider mt-5 mb-2 uppercase" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-base sm:text-lg font-bold text-[#E0AC6B] font-headline mt-4 mb-1.5 uppercase" {...props} />,
                    p: ({node, ...props}) => <p className="text-sm sm:text-base text-[#c6c6ce]/90 leading-relaxed my-2.5 font-medium" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-6 my-3 space-y-2 text-sm sm:text-base text-[#c6c6ce]/80 font-medium" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-3 space-y-2 text-sm sm:text-base text-[#c6c6ce]/80 font-medium" {...props} />,
                    li: ({node, ...props}) => <li className="marker:text-[#E0AC6B]" {...props} />,
                    strong: ({node, ...props}) => <strong className="text-[#E0AC6B] font-black" {...props} />,
                    hr: ({node, ...props}) => <hr className="border-white/10 my-6" {...props} />,
                  }}
                >
                  {result.narrative}
                </ReactMarkdown>
              </div>

              {/* WhatsApp Result & Share Buttons */}
              <div className="pt-4 space-y-3">
                {result.waLink && (
                  <a
                    id="wa-result-btn"
                    href={result.waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-[#121416] hover:text-white font-black text-xs sm:text-sm tracking-widest uppercase py-4 px-4 rounded-xl shadow-[0_0_20px_rgba(37,211,102,0.4)] flex items-center justify-center space-x-2 transition-all cursor-pointer border border-[#25D366]/40"
                  >
                    <MessageSquare className="w-5 h-5 text-[#121416] shrink-0" />
                    <span>💬 მიიღე შედეგი WhatsApp-ზე</span>
                  </a>
                )}
                
                <a
                  href={getWhatsAppResultLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white/5 hover:bg-white/10 text-white/90 font-bold text-[11px] tracking-widest uppercase py-3 px-4 rounded-xl border border-white/10 flex items-center justify-center space-x-2 transition-colors active:scale-98"
                >
                  <MessageSquare className="w-4 h-4 text-[#E0AC6B] shrink-0" />
                  <span>ანალიზის გაზიარება პარტნიორთან</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
