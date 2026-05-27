import React, { useState, useRef, useEffect } from "react";
import { CalculationType } from "../types";
import { Sparkles, Target, Grid3x3, Hash, BrainCircuit, Moon, Compass, Users, Pointer } from "lucide-react";
import { RollerPicker } from "./RollerPicker";

export interface WheelItem {
  id: CalculationType;
  title: string;
  color: string;
  gradient: string;
  icon: React.ReactNode;
  description: string;
}

interface SpinWheelProps {
  onSelect: (type: CalculationType) => void;
  selectedType: CalculationType | null;
  disabled?: boolean;
}

export const WHEEL_ITEMS: WheelItem[] = [
  {
    id: CalculationType.HOROSCOPE,
    title: "დასავლური ჰოროსკოპი",
    color: "from-indigo-600 to-indigo-900 border-indigo-500",
    gradient: "conic-gradient(from 0deg, #4f46e5, #312e81)",
    icon: <Sparkles className="w-5 h-5 text-indigo-200" />,
    description: "ზოდიაქოს ნიშანი, ხასიათი, სტიქიები და კოსმოსური ტრენდები.",
  },
  {
    id: CalculationType.ENNEAGRAM,
    title: "ენიაგრამა",
    color: "from-purple-600 to-purple-900 border-purple-500",
    gradient: "conic-gradient(from 45deg, #9333ea, #581c87)",
    icon: <Target className="w-5 h-5 text-purple-200" />,
    description: "თქვენი ფსიქოტიპი, ფარული მოტივაციები, შიშები და ზრდის გზები.",
  },
  {
    id: CalculationType.PSYCHOMATRIX,
    title: "ფსიქო მატრიცა",
    color: "from-pink-600 to-pink-900 border-pink-500",
    gradient: "conic-gradient(from 90deg, #ec4899, #831843)",
    icon: <Grid3x3 className="w-5 h-5 text-pink-200" />,
    description: "პითაგორას ციფრული მატრიცა: ჯანმრთელობა, იღბალი, ენერგია და ნიჭი.",
  },
  {
    id: CalculationType.NUMEROLOGY,
    title: "ნუმეროლოგია",
    color: "from-amber-600 to-amber-900 border-amber-500",
    gradient: "conic-gradient(from 135deg, #d97706, #78350f)",
    icon: <Hash className="w-5 h-5 text-amber-200" />,
    description: "ბედისწერის რიცხვი, თქვენი უმაღლესი მისია და ცხოვრებისეული გზა.",
  },
  {
    id: CalculationType.HUMAN_DESIGN,
    title: "ადამიანის დიზაინი",
    color: "from-teal-600 to-teal-900 border-teal-500",
    gradient: "conic-gradient(from 180deg, #0d9488, #115e59)",
    icon: <BrainCircuit className="w-5 h-5 text-teal-200" />,
    description: "ენერგეტიკული ტიპი, პროფილი, ავტორიტეტი და ცხოვრებისეული სტრატეგია.",
  },
  {
    id: CalculationType.VEDIC,
    title: "ვედური ასტროლოგია",
    color: "from-red-600 to-red-900 border-red-500",
    gradient: "conic-gradient(from 225deg, #dc2626, #7f1d1d)",
    icon: <Moon className="w-5 h-5 text-red-200" />,
    description: "ჯიოტიში: მთვარის ნიშანი, ნაკშატრები და კარმული ვალდებულებები.",
  },
  {
    id: CalculationType.BAZI,
    title: "ბა-ძი (BaZi)",
    color: "from-orange-600 to-orange-900 border-orange-500",
    gradient: "conic-gradient(from 270deg, #ea580c, #7c2d12)",
    icon: <Compass className="w-5 h-5 text-orange-200" />,
    description: "ბედისწერის 4 სვეტი: დღის მბრძანებელი და 5 ელემენტის ბალანსი.",
  },
  {
    id: CalculationType.ARCHETYPE,
    title: "არქეტიპული ანალიზი",
    color: "from-cyan-600 to-cyan-900 border-cyan-500",
    gradient: "conic-gradient(from 315deg, #0891b2, #164e63)",
    icon: <Users className="w-5 h-5 text-cyan-200" />,
    description: "იუნგის 12 ფსიქოლოგიური არქეტიპი და ჩრდილოვანი მხარეები.",
  },
];

export const SpinWheel: React.FC<SpinWheelProps> = ({ onSelect, selectedType, disabled }) => {
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const spinTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (spinTimeoutRef.current) {
        clearTimeout(spinTimeoutRef.current);
      }
    };
  }, []);

  // Rotate the wheel when selectedType changes from outside (e.g. ProfileForm or RollerPicker)
  useEffect(() => {
    if (selectedType && !isSpinning) {
      const index = WHEEL_ITEMS.findIndex((item) => item.id === selectedType);
      if (index >= 0) {
        const sliceAngle = 360 / WHEEL_ITEMS.length;
        const targetDeg = (360 - index * sliceAngle) - (sliceAngle / 2);
        
        // Find closest rotation angle to prevent unnecessary extra spins
        setRotation((prev) => {
          const currentModulo = prev % 360;
          const diff = targetDeg - currentModulo;
          // Normalize diff to -180 to 180 degrees for shortest path rotation
          const shortestDiff = ((diff + 180) % 360 + 360) % 360 - 180;
          return prev + shortestDiff;
        });
      }
    }
  }, [selectedType, isSpinning]);

  const spin = () => {
    if (isSpinning) {
      // STOP THE SPIN immediately (Clicking start again while spinning)
      if (spinTimeoutRef.current) {
        clearTimeout(spinTimeoutRef.current);
        spinTimeoutRef.current = null;
      }
      setIsSpinning(false);

      // Find which slice is currently aligned with the top pointer (12 o'clock)
      const normalizedRotation = (360 - (rotation % 360)) % 360;
      const sliceAngle = 360 / WHEEL_ITEMS.length;
      let itemIndex = Math.floor(normalizedRotation / sliceAngle);
      if (itemIndex < 0) itemIndex = 0;
      if (itemIndex >= WHEEL_ITEMS.length) itemIndex = WHEEL_ITEMS.length - 1;

      onSelect(WHEEL_ITEMS[itemIndex].id);

      // Align it nicely to the top pointer position
      const targetDeg = (360 - itemIndex * sliceAngle) - (sliceAngle / 2);
      setRotation((prev) => Math.floor(prev / 360) * 360 + targetDeg);
      return;
    }

    if (disabled) return;
    setIsSpinning(true);

    const numSlices = WHEEL_ITEMS.length;
    const itemIndex = Math.floor(Math.random() * numSlices);
    
    const extraRounds = 360 * 6; // 6 full rotations
    const sliceAngle = 360 / numSlices;
    const targetDeg = extraRounds + (360 - itemIndex * sliceAngle) - (sliceAngle / 2);
    
    const newRotation = rotation + targetDeg;
    setRotation(newRotation);

    spinTimeoutRef.current = setTimeout(() => {
      setIsSpinning(false);
      onSelect(WHEEL_ITEMS[itemIndex].id);
      spinTimeoutRef.current = null;
    }, 5000);
  };

  const handleSliceClick = (index: number) => {
    if (disabled) return;
    
    // Stop any active spin immediately when selecting manually
    if (spinTimeoutRef.current) {
      clearTimeout(spinTimeoutRef.current);
      spinTimeoutRef.current = null;
    }
    setIsSpinning(false);
    onSelect(WHEEL_ITEMS[index].id);
    
    // Rotate to point smoothly to the clicked slice at the top
    const sliceAngle = 360 / WHEEL_ITEMS.length;
    const targetDeg = (360 - index * sliceAngle) - (sliceAngle / 2);
    setRotation((prev) => Math.floor(prev / 360) * 360 + targetDeg);
  };

  // Helper to generate coordinates for SVG path
  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 select-none relative bg-transparent">
      {/* Subtle background shadow blur highlight */}
      <div className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full bg-[#f1bf62]/8 blur-3xl -z-10 pointer-events-none"></div>

      {/* Elegant Pointer at the 12 o'clock position (Top) - Gold rim with head pointer */}
      <div className="relative z-30 -mb-7 flex flex-col items-center pointer-events-none">
        {/* Circular Pointer head with gold-bronze metallic ring */}
        <div className="w-13 h-13 bg-gradient-to-b from-[#403524] via-[#1e2022] to-[#0a0b0c] rounded-full border-2 border-[#f1bf62] flex items-center justify-center shadow-[0_6px_16px_rgba(0,0,0,0.9)] relative z-30">
          {/* Inner concentric ring inside pointer */}
          <div className="absolute inset-0.5 rounded-full border border-black/40"></div>
          <div className="absolute inset-1.5 rounded-full border border-[#f1bf62]/20"></div>
          <BrainCircuit className="w-5 h-5 text-[#f1bf62] relative z-10" style={{ filter: "drop-shadow(0 0 4px rgba(241,191,98,0.6))" }} />
        </div>
        {/* Golden Triangle Point Pointer pointing down */}
        <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[16px] border-t-[#f1bf62] -mt-2.5 z-20 drop-shadow-[0_3px_5px_rgba(0,0,0,0.7)]" />
      </div>

      {/* Outer Luxury Wheel Rim (Heavy concentric golden/bronze gold plated metal) */}
      <div className="relative w-[320px] h-[320px] md:w-[410px] md:h-[410px] p-4 bg-gradient-to-b from-[#2a2318] via-[#151718] to-[#090a0a] rounded-full shadow-[0_15px_45px_rgba(0,0,0,0.9),inset_0_2px_4px_rgba(255,255,255,0.05)] flex items-center justify-center border border-white/5">
        {/* Golden Concentric Rings Overlay */}
        <div className="absolute inset-0 rounded-full border-4 border-[#f1bf62]/35 pointer-events-none"></div>
        <div className="absolute inset-1 rounded-full border border-black/80 pointer-events-none"></div>
        <div className="absolute inset-2.5 rounded-full border-2 border-double border-[#f1bf62]/20 pointer-events-none"></div>
        <div className="absolute inset-[13px] rounded-full border border-black/50 pointer-events-none"></div>

        {/* The Rotatable Wheel Segment */}
        <div
          id="roulette_wheel"
          className="relative w-full h-full rounded-full overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.9)] cursor-pointer border border-[#f1bf62]/10"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? "transform 5000ms cubic-bezier(0.1, 0.9, 0.2, 1)" : "transform 800ms cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        >
          {/* Slices container using SVGs for visual precision and custom definitions */}
          <svg viewBox="-1 -1 2 2" className="w-full h-full -rotate-90">
            <defs>
              {/* Premium dark bronze metallic linear gradient 1 */}
              <linearGradient id="metallicSliceA" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#282520" />
                <stop offset="30%" stopColor="#1c1a16" />
                <stop offset="60%" stopColor="#12110e" />
                <stop offset="100%" stopColor="#0c0b0a" />
              </linearGradient>
              {/* Premium dark bronze metallic linear gradient 2 */}
              <linearGradient id="metallicSliceB" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#201d19" />
                <stop offset="35%" stopColor="#151310" />
                <stop offset="70%" stopColor="#0e0d0b" />
                <stop offset="100%" stopColor="#050504" />
              </linearGradient>
              {/* Radiant gold metallic gradient for slice divider lines */}
              <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffd885" />
                <stop offset="35%" stopColor="#f1bf62" />
                <stop offset="70%" stopColor="#b58728" />
                <stop offset="100%" stopColor="#ffd885" />
              </linearGradient>
              {/* Elegant golden radial glow for selection & hover highlights */}
              <radialGradient id="selectedGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffd885" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#f1bf62" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#b8860b" stopOpacity="0" />
              </radialGradient>
            </defs>

            {WHEEL_ITEMS.map((item, index) => {
              const startPercent = index / WHEEL_ITEMS.length;
              const endPercent = (index + 1) / WHEEL_ITEMS.length;
              const [startX, startY] = getCoordinatesForPercent(startPercent);
              const [endX, endY] = getCoordinatesForPercent(endPercent);
              const largeArcFlag = endPercent - startPercent > 0.5 ? 1 : 0;
              const pathData = [
                `M 0 0`,
                `L ${startX} ${startY}`,
                `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                `Z`,
              ].join(" ");

              const isSelected = selectedType === item.id;
              const isHovered = hoveredIndex === index;
              const sliceFill = index % 2 === 0 ? "url(#metallicSliceA)" : "url(#metallicSliceB)";

              return (
                <g key={item.id}>
                  {/* Base Metallic Slice */}
                  <path
                    d={pathData}
                    fill={sliceFill}
                    stroke="url(#goldStroke)"
                    strokeWidth="0.008"
                    className="transition-all duration-300 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSliceClick(index);
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      opacity: hoveredIndex !== null ? (isHovered ? 1 : 0.85) : 1,
                    }}
                  />
                  {/* Radiant Glow Overlay when selected or hovered */}
                  {(isSelected || isHovered) && (
                    <path
                      d={pathData}
                      fill="url(#selectedGlow)"
                      className="pointer-events-none mix-blend-screen transition-opacity duration-300"
                    />
                  )}
                </g>
              );
            })}

            {/* Concentric Grooves to mimic brushed dark bronze metal dial dial */}
            <circle cx="0" cy="0" r="0.95" fill="none" stroke="rgba(0, 0, 0, 0.45)" strokeWidth="0.003" pointerEvents="none" />
            <circle cx="0" cy="0" r="0.90" fill="none" stroke="rgba(241, 191, 98, 0.04)" strokeWidth="0.002" pointerEvents="none" />
            <circle cx="0" cy="0" r="0.85" fill="none" stroke="rgba(0, 0, 0, 0.4)" strokeWidth="0.003" pointerEvents="none" />
            <circle cx="0" cy="0" r="0.80" fill="none" stroke="rgba(241, 191, 98, 0.03)" strokeWidth="0.002" pointerEvents="none" />
            <circle cx="0" cy="0" r="0.75" fill="none" stroke="rgba(0, 0, 0, 0.45)" strokeWidth="0.003" pointerEvents="none" />
            <circle cx="0" cy="0" r="0.70" fill="none" stroke="rgba(241, 191, 98, 0.04)" strokeWidth="0.002" pointerEvents="none" />
            <circle cx="0" cy="0" r="0.65" fill="none" stroke="rgba(0, 0, 0, 0.4)" strokeWidth="0.003" pointerEvents="none" />
            <circle cx="0" cy="0" r="0.60" fill="none" stroke="rgba(241, 191, 98, 0.03)" strokeWidth="0.002" pointerEvents="none" />
            <circle cx="0" cy="0" r="0.55" fill="none" stroke="rgba(0, 0, 0, 0.45)" strokeWidth="0.003" pointerEvents="none" />
            <circle cx="0" cy="0" r="0.50" fill="none" stroke="rgba(241, 191, 98, 0.04)" strokeWidth="0.002" pointerEvents="none" />
            <circle cx="0" cy="0" r="0.45" fill="none" stroke="rgba(0, 0, 0, 0.4)" strokeWidth="0.003" pointerEvents="none" />
            <circle cx="0" cy="0" r="0.40" fill="none" stroke="rgba(241, 191, 98, 0.02)" strokeWidth="0.002" pointerEvents="none" />
            <circle cx="0" cy="0" r="0.35" fill="none" stroke="rgba(0, 0, 0, 0.45)" strokeWidth="0.003" pointerEvents="none" />
          </svg>

          {/* Slices Text & Icons positioned absolutely over SVG */}
          {WHEEL_ITEMS.map((item, index) => {
            const angle = (360 / WHEEL_ITEMS.length) * index + (180 / WHEEL_ITEMS.length); // mathematically centered text (22.5 offset for 8 segments)
            const isSelected = selectedType === item.id;
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={item.id}
                className="absolute inset-0 flex flex-col items-center pt-8 md:pt-11 pointer-events-none"
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: "50% 50%",
                }}
              >
                {/* Circular framed icon with sleek circular borders, gold gradients and subtle inner shadows */}
                <div 
                  className={`flex flex-col items-center justify-center w-8.5 h-8.5 rounded-full border transition-all duration-350 pointer-events-auto cursor-pointer shadow-md ${
                    (isSelected || isHovered) 
                      ? "scale-125 border-[#f1bf62] bg-gradient-to-b from-[#f1bf62] to-[#c79a3c] text-[#121416] shadow-[0_0_12px_rgba(241,191,98,0.4),inset_0_1px_2px_rgba(255,255,255,0.3)]" 
                      : "border-[#f1bf62]/45 bg-gradient-to-b from-[#2a251e] to-[#12110e] text-[#c6c6ce] hover:border-[#f1bf62] hover:text-white shadow-[inset_0_1px_3px_rgba(255,255,255,0.05),0_2px_6px_rgba(0,0,0,0.6)]"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSliceClick(index);
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* render icon with elegant colors */}
                  {React.cloneElement(item.icon as React.ReactElement<any>, {
                    className: (isSelected || isHovered) ? "w-4 h-4 text-[#121416]" : "w-4 h-4 text-[#c6c6ce]"
                  })}
                </div>
                
                {/* Short labels for georgian wheel - whiter, bolder and larger */}
                <span 
                  className={`text-[11.5px] md:text-[13px] uppercase tracking-[0.14em] text-center mt-3 max-w-[55px] md:max-w-[80px] leading-tight transition-all duration-350 pointer-events-auto cursor-pointer ${
                    (isSelected || isHovered) ? "text-[#f1bf62] font-black scale-108" : "text-white font-black hover:text-[#f1bf62]"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSliceClick(index);
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    textShadow: "0 2px 4px rgba(0,0,0,1), 0 1px 2px rgba(0,0,0,0.9)",
                  }}
                >
                  {item.title.split(" ")[0]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Central Core Spin Button (Concentric metallic dome structure) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            spin();
          }}
          disabled={disabled}
          className={`absolute w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-b from-[#2d2a22] via-[#151718] to-[#080909] flex flex-col items-center justify-center z-10 transition-all duration-500 cursor-pointer border border-[#f1bf62]/70 shadow-[0_10px_30px_rgba(0,0,0,0.95),inset_0_1px_3px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95`}
        >
          {/* Inner Golden concentric rings */}
          <div className="absolute inset-1 rounded-full border border-black/80 pointer-events-none"></div>
          <div className="absolute inset-2 rounded-full border border-[#f1bf62]/35 pointer-events-none"></div>
          <div className="absolute inset-3 rounded-full border border-black/60 pointer-events-none animate-[spin_60s_linear_infinite]"></div>
          
          {/* Inner Dome Content */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            {isSpinning ? (
              <>
                <span className="text-[13px] md:text-[15px] font-black tracking-widest uppercase text-red-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] animate-pulse">
                  სტოპი
                </span>
                <span className="text-[7.5px] tracking-widest uppercase mt-0.5 font-extrabold text-white/50">
                  გაჩერება
                </span>
              </>
            ) : (
              <>
                <span className="text-[15px] md:text-[17px] font-black tracking-[0.14em] uppercase text-white font-headline drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  სტარტი
                </span>
                <span className="text-[8px] tracking-widest uppercase mt-1 font-extrabold text-[#f1bf62]/90">
                  ტრიალი
                </span>
              </>
            )}
          </div>
        </button>
      </div>

      {/* Selected Theme Name and Description in clean, flat gold/silver text */}
      <div className="mt-7 text-center px-6 max-w-[380px] space-y-1.5 min-h-[70px]">
        {(() => {
          const displayedItem = hoveredIndex !== null 
            ? WHEEL_ITEMS[hoveredIndex] 
            : (selectedType ? WHEEL_ITEMS.find((item) => item.id === selectedType) : null);
          
          if (!displayedItem) return null;
          return (
            <>
              <h3 className="text-[16px] font-extrabold text-[#f1bf62] uppercase tracking-wider font-headline drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] animate-fade-in">
                {displayedItem.title}
              </h3>
              <p className="text-[13px] text-white/90 font-semibold leading-relaxed animate-fade-in">
                {displayedItem.description}
              </p>
            </>
          );
        })()}
      </div>

      {/* Dark Roller Picker Alternative Selector */}
      <div className="w-full max-w-[280px] mx-auto mt-4 mb-2">
        <RollerPicker
          variant="ios-dark"
          items={WHEEL_ITEMS.map((item) => ({ value: item.id, label: item.title }))}
          selectedValue={selectedType || CalculationType.HOROSCOPE}
          onChange={(val) => {
            const index = WHEEL_ITEMS.findIndex((item) => item.id === val);
            if (index >= 0) {
              handleSliceClick(index);
            }
          }}
        />
      </div>

      {/* Selected Theme Subtitle under Roller Picker */}
      <div className="text-center mt-1 mb-2.5 min-h-[20px]">
        <span className="text-sm font-extrabold text-[#f1bf62] uppercase tracking-widest font-headline">
          {(() => {
            const displayedItem = hoveredIndex !== null 
              ? WHEEL_ITEMS[hoveredIndex] 
              : (selectedType ? WHEEL_ITEMS.find((item) => item.id === selectedType) : null);
            return displayedItem ? displayedItem.title : "";
          })()}
        </span>
      </div>

      {/* Manual Selection Instructions */}
      <p className="text-[12px] font-bold tracking-wider text-white/60 mt-4 text-center uppercase">
        დააჭირე <span className="text-[#f1bf62] font-black underline">სტარტს</span>, ან <span className="text-[#f1bf62] font-black underline">აირჩიე ხელით</span> სასურველი სექტორი
      </p>
    </div>
  );
};
