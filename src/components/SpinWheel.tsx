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
      <div className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full bg-[#f1bf62]/5 blur-3xl -z-10 pointer-events-none"></div>

      {/* Elegant Pointer at the 12 o'clock position (Top) */}
      <div className="relative z-30 -mb-6 flex flex-col items-center pointer-events-none">
        {/* Custom Circular Pointer with hand icon pointing down */}
        <div className="w-11 h-11 bg-[#121416] rounded-full border border-white/10 flex items-center justify-center shadow-2xl relative z-30">
          <Pointer className="w-5 h-5 text-[#f1bf62] fill-[#f1bf62] transform rotate-180" />
        </div>
        {/* Needle/anchor that overlaps with the wheel rim */}
        <div className="w-3.5 h-5 bg-[#1e2022] border-x border-white/5 shadow-sm -mt-2.5 z-20" />
      </div>

      {/* Outer Luxury Wheel Rim */}
      <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] p-4 bg-[#1e2022]/45 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl flex items-center justify-center">
        {/* Glamorous active border pulse */}
        <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none"></div>
        <div className="absolute inset-4 rounded-full border border-[#f1bf62]/10 pointer-events-none"></div>

        {/* The Rotatable Wheel Segment */}
        <div
          id="roulette_wheel"
          className="relative w-full h-full rounded-full overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] cursor-pointer"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? "transform 5000ms cubic-bezier(0.1, 0.9, 0.2, 1)" : "transform 800ms cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        >
          {/* Slices container using SVGs for visual precision */}
          <svg viewBox="-1 -1 2 2" className="w-full h-full -rotate-90">
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

              // Elegant alternating space/slate colors for dark theme
              const colors = [
                "rgba(30, 32, 34, 0.85)",
                "rgba(18, 20, 22, 0.85)",
                "rgba(30, 32, 34, 0.85)",
                "rgba(18, 20, 22, 0.85)",
                "rgba(30, 32, 34, 0.85)",
                "rgba(18, 20, 22, 0.85)",
                "rgba(30, 32, 34, 0.85)",
                "rgba(18, 20, 22, 0.85)",
              ];

              const isSelected = selectedType === item.id;

              const isHovered = hoveredIndex === index;
              return (
                <path
                  key={item.id}
                  d={pathData}
                  fill={colors[index % colors.length]}
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="0.010"
                  className="transition-all hover:fill-white/5 duration-300 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSliceClick(index);
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    opacity: hoveredIndex !== null ? (isHovered ? 1 : 0.8) : 1,
                    fill: (isSelected || isHovered) ? "rgba(241, 191, 98, 0.12)" : undefined,
                  }}
                />
              );
            })}
          </svg>

          {/* Slices Text & Icons positioned absolutely over SVG */}
          {WHEEL_ITEMS.map((item, index) => {
            const angle = (360 / WHEEL_ITEMS.length) * index + (180 / WHEEL_ITEMS.length); // mathematically centered text (22.5 offset for 8 segments)
            const isSelected = selectedType === item.id;
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={item.id}
                className="absolute inset-0 flex flex-col items-center pt-8 md:pt-12 pointer-events-none"
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: "50% 50%",
                }}
              >
                <div 
                  className={`flex flex-col items-center justify-center p-1.5 rounded-full backdrop-blur-xs border transition-all duration-350 pointer-events-auto cursor-pointer ${
                    (isSelected || isHovered) ? "scale-115 border-[#f1bf62] bg-[#f1bf62] text-[#121416] shadow-lg shadow-[#f1bf62]/20" : "border-white/10 bg-[#1e2022]/90 text-[#c6c6ce] hover:border-white/20"
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
                    className: (isSelected || isHovered) ? "w-5 h-5 text-[#121416]" : "w-5 h-5 text-[#c6c6ce]"
                  })}
                </div>
                
                {/* Short labels for georgian wheel */}
                <span 
                  className={`text-[9px] md:text-[10px] uppercase tracking-widest text-center mt-2 max-w-[50px] md:max-w-[70px] leading-tight transition-all duration-350 pointer-events-auto cursor-pointer ${
                    (isSelected || isHovered) ? "text-[#f1bf62] font-extrabold scale-105" : "text-[#c6c6ce]/75 font-semibold hover:text-white"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSliceClick(index);
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {item.title.split(" ")[0]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Central Core Spin Button (White/Silver/Gold classy layout) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            spin();
          }}
          disabled={disabled}
          className={`absolute w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#121416] text-[#c6c6ce] shadow-2xl flex flex-col items-center justify-center z-10 transition-all duration-500 cursor-pointer border border-white/10 hover:border-[#f1bf62]/40 hover:text-white shadow-[0_0_25px_rgba(0,0,0,0.8)] ${
            isSpinning 
              ? "hover:scale-105 hover:bg-red-950/30 active:scale-95 saturate-150" 
              : "hover:scale-105 hover:bg-white/5 active:scale-95"
          }`}
        >
          {isSpinning ? (
            <>
              <span className="text-xs font-black tracking-widest uppercase animate-pulse text-red-400">
                სტოპი
              </span>
              <span className="text-[8px] tracking-widest uppercase mt-0.5 font-semibold text-white/50">
                გაჩერება
              </span>
            </>
          ) : (
            <>
              <span className="text-sm md:text-base font-black tracking-[0.15em] uppercase text-[#f1bf62] font-headline">
                სტარტი
              </span>
              <span className="text-[9px] tracking-widest uppercase mt-0.5 font-bold text-[#c6c6ce]/60">
                ტრიალი
              </span>
            </>
          )}
        </button>
      </div>

      {/* Selected Theme Name and Description in clean, flat gold/silver text */}
      <div className="mt-6 text-center px-6 max-w-[380px] space-y-1.5 min-h-[70px]">
        {(() => {
          const displayedItem = hoveredIndex !== null 
            ? WHEEL_ITEMS[hoveredIndex] 
            : (selectedType ? WHEEL_ITEMS.find((item) => item.id === selectedType) : null);
          
          if (!displayedItem) return null;
          return (
            <>
              <h3 className="text-[16px] font-extrabold text-[#f1bf62] uppercase tracking-wider font-headline">
                {displayedItem.title}
              </h3>
              <p className="text-[13px] text-[#c6c6ce]/90 font-semibold leading-relaxed">
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
        <span className="text-sm font-extrabold text-[#f1bf62]/80 uppercase tracking-widest font-headline">
          {(() => {
            const displayedItem = hoveredIndex !== null 
              ? WHEEL_ITEMS[hoveredIndex] 
              : (selectedType ? WHEEL_ITEMS.find((item) => item.id === selectedType) : null);
            return displayedItem ? displayedItem.title : "";
          })()}
        </span>
      </div>

      {/* Manual Selection Instructions */}
      <p className="text-[12px] font-bold tracking-wider text-[#c6c6ce]/60 mt-4 text-center uppercase">
        დააჭირე <span className="text-[#f1bf62] font-black underline">სტარტს</span>, ან <span className="text-[#f1bf62] font-black underline">აირჩიე ხელით</span> სასურველი სექტორი
      </p>
    </div>
  );
};
