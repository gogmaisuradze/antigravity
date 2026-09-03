import React from "react";
import { createRoot } from "react-dom/client";
import { TestimonialsColumn, TestimonialItem } from "./components/ui/testimonials-columns-1";

export const blogArticles: TestimonialItem[] = [
  {
    name: "სიჩუმის ხელოვნება თანამედროვე ქაოსში",
    role: "15 მარტი, 2024",
    category: "თვითგანვითარება",
    text: "როგორ მოვძებნოთ სიმშვიდე იქ, სადაც ხმაური არასდროს წყდება? ჩვენი პირველი ნაბიჯები შინაგანი დიალოგისკენ იწყება არა ხმამაღალი განცხადებებით, არამედ სიჩუმით.",
    image: "/blog_silence.png",
    url: "blog.html",
  },
  {
    name: "ცვლილებების შიში და მათი მიღება",
    role: "10 მარტი, 2024",
    category: "ტრანსფორმაცია",
    text: "ყოველი დიდი ცვლილება იწყება იმის აღიარებით, რომ ძველი გზები აღარ მუშაობს. როგორ გადავაქციოთ შიში ზრდის მამოძრავებელ ძალად?",
    image: "/blog_transformation.png",
    url: "blog.html",
  },
  {
    name: "ბალანსი სხეულსა და გონებას შორის",
    role: "5 მარტი, 2024",
    category: "ჰარმონია",
    text: "პრაქტიკული სავარჯიშოები ყოველდღიური მენტალური ჰიგიენისთვის. ისწავლეთ როგორ მოუსმინოთ თქვენი სხეულის პირველად სიგნალებს.",
    image: "/blog_balance.png",
    url: "blog.html",
  },
  {
    name: "ხედვის წერტილი: საკუთარი თავის აღმოჩენა",
    role: "28 თებერვალი, 2024",
    category: "თვითგანვითარება",
    text: "ვინ ვართ ჩვენ სოციალური როლების მიღმა? მოგზაურობა საკუთარი მე-ს ყველაზე დაფარულ, ჭეშმარიტ კუთხეებში.",
    image: "/blog_discovery.png",
    url: "blog.html",
  },
  {
    name: "პოზიტიური ფსიქოთერაპია და თანამედროვეობა",
    role: "20 თებერვალი, 2024",
    category: "ფსიქოლოგია",
    text: "როგორ უკავშირდება პოზიტიური ფსიქოთერაპია ჩვენს დღევანდელ ყოფას და რატომ არის მნიშვნელოვანი შინაგანი რესურსების გააზრება.",
    image: "/blog_positive_psych.png",
    url: "blog.html",
  },
  {
    name: "გაცნობიერებული ყოფიერება",
    role: "14 თებერვალი, 2024",
    category: "მედიტაცია",
    text: "მედიტაცია არაა გაქცევა, ესაა დაბრუნება საკუთარ თავთან. პრაქტიკები, რომლებიც დაგეხმარებათ აწმყოში დარჩენასა და სიმშვიდის პოვნაში.",
    image: "/blog_mindfulness.png",
    url: "blog.html",
  },
];

const col1 = [blogArticles[0], blogArticles[1], blogArticles[2]];
const col2 = [blogArticles[3], blogArticles[4], blogArticles[5]];
const col3 = [blogArticles[1], blogArticles[3], blogArticles[0], blogArticles[5]];

export function initNewsMarquee() {
  const container = document.getElementById("news-columns-marquee-root");
  if (container && !container.dataset.mounted) {
    container.dataset.mounted = "true";
    const root = createRoot(container);
    root.render(
      <div className="w-full relative">
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] max-h-[640px] overflow-hidden py-4">
          <TestimonialsColumn testimonials={col1} duration={22} className="w-full max-w-sm" />
          <TestimonialsColumn testimonials={col2} duration={28} className="hidden md:block w-full max-w-sm" />
          <TestimonialsColumn testimonials={col3} duration={24} className="hidden lg:block w-full max-w-sm" />
        </div>
      </div>
    );
  }
}
