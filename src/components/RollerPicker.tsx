import React, { useRef, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface RollerItem {
  value: any;
  label: string;
}

interface RollerPickerProps {
  items: RollerItem[];
  selectedValue: any;
  onChange: (value: any) => void;
  label?: string;
  variant?: "dark" | "ios-light" | "ios-dark";
}

// Low-latency procedural satisfaction click ("ტკ ტკ") sound using Web Audio API
const playTickSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = "triangle";
    // Extremely rapid high frequency decay sounds like a physical wooden or plastic click
    osc.frequency.setValueAtTime(1400, ctx.currentTime);
    osc.frequency.setValueAtTime(200, ctx.currentTime + 0.01);
    
    gainNode.gain.setValueAtTime(0.06, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.018);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.02);
  } catch (e) {
    // Fail silently if browser blocks audio before user interaction
  }
};

export const RollerPicker: React.FC<RollerPickerProps> = ({
  items,
  selectedValue,
  onChange,
  label,
  variant = "dark",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  
  const N = items.length;
  // Fallback to index 0 if items are empty
  const currentIndex = items.findIndex((item) => item.value === selectedValue);
  const activeIdx = currentIndex >= 0 ? currentIndex : 0;

  // Watch selectedValue to play mechanical "tk tk" clicks
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    playTickSound();
  }, [selectedValue]);

  // Active non-passive scroll wheel wheel input for extremely smooth interactive physical control
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let accumulatedDelta = 0;
    const threshold = 35; // minimum scroll delta accumulation to step option

    const handleWheelActive = (e: WheelEvent) => {
      e.preventDefault();
      accumulatedDelta += e.deltaY;

      if (Math.abs(accumulatedDelta) >= threshold) {
        if (accumulatedDelta > 0) {
          const nextIdx = (activeIdx + 1) % N;
          onChange(items[nextIdx].value);
        } else {
          const nextIdx = (activeIdx - 1 + N) % N;
          onChange(items[nextIdx].value);
        }
        accumulatedDelta = 0;
      }
    };

    container.addEventListener("wheel", handleWheelActive, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheelActive);
    };
  }, [activeIdx, N, items, onChange]);

  // Mouse & Touch Dragging feature to roll/select options via click-and-drag motion
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDragActive = false;
    let initialY = 0;
    const dragThreshold = 24; // Distance in pixels to trigger an option change

    const handleDragStart = (e: MouseEvent | TouchEvent) => {
      isDragActive = true;
      initialY = "touches" in e ? e.touches[0].clientY : e.clientY;
    };

    const handleDragMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragActive) return;
      const currentY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const deltaY = currentY - initialY;

      if (Math.abs(deltaY) >= dragThreshold) {
        if (deltaY > 0) {
          // Dragged downwards -> go to previous option
          const nextIdx = (activeIdx - 1 + N) % N;
          onChange(items[nextIdx].value);
        } else {
          // Dragged upwards -> go to next option
          const nextIdx = (activeIdx + 1) % N;
          onChange(items[nextIdx].value);
        }
        initialY = currentY; // Reset anchor point for continuous smooth scrolling
      }
    };

    const handleDragEnd = () => {
      isDragActive = false;
    };

    container.addEventListener("mousedown", handleDragStart);
    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("mouseup", handleDragEnd);

    container.addEventListener("touchstart", handleDragStart, { passive: true });
    window.addEventListener("touchmove", handleDragMove, { passive: true });
    window.addEventListener("touchend", handleDragEnd);

    return () => {
      container.removeEventListener("mousedown", handleDragStart);
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);

      container.removeEventListener("touchstart", handleDragStart);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [activeIdx, N, items, onChange]);

  const handleStepPrev = () => {
    const nextIdx = (activeIdx - 1 + N) % N;
    onChange(items[nextIdx].value);
  };

  const handleStepNext = () => {
    const nextIdx = (activeIdx + 1) % N;
    onChange(items[nextIdx].value);
  };

  // Get index offsets for a clean, flat 3-position picker
  // Index -1, 0, +1 relative to active index
  const getOffsets = () => {
    return [-1, 0, 1];
  };

  const isLight = variant === "ios-light";
  const isIos = variant === "ios-light" || variant === "ios-dark";

  return (
    <div className="flex flex-col items-center flex-1">
      {label && !isIos && (
        <span className="text-[9px] uppercase tracking-widest text-white/70 mb-2 block font-light">
          {label}
        </span>
      )}
      
      <div 
        ref={containerRef}
        className={`relative flex flex-col items-center justify-center h-28 w-full min-w-[70px] select-none py-1 transition-colors ${
          isIos 
            ? "bg-transparent border-0 overflow-hidden" 
            : "bg-black/40 border border-white/5 rounded-none overflow-hidden group"
        }`}
        id={`roller-${label ? label.replace(/\s+/g, "-") : "picker"}`}
      >
        {/* Centered triangular arrow identifier pointing downwards */}
        {variant === "ios-light" && (
          <div className="absolute top-0.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <span className="text-black text-[10px] leading-none block select-none">▼</span>
          </div>
        )}
        {variant === "ios-dark" && (
          <div className="absolute top-0.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <span className="text-[#f1bf62] text-[10px] leading-none block select-none">▼</span>
          </div>
        )}

        {/* Top & Bottom Overlay gradients for smooth fade */}
        <div className={`absolute top-0 left-0 right-0 h-6 pointer-events-none z-10 transition-all ${
          variant === "ios-light" 
            ? "bg-gradient-to-b from-white via-white/80 to-transparent" 
            : variant === "ios-dark"
            ? "bg-gradient-to-b from-[#1e2022] via-[#1e2022]/80 to-transparent"
            : "bg-gradient-to-b from-black via-black/80 to-transparent"
        }`} />
        <div className={`absolute bottom-0 left-0 right-0 h-6 pointer-events-none z-10 transition-all ${
          variant === "ios-light" 
            ? "bg-gradient-to-t from-white via-white/80 to-transparent" 
            : variant === "ios-dark"
            ? "bg-gradient-to-t from-[#1e2022] via-[#1e2022]/80 to-transparent"
            : "bg-gradient-to-t from-black via-black/80 to-transparent"
        }`} />

        {/* Center active highlighted bar indicator */}
        {(variant === "dark" || variant === "ios-dark") && (
          <div className="absolute left-1.5 right-1.5 h-8 border-y border-white/10 bg-white/5 pointer-events-none z-0 rounded-lg" />
        )}

        {/* Navigation Buttons visible on hover */}
        <button
          type="button"
          onClick={handleStepPrev}
          className={`absolute top-0.5 z-20 transition-colors p-1 ${
            variant === "ios-light"
              ? "text-gray-300 hover:text-gray-700"
              : variant === "ios-dark"
              ? "text-[#c6c6ce]/30 hover:text-[#f1bf62]"
              : "text-gray-550 hover:text-white"
          }`}
          aria-label="Previous item"
        >
          <ChevronUp className="w-3.5 h-3.5 animate-pulse" />
        </button>

        {/* Items Container with absolute positions based on offset */}
        <div className="relative w-full h-full flex items-center justify-center">
          {getOffsets().map((offset) => {
            const itemIdx = (activeIdx + offset + N * 2) % N;
            const item = items[itemIdx];
            if (!item) return null;

            // Compute styling metrics based on distance/offset from center (0)
            const isCenter = offset === 0;
            const dist = Math.abs(offset);
            
            const opacity = dist === 0 ? 1 : 0.35;
            const scale = dist === 0 ? 1.08 : 0.88;
            const translateY = offset * 28; // Vertical spacing

            // Styles for light vs dark theme
            const textColor = variant === "ios-light"
              ? (isCenter ? "#1c1c1e" : "#a1a1aa")
              : variant === "ios-dark"
              ? (isCenter ? "#f1bf62" : "rgba(198, 198, 206, 0.35)")
              : (isCenter ? "#FFFFFF" : "#888888");
            const textShadowValue = (variant === "ios-dark" && isCenter)
              ? "0 0 15px rgba(241, 191, 98, 0.4)"
              : (!isLight && isCenter)
              ? "0 0 10px rgba(255, 255, 255, 0.3)"
              : "none";
            const fontWeightValue = isCenter ? 700 : 500;

            return (
              <div
                key={`${offset}-${itemIdx}`}
                onClick={() => onChange(item.value)}
                className={`absolute w-full px-1 text-center transition-all duration-300 ease-out cursor-pointer ${
                  isIos ? "text-sm tracking-wide" : "text-xs uppercase"
                }`}
                style={{
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  opacity: opacity,
                  color: textColor,
                  fontWeight: fontWeightValue,
                  letterSpacing: isIos ? "0.02em" : "0.12em",
                  textShadow: textShadowValue,
                }}
              >
                {item.label}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleStepNext}
          className={`absolute bottom-1 z-20 transition-colors p-1 ${
            variant === "ios-light"
              ? "text-gray-300 hover:text-gray-700"
              : variant === "ios-dark"
              ? "text-[#c6c6ce]/30 hover:text-[#f1bf62]"
              : "text-gray-550 hover:text-white"
          }`}
          aria-label="Next item"
        >
          <ChevronDown className="w-3.5 h-3.5 animate-pulse" />
        </button>
      </div>

      {/* Roller visual sub-text summary hint (only for dark mode theme) */}
      {!isIos && (
        <span className="text-[10px] text-gray-400 font-mono font-light mt-1.5 min-h-[14px]">
          {items[activeIdx]?.label}
        </span>
      )}
    </div>
  );
};
