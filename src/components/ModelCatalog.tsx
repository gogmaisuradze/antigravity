import React from "react";
import { CalculationType } from "../types";
import { Sparkles, Target, Grid3x3, Hash, BrainCircuit, Moon, Compass, Users, ArrowRight, CheckCircle2 } from "lucide-react";

export interface ModelCatalogItem {
  id: CalculationType;
  numeral: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

export const CATALOG_MODELS: ModelCatalogItem[] = [
  {
    id: CalculationType.HOROSCOPE,
    numeral: "I",
    title: "დასავლური ჰოროსკოპი",
    subtitle: "ზოდიაქო, სტიქიები და ასპექტები",
    description: "პლანეტარული კონფიგურაცია, პიროვნების ბირთვი, სტიქიათა ბალანსი და კოსმოსური ტენდენციები.",
    icon: <Sparkles className="w-5 h-5 text-[#E0AC6B]" />,
    tags: ["ზოდიაქო", "ასტროლოგია", "სტიქიები"],
  },
  {
    id: CalculationType.ENNEAGRAM,
    numeral: "II",
    title: "ენიაგრამა",
    subtitle: "პიროვნების 9 ფსიქოტიპი",
    description: "თქვენი დომინანტური ტიპი, არაცნობიერი მოტივაციები, ძირითადი შიშები და სულიერი ზრდის გზები.",
    icon: <Target className="w-5 h-5 text-[#E0AC6B]" />,
    tags: ["ფსიქოტიპები", "მოტივაცია", "შიშები"],
  },
  {
    id: CalculationType.PSYCHOMATRIX,
    numeral: "III",
    title: "პითაგორას ფსიქომატრიცა",
    subtitle: "ციფრული ანალიზი & პოტენციალი",
    description: "დაბადების თარიღის კოდი: ენერგეტიკული რესურსი, ხასიათი, ინტელექტი, ჯანმრთელობა და ნიჭი.",
    icon: <Grid3x3 className="w-5 h-5 text-[#E0AC6B]" />,
    tags: ["მატრიცა", "პითაგორა", "ენერგია"],
  },
  {
    id: CalculationType.NUMEROLOGY,
    numeral: "IV",
    title: "ნუმეროლოგია",
    subtitle: "ბედისწერის კოდი & მისია",
    description: "ცხოვრებისეული გზის მთავარი რიცხვი, სულის მისია, კარმული ამოცანები და პერიოდების ციკლები.",
    icon: <Hash className="w-5 h-5 text-[#E0AC6B]" />,
    tags: ["ბედისწერა", "მისია", "ვიბრაცია"],
  },
  {
    id: CalculationType.HUMAN_DESIGN,
    numeral: "V",
    title: "ადამიანის დიზაინი",
    subtitle: "Human Design — ენერგეტიკული რუკა",
    description: "ენერგეტიკული ტიპი (გენერატორი, პროექტორი...), პროფილი, შინაგანი ავტორიტეტი და სწორი სტრატეგია.",
    icon: <BrainCircuit className="w-5 h-5 text-[#E0AC6B]" />,
    tags: ["გენერატორი", "ავტორიტეტი", "სტრატეგია"],
  },
  {
    id: CalculationType.VEDIC,
    numeral: "VI",
    title: "ვედური ასტროლოგია",
    subtitle: "ჯიოტიში & მთვარის ზოდიაქო",
    description: "სიღრმისეული კარმული ვალდებულებები, ნაკშატრები, მთვარის ნიშანი და ცხოვრებისეული ციკლები (დაშები).",
    icon: <Moon className="w-5 h-5 text-[#E0AC6B]" />,
    tags: ["ჯიოტიში", "კარმა", "ნაკშატრა"],
  },
  {
    id: CalculationType.BAZI,
    numeral: "VII",
    title: "ბა-ძი (BaZi)",
    subtitle: "ჩინური მეტაფიზიკა & 4 სვეტი",
    description: "ბედისწერის 4 სვეტი (წელი, თვე, დღე, საათი), დღის მბრძანებელი და 5 ელემენტის ურთიერთქმედება.",
    icon: <Compass className="w-5 h-5 text-[#E0AC6B]" />,
    tags: ["4 სვეტი", "5 ელემენტი", "მეტაფიზიკა"],
  },
  {
    id: CalculationType.ARCHETYPE,
    numeral: "VIII",
    title: "არქეტიპული ანალიზი",
    subtitle: "იუნგის 12 არქეტიპი & ჩრდილი",
    description: "კარლ გუსტავ იუნგის ფსიქოარქეტიპები, ქვეცნობიერი როლები და ჩრდილოვანი მხარის ტრანსფორმაცია.",
    icon: <Users className="w-5 h-5 text-[#E0AC6B]" />,
    tags: ["იუნგი", "არქეტიპი", "ჩრდილი"],
  },
];

interface ModelCatalogProps {
  onSelect: (type: CalculationType) => void;
  selectedType: CalculationType | null;
  preferredTheme?: string | null;
}

export const ModelCatalog: React.FC<ModelCatalogProps> = ({
  onSelect,
  selectedType,
  preferredTheme,
}) => {
  return (
    <div id="model-catalog-section" className="w-full space-y-6 font-sans text-left">
      {/* Catalog Header */}
      <div className="bg-white border border-[#D8C4B6] p-6 sm:p-8 rounded-2xl shadow-sm relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2.5">
            <span className="material-symbols-outlined text-[#E0AC6B] text-2xl">menu_book</span>
            <h3 className="text-base sm:text-lg font-bold uppercase tracking-wide text-[#1C3D63] font-headline">
              აიდი მოდელების სარჩევი
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#3B5E63] font-light leading-relaxed">
            აირჩიეთ თქვენთვის სასურველი მოდელი და მიიღეთ სიღრმისეული, პერსონალური AI ანალიზი
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <span className="px-3 py-1 bg-[#F4F7F7] border border-[#D8C4B6] rounded-xl text-[11px] font-bold text-[#1C3D63] font-headline uppercase tracking-wider">
            სულ 8 მოდელი
          </span>
        </div>
      </div>

      {/* Grid of Catalog Models */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {CATALOG_MODELS.map((model) => {
          const isSelected = selectedType === model.id;
          const isPreferred = preferredTheme === model.id;

          return (
            <div
              key={model.id}
              onClick={() => onSelect(model.id)}
              className={`group relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden text-left shadow-sm hover:shadow-md ${
                isSelected
                  ? "bg-white border-2 border-[#1C3D63] shadow-md ring-2 ring-[#1C3D63]/10"
                  : "bg-white hover:bg-[#FAF8F5] border-[#D8C4B6] hover:border-[#1C3D63]/70"
              }`}
            >
              {/* Top Accent line on selected */}
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#1C3D63]"></div>
              )}

              <div>
                {/* Top Row: Numeral, Badges & Icon */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-[#F4F7F7] border border-[#D8C4B6] flex items-center justify-center text-xs font-bold text-[#1C3D63] font-headline group-hover:bg-[#1C3D63] group-hover:text-white transition-colors">
                      {model.numeral}
                    </span>
                    {isPreferred && (
                      <span className="px-2.5 py-0.5 bg-[#E0AC6B]/15 border border-[#E0AC6B]/40 text-[#1C3D63] text-[10px] font-bold uppercase rounded-full tracking-wider font-sans">
                        არჩეული
                      </span>
                    )}
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] border border-[#D8C4B6]/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {model.icon}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h4 className="text-base font-bold font-headline text-[#1C3D63] group-hover:text-[#254F7F] transition-colors mb-1 tracking-wide">
                  {model.title}
                </h4>
                <p className="text-[11px] font-semibold text-[#E0AC6B] uppercase tracking-wider mb-2.5 font-headline">
                  {model.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs text-[#3B5E63] font-light leading-relaxed mb-4 line-clamp-2">
                  {model.description}
                </p>
              </div>

              {/* Bottom Footer: Tags & Start Action */}
              <div className="pt-3 border-t border-[#D8C4B6]/50 flex items-center justify-between">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {model.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] bg-[#F4F7F7] text-[#8E8276] px-2 py-0.5 rounded-md border border-[#D8C4B6]/40 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-[#1C3D63] group-hover:text-[#254F7F] uppercase tracking-wider shrink-0 font-headline pl-2">
                  <span>{isSelected ? "აქტიურია" : "შესვლა"}</span>
                  {isSelected ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-[#E0AC6B] group-hover:translate-x-1 transition-transform" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
