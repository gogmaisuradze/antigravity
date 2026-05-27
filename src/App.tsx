import { useState, useEffect } from "react";
import { BirthProfile, CalculationType, ReadingResponse } from "./types";
import { ProfileForm } from "./components/ProfileForm";
import { SpinWheel } from "./components/SpinWheel";
import { CompatibilityPanel } from "./components/CompatibilityPanel";
import { Sparkles, RefreshCw, MessageSquare, Edit3, UserCheck, Star, ShieldAlert, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function App() {
  const [userProfile, setUserProfile] = useState<BirthProfile | null>(null);
  const [selectedType, setSelectedType] = useState<CalculationType | null>(null);
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

  // Reassuring cosmic loading messages in Georgian
  const loadingMessages = [
    "ვარსკვლავური რუკა იხაზება...",
    "პლანეტების განლაგება ითვლება...",
    "პითაგორას სპეციალური ვიბრაციები ანგარიშდება...",
    "ენიაგრამის ფსიქოლოგიური კოდი იშიფრება...",
    "ჩინური 5 ელემენტის ბალანსი მუშავდება...",
    "ხელოვნური ინტელექტი აჯამებს მონაცემებს...",
  ];
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);

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
      const response = await fetch(`/api/profile/${encodeURIComponent(phone.trim().replace(/\s+/g, ""))}`);
      const data = await response.json();
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
      handleSelectReading(profile.phone, initialTheme);
    }
  };

  const handleSelectReading = async (phone: string, type: CalculationType) => {
    setSelectedType(type);
    setLoadingReading(true);
    setError(null);
    setReading(null);

    try {
      const response = await fetch("/api/generate-reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, type }),
      });
      const data = await response.json();
      if (data.success) {
        setReading(data);
      } else {
        setError(data.error || "ვერ მოხერხდა ანალიზის გენერირება.");
      }
    } catch (err) {
      setError("კავშირის შეცდომა. სცადეთ მოგვიანებით.");
    } finally {
      setLoadingReading(false);
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
      await fetch(`/api/profile/${encodeURIComponent(userProfile.phone)}`, {
        method: "DELETE",
      });
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
    const message = `ჩემი ${reading.title} მზად არის ხელოვნური ინტელექტის საფუძველზე! 🔮🌟\n\n${reading.title}-ს პირველივე ნაწილი:\n"${reading.content.substring(0, 150)}..."\n\nშეავსე შენი სახელი და დაბადების თარიღი ამ ლინკით და გავიგოთ ჩვენი თავსებადობა:\n👉 ${appUrl}?compareWith=${encodeURIComponent(userProfile.phone)}`;

    return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  };

  const getCustomWhatsAppShareURL = (phone: string) => {
    if (!reading || !userProfile) return "";
    const appUrl = window.location.origin;
    const cleanPhone = phone.trim().replace(/\s+/g, "");
    const message = `ჩემი ${reading.title} მზად არის ხელოვნური ინტელექტის საფუძველზე! 🔮🌟\n\n${reading.title}-ს სრული პასუხი:\n"${reading.content.substring(0, 400)}..."\n\nშეავსე შენი სახელი და დაბადების თარიღი ამ ლინკით და გავიგოთ ჩვენი თავსებადობა:\n👉 ${appUrl}?compareWith=${encodeURIComponent(cleanPhone)}`;

    return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  };

  const handleLinkPhoneAndShare = async () => {
    if (!userProfile) return;
    const cleanPhone = phoneNumberInput.trim().replace(/\s+/g, "");
    if (!cleanPhone) {
      setLinkError("გთხოვთ შეიყვანოთ ტელეფონის ნომერი");
      return;
    }

    setLinkingPhone(true);
    setLinkError(null);

    try {
      // 1. Save profile with new real phone
      const saveResponse = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userProfile.name,
          surname: userProfile.surname,
          birthPlace: userProfile.birthPlace || "საქართველო",
          day: userProfile.day,
          month: userProfile.month,
          year: userProfile.year,
          phone: cleanPhone
        }),
      });

      const saveData = await saveResponse.json();
      if (saveData.success) {
        // 2. Clear old temp profile from server
        if (userProfile.phone.startsWith("temp_")) {
          try {
            await fetch(`/api/profile/${encodeURIComponent(userProfile.phone)}`, {
              method: "DELETE",
            });
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
          <div className="w-full bg-[#1e2022]/60 p-7 rounded-2xl border border-white/5 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative backdrop-blur-md">
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
            {/* 1. Spinner (ბზრიალა) container */}
            <div className="bg-[#1e2022]/60 p-6 rounded-2xl border border-white/5 shadow-2xl overflow-hidden relative backdrop-blur-md">
              <SpinWheel
                onSelect={(type) => handleSelectReading(userProfile.phone, type)}
                selectedType={selectedType}
                disabled={loadingReading}
              />
            </div>

            {/* 2. Reading Display panel */}
            {(loadingReading || reading || error) && (
              <div className="w-full bg-[#1e2022]/60 p-8 rounded-2xl border border-white/5 shadow-2xl transition-all relative backdrop-blur-md">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#f1bf62] rounded-t-2xl"></div>
                
                {/* Back Button */}
                {!loadingReading && (
                  <button
                    onClick={() => {
                      setReading(null);
                      setSelectedType(null);
                      setError(null);
                    }}
                    className="inline-flex items-center space-x-2 text-[11px] tracking-widest text-[#c6c6ce] hover:text-[#f1bf62] font-bold uppercase transition-all mb-6 group cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                    <span>უკან დაბრუნება</span>
                  </button>
                )}
                
                {/* 2a. Cosmic Loading Mode */}
                {loadingReading && (
                  <div className="flex flex-col items-center justify-center py-16 space-y-6">
                    <div className="relative">
                      <RefreshCw className="w-10 h-10 text-[#f1bf62] animate-spin" />
                    </div>
                    <p className="text-[12px] uppercase font-bold text-[#f1bf62] tracking-[0.2em] text-center font-headline">
                      {loadingMessages[loadingMsgIdx]}
                    </p>
                    <p className="text-[11px] text-[#c6c6ce]/70 max-w-xs text-center leading-relaxed uppercase font-semibold">
                      ვარსკვლავები სკანირებენ თქვენს მონაცემებს... გთხოვთ გადმოგვცეთ რამდენიმე წამი
                    </p>
                  </div>
                )}

                {/* 2b. Error View */}
                {error && !loadingReading && (
                  <div className="flex items-start space-x-3 p-4 bg-red-950/20 border border-red-500/20 rounded-xl text-red-300 text-sm font-semibold">
                    <ShieldAlert className="w-4.5 h-4.5 text-red-400 shrink-0" />
                    <div className="space-y-1">
                      <p className="font-extrabold tracking-wider uppercase text-[11px] text-[#f1bf62] font-headline">შეცდომა ანალიზისას</p>
                      <p className="text-[#c6c6ce]/80">{error}</p>
                    </div>
                  </div>
                )}

                {/* 2c. Successful Reading Response */}
                {reading && !loadingReading && (
                  <div className="space-y-6 text-[#c6c6ce]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-5 gap-3">
                      <div>
                        <h2 className="text-xl tracking-wider text-[#f1bf62] uppercase font-bold font-headline">
                          {reading.title}
                        </h2>
                        <span className="text-[11px] text-[#c6c6ce]/70 font-bold tracking-widest uppercase">
                          ხელოვნური ინტელექტის უნივერსალური ანალიზი
                        </span>
                      </div>
                      
                      {/* Share specific horoscope report */}
                      <a
                        href={getWhatsAppShareURL()}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="inline-flex bg-[#f1bf62] hover:bg-[#f1bf62]/90 text-[#121416] text-[11px] font-bold tracking-widest uppercase py-3.5 px-6 rounded-xl shadow-[0_0_15px_rgba(241,191,98,0.3)] items-center space-x-2 transition-all cursor-pointer self-start sm:self-auto"
                      >
                        <MessageSquare className="w-4 h-4 text-[#121416] mr-1" />
                        <span>გაუზიარე WhatsApp-ით</span>
                      </a>
                    </div>
                    
                    {/* Render Markdown Response elegantly */}
                    <div className="text-[#c6c6ce] text-sm md:text-base leading-relaxed prose prose-invert max-w-none space-y-4 prose-p:my-2 prose-headings:text-[#f1bf62] prose-headings:font-headline prose-headings:tracking-normal prose-headings:uppercase prose-hr:border-white/10 overflow-hidden font-medium">
                      <ReactMarkdown>{reading.content}</ReactMarkdown>
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
                              <a
                                href={getCustomWhatsAppShareURL(phoneNumberInput)}
                                target="_blank"
                                referrerPolicy="no-referrer"
                                className="inline-flex bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold tracking-widest uppercase py-3 px-5 rounded-xl items-center space-x-1.5 transition-colors cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                              >
                                <MessageSquare className="w-3.5 h-3.5 text-white" />
                                <span>გახსენით WhatsApp და გააგზავნეთ</span>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 3. Relationship Compatibility Panel */}
            <CompatibilityPanel
              userProfile={userProfile}
              invitedPhone={invitedPhone}
            />
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
