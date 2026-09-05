import React from "react";
import { createRoot } from "react-dom/client";
import { TestimonialsColumn, TestimonialItem } from "./components/ui/testimonials-columns-1";

export const galleryItems: TestimonialItem[] = [
  {
    name: "ინდივიდუალური თერაპიის სივრცე",
    role: "სრული ხმის იზოლაცია და მყუდრო გარემო",
    category: "თერაპიული სივრცე",
    text: "ინდივიდუალური თერაპიისა და კონსულტაციის ოთახი. ერგონომიული კომფორტი და ჰარმონიული გარემო ღრმა ინტროსპექციისთვის.",
    image: "/team_tamar.png",
    url: "gallery.html",
  },
  {
    name: "არტთერაპიის სტუდია",
    role: "შემოქმედებითი თავისუფლების კუთხე",
    category: "შემოქმედება",
    text: "პროფესიული სამუშაო მასალები, თიხა, ფერები და თავისუფალი თვითგამოხატვის სივრცე არტთერაპიული ჯგუფებისთვის.",
    image: "/images/education-art.jpg",
    url: "gallery.html",
  },
  {
    name: "სასწავლო აუდიტორია & დარბაზი",
    role: "WAPP & ერიქსონის აკადემია",
    category: "განათლება",
    text: "თანამედროვე ინტერაქტიული სასწავლო სივრცე საერთაშორისო სემინარების, პრაქტიკული ვორქშოფებისა და ლექციებისთვის.",
    image: "/education_hero.png",
    url: "gallery.html",
  },
  {
    name: "ფსიქოლოგიური ბიბლიოთეკა და ლაუნჯი",
    role: "პროფესიული ლიტერატურა & მოსასვენებელი ზონა",
    category: "ცოდნის სივრცე",
    text: "კლასიკური და თანამედროვე ფსიქოთერაპიული ლიტერატურა, სამეცნიერო ჟურნალები და მყუდრო ზონა კოლეგიალური დისკუსიებისთვის.",
    image: "/services_hero.png",
    url: "gallery.html",
  },
  {
    name: "ჯგუფური თერაპიისა და სემინარების სივრცე",
    role: "ტრენინგ-სივრცე 15-20 მონაწილეზე",
    category: "ჯგუფური მუშაობა",
    text: "ღია და მეგობრული ატმოსფერო ინტერაქტიული სავარჯიშოებისთვის, როლური თამაშებისა და ჯგუფური დინამიკის მართვისთვის.",
    image: "/education_variant2.png",
    url: "gallery.html",
  },
  {
    name: "სუპერვიზიისა და ქოუჩინგის კაბინეტი",
    role: "პერსონალური განვითარების ზონა",
    category: "ქოუჩინგი & სუპერვიზია",
    text: "სპეციალიზებული კაბინეტი ექსკლუზიური 1-on-1 მენტორობისთვის, ICF ქოუჩინგისა და საერთაშორისო სუპერვიზიის სესიებისთვის.",
    image: "/education_variant3.png",
    url: "gallery.html",
  },
  {
    name: "მედიტაციისა და რელაქსაციის კუთხე",
    role: "შინაგანი ბალანსი და დასვენება",
    category: "რელაქსაცია",
    text: "მყუდრო გარემო სესიებს შორის ემოციური განტვირთვისთვის, ჩაის კუთხე და მშვიდი მუსიკა.",
    image: "/education_variant4.png",
    url: "gallery.html",
  },
];

const col1 = [galleryItems[0], galleryItems[1], galleryItems[4]];
const col2 = [galleryItems[2], galleryItems[3], galleryItems[6]];
const col3 = [galleryItems[5], galleryItems[0], galleryItems[2]];

export function initAboutGalleryMarquee() {
  const container = document.getElementById("about-gallery-marquee-root");
  if (container && !container.dataset.mounted) {
    container.dataset.mounted = "true";
    const root = createRoot(container);
    root.render(
      <div className="w-full relative">
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] max-h-[660px] overflow-hidden py-4">
          <TestimonialsColumn testimonials={col1} duration={22} className="w-full max-w-sm" />
          <TestimonialsColumn testimonials={col2} duration={28} className="hidden md:block w-full max-w-sm" />
          <TestimonialsColumn testimonials={col3} duration={25} className="hidden lg:block w-full max-w-sm" />
        </div>
      </div>
    );
  }
}
