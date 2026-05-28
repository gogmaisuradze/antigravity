document.addEventListener("DOMContentLoaded",()=>{I(),T(),M(),B(),A(),C(),H(),q(),S(),_(),j(),K()});function I(){const e=document.getElementById("mobile-menu-btn"),t=document.getElementById("mobile-menu");e&&t&&(e.addEventListener("click",s=>{s.stopPropagation(),t.classList.toggle("hidden");const a=e.querySelector("span");a&&(t.classList.contains("hidden")?a.textContent="menu":a.textContent="close")}),document.addEventListener("click",s=>{if(!t.contains(s.target)&&s.target!==e){t.classList.add("hidden");const a=e.querySelector("span");a&&(a.textContent="menu")}}))}function T(){document.body.insertAdjacentHTML("beforeend",`
    <div id="booking-modal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md opacity-0 pointer-events-none transition-all duration-300">
      <div class="bg-surface-container-low p-10 md:p-12 rounded-[2rem] shadow-[0px_40px_80px_rgba(0,0,0,0.85)] border border-outline-variant/10 max-w-2xl w-full relative hover-glow transition-all duration-500 transform scale-95 max-h-[90vh] overflow-y-auto" id="booking-modal-card">
        <button id="close-modal-btn" class="absolute top-6 right-6 text-[#c6c6ce] hover:text-secondary transition-colors focus:outline-none z-50">
          <span class="material-symbols-outlined text-3xl">close</span>
        </button>
        
        <div class="mb-10 text-left relative flex items-start justify-between">
          <div>
            <h2 class="text-3xl font-headline italic text-on-surface">სესიის დაჯავშნა</h2>
            <p class="text-sm text-outline-variant mt-2">შეავსეთ ფორმა და ჩვენი ადმინისტრატორი მალე დაგიკავშირდებათ</p>
          </div>
          <div class="bg-secondary/10 border border-secondary/20 p-3.5 rounded-2xl hidden sm:flex items-center justify-center text-secondary shadow-lg">
            <span class="material-symbols-outlined text-3xl" style='font-variation-settings: "FILL" 1;'>edit_calendar</span>
          </div>
        </div>
        
        <form class="space-y-8 contact-form" id="booking-modal-form">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-2">
              <label class="text-xs text-outline-variant tracking-widest uppercase ml-1">სახელი და გვარი</label>
              <input type="text" required class="w-full bg-surface-container-lowest border-none border-b border-outline-variant/30 focus:border-secondary focus:ring-0 transition-all py-4 px-0 text-on-surface placeholder:text-outline-variant/50" placeholder="თქვენი სახელი"/>
            </div>
            <div class="space-y-2">
              <label class="text-xs text-outline-variant tracking-widest uppercase ml-1">ტელეფონი</label>
              <input type="tel" required class="w-full bg-surface-container-lowest border-none border-b border-outline-variant/30 focus:border-secondary focus:ring-0 transition-all py-4 px-0 text-on-surface placeholder:text-outline-variant/50" placeholder="+995"/>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-2">
              <label class="text-xs text-outline-variant tracking-widest uppercase ml-1">სერვისი</label>
              <select class="w-full bg-surface-container-lowest border-none border-b border-outline-variant/30 focus:border-secondary focus:ring-0 transition-all py-4 px-0 text-on-surface appearance-none">
                <option>ინდივიდუალური თერაპია</option>
                <option>წყვილთა თერაპია</option>
                <option>ჯგუფური თერაპია</option>
                <option>კონსულტაცია</option>
                <option>ქოუჩინგი</option>
                <option>ჯგუფური ქოუჩინგი</option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="text-xs text-outline-variant tracking-widest uppercase ml-1">თარიღი</label>
              <input type="date" required class="w-full bg-surface-container-lowest border-none border-b border-outline-variant/30 focus:border-secondary focus:ring-0 transition-all py-4 px-0 text-on-surface" style="color-scheme: dark;"/>
            </div>
          </div>
          
          <div class="space-y-2">
            <label class="text-xs text-outline-variant tracking-widest uppercase ml-1">მოკლე შეტყობინება</label>
            <textarea rows="3" required class="w-full bg-surface-container-lowest border-none border-b border-outline-variant/30 focus:border-secondary focus:ring-0 transition-all py-4 px-0 text-on-surface placeholder:text-outline-variant/50 resize-none" placeholder="დაგვიწერეთ მოკლედ თქვენი მოთხოვნის შესახებ..."></textarea>
          </div>
          
          <div class="pt-6">
            <button type="submit" class="w-full bg-secondary-container text-on-secondary-container py-5 rounded-xl font-semibold text-lg hover:brightness-110 active:scale-98 transition-all duration-300 shadow-xl flex items-center justify-center gap-3">
              დაჯავშნა
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </form>
        
        <div class="relative flex py-6 items-center">
          <div class="flex-grow border-t border-[#45464d]/20"></div>
          <span class="flex-shrink mx-4 text-xs text-outline-variant tracking-wider uppercase font-semibold text-outline-variant/60">ან დაჯავშნე პირდაპირ</span>
          <div class="flex-grow border-t border-[#45464d]/20"></div>
        </div>
        
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <!-- Telegram -->
          <a href="https://t.me/IDCPositivepsychotherapybot" target="_blank" class="flex flex-col items-center justify-center bg-white/5 border border-white/10 hover:bg-[#f1bf62]/10 hover:border-[#f1bf62]/35 hover:text-[#f1bf62] text-[#c6c6ce] py-3.5 px-2 rounded-xl transition-all gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.15)] group">
            <svg class="w-6 h-6 fill-current group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.89 1.2-5.33 3.52-.5.35-.96.52-1.37.51-.45-.01-1.32-.26-1.97-.47-.8-.26-1.43-.4-1.38-.85.03-.24.36-.49.99-.75 3.86-1.68 6.43-2.78 7.72-3.3 3.67-1.49 4.43-1.75 4.93-1.76.11 0 .36.03.52.16.13.11.17.26.19.37z"/>
            </svg>
            <span class="text-[10px] sm:text-xs font-semibold tracking-wide">Telegram</span>
          </a>

          <!-- Facebook -->
          <a href="https://www.facebook.com/IDCgeorgia" target="_blank" class="flex flex-col items-center justify-center bg-white/5 border border-white/10 hover:bg-[#f1bf62]/10 hover:border-[#f1bf62]/35 hover:text-[#f1bf62] text-[#c6c6ce] py-3.5 px-2 rounded-xl transition-all gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.15)] group">
            <svg class="w-6 h-6 fill-current group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span class="text-[10px] sm:text-xs font-semibold tracking-wide">Facebook</span>
          </a>

          <!-- Instagram -->
          <a href="https://www.instagram.com/idcgeo/" target="_blank" class="flex flex-col items-center justify-center bg-white/5 border border-white/10 hover:bg-[#f1bf62]/10 hover:border-[#f1bf62]/35 hover:text-[#f1bf62] text-[#c6c6ce] py-3.5 px-2 rounded-xl transition-all gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.15)] group">
            <svg class="w-6 h-6 fill-current group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            <span class="text-[10px] sm:text-xs font-semibold tracking-wide">Instagram</span>
          </a>

          <!-- WhatsApp -->
          <a href="https://wa.me/995598324020" target="_blank" class="flex flex-col items-center justify-center bg-white/5 border border-white/10 hover:bg-[#f1bf62]/10 hover:border-[#f1bf62]/35 hover:text-[#f1bf62] text-[#c6c6ce] py-3.5 px-2 rounded-xl transition-all gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.15)] group">
            <svg class="w-6 h-6 fill-current group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.249 8.477 3.517 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.197 1.45 4.817 1.451 5.4 0 9.794-4.394 9.798-9.794.002-2.617-1.018-5.077-2.873-6.932-1.854-1.854-4.312-2.873-6.924-2.874-5.405 0-9.799 4.393-9.802 9.794-.001 1.705.454 3.371 1.316 4.856l-.993 3.63 3.731-.979zm11.238-6.84c-.266-.134-1.582-.78-1.83-.87-.247-.089-.427-.134-.607.135-.18.267-.697.87-.852 1.047-.157.178-.314.2-.58.067-.266-.134-1.127-.415-2.147-1.325-.793-.706-1.33-1.579-1.485-1.846-.157-.267-.017-.411.117-.544.12-.12.267-.312.4-.467.133-.156.177-.267.266-.445.09-.178.044-.334-.022-.467-.067-.134-.607-1.464-.83-2.005-.218-.524-.458-.453-.628-.461-.163-.008-.349-.01-.536-.01-.186 0-.49.07-.747.347-.257.278-.98.957-.98 2.335s1.002 2.703 1.142 2.89c.14.188 1.972 3.012 4.778 4.221.668.288 1.19.46 1.597.59.67.213 1.28.183 1.761.111.537-.08 1.582-.647 1.805-1.272.223-.624.223-1.157.157-1.272-.067-.116-.247-.183-.514-.316z"/>
            </svg>
            <span class="text-[10px] sm:text-xs font-semibold tracking-wide">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  `);const t=document.getElementById("booking-modal"),s=document.getElementById("booking-modal-card"),a=document.getElementById("close-modal-btn");document.addEventListener("click",n=>{n.target&&(n.target.classList.contains("booking-btn")||n.target.closest(".booking-btn"))&&(n.preventDefault(),c())});function c(){t.classList.remove("opacity-0","pointer-events-none"),s.classList.remove("scale-95"),s.classList.add("scale-100")}function o(){t.classList.add("opacity-0","pointer-events-none"),s.classList.remove("scale-100"),s.classList.add("scale-95")}a&&a.addEventListener("click",o),t.addEventListener("click",n=>{n.target===t&&o()}),document.addEventListener("keydown",n=>{n.key==="Escape"&&o()})}function M(){const e=document.getElementById("blog-categories"),t=document.getElementById("blog-search"),s=document.getElementById("blog-grid");if(!s)return;const a=Array.from(s.querySelectorAll(".blog-post"));let c="all",o="";s.insertAdjacentHTML("beforeend",`
    <div id="no-results-panel" class="hidden col-span-full py-20 text-center animate-fade-in">
      <span class="material-symbols-outlined text-secondary text-6xl mb-4">search_off</span>
      <h4 class="text-2xl font-headline italic text-white mb-2">შედეგები არ მოიძებნა</h4>
      <p class="text-sm text-on-surface-variant max-w-sm mx-auto">სცადეთ სხვა საკვანძო სიტყვა ან შეცვალეთ კატეგორიის ფილტრი.</p>
    </div>
  `);const r=document.getElementById("no-results-panel");if(e){const d=e.querySelectorAll(".category-filter");d.forEach(i=>{i.addEventListener("click",()=>{d.forEach(p=>{p.className="category-filter text-on-surface-variant hover:text-primary transition-colors cursor-pointer"}),i.className="category-filter text-secondary border-b border-secondary pb-1 cursor-pointer hover:opacity-85 transition-opacity",c=i.getAttribute("data-category"),l()})})}t&&t.addEventListener("input",d=>{o=d.target.value.toLowerCase().trim(),l()});function l(){let d=0;a.forEach(i=>{const p=i.getAttribute("data-category"),g=i.querySelector("h3").textContent.toLowerCase(),b=i.querySelector("p").textContent.toLowerCase(),f=g.includes(o)||b.includes(o);(c==="all"||p===c)&&f?(i.style.display="flex",i.classList.add("animate-fade-in"),d++):(i.style.display="none",i.classList.remove("animate-fade-in"))}),d===0?r.classList.remove("hidden"):r.classList.add("hidden")}}function B(){document.addEventListener("invalid",n=>{(n.target.tagName==="INPUT"||n.target.tagName==="TEXTAREA"||n.target.tagName==="SELECT")&&n.target.setCustomValidity("გთხოვთ სწორად შეავსოთ ველი")},!0),document.addEventListener("input",n=>{(n.target.tagName==="INPUT"||n.target.tagName==="TEXTAREA"||n.target.tagName==="SELECT")&&n.target.setCustomValidity("")}),document.addEventListener("change",n=>{n.target.tagName==="SELECT"&&n.target.setCustomValidity("")}),document.body.insertAdjacentHTML("beforeend",`
    <div id="toast-container" class="fixed bottom-8 right-8 z-[200] transform translate-y-24 opacity-0 pointer-events-none transition-all duration-500 max-w-sm w-full">
      <div class="bg-[#1e2022] border border-[#f1bf62]/20 p-6 rounded-2xl shadow-2xl flex items-start gap-4">
        <div class="bg-[#835c00]/30 p-2 rounded-xl text-secondary">
          <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">task_alt</span>
        </div>
        <div>
          <h4 class="font-headline italic text-white text-lg">გაგზავნილია!</h4>
          <p class="text-xs text-on-surface-variant mt-1" id="toast-message">შეტყობინება წარმატებით გაიგზავნა. ჩვენ მალე დაგიკავშირდებით.</p>
        </div>
      </div>
    </div>
  `);const t=document.getElementById("toast-container"),s=document.getElementById("toast-message");function a(n){n&&(s.textContent=n),t.classList.remove("translate-y-24","opacity-0","pointer-events-none"),t.classList.add("translate-y-0","opacity-100"),setTimeout(()=>{t.classList.remove("translate-y-0","opacity-100"),t.classList.add("translate-y-24","opacity-0","pointer-events-none")},4500)}const c="8563426842:AAEuhg8EXmAV18NXtlAaiky0ZzWGvNXkJQU",o="443575738";document.addEventListener("submit",n=>{if(n.target&&(n.target.classList.contains("contact-form")||n.target.id==="booking-modal-form")){n.preventDefault();const r=n.target,l=r.querySelector('input[type="tel"]');if(l&&l.value&&l.value.replace(/\s+/g,"").length<5){alert("გთხოვთ მიუთითოთ სწორი ტელეფონის ნომერი");return}const d=r.querySelector('input[type="text"]'),i=r.querySelector('input[type="tel"]'),p=r.querySelector('input[type="date"]'),g=r.querySelector("select"),b=r.querySelector("textarea"),f={name:d?d.value:"",phone:i?i.value:"",date:p?p.value:"N/A",service:g?g.value:"ინდივიდუალური თერაპია",message:b?b.value:"",timestamp:new Date().toISOString(),sourceUrl:window.location.href};{const u=`🔔 *ახალი ჯავშანი საიტიდან!* 📅

👤 *სახელი:* ${f.name}
📞 *ტელეფონი:* ${f.phone}
📅 *თარიღი:* ${f.date}
💼 *სერვისი:* ${f.service}
✉️ *შეტყობინება:* ${f.message||"ცარიელი"}

🔗 *გვერდი:* ${f.sourceUrl}`;fetch(`https://api.telegram.org/bot${c}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:o,text:u,parse_mode:"Markdown"})}).then(x=>{x.ok||console.warn("Telegram Bot API response was not ok")}).catch(x=>{console.error("Error sending message to Telegram:",x)})}const m=document.getElementById("booking-modal");if(m&&!m.classList.contains("opacity-0")){const u=document.getElementById("close-modal-btn");u&&u.click(),a("ჯავშანი წარმატებით მიღებულია! ჩვენი ადმინისტრატორი მალე დაგიკავშირდებათ.")}else a("შეტყობინება წარმატებით გაიგზავნა! ჩვენ მალე დაგიკავშირდებით.");r.reset()}})}function A(){const e=document.createElement("div");e.className="glow-blob",e.style.background="radial-gradient(circle, rgba(241,191,98,0.2) 0%, rgba(18,20,22,0) 70%)",e.style.width="600px",e.style.height="600px",e.style.left="-100px",e.style.top="100px",e.style.position="fixed";const t=document.createElement("div");t.className="glow-blob",t.style.background="radial-gradient(circle, rgba(47,57,86,0.35) 0%, rgba(18,20,22,0) 70%)",t.style.width="800px",t.style.height="800px",t.style.right="-200px",t.style.bottom="-100px",t.style.position="fixed",document.body.appendChild(e),document.body.appendChild(t);let s=0;function a(){s+=.001;const o=Math.sin(s)*60,n=Math.cos(s)*40,r=Math.cos(s*1.3)*50,l=Math.sin(s*1.3)*70;e.style.transform=`translate(${o}px, ${n}px)`,t.style.transform=`translate(${r}px, ${l}px)`,requestAnimationFrame(a)}if(a(),window.innerWidth>768){let i=function(){o+=(r-o)*d,n+=(l-n)*d;const p=Math.sin(s)*30,g=Math.cos(s)*20;e.style.transform=`translate(${o+p}px, ${n+g}px)`,requestAnimationFrame(i)};var c=i;let o=0,n=0,r=0,l=0;const d=.05;document.addEventListener("mousemove",p=>{r=(p.clientX-window.innerWidth/2)*.15,l=(p.clientY-window.innerHeight/2)*.15}),i()}}function C(){const e=document.querySelectorAll(".reveal-hidden"),t=new IntersectionObserver(s=>{s.forEach(a=>{a.isIntersecting&&(a.target.classList.add("reveal-visible"),t.unobserve(a.target))})},{threshold:.05,rootMargin:"0px 0px -40px 0px"});e.forEach(s=>t.observe(s))}function H(){const e=document.getElementById("main-nav");e&&(window.addEventListener("scroll",()=>{window.scrollY>30?e.classList.add("nav-scrolled"):e.classList.remove("nav-scrolled")}),window.scrollY>30&&e.classList.add("nav-scrolled"))}function q(){const e=document.querySelectorAll(".methodology-pill"),t=document.getElementById("methodology-detail-card");if(!t||e.length===0)return;const s={awareness:{title:"გაცნობიერება",subtitle:"Awareness & Introspection",icon:"psychology",text:"პირველი ნაბიჯი ყოველთვის შინაგანი მდგომარეობის გაცნობიერებაა. კარმალოგიკის პრინციპებით, ჩვენ ვაკვირდებით იმ ქვეცნობიერ პროგრამებსა და ქცევებს, რომლებიც განსაზღვრავენ ჩვენს ყოველდღიურობას. საკუთარი თავის სიღრმისეული დაკვირვება იძლევა უნიკალურ ძალას შინაგანი ტრავმების ტრანსფორმაციისთვის.",quote:"„სანამ ქვეცნობიერს გააცნობიერებდე, ის მართავს შენს ცხოვრებას და შენ მას ბედისწერას უწოდებ.“ — კარლ გუსტავ იუნგი"},harmony:{title:"ჰარმონია",subtitle:"Mind-Body Integration",icon:"balance",text:"სხეულისა და გონების ჰარმონიული ერთობა. ჩვენი მიდგომა ორიენტირებულია იმაზე, რომ ადამიანმა აღმოაჩინოს ემოციური წონასწორობა. ეს მიიღწევა კოგნიტური და ეგზისტენციალური პრაქტიკების სინთეზით, რაც საგრძნობლად ამცირებს შფოთვას და გვეხმარება აწმყო მომენტში დაბრუნებაში.",quote:"„ცხოვრება არის ბალანსი გამკლავებასა და გაშვებას შორის.“"},transformation:{title:"ტრანსფორმაცია",subtitle:"Crisis to Growth",icon:"history_edu",text:"ცვლილება გარდაუვალია, მაგრამ გაცნობიერებული ტრანსფორმაცია — შეგნებული არჩევანია. ჩვენ ვეხმარებით კლიენტებს, გადალახონ ცხოვრებისეული კრიზისული პერიოდები და გარდაქმნან დაგროვილი ემოციური ტკივილი ახალ შინაგან ძალად და შემოქმედებით რესურსად.",quote:"„ყოველი დიდი ტრანსფორმაცია იწყება ძველი რეალობის ქაოსით, მაგრამ მთავრდება სულიერი სიცხადით.“"},resilience:{title:"მდგრადობა",subtitle:"Mental Resilience",icon:"diamond",text:"მყარი მენტალური საყრდენის შექმნა. ჩვენი თერაპიის უმთავრესი მიზანია კლიენტის მენტალური ჰიგიენის დამოუკიდებელი მართვა, რათა მომავალში მან მარტივად შეძლოს ცხოვრებისეული წნეხისადმი მედეგობისა და ფსიქოლოგიური სიმტკიცის შენარჩუნება.",quote:"„მდგრადობა არ ნიშნავს იმას, რომ არასოდეს დაეცემი. ეს ნიშნავს იმას, რომ ყოველთვის შეძლებ წამოდგომას.“"}};e.forEach(a=>{a.addEventListener("click",()=>{const c=a.getAttribute("data-methodology");s[c]&&(e.forEach(o=>{o.classList.remove("bg-secondary","text-on-secondary"),o.classList.add("bg-surface-container","text-on-surface-variant","hover:text-white")}),a.classList.remove("bg-surface-container","text-on-surface-variant","hover:text-white"),a.classList.add("bg-secondary","text-on-secondary"),t.style.opacity="0",t.style.transform="translateY(10px)",setTimeout(()=>{const o=s[c];t.innerHTML=`
          <div class="flex items-center gap-4 mb-6">
            <span class="material-symbols-outlined text-secondary text-4xl" style="font-variation-settings: 'FILL' 1;">${o.icon}</span>
            <div>
              <h3 class="text-2xl font-headline text-white">${o.title}</h3>
              <p class="text-xs text-outline-variant tracking-wider uppercase">${o.subtitle}</p>
            </div>
          </div>
          <p class="text-on-surface-variant leading-relaxed text-sm md:text-base font-light mb-8">${o.text}</p>
          <div class="border-t border-outline-variant/10 pt-6">
            <p class="text-secondary italic font-headline text-base md:text-lg">${o.quote}</p>
          </div>
        `,t.style.opacity="1",t.style.transform="translateY(0)"},250))})})}function S(){const e=document.querySelectorAll(".faq-item");e.length!==0&&e.forEach(t=>{const s=t.querySelector(".faq-trigger"),a=t.querySelector(".faq-content"),c=t.querySelector(".faq-icon");s&&a&&c&&s.addEventListener("click",()=>{const o=a.style.maxHeight===""||a.style.maxHeight==="0px";e.forEach(n=>{const r=n.querySelector(".faq-content"),l=n.querySelector(".faq-icon");r&&r!==a&&(r.style.maxHeight="0px",r.style.opacity="0",n.classList.remove("bg-surface-container-high/40"),l&&(l.style.transform="rotate(0deg)"))}),o?(a.style.maxHeight=a.scrollHeight+"px",a.style.opacity="1",t.classList.add("bg-surface-container-high/40"),c.style.transform="rotate(180deg)"):(a.style.maxHeight="0px",a.style.opacity="0",t.classList.remove("bg-surface-container-high/40"),c.style.transform="rotate(0deg)")})})}function _(){document.body.insertAdjacentHTML("beforeend",`
    <div id="quick-read-drawer" class="fixed inset-y-0 right-0 z-[110] w-full md:w-[650px] bg-[#1e2022] border-l border-[#45464d]/25 shadow-2xl transform translate-x-full transition-transform duration-500 ease-out overflow-y-auto pointer-events-none">
      <div class="relative p-8 md:p-12 space-y-8">
        <button id="close-drawer-btn" class="absolute top-6 left-6 text-[#c6c6ce] hover:text-secondary transition-colors focus:outline-none flex items-center gap-2">
          <span class="material-symbols-outlined text-3xl">arrow_back</span>
          <span class="text-xs uppercase tracking-widest font-label">დაბრუნება</span>
        </button>
        
        <div class="pt-12 space-y-6">
          <div class="flex items-center gap-4 text-xs font-label uppercase tracking-widest text-[#f1bf62]" id="drawer-meta">
            <span>თვითგანვითარება</span>
            <span class="w-1.5 h-1.5 bg-secondary rounded-full"></span>
            <span>15 მარტი, 2024</span>
          </div>
          
          <h2 class="text-4xl md:text-5xl font-headline italic text-white leading-tight" id="drawer-title">სტატიის სათაური</h2>
          
          <div class="aspect-video w-full rounded-2xl overflow-hidden shadow-xl" id="drawer-img-container">
            <img class="w-full h-full object-cover" id="drawer-image" src="" alt="article image"/>
          </div>
          
          <div class="space-y-6 text-on-surface-variant font-light leading-relaxed text-base md:text-lg pr-2" id="drawer-content">
            <!-- Article content will be dynamically loaded here -->
          </div>
          
          <div class="border-t border-outline-variant/10 pt-12 text-center">
            <button class="booking-btn bg-secondary text-on-secondary px-8 py-3.5 rounded-xl font-medium tracking-wide hover:brightness-110 active:scale-98 transition-all shadow-xl">
              დაგვიკავშირდით სესიისთვის
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="drawer-backdrop" class="fixed inset-0 z-[105] bg-black/60 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300"></div>
  `);const t=document.getElementById("quick-read-drawer"),s=document.getElementById("drawer-backdrop"),a=document.getElementById("close-drawer-btn");if(!t||!s)return;const c={fear:{category:"ტრანსფორმაცია",date:"20 მარტი, 2024",title:"ცვლილებების შიში და მათი მიღება",image:"https://lh3.googleusercontent.com/aida-public/AB6AXuBbnyk4QIQ_2sIlv-u8Wy_pO8J_hqKmzpk7aMoM1JiI0-_IAOhNPZui9Bhn7xT1I8b8QP_CVaiDJC86i0pLy7HI7SsFxAKZ6l3GlAIviCFowzisqRrYAnE8GwNymxeyolOwLGsj0FovselHnG6dh-HEprMBPSKvslSuyBm7jrRpHPVjcPUesZSwY86fwhKKHn1DSH9XttSn1cBvoE3xJwpC9T8uB8iIu9uxvwAu7F6rBswgZnrpQmNlqKDGQW0_M-k13qHRI7y5w7qi",paragraphs:["ცვლილებების შიში ფსიქოლოგიაში ერთ-ერთი ყველაზე გავრცელებული და ბუნებრივი მოვლენაა. ადამიანი ევოლუციურად მიდრეკილია სტაბილურობისკენ — ნაცნობი გარემო ჩვენთვის უსაფრთხოებასთან ასოცირდება, მაშინაც კი, როდესაც ეს გარემო ტოქსიკური ან არაკომფორტულია.","კარმალოგიკის ჭრილში, ნებისმიერი ცვლილება არის მიზეზ-შედეგობრივი ჯაჭვის ახალი რგოლი. როდესაც ჩვენ ვეწინააღმდეგებით ცვლილებებს, ჩვენ ფაქტობრივად ვბლოკავთ ენერგიის ბუნებრივ დინებას, რაც იწვევს შინაგან კრიზისს, შფოთვას და მენტალურ სტაგნაციას.","როგორ გადავაქციოთ შიში ზრდის ძალად? პირველი ნაბიჯი არის იმის გაცნობიერება, რომ შიში არ არის რეალური დაბრკოლება, ის მხოლოდ სიგნალია. სიგნალი იმისა, რომ ჩვენ მივუახლოვდით კომფორტის ზონის ზღვარს. ამ ზღვრის გადალახვა კი ერთადერთი გზაა ნამდვილი პიროვნული ტრანსფორმაციისა და ახალი ჰორიზონტების აღმოჩენისთვის."]},balance:{category:"ჰარმონია",date:"18 მარტი, 2024",title:"ბალანსი სხეულსა და გონებას შორის",image:"https://lh3.googleusercontent.com/aida-public/AB6AXuBbO1MqDB-1WjOZSxbE-vrpPPTzaYuUjODIqeUK7KUT3ZP4vZ6aID33RWcEqxcicUupMmHexd0VPQvsN3Vw4WfjtPy-nJEx1VemNT33aPOzgdp-iyVKaNtJg7zbbSFCa66j9CJRpr07H3zYeotG7-ohQoI71IK2Jnie--K4_pLwSKIqyvISCo7I4eau1y40TR_PqNC3DlXBBvAvVT9PStBqyHcgKkgWC1C8R1DQf53AlMvyjDHqRwAPXeKkAvj6GW7bvn6GP7OwN22T",paragraphs:["ჩვენ ხშირად განვიხილავთ გონებასა და სხეულს როგორც ორ დამოუკიდებელ სუბსტანციას. თუმცა, თანამედროვე ფსიქოსომატიკა და ნეირობიოლოგია საპირისპიროს გვიმტკიცებს: ყოველი შინაგანი ემოცია, განსაკუთრებით კი ჩახშობილი ტკივილი, მყისიერად აისახება სხეულებრივ დონეზე კუნთოვანი დაძაბულობის ან ქრონიკული გადაღლილობის სახით.","მენტალური ჰიგიენა და სხეულის მოვლა განუყოფელი ნაწილებია. მარტივი მედიტაციური პრაქტიკები, როგორიცაა გაცნობიერებული სუნთქვა (Mindful Breathing) ან სხეულის სკანირება, საშუალებას გვაძლევს აღვადგინოთ ეს დარღვეული კავშირი.","ყოველდღიურად დაუთმეთ 10 წუთი სრულ სიჩუმეს. მოუსმინეთ საკუთარი სხეულის სიგნალებს ყოველგვარი შეფასებისა და განსჯის გარეშე. ეს არის უმარტივესი, მაგრამ უაღრესად ეფექტური გზა შინაგანი ბალანსისა და მენტალური ჯანმრთელობის შესანარჩუნებლად."]},discovery:{category:"თვითგანვითარება",date:"12 მარტი, 2024",title:"ხედვის წერტილი: საკუთარი თავის აღმოჩენა",image:"https://lh3.googleusercontent.com/aida-public/AB6AXuBg_K5y6o_iz1i_tzPjiSPaA6TSxoWdPuFzoQvY9r2N46jfTST-fpLRHiRIfJP9tkq9VdiiqcL6rCTsihXCwuaJH8jo62kKnO9JPYfGS8dP1jzqa-jxHA4qmHTMUhOpMn8rXP8Pg78QSUANItFFNYh3-wDbDk1kqxpn3h3z6-3vZuZnsQPGUGhmlO_Gx1lyfh0KqZ6vWmHM56JnGXHIMynJzKSFcS5GP3YTwRRFKGpEzES5UXhb_QdeT46QDGzXfiNqey4g4VVeKVy1",paragraphs:["ვინ ვართ ჩვენ რეალურად, როდესაც ვთავისუფლდებით სოციალური როლებისგან, პროფესიული სტატუსებისა და სხვების მოლოდინებისგან? ეს კითხვა არის ეგზისტენციალური თერაპიის ქვაკუთხედი.","საკუთარი თავის შეცნობა არ ნიშნავს რაღაც ახალის გამოგონებას, ეს უფრო მეტად ჰგავს ძველი, ნამდვილი არსის არქეოლოგიურ გათხრებს. ჩვენს ქვეცნობიერში დაგროვილია უამრავი რესურსი და პასუხი, რომლებსაც ყოველდღიური ქაოსის გამო ვერ ვამჩნევთ.","ინდივიდუალური თერაპიის პროცესში, ჩვენ ერთად გავდივართ ამ გზას: ვხსნით ძველ თავდაცვით მექანიზმებს, ვსწავლობთ საკუთარი სურვილების იდენტიფიცირებას და ვქმნით ცხოვრების ახალ, გაცნობიერებულ არქიტექტურას, რომელიც დაფუძნებულია ავთენტურობაზე."]},carmelogic:{category:"ფსიქოლოგია",date:"10 მარტი, 2024",title:"კარმალოგიკა და თანამედროვეობა",image:"https://lh3.googleusercontent.com/aida-public/AB6AXuAhrUPYKHmY8xXzLRDZHkkUuCiJTCJlAIIaWKr8KIDigCAsjyzZ62tUNFQSRGKd-TGLEzkd6khLnKOcwSRJy6Lw6dfqXy8wxC9vv9bLdbGKrA9m76Or-3j3RFo8FWnQLxuS46ruiXowRZWpKNDqTZTDiP4nVfKcr2pGi0rv3ZmQjQH6kWvQoHebEEGxv7NDf5GjsiUsWM-huzX_vE7yw_BqBTs7ZLgbWDWNJgnpjdzDQOZHJRxJgSJHealdrjShupMo94BdBChKaF3s",paragraphs:["კარმალოგიკა არ არის რელიგიური ან მისტიკური მიმდინარეობა. ეს არის პრაქტიკული ფსიქოლოგიური ინსტრუმენტი, რომელიც ეყრდნობა მიზეზ-შედეგობრიობის ურყევ კანონს: ყოველი ჩვენი ფიქრი და ქმედება არის თესლი, რომელიც ადრე თუ გვიან გამოიღებს შესაბამის ნაყოფს.","თანამედროვე სწრაფ სამყაროში ჩვენ ხშირად ვივიწყებთ ამ კავშირს. ვმოქმედებთ იმპულსურად და შემდეგ გვიკვირს, რატომ ვაწყდებით ერთსა და იმავე პრობლემებს პირად ურთიერთობებსა თუ კარიერაში. კარმალოგიკის მიზანია შეგვაჩეროს და დაგვაფიქროს.","როდესაც ჩვენ ვსწავლობთ ჩვენი ქცევის გაანალიზებას და ვიღებთ პასუხისმგებლობას საკუთარ არჩევანზე, ჩვენ ვწყვეტთ რეაქტიულ რეჟიმში ცხოვრებას და ვხდებით ჩვენივე ბედისწერის აქტიური და გაცნობიერებული ავტორები."]},mindfulness:{category:"მედიტაცია",date:"05 მარტი, 2024",title:"გაცნობიერებული ყოფიერება",image:"https://lh3.googleusercontent.com/aida-public/AB6AXuCRaKQyPJJtM1kkz3WKPkp_BVhuFkb8N0eyb02EL9EAPit1yo85CzQsR-Bp9dKGVS3HligZKGmFj0NKz-xUAe-wTNlPVqC2-3QmMndRlpIGm-v8_r-1GOpQGHPD-AkeWKHN5O5oAVAFLcMq47gTw16lEwqKVTts1aPRvIX9G5dWbU-uI8YkYK5OCs3uteOwBagJSLN_d3UiVxVBJyl_bB5ocl1xzI1dPcCldoth3C3yToqDP1dB3CdlFlO0YUC8ptbroDU11A9ZYuQt",paragraphs:["მედიტაცია ხშირად არასწორად აღიქმება როგორც გონების სრული გათიშვა ან რეალობიდან გაქცევა. სინამდვილეში, მედიტაცია არის რეალობაში დაბრუნება — აწმყო მომენტის სრული გაცნობიერება და მიღება ისეთად, როგორიც ის არის.","ჩვენი გონება მუდმივად მოგზაურობს წარსულის სინანულებსა და მომავლის შფოთვებში. მინდფულნესი (გაცნობიერებული ყოფიერება) გვასწავლის ყურადღების ღუზის ჩაშვებას მიმდინარე მომენტში. ეს შეიძლება იყოს სუნთქვა, ჩაის დალევა ან უბრალოდ ნაბიჯების ხმა.","ჩვენს ცენტრში ჩვენ ვასწავლით არა რთულ ასკეტურ პრაქტიკებს, არამედ მარტივ მეთოდებს, რომლებიც მარტივად ინტეგრირდება თქვენს ყოველდღიურობაში და გეხმარებათ მენტალური სიმშვიდის შენარჩუნებაში ნებისმიერ სიტუაციაში."]},silence:{category:"თვითგანვითარება",date:"15 მარტი, 2024",title:"სიჩუმის ხელოვნება თანამედროვე ქაოსში",image:"https://lh3.googleusercontent.com/aida-public/AB6AXuCKfEgmBdC9dXdoBxf2jBq1-t8RKe4rf4HTZtxUOmbc-v65bIxMpZ7SGhXte3Dz74RuunQr1L21sR-y_OagwOwERi5HJT8EOjbpssfKx7fAa7M8JY4FWslnB5eP_JrHhEGAF0743uQFJJE2tBBOb41Sbc0xDNt6jrewjouSneoNiCmXnDOkzkRgls8nYdBO-5dLdiUnRdrMMPDQWUeZkMyXa2avuKK1hEkmn3MpKRKKy4SIT-JQojF6RfbuXhkKITvTMA3BQiqhr-T9",paragraphs:["სიჩუმე არ არის უბრალოდ ხმის არარსებობა. ეს არის ღრმა შინაგანი სივრცე, სადაც იბადება ნამდვილი შემოქმედება და პასუხები ჩვენს ყველაზე რთულ კითხვებზე. თანამედროვე სამყაროში ჩვენ მუდმივად გარშემორტყმული ვართ საინფორმაციო ხმაურით, რაც ფიტავს ჩვენს ნერვულ სისტემას.","როდესაც ჩვენ ვსწავლობთ დუმილს, ჩვენ ვხსნით კარს საკუთარი ქვეცნობიერისთვის. სიჩუმეში ვხვდებით იმ შიშებსა და სურვილებს, რომლებსაც აქამდე ხმაურის მეშვეობით ვახშობდით. ეს არის შეხვედრა საკუთარ ავთენტურ მესთან.","ჩვენი თერაპიული სესიების დროს, სიჩუმეს უმნიშვნელოვანესი როლი უჭირავს. ჩვენ არ ვცდილობთ ყველა პაუზის საუბრით შევსებას. სიჩუმეში ხდება ყველაზე დიდი გაცნობიერებები, როდესაც ფიქრი წყდება და იწყება ნამდვილი ხედვა."]}};document.addEventListener("click",r=>{const l=r.target.closest("a");if(l&&(l.textContent.includes("გაიგე მეტი")||l.href.includes("blog-post-quick"))){r.preventDefault();const d=l.closest("article")||l.closest("section");if(!d)return;let i="silence";const p=d.querySelector("h2, h3").textContent;p.includes("შიში")?i="fear":p.includes("ბალანსი")?i="balance":p.includes("ხედვის წერტილი")?i="discovery":p.includes("კარმალოგიკა")?i="carmelogic":p.includes("ყოფირება")||p.includes("გაცნობიერებული ყოფიერება")?i="mindfulness":p.includes("სიჩუმის")&&(i="silence");const g=c[i];g&&o(g)}});function o(r){document.getElementById("drawer-title").textContent=r.title,document.getElementById("drawer-image").src=r.image,document.getElementById("drawer-image").alt=r.title;const l=`
      <span>${r.category}</span>
      <span class="w-1.5 h-1.5 bg-secondary rounded-full"></span>
      <span>${r.date}</span>
    `;document.getElementById("drawer-meta").innerHTML=l;const d=document.getElementById("drawer-content");d.innerHTML=r.paragraphs.map(i=>`<p>${i}</p>`).join(""),t.classList.remove("translate-x-full","pointer-events-none"),s.classList.remove("opacity-0","pointer-events-none"),s.classList.add("opacity-100"),document.body.style.overflow="hidden"}function n(){t.classList.add("translate-x-full","pointer-events-none"),s.classList.remove("opacity-100"),s.classList.add("opacity-0","pointer-events-none"),document.body.style.overflow=""}a&&a.addEventListener("click",n),s.addEventListener("click",n),document.addEventListener("keydown",r=>{r.key==="Escape"&&n()})}function j(){const e=document.querySelector(".ambient-video-bg video");if(e){let o=function(){e.duration&&(a+=(s-a)*c,a<0&&(a=0),a>e.duration&&(a=e.duration),Math.abs(e.currentTime-a)>.01&&(e.currentTime=a)),requestAnimationFrame(o)};var t=o;e.pause();let s=0,a=0;const c=.08;e.style.transform="translate3d(0, 0, 0) scale(1.1)",e.style.willChange="transform, currentTime",window.addEventListener("scroll",()=>{const n=document.body.scrollHeight-window.innerHeight;if(n<=0)return;const r=window.scrollY/n;e.duration&&(s=r*e.duration)}),e.readyState>=1?requestAnimationFrame(o):e.addEventListener("loadedmetadata",()=>{requestAnimationFrame(o)})}}function K(){if(document.getElementById("n8n-chat-widget"))return;const e="/api/n8n-chat",t="session_"+Math.random().toString(36).substring(2,15);document.body.insertAdjacentHTML("beforeend",`
    
    <style>
      #n8n-chat-messages::-webkit-scrollbar { width: 4px; }
      #n8n-chat-messages::-webkit-scrollbar-track { background: transparent; }
      #n8n-chat-messages::-webkit-scrollbar-thumb { background: rgba(241, 191, 98, 0.2); border-radius: 10px; }
      #n8n-chat-messages::-webkit-scrollbar-thumb:hover { background: rgba(241, 191, 98, 0.5); }
      .chat-typing-dots { display: flex; align-items: center; justify-content: center; gap: 4px; width: 30px; height: 12px; }
      .chat-typing-dot { width: 5px; height: 5px; background: #f1bf62; border-radius: 50%; opacity: 0.3; animation: typing-blink 1.4s infinite both; }
      .chat-typing-dot:nth-child(2) { animation-delay: .2s; }
      .chat-typing-dot:nth-child(3) { animation-delay: .4s; }
      @keyframes typing-blink { 0% { opacity: .3; transform: scale(1); } 20% { opacity: 1; transform: scale(1.1); } 100% { opacity: .3; transform: scale(1); } }
    </style>
  
    <div id="n8n-chat-widget" class="fixed bottom-6 right-6 z-[100] font-sans">
      <!-- Floating Action Chat Button -->
      <button id="n8n-chat-trigger" class="w-14 h-14 rounded-full bg-[#1e2022]/80 border border-[#f1bf62]/20 text-[#f1bf62] hover:text-white flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_32px_rgba(241,191,98,0.2)] hover:border-[#f1bf62]/40 backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-1">
        <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">smart_toy</span>
      </button>
      
      <!-- Interactive Frosted Glass Chat Window -->
      <div id="n8n-chat-window" class="hidden absolute bottom-20 right-0 w-[360px] max-w-[calc(100vw-32px)] h-[500px] max-h-[80vh] flex flex-col bg-[#1e2022]/90 border border-white/10 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-300 scale-95 opacity-0 origin-bottom-right">
        
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
          <div class="flex items-center gap-3">
            <div class="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <div>
              <h3 class="text-sm font-bold text-white font-headline">AI ასისტენტი</h3>
              <p class="text-[10px] text-[#c6c6ce]/60 font-semibold uppercase tracking-wider">ონლაინ მხარდაჭერა</p>
            </div>
          </div>
          <button id="n8n-chat-close" class="text-[#c6c6ce] hover:text-[#f1bf62] transition-colors focus:outline-none cursor-pointer">
            <span class="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>
        
        <!-- Messages Area -->
        <div id="n8n-chat-messages" class="flex-grow p-6 overflow-y-auto space-y-4 flex flex-col">
          <div class="flex flex-col gap-1 max-w-[85%] self-start">
            <div class="bg-white/5 border border-white/5 backdrop-blur-md text-[#c6c6ce] px-4 py-3 rounded-2xl rounded-tl-none text-sm font-medium leading-relaxed">
              მოგესალმებით! მე ვარ აიდისი-ს ხელოვნური ინტელექტის ასისტენტი. რით შემიძლია დაგეხმაროთ დღეს? 🔮
            </div>
            <span class="text-[9px] text-[#c6c6ce]/40 font-bold uppercase tracking-wider pl-1">AI ასისტენტი</span>
          </div>
        </div>
        
        <!-- Input Form -->
        <form id="n8n-chat-form" class="p-4 border-t border-white/5 bg-white/3 flex gap-2.5 items-center">
          <input id="n8n-chat-input" type="text" placeholder="ჩაწერეთ შეტყობინება..." required class="flex-grow bg-[#121416]/50 border border-white/10 focus:border-[#f1bf62] focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-[#c6c6ce]/40 transition-colors font-medium"/>
          <button type="submit" class="w-11 h-11 rounded-xl bg-[#f1bf62] text-[#121416] hover:bg-white hover:text-[#121416] flex items-center justify-center shrink-0 cursor-pointer shadow-[0_4px_12px_rgba(241,191,98,0.25)] hover:shadow-[0_4px_12px_rgba(255,255,255,0.25)] transition-all duration-300">
            <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">send</span>
          </button>
        </form>
        
      </div>
    </div>
  `);const c=document.getElementById("n8n-chat-trigger"),o=document.getElementById("n8n-chat-window"),n=document.getElementById("n8n-chat-close"),r=document.getElementById("n8n-chat-form"),l=document.getElementById("n8n-chat-input"),d=document.getElementById("n8n-chat-messages");if(!c||!o||!n||!r||!l||!d)return;const i=()=>{o.classList.contains("hidden")&&(o.classList.remove("hidden"),setTimeout(()=>{o.style.transform="scale(1)",o.style.opacity="1",l.focus()},10),c.style.transform="scale(0) rotate(180deg)",c.style.opacity="0")};c.addEventListener("click",i);const p=()=>{o.style.transform="scale(0.95)",o.style.opacity="0",setTimeout(()=>{o.classList.add("hidden"),c.style.transform="scale(1) rotate(0deg)",c.style.opacity="1"},300)};n.addEventListener("click",p),setTimeout(i,1500),r.addEventListener("submit",async m=>{m.preventDefault();const u=l.value.trim();if(!u)return;l.value="";const x=`
      <div class="flex flex-col gap-1 max-w-[85%] self-end items-end animate-fade-in">
        <div class="bg-[#f1bf62]/10 border border-[#f1bf62]/30 text-[#f1bf62] px-4 py-3 rounded-2xl rounded-tr-none text-sm font-medium leading-relaxed">
          ${b(u)}
        </div>
        <span class="text-[9px] text-[#f1bf62]/50 font-bold uppercase tracking-wider pr-1">თქვენ</span>
      </div>
    `;d.insertAdjacentHTML("beforeend",x),g();const w="typing-"+Date.now(),E=`
      <div id="${w}" class="flex flex-col gap-1 max-w-[80%] self-start animate-fade-in">
        <div class="bg-white/5 border border-white/5 backdrop-blur-md text-[#c6c6ce] px-5 py-4 rounded-2xl rounded-tl-none">
          <div class="chat-typing-dots">
            <span class="chat-typing-dot"></span>
            <span class="chat-typing-dot"></span>
            <span class="chat-typing-dot"></span>
          </div>
        </div>
        <span class="text-[9px] text-[#c6c6ce]/40 font-bold uppercase tracking-wider pl-1">AI ასისტენტი</span>
      </div>
    `;d.insertAdjacentHTML("beforeend",E),g();try{let y="სამწუხაროდ, კავშირის შეცდომაა. გთხოვთ სცადოთ მოგვიანებით.";if(e&&e.trim()!==""){const k=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:u,sessionId:t,sourceUrl:window.location.href})});if(k.ok){const h=await k.json();y=h.output||h.response||h.text||(typeof h=="string"?h:JSON.stringify(h))}}else y="AI ასისტენტის ვებჰუკი ჯერ არ არის კონფიგურირებული. გთხოვთ მიუთითოთ n8n Webhook URL კოდში (`src/main.js`).";const v=document.getElementById(w);v&&v.remove();const L=`
        <div class="flex flex-col gap-1 max-w-[85%] self-start animate-fade-in">
          <div class="bg-white/5 border border-white/5 backdrop-blur-md text-[#c6c6ce] px-4 py-3 rounded-2xl rounded-tl-none text-sm font-medium leading-relaxed">
            ${f(y)}
          </div>
          <span class="text-[9px] text-[#c6c6ce]/40 font-bold uppercase tracking-wider pl-1">AI ასისტენტი</span>
        </div>
      `;d.insertAdjacentHTML("beforeend",L),g()}catch(y){console.error("n8n integration error:",y);const v=document.getElementById(w);v&&v.remove(),d.insertAdjacentHTML("beforeend",`
        <div class="flex flex-col gap-1 max-w-[85%] self-start animate-fade-in text-red-400">
          <div class="bg-red-950/20 border border-red-500/20 px-4 py-3 rounded-2xl rounded-tl-none text-sm font-medium leading-relaxed">
            კავშირი ვერ დამყარდა n8n სერვერთან. გთხოვთ შეამოწმოთ ვებჰუკის მისამართი და სერვერის სტატუსი.
          </div>
          <span class="text-[9px] text-red-500/50 font-bold uppercase tracking-wider pl-1">სისტემური შეცდომა</span>
        </div>
      `),g()}});function g(){d.scrollTop=d.scrollHeight}function b(m){const u={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"};return m.replace(/[&<>"']/g,function(x){return u[x]})}function f(m){if(typeof m!="string")return"";let u=b(m);return u=u.replace(/\*\*(.*?)\*\*/g,'<strong class="font-bold text-white">$1</strong>'),u=u.replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" class="inline-flex items-center gap-0.5 text-[#f1bf62] hover:text-white underline decoration-[#f1bf62]/40 hover:decoration-white transition-all font-semibold">$1<span class="material-symbols-outlined text-[10px] inline-block align-middle ml-0.5">arrow_outward</span></a>'),u=u.replace(/\n/g,"<br/>"),u}}
