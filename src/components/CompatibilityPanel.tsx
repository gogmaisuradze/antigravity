import React, { useState, useEffect } from "react";
import { BirthProfile, CompatibilityResponse } from "../types";
import { Heart, Send, CheckCircle2, AlertTriangle, MessageSquare, Sparkles, RefreshCw, ChevronRight, ArrowLeft } from "lucide-react";
// Note: Prefer standard text rendering or react-markdown if needed. Let's just render the response elegantly with styled blocks or simple split paragraphs since react-markdown config without className is requested or we can use custom elements.
// Wait! The framework guidelines say: "Prefer using react-markdown to render Markdown. The className prop has been removed from react-markdown." 
// Let's import ReactMarkdown from "react-markdown" cleanly!
import ReactMarkdown from "react-markdown";

interface CompatibilityPanelProps {
  userProfile: BirthProfile;
  invitedPhone?: string; // prefilled from query string
}

export const CompatibilityPanel: React.FC<CompatibilityPanelProps> = ({ userProfile, invitedPhone }) => {
  const [partnerPhone, setPartnerPhone] = useState("");
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
      const response = await fetch(`/api/profile/${encodeURIComponent(cleanPhone)}`);
      const data = await response.json();
      
      if (data.success) {
        if (data.exists) {
          setPartnerStatus("found");
          setPartnerProfile(data.profile);
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
    if (partnerStatus !== "found") return;
    setCalculating(true);
    setError(null);

    try {
      const response = await fetch("/api/compatibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneA: userProfile.phone,
          phoneB: partnerPhone.trim().replace(/\s+/g, ""),
        }),
      });

      const data = await response.json();
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || "გამოთვლა ვერ განხორციელდა");
      }
    } catch (err) {
      setError("კავშირის შეცდომა. სცადეთ მოგვიანებით.");
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
    <div id="compatibility-panel-container" className="w-full bg-[#1e2022]/60 border border-white/5 backdrop-blur-md p-8 rounded-2xl shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-[#f1bf62]"></div>

      <div className="flex items-center space-x-3 mb-8">
        <div className="w-11 h-11 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-[#f1bf62]">
          <Heart className="w-5 h-5 fill-red-500/10 text-red-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold tracking-[0.15em] text-[#f1bf62] uppercase font-headline">
            თავსებადობის მოდული
          </h2>
          <p className="text-[12px] tracking-wider text-[#c6c6ce]/70 font-semibold uppercase mt-1">
            გამოთვალეთ თქვენი და სასურველი ადამიანის ასტრო-ფსიქოლოგიური კავშირის რეზონანსი
          </p>
        </div>
      </div>

      {invitedPhone && partnerStatus === "found" && (
        <div className="mb-6 p-4 bg-emerald-950/20 border border-emerald-500/20 text-emerald-300 text-xs rounded-xl flex items-start space-x-3 font-semibold">
          <Sparkles className="w-4.5 h-4.5 shrink-0 text-emerald-400 animate-pulse" />
          <span className="leading-relaxed">
            თქვენ მოწვეული ხართ თავსებადობის შესამოწმებლად მომხმარებელთან: <strong className="text-white font-bold">{partnerProfile?.name} {partnerProfile?.surname}</strong>. შეგიძლიათ პირდაპირ დაიწყოთ სინქრონიზაციის პროცესი!
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
      <div className="space-y-6">
        <div>
          <label className="block text-[12px] uppercase tracking-widest text-[#c6c6ce]/80 mb-2 font-bold">
            პარტნიორის ან მეგობრის ტელეფონი (სისტემური იდენტიფიკატორი)
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
              className="flex-1 bg-transparent border-b border-white/10 py-3 text-base text-white placeholder-[#c6c6ce]/40 focus:outline-none focus:border-[#f1bf62] font-medium transition-colors"
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

        {/* Dynamic Status UI */}
        {partnerStatus === "not_found" && (
          <div className="p-6 bg-[#1e2022]/40 border border-white/5 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-start space-x-3 text-[#c6c6ce] text-xs font-semibold">
              <AlertTriangle className="w-4.5 h-4.5 shrink-0 text-[#f1bf62]" />
              <div className="space-y-1">
                <p className="font-extrabold tracking-wider uppercase text-[11px] text-[#f1bf62] font-headline">მომხმარებელი ვერ მოიძებნა</p>
                <p className="text-[#c6c6ce]/80 leading-relaxed">
                  თავსებადობის გამოსათვლელად საჭიროა მეორე ადამიანმაც შეიყვანოს თავისი საწყისი პარამეტრები. გაუგზავნეთ მას მოწვევის სიგნალი:
                </p>
              </div>
            </div>
            
            <a
              href={getWhatsAppInviteLink()}
              target="_blank"
              referrerPolicy="no-referrer"
              className="w-full bg-[#f1bf62] hover:bg-[#f1bf62]/90 text-[#121416] font-bold text-[11px] tracking-widest uppercase py-3.5 px-4 rounded-xl shadow-[0_0_15px_rgba(241,191,98,0.3)] flex items-center justify-center space-x-2 transition-all active:scale-98"
            >
              <MessageSquare className="w-4 h-4 text-[#121416] p-0.5" />
              <span>თავსებადობის მოწვევა WhatsApp-ზე</span>
            </a>
          </div>
        )}

        {partnerStatus === "found" && partnerProfile && (
          <div className="p-6 bg-emerald-950/20 border border-emerald-500/20 rounded-xl space-y-4 shadow-xs">
            <div className="flex items-center space-x-2 text-emerald-350 text-xs font-semibold">
              <CheckCircle2 className="w-4.5 h-4.5 shrink-0 text-emerald-400" />
              <span className="tracking-wide text-[12px]">
                სისტემამ მოძებნა: <strong className="text-white font-bold">{partnerProfile.name} {partnerProfile.surname}</strong> (მზადყოფნა აქტიურია)
              </span>
            </div>

            {!result && (
              <button
                onClick={handleCalculate}
                disabled={calculating}
                className="w-full bg-[#f1bf62] hover:bg-[#f1bf62]/90 text-[#121416] font-bold text-[11px] tracking-widest uppercase py-4 px-6 rounded-xl shadow-[0_0_15px_rgba(241,191,98,0.3)] transition-all active:scale-98 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                {calculating ? (
                  <>
                    <RefreshCw className="w-4.5 h-4.5 animate-spin text-[#121416]" />
                    <span>მიმდინარეობს კოსმიური სინქრონიზაცია AI-ით...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4.5 h-4.5 text-[#121416] animate-pulse" />
                    <span>თავსებადობის ანალიზის გააქტიურება</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* Results Visual Blocks */}
        {result && (
          <div className="mt-8 space-y-6">
            <button
              onClick={() => setResult(null)}
              className="inline-flex items-center space-x-2 text-[11px] tracking-widest text-[#c6c6ce] hover:text-[#f1bf62] font-bold uppercase transition-all mb-2 group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>უკან დაბრუნება (თავსებადობა)</span>
            </button>

            {/* Main Score Radial/Card */}
            <div className="p-8 bg-[#1e2022]/40 border border-white/5 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#f1bf62]/5 rounded-full blur-3xl"></div>
              
              <span className="text-[12px] uppercase tracking-[0.25em] text-[#c6c6ce]/70 font-bold mb-3">
                თავსებადობის კოეფიციენტი
              </span>

              {/* Big Score text */}
              <div className="text-7xl font-bold text-[#f1bf62] mb-2 font-headline tracking-tighter glow-text-gold">
                %{result.compatibilityScore}
              </div>

              {/* Match description word */}
              <span className="text-[11px] font-black tracking-widest text-[#f1bf62] px-4 py-2 border border-white/10 bg-[#1e2022]/90 uppercase rounded-xl shadow-2xl">
                {result.compatibilityScore >= 90 ? "იდეალური კავშირი 🌌" : 
                 result.compatibilityScore >= 75 ? "მაღალი ჰარმონია ✨" : 
                 result.compatibilityScore >= 50 ? "კარგი თავსებადობა ⚖️" : "კარმული გაკვეთილი 🌀"}
              </span>

              {/* Individual Dimensions Grid */}
              <div className="grid grid-cols-2 gap-4 w-full mt-8">
                {/* 1. Astrological */}
                <div className="p-4 bg-[#1e2022]/60 border border-white/5 rounded-xl flex flex-col items-center shadow-xl">
                  <span className="text-[10px] uppercase tracking-widest text-[#c6c6ce]/75 font-bold">ასტროლოგიური</span>
                  <span className="text-lg font-mono text-[#f1bf62] font-extrabold mt-1">%{result.dimensions.astrological}</span>
                  <div className="w-full bg-white/10 h-[4px] rounded-full mt-3.5 overflow-hidden">
                    <div className="bg-[#f1bf62] h-full rounded-full" style={{ width: `${result.dimensions.astrological}%` }}></div>
                  </div>
                </div>

                {/* 2. Psychological */}
                <div className="p-4 bg-[#1e2022]/60 border border-white/5 rounded-xl flex flex-col items-center shadow-xl">
                  <span className="text-[10px] uppercase tracking-widest text-[#c6c6ce]/75 font-bold">ფსიქოლოგიური</span>
                  <span className="text-lg font-mono text-[#f1bf62] font-extrabold mt-1">%{result.dimensions.psychological}</span>
                  <div className="w-full bg-white/10 h-[4px] rounded-full mt-3.5 overflow-hidden">
                    <div className="bg-[#f1bf62] h-full rounded-full" style={{ width: `${result.dimensions.psychological}%` }}></div>
                  </div>
                </div>

                {/* 3. Vibrational */}
                <div className="p-4 bg-[#1e2022]/60 border border-white/5 rounded-xl flex flex-col items-center shadow-xl">
                  <span className="text-[10px] uppercase tracking-widest text-[#c6c6ce]/75 font-bold">ნუმეროლოგიური</span>
                  <span className="text-lg font-mono text-[#f1bf62] font-extrabold mt-1">%{result.dimensions.vibrational}</span>
                  <div className="w-full bg-white/10 h-[4px] rounded-full mt-3.5 overflow-hidden">
                    <div className="bg-[#f1bf62] h-full rounded-full" style={{ width: `${result.dimensions.vibrational}%` }}></div>
                  </div>
                </div>

                {/* 4. Karmic */}
                <div className="p-4 bg-[#1e2022]/60 border border-white/5 rounded-xl flex flex-col items-center shadow-xl">
                  <span className="text-[10px] uppercase tracking-widest text-[#c6c6ce]/75 font-bold">კარმული რეზონანსი</span>
                  <span className="text-lg font-mono text-[#f1bf62] font-extrabold mt-1">%{result.dimensions.karmic}</span>
                  <div className="w-full bg-white/10 h-[4px] rounded-full mt-3.5 overflow-hidden">
                    <div className="bg-[#f1bf62] h-full rounded-full" style={{ width: `${result.dimensions.karmic}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative Explanation in Georgian */}
            <div className="p-6 bg-[#1e2022]/60 border border-white/5 rounded-2xl space-y-4 shadow-2xl text-[#c6c6ce]">
              <h4 className="text-sm font-black tracking-wider uppercase text-[#f1bf62] border-b border-white/10 pb-3 flex items-center font-headline">
                <Sparkles className="w-4.5 h-4.5 mr-2 text-[#f1bf62] shrink-0" />
                ამომწურავი კოსმიური და ფსიქოლოგიური ანალიზი:
              </h4>
              
              <div className="text-sm md:text-base text-[#c6c6ce] leading-relaxed space-y-4 prose prose-invert max-w-none overflow-hidden prose-p:my-2 font-medium">
                <ReactMarkdown>{result.narrative}</ReactMarkdown>
              </div>

              {/* Share Results Button */}
              <div className="pt-4">
                <a
                  href={getWhatsAppResultLink()}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-full bg-[#f1bf62] hover:bg-[#f1bf62]/90 text-[#121416] font-bold text-[11px] tracking-widest uppercase py-4 px-4 rounded-xl shadow-[0_0_15px_rgba(241,191,98,0.3)] flex items-center justify-center space-x-2 transition-colors active:scale-98"
                >
                  <MessageSquare className="w-4.5 h-4.5 text-[#121416] p-0.5 mr-1" />
                  <span>ანალიზის გაზიარება პარტნიორთან WhatsApp-ზე</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
