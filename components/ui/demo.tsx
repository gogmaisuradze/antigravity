import React from "react";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";

const teamTestimonials = [
  {
    quote:
      "ინდივიდუალური და ეგზისტენციალური ფსიქოთერაპიის სპეციალისტი. მრავალწლიანი პრაქტიკული გამოცდილება სიღრმისეულ კლინიკურ მუშაობაში.",
    name: "მამუკა ბადრიძე",
    designation: "ფსიქოთერაპევტი, დირექტორი",
    src: "/team_abstract_1.png",
  },
  {
    quote:
      "პრაქტიკული ფსიქოლოგიისა და სასწავლო მეთოდოლოგიის ექსპერტი. პოზიტიური ფსიქოთერაპიის საერთაშორისო მასტერ-ტრენერი.",
    name: "ეკატერინე დოკუნოვა",
    designation: "ფსიქოლოგი, ლექტორი",
    src: "/team_abstract_2.png",
  },
  {
    quote:
      "ტრანსკულტურალური კომუნიკაციისა და საერთაშორისო პროგრამების ხელმძღვანელი. სამედიცინო და ფსიქოთერაპიული მიდგომების სინთეზი.",
    name: "მაქსიმ ჩეკმარიოვი",
    designation: "ფსიქოლოგი, წამყვანი ლექტორი",
    src: "/team_abstract_3.png",
  },
];

export const CircularTestimonialsDemo = () => (
  <section className="py-8">
    <div className="bg-white/80 border border-[#D8C4B6] backdrop-blur-xl p-6 sm:p-10 rounded-3xl shadow-sm min-h-[300px] flex items-center justify-center relative">
      <CircularTestimonials
        testimonials={teamTestimonials}
        autoplay={true}
        colors={{
          name: "#1C3D63",
          designation: "#3B5E63",
          testimony: "#222222",
          arrowBackground: "#1C3D63",
          arrowForeground: "#FAF7F2",
          arrowHoverBackground: "#E0AC6B",
        }}
        fontSizes={{
          name: "28px",
          designation: "14px",
          quote: "17px",
        }}
      />
    </div>
  </section>
);

export default CircularTestimonialsDemo;
