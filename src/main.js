// IDC Psychotherapy Web Application - Client-Side Interactive Logic & Premium Upgrades

document.addEventListener('DOMContentLoaded', () => {
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
});

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
    <div id="booking-modal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md opacity-0 pointer-events-none transition-all duration-300">
      <div class="bg-[#1e2022] border border-[#45464d]/15 p-8 md:p-12 rounded-none max-w-2xl w-full relative shadow-2xl transition-all duration-300 transform scale-95 max-h-[90vh] overflow-y-auto" id="booking-modal-card">
        <button id="close-modal-btn" class="absolute top-6 right-6 text-[#c6c6ce] hover:text-secondary transition-colors focus:outline-none">
          <span class="material-symbols-outlined text-3xl">close</span>
        </button>
        
        <div class="text-center mb-8">
          <span class="material-symbols-outlined text-secondary text-5xl mb-3 block" style="font-variation-settings: 'FILL' 1;">edit_calendar</span>
          <h2 class="text-3xl font-headline italic text-white leading-tight">სესიის დაჯავშნა</h2>
          <p class="text-sm text-on-surface-variant mt-2">შეავსეთ ფორმა და ჩვენი ადმინისტრატორი მალე დაგიკავშირდებათ</p>
        </div>
        
        <form class="space-y-6 contact-form" id="booking-modal-form">
          <div class="space-y-2">
            <label class="text-xs text-outline-variant tracking-widest uppercase ml-1">სახელი და გვარი</label>
            <input type="text" required class="w-full bg-[#121416] border border-outline-variant/30 focus:border-secondary focus:ring-0 rounded-xl py-3.5 px-4 text-on-surface placeholder:text-outline-variant/50 transition-colors" placeholder="თქვენი სახელი"/>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-xs text-outline-variant tracking-widest uppercase ml-1">ტელეფონი</label>
              <input type="tel" required class="w-full bg-[#121416] border border-outline-variant/30 focus:border-secondary focus:ring-0 rounded-xl py-3.5 px-4 text-on-surface placeholder:text-outline-variant/50 transition-colors" placeholder="+995 5__ __ __ __"/>
            </div>
            <div class="space-y-2">
              <label class="text-xs text-outline-variant tracking-widest uppercase ml-1">თარიღი</label>
              <input type="date" required class="w-full bg-[#121416] border border-outline-variant/30 focus:border-secondary focus:ring-0 rounded-xl py-3.5 px-4 text-on-surface transition-colors" style="color-scheme: dark;"/>
            </div>
          </div>
          
          <div class="space-y-2">
            <label class="text-xs text-outline-variant tracking-widest uppercase ml-1">სერვისი</label>
            <select class="w-full bg-[#121416] border border-outline-variant/30 focus:border-secondary focus:ring-0 rounded-xl py-3.5 px-4 text-on-surface appearance-none transition-colors">
              <option>ინდივიდუალური თერაპია</option>
              <option>წყვილთა თერაპია</option>
              <option>ჯგუფური თერაპია</option>
              <option>კონსულტაცია</option>
              <option>ქოუჩინგი</option>
              <option>ჯგუფური ქოუჩინგი</option>
            </select>
          </div>
          
          <div class="space-y-2">
            <label class="text-xs text-outline-variant tracking-widest uppercase ml-1">მოკლე შეტყობინება</label>
            <textarea rows="2" class="w-full bg-[#121416] border border-outline-variant/30 focus:border-secondary focus:ring-0 rounded-xl py-3.5 px-4 text-on-surface placeholder:text-outline-variant/50 resize-none transition-colors" placeholder="დაგვიწერეთ მოკლედ თქვენი მოთხოვნის შესახებ..."></textarea>
          </div>
          
          <button type="submit" class="w-full bg-secondary text-on-secondary py-4 rounded-xl font-semibold text-lg hover:brightness-110 active:scale-98 transition-all shadow-xl flex items-center justify-center gap-3">
            დაჯავშნა
            <span class="material-symbols-outlined">arrow_forward</span>
          </button>
        </form>
        
        <div class="relative flex py-4 items-center">
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
      
      const telInput = form.querySelector('input[type="tel"]');
      if (telInput && telInput.value) {
        const val = telInput.value.replace(/\s+/g, '');
        if (val.length < 5) {
          alert('გთხოვთ მიუთითოთ სწორი ტელეფონის ნომერი');
          return;
        }
      }

      // Collect data for n8n automation
      const nameInput = form.querySelector('input[type="text"]');
      const phoneInput = form.querySelector('input[type="tel"]');
      const dateInput = form.querySelector('input[type="date"]');
      const serviceSelect = form.querySelector('select');
      const messageTextarea = form.querySelector('textarea');

      const bookingData = {
        name: nameInput ? nameInput.value : '',
        phone: phoneInput ? phoneInput.value : '',
        date: dateInput ? dateInput.value : 'N/A',
        service: serviceSelect ? serviceSelect.value : 'ინდივიდუალური თერაპია',
        message: messageTextarea ? messageTextarea.value : '',
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
        // Beautifully formatted markdown notification message
        const telegramMessage = `🔔 *ახალი ჯავშანი საიტიდან!* 📅\n\n` +
          `👤 *სახელი:* ${bookingData.name}\n` +
          `📞 *ტელეფონი:* ${bookingData.phone}\n` +
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
      text: "პირველი ნაბიჯი ყოველთვის შინაგანი მდგომარეობის გაცნობიერებაა. კარმალოგიკის პრინციპებით, ჩვენ ვაკვირდებით იმ ქვეცნობიერ პროგრამებსა და ქცევებს, რომლებიც განსაზღვრავენ ჩვენს ყოველდღიურობას. საკუთარი თავის სიღრმისეული დაკვირვება იძლევა უნიკალურ ძალას შინაგანი ტრავმების ტრანსფორმაციისთვის.",
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
      text: "მყარი მენტალური საყრდენის შექმნა. ჩვენი თერაპიის უმთავრესი მიზანია კლიენტის მენტალური ჰიგიენის დამოუკიდებელი მართვა, რათა მომავალში მან მარტივად შეძლოს ცხოვრებისეული წნეხისადმი მედეგობისა და ფსიქოლოგიური სიმტკიცის შენარჩუნება.",
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
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbnyk4QIQ_2sIlv-u8Wy_pO8J_hqKmzpk7aMoM1JiI0-_IAOhNPZui9Bhn7xT1I8b8QP_CVaiDJC86i0pLy7HI7SsFxAKZ6l3GlAIviCFowzisqRrYAnE8GwNymxeyolOwLGsj0FovselHnG6dh-HEprMBPSKvslSuyBm7jrRpHPVjcPUesZSwY86fwhKKHn1DSH9XttSn1cBvoE3xJwpC9T8uB8iIu9uxvwAu7F6rBswgZnrpQmNlqKDGQW0_M-k13qHRI7y5w7qi",
      paragraphs: [
        "ცვლილებების შიში ფსიქოლოგიაში ერთ-ერთი ყველაზე გავრცელებული და ბუნებრივი მოვლენაა. ადამიანი ევოლუციურად მიდრეკილია სტაბილურობისკენ — ნაცნობი გარემო ჩვენთვის უსაფრთხოებასთან ასოცირდება, მაშინაც კი, როდესაც ეს გარემო ტოქსიკური ან არაკომფორტულია.",
        "კარმალოგიკის ჭრილში, ნებისმიერი ცვლილება არის მიზეზ-შედეგობრივი ჯაჭვის ახალი რგოლი. როდესაც ჩვენ ვეწინააღმდეგებით ცვლილებებს, ჩვენ ფაქტობრივად ვბლოკავთ ენერგიის ბუნებრივ დინებას, რაც იწვევს შინაგან კრიზისს, შფოთვას და მენტალურ სტაგნაციას.",
        "როგორ გადავაქციოთ შიში ზრდის ძალად? პირველი ნაბიჯი არის იმის გაცნობიერება, რომ შიში არ არის რეალური დაბრკოლება, ის მხოლოდ სიგნალია. სიგნალი იმისა, რომ ჩვენ მივუახლოვდით კომფორტის ზონის ზღვარს. ამ ზღვრის გადალახვა კი ერთადერთი გზაა ნამდვილი პიროვნული ტრანსფორმაციისა და ახალი ჰორიზონტების აღმოჩენისთვის."
      ]
    },
    balance: {
      category: "ჰარმონია",
      date: "18 მარტი, 2024",
      title: "ბალანსი სხეულსა და გონებას შორის",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbO1MqDB-1WjOZSxbE-vrpPPTzaYuUjODIqeUK7KUT3ZP4vZ6aID33RWcEqxcicUupMmHexd0VPQvsN3Vw4WfjtPy-nJEx1VemNT33aPOzgdp-iyVKaNtJg7zbbSFCa66j9CJRpr07H3zYeotG7-ohQoI71IK2Jnie--K4_pLwSKIqyvISCo7I4eau1y40TR_PqNC3DlXBBvAvVT9PStBqyHcgKkgWC1C8R1DQf53AlMvyjDHqRwAPXeKkAvj6GW7bvn6GP7OwN22T",
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
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBg_K5y6o_iz1i_tzPjiSPaA6TSxoWdPuFzoQvY9r2N46jfTST-fpLRHiRIfJP9tkq9VdiiqcL6rCTsihXCwuaJH8jo62kKnO9JPYfGS8dP1jzqa-jxHA4qmHTMUhOpMn8rXP8Pg78QSUANItFFNYh3-wDbDk1kqxpn3h3z6-3vZuZnsQPGUGhmlO_Gx1lyfh0KqZ6vWmHM56JnGXHIMynJzKSFcS5GP3YTwRRFKGpEzES5UXhb_QdeT46QDGzXfiNqey4g4VVeKVy1",
      paragraphs: [
        "ვინ ვართ ჩვენ რეალურად, როდესაც ვთავისუფლდებით სოციალური როლებისგან, პროფესიული სტატუსებისა და სხვების მოლოდინებისგან? ეს კითხვა არის ეგზისტენციალური თერაპიის ქვაკუთხედი.",
        "საკუთარი თავის შეცნობა არ ნიშნავს რაღაც ახალის გამოგონებას, ეს უფრო მეტად ჰგავს ძველი, ნამდვილი არსის არქეოლოგიურ გათხრებს. ჩვენს ქვეცნობიერში დაგროვილია უამრავი რესურსი და პასუხი, რომლებსაც ყოველდღიური ქაოსის გამო ვერ ვამჩნევთ.",
        "ინდივიდუალური თერაპიის პროცესში, ჩვენ ერთად გავდივართ ამ გზას: ვხსნით ძველ თავდაცვით მექანიზმებს, ვსწავლობთ საკუთარი სურვილების იდენტიფიცირებას და ვქმნით ცხოვრების ახალ, გაცნობიერებულ არქიტექტურას, რომელიც დაფუძნებულია ავთენტურობაზე."
      ]
    },
    carmelogic: {
      category: "ფსიქოლოგია",
      date: "10 მარტი, 2024",
      title: "კარმალოგიკა და თანამედროვეობა",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhrUPYKHmY8xXzLRDZHkkUuCiJTCJlAIIaWKr8KIDigCAsjyzZ62tUNFQSRGKd-TGLEzkd6khLnKOcwSRJy6Lw6dfqXy8wxC9vv9bLdbGKrA9m76Or-3j3RFo8FWnQLxuS46ruiXowRZWpKNDqTZTDiP4nVfKcr2pGi0rv3ZmQjQH6kWvQoHebEEGxv7NDf5GjsiUsWM-huzX_vE7yw_BqBTs7ZLgbWDWNJgnpjdzDQOZHJRxJgSJHealdrjShupMo94BdBChKaF3s",
      paragraphs: [
        "კარმალოგიკა არ არის რელიგიური ან მისტიკური მიმდინარეობა. ეს არის პრაქტიკული ფსიქოლოგიური ინსტრუმენტი, რომელიც ეყრდნობა მიზეზ-შედეგობრიობის ურყევ კანონს: ყოველი ჩვენი ფიქრი და ქმედება არის თესლი, რომელიც ადრე თუ გვიან გამოიღებს შესაბამის ნაყოფს.",
        "თანამედროვე სწრაფ სამყაროში ჩვენ ხშირად ვივიწყებთ ამ კავშირს. ვმოქმედებთ იმპულსურად და შემდეგ გვიკვირს, რატომ ვაწყდებით ერთსა და იმავე პრობლემებს პირად ურთიერთობებსა თუ კარიერაში. კარმალოგიკის მიზანია შეგვაჩეროს და დაგვაფიქროს.",
        "როდესაც ჩვენ ვსწავლობთ ჩვენი ქცევის გაანალიზებას და ვიღებთ პასუხისმგებლობას საკუთარ არჩევანზე, ჩვენ ვწყვეტთ რეაქტიულ რეჟიმში ცხოვრებას და ვხდებით ჩვენივე ბედისწერის აქტიური და გაცნობიერებული ავტორები."
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
      else if (titleText.includes('კარმალოგიკა')) key = 'carmelogic';
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


