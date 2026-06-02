import React, { useState, useRef, useEffect } from "react";
import { CalculationType } from "../types";
import { Sparkles, Target, Grid3x3, Hash, BrainCircuit, Moon, Compass, Users } from "lucide-react";
import { playTickSound } from "./RollerPicker";

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
    icon: <Sparkles style={{ width: "100%", height: "100%" }} />,
    description: "ზოდიაქოს ნიშანი, ხასიათი, სტიქიები და კოსმოსური ტრენდები.",
  },
  {
    id: CalculationType.ENNEAGRAM,
    title: "ენიაგრამა",
    color: "from-purple-600 to-purple-900 border-purple-500",
    gradient: "conic-gradient(from 45deg, #9333ea, #581c87)",
    icon: <Target style={{ width: "100%", height: "100%" }} />,
    description: "თქვენი ფსიქოტიპი, ფარული მოტივაციები, შიშები და ზრდის გზები.",
  },
  {
    id: CalculationType.PSYCHOMATRIX,
    title: "ფსიქო მატრიცა",
    color: "from-pink-600 to-pink-900 border-pink-500",
    gradient: "conic-gradient(from 90deg, #ec4899, #831843)",
    icon: <Grid3x3 style={{ width: "100%", height: "100%" }} />,
    description: "პითაგორას ციფრული მატრიცა: ჯანმრთელობა, იღბალი, ენერგია და ნიჭი.",
  },
  {
    id: CalculationType.NUMEROLOGY,
    title: "ნუმეროლოგია",
    color: "from-amber-600 to-amber-900 border-amber-500",
    gradient: "conic-gradient(from 135deg, #d97706, #78350f)",
    icon: <Hash style={{ width: "100%", height: "100%" }} />,
    description: "ბედისწერის რიცხვი, თქვენი უმაღლესი მისია და ცხოვრებისეული გზა.",
  },
  {
    id: CalculationType.HUMAN_DESIGN,
    title: "ადამიანის დიზაინი",
    color: "from-teal-600 to-teal-900 border-teal-500",
    gradient: "conic-gradient(from 180deg, #0d9488, #115e59)",
    icon: <BrainCircuit style={{ width: "100%", height: "100%" }} />,
    description: "ენერგეტიკული ტიპი, პროფილი, ავტორიტეტი და ცხოვრებისეული სტრატეგია.",
  },
  {
    id: CalculationType.VEDIC,
    title: "ვედური ასტროლოგია",
    color: "from-red-600 to-red-900 border-red-500",
    gradient: "conic-gradient(from 225deg, #dc2626, #7f1d1d)",
    icon: <Moon style={{ width: "100%", height: "100%" }} />,
    description: "ჯიოტიში: მთვარის ნიშანი, ნაკშატრები და კარმული ვალდებულებები.",
  },
  {
    id: CalculationType.BAZI,
    title: "ბა-ძი (BaZi)",
    color: "from-orange-600 to-orange-900 border-orange-500",
    gradient: "conic-gradient(from 270deg, #ea580c, #7c2d12)",
    icon: <Compass style={{ width: "100%", height: "100%" }} />,
    description: "ბედისწერის 4 სვეტი: დღის მბრძანებელი და 5 ელემენტის ბალანსი.",
  },
  {
    id: CalculationType.ARCHETYPE,
    title: "არქეტიპული ანალიზი",
    color: "from-cyan-600 to-cyan-900 border-cyan-500",
    gradient: "conic-gradient(from 315deg, #0891b2, #164e63)",
    icon: <Users style={{ width: "100%", height: "100%" }} />,
    description: "იუნგის 12 ფსიქოლოგიური არქეტიპი და ჩრდილოვანი მხარეები.",
  },
];

export const SpinWheel: React.FC<SpinWheelProps> = ({ onSelect, selectedType, disabled }) => {
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Track selected slice locally for double click / direct selection flow
  const [localSelectedId, setLocalSelectedId] = useState<CalculationType | null>(selectedType);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const spinTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tickAnimRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (spinTimeoutRef.current) {
        clearTimeout(spinTimeoutRef.current);
      }
      if (tickAnimRef.current) {
        cancelAnimationFrame(tickAnimRef.current);
      }
    };
  }, []);

  // Sync local selection when parent selectedType changes
  useEffect(() => {
    setLocalSelectedId(selectedType);
  }, [selectedType]);

  // Rotate the wheel when selectedType changes from outside (e.g. ProfileForm)
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
      if (tickAnimRef.current) {
        cancelAnimationFrame(tickAnimRef.current);
        tickAnimRef.current = null;
      }
      setIsSpinning(false);

      // Find which slice is currently aligned with the top pointer (12 o'clock)
      const normalizedRotation = (360 - (rotation % 360)) % 360;
      const sliceAngle = 360 / WHEEL_ITEMS.length;
      let itemIndex = Math.floor(normalizedRotation / sliceAngle);
      if (itemIndex < 0) itemIndex = 0;
      if (itemIndex >= WHEEL_ITEMS.length) itemIndex = WHEEL_ITEMS.length - 1;

      // Align it nicely to the top pointer position immediately with a quick transition
      const targetDeg = (360 - itemIndex * sliceAngle) - (sliceAngle / 2);
      
      setRotation((prev) => {
        const currentModulo = prev % 360;
        const diff = targetDeg - currentModulo;
        const shortestDiff = ((diff + 180) % 360 + 360) % 360 - 180;
        return prev + shortestDiff;
      });

      // Update local selection to match the stopped slice
      setLocalSelectedId(WHEEL_ITEMS[itemIndex].id);

      // TRIGGER ANALYSIS immediately after the quick 300ms alignment transition completes!
      spinTimeoutRef.current = setTimeout(() => {
        onSelect(WHEEL_ITEMS[itemIndex].id);
        spinTimeoutRef.current = null;
      }, 300);
      return;
    }

    if (disabled) return;
    setIsSpinning(true);
    setIsTransitioning(false);

    const numSlices = WHEEL_ITEMS.length;
    const itemIndex = Math.floor(Math.random() * numSlices);
    
    const extraRounds = 360 * 6; // 6 full rotations
    const sliceAngle = 360 / numSlices;
    const targetDeg = extraRounds + (360 - itemIndex * sliceAngle) - (sliceAngle / 2);
    
    const newRotation = rotation + targetDeg;
    setRotation(newRotation);

    // Procedural satisfaction "tktktktktk" clicking loop synchronized with visual spin easing
    if (tickAnimRef.current) {
      cancelAnimationFrame(tickAnimRef.current);
    }
    
    const startTime = performance.now();
    const duration = 5000; // Match 5000ms transition
    const startRotation = rotation;
    const endRotation = newRotation;
    let lastPegIndex = Math.floor(startRotation / 15); // 15 degrees peg spacing (24 pegs per rev)

    const tickLoop = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed >= duration) {
        return;
      }
      
      // Easing cubic ease-out calculation to mimic physical inertia slowdown
      const t = elapsed / duration;
      const easeOut = 1 - Math.pow(1 - t, 3);
      
      const currentRotation = startRotation + (endRotation - startRotation) * easeOut;
      const currentPegIndex = Math.floor(currentRotation / 15);
      
      if (currentPegIndex > lastPegIndex) {
        playTickSound();
        lastPegIndex = currentPegIndex;
      }
      
      tickAnimRef.current = requestAnimationFrame(tickLoop);
    };
    tickAnimRef.current = requestAnimationFrame(tickLoop);

    // Trigger analysis ONLY when the 5000ms transition finishes and the wheel stops!
    spinTimeoutRef.current = setTimeout(() => {
      setIsSpinning(false);
      if (tickAnimRef.current) {
        cancelAnimationFrame(tickAnimRef.current);
        tickAnimRef.current = null;
      }
      setLocalSelectedId(WHEEL_ITEMS[itemIndex].id);
      onSelect(WHEEL_ITEMS[itemIndex].id);
      spinTimeoutRef.current = null;
    }, 5000);
  };

  const handleSliceClick = (index: number) => {
    if (disabled || isSpinning) return;
    
    const clickedId = WHEEL_ITEMS[index].id;
    
    playTickSound(); // Play satisfaction tick sound on click!
    
    // Stop any active spin/timeout immediately when selecting manually
    if (spinTimeoutRef.current) {
      clearTimeout(spinTimeoutRef.current);
      spinTimeoutRef.current = null;
    }
    
    setIsTransitioning(true);
    setLocalSelectedId(clickedId);
    
    // Rotate to point smoothly to the clicked slice at the top (800ms transition)
    const sliceAngle = 360 / WHEEL_ITEMS.length;
    const targetDeg = (360 - index * sliceAngle) - (sliceAngle / 2);
    setRotation((prev) => Math.floor(prev / 360) * 360 + targetDeg);
    
    // Mark transitioning as finished after the 800ms transition completes and transition automatically!
    spinTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      onSelect(clickedId); // Auto-advance/navigate to that reading theme!
      spinTimeoutRef.current = null;
    }, 800);
  };

  // Helper to generate coordinates for SVG path
  const getCoordinatesForPercent = (percent: number) => {
    // Offset by -0.25 (which is -90 degrees) so East (0) becomes North (12 o'clock)
    const angle = 2 * Math.PI * (percent - 0.25);
    const x = Math.cos(angle);
    const y = Math.sin(angle);
    return [x, y];
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 select-none relative bg-transparent w-full">
      {/* Subtle background shadow blur highlight */}
      <div className="absolute w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] md:w-[650px] md:h-[650px] rounded-full bg-[#f1bf62]/6 blur-3xl -z-10 pointer-events-none"></div>

      {/* Elegant Pointer at the 12 o'clock position (Top) - Gold rim with head pointer */}
      <div className="relative z-30 -mb-8.5 md:-mb-10 flex flex-col items-center pointer-events-none">
        {/* Circular Pointer head with gold-bronze metallic ring */}
        <div className="w-13 h-13 md:w-15 md:h-15 bg-gradient-to-b from-[#403524] via-[#1e2022] to-[#0a0b0c] rounded-full border-2 border-[#f1bf62] flex items-center justify-center shadow-[0_6px_16px_rgba(0,0,0,0.9)] relative z-30">
          <div className="absolute inset-0.5 rounded-full border border-black/40"></div>
          <div className="absolute inset-1.5 rounded-full border border-[#f1bf62]/20"></div>
          <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#f1bf62] flex items-center justify-center text-[#121416] font-bold shadow-md">
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-tighter">IDC</span>
          </div>
        </div>
        {/* Golden Triangle Point Pointer pointing down */}
        <div className="w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[18px] border-t-[#f1bf62] -mt-3.5 z-20 drop-shadow-[0_3px_5px_rgba(0,0,0,0.7)]" />
      </div>

      {/* Outer Luxury Wheel Rim (Heavy concentric golden/bronze gold plated metal) - MAXIMUM LARGER SIZE */}
      <div className="relative w-[340px] h-[340px] sm:w-[470px] sm:h-[470px] md:w-[610px] md:h-[610px] p-5 bg-gradient-to-b from-[#2a2318] via-[#151718] to-[#090a0a] rounded-full shadow-[0_25px_65px_rgba(0,0,0,0.95),inset_0_2px_4px_rgba(255,255,255,0.05)] flex items-center justify-center border border-white/5 transition-all duration-300">
        {/* Golden Concentric Rings Overlay */}
        <div className="absolute inset-0 rounded-full border-4 border-[#f1bf62]/35 pointer-events-none"></div>
        <div className="absolute inset-1 rounded-full border border-black/80 pointer-events-none"></div>
        <div className="absolute inset-3 rounded-full border-2 border-double border-[#f1bf62]/20 pointer-events-none"></div>
        <div className="absolute inset-[15px] rounded-full border border-black/50 pointer-events-none"></div>

        {/* The Rotatable Wheel Segment */}
        <div
          id="roulette_wheel"
          className="relative w-full h-full rounded-full overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.95)] cursor-pointer border border-[#f1bf62]/10"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? "transform 5000ms cubic-bezier(0.1, 0.9, 0.2, 1)" : "transform 800ms cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        >
          {/* Slices container using SVGs for visual precision and custom definitions */}
          <svg viewBox="-1 -1 2 2" className="w-full h-full">
            <defs>
              {/* Premium dark bronze metallic linear gradient 1 */}
              <linearGradient id="metallicSliceA" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2c2822" />
                <stop offset="30%" stopColor="#1e1b17" />
                <stop offset="60%" stopColor="#13110f" />
                <stop offset="100%" stopColor="#0a0908" />
              </linearGradient>
              {/* Premium dark bronze metallic linear gradient 2 */}
              <linearGradient id="metallicSliceB" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#221e1a" />
                <stop offset="35%" stopColor="#171512" />
                <stop offset="70%" stopColor="#0f0d0b" />
                <stop offset="100%" stopColor="#040403" />
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
              {/* Gold border gradient for icon circular frames */}
              <linearGradient id="iconGoldBorder" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffd885" />
                <stop offset="100%" stopColor="#b58728" />
              </linearGradient>
              {/* Icon Circle Backdrop Gradient */}
              <linearGradient id="iconBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2a251e" />
                <stop offset="100%" stopColor="#12110e" />
              </linearGradient>

              {/* DYNAMIC TEXT PATHS DEFINITION FOR CIRCULAR LABELS - PLACED AT THE OUTER EDGE */}
              {WHEEL_ITEMS.map((item, index) => {
                const angle1 = (index * 45 - 90) * Math.PI / 180;
                const angle2 = ((index + 1) * 45 - 90) * Math.PI / 180;
                const r = 0.81;
                const x1 = r * Math.cos(angle1);
                const y1 = r * Math.sin(angle1);
                const x2 = r * Math.cos(angle2);
                const y2 = r * Math.sin(angle2);
                return (
                  <path
                    key={`path-def-${item.id}`}
                    id={`textPath-${index}`}
                    d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
                    fill="none"
                  />
                );
              })}
            </defs>

            {/* Render interactive slices */}
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

              const isSelected = localSelectedId === item.id;
              const isHovered = hoveredIndex === index;
              const sliceFill = index % 2 === 0 ? "url(#metallicSliceA)" : "url(#metallicSliceB)";

              return (
                <g
                  key={item.id}
                  className="cursor-pointer pointer-events-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSliceClick(index);
                  }}
                  onMouseEnter={() => {
                    setHoveredIndex(index);
                    playTickSound(); // Play satisfy tick sound on hover!
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Base Metallic Slice */}
                  <path
                    d={pathData}
                    fill={sliceFill}
                    stroke="url(#goldStroke)"
                    strokeWidth="0.007"
                    className="transition-all duration-300"
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

            {/* Concentric Grooves to mimic brushed dark bronze metal dial */}
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

            {/* CURVED GEORGIAN LABELS FOLLOWING THE TEXT PATHS - ENLARGED AND MOVED TO EDGE */}
            {WHEEL_ITEMS.map((item, index) => {
              const isSelected = localSelectedId === item.id;
              const isHovered = hoveredIndex === index;
              return (
                <text key={`text-${item.id}`} className="select-none pointer-events-none">
                  <textPath
                    href={`#textPath-${index}`}
                    startOffset="50%"
                    textAnchor="middle"
                    fill={(isSelected || isHovered) ? "#ffd885" : "#ffffff"}
                    className="transition-colors duration-300 font-headline"
                    style={{
                      fontSize: "0.066px",
                      fontWeight: 900,
                      letterSpacing: "0.03em",
                      dominantBaseline: "middle",
                      textShadow: "0 2px 4px rgba(0,0,0,0.9)",
                    }}
                  >
                    {item.title.split(" ")[0]}
                  </textPath>
                </text>
              );
            })}

            {/* GORGEOUS GOLD-OUTLINED CIRCULAR ICON LABELS PLACED CLOSER TO THE CENTER DOME */}
            {WHEEL_ITEMS.map((item, index) => {
              const isSelected = localSelectedId === item.id;
              const isHovered = hoveredIndex === index;

              // Calculate icon center coordinate exactly at R = 0.48 (closer to the center dome)
              const midAngle = (index * 45 + 22.5 - 90) * Math.PI / 180;
              const rIcon = 0.48;
              const xIcon = rIcon * Math.cos(midAngle);
              const yIcon = rIcon * Math.sin(midAngle);

              return (
                <g
                  key={`icon-group-${item.id}`}
                  className="cursor-pointer pointer-events-auto transition-transform duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSliceClick(index);
                  }}
                  onMouseEnter={() => {
                    setHoveredIndex(index);
                    playTickSound(); // Play tick sound when hover coordinates trigger the circle
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    transformOrigin: `${xIcon}px ${yIcon}px`,
                  }}
                >
                  {/* Glowing gold circular framed border */}
                  <circle
                    cx={xIcon}
                    cy={yIcon}
                    r="0.08"
                    fill={ (isSelected || isHovered) ? "url(#goldStroke)" : "url(#iconBg)" }
                    stroke="url(#iconGoldBorder)"
                    strokeWidth="0.005"
                    className="transition-all duration-300 shadow-md"
                    style={{
                      filter: (isSelected || isHovered) ? "drop-shadow(0 0 3px rgba(241,191,98,0.5))" : "drop-shadow(0 1.5px 3px rgba(0,0,0,0.6))",
                    }}
                  />

                  {/* React Lucide icon rendered inside foreignObject */}
                  <foreignObject
                    x={xIcon - 0.045}
                    y={yIcon - 0.045}
                    width="0.09"
                    height="0.09"
                    className="pointer-events-none"
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      {React.cloneElement(item.icon as React.ReactElement<any>, {
                        style: { width: "13px", height: "13px" },
                        className: (isSelected || isHovered) ? "text-[#121416]" : "text-[#c6c6ce]"
                      })}
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Central Core Spin Button (Concentric metallic dome structure) - STAYS PERFECTLY UPRIGHT */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            spin();
          }}
          disabled={disabled}
          className={`absolute w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-b from-[#2d2a22] via-[#151718] to-[#080909] flex flex-col items-center justify-center z-10 transition-all duration-500 border border-[#f1bf62]/70 shadow-[0_12px_36px_rgba(0,0,0,0.95),inset_0_1px_3px_rgba(255,255,255,0.1)] ${
            disabled 
              ? "opacity-55 cursor-not-allowed scale-95 border-gray-600/40" 
              : "cursor-pointer hover:scale-105 active:scale-95"
          }`}
        >
          {/* Inner Golden concentric rings */}
          <div className="absolute inset-1.5 rounded-full border border-black/80 pointer-events-none"></div>
          <div className="absolute inset-2.5 rounded-full border border-[#f1bf62]/35 pointer-events-none"></div>
          <div className="absolute inset-3.5 rounded-full border border-black/60 pointer-events-none animate-[spin_80s_linear_infinite]"></div>
          
          {/* Inner Dome Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            {disabled ? (
              <>
                <span className="text-[11px] sm:text-[12px] md:text-[13px] font-black tracking-widest uppercase text-gray-400 font-headline drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] animate-pulse">
                  ანალიზი...
                </span>
                <span className="text-[7px] sm:text-[7.5px] md:text-[8px] tracking-widest uppercase mt-1 font-extrabold text-[#f1bf62]/60">
                  მიმდინარეობს
                </span>
              </>
            ) : isSpinning ? (
              <>
                <span className="text-[14px] sm:text-[16px] md:text-[18px] font-black tracking-widest uppercase text-red-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] animate-pulse font-headline">
                  სტოპი
                </span>
                <span className="text-[7.5px] sm:text-[8px] md:text-[9px] tracking-widest uppercase mt-1 font-extrabold text-white/50">
                  გაჩერება
                </span>
              </>
            ) : (
              <>
                <span className="text-[16px] sm:text-[19px] md:text-[21px] font-black tracking-[0.14em] uppercase text-white font-headline drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  სტარტი
                </span>
                <span className="text-[8px] sm:text-[9px] md:text-[9.5px] tracking-widest uppercase mt-1 font-extrabold text-[#f1bf62]/90">
                  ტრიალი
                </span>
              </>
            )}
          </div>
        </button>
      </div>

      {/* Selected Theme Name and Description in clean, flat gold/silver text - ENLARGED */}
      <div className="mt-10 text-center px-6 max-w-[480px] space-y-2 min-h-[90px]">
        {(() => {
          const displayedItem = hoveredIndex !== null 
            ? WHEEL_ITEMS[hoveredIndex] 
            : (localSelectedId ? WHEEL_ITEMS.find((item) => item.id === localSelectedId) : null);
          
          if (!displayedItem) return null;
          return (
            <>
              <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-black text-[#f1bf62] uppercase tracking-widest font-headline drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.65)] animate-fade-in">
                {displayedItem.title}
              </h3>
              <p className="text-[14px] sm:text-[15.5px] md:text-[16.5px] text-white font-bold leading-relaxed animate-fade-in drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                {displayedItem.description}
              </p>
            </>
          );
        })()}
      </div>

      {/* Manual Selection Instructions */}
      <p className="text-[12px] font-bold tracking-wider text-white/60 mt-6 text-center uppercase">
        დააჭირე <span className="text-[#f1bf62] font-black underline">სტარტს</span>, ან აირჩიე სექტორი და <span className="text-[#f1bf62] font-black underline">დააჭირე ხელმეორედ</span> გასაანალიზებლად
      </p>
    </div>
  );
};
