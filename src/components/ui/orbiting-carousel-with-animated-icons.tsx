"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export interface OrbitItem {
  id: string | number;
  name: string;
  role: string;
  category: string;
  desc: string;
  numeral: string;
  iconSvg?: React.ReactNode;
  requiresTime?: boolean;
}

export const defaultOrbitModels: OrbitItem[] = [
  {
    id: "horoscope",
    name: "დასავლური ჰოროსკოპი",
    role: "ზოდიაქოს ნიშანი & სტიქიები",
    category: "ასტროლოგია",
    desc: "მზის, მთვარისა და ასცენდენტის კოდი, ხასიათის ღერძი და კოსმოსური ტენდენციები.",
    numeral: "I",
    requiresTime: true,
  },
  {
    id: "enneagram",
    name: "ენიაგრამა",
    role: "ფსიქოტიპი & ზრდის გზები",
    category: "ტიპოლოგია",
    desc: "თქვენი ენია-ტიპი, ფარული მოტივაციები, ქვეცნობიერი შიშები და ინტეგრაციის ვექტორები.",
    numeral: "II",
    requiresTime: false,
  },
  {
    id: "psychomatrix",
    name: "ფსიქო მატრიცა",
    role: "პითაგორას ციფრული კოდი",
    category: "მატრიცა",
    desc: "ჯანმრთელობა, იღბალი, ნებისყოფა, ენერგია და თანდაყოლილი ნიჭის ციფრული ბალანსი.",
    numeral: "III",
    requiresTime: false,
  },
  {
    id: "numerology",
    name: "ნუმეროლოგია",
    role: "ბედისწერის რიცხვი & მისია",
    category: "ნუმეროლოგია",
    desc: "დაბადების თარიღის ვიბრაცია, სულის უმაღლესი ამოცანები და პიროვნული ციკლები.",
    numeral: "IV",
    requiresTime: false,
  },
  {
    id: "human_design",
    name: "ადამიანის დიზაინი",
    role: "ენერგეტიკული ტიპი & ავტორიტეტი",
    category: "Human Design",
    desc: "ბოდიგრაფი, გადაწყვეტილების მიღების სტრატეგია და ენერგიის მოძრაობის ცენტრები.",
    numeral: "V",
    requiresTime: true,
  },
  {
    id: "vedic",
    name: "ვედური ასტროლოგია",
    role: "ჯიოტიში & კარმული რუკა",
    category: "ჯიოტიში",
    desc: "მთვარის ნიშანი, ნაკშატრები, რაჰუ-კეთუს კვანძები და სულის კარმული ამოცანები.",
    numeral: "VI",
    requiresTime: true,
  },
  {
    id: "bazi",
    name: "ბა-ძი (BaZi)",
    role: "ბედისწერის 4 სვეტი",
    category: "ჩინური მეტაფიზიკა",
    desc: "დღის მბრძანებელი, 5 სტიქიის ბალანსი (ხე, ცეცხლი, მიწა, ლითონი, წყალი) და იღბლის სვეტები.",
    numeral: "VII",
    requiresTime: true,
  },
  {
    id: "archetype",
    name: "არქეტიპული ანალიზი",
    role: "იუნგის 12 არქეტიპი",
    category: "ფსიქოანალიზი",
    desc: "დომინანტური და ჩრდილოვანი არქეტიპები, მითოლოგიური როლები და ჰარმონიზაცია.",
    numeral: "VIII",
    requiresTime: false,
  },
];

export interface OrbitCarouselProps {
  items?: OrbitItem[];
  selectedIndex?: number;
  onSelect?: (item: OrbitItem, index: number) => void;
  onProceed?: (item: OrbitItem) => void;
  className?: string;
  autoPlay?: boolean;
}

const useResponsiveRadius = () => {
  const [screen, setScreen] = useState<"xs" | "sm" | "md" | "lg">("lg");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => {
      const w = window.innerWidth;
      if (w < 480) setScreen("xs");
      else if (w < 640) setScreen("sm");
      else if (w < 768) setScreen("md");
      else setScreen("lg");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  switch (screen) {
    case "xs":
      return { containerRadius: 105, profileSize: 42, cardWidth: "w-[240px]", avatarSize: "w-11 h-11" };
    case "sm":
      return { containerRadius: 130, profileSize: 48, cardWidth: "w-[270px]", avatarSize: "w-13 h-13" };
    case "md":
      return { containerRadius: 160, profileSize: 56, cardWidth: "w-[300px]", avatarSize: "w-14 h-14" };
    default:
      return { containerRadius: 190, profileSize: 64, cardWidth: "w-[330px]", avatarSize: "w-16 h-16" };
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
  const { containerRadius, profileSize, cardWidth, avatarSize } = useResponsiveRadius();
  const diameter = containerRadius * 2 + 100;

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
      className={`flex flex-col items-center p-3 sm:p-6 relative select-none rounded-3xl border border-[#D8C4B6] bg-[#FAF7F2] shadow-sm transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Decorative Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-3xl">
        <div
          className="rounded-full border border-dashed border-[#E0AC6B]/40 animate-[spin_60s_linear_infinite]"
          style={{ width: containerRadius * 2, height: containerRadius * 2 }}
        />
        <div
          className="absolute rounded-full border border-[#1C3D63]/10"
          style={{ width: containerRadius * 2 + 50, height: containerRadius * 2 + 50 }}
        />
        <div
          className="absolute rounded-full border border-[#1C3D63]/5"
          style={{ width: containerRadius * 2 - 50, height: containerRadius * 2 - 50 }}
        />
      </div>

      {/* Orbit & Center Container */}
      <div
        className="relative flex items-center justify-center my-4 sm:my-6"
        style={{ width: diameter, height: diameter, maxWidth: "100%" }}
      >
        {/* CENTER ACTIVE CARD */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, scale: 0.88, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: -15 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className={`z-20 bg-white/95 backdrop-blur-md shadow-[0_15px_35px_rgba(28,61,99,0.1)] rounded-2xl p-4 sm:p-6 ${cardWidth} text-center border-2 border-[#1C3D63] flex flex-col items-center justify-between`}
          >
            {/* Top Numeral Pill */}
            <div className="flex items-center justify-between w-full mb-1">
              <span className="text-[10px] sm:text-xs font-headline font-bold text-[#E0AC6B] uppercase tracking-widest bg-[#1C3D63] px-2.5 py-0.5 rounded-full">
                მოდელი {currentItem.numeral}
              </span>
              <span className="text-[10px] font-semibold text-[#3B5E63] uppercase tracking-wider">
                {currentItem.category}
              </span>
            </div>

            {/* Model Title & Details */}
            <div className="my-2 space-y-1">
              <h2 className="text-base sm:text-lg md:text-xl font-headline italic font-bold text-[#1C3D63] leading-snug">
                {currentItem.name}
              </h2>
              <p className="text-[11px] sm:text-xs text-[#E0AC6B] font-semibold uppercase tracking-wider">
                {currentItem.role}
              </p>
              <div className="h-0.5 w-12 bg-[#E0AC6B]/60 mx-auto my-1.5 rounded-full" />
              <p className="text-[11px] sm:text-xs text-[#222222]/80 leading-relaxed font-light line-clamp-3">
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

              <button
                onClick={() => {
                  if (onProceed) {
                    onProceed(currentItem);
                  } else if (onSelect) {
                    onSelect(currentItem, activeIndex);
                  }
                }}
                className="flex-1 bg-[#1C3D63] hover:bg-[#254F7F] text-white px-3 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>არჩევა & შევსება</span>
                <ArrowRight size={13} className="text-[#E0AC6B]" />
              </button>

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

        {/* ORBITING CIRCLES */}
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
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.92 }}
                  title={`${item.name} (${item.numeral})`}
                  className={`w-full h-full rounded-full cursor-pointer flex flex-col items-center justify-center transition-all duration-300 shadow-md ${
                    isActive
                      ? "bg-[#1C3D63] text-white border-2 border-[#E0AC6B] ring-4 ring-[#E0AC6B]/30 shadow-[0_0_20px_rgba(224,172,107,0.5)] scale-110"
                      : "bg-white text-[#1C3D63] border border-[#D8C4B6] hover:border-[#1C3D63] hover:shadow-lg"
                  }`}
                >
                  <span className={`text-[10px] sm:text-xs font-black font-headline ${isActive ? "text-[#E0AC6B]" : "text-[#1C3D63]"}`}>
                    {item.numeral}
                  </span>
                  <span className={`text-[8px] font-bold tracking-tighter truncate max-w-[90%] px-0.5 ${isActive ? "text-white" : "text-[#8E8276]"}`}>
                    {item.category.slice(0, 5)}
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
