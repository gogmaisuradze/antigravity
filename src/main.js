// IDC Psychotherapy Web Application - Client-Side Interactive Logic & Premium Upgrades

const initAll = () => {
  initMobileMenu();
  initBookingModal();
  initBlogFilters();
  initFormValidation();
  
  // Premium Aesthetic Upgrades
  initAmbientGlow();
  initScrollReveal();
  initFloatingNav();
  initMethodologyInteractions();
  initFAQAccordion();
  initBlogQuickRead();
  initVideoScrollScrub();
  initN8nChat();
  initVisitorCounter();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}

/* ==========================================================================
   1. Mobile Menu Functionality
   ========================================================================== */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');
      
      const icon = mobileMenuBtn.querySelector('span');
      if (icon) {
        if (mobileMenu.classList.contains('hidden')) {
          icon.textContent = 'menu';
        } else {
          icon.textContent = 'close';
        }
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && e.target !== mobileMenuBtn) {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('span');
        if (icon) icon.textContent = 'menu';
      }
    });
  }
}

/* ==========================================================================
   2. Dynamic Booking Modal
   ========================================================================== */
function initBookingModal() {
  // Inject Modal HTML into the bottom of body
  const modalHTML = `
    <div id="booking-modal" class="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md opacity-0 pointer-events-none transition-all duration-300">
      <div class="bg-surface-container-low p-6 sm:p-10 md:p-12 rounded-[1.5rem] sm:rounded-[2rem] shadow-[0px_40px_80px_rgba(0,0,0,0.85)] border border-outline-variant/10 max-w-2xl w-full relative hover-glow transition-all duration-500 transform scale-95 max-h-[90vh] overflow-y-auto" id="booking-modal-card">
        <button id="close-modal-btn" class="absolute top-4 right-4 sm:top-6 sm:right-6 text-[#c6c6ce] hover:text-secondary transition-colors focus:outline-none z-50">
          <span class="material-symbols-outlined text-2xl sm:text-3xl">close</span>
        </button>
        
        <div class="mb-6 sm:mb-10 text-left relative flex items-start justify-between">
          <div>
            <h2 class="text-2xl sm:text-3xl font-headline italic text-on-surface">სესიის დაჯავშნა</h2>
            <p class="text-xs sm:text-sm text-outline-variant mt-2">შეავსეთ ფორმა და ჩვენი ადმინისტრატორი მალე დაგიკავშირდებათ</p>
            <button type="button" onclick="if(window.openAIChat) { document.getElementById('close-modal-btn').click(); window.openAIChat(); }" class="mt-4 flex items-center justify-center gap-2 bg-[#f1bf62]/10 border border-[#f1bf62]/30 hover:bg-[#f1bf62]/20 hover:border-[#f1bf62]/50 text-[#f1bf62] px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-all uppercase w-full">
              <span class="material-symbols-outlined text-sm">psychology</span>
              <span>ჰკითხეთ მეტი ინტელექტუალურ ასისტენტს</span>
            </button>
          </div>
          <div class="bg-secondary/10 border border-secondary/20 p-3.5 rounded-2xl hidden sm:flex items-center justify-center text-secondary shadow-lg">
            <span class="material-symbols-outlined text-3xl" style='font-variation-settings: "FILL" 1;'>edit_calendar</span>
          </div>
        </div>
        
        <form class="space-y-5 sm:space-y-8 contact-form" id="booking-modal-form">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
            <div class="space-y-2">
              <label class="text-xs text-outline-variant tracking-widest uppercase ml-1">სახელი</label>
              <input type="text" id="booking-first-name" name="first_name" required class="w-full bg-surface-container-lowest border-none border-b border-outline-variant/30 focus:border-secondary focus:ring-0 transition-all py-3 sm:py-4 px-0 text-on-surface placeholder:text-outline-variant/50" placeholder="თქვენი სახელი"/>
            </div>
            <div class="space-y-2">
              <label class="text-xs text-outline-variant tracking-widest uppercase ml-1">გვარი</label>
              <input type="text" id="booking-last-name" name="last_name" required class="w-full bg-surface-container-lowest border-none border-b border-outline-variant/30 focus:border-secondary focus:ring-0 transition-all py-3 sm:py-4 px-0 text-on-surface placeholder:text-outline-variant/50" placeholder="თქვენი გვარი"/>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
            <div class="space-y-2">
              <label class="text-xs text-outline-variant tracking-widest uppercase ml-1">ტელეფონი</label>
              <input type="tel" id="booking-phone" name="phone" required class="w-full bg-surface-container-lowest border-none border-b border-outline-variant/30 focus:border-secondary focus:ring-0 transition-all py-3 sm:py-4 px-0 text-on-surface placeholder:text-outline-variant/50" placeholder="ტელ:"/>
            </div>
            <div class="space-y-2">
              <label class="text-xs text-outline-variant tracking-widest uppercase ml-1">აირჩიე სერვისი</label>
              <select name="service" class="w-full bg-surface-container-lowest border-none border-b border-outline-variant/30 focus:border-secondary focus:ring-0 transition-all py-3 sm:py-4 px-0 text-on-surface appearance-none">
                <option>კონსულტაცია</option>
                <option>ინდივიდუალური ფსიქოთერაპია</option>
                <option>არტ თერაპია</option>
                <option>ჯგუფური ფსიქოთერაპია</option>
                <option>პოზიტიური ფსიქოთერაპია</option>
                <option>პრაქტიკული ფსიქოლოგია</option>
              </select>
            </div>
          </div>
          
          <div class="space-y-2">
            <label class="text-xs text-outline-variant tracking-widest uppercase ml-1">თარიღი</label>
            <input type="date" name="date" required class="w-full bg-surface-container-lowest border-none border-b border-outline-variant/30 focus:border-secondary focus:ring-0 transition-all py-3 sm:py-4 px-0 text-on-surface" style="color-scheme: dark;"/>
          </div>
          
          <div class="space-y-2">
            <label class="text-xs text-outline-variant tracking-widest uppercase ml-1">მოკლე შეტყობინება</label>
            <textarea rows="3" required class="w-full bg-surface-container-lowest border-none border-b border-outline-variant/30 focus:border-secondary focus:ring-0 transition-all py-3 sm:py-4 px-0 text-on-surface placeholder:text-outline-variant/50 resize-none" placeholder="დაგვიწერეთ მოკლედ თქვენი მოთხოვნის შესახებ..."></textarea>
          </div>
          
          <div class="pt-3 sm:pt-6">
            <button type="submit" class="w-full bg-secondary-container text-on-secondary-container py-4 sm:py-5 rounded-xl font-semibold text-base sm:text-lg hover:brightness-110 active:scale-98 transition-all duration-300 shadow-xl flex items-center justify-center gap-3">
              დაჯავშნა
              <span class="material-symbols-outlined text-xl">arrow_forward</span>
            </button>
          </div>
        </form>
        
        <div class="relative flex py-4 sm:py-6 items-center">
          <div class="flex-grow border-t border-[#45464d]/20"></div>
          <span class="flex-shrink mx-4 text-xs text-outline-variant tracking-wider uppercase font-semibold text-outline-variant/60">ან დაჯავშნე პირდაპირ</span>
          <div class="flex-grow border-t border-[#45464d]/20"></div>
        </div>
        
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <!-- Telegram -->
          <a href="https://t.me/IDCPositivepsychotherapybot" target="_blank" class="flex flex-col items-center justify-center bg-white/5 border border-white/10 hover:bg-[#f1bf62]/10 hover:border-[#f1bf62]/35 hover:text-[#f1bf62] text-[#c6c6ce] py-2.5 sm:py-3.5 px-2 rounded-xl transition-all gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.15)] group">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 fill-current group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.89 1.2-5.33 3.52-.5.35-.96.52-1.37.51-.45-.01-1.32-.26-1.97-.47-.8-.26-1.43-.4-1.38-.85.03-.24.36-.49.99-.75 3.86-1.68 6.43-2.78 7.72-3.3 3.67-1.49 4.43-1.75 4.93-1.76.11 0 .36.03.52.16.13.11.17.26.19.37z"/>
            </svg>
            <span class="text-[10px] sm:text-xs font-semibold tracking-wide">Telegram</span>
          </a>

          <!-- Facebook -->
          <a href="https://www.facebook.com/IDCgeorgia" target="_blank" class="flex flex-col items-center justify-center bg-white/5 border border-white/10 hover:bg-[#f1bf62]/10 hover:border-[#f1bf62]/35 hover:text-[#f1bf62] text-[#c6c6ce] py-2.5 sm:py-3.5 px-2 rounded-xl transition-all gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.15)] group">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 fill-current group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span class="text-[10px] sm:text-xs font-semibold tracking-wide">Facebook</span>
          </a>

          <!-- Instagram -->
          <a href="https://www.instagram.com/idcgeo/" target="_blank" class="flex flex-col items-center justify-center bg-white/5 border border-white/10 hover:bg-[#f1bf62]/10 hover:border-[#f1bf62]/35 hover:text-[#f1bf62] text-[#c6c6ce] py-2.5 sm:py-3.5 px-2 rounded-xl transition-all gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.15)] group">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 fill-current group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            <span class="text-[10px] sm:text-xs font-semibold tracking-wide">Instagram</span>
          </a>

          <!-- WhatsApp -->
          <a href="https://wa.me/995598324020" target="_blank" class="flex flex-col items-center justify-center bg-white/5 border border-white/10 hover:bg-[#f1bf62]/10 hover:border-[#f1bf62]/35 hover:text-[#f1bf62] text-[#c6c6ce] py-2.5 sm:py-3.5 px-2 rounded-xl transition-all gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.15)] group">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 fill-current group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.249 8.477 3.517 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.197 1.45 4.817 1.451 5.4 0 9.794-4.394 9.798-9.794.002-2.617-1.018-5.077-2.873-6.932-1.854-1.854-4.312-2.873-6.924-2.874-5.405 0-9.799 4.393-9.802 9.794-.001 1.705.454 3.371 1.316 4.856l-.993 3.63 3.731-.979zm11.238-6.84c-.266-.134-1.582-.78-1.83-.87-.247-.089-.427-.134-.607.135-.18.267-.697.87-.852 1.047-.157.178-.314.2-.58.067-.266-.134-1.127-.415-2.147-1.325-.793-.706-1.33-1.579-1.485-1.846-.157-.267-.017-.411.117-.544.12-.12.267-.312.4-.467.133-.156.177-.267.266-.445.09-.178.044-.334-.022-.467-.067-.134-.607-1.464-.83-2.005-.218-.524-.458-.453-.628-.461-.163-.008-.349-.01-.536-.01-.186 0-.49.07-.747.347-.257.278-.98.957-.98 2.335s1.002 2.703 1.142 2.89c.14.188 1.972 3.012 4.778 4.221.668.288 1.19.46 1.597.59.67.213 1.28.183 1.761.111.537-.08 1.582-.647 1.805-1.272.223-.624.223-1.157.157-1.272-.067-.116-.247-.183-.514-.316z"/>
            </svg>
            <span class="text-[10px] sm:text-xs font-semibold tracking-wide">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const modal = document.getElementById('booking-modal');
  const modalCard = document.getElementById('booking-modal-card');
  const closeBtn = document.getElementById('close-modal-btn');
  
  // Set up event delegation for booking buttons (supports dynamically created ones)
  document.addEventListener('click', (e) => {
    if (e.target && (e.target.classList.contains('booking-btn') || e.target.closest('.booking-btn'))) {
      e.preventDefault();
      openModal();
    }
  });

  function openModal() {
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modalCard.classList.remove('scale-95');
    modalCard.classList.add('scale-100');
  }

  function closeModal() {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modalCard.classList.remove('scale-100');
    modalCard.classList.add('scale-95');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Close when clicking backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Esc key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ==========================================================================
   3. Blog Filters & Search Engine
   ========================================================================== */
function initBlogFilters() {
  const categoriesContainer = document.getElementById('blog-categories');
  const searchInput = document.getElementById('blog-search');
  const blogGrid = document.getElementById('blog-grid');

  if (!blogGrid) return; // Exit if not on blog page

  const posts = Array.from(blogGrid.querySelectorAll('.blog-post'));
  let currentCategory = 'all';
  let searchQuery = '';

  // Setup "No Results Found" element
  const noResultsHTML = `
    <div id="no-results-panel" class="hidden col-span-full py-20 text-center animate-fade-in">
      <span class="material-symbols-outlined text-secondary text-6xl mb-4">search_off</span>
      <h4 class="text-2xl font-headline italic text-white mb-2">შედეგები არ მოიძებნა</h4>
      <p class="text-sm text-on-surface-variant max-w-sm mx-auto">სცადეთ სხვა საკვანძო სიტყვა ან შეცვალეთ კატეგორიის ფილტრი.</p>
    </div>
  `;
  blogGrid.insertAdjacentHTML('beforeend', noResultsHTML);
  const noResultsPanel = document.getElementById('no-results-panel');

  // Filter categories clicked
  if (categoriesContainer) {
    const filters = categoriesContainer.querySelectorAll('.category-filter');
    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        // Update category active state
        filters.forEach(f => {
          f.className = 'category-filter text-on-surface-variant hover:text-primary transition-colors cursor-pointer';
        });
        filter.className = 'category-filter text-secondary border-b border-secondary pb-1 cursor-pointer hover:opacity-85 transition-opacity';

        currentCategory = filter.getAttribute('data-category');
        applyFilterAndSearch();
      });
    });
  }

  // Live text search typed
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFilterAndSearch();
    });
  }

  function applyFilterAndSearch() {
    let visibleCount = 0;

    posts.forEach(post => {
      const postCategory = post.getAttribute('data-category');
      
      // Match text inside titles/descriptions/category fields
      const title = post.querySelector('h3').textContent.toLowerCase();
      const desc = post.querySelector('p').textContent.toLowerCase();
      const matchesSearch = title.includes(searchQuery) || desc.includes(searchQuery);
      
      // Match category state
      const matchesCategory = (currentCategory === 'all' || postCategory === currentCategory);

      if (matchesCategory && matchesSearch) {
        post.style.display = 'flex';
        post.classList.add('animate-fade-in');
        visibleCount++;
      } else {
        post.style.display = 'none';
        post.classList.remove('animate-fade-in');
      }
    });

    // Handle "no results" state
    if (visibleCount === 0) {
      noResultsPanel.classList.remove('hidden');
    } else {
      noResultsPanel.classList.add('hidden');
    }
  }
}

/* ==========================================================================
   4. Form Validation & Toast Notifications
   ========================================================================== */
function initFormValidation() {
  // Global custom validation messages in Georgian
  document.addEventListener('invalid', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
      e.target.setCustomValidity('გთხოვთ სწორად შეავსოთ ველი');
    }
  }, true);

  document.addEventListener('input', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
      e.target.setCustomValidity('');
    }
  });

  document.addEventListener('change', (e) => {
    if (e.target.tagName === 'SELECT') {
      e.target.setCustomValidity('');
    }
  });

  // Inject premium Toast Notification container to document body
  const toastHTML = `
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
  `;
  document.body.insertAdjacentHTML('beforeend', toastHTML);

  const toast = document.getElementById('toast-container');
  const toastMessage = document.getElementById('toast-message');

  function showToast(message) {
    if (message) toastMessage.textContent = message;
    
    toast.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
    }, 4500);
  }

  // Paste your n8n webhook URL here (e.g. 'https://your-n8n-instance.com/webhook/session-booking')
  const n8nWebhookUrl = ''; 

  // Paste your Telegram Bot settings here to automatically receive bookings
  const telegramBotToken = '8563426842:AAEuhg8EXmAV18NXtlAaiky0ZzWGvNXkJQU'; // E.g., 'YOUR_BOT_TOKEN'
  const telegramChatId = '443575738';   // E.g., 'YOUR_CHAT_ID'

  // Capture all forms with class 'contact-form' (works on dynamic modal form too!)
  document.addEventListener('submit', (e) => {
    if (e.target && (e.target.classList.contains('contact-form') || e.target.id === 'booking-modal-form')) {
      e.preventDefault();
      
      const form = e.target;
      
      // Parse fields dynamically
      const firstNameInput = form.querySelector('[name="first_name"]') || form.querySelector('[id*="first-name"]') || form.querySelector('input[placeholder*="სახელი"]');
      const lastNameInput = form.querySelector('[name="last_name"]') || form.querySelector('[id*="last-name"]') || form.querySelector('input[placeholder*="გვარი"]');
      const phoneInput = form.querySelector('input[type="tel"]') || form.querySelector('[name="phone"]') || form.querySelector('[id*="phone"]');
      const dateInput = form.querySelector('input[type="date"]');
      const serviceSelect = form.querySelector('select');
      const messageTextarea = form.querySelector('textarea');
      const emailInput = form.querySelector('input[type="email"]');

      // Check if this is a newsletter subscription form (no name/phone inputs, only email input)
      const isNewsletter = !firstNameInput && !lastNameInput && !phoneInput;
      if (isNewsletter) {
        const email = emailInput ? emailInput.value.trim() : '';
        if (!email) {
          alert('გთხოვთ მიუთითოთ ელ-ფოსტა');
          if (emailInput) emailInput.focus();
          return;
        }

        // Send to Telegram if credentials are set
        if (telegramBotToken && telegramChatId) {
          const telegramMessage = `📧 *ახალი გამოწერა საიტიდან!* 📰\n\n` +
            `📧 *ელ-ფოსტა:* ${email}\n\n` +
            `🔗 *გვერდი:* ${window.location.href}`;

          fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              chat_id: telegramChatId,
              text: telegramMessage,
              parse_mode: 'Markdown'
            })
          })
          .catch(err => console.error('Error sending subscription to Telegram:', err));
        }

        showToast('მადლობა გამოწერისთვის!');
        form.reset();
        return;
      }

      // 1. Strict Validation: Name and Surname must be separate and >= 2 characters
      const firstName = firstNameInput ? firstNameInput.value.trim() : '';
      const lastName = lastNameInput ? lastNameInput.value.trim() : '';

      if (!firstName || firstName.length < 2) {
        alert('გთხოვთ მიუთითოთ სახელი (მინიმუმ 2 ასო)');
        if (firstNameInput) firstNameInput.focus();
        return;
      }
      if (!lastName || lastName.length < 2) {
        alert('გთხოვთ მიუთითოთ გვარი (მინიმუმ 2 ასო)');
        if (lastNameInput) lastNameInput.focus();
        return;
      }

      // 2. Strict Validation: Phone number must start with 5 and be exactly 9 digits
      if (phoneInput) {
        const phoneRaw = phoneInput.value.trim();
        let phoneClean = phoneRaw.replace(/\s+/g, '').replace(/-/g, '').replace(/\+/g, '');
        if (phoneClean.startsWith('995')) {
          phoneClean = phoneClean.substring(3);
        }
        
        if (!/^5\d{8}$/.test(phoneClean)) {
          alert('ტელეფონის ნომერი უნდა იწყებოდეს 5-იანით და შედგებოდეს ზუსტად 9 ციფრისგან (მაგ: 5XXXXXXXX)');
          phoneInput.focus();
          return;
        }
        if (/^(.)\1+$/.test(phoneClean) || /(.)\1{5,}/.test(phoneClean)) {
          alert('გთხოვთ შეიყვანოთ სწორი ტელეფონის ნომერი (არ უნდა შედგებოდეს მხოლოდ ერთნაირი ან განმეორებადი ციფრებისგან)');
          phoneInput.focus();
          return;
        }
      } else {
        alert('ტელეფონის ნომერი სავალდებულოა');
        return;
      }

      // 3. Strict Validation: All visible form fields must be fully filled
      if (emailInput && !emailInput.value.trim()) {
        alert('გთხოვთ შეავსოთ ელ-ფოსტის ველი');
        emailInput.focus();
        return;
      }
      if (dateInput && !dateInput.value) {
        alert('გთხოვთ შეავსოთ თარიღის ველი');
        dateInput.focus();
        return;
      }
      if (messageTextarea && !messageTextarea.value.trim()) {
        alert('გთხოვთ შეავსოთ შეტყობინების ველი');
        messageTextarea.focus();
        return;
      }

      const bookingData = {
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        phone: phoneInput ? phoneInput.value.trim() : 'N/A',
        email: emailInput ? emailInput.value.trim() : 'N/A',
        date: dateInput ? dateInput.value : 'N/A',
        service: serviceSelect ? serviceSelect.value : 'ინდივიდუალური ფსიქოთერაპია',
        message: messageTextarea ? messageTextarea.value.trim() : '',
        timestamp: new Date().toISOString(),
        sourceUrl: window.location.href
      };

      // Send to n8n webhook if configured
      if (n8nWebhookUrl && n8nWebhookUrl.trim() !== '') {
        fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bookingData)
        })
        .then(response => {
          if (!response.ok) {
            console.warn('n8n response was not ok:', response.statusText);
          }
        })
        .catch(err => {
          console.error('Error sending data to n8n:', err);
        });
      }

      // Send to Telegram if Bot Credentials are configured
      if (telegramBotToken && telegramChatId) {
        const telegramMessage = `🔔 *ახალი ჯავშანი საიტიდან!* 📅\n\n` +
          `👤 *სახელი:* ${bookingData.firstName}\n` +
          `👤 *გვარი:* ${bookingData.lastName}\n` +
          `📞 *ტელეფონი:* ${bookingData.phone}\n` +
          `📧 *ელ-ფოსტა:* ${bookingData.email}\n` +
          `📅 *თარიღი:* ${bookingData.date}\n` +
          `💼 *სერვისი:* ${bookingData.service}\n` +
          `✉️ *შეტყობინება:* ${bookingData.message || 'ცარიელი'}\n\n` +
          `🔗 *გვერდი:* ${bookingData.sourceUrl}`;

        fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: telegramMessage,
            parse_mode: 'Markdown'
          })
        })
        .then(response => {
          if (!response.ok) {
            console.warn('Telegram Bot API response was not ok');
          }
        })
        .catch(err => {
          console.error('Error sending message to Telegram:', err);
        });
      }

      // If inside our booking modal, close the modal first
      const modal = document.getElementById('booking-modal');
      if (modal && !modal.classList.contains('opacity-0')) {
        const closeBtn = document.getElementById('close-modal-btn');
        if (closeBtn) closeBtn.click();
        
        showToast('ჯავშანი წარმატებით მიღებულია! ჩვენი ადმინისტრატორი მალე დაგიკავშირდებათ.');
      } else {
        showToast('შეტყობინება წარმატებით გაიგზავნა! ჩვენ მალე დაგიკავშირდებით.');
      }

      form.reset();
    }
  });
}

/* ==========================================================================
   5. Floating Ambient Glow Blobs
   ========================================================================== */
function initAmbientGlow() {
  const blob1 = document.createElement('div');
  blob1.className = 'glow-blob';
  blob1.style.background = 'radial-gradient(circle, rgba(241,191,98,0.2) 0%, rgba(18,20,22,0) 70%)';
  blob1.style.width = '600px';
  blob1.style.height = '600px';
  blob1.style.left = '-100px';
  blob1.style.top = '100px';
  blob1.style.position = 'fixed';
  
  const blob2 = document.createElement('div');
  blob2.className = 'glow-blob';
  blob2.style.background = 'radial-gradient(circle, rgba(47,57,86,0.35) 0%, rgba(18,20,22,0) 70%)';
  blob2.style.width = '800px';
  blob2.style.height = '800px';
  blob2.style.right = '-200px';
  blob2.style.bottom = '-100px';
  blob2.style.position = 'fixed';
  
  document.body.appendChild(blob1);
  document.body.appendChild(blob2);
  
  // Dynamic smooth drift keyframes logic using JS
  let angle = 0;
  function drift() {
    angle += 0.001;
    const x1 = Math.sin(angle) * 60;
    const y1 = Math.cos(angle) * 40;
    const x2 = Math.cos(angle * 1.3) * 50;
    const y2 = Math.sin(angle * 1.3) * 70;
    
    blob1.style.transform = `translate(${x1}px, ${y1}px)`;
    blob2.style.transform = `translate(${x2}px, ${y2}px)`;
    
    requestAnimationFrame(drift);
  }
  drift();

  // Desktop mouse follow effect for golden glow (subtle and laggy/smooth)
  if (window.innerWidth > 768) {
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    const ease = 0.05;

    document.addEventListener('mousemove', (e) => {
      targetX = (e.clientX - window.innerWidth / 2) * 0.15;
      targetY = (e.clientY - window.innerHeight / 2) * 0.15;
    });

    function smoothMouseFollow() {
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      
      // Combine drift with mouse movement on blob1
      const driftX = Math.sin(angle) * 30;
      const driftY = Math.cos(angle) * 20;
      blob1.style.transform = `translate(${currentX + driftX}px, ${currentY + driftY}px)`;
      
      requestAnimationFrame(smoothMouseFollow);
    }
    smoothMouseFollow();
  }
}

/* ==========================================================================
   6. Reveal-on-Scroll System (Intersection Observer)
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-hidden');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target); // Trigger once
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   7. Floating Island Header Scroll Effect
   ========================================================================== */
function initFloatingNav() {
  const nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    });
    
    // Initial check
    if (window.scrollY > 30) {
      nav.classList.add('nav-scrolled');
    }
  }
}

/* ==========================================================================
   8. About Page Methodology Interactions
   ========================================================================== */
function initMethodologyInteractions() {
  const pills = document.querySelectorAll('.methodology-pill');
  const card = document.getElementById('methodology-detail-card');
  
  if (!card || pills.length === 0) return;

  const contentMap = {
    awareness: {
      title: "გაცნობიერება",
      subtitle: "Awareness & Introspection",
      icon: "psychology",
      text: "პირველი ნაბიჯი ყოველთვის შინაგანი მდგომარეობის გაცნობიერებაა. პოზიტიური ფსიქოთერაპიის პრინციპებით, ჩვენ ვაკვირდებით იმ ქვეცნობიერ პროგრამებსა და ქცევებს, რომლებიც განსაზღვრავენ ჩვენს ყოველდღიურობას. საკუთარი თავის სიღრმისეული დაკვირვება იძლევა უნიკალურ ძალას შინაგანი ტრავმების ტრანსფორმაციისთვის.",
      quote: "„სანამ ქვეცნობიერს გააცნობიერებდე, ის მართავს შენს ცხოვრებას და შენ მას ბედისწერას უწოდებ.“ — კარლ გუსტავ იუნგი"
    },
    harmony: {
      title: "ჰარმონია",
      subtitle: "Mind-Body Integration",
      icon: "balance",
      text: "სხეულისა და გონების ჰარმონიული ერთობა. ჩვენი მიდგომა ორიენტირებულია იმაზე, რომ ადამიანმა აღმოაჩინოს ემოციური წონასწორობა. ეს მიიღწევა კოგნიტური და ეგზისტენციალური პრაქტიკების სინთეზით, რაც საგრძნობლად ამცირებს შფოთვას და გვეხმარება აწმყო მომენტში დაბრუნებაში.",
      quote: "„ცხოვრება არის ბალანსი გამკლავებასა და გაშვებას შორის.“"
    },
    transformation: {
      title: "ტრანსფორმაცია",
      subtitle: "Crisis to Growth",
      icon: "history_edu",
      text: "ცვლილება გარდაუვალია, მაგრამ გაცნობიერებული ტრანსფორმაცია — შეგნებული არჩევანია. ჩვენ ვეხმარებით კლიენტებს, გადალახონ ცხოვრებისეული კრიზისული პერიოდები და გარდაქმნან დაგროვილი ემოციური ტკივილი ახალ შინაგან ძალად და შემოქმედებით რესურსად.",
      quote: "„ყოველი დიდი ტრანსფორმაცია იწყება ძველი რეალობის ქაოსით, მაგრამ მთავრდება სულიერი სიცხადით.“"
    },
    resilience: {
      title: "მდგრადობა",
      subtitle: "Mental Resilience",
      icon: "diamond",
      text: "მყარი მენტალური საყრდენის შექმნა. ჩვენი ფსიქოთერაპიის უმთავრესი მიზანია კლიენტის მენტალური ჰიგიენის დამოუკიდებელი მართვა, რათა მომავალში მან მარტივად შეძლოს ცხოვრებისეული წნეხისადმი მედეგობისა და ფსიქოლოგიური სიმტკიცის შენარჩუნება.",
      quote: "„მდგრადობა არ ნიშნავს იმას, რომ არასოდეს დაეცემი. ეს ნიშნავს იმას, რომ ყოველთვის შეძლებ წამოდგომას.“"
    }
  };

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const type = pill.getAttribute('data-methodology');
      if (!contentMap[type]) return;
      
      // Update pills active styling
      pills.forEach(p => {
        p.classList.remove('bg-secondary', 'text-on-secondary');
        p.classList.add('bg-surface-container', 'text-on-surface-variant', 'hover:text-white');
      });
      pill.classList.remove('bg-surface-container', 'text-on-surface-variant', 'hover:text-white');
      pill.classList.add('bg-secondary', 'text-on-secondary');

      // Animate card transition (fade-out, change, fade-in)
      card.style.opacity = '0';
      card.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        const item = contentMap[type];
        card.innerHTML = `
          <div class="flex items-center gap-4 mb-6">
            <span class="material-symbols-outlined text-secondary text-4xl" style="font-variation-settings: 'FILL' 1;">${item.icon}</span>
            <div>
              <h3 class="text-2xl font-headline text-white">${item.title}</h3>
              <p class="text-xs text-outline-variant tracking-wider uppercase">${item.subtitle}</p>
            </div>
          </div>
          <p class="text-on-surface-variant leading-relaxed text-sm md:text-base font-light mb-8">${item.text}</p>
          <div class="border-t border-outline-variant/10 pt-6">
            <p class="text-secondary italic font-headline text-base md:text-lg">${item.quote}</p>
          </div>
        `;
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 250);
    });
  });
}

/* ==========================================================================
   9. Contact Page FAQ Accordion
   ========================================================================== */
function initFAQAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (items.length === 0) return;

  items.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    if (trigger && content && icon) {
      trigger.addEventListener('click', () => {
        const isCollapsed = content.style.maxHeight === '' || content.style.maxHeight === '0px';

        // Collapse all others
        items.forEach(otherItem => {
          const otherContent = otherItem.querySelector('.faq-content');
          const otherIcon = otherItem.querySelector('.faq-icon');
          if (otherContent && otherContent !== content) {
            otherContent.style.maxHeight = '0px';
            otherContent.style.opacity = '0';
            otherItem.classList.remove('bg-surface-container-high/40');
            if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
          }
        });

        if (isCollapsed) {
          content.style.maxHeight = content.scrollHeight + 'px';
          content.style.opacity = '1';
          item.classList.add('bg-surface-container-high/40');
          icon.style.transform = 'rotate(180deg)';
        } else {
          content.style.maxHeight = '0px';
          content.style.opacity = '0';
          item.classList.remove('bg-surface-container-high/40');
          icon.style.transform = 'rotate(0deg)';
        }
      });
    }
  });
}

/* ==========================================================================
   10. Blog Page Quick Read Article Drawer (Modal-less Reader)
   ========================================================================== */
function initBlogQuickRead() {
  // Inject Drawer HTML
  const drawerHTML = `
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
          <button type="button" onclick="if(window.openAIChat) { document.getElementById('close-drawer-btn').click(); window.openAIChat(); }" class="mt-3 flex items-center justify-center gap-2 bg-[#f1bf62]/10 border border-[#f1bf62]/30 hover:bg-[#f1bf62]/20 hover:border-[#f1bf62]/50 text-[#f1bf62] px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-all uppercase w-full">
            <span class="material-symbols-outlined text-sm">psychology</span>
            <span>ჰკითხეთ მეტი ინტელექტუალურ ასისტენტს</span>
          </button>
          
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
  `;

  document.body.insertAdjacentHTML('beforeend', drawerHTML);

  const drawer = document.getElementById('quick-read-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const closeBtn = document.getElementById('close-drawer-btn');
  
  if (!drawer || !backdrop) return;

  const articleData = {
    fear: {
      category: "ტრანსფორმაცია",
      date: "20 მარტი, 2024",
      title: "ცვლილებების შიში და მათი მიღება",
      image: "/blog_transformation.png",
      paragraphs: [
        "ცვლილებების შიში ფსიქოლოგიაში ერთ-ერთი ყველაზე გავრცელებული და ბუნებრივი მოვლენაა. ადამიანი ევოლუციურად მიდრეკილია სტაბილურობისკენ — ნაცნობი გარემო ჩვენთვის უსაფრთხოებასთან ასოცირდება, მაშინაც კი, როდესაც ეს გარემო ტოქსიკური ან არაკომფორტულია.",
        "პოზიტიური ფსიქოთერაპიის ჭრილში, ნებისმიერი ცვლილება არის მიზეზ-შედეგობრივი ჯაჭვის ახალი რგოლი. როდესაც ჩვენ ვეწინააღმდეგებით ცვლილებებს, ჩვენ ფაქტობრივად ვბლოკავთ ენერგიის ბუნებრივ დინებას, რაც იწვევს შინაგან კრიზისს, შფოთვას და მენტალურ სტაგნაციას.",
        "როგორ გადავაქციოთ შიში ზრდის ძალად? პირველი ნაბიჯი არის იმის გაცნობიერება, რომ შიში არ არის რეალური დაბრკოლება, ის მხოლოდ სიგნალია. სიგნალი იმისა, რომ ჩვენ მივუახლოვდით კომფორტის ზონის ზღვარს. ამ ზღვრის გადალახვა კი ერთადერთი გზაა ნამდვილი პიროვნული ტრანსფორმაციისა და ახალი ჰორიზონტების აღმოჩენისთვის."
      ]
    },
    balance: {
      category: "ჰარმონია",
      date: "18 მარტი, 2024",
      title: "ბალანსი სხეულსა და გონებას შორის",
      image: "/blog_balance.png",
      paragraphs: [
        "ჩვენ ხშირად განვიხილავთ გონებასა და სხეულს როგორც ორ დამოუკიდებელ სუბსტანციას. თუმცა, თანამედროვე ფსიქოსომატიკა და ნეირობიოლოგია საპირისპიროს გვიმტკიცებს: ყოველი შინაგანი ემოცია, განსაკუთრებით კი ჩახშობილი ტკივილი, მყისიერად აისახება სხეულებრივ დონეზე კუნთოვანი დაძაბულობის ან ქრონიკული გადაღლილობის სახით.",
        "მენტალური ჰიგიენა და სხეულის მოვლა განუყოფელი ნაწილებია. მარტივი მედიტაციური პრაქტიკები, როგორიცაა გაცნობიერებული სუნთქვა (Mindful Breathing) ან სხეულის სკანირება, საშუალებას გვაძლევს აღვადგინოთ ეს დარღვეული კავშირი.",
        "ყოველდღიურად დაუთმეთ 10 წუთი სრულ სიჩუმეს. მოუსმინეთ საკუთარი სხეულის სიგნალებს ყოველგვარი შეფასებისა და განსჯის გარეშე. ეს არის უმარტივესი, მაგრამ უაღრესად ეფექტური გზა შინაგანი ბალანსისა და მენტალური ჯანმრთელობის შესანარჩუნებლად."
      ]
    },
    discovery: {
      category: "თვითგანვითარება",
      date: "12 მარტი, 2024",
      title: "ხედვის წერტილი: საკუთარი თავის აღმოჩენა",
      image: "/blog_discovery.png",
      paragraphs: [
        "ვინ ვართ ჩვენ რეალურად, როდესაც ვთავისუფლდებით სოციალური როლებისგან, პროფესიული სტატუსებისა და სხვების მოლოდინებისგან? ეს კითხვა არის ეგზისტენციალური თერაპიის ქვაკუთხედი.",
        "საკუთარი თავის შეცნობა არ ნიშნავს რაღაც ახალის გამოგონებას, ეს უფრო მეტად ჰგავს ძველი, ნამდვილი არსის არქეოლოგიურ გათხრებს. ჩვენს ქვეცნობიერში დაგროვილია უამრავი რესურსი და პასუხი, რომლებსაც ყოველდღიური ქაოსის გამო ვერ ვამჩნევთ.",
        "ინდივიდუალური თერაპიის პროცესში, ჩვენ ერთად გავდივართ ამ გზას: ვხსნით ძველ თავდაცვით მექანიზმებს, ვსწავლობთ საკუთარი სურვილების იდენტიფიცირებას და ვქმნით ცხოვრების ახალ, გაცნობიერებულ არქიტექტურას, რომელიც დაფუძნებულია ავთენტურობაზე."
      ]
    },
    carmelogic: {
      category: "ფსიქოლოგია",
      date: "10 მარტი, 2024",
      title: "პოზიტიური ფსიქოთერაპია და თანამედროვეობა",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhrUPYKHmY8xXzLRDZHkkUuCiJTCJlAIIaWKr8KIDigCAsjyzZ62tUNFQSRGKd-TGLEzkd6khLnKOcwSRJy6Lw6dfqXy8wxC9vv9bLdbGKrA9m76Or-3j3RFo8FWnQLxuS46ruiXowRZWpKNDqTZTDiP4nVfKcr2pGi0rv3ZmQjQH6kWvQoHebEEGxv7NDf5GjsiUsWM-huzX_vE7yw_BqBTs7ZLgbWDWNJgnpjdzDQOZHJRxJgSJHealdrjShupMo94BdBChKaF3s",
      paragraphs: [
        "პოზიტიური ფსიქოთერაპია არ არის რელიგიური ან მისტიკური მიმდინარეობა. ეს არის პრაქტიკული ფსიქოთერაპიული მიდგომა, რომელიც ადამიანის შინაგანი რესურსებისა და შესაძლებლობების გაცნობიერებას ეყრდნობა.",
        "თანამედროვე სწრაფ სამყაროში ჩვენ ხშირად ვივიწყებთ ამ რესურსებს. ვმოქმედებთ იმპულსურად და შემდეგ გვიკვირს, რატომ ვაწყდებით ერთსა და იმავე პრობლემებს პირად ურთიერთობებსა თუ კარიერაში. პოზიტიური ფსიქოთერაპიის მიზანია შეგვაჩეროს და დაგვაფიქროს.",
        "როდესაც ჩვენ ვსწავლობთ ჩვენი ქცევის გაანალიზებას და ვიღებთ პასუხისმგებლობას საკუთარ არჩევანზე, ჩვენ ვწყვეტთ რეაქტიულ რეჟიმში ცხოვრებას და ვხდებით ჩვენივე ცხოვრების აქტიური და გაცნობიერებული ავტორები."
      ]
    },
    mindfulness: {
      category: "მედიტაცია",
      date: "05 მარტი, 2024",
      title: "გაცნობიერებული ყოფიერება",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRaKQyPJJtM1kkz3WKPkp_BVhuFkb8N0eyb02EL9EAPit1yo85CzQsR-Bp9dKGVS3HligZKGmFj0NKz-xUAe-wTNlPVqC2-3QmMndRlpIGm-v8_r-1GOpQGHPD-AkeWKHN5O5oAVAFLcMq47gTw16lEwqKVTts1aPRvIX9G5dWbU-uI8YkYK5OCs3uteOwBagJSLN_d3UiVxVBJyl_bB5ocl1xzI1dPcCldoth3C3yToqDP1dB3CdlFlO0YUC8ptbroDU11A9ZYuQt",
      paragraphs: [
        "მედიტაცია ხშირად არასწორად აღიქმება როგორც გონების სრული გათიშვა ან რეალობიდან გაქცევა. სინამდვილეში, მედიტაცია არის რეალობაში დაბრუნება — აწმყო მომენტის სრული გაცნობიერება და მიღება ისეთად, როგორიც ის არის.",
        "ჩვენი გონება მუდმივად მოგზაურობს წარსულის სინანულებსა და მომავლის შფოთვებში. მინდფულნესი (გაცნობიერებული ყოფიერება) გვასწავლის ყურადღების ღუზის ჩაშვებას მიმდინარე მომენტში. ეს შეიძლება იყოს სუნთქვა, ჩაის დალევა ან უბრალოდ ნაბიჯების ხმა.",
        "ჩვენს ცენტრში ჩვენ ვასწავლით არა რთულ ასკეტურ პრაქტიკებს, არამედ მარტივ მეთოდებს, რომლებიც მარტივად ინტეგრირდება თქვენს ყოველდღიურობაში და გეხმარებათ მენტალური სიმშვიდის შენარჩუნებაში ნებისმიერ სიტუაციაში."
      ]
    },
    // Ethereal Featured post (Silence)
    silence: {
      category: "თვითგანვითარება",
      date: "15 მარტი, 2024",
      title: "სიჩუმის ხელოვნება თანამედროვე ქაოსში",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKfEgmBdC9dXdoBxf2jBq1-t8RKe4rf4HTZtxUOmbc-v65bIxMpZ7SGhXte3Dz74RuunQr1L21sR-y_OagwOwERi5HJT8EOjbpssfKx7fAa7M8JY4FWslnB5eP_JrHhEGAF0743uQFJJE2tBBOb41Sbc0xDNt6jrewjouSneoNiCmXnDOkzkRgls8nYdBO-5dLdiUnRdrMMPDQWUeZkMyXa2avuKK1hEkmn3MpKRKKy4SIT-JQojF6RfbuXhkKITvTMA3BQiqhr-T9",
      paragraphs: [
        "სიჩუმე არ არის უბრალოდ ხმის არარსებობა. ეს არის ღრმა შინაგანი სივრცე, სადაც იბადება ნამდვილი შემოქმედება და პასუხები ჩვენს ყველაზე რთულ კითხვებზე. თანამედროვე სამყაროში ჩვენ მუდმივად გარშემორტყმული ვართ საინფორმაციო ხმაურით, რაც ფიტავს ჩვენს ნერვულ სისტემას.",
        "როდესაც ჩვენ ვსწავლობთ დუმილს, ჩვენ ვხსნით კარს საკუთარი ქვეცნობიერისთვის. სიჩუმეში ვხვდებით იმ შიშებსა და სურვილებს, რომლებსაც აქამდე ხმაურის მეშვეობით ვახშობდით. ეს არის შეხვედრა საკუთარ ავთენტურ მესთან.",
        "ჩვენი თერაპიული სესიების დროს, სიჩუმეს უმნიშვნელოვანესი როლი უჭირავს. ჩვენ არ ვცდილობთ ყველა პაუზის საუბრით შევსებას. სიჩუმეში ხდება ყველაზე დიდი გაცნობიერებები, როდესაც ფიქრი წყდება და იწყება ნამდვილი ხედვა."
      ]
    }
  };

  // Intercept click on articles read-more links
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('a');
    if (trigger && (trigger.textContent.includes('გაიგე მეტი') || trigger.href.includes('blog-post-quick'))) {
      e.preventDefault();
      
      // Determine which post was clicked based on title or parent attributes
      const articleEl = trigger.closest('article') || trigger.closest('section');
      if (!articleEl) return;
      
      let key = 'silence'; // Default fallback
      const titleText = articleEl.querySelector('h2, h3').textContent;
      
      if (titleText.includes('შიში')) key = 'fear';
      else if (titleText.includes('ბალანსი')) key = 'balance';
      else if (titleText.includes('ხედვის წერტილი')) key = 'discovery';
      else if (titleText.includes('კარმალოგიკა') || titleText.includes('პოზიტიური')) key = 'carmelogic';
      else if (titleText.includes('ყოფირება') || titleText.includes('გაცნობიერებული ყოფიერება')) key = 'mindfulness';
      else if (titleText.includes('სიჩუმის')) key = 'silence';

      const data = articleData[key];
      if (data) {
        openDrawer(data);
      }
    }
  });

  function openDrawer(data) {
    // Fill Drawer content
    document.getElementById('drawer-title').textContent = data.title;
    document.getElementById('drawer-image').src = data.image;
    document.getElementById('drawer-image').alt = data.title;
    
    const metaHTML = `
      <span>${data.category}</span>
      <span class="w-1.5 h-1.5 bg-secondary rounded-full"></span>
      <span>${data.date}</span>
    `;
    document.getElementById('drawer-meta').innerHTML = metaHTML;

    const contentEl = document.getElementById('drawer-content');
    contentEl.innerHTML = data.paragraphs.map(p => `<p>${p}</p>`).join('');

    // Animate Slide In
    drawer.classList.remove('translate-x-full', 'pointer-events-none');
    backdrop.classList.remove('opacity-0', 'pointer-events-none');
    backdrop.classList.add('opacity-100');
    document.body.style.overflow = 'hidden'; // Lock main scroll
  }

  function closeDrawer() {
    drawer.classList.add('translate-x-full', 'pointer-events-none');
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = ''; // Unlock scroll
  }

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);
  
  // ESC key closes drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });
}

/* ==========================================================================
   11. Ambient Background Video Scroll Scrub (Apple-Style Interaction)
   ========================================================================== */
function initVideoScrollScrub() {
  const video = document.querySelector('.ambient-video-bg video');
  if (video) {
    // 1. Pause video playback so we control it manually via scroll scrubbing
    video.pause();

    let targetTime = 0;
    let currentTime = 0;
    const ease = 0.08; // Butter-smooth LERP (Linear Interpolation) ease factor
    
    // We scale slightly and position fixed
    video.style.transform = 'translate3d(0, 0, 0) scale(1.1)';
    video.style.willChange = 'transform, currentTime';

    // 2. Listen to scroll events to calculate the target time
    window.addEventListener('scroll', () => {
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      
      const scrollFraction = window.scrollY / scrollHeight;
      if (video.duration) {
        targetTime = scrollFraction * video.duration;
      }
    });

    // 3. Ultra high-performance animation loop (running at 60fps/120fps via RAF)
    function updateScrub() {
      if (video.duration) {
        // Interpolate time smoothly towards target
        currentTime += (targetTime - currentTime) * ease;

        // Keep values strictly within bounds
        if (currentTime < 0) currentTime = 0;
        if (currentTime > video.duration) currentTime = video.duration;

        // Only update element state if change is physically noticeable to save CPU/GPU cycles
        if (Math.abs(video.currentTime - currentTime) > 0.01) {
          video.currentTime = currentTime;
        }
      }
      requestAnimationFrame(updateScrub);
    }

    // 4. Start scrubbing loop when metadata is ready (safeguard for duration loading)
    if (video.readyState >= 1) {
      requestAnimationFrame(updateScrub);
    } else {
      video.addEventListener('loadedmetadata', () => {
        requestAnimationFrame(updateScrub);
      });
    }
  }
}

/* ==========================================================================
   12. n8n AI Chat Agent Webhook Integration (Premium Glassmorphic Chatbot)
   ========================================================================== */
function initN8nChat() {
  if (document.getElementById('n8n-chat-widget')) return;
  
  // Define default webhook URL. Highly configurable!
  const N8N_WEBHOOK_URL = 'https://meticulous-oyster.pikapod.net/webhook/idc-website-chat';

  // Unique session ID for conversation memory
  const sessionId = 'session_' + Math.random().toString(36).substring(2, 15);

  const styleHTML = `
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
      @keyframes gold-glow-pulse {
        0% { box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 0px rgba(241, 191, 98, 0); }
        50% { box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(241, 191, 98, 0.6); }
        100% { box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 0px rgba(241, 191, 98, 0); }
      }
      .glow-pulse-active {
        animation: gold-glow-pulse 2s infinite ease-in-out !important;
      }
      #n8n-chat-tooltip {
        opacity: 0;
        transform: translateY(8px);
        transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
      }
      #n8n-chat-widget:not(.chat-opened):hover #n8n-chat-tooltip {
        opacity: 1;
        transform: translateY(0);
      }
      @media (max-width: 640px) {
        #n8n-chat-window {
          position: fixed !important;
          bottom: 5.5rem !important;
          left: 1rem !important;
          right: 1rem !important;
          width: auto !important;
          max-width: none !important;
          height: calc(100% - 7rem) !important;
          max-height: 70vh !important;
          transform-origin: bottom center !important;
        }
      }
    </style>
  `;

  const chatHTML = `
    ${styleHTML}
    <div id="n8n-chat-widget" class="fixed bottom-6 right-6 z-[100] font-sans">
      <!-- Tooltip showing purpose -->
      <div id="n8n-chat-tooltip" class="absolute bottom-16 right-0 mb-3 w-48 bg-[#1e2022]/95 border border-[#f1bf62]/20 text-[#c6c6ce] text-[11px] font-semibold px-4 py-2.5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md text-center">
        ინტელექტუალური ასისტენტი 🔮
        <div class="text-[9px] text-[#f1bf62] mt-0.5 font-bold uppercase tracking-wider">ჰკითხეთ კალენდარი და სერვისები</div>
        <div class="absolute bottom-[-5px] right-6 w-2.5 h-2.5 bg-[#1e2022]/95 border-r border-b border-[#f1bf62]/20 rotate-45"></div>
      </div>

      <!-- Floating Action Chat Button -->
      <button id="n8n-chat-trigger" class="glow-pulse-active w-14 h-14 rounded-full bg-[#1e2022]/80 border border-[#f1bf62]/20 text-[#f1bf62] hover:text-white flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_32px_rgba(241,191,98,0.2)] hover:border-[#f1bf62]/40 backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-1">
        <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">psychology</span>
      </button>
      
      <!-- Interactive Frosted Glass Chat Window (Slightly Transparent bg-[#1e2022]/75) -->
      <div id="n8n-chat-window" class="hidden absolute bottom-20 right-0 w-[360px] max-w-[calc(100vw-32px)] h-[500px] max-h-[80vh] flex flex-col bg-[#1e2022]/75 border border-white/10 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-300 scale-95 opacity-0 origin-bottom-right">
        
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
              გამარჯობა! 👋<br/><br/>მე ვარ IDC-ის (პოზიტიური ფსიქოთერაპიის საერთაშორისო ცენტრის) ვირტუალური ასისტენტი. როგორ შემიძლია დაგეხმაროთ? 🧠💬
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
  `;

  document.body.insertAdjacentHTML('beforeend', chatHTML);

  const widgetContainer = document.getElementById('n8n-chat-widget');
  const triggerBtn = document.getElementById('n8n-chat-trigger');
  const chatWindow = document.getElementById('n8n-chat-window');
  const closeBtn = document.getElementById('n8n-chat-close');
  const chatForm = document.getElementById('n8n-chat-form');
  const chatInput = document.getElementById('n8n-chat-input');
  const chatMessages = document.getElementById('n8n-chat-messages');

  if (!widgetContainer || !triggerBtn || !chatWindow || !closeBtn || !chatForm || !chatInput || !chatMessages) return;

  let autoOpenTimeout = null;

  const openChat = () => {
    const isHidden = chatWindow.classList.contains('hidden');
    if (isHidden) {
      if (autoOpenTimeout) {
        clearTimeout(autoOpenTimeout);
        autoOpenTimeout = null;
      }
      chatWindow.classList.remove('hidden');
      widgetContainer.classList.add('chat-opened');
      triggerBtn.classList.remove('glow-pulse-active');
      setTimeout(() => {
        chatWindow.style.transform = 'scale(1)';
        chatWindow.style.opacity = '1';
        chatInput.focus();
      }, 10);
      triggerBtn.style.transform = 'scale(0) rotate(180deg)';
      triggerBtn.style.opacity = '0';
    }
  };

  // Toggle chat window visibility
  triggerBtn.addEventListener('click', () => {
    localStorage.setItem('n8n_chat_closed_by_user', 'true');
    openChat();
  });

  const closeChat = () => {
    localStorage.setItem('n8n_chat_closed_by_user', 'true');
    chatWindow.style.transform = 'scale(0.95)';
    chatWindow.style.opacity = '0';
    setTimeout(() => {
      chatWindow.classList.add('hidden');
      widgetContainer.classList.remove('chat-opened');
      triggerBtn.classList.add('glow-pulse-active');
      triggerBtn.style.transform = 'scale(1) rotate(0deg)';
      triggerBtn.style.opacity = '1';
    }, 300);
  };

  closeBtn.addEventListener('click', closeChat);
  window.openAIChat = openChat;
  window.closeAIChat = closeChat;

  // Automatically open the chat window after a premium 20s delay, unless user has already closed/opened it in the past
  if (!localStorage.getItem('n8n_chat_closed_by_user')) {
    autoOpenTimeout = setTimeout(openChat, 20000);
  }

  // Send message
  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = '';

    // Append User Message to UI
    const userMessageHTML = `
      <div class="flex flex-col gap-1 max-w-[85%] self-end items-end animate-fade-in">
        <div class="bg-[#f1bf62]/10 border border-[#f1bf62]/30 text-[#f1bf62] px-4 py-3 rounded-2xl rounded-tr-none text-sm font-medium leading-relaxed">
          ${escapeHtml(userMessage)}
        </div>
        <span class="text-[9px] text-[#f1bf62]/50 font-bold uppercase tracking-wider pr-1">თქვენ</span>
      </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', userMessageHTML);
    scrollChatToBottom();

    // Append typing indicator
    const typingIndicatorId = 'typing-' + Date.now();
    const typingHTML = `
      <div id="${typingIndicatorId}" class="flex flex-col gap-1 max-w-[80%] self-start animate-fade-in">
        <div class="bg-white/5 border border-white/5 backdrop-blur-md text-[#c6c6ce] px-5 py-4 rounded-2xl rounded-tl-none">
          <div class="chat-typing-dots">
            <span class="chat-typing-dot"></span>
            <span class="chat-typing-dot"></span>
            <span class="chat-typing-dot"></span>
          </div>
        </div>
        <span class="text-[9px] text-[#c6c6ce]/40 font-bold uppercase tracking-wider pl-1">AI ასისტენტი</span>
      </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', typingHTML);
    scrollChatToBottom();

    // Call n8n Webhook API
    try {
      let botResponseText = 'სამწუხაროდ, კავშირის შეცდომაა. გთხოვთ სცადოთ მოგვიანებით.';
      
      if (N8N_WEBHOOK_URL && N8N_WEBHOOK_URL.trim() !== '') {
        const response = await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userMessage,
            sessionId: sessionId,
            sourceUrl: window.location.href
          })
        });

        if (response.ok) {
          const data = await response.json();
          botResponseText = data.output || data.response || data.text || (typeof data === 'string' ? data : JSON.stringify(data));
        }
      } else {
        botResponseText = 'AI ასისტენტის ვებჰუკი ჯერ არ არის კონფიგურირებული. გთხოვთ მიუთითოთ n8n Webhook URL კოდში (`src/main.js`).';
      }

      // Remove typing indicator
      const typingEl = document.getElementById(typingIndicatorId);
      if (typingEl) typingEl.remove();

      // Append Bot Response
      const botMessageHTML = `
        <div class="flex flex-col gap-1 max-w-[85%] self-start animate-fade-in">
          <div class="bg-white/5 border border-white/5 backdrop-blur-md text-[#c6c6ce] px-4 py-3 rounded-2xl rounded-tl-none text-sm font-medium leading-relaxed">
            ${parseMarkdown(botResponseText)}
          </div>
          <span class="text-[9px] text-[#c6c6ce]/40 font-bold uppercase tracking-wider pl-1">AI ასისტენტი</span>
        </div>
      `;
      chatMessages.insertAdjacentHTML('beforeend', botMessageHTML);
      scrollChatToBottom();

    } catch (err) {
      console.error('n8n integration error:', err);
      const typingEl = document.getElementById(typingIndicatorId);
      if (typingEl) typingEl.remove();

      const errorMessageHTML = `
        <div class="flex flex-col gap-1 max-w-[85%] self-start animate-fade-in text-red-400">
          <div class="bg-red-950/20 border border-red-500/20 px-4 py-3 rounded-2xl rounded-tl-none text-sm font-medium leading-relaxed">
            კავშირი ვერ დამყარდა n8n სერვერთან. გთხოვთ შეამოწმოთ ვებჰუკის მისამართი და სერვერის სტატუსი.
          </div>
          <span class="text-[9px] text-red-500/50 font-bold uppercase tracking-wider pl-1">სისტემური შეცდომა</span>
        </div>
      `;
      chatMessages.insertAdjacentHTML('beforeend', errorMessageHTML);
      scrollChatToBottom();
    }
  });

  function scrollChatToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
  }

  function parseMarkdown(text) {
    if (typeof text !== 'string') return '';
    let html = escapeHtml(text);
    
    // Bold: **text** to <strong>text</strong>
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#f1bf62]">$1</strong>');
    
    // Links: [Text](URL) to styled <a>
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="inline-flex items-center gap-0.5 text-[#f1bf62] hover:text-white underline decoration-[#f1bf62]/40 hover:decoration-white transition-all font-semibold">$1<span class="material-symbols-outlined text-[10px] inline-block align-middle ml-0.5">arrow_outward</span></a>');
    
    // Newlines to breaks
    html = html.replace(/\n/g, '<br/>');
    
    return html;
  }
}

/* ==========================================================================
   12. Visitor Counter Functionality
   ========================================================================== */
function initVisitorCounter() {
  const visitorCountEl = document.getElementById('visitor-count');
  if (visitorCountEl) {
    visitorCountEl.textContent = '1,280';
  }
}



