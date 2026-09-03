"use client";
import React from "react";
import { motion } from "motion/react";

export interface TestimonialItem {
  text: string;
  image: string;
  name: string;
  role: string;
  category?: string;
  url?: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role, category, url }, i) => (
                <div
                  className="p-6 sm:p-7 rounded-3xl border border-[#D8C4B6] bg-white/95 shadow-[0_10px_30px_rgba(28,61,99,0.06)] hover:border-[#1C3D63] hover:shadow-[0_15px_35px_rgba(28,61,99,0.12)] transition-all duration-300 max-w-sm w-full cursor-pointer group"
                  key={i}
                  onClick={() => {
                    if (url) window.location.href = url;
                    else window.location.href = "blog.html";
                  }}
                >
                  {image && (
                    <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-[#FAF7F2] border border-[#D8C4B6]/60">
                      <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}
                  {category && (
                    <div className="mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#E0AC6B] bg-[#E0AC6B]/15 border border-[#E0AC6B]/30 px-2.5 py-1 rounded-lg">
                        {category}
                      </span>
                    </div>
                  )}
                  <h3 className="text-base sm:text-lg font-headline italic font-bold text-[#1C3D63] group-hover:text-[#3B5E63] transition-colors leading-snug mb-2">
                    {name}
                  </h3>
                  <div className="text-xs text-[#222222] font-light leading-relaxed line-clamp-3 mb-4">
                    {text}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#D8C4B6]/50">
                    <div className="text-[11px] text-[#8E8276] font-medium">{role}</div>
                    <span className="text-xs font-bold text-[#1C3D63] group-hover:text-[#E0AC6B] group-hover:translate-x-1 transition-all flex items-center gap-1">
                      <span>წაკითხვა</span>
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </span>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

export default TestimonialsColumn;
