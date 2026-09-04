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
    <div id="compatibility-panel-container" className="w-full max-w-2xl mx-auto bg-white border border-[#D8C4B6] p-6 sm:p-8 rounded-2xl shadow-sm overflow-hidden relative text-left font-sans">
      <div className="flex flex-col items-center justify-center text-center space-y-2 mb-8">
        <div className="w-12 h-12 rounded-full border border-[#D8C4B6] bg-[#F4F7F7] flex items-center justify-center text-[#E0AC6B]">
          <Heart className="w-6 h-6 text-[#E0AC6B]" strokeWidth={1.8} />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-base sm:text-lg font-bold tracking-wide text-[#1C3D63] uppercase font-headline">
            ნახე სხვასთან თავსებადობა
          </h2>
          <p className="text-xs text-[#3B5E63] font-light mt-1 max-w-md mx-auto">
            გამოთვალეთ თქვენი და სასურველი ადამიანის ასტრო-ფსიქოლოგიური კავშირის რეზონანსი
          </p>
        </div>
      </div>

      {invitedPhone && partnerStatus === "found" && (
        <div className="mb-6 p-4 bg-[#3B5E63]/10 border border-[#3B5E63]/25 text-[#1C3D63] text-xs rounded-xl flex items-start space-x-3 font-medium">
          <Sparkles className="w-4.5 h-4.5 shrink-0 text-[#E0AC6B] animate-pulse" />
          <span className="leading-relaxed">
            თქვენ მოწვეული ხართ თავსებადობის შესამოწმებლად მომხმარებელთან: <strong className="text-[#1C3D63] font-bold">{partnerName} {partnerSurname}</strong>. მონაცემები შევსებულია, შეგიძლიათ დაიწყოთ სინქრონიზაცია!
          </span>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start space-x-2 font-medium">
          <AlertTriangle className="w-4.5 h-4.5 shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Inputs Section */}
      <div className="space-y-6 max-w-[480px] mx-auto w-full">
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[#1C3D63] mb-2 font-bold font-headline">
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
              placeholder="მაგ: 5XXXXXXXX"
              className="flex-1 bg-[#F4F7F7] border border-[#D8C4B6] rounded-xl py-2.5 px-3 text-sm text-[#222222] placeholder-[#8E8276] focus:outline-none focus:border-[#1C3D63] font-semibold"
            />
            <button
              onClick={() => checkPartnerStatus(partnerPhone)}
              disabled={checking || !partnerPhone.trim()}
              className="px-5 py-2.5 bg-[#1C3D63] hover:bg-[#254F7F] text-white text-[10px] font-bold tracking-widest uppercase rounded-xl flex items-center justify-center space-x-1.5 transition-colors cursor-pointer font-headline shadow-sm disabled:opacity-50"
            >
              {checking ? (
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
              ) : (
                <span>მოძიება</span>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#1C3D63] mb-1.5 font-bold font-headline">
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
              className="w-full bg-[#F4F7F7] border border-[#D8C4B6] rounded-xl py-2 px-3 text-sm text-[#222222] placeholder-[#8E8276] focus:outline-none focus:border-[#1C3D63] font-semibold"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#1C3D63] mb-1.5 font-bold font-headline">
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
              className="w-full bg-[#F4F7F7] border border-[#D8C4B6] rounded-xl py-2 px-3 text-sm text-[#222222] placeholder-[#8E8276] focus:outline-none focus:border-[#1C3D63] font-semibold"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[#1C3D63] mb-1.5 font-bold font-headline">
            დაბადების თარიღი:
          </label>
          <div className="relative bg-[#F4F7F7] rounded-xl py-2 px-4 border border-[#D8C4B6]">
            <input
              type="date"
              value={partnerBirthDate}
              onChange={(e) => {
                setPartnerBirthDate(e.target.value);
                setResult(null);
              }}
              className="w-full bg-transparent border-0 text-sm text-[#222222] focus:outline-none font-bold text-center tracking-widest cursor-pointer"
            />
          </div>
        </div>

        {/* Dynamic Status UI */}
        {partnerStatus === "found" && (
          <div className="p-3 bg-[#3B5E63]/10 border border-[#3B5E63]/25 rounded-xl space-y-1">
            <div className="flex items-center space-x-2 text-[#1C3D63] text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>
                მოძებნილია მომხმარებელი: <strong className="text-[#1C3D63] font-bold">{partnerName} {partnerSurname}</strong>
              </span>
            </div>
          </div>
        )}

        {partnerStatus === "not_found" && (
          <div className="p-3 bg-[#F4F7F7] border border-[#D8C4B6] rounded-xl space-y-2">
            <div className="flex items-start space-x-2 text-[#3B5E63] text-xs">
              <Sparkles className="w-4 h-4 shrink-0 text-[#E0AC6B]" />
              <span>
                ნომერი არ არის ბაზაში, თუმცა შეგიძლიათ ხელით შეიყვანოთ მონაცემები და სისტემა მაინც გამოთვლის თავსებადობას!
              </span>
            </div>
            <div>
              <a
                href={getWhatsAppInviteLink()}
                target="_blank"
                referrerPolicy="no-referrer"
                className="inline-flex bg-white hover:bg-[#FAF8F5] text-[#1C3D63] font-bold text-[10px] tracking-widest uppercase py-1.5 px-3 rounded-lg border border-[#D8C4B6] items-center space-x-1.5 transition-all shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#E0AC6B]" />
                <span>გაუგზავნე მოწვევა WhatsApp-ზე</span>
              </a>
            </div>
          </div>
        )}

        {!result && (
          <button
            onClick={handleCalculate}
            disabled={calculating}
            className="w-full bg-[#1C3D63] hover:bg-[#254F7F] text-white font-bold text-[10px] tracking-widest uppercase py-3.5 px-6 rounded-xl shadow-sm transition-all active:scale-98 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 font-headline"
          >
            {calculating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>მიმდინარეობს თავსებადობის გამოთვლა...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#E0AC6B]" />
                <span>თავსებადობის გამოთვლა</span>
              </>
            )}
          </button>
        )}

        {/* Results Visual Blocks */}
        {result && (
          <div className="mt-8 space-y-6">
            <button
              onClick={() => setResult(null)}
              className="inline-flex items-center space-x-2 text-[10px] tracking-widest text-[#8E8276] hover:text-[#1C3D63] font-bold uppercase transition-all mb-2 group cursor-pointer font-headline"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>უკან დაბრუნება (თავსებადობა)</span>
            </button>

            {/* Main Score Radial/Card */}
            <div className="p-6 sm:p-8 bg-[#F4F7F7] border border-[#D8C4B6] rounded-2xl flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8E8276] font-bold mb-2">
                თავსებადობის კოეფიციენტი
              </span>

              {/* Big Score text */}
              <div className="text-6xl sm:text-7xl font-bold text-[#1C3D63] mb-2 font-headline tracking-tighter">
                %{result.compatibilityScore}
              </div>

              {/* Match description word */}
              <span className="text-[11px] font-bold tracking-widest text-[#E0AC6B] px-4 py-1.5 border border-[#D8C4B6] bg-white uppercase rounded-xl shadow-xs font-headline">
                {result.compatibilityScore >= 90 ? "იდეალური კავშირი" : 
                 result.compatibilityScore >= 75 ? "მაღალი ჰარმონია" : 
                 result.compatibilityScore >= 50 ? "კარგი თავსებადობა" : "კარმული გაკვეთილი"}
              </span>

              {/* Individual Dimensions Grid */}
              <div className="grid grid-cols-2 gap-3.5 w-full mt-6">
                {/* 1. Astrological */}
                <div className="p-3.5 bg-white border border-[#D8C4B6] rounded-xl flex flex-col items-center shadow-xs">
                  <span className="text-[10px] uppercase tracking-widest text-[#8E8276] font-bold">ასტროლოგიური</span>
                  <span className="text-base font-mono text-[#1C3D63] font-bold mt-1">%{result.dimensions.astrological}</span>
                  <div className="w-full bg-[#F4F7F7] h-[4px] rounded-full mt-2.5 overflow-hidden border border-[#D8C4B6]/40">
                    <div className="bg-[#1C3D63] h-full rounded-full" style={{ width: `${result.dimensions.astrological}%` }}></div>
                  </div>
                </div>

                {/* 2. Psychological */}
                <div className="p-3.5 bg-white border border-[#D8C4B6] rounded-xl flex flex-col items-center shadow-xs">
                  <span className="text-[10px] uppercase tracking-widest text-[#8E8276] font-bold">ფსიქოლოგიური</span>
                  <span className="text-base font-mono text-[#3B5E63] font-bold mt-1">%{result.dimensions.psychological}</span>
                  <div className="w-full bg-[#F4F7F7] h-[4px] rounded-full mt-2.5 overflow-hidden border border-[#D8C4B6]/40">
                    <div className="bg-[#3B5E63] h-full rounded-full" style={{ width: `${result.dimensions.psychological}%` }}></div>
                  </div>
                </div>

                {/* 3. Vibrational */}
                <div className="p-3.5 bg-white border border-[#D8C4B6] rounded-xl flex flex-col items-center shadow-xs">
                  <span className="text-[10px] uppercase tracking-widest text-[#8E8276] font-bold">ნუმეროლოგიური</span>
                  <span className="text-base font-mono text-[#A37B73] font-bold mt-1">%{result.dimensions.vibrational}</span>
                  <div className="w-full bg-[#F4F7F7] h-[4px] rounded-full mt-2.5 overflow-hidden border border-[#D8C4B6]/40">
                    <div className="bg-[#A37B73] h-full rounded-full" style={{ width: `${result.dimensions.vibrational}%` }}></div>
                  </div>
                </div>

                {/* 4. Karmic */}
                <div className="p-3.5 bg-white border border-[#D8C4B6] rounded-xl flex flex-col items-center shadow-xs">
                  <span className="text-[10px] uppercase tracking-widest text-[#8E8276] font-bold">კარმული რეზონანსი</span>
                  <span className="text-base font-mono text-[#E0AC6B] font-bold mt-1">%{result.dimensions.karmic}</span>
                  <div className="w-full bg-[#F4F7F7] h-[4px] rounded-full mt-2.5 overflow-hidden border border-[#D8C4B6]/40">
                    <div className="bg-[#E0AC6B] h-full rounded-full" style={{ width: `${result.dimensions.karmic}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative Explanation in Georgian */}
            <div className="p-6 bg-white border border-[#D8C4B6] rounded-2xl space-y-4 shadow-sm text-[#222222]">
              <h4 className="text-sm font-bold tracking-wider uppercase text-[#1C3D63] border-b border-[#D8C4B6]/60 pb-3 flex items-center font-headline">
                <Sparkles className="w-4.5 h-4.5 mr-2 text-[#E0AC6B] shrink-0" />
                თავსებადობის სიღრმისეული ანალიზი:
              </h4>
              
              <div className="text-sm md:text-base text-[#222222] leading-relaxed max-w-none overflow-hidden font-normal">
                <ReactMarkdown
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-lg sm:text-xl font-bold text-[#1C3D63] font-headline tracking-wide mt-4 mb-2 uppercase" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-base sm:text-lg font-bold text-[#1C3D63] font-headline tracking-wide mt-4 mb-2 uppercase" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-sm sm:text-base font-bold text-[#1C3D63] font-headline mt-3 mb-1.5 uppercase" {...props} />,
                    p: ({node, ...props}) => <p className="text-sm sm:text-base text-[#222222] leading-relaxed my-2" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-6 my-2.5 space-y-1.5 text-sm sm:text-base text-[#3B5E63]" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-2.5 space-y-1.5 text-sm sm:text-base text-[#3B5E63]" {...props} />,
                    li: ({node, ...props}) => <li className="marker:text-[#E0AC6B]" {...props} />,
                    strong: ({node, ...props}) => <strong className="text-[#1C3D63] font-bold" {...props} />,
                    hr: ({node, ...props}) => <hr className="border-[#D8C4B6] my-4" {...props} />,
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
                    className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm tracking-widest uppercase py-3.5 px-4 rounded-xl shadow-sm flex items-center justify-center space-x-2 transition-all cursor-pointer font-headline"
                  >
                    <MessageSquare className="w-4.5 h-4.5 text-white shrink-0" />
                    <span>💬 მიიღე შედეგი WhatsApp-ზე</span>
                  </a>
                )}
                
                <a
                  href={getWhatsAppResultLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#F4F7F7] hover:bg-[#E5ECEC] text-[#1C3D63] font-bold text-[10px] tracking-widest uppercase py-3 px-4 rounded-xl border border-[#D8C4B6] flex items-center justify-center space-x-2 transition-colors font-headline shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#E0AC6B] shrink-0" />
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
