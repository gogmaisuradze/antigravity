"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";

export interface CoverFlowItem {
  tag?: string;
  titleLine1: string;
  titleLine2?: string;
  desc?: string;
  img: string;
  ctaText?: string;
  ctaUrl?: string;
}

export const defaultNewsItems: CoverFlowItem[] = [
  {
    tag: "#თვითგანვითარება",
    titleLine1: "სიჩუმის ხელოვნება",
    titleLine2: "თანამედროვე ქაოსში",
    desc: "როგორ მოვძებნოთ სიმშვიდე იქ, სადაც ხმაური არასდროს წყდება? პირველი ნაბიჯები შინაგანი დიალოგისკენ.",
    img: "/blog_silence.png",
    ctaText: "სტატიის ნახვა",
    ctaUrl: "blog.html",
  },
  {
    tag: "#ტრანსფორმაცია",
    titleLine1: "ცვლილებების შიში",
    titleLine2: "და მათი მიღება",
    desc: "ყოველი დიდი ცვლილება იწყება იმის აღიარებით, რომ ძველი გზები აღარ მუშაობს. შიშის ტრანსფორმაცია.",
    img: "/blog_transformation.png",
    ctaText: "სტატიის ნახვა",
    ctaUrl: "blog.html",
  },
  {
    tag: "#ჰარმონია",
    titleLine1: "ბალანსი სხეულსა",
    titleLine2: "და გონებას შორის",
    desc: "პრაქტიკული სავარჯიშოები ყოველდღიური მენტალური ჰიგიენისთვის და სხეულის პირველადი სიგნალები.",
    img: "/blog_balance.png",
    ctaText: "სტატიის ნახვა",
    ctaUrl: "blog.html",
  },
  {
    tag: "#თვითშემეცნება",
    titleLine1: "ხედვის წერტილი",
    titleLine2: "საკუთარი თავის აღმოჩენა",
    desc: "ვინ ვართ ჩვენ სოციალური როლების მიღმა? მოგზაურობა საკუთარი მე-ს ჭეშმარიტ კუთხეებში.",
    img: "/blog_discovery.png",
    ctaText: "სტატიის ნახვა",
    ctaUrl: "blog.html",
  },
  {
    tag: "#ფსიქოლოგია",
    titleLine1: "პოზიტიური თერაპია",
    titleLine2: "თანამედროვე გამოწვევები",
    desc: "პოზიტიური ფსიქოთერაპიის (Positum) მიდგომა და შინაგანი რესურსების გააზრება ყოველდღიურობაში.",
    img: "/blog_positive_psych.png",
    ctaText: "სტატიის ნახვა",
    ctaUrl: "blog.html",
  },
  {
    tag: "#მედიტაცია",
    titleLine1: "გაცნობიერებული",
    titleLine2: "ყოფიერება & სიმშვიდე",
    desc: "მედიტაცია არაა გაქცევა, ესაა დაბრუნება საკუთარ თავთან და აწმყოში დარჩენის ხელოვნება.",
    img: "/blog_mindfulness.png",
    ctaText: "სტატიის ნახვა",
    ctaUrl: "blog.html",
  },
];

export interface CoverFlowCarouselProps {
  items?: CoverFlowItem[];
  sectionLabel?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
  onCtaClick?: (item: CoverFlowItem) => void;
}

export const CoverFlowCarousel: React.FC<CoverFlowCarouselProps> = ({
  items = defaultNewsItems,
  sectionLabel = "News",
  autoplay = true,
  autoplayDelay = 4500,
  className = "",
  onCtaClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);
  const total = items.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index % total);
  };

  useEffect(() => {
    if (!autoplay || isHovered || total <= 1) return;
    const interval = setInterval(nextSlide, autoplayDelay);
    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, isHovered, nextSlide, total]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        ["INPUT", "TEXTAREA", "SELECT"].includes(
          document.activeElement?.tagName || ""
        ) ||
        (document.activeElement as HTMLElement)?.isContentEditable
      ) {
        return;
      }
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 45) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
  };

  if (!items || items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <section
      className={`relative w-full min-h-[640px] md:min-h-[720px] rounded-[32px] md:rounded-[40px] flex items-center justify-center overflow-hidden py-8 sm:py-12 select-none border-2 border-[#D8C4B6] shadow-[inset_0_4px_45px_rgba(28,61,99,0.22),0_25px_60px_rgba(28,61,99,0.08)] ${className}`}
      style={{
        backgroundColor: "#FAF7F2",
        color: "#ffffff",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Deepened window with ambient blur & glowing deep blue gradation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Ambient blurred photo reflection */}
        <img
          src={currentItem?.img}
          alt="ambience background"
          className="w-full h-full object-cover transition-all duration-1000 opacity-30"
          style={{
            filter: "blur(40px)",
            transform: "scale(1.2)",
          }}
        />

        {/* Luminous Gradation: IDC signature Navy glowing outwards into site warm ivory */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 65% at 50% 48%, rgba(28, 61, 99, 0.55) 0%, rgba(28, 61, 99, 0.28) 45%, rgba(250, 247, 242, 0.94) 85%, #FAF7F2 100%)",
          }}
        />

        {/* Deep architectural recessed inner shadow (ჩაღრმავებული ფორტოჩკა) */}
        <div
          className="absolute inset-0 rounded-[32px] md:rounded-[40px] pointer-events-none"
          style={{
            boxShadow:
              "inset 0 0 60px rgba(28, 61, 99, 0.3), inset 0 10px 30px rgba(28, 61, 99, 0.35)",
          }}
        />

        {/* Radiant blue spotlight in center */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(28, 61, 99, 0.45) 0%, rgba(59, 94, 99, 0.2) 50%, transparent 75%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 z-10 flex flex-col items-center">
        {sectionLabel && (
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span
              style={{
                width: "36px",
                height: "1.5px",
                background: "linear-gradient(90deg, transparent, #E0AC6B)",
              }}
            />
            <h3
              style={{
                fontSize: "0.8rem",
                fontWeight: 800,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#E0AC6B",
                margin: 0,
                textShadow: "0 2px 8px rgba(0,0,0,0.5)",
              }}
            >
              {sectionLabel}
            </h3>
            <span
              style={{
                width: "36px",
                height: "1.5px",
                background: "linear-gradient(90deg, #E0AC6B, transparent)",
              }}
            />
          </div>
        )}

        {/* 3D Coverflow Container with deepened 3D perspective */}
        <div
          className="relative w-full h-[460px] sm:h-[520px] flex justify-center items-center mb-6 sm:mb-8"
          style={{ perspective: "1600px" }}
        >
          {items.map((item, index) => {
            const offset = (index - currentIndex + total) % total;
            let transform = "translateX(0px) scale(0.4) rotateY(0deg)";
            let opacity = 0;
            let zIndex = 0;
            let filter = "brightness(0.4) blur(2px)";
            let isActive = false;

            if (offset === 0) {
              isActive = true;
              transform = "translateX(0px) scale(1) rotateY(0deg)";
              opacity = 1;
              zIndex = 30;
              filter = "brightness(1)";
            } else if (offset === 1) {
              transform = "translateX(min(285px, 35vw)) scale(0.84) rotateY(-24deg)";
              opacity = 0.65;
              zIndex = 20;
              filter = "brightness(0.75)";
            } else if (offset === 2) {
              transform = "translateX(min(510px, 60vw)) scale(0.68) rotateY(-38deg)";
              opacity = 0.38;
              zIndex = 10;
              filter = "brightness(0.55) blur(1px)";
            } else if (offset === total - 1) {
              transform = "translateX(max(-285px, -35vw)) scale(0.84) rotateY(24deg)";
              opacity = 0.65;
              zIndex = 20;
              filter = "brightness(0.75)";
            } else if (offset === total - 2) {
              transform = "translateX(max(-510px, -60vw)) scale(0.68) rotateY(38deg)";
              opacity = 0.38;
              zIndex = 10;
              filter = "brightness(0.55) blur(1px)";
            }

            return (
              <div
                key={item.img + index}
                onClick={() => !isActive && goToSlide(index)}
                style={{
                  position: "absolute",
                  width: "min(330px, 85vw)",
                  height: "min(490px, 75vh)",
                  borderRadius: "20px",
                  overflow: "hidden",
                  backgroundColor: "#171311",
                  border: isActive
                    ? "1px solid rgba(224, 172, 107, 0.4)"
                    : "1px solid rgba(255, 255, 255, 0.12)",
                  transform,
                  opacity,
                  zIndex,
                  filter,
                  transformOrigin: "center center",
                  transition: "all 800ms cubic-bezier(0.25, 1, 0.5, 1)",
                  boxShadow: isActive
                    ? "0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(197,168,128,0.25)"
                    : "0 15px 35px rgba(0,0,0,0.5)",
                  cursor: isActive ? "default" : "pointer",
                }}
              >
                <img
                  src={item.img}
                  alt={item.titleLine1}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.68) 60%, rgba(0,0,0,0.96) 100%)",
                    pointerEvents: "none",
                    zIndex: 10,
                  }}
                />

                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    padding: "20px 18px 22px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    textAlign: "center",
                    zIndex: 20,
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0px)" : "translateY(16px)",
                    transition: "opacity 500ms ease, transform 500ms ease",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  {item.tag && (
                    <div style={{ textAlign: "right", width: "100%", paddingRight: "4px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          letterSpacing: "0.06em",
                          color: "rgba(255,255,255,0.9)",
                          textShadow: "0 2px 6px rgba(0,0,0,0.8)",
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      marginTop: "auto",
                      paddingBottom: "4px",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 900,
                        letterSpacing: "0.02em",
                        color: "#ffffff",
                        margin: 0,
                        lineHeight: 1.15,
                        textShadow: "0 3px 12px rgba(0,0,0,0.95)",
                      }}
                    >
                      {item.titleLine1}
                    </h2>
                    {item.titleLine2 && (
                      <span
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          letterSpacing: "0.04em",
                          color: "#f3f0ea",
                          lineHeight: 1.2,
                          textShadow: "0 3px 10px rgba(0,0,0,0.9)",
                        }}
                      >
                        {item.titleLine2}
                      </span>
                    )}
                    <div
                      style={{
                        width: "36px",
                        height: "2px",
                        backgroundColor: "#c5a880",
                        borderRadius: "2px",
                        margin: "6px auto 5px",
                        boxShadow: "0 0 8px rgba(197,168,128,0.7)",
                      }}
                    />
                    {item.desc && (
                      <p
                        style={{
                          fontSize: "0.82rem",
                          fontStyle: "italic",
                          color: "rgba(255,255,255,0.9)",
                          maxWidth: "280px",
                          margin: "0 0 12px",
                          lineHeight: 1.35,
                          textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                        }}
                      >
                        {item.desc}
                      </p>
                    )}
                    <a
                      href={item.ctaUrl || "blog.html"}
                      onClick={(e) => {
                        if (onCtaClick) {
                          e.preventDefault();
                          onCtaClick(item);
                        }
                      }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "8px 20px",
                        borderRadius: "9999px",
                        background: "linear-gradient(135deg, #c5a880 0%, #a48256 100%)",
                        color: "#110d0c",
                        fontSize: "0.74rem",
                        fontWeight: 800,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        boxShadow: "0 4px 14px rgba(0,0,0,0.4), 0 0 15px rgba(197,168,128,0.3)",
                        cursor: "pointer",
                        transition: "transform 200ms ease, box-shadow 200ms ease",
                      }}
                    >
                      <span>{item.ctaText || "სტატიის ნახვა"}</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Prev / Next Buttons */}
        {/* Prev / Next Buttons with rich frosted navy styling */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          style={{
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "rgba(28, 61, 99, 0.82)",
            border: "1px solid rgba(224, 172, 107, 0.45)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(12px)",
            cursor: "pointer",
            boxShadow: "0 10px 25px rgba(28, 61, 99, 0.4)",
            zIndex: 40,
            transition: "all 200ms ease",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "rgba(28, 61, 99, 0.82)",
            border: "1px solid rgba(224, 172, 107, 0.45)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(12px)",
            cursor: "pointer",
            boxShadow: "0 10px 25px rgba(28, 61, 99, 0.4)",
            zIndex: 40,
            transition: "all 200ms ease",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>

        {/* Dots Navigation */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            zIndex: 30,
          }}
        >
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                height: "8px",
                width: i === currentIndex ? "28px" : "8px",
                borderRadius: "9999px",
                backgroundColor:
                  i === currentIndex ? "#1C3D63" : "rgba(28, 61, 99, 0.3)",
                border: i === currentIndex ? "1px solid #E0AC6B" : "none",
                cursor: "pointer",
                boxShadow:
                  i === currentIndex ? "0 0 12px rgba(28, 61, 99, 0.6)" : "none",
                transition: "all 300ms ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoverFlowCarousel;
