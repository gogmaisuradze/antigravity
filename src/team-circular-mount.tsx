import React from "react";
import { createRoot } from "react-dom/client";
import { CircularTestimonials } from "./components/ui/circular-testimonials";

export const teamMembers = [
  {
    name: "მამუკა ბადრიძე",
    designation: "ფსიქოთერაპევტი",
    quote: "სისტემური და ოჯახური ფსიქოთერაპიის სპეციალისტი. მუშაობს ურთიერთობის კრიზისებზე, ოჯახურ დინამიკასა და პიროვნულ ბალანსზე 12-წლიანი გამოცდილებით.",
    src: "/team_mamuka.png",
  },
  {
    name: "ეკატერინე დოკუნოვა",
    designation: "ფსიქოლოგი, ლექტორი",
    quote: "WAPP-ის სერტიფიცირებული პოზიტიური ფსიქოთერაპევტი. უძღვება აკადემიურ და პრაქტიკულ მოდულებს, ემოციური რეგულაციისა და თვითშემეცნების პროგრამებს.",
    src: "/team_abstract_2.png",
  },
  {
    name: "მაქსიმ ჩეკმარიოვი",
    designation: "ფსიქიატრი, WAPP ტრენერი",
    quote: "საერთაშორისო დონის ექსპერტი ფსიქიატრიასა და ფსიქოთერაპიაში. მსოფლიო ასოციაციის მასტერ-ტრენერი და სამეცნიერო პუბლიკაციების ავტორი.",
    src: "/team_abstract_3.png",
  },
  {
    name: "სოფიო ნიკოლაიშვილი",
    designation: "არტთერაპევტი, მენტორი",
    quote: "არტთერაპიის 1-წლიანი სასერტიფიკატო კურსის წამყვანი. შემოქმედებითი მეთოდებით ქვეცნობიერი ბლოკებისა და სტრესის ტრანსფორმაციის პრაქტიკოსი.",
    src: "/images/team_sophio.jpg",
  },
  {
    name: "დავით კაპანაძე",
    designation: "Executive & Life Coach",
    quote: "ერიქსონის ქოუჩინგის საერთაშორისო აკადემიის კურსდამთავრებული (ICF). სპეციალიზდება ლიდერობის განვითარებასა და პიროვნული მიზნების რეალიზაციაზე.",
    src: "/team_davit.png",
  },
  {
    name: "თამარ გიორგაძე",
    designation: "ბავშვთა და მოზარდთა ფსიქოლოგი",
    quote: "მუშაობს მოზარდების ემოციურ და ქცევით სირთულეებზე, მშობლებთან კომუნიკაციისა და ასაკობრივი კრიზისების გადალახვაზე.",
    src: "/images/team_tamar_new.jpg",
  },
];

export function initTeamCircularSlider() {
  const containers = document.querySelectorAll<HTMLElement>(
    "#circular-team-slider-root, .circular-team-slider-root"
  );
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
