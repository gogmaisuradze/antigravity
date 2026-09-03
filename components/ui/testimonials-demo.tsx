import React from "react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { blogArticles } from "@/src/news-marquee-mount";

const col1 = blogArticles.slice(0, 3);
const col2 = blogArticles.slice(3, 6);

export const TestimonialsDemo = () => {
  return (
    <section className="bg-white/80 border border-[#D8C4B6] p-8 rounded-3xl my-10 relative">
      <div className="container mx-auto">
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[640px] overflow-hidden">
          <TestimonialsColumn testimonials={col1} duration={20} />
          <TestimonialsColumn testimonials={col2} className="hidden md:block" duration={25} />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsDemo;
