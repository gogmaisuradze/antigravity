"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";

export interface OrbitItem {
  id: string | number;
  name: string;
  shortName?: string;
  role: string;
  category: string;
  desc: string;
  requiresTime?: boolean;
}

export const defaultOrbitModels: OrbitItem[] = [
  {
    id: "horoscope",
    name: "დასავლური ჰოროსკოპი",
    shortName: "ჰოროსკოპი",
    role: "ზოდიაქოს ნიშანი & სტიქიები",
    category: "ასტროლოგია",
    desc: "მზის, მთვარისა და ასცენდენტის კოდი, ხასიათის ღერძი და კოსმოსური ტენდენციები.",
    requiresTime: true,
  },
  {
    id: "enneagram",
    name: "ენიაგრამა",
    shortName: "ენიაგრამა",
    role: "ფსიქოტიპი & ზრდის გზები",
    category: "ტიპოლოგია",
    desc: "თქვენი ენია-ტიპი, ფარული მოტივაციები, ქვეცნობიერი შიშები და ინტეგრაციის ვექტორები.",
    requiresTime: false,
  },
  {
    id: "psychomatrix",
    name: "ფსიქო მატრიცა",
    shortName: "ფსიქო მატრიცა",
    role: "პითაგორას ციფრული კოდი",
    category: "მატრიცა",
    desc: "ჯანმრთელობა, იღბალი, ნებისყოფა, ენერგია და თანდაყოლილი ნიჭის ციფრული ბალანსი.",
    requiresTime: false,
  },
  {
    id: "numerology",
    name: "ნუმეროლოგია",
    shortName: "ნუმეროლოგია",
    role: "ბედისწერის რიცხვი & მისია",
    category: "ნუმეროლოგია",
    desc: "დაბადების თარიღის ვიბრაცია, სულის უმაღლესი ამოცანები და პიროვნული ციკლები.",
    requiresTime: false,
  },
  {
    id: "human_design",
    name: "ადამიანის დიზაინი",
    shortName: "ადამიანის დიზაინი",
    role: "ენერგეტიკული ტიპი & ავტორიტეტი",
    category: "Human Design",
    desc: "ბოდიგრაფი, გადაწყვეტილების მიღების სტრატეგია და ენერგიის მოძრაობის ცენტრები.",
    requiresTime: true,
  },
  {
    id: "vedic",
    name: "ვედური ასტროლოგია",
    shortName: "ვედური ასტროლოგია",
    role: "ჯიოტიში & კარმული რუკა",
    category: "ჯიოტიში",
    desc: "მთვარის ნიშანი, ნაკშატრები, რაჰუ-კეთუს კვანძები და სულის კარმული ამოცანები.",
    requiresTime: true,
  },
  {
    id: "bazi",
    name: "ბა-ძი (BaZi)",
    shortName: "ბა-ძი",
    role: "ბედისწერის 4 სვეტი",
    category: "ჩინური მეტაფიზიკა",
    desc: "დღის მბრძანებელი, 5 სტიქიის ბალანსი (ხე, ცეცხლი, მიწა, ლითონი, წყალი) და იღბლის სვეტები.",
    requiresTime: true,
  },
  {
    id: "archetype",
    name: "არქეტიპული ანალიზი",
    shortName: "არქეტიპები",
    role: "იუნგის 12 არქეტიპი",
    category: "ფსიქოანალიზი",
    desc: "დომინანტური და ჩრდილოვანი არქეტიპები, მითოლოგიური როლები და ჰარმონიზაცია.",
    requiresTime: false,
  },
];

export const getOrbitIllustration = (id: string | number, isActive: boolean) => {
  const strokeColor = isActive ? "#E0AC6B" : "#1C3D63";
  const accentColor = isActive ? "#FFFFFF" : "#E0AC6B";

  switch (String(id).toLowerCase()) {
    case "horoscope":
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke={strokeColor} strokeWidth="1.2">
          {/* Cosmic orbital circles */}
          <circle cx="50" cy="50" r="40" strokeDasharray="3 3" opacity="0.45" />
          <circle cx="50" cy="50" r="28" strokeWidth="0.8" opacity="0.6" />
          {/* Mystic crescent moon and sun merging */}
          <path d="M50 25 A 25 25 0 0 1 75 50 A 25 25 0 0 0 50 25" fill={accentColor} fillOpacity="0.3" />
          <circle cx="50" cy="50" r="10" fill={strokeColor} fillOpacity="0.15" />
          {/* Diamond stars / constellation lines */}
          <path d="M50 15 L50 20 M50 80 L50 85 M15 50 L20 50 M80 50 L85 50" />
          <path d="M50 35 L48 44 L39 46 L48 48 L50 57 L52 48 L61 46 L52 44 Z" fill={accentColor} />
          {/* Floating tiny dots */}
          <circle cx="28" cy="28" r="1.5" fill={strokeColor} />
          <circle cx="72" cy="72" r="1" fill={strokeColor} />
          <circle cx="30" cy="68" r="1.2" fill={strokeColor} />
          <circle cx="70" cy="30" r="1.5" fill={strokeColor} />
        </svg>
      );

    case "enneagram":
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke={strokeColor} strokeWidth="1.2">
          {/* Outer sacred circle */}
          <circle cx="50" cy="50" r="42" opacity="0.55" />
          <circle cx="50" cy="50" r="45" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.35" />
          {/* Enneagram-inspired geometric nested triangles */}
          <path d="M50 8 L86 72 L14 72 Z" strokeWidth="1.4" />
          <path d="M50 92 L86 28 L14 28 Z" strokeWidth="0.8" opacity="0.45" />
          <circle cx="50" cy="50" r="14" strokeWidth="0.8" strokeDasharray="4 2" fill={strokeColor} fillOpacity="0.1" />
          {/* Point markers */}
          <circle cx="50" cy="8" r="2.5" fill={accentColor} />
          <circle cx="86" cy="72" r="2.5" fill={accentColor} />
          <circle cx="14" cy="72" r="2.5" fill={accentColor} />
          {/* Radiating geometry */}
          <line x1="50" y1="8" x2="50" y2="92" strokeWidth="0.6" opacity="0.35" />
          <line x1="14" y1="72" x2="86" y2="28" strokeWidth="0.6" opacity="0.35" />
          <line x1="86" y1="72" x2="14" y2="28" strokeWidth="0.6" opacity="0.35" />
        </svg>
      );

    case "psychomatrix":
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke={strokeColor} strokeWidth="1.2">
          {/* Pythagorean matrix grid frame */}
          <rect x="15" y="15" width="70" height="70" rx="10" strokeDasharray="4 4" opacity="0.35" />
          <path d="M15 38 H85 M15 62 H85 M38 15 V85 M62 15 V85" strokeWidth="0.8" opacity="0.5" />
          {/* Fibonacci Spiral */}
          <path d="M50 50 A 5 5 0 0 1 55 50 A 10 10 0 0 1 45 50 A 20 20 0 0 1 65 50 A 30 30 0 0 1 35 50 A 40 40 0 0 1 75 50" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
          {/* Sparkling dots on grid intersections */}
          <circle cx="38" cy="38" r="2" fill={strokeColor} />
          <circle cx="62" cy="62" r="2" fill={strokeColor} />
          <circle cx="38" cy="62" r="1.5" fill={strokeColor} opacity="0.7" />
          <circle cx="62" cy="38" r="1.5" fill={strokeColor} opacity="0.7" />
          <circle cx="50" cy="50" r="3.2" fill={accentColor} />
        </svg>
      );

    case "numerology":
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke={strokeColor} strokeWidth="1.2">
          {/* Overlapping circles (Vesica Piscis) */}
          <circle cx="40" cy="50" r="24" opacity="0.6" />
          <circle cx="60" cy="50" r="24" opacity="0.6" />
          <circle cx="50" cy="50" r="38" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.4" />
          {/* Mystical Infinity symbol */}
          <path d="M35 50 C 35 40, 47 40, 50 50 C 53 60, 65 60, 65 50 C 65 40, 53 40, 50 50 C 47 60, 35 60, 35 50 Z" strokeWidth="1.6" fill={strokeColor} fillOpacity="0.12" />
          {/* Cosmic rays */}
          <line x1="50" y1="12" x2="50" y2="25" strokeWidth="0.8" />
          <line x1="50" y1="75" x2="50" y2="88" strokeWidth="0.8" />
          <line x1="12" y1="50" x2="25" y2="50" strokeWidth="0.8" />
          <line x1="75" y1="50" x2="88" y2="50" strokeWidth="0.8" />
          <circle cx="50" cy="12" r="1.8" fill={accentColor} />
          <circle cx="50" cy="88" r="1.8" fill={accentColor} />
        </svg>
      );

    case "human_design":
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke={strokeColor} strokeWidth="1.2">
          {/* Crown energy center triangle */}
          <polygon points="50,12 60,25 40,25" strokeWidth="1.2" fill={strokeColor} fillOpacity="0.12" />
          {/* Ajna inverted triangle */}
          <polygon points="50,42 60,30 40,30" strokeWidth="0.8" />
          {/* Heart / Throat channel lines and circles */}
          <circle cx="50" cy="52" r="7" strokeWidth="1.2" fill={accentColor} fillOpacity="0.25" />
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

    case "vedic":
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke={strokeColor} strokeWidth="1.2">
          {/* Sacred lotus mandala */}
          <circle cx="50" cy="50" r="42" strokeDasharray="4 4" opacity="0.35" />
          <path d="M50 15 C45 30 30 45 15 50 C30 55 45 70 50 85 C55 70 70 55 85 50 C70 45 55 30 50 15 Z" strokeWidth="1.3" fill={strokeColor} fillOpacity="0.1" />
          <path d="M50 25 C47 35 35 47 25 50 C35 53 47 65 50 75 C53 65 65 53 75 50 C65 47 53 35 50 25 Z" strokeWidth="0.8" fill={accentColor} fillOpacity="0.3" />
          {/* Central sun orb */}
          <circle cx="50" cy="50" r="8" fill={strokeColor} />
          <circle cx="50" cy="50" r="12" strokeWidth="0.6" opacity="0.7" />
          <circle cx="25" cy="25" r="1.2" fill={accentColor} />
          <circle cx="75" cy="25" r="1.2" fill={accentColor} />
          <circle cx="25" cy="75" r="1.2" fill={accentColor} />
          <circle cx="75" cy="75" r="1.2" fill={accentColor} />
        </svg>
      );

    case "bazi":
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke={strokeColor} strokeWidth="1.2">
          {/* Yin Yang absolute balance sphere */}
          <circle cx="50" cy="50" r="42" opacity="0.4" />
          <path d="M50 8 A 21 21 0 0 0 50 50 A 21 21 0 0 1 50 92 A 42 42 0 0 0 50 8 Z" fill={strokeColor} fillOpacity="0.18" />
          <circle cx="50" cy="29" r="4" fill={strokeColor} />
          <circle cx="50" cy="71" r="4" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          {/* 5 elements surrounding curves */}
          <path d="M22 30 Q 35 20 50 30" strokeWidth="0.8" opacity="0.7" />
          <path d="M78 30 Q 65 20 50 30" strokeWidth="0.8" opacity="0.7" />
          <path d="M22 70 Q 35 80 50 70" strokeWidth="0.8" opacity="0.7" />
          <path d="M78 70 Q 65 80 50 70" strokeWidth="0.8" opacity="0.7" />
          <circle cx="50" cy="50" r="15" strokeWidth="0.5" strokeDasharray="3 2" opacity="0.5" />
        </svg>
      );

    case "archetype":
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke={strokeColor} strokeWidth="1.2">
          {/* Mystical Consciousness Eye */}
          <path d="M12 50 C 30 22, 70 22, 88 50 C 70 78, 30 78, 12 50 Z" strokeWidth="1.3" fill={strokeColor} fillOpacity="0.1" />
          <circle cx="50" cy="50" r="16" strokeWidth="1" />
          <circle cx="50" cy="50" r="7" fill={strokeColor} />
          <circle cx="47" cy="47" r="1.8" fill={accentColor} />
          {/* Ethereal rays */}
          <path d="M50 15 L50 24 M50 76 L50 85 M15 50 L24 50 M76 50 L85 50" strokeWidth="0.8" />
          <path d="M25 25 L32 32 M75 25 L68 32 M25 75 L32 68 M75 75 L68 68" strokeWidth="0.8" />
          <path d="M78 40 A 10 10 0 0 1 78 60 A 8 8 0 0 0 78 40" fill={strokeColor} opacity="0.6" />
          <path d="M22 40 A 10 10 0 0 0 22 60 A 8 8 0 0 1 22 40" fill={strokeColor} opacity="0.6" />
        </svg>
      );

    default:
      return <Sparkles className="w-6 h-6 text-[#E0AC6B]" />;
  }
};

export interface OrbitCarouselProps {
  items?: OrbitItem[];
  selectedIndex?: number;
  onSelect?: (item: OrbitItem, index: number) => void;
  onProceed?: (item: OrbitItem) => void;
  className?: string;
  autoPlay?: boolean;
}

const useResponsiveRadius = () => {
  const [screen, setScreen] = useState<"xs" | "sm" | "md" | "lg" | "xl">("xl");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => {
      const w = window.innerWidth;
      if (w < 500) setScreen("xs");
      else if (w < 700) setScreen("sm");
      else if (w < 1024) setScreen("md");
      else if (w < 1360) setScreen("lg");
      else setScreen("xl");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  switch (screen) {
    case "xs":
      return {
        containerRadius: 140,
        profileSize: 64,
        cardWidth: "w-[230px]",
        svgSize: "w-7 h-7",
        textSize: "text-[7.5px]",
        diameter: 360,
      };
    case "sm":
      return {
        containerRadius: 180,
        profileSize: 80,
        cardWidth: "w-[270px]",
        svgSize: "w-8 h-8",
        textSize: "text-[8.5px]",
        diameter: 460,
      };
    case "md":
      return {
        containerRadius: 240,
        profileSize: 100,
        cardWidth: "w-[320px]",
        svgSize: "w-10 h-10",
        textSize: "text-[9.5px]",
        diameter: 600,
      };
    case "lg":
      return {
        containerRadius: 295,
        profileSize: 118,
        cardWidth: "w-[350px]",
        svgSize: "w-12 h-12",
        textSize: "text-[11px]",
        diameter: 730,
      };
    default: // xl
      return {
        containerRadius: 335,
        profileSize: 128,
        cardWidth: "w-[370px]",
        svgSize: "w-14 h-14",
        textSize: "text-[11.5px]",
        diameter: 830,
      };
  }
};

export const OrbitCarousel: React.FC<OrbitCarouselProps> = ({
  items = defaultOrbitModels,
  selectedIndex,
  onSelect,
  onProceed,
  className = "",
  autoPlay = true,
}) => {
  const [activeIndex, setActiveIndex] = useState(selectedIndex ?? 0);
  const [isHovered, setIsHovered] = useState(false);
  const total = items.length;
  const { containerRadius, profileSize, cardWidth, svgSize, textSize, diameter } = useResponsiveRadius();

  useEffect(() => {
    if (selectedIndex !== undefined && selectedIndex >= 0 && selectedIndex < total) {
      setActiveIndex(selectedIndex);
    }
  }, [selectedIndex, total]);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const selectItem = useCallback(
    (idx: number) => {
      setActiveIndex(idx);
      if (onSelect) onSelect(items[idx], idx);
    },
    [items, onSelect]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName || "") ||
        (document.activeElement as HTMLElement)?.isContentEditable
      ) {
        return;
      }
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  useEffect(() => {
    if (!autoPlay || isHovered) return;
    const timer = setInterval(() => next(), 5000);
    return () => clearInterval(timer);
  }, [autoPlay, isHovered, next]);

  const currentItem = items[activeIndex] || items[0];

  const getAngle = useCallback(
    (index: number) => {
      return (index - activeIndex) * (360 / total);
    },
    [activeIndex, total]
  );

  return (
    <div
      className={`w-full flex flex-col items-center justify-center p-3 sm:p-6 lg:p-10 relative select-none rounded-3xl border border-[#D8C4B6] bg-[#FAF7F2] shadow-[0_15px_45px_rgba(28,61,99,0.06)] transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Decorative Rings & Ambient Aura */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-3xl">
        <div
          className="rounded-full border border-dashed border-[#E0AC6B]/40 animate-[spin_90s_linear_infinite]"
          style={{ width: containerRadius * 2, height: containerRadius * 2 }}
        />
        <div
          className="absolute rounded-full border border-[#1C3D63]/12"
          style={{ width: containerRadius * 2 + (profileSize * 0.75), height: containerRadius * 2 + (profileSize * 0.75) }}
        />
        <div
          className="absolute rounded-full border border-[#1C3D63]/8"
          style={{ width: containerRadius * 2 - (profileSize * 0.75), height: containerRadius * 2 - (profileSize * 0.75) }}
        />
        <div
          className="absolute rounded-full pointer-events-none opacity-40 bg-[radial-gradient(circle,rgba(224,172,107,0.22)_0%,transparent_70%)]"
          style={{ width: containerRadius * 2.2, height: containerRadius * 2.2 }}
        />
      </div>

      {/* Orbit & Center Container */}
      <div
        className="relative flex items-center justify-center my-3 sm:my-6"
        style={{ width: diameter, height: diameter, maxWidth: "100%" }}
      >
        {/* CENTER ACTIVE CARD */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -15 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className={`z-20 bg-white/95 backdrop-blur-md shadow-[0_20px_45px_rgba(28,61,99,0.12)] rounded-2xl p-4 sm:p-6 md:p-7 ${cardWidth} text-center border-2 border-[#1C3D63] flex flex-col items-center justify-between`}
          >
            {/* Top Category Badge without numbers */}
            <div className="flex items-center justify-between w-full mb-1">
              <span className="text-[10px] sm:text-xs font-headline font-bold text-[#E0AC6B] uppercase tracking-widest bg-[#1C3D63] px-3 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <Sparkles size={11} className="text-[#E0AC6B]" />
                <span>{currentItem.category}</span>
              </span>
              <span className="text-[10px] font-bold text-[#3B5E63] uppercase tracking-wider">
                IDC MODEL
              </span>
            </div>

            {/* Model Center Emblem */}
            <div className="w-12 h-12 my-1 text-[#1C3D63] flex items-center justify-center shrink-0">
              {getOrbitIllustration(currentItem.id, false)}
            </div>

            {/* Model Title & Details */}
            <div className="my-1.5 space-y-1">
              <h2 className="text-base sm:text-lg md:text-xl font-headline italic font-bold text-[#1C3D63] leading-snug">
                {currentItem.name}
              </h2>
              <p className="text-[11px] sm:text-xs text-[#E0AC6B] font-semibold uppercase tracking-wider">
                {currentItem.role}
              </p>
              <div className="h-0.5 w-12 bg-[#E0AC6B]/60 mx-auto my-1.5 rounded-full" />
              <p className="text-[11px] sm:text-xs text-[#222222]/85 leading-relaxed font-light line-clamp-3">
                {currentItem.desc}
              </p>
            </div>

            {/* Action & Direction Controls */}
            <div className="flex items-center justify-center gap-2 mt-3 w-full">
              <button
                onClick={prev}
                aria-label="Previous model"
                className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#E5ECEC] border border-[#D8C4B6] text-[#1C3D63] flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 shrink-0"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="shimmer-btn-wrapper shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    if (onProceed) {
                      onProceed(currentItem);
                    } else if (onSelect) {
                      onSelect(currentItem, activeIndex);
                    }
                  }}
                  className="btn-glowing-shimmer group py-2 sm:py-2.5 px-4 sm:px-5 text-xs sm:text-[13px] cursor-pointer whitespace-nowrap"
                >
                  <span className="shimmer-sweep"></span>
                  <span className="shimmer-btn-content font-headline tracking-wider flex items-center justify-center gap-1.5 whitespace-nowrap">
                    <span className="whitespace-nowrap font-bold">არჩევა & შევსება</span>
                    <ArrowRight size={13} className="text-[#E0AC6B] group-hover:translate-x-1 transition-transform shrink-0" />
                  </span>
                </button>
              </div>

              <button
                onClick={next}
                aria-label="Next model"
                className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#E5ECEC] border border-[#D8C4B6] text-[#1C3D63] flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 shrink-0"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ORBITING CIRCLES (ENLARGED WITH SACRED SYMBOLS & NAMES, NO NUMBERS) */}
        {items.map((item, index) => {
          const angle = getAngle(index);
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={item.id}
              animate={{
                transform: `rotate(${angle}deg) translateY(-${containerRadius}px)`,
              }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 20,
                delay: isActive ? 0 : Math.abs(index - activeIndex) * 0.03,
              }}
              style={{
                width: profileSize,
                height: profileSize,
                position: "absolute",
                top: `calc(50% - ${profileSize / 2}px)`,
                left: `calc(50% - ${profileSize / 2}px)`,
                zIndex: isActive ? 30 : 15,
              }}
            >
              <motion.div
                animate={{ rotate: -angle }}
                transition={{ type: "spring", stiffness: 160, damping: 20 }}
                className="w-full h-full"
              >
                <motion.div
                  onClick={() => selectItem(index)}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.94 }}
                  title={item.name}
                  className={`w-full h-full rounded-full cursor-pointer flex flex-col items-center justify-center p-2 sm:p-2.5 transition-all duration-300 shadow-md select-none ${
                    isActive
                      ? "bg-[#1C3D63] text-white border-2 border-[#E0AC6B] ring-4 ring-[#E0AC6B]/40 shadow-[0_0_25px_rgba(224,172,107,0.6)] scale-110"
                      : "bg-white text-[#1C3D63] border-2 border-[#D8C4B6] hover:border-[#1C3D63] hover:shadow-xl hover:bg-[#FBF9F5]"
                  }`}
                >
                  {/* Tarot Symbol SVG from cards */}
                  <div className={`transition-all duration-300 flex items-center justify-center shrink-0 ${svgSize} ${
                    isActive ? "text-[#E0AC6B]" : "text-[#1C3D63]"
                  }`}>
                    {getOrbitIllustration(item.id, isActive)}
                  </div>

                  {/* Model Georgian Name (No numerals!) */}
                  <span className={`font-headline font-bold text-center leading-tight tracking-tight mt-1 truncate max-w-[96%] transition-colors ${
                    isActive ? "text-white" : "text-[#1C3D63]"
                  } ${textSize}`}>
                    {item.shortName || item.name}
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* BOTTOM DOTS */}
      <div className="flex justify-center mt-3 sm:mt-5 space-x-1.5 sm:space-x-2 z-10">
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => selectItem(idx)}
            aria-label={`Go to ${item.name}`}
            className={`rounded-full transition-all cursor-pointer ${
              idx === activeIndex
                ? "w-6 h-2 bg-[#1C3D63] shadow-sm"
                : "w-2 h-2 bg-[#D8C4B6] hover:bg-[#8E8276]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default OrbitCarousel;
