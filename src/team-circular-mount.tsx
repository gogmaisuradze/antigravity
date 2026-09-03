import React from "react";
import { createRoot } from "react-dom/client";
import { CircularTestimonials } from "./components/ui/circular-testimonials";

export const teamMembers = [
  {
    name: "მამუკა ბადრიძე",
    designation: "ფსიქოთერაპევტი, დირექტორი",
    quote: "ინდივიდუალური და ეგზისტენციალური ფსიქოთერაპიის სპეციალისტი. 15-წლიანი პრაქტიკული გამოცდილება სიღრმისეულ კლინიკურ მუშაობასა და ადამიანური რესურსების განვითარებაში.",
    src: "/team_abstract_1.png",
  },
  {
    name: "ეკატერინე დოკუნოვა",
    designation: "პოზიტიური ფსიქოთერაპევტი, ტრენერი",
    quote: "პრაქტიკული ფსიქოლოგიისა და სასწავლო მეთოდოლოგიის ექსპერტი. პოზიტიური ფსიქოთერაპიის საერთაშორისო მასტერ-ტრენერი WAPP-ის აკრედიტაციით.",
    src: "/team_abstract_2.png",
  },
  {
    name: "მაქსიმ ჩეკმარიოვი",
    designation: "წამყვანი ფსიქოთერაპევტი, ექიმი",
    quote: "ტრანსკულტურალური კომუნიკაციისა და საერთაშორისო პროგრამების ხელმძღვანელი. სამედიცინო და ფსიქოთერაპიული მიდგომების სინთეზი პიროვნული ჰარმონიისთვის.",
    src: "/team_abstract_3.png",
  },
];

export function initTeamCircularSlider() {
  const containers = document.querySelectorAll<HTMLElement>("#circular-team-slider-root");
  containers.forEach((container) => {
    if (container && !container.dataset.mounted) {
      container.dataset.mounted = "true";
      const root = createRoot(container);
      root.render(
        <div className="w-full bg-white/75 backdrop-blur-2xl rounded-3xl border border-[#D8C4B6] shadow-[0_15px_45px_rgba(28,61,99,0.06)] overflow-hidden">
          <CircularTestimonials
            testimonials={teamMembers}
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
              name: "2rem",
              designation: "0.875rem",
              quote: "1.05rem",
            }}
          />
        </div>
      );
    }
  });
}
