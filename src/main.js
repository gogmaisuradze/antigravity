// IDC Psychotherapy Web Application - Client-Side Interactive Logic & Premium Upgrades
import { initTeamCircularSlider } from './team-circular-mount';
import { initNewsCoverFlow } from './news-coverflow-mount';

const initAll = () => {
  initMobileMenu();
  initBookingModal();
  initBlogFilters();
  initFormValidation();
  initFormPersistence();
  
  // Premium Aesthetic Upgrades
  initAmbientGlow();
  initScrollReveal();
  initFloatingNav();
  initHeroSlider();
  initMethodologyInteractions();
  initFAQAccordion();
  initBlogQuickRead();
  initVideoScrollScrub();
  initN8nChat();
  initVisitorCounter();
  initHorizontalSwitcher();
  initTeamCircularSlider();
  initNewsCoverFlow();
};

window.initAll = initAll;

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
    mobileMenuBtn.onclick = (e) => {
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
    };

    // Attach click listeners to all accordion triggers inside mobile menu
    mobileMenu.querySelectorAll('.mobile-accordion-toggle').forEach((toggleBtn) => {
      toggleBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const content = toggleBtn.nextElementSibling;
        const arrow = toggleBtn.querySelector('.accordion-arrow');
        if (content) {
          const isHidden = content.classList.contains('hidden');
          // Optional: close other accordions in the same menu for clean accordion behavior
          mobileMenu.querySelectorAll('.mobile-accordion-content').forEach(otherContent => {
            if (otherContent !== content) {
              otherContent.classList.add('hidden');
              const parent = otherContent.previousElementSibling;
              const otherArrow = parent ? parent.querySelector('.accordion-arrow') : null;
              if (otherArrow) {
                otherArrow.textContent = 'expand_more';
                otherArrow.classList.remove('rotate-180', 'text-[#1C3D63]');
              }
            }
          });

          if (isHidden) {
            content.classList.remove('hidden');
            if (arrow) {
              arrow.textContent = 'expand_less';
              arrow.classList.add('text-[#1C3D63]');
            }
          } else {
            content.classList.add('hidden');
            if (arrow) {
              arrow.textContent = 'expand_more';
              arrow.classList.remove('text-[#1C3D63]');
            }
          }
        }
      };
    });
  }

  if (!window.__mobileMenuCloseAttached) {
    window.__mobileMenuCloseAttached = true;
    document.addEventListener('click', (e) => {
      const curMobileMenu = document.getElementById('mobile-menu');
      const curBtn = document.getElementById('mobile-menu-btn');
      if (curMobileMenu && !curMobileMenu.contains(e.target) && e.target !== curBtn) {
        curMobileMenu.classList.add('hidden');
        const icon = curBtn ? curBtn.querySelector('span') : null;
        if (icon) icon.textContent = 'menu';
      }
    });
  }
}

/* ==========================================================================
   2. Interactive Calendar & Booking System (Metaphora Style for IDC)
   ========================================================================== */
function setupCalendar(config) {
  const {
    gridEl,
    monthTitleEl,
    prevBtnEl,
    nextBtnEl,
    slotsEl,
    summaryEl,
    dateInputEl,
    timeInputEl,
    eventBannerEl
  } = config;

  if (!gridEl || !slotsEl) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let viewDate = new Date();
  viewDate.setDate(1);

  let selectedDate = new Date();
  let selectedTime = '14:30';

  const MONTHS_KA = [
    'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი',
    'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
  ];
  const WDS_KA = ['ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ', 'კვი'];
  const SLOTS = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00', '20:00'];

  function updatePickedSummary() {
    if (summaryEl && selectedDate) {
      summaryEl.textContent = `${selectedDate.getDate()} ${MONTHS_KA[selectedDate.getMonth()]} · ${selectedTime}`;
    }
    if (dateInputEl && selectedDate) {
      const y = selectedDate.getFullYear();
      const m = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const d = String(selectedDate.getDate()).padStart(2, '0');
      dateInputEl.value = `${y}-${m}-${d}`;
    }
    if (timeInputEl) {
      timeInputEl.value = selectedTime;
    }
    if (eventBannerEl && selectedDate) {
      eventBannerEl.textContent = `📅 ${selectedDate.getDate()} ${MONTHS_KA[selectedDate.getMonth()]} | ${selectedTime} · პირველადი კონსულტაცია & თერაპია`;
    }
  }

  function renderSlots() {
    slotsEl.innerHTML = '';
    SLOTS.forEach(time => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `slot-btn ${time === selectedTime ? 'sel' : ''}`;
      btn.textContent = time;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        selectedTime = time;
        renderSlots();
        updatePickedSummary();
      });
      slotsEl.appendChild(btn);
    });
  }

  function renderCalendar() {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    if (monthTitleEl) {
      monthTitleEl.textContent = `${MONTHS_KA[month]} ${year}`;
    }

    gridEl.innerHTML = '';

    WDS_KA.forEach(wd => {
      const wdEl = document.createElement('div');
      wdEl.className = 'wd';
      wdEl.textContent = wd;
      gridEl.appendChild(wdEl);
    });

    const firstDay = new Date(year, month, 1).getDay();
    const startOffset = (firstDay + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < startOffset; i++) {
      const empty = document.createElement('div');
      empty.className = 'day empty';
      gridEl.appendChild(empty);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const cellDate = new Date(year, month, d);
      cellDate.setHours(0, 0, 0, 0);

      const isPast = (cellDate < today);
      const isSelected = selectedDate && (cellDate.toDateString() === selectedDate.toDateString());
      const hasEvent = (d % 2 === 0);

      const dayBtn = document.createElement('button');
      dayBtn.type = 'button';
      dayBtn.className = `day ${isSelected ? 'sel' : ''} ${hasEvent ? 'has-event' : ''} ${isPast ? 'past' : ''}`;
      
      let dotHtml = hasEvent ? '<span class="day-dot"></span>' : '';
      dayBtn.innerHTML = `<span>${d}</span>${dotHtml}`;

      if (isPast) {
        dayBtn.disabled = true;
      } else {
        dayBtn.addEventListener('click', (e) => {
          e.preventDefault();
          selectedDate = new Date(year, month, d);
          renderCalendar();
          updatePickedSummary();
        });
      }

      gridEl.appendChild(dayBtn);
    }

    if (prevBtnEl) {
      const prevMonthLast = new Date(year, month, 0);
      prevBtnEl.disabled = (prevMonthLast < today);
      prevBtnEl.style.opacity = prevBtnEl.disabled ? '0.35' : '1';
    }
  }

  if (prevBtnEl) {
    prevBtnEl.addEventListener('click', (e) => {
      e.preventDefault();
      viewDate.setMonth(viewDate.getMonth() - 1);
      renderCalendar();
    });
  }

  if (nextBtnEl) {
    nextBtnEl.addEventListener('click', (e) => {
      e.preventDefault();
      viewDate.setMonth(viewDate.getMonth() + 1);
      renderCalendar();
    });
  }

  renderCalendar();
  renderSlots();
  updatePickedSummary();
}

function initBookingModal() {
  // Initialize in-page calendar if present (e.g. on index.html)
  const pageCalGrid = document.getElementById('page-cal-grid-container');
  if (pageCalGrid) {
    setupCalendar({
      gridEl: pageCalGrid,
      monthTitleEl: document.getElementById('page-cal-month-title'),
      prevBtnEl: document.getElementById('page-cal-prev-btn'),
      nextBtnEl: document.getElementById('page-cal-next-btn'),
      slotsEl: document.getElementById('page-cal-slots-container'),
      summaryEl: document.getElementById('page-booking-picked-summary'),
      dateInputEl: document.getElementById('page-booking-date-input'),
      timeInputEl: document.getElementById('page-booking-time-input'),
      eventBannerEl: document.getElementById('page-cal-banner-title')
    });

    const pageForm = document.getElementById('page-booking-form');
    if (pageForm) {
      pageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const statusEl = document.getElementById('page-booking-status');
        const name = document.getElementById('page-booking-name-input')?.value || '';
        const phone = document.getElementById('page-booking-phone-input')?.value || '';
        const service = document.getElementById('page-booking-service-select')?.value || '';
        const date = document.getElementById('page-booking-date-input')?.value || '';
        const time = document.getElementById('page-booking-time-input')?.value || '';

        if (statusEl) {
          statusEl.className = 'p-3.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 block shadow-sm';
          statusEl.innerHTML = `✓ გმადლობთ, <strong>${name}</strong>! თქვენი ჯავშანი (${service}, ${date} · ${time}) მიღებულია. ჩვენი ადმინისტრატორი დაგიკავშირდებათ ნომერზე: ${phone}.`;
        }
        pageForm.reset();
      });
    }
  }

  if (document.getElementById('booking-modal')) return;

  // Inject Modal HTML into the bottom of body
  const modalHTML = `
    <div id="booking-modal" class="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-[#1C3D63]/60 backdrop-blur-md opacity-0 pointer-events-none transition-all duration-300">
      <div class="bg-[#FFFFFF] rounded-[1.5rem] sm:rounded-[2rem] shadow-[0px_25px_60px_rgba(28,61,99,0.25)] border border-[#D8C4B6] max-w-4xl w-full relative transition-all duration-500 transform scale-95 max-h-[92vh] flex flex-col text-left overflow-hidden" id="booking-modal-card">
        
        <!-- Pinned Close Button: Fixed to top-right of modal card at all times, NEVER scrolls away -->
        <button id="close-modal-btn" class="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md border border-[#D8C4B6] text-[#1C3D63] hover:bg-[#1C3D63] hover:text-white hover:border-[#1C3D63] flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-200 focus:outline-none z-50 cursor-pointer hover:scale-105 active:scale-95" aria-label="ფანჯრის დახურვა">
          <span class="material-symbols-outlined text-2xl">close</span>
        </button>

        <!-- Inner Scrollable Content Area -->
        <div class="overflow-y-auto p-5 sm:p-7 md:p-8 flex-grow">
          <!-- STEP 1: Interactive Calendar & Booking Form (Metaphora Style) -->
          <div id="booking-step-form">
          <div class="mb-5 text-left">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0AC6B]/15 border border-[#E0AC6B]/40 text-[#1C3D63] text-xs font-bold uppercase tracking-wider mb-2">
              <span class="material-symbols-outlined text-sm text-[#E0AC6B]">calendar_month</span>
              <span>✨ ონლაინ დაჯავშნა</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-headline italic text-[#1C3D63] font-bold">აირჩიე დღე და დრო</h2>
            <p class="text-xs sm:text-sm text-[#3B5E63]">დაჯავშნე ვიზიტი კალენდარში — დაგიდასტურებთ ტელეფონით.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#FAF7F2]/60 border border-[#D8C4B6] rounded-2xl p-4 sm:p-6 mb-4">
            
            <!-- Left: Calendar & Time Slots Pane (7 cols) -->
            <div class="md:col-span-7 bg-white p-4 sm:p-5 rounded-2xl border border-[#D8C4B6]/80 shadow-sm flex flex-col justify-between">
              <div>
                <!-- Calendar Month & Nav -->
                <div class="flex items-center justify-between mb-4">
                  <div class="text-base sm:text-lg font-headline italic font-bold text-[#1C3D63]" id="modal-cal-month-title">
                    სექტემბერი 2026
                  </div>
                  <div class="flex items-center gap-1.5">
                    <button type="button" id="modal-cal-prev-btn" class="w-8 h-8 rounded-lg border border-[#D8C4B6] bg-white hover:bg-[#1C3D63] hover:text-white text-[#1C3D63] flex items-center justify-center transition-all cursor-pointer">
                      <span class="material-symbols-outlined text-sm">chevron_left</span>
                    </button>
                    <button type="button" id="modal-cal-next-btn" class="w-8 h-8 rounded-lg border border-[#D8C4B6] bg-white hover:bg-[#1C3D63] hover:text-white text-[#1C3D63] flex items-center justify-center transition-all cursor-pointer">
                      <span class="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>

                <!-- Days of week & Grid -->
                <div class="cal-grid grid grid-cols-7 gap-1.5 mb-4 text-center" id="modal-cal-grid-container">
                  <!-- Populated dynamically -->
                </div>
              </div>

              <div>
                <!-- Scheduled Banner -->
                <div class="p-2.5 rounded-xl bg-[#F4F7F7] border border-[#D8C4B6] flex items-center justify-between text-xs mb-3">
                  <span class="text-[11px] font-bold text-[#1C3D63]" id="modal-cal-event-banner">📅 პირველადი კონსულტაცია &amp; თერაპია</span>
                  <span class="text-[9px] bg-[#E0AC6B] text-[#1C3D63] font-bold px-2 py-0.5 rounded-full font-sans">ხელმისაწვდომია</span>
                </div>

                <!-- Time slots -->
                <div>
                  <div class="text-[11px] font-bold uppercase tracking-wider text-[#1C3D63] mb-2">აირჩიე დრო</div>
                  <div class="grid grid-cols-4 gap-1.5" id="modal-cal-slots-container">
                    <!-- Populated dynamically -->
                  </div>
                </div>
              </div>
            </div>

            <!-- Right: Details Form Pane (5 cols) -->
            <div class="md:col-span-5 flex flex-col justify-between">
              <div>
                <h3 class="text-lg font-headline italic font-bold text-[#1C3D63] mb-1">ვიზიტის დეტალები</h3>
                <p class="text-xs text-[#8E8276] mb-3">აირჩიეთ მიმართულება, სერვისი და ფორმატი.</p>

                <!-- Picked Summary Badge -->
                <div class="p-2.5 rounded-xl bg-white border border-[#D8C4B6] flex items-center gap-2 mb-3 shadow-sm">
                  <span class="material-symbols-outlined text-sm text-[#E0AC6B]">event</span>
                  <span class="text-xs font-bold text-[#1C3D63]" id="modal-booking-picked-summary">15 სექტემბერი · 14:30</span>
                </div>

                <form class="space-y-3" id="booking-modal-form">
                  <input type="hidden" id="modal-booking-date-input" name="booking_date" value="2026-09-15">
                  <input type="hidden" id="modal-booking-time-input" name="booking_time" value="14:30">
                  <input type="hidden" id="booking-category-input" name="category" value="therapy">
                  <input type="hidden" id="booking-price-input" name="price" value="80 ₾">

                  <!-- 1. მიმართულება: განათლება და თერაპია -->
                  <div>
                    <label class="block text-[11px] font-bold text-[#1C3D63] uppercase tracking-wider mb-1.5">მიმართულება</label>
                    <div class="grid grid-cols-2 gap-2 p-1 bg-[#F4F7F7] border border-[#D8C4B6] rounded-xl" id="booking-category-toggle">
                      <button type="button" data-category="therapy" id="cat-btn-therapy" class="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all bg-[#1C3D63] text-white shadow-sm border border-[#1C3D63] cursor-pointer">
                        <span class="material-symbols-outlined text-sm text-[#E0AC6B]">psychology</span>
                        <span>თერაპია</span>
                      </button>
                      <button type="button" data-category="education" id="cat-btn-education" class="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all bg-white text-[#3B5E63] hover:text-[#1C3D63] border border-transparent cursor-pointer">
                        <span class="material-symbols-outlined text-sm text-[#8E8276]">school</span>
                        <span>განათლება</span>
                      </button>
                    </div>
                  </div>

                  <!-- 2. სერვისის / კურსის არჩევანი შესაბამისად -->
                  <div>
                    <label class="block text-[11px] font-bold text-[#1C3D63] uppercase tracking-wider mb-1" id="booking-service-label">თერაპიული სერვისი</label>
                    <select name="service" id="booking-service-select" required class="w-full bg-white border border-[#D8C4B6] focus:border-[#1C3D63] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-[#222222] font-medium shadow-sm transition-all cursor-pointer">
                      <!-- Populated dynamically via JS -->
                    </select>
                  </div>

                  <!-- 3. საფასურის უჯრა -->
                  <div>
                    <label class="block text-[11px] font-bold text-[#1C3D63] uppercase tracking-wider mb-1">საფასური</label>
                    <div class="flex items-center justify-between px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D8C4B6] rounded-xl shadow-inner">
                      <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-base text-[#E0AC6B]">payments</span>
                        <span class="text-xs text-[#3B5E63] font-medium">მომსახურების საფასური:</span>
                      </div>
                      <span id="booking-price-display" class="text-sm font-headline italic font-bold text-[#1C3D63] bg-white px-3 py-1 rounded-lg border border-[#D8C4B6]/60 shadow-sm">
                        80 ₾
                      </span>
                    </div>
                  </div>

                  <!-- 4. ფორმატი -->
                  <div>
                    <label class="block text-[11px] font-bold text-[#1C3D63] uppercase tracking-wider mb-1">ფორმატი</label>
                    <select name="format" id="booking-format-select" class="w-full bg-white border border-[#D8C4B6] focus:border-[#1C3D63] focus:outline-none rounded-xl px-3 py-2 text-xs text-[#222222] cursor-pointer">
                      <option value="პირისპირ" selected>🏢 პირისპირ კაბინეტში (ჭავჭავაძის 2)</option>
                      <option value="ონლაინ">💻 ონლაინ ვიდეოზარი (Google Meet / Zoom)</option>
                    </select>
                  </div>

                  <!-- Submit Button -->
                  <div class="pt-2">
                    <button type="submit" class="w-full bg-[#1C3D63] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#254F7F] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98">
                      <span>ვიზიტის დაჯავშნა</span>
                      <span class="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </form>
              </div>

              <!-- Direct Messenger Contacts -->
              <div class="pt-3 border-t border-[#D8C4B6]/60 mt-3 flex items-center justify-between text-xs text-[#8E8276]">
                <span>ან პირდაპირ:</span>
                <div class="flex items-center gap-2">
                  <a href="https://t.me/IDCPosotherapybot" target="_blank" class="text-[#1C3D63] hover:text-[#229ED9] font-bold no-underline">Telegram</a>
                  <span>·</span>
                  <a href="https://wa.me/995598324020" target="_blank" class="text-[#1C3D63] hover:text-[#25D366] font-bold no-underline">WhatsApp</a>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- STEP 2: Payment & Confirmation Grid -->
        <div id="booking-step-payment" class="hidden space-y-4">
          <button type="button" id="modal-btn-payment-back" class="inline-flex items-center gap-1.5 text-xs text-[#1C3D63] font-bold hover:underline cursor-pointer border-none bg-transparent p-0">
            <span class="material-symbols-outlined text-sm">arrow_back</span>
            <span>← კალენდარზე დაბრუნება</span>
          </button>

          <div class="mb-3 text-center">
            <div class="w-12 h-12 rounded-full bg-[#F4F7F7] border border-[#D8C4B6] flex items-center justify-center text-[#E0AC6B] mb-2 mx-auto shadow-sm">
              <span class="material-symbols-outlined text-2xl">account_balance_wallet</span>
            </div>
            <h3 class="text-xl sm:text-2xl font-extrabold text-[#1C3D63]" id="modal-payment-title">გადახდა საბანკო გადარიცხვით</h3>
            <p class="text-xs text-[#3B5E63] mt-1">ჯავშნის დასასრულებლად გადაიხადეთ საფასური</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            
            <!-- Left Side: Summary Details -->
            <div class="p-4 sm:p-5 bg-white rounded-2xl shadow-sm border border-[#D8C4B6] flex flex-col justify-between space-y-3">
              <div>
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E0AC6B]/15 border border-[#E0AC6B]/40 text-[#1C3D63] text-[10px] font-bold uppercase tracking-wider mb-2">
                  შერჩეული ჯავშანი
                </span>
                <div class="space-y-2 text-xs">
                  <div>
                    <span class="text-[10px] text-[#8E8276] uppercase tracking-wider block">სერვისი / კურსი:</span>
                    <strong class="text-xs sm:text-sm text-[#1C3D63] font-headline italic" id="modal-summary-service">პირველადი კონსულტაცია &amp; შეფასება</strong>
                  </div>
                  <div>
                    <span class="text-[10px] text-[#8E8276] uppercase tracking-wider block">თარიღი &amp; დრო:</span>
                    <span class="text-xs font-semibold text-[#222222]" id="modal-summary-datetime">15 სექტემბერი · 14:30</span>
                  </div>
                  <div>
                    <span class="text-[10px] text-[#8E8276] uppercase tracking-wider block">ფორმატი:</span>
                    <span class="text-xs font-semibold text-[#222222]" id="modal-summary-format">პირისპირ კაბინეტში</span>
                  </div>
                </div>
              </div>

              <div class="p-3 bg-[#FAF7F2] border border-[#E0AC6B]/40 rounded-xl flex items-center justify-between">
                <span class="text-xs font-bold text-[#1C3D63]">საფასური:</span>
                <span class="text-base sm:text-lg font-headline italic font-bold text-[#1C3D63]" id="modal-summary-price">80 ₾</span>
              </div>
            </div>

            <!-- Right Side: Bank Transfer Details -->
            <div class="space-y-3">
              <!-- Mobile / Web Bank Links -->
              <div class="space-y-1.5">
                <p class="text-xs text-[#1C3D63] font-semibold text-center flex items-center justify-center gap-1">
                  <span class="material-symbols-outlined text-sm text-[#E0AC6B]">touch_app</span>
                  <span>გადასვლა ინტერნეტ ბანკში:</span>
                </p>
                <div class="grid grid-cols-2 gap-2">
                  <a href="https://bankofgeorgia.ge" target="_blank" rel="noopener" class="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#ff6700] hover:bg-[#e65c00] rounded-xl text-white font-bold text-xs no-underline shadow-sm transition-all text-center">
                    <span>საქართველოს ბანკი</span>
                  </a>
                  <a href="https://tbcbank.ge" target="_blank" rel="noopener" class="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#00adef] hover:bg-[#009bd7] rounded-xl text-white font-bold text-xs no-underline shadow-sm transition-all text-center">
                    <span>თიბისი ბანკი</span>
                  </a>
                </div>
              </div>

              <!-- Bank Account Transfer Details -->
              <div class="bg-[#F4F7F7] border border-[#D8C4B6] rounded-xl p-3.5 text-left space-y-2 text-xs">
                <div>
                  <span class="text-[10px] text-[#8E8276] block uppercase tracking-wider font-semibold">მიმღები</span>
                  <span class="font-bold text-[#222222]">ანი მაისურაძე</span>
                </div>
                <div>
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] text-[#8E8276] block uppercase tracking-wider font-semibold">ანგარიშის ნომერი (IBAN)</span>
                    <button type="button" id="modal-copy-iban" class="text-[10px] text-[#1C3D63] hover:underline cursor-pointer flex items-center gap-0.5 border-none bg-transparent font-bold">
                      <span class="material-symbols-outlined text-xs">content_copy</span> კოპირება
                    </button>
                  </div>
                  <span id="modal-iban-text" class="font-mono font-bold text-[#1C3D63] break-all">GE93BG0000000192399800</span>
                </div>
                <div>
                  <span class="text-[10px] text-[#8E8276] block uppercase tracking-wider font-semibold">დანიშნულება</span>
                  <span id="modal-payment-purpose" class="font-semibold text-[#222222]">ჯავშნის საფასური</span>
                </div>
              </div>

              <!-- Success Notification / Confirm -->
              <div class="pt-1 text-center space-y-1.5">
                <button type="button" id="modal-btn-payment-confirm" class="w-full bg-[#1C3D63] hover:bg-[#254F7F] text-white py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined text-base">task_alt</span>
                  <span>ჯავშნის დადასტურება</span>
                </button>
                <p class="text-[10px] text-[#8E8276]">გადარიცხვის შემდეგ დააჭირეთ დადასტურებას</p>
              </div>
            </div>

          </div>
        </div>

        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const modal = document.getElementById('booking-modal');
  const modalCard = document.getElementById('booking-modal-card');
  const closeBtn = document.getElementById('close-modal-btn');
  const stepForm = document.getElementById('booking-step-form');
  const stepPayment = document.getElementById('booking-step-payment');

  setupCalendar({
    gridEl: document.getElementById('modal-cal-grid-container'),
    monthTitleEl: document.getElementById('modal-cal-month-title'),
    prevBtnEl: document.getElementById('modal-cal-prev-btn'),
    nextBtnEl: document.getElementById('modal-cal-next-btn'),
    slotsEl: document.getElementById('modal-cal-slots-container'),
    summaryEl: document.getElementById('modal-booking-picked-summary'),
    dateInputEl: document.getElementById('modal-booking-date-input'),
    timeInputEl: document.getElementById('modal-booking-time-input'),
    eventBannerEl: document.getElementById('modal-cal-event-banner')
  });

  const bookingServicesData = {
    therapy: {
      name: 'თერაპია',
      label: 'თერაპიული სერვისი',
      services: [
        { id: 'consultation', name: 'პირველადი კონსულტაცია & შეფასება', price: '80 ₾' },
        { id: 'individual', name: 'ინდივიდუალური ფსიქოთერაპია', price: '120 ₾' },
        { id: 'couples', name: 'წყვილთა & ოჯახური თერაპია', price: '160 ₾' },
        { id: 'group', name: 'ჯგუფური ფსიქოთერაპია', price: '60 ₾' },
        { id: 'coaching', name: 'პერსონალური ქოუჩინგი', price: '150 ₾' },
        { id: 'group_coaching', name: 'ჯგუფური / კორპორატიული ქოუჩინგი', price: '250 ₾' }
      ]
    },
    education: {
      name: 'განათლება',
      label: 'საგანმანათლებლო პროგრამა / კურსი',
      services: [
        { id: 'wapp', name: 'WAPP საერთაშორისო საბაზისო კურსი', price: '1,500 ₾' },
        { id: 'erickson', name: 'ერიქსონის ქოუჩინგის აკადემია', price: '2,800 ₾' },
        { id: 'art', name: 'არტთერაპიის 1-წლიანი კურსი', price: '1,800 ₾' },
        { id: 'practical', name: 'პრაქტიკული ფსიქოლოგიის კურსი', price: '1,200 ₾' },
        { id: 'master', name: 'მასტერკურსი & სუპერვიზია', price: '2,200 ₾' },
        { id: 'seminars', name: 'სემინარები & ვორქშოფები', price: '150 ₾' }
      ]
    }
  };

  const catBtnTherapy = document.getElementById('cat-btn-therapy');
  const catBtnEdu = document.getElementById('cat-btn-education');
  const catInput = document.getElementById('booking-category-input');
  const serviceLabel = document.getElementById('booking-service-label');
  const serviceSelect = document.getElementById('booking-service-select');
  const priceDisplay = document.getElementById('booking-price-display');
  const priceInput = document.getElementById('booking-price-input');
  const calBannerEl = document.getElementById('modal-cal-event-banner');

  function updateCategory(cat, preselectedService) {
    if (!bookingServicesData[cat]) cat = 'therapy';
    if (catInput) catInput.value = cat;

    if (cat === 'therapy') {
      if (catBtnTherapy) catBtnTherapy.className = 'flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all bg-[#1C3D63] text-white shadow-sm border border-[#1C3D63] cursor-pointer';
      if (catBtnEdu) catBtnEdu.className = 'flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all bg-white text-[#3B5E63] hover:text-[#1C3D63] border border-transparent cursor-pointer';
    } else {
      if (catBtnEdu) catBtnEdu.className = 'flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all bg-[#1C3D63] text-white shadow-sm border border-[#1C3D63] cursor-pointer';
      if (catBtnTherapy) catBtnTherapy.className = 'flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all bg-white text-[#3B5E63] hover:text-[#1C3D63] border border-transparent cursor-pointer';
    }

    if (serviceLabel) serviceLabel.textContent = bookingServicesData[cat].label;

    if (serviceSelect) {
      serviceSelect.innerHTML = '';
      const items = bookingServicesData[cat].services;
      items.forEach((item, idx) => {
        const opt = document.createElement('option');
        opt.value = item.name;
        opt.setAttribute('data-price', item.price);
        opt.textContent = `${item.name} (${item.price})`;
        if (preselectedService && (item.id === preselectedService || item.name.includes(preselectedService))) {
          opt.selected = true;
        } else if (!preselectedService && idx === 0) {
          opt.selected = true;
        }
        serviceSelect.appendChild(opt);
      });
    }

    updatePrice();
  }

  function updatePrice() {
    if (!serviceSelect) return;
    const selectedOpt = serviceSelect.options[serviceSelect.selectedIndex];
    if (selectedOpt) {
      const price = selectedOpt.getAttribute('data-price') || '';
      if (priceDisplay) priceDisplay.textContent = price;
      if (priceInput) priceInput.value = price;
      if (calBannerEl) {
        calBannerEl.textContent = `📅 ${selectedOpt.value}`;
      }
    }
  }

  if (catBtnTherapy) catBtnTherapy.addEventListener('click', () => updateCategory('therapy'));
  if (catBtnEdu) catBtnEdu.addEventListener('click', () => updateCategory('education'));
  if (serviceSelect) serviceSelect.addEventListener('change', updatePrice);

  // Initialize with therapy
  updateCategory('therapy');

  // Form submission -> Step 2
  const modalForm = document.getElementById('booking-modal-form');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const cat = catInput ? catInput.value : 'therapy';
      const service = serviceSelect ? serviceSelect.value : '';
      const price = priceInput ? priceInput.value : '';
      const date = document.getElementById('modal-booking-date-input')?.value || '';
      const time = document.getElementById('modal-booking-time-input')?.value || '';
      const formatSelect = document.getElementById('booking-format-select');
      const format = formatSelect ? formatSelect.options[formatSelect.selectedIndex].text : 'პირისპირ კაბინეტში (ჭავჭავაძის 2)';
      const summaryDatetime = document.getElementById('modal-booking-picked-summary')?.textContent || `${date} · ${time}`;

      if (stepForm) stepForm.classList.add('hidden');
      if (stepPayment) {
        stepPayment.classList.remove('hidden');

        const sumService = document.getElementById('modal-summary-service');
        if (sumService) sumService.textContent = service;

        const sumDatetime = document.getElementById('modal-summary-datetime');
        if (sumDatetime) sumDatetime.textContent = summaryDatetime;

        const sumFormat = document.getElementById('modal-summary-format');
        if (sumFormat) sumFormat.textContent = format;

        const sumPrice = document.getElementById('modal-summary-price');
        if (sumPrice) sumPrice.textContent = price;

        const purpose = document.getElementById('modal-payment-purpose');
        if (purpose) purpose.textContent = `ჯავშნის საფასური - ${service} (${price})`;
      }
    });
  }

  // Step 2 Payment Handlers
  const backBtn = document.getElementById('modal-btn-payment-back');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (stepPayment) stepPayment.classList.add('hidden');
      if (stepForm) stepForm.classList.remove('hidden');
    });
  }

  const copyIbanBtn = document.getElementById('modal-copy-iban');
  if (copyIbanBtn) {
    copyIbanBtn.addEventListener('click', () => {
      const iban = document.getElementById('modal-iban-text')?.textContent || 'GE93BG0000000192399800';
      navigator.clipboard.writeText(iban).then(() => {
        showToast('✓ IBAN ანგარიშის ნომერი დაკოპირდა!');
      }).catch(() => {
        showToast(iban);
      });
    });
  }

  const confirmBtn = document.getElementById('modal-btn-payment-confirm');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      showToast('✓ თქვენი ვიზიტი დაჯავშნილია!');
      setTimeout(() => {
        closeModal();
      }, 1500);
    });
  }

  function openModal(initialCategory, initialService) {
    if (stepForm) stepForm.classList.remove('hidden');
    if (stepPayment) stepPayment.classList.add('hidden');
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modalCard.classList.remove('scale-95');
    modalCard.classList.add('scale-100');
    if (initialCategory) {
      updateCategory(initialCategory, initialService);
    }
  }

  function closeModal() {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modalCard.classList.remove('scale-100');
    modalCard.classList.add('scale-95');
    setTimeout(() => {
      if (stepForm) stepForm.classList.remove('hidden');
      if (stepPayment) stepPayment.classList.add('hidden');
    }, 300);
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Set up event delegation for booking buttons (supports dynamically created ones)
  document.addEventListener('click', (e) => {
    const btn = e.target && (e.target.classList.contains('booking-btn') ? e.target : e.target.closest('.booking-btn'));
    if (btn) {
      e.preventDefault();
      const cat = btn.getAttribute('data-category') || (window.location.pathname.includes('education') ? 'education' : 'therapy');
      const service = btn.getAttribute('data-service');
      openModal(cat, service);
    }
  });

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
          f.className = 'category-filter px-4 py-2 rounded-xl bg-white border border-[#D8C4B6] text-[#222222] hover:border-[#1C3D63] hover:text-[#1C3D63] transition-all cursor-pointer shadow-sm font-semibold';
        });
        filter.className = 'category-filter px-4 py-2 rounded-xl bg-[#1C3D63] text-white cursor-pointer shadow-sm font-semibold';

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
      <div class="bg-[#FFFFFF] border border-[#D8C4B6] p-6 rounded-2xl shadow-[0_15px_40px_rgba(28,61,99,0.15)] flex items-start gap-4">
        <div class="bg-[#F4F7F7] border border-[#D8C4B6] p-2 rounded-xl text-[#E0AC6B]">
          <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">task_alt</span>
        </div>
        <div>
          <h4 class="font-headline italic text-[#1C3D63] text-lg">გაგზავნილია!</h4>
          <p class="text-xs text-[#3B5E63] mt-1" id="toast-message">შეტყობინება წარმატებით გაიგზავნა. ჩვენ მალე დაგიკავშირდებით.</p>
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
  const telegramBotToken = ''; // ტოკენი ამოღებულია უსაფრთხოებისთვის — შეტყობინება n8n webhook-ით უნდა გავიდეს, არა პირდაპირ
  const telegramChatId = '443575738';   // E.g., 'YOUR_CHAT_ID'

  // Capture all forms with class 'contact-form' (excluding booking modal which has specialized handler)
  document.addEventListener('submit', (e) => {
    if (e.target && e.target.classList.contains('contact-form') && e.target.id !== 'booking-modal-form') {
      const form = e.target;
      if (form.id === 'registration-form') return; // Handled specially by registration.html
      
      e.preventDefault();
      
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
          showToast('გთხოვთ მიუთითოთ ელ-ფოსტა');
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
        showToast('გთხოვთ მიუთითოთ სახელი (მინიმუმ 2 ასო)');
        if (firstNameInput) firstNameInput.focus();
        return;
      }
      if (!lastName || lastName.length < 2) {
        showToast('გთხოვთ მიუთითოთ გვარი (მინიმუმ 2 ასო)');
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
          showToast('ტელეფონის ნომერი უნდა იწყებოდეს 5-იანით და შედგებოდეს ზუსტად 9 ციფრისგან');
          phoneInput.focus();
          return;
        }
        if (/^(.)\1+$/.test(phoneClean) || /(.)\1{5,}/.test(phoneClean)) {
          showToast('გთხოვთ შეიყვანოთ სწორი ტელეფონის ნომერი');
          phoneInput.focus();
          return;
        }
      } else {
        showToast('ტელეფონის ნომერი სავალდებულოა');
        return;
      }

      // 3. Strict Validation: All visible form fields must be fully filled
      if (emailInput && !emailInput.value.trim()) {
        showToast('გთხოვთ შეავსოთ ელ-ფოსტის ველი');
        emailInput.focus();
        return;
      }
      if (dateInput && !dateInput.value) {
        showToast('გთხოვთ შეავსოთ თარიღის ველი');
        dateInput.focus();
        return;
      }
      if (messageTextarea && !messageTextarea.value.trim()) {
        showToast('გთხოვთ შეავსოთ შეტყობინების ველი');
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

      // Save persistence data
      try {
        localStorage.setItem('user_first_name', bookingData.firstName);
        localStorage.setItem('user_last_name', bookingData.lastName);
        localStorage.setItem('user_phone', bookingData.phone);
      } catch (e) {}

      // Open inline booking payment step inside modal
      form.reset();

      if (typeof window.openBookingPaymentStep === 'function') {
        window.openBookingPaymentStep(bookingData);
      } else {
        const targetUrl = `/registration.html?pay_mobile=true&name=${encodeURIComponent(bookingData.firstName + ' ' + bookingData.lastName)}&course=${encodeURIComponent(bookingData.service)}&phone=${encodeURIComponent(bookingData.phone)}`;
        window.location.href = targetUrl;
      }
    }
  });
}

/* ==========================================================================
   5. Floating Ambient Glow Blobs
   ========================================================================== */
function initAmbientGlow() {
  const blob1 = document.createElement('div');
  blob1.className = 'glow-blob';
  blob1.style.background = 'radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(246,243,236,0) 70%)';
  blob1.style.width = '600px';
  blob1.style.height = '600px';
  blob1.style.left = '-100px';
  blob1.style.top = '100px';
  blob1.style.position = 'fixed';
  
  const blob2 = document.createElement('div');
  blob2.className = 'glow-blob';
  blob2.style.background = 'radial-gradient(circle, rgba(240,230,215,0.6) 0%, rgba(246,243,236,0) 70%)';
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
        p.classList.remove('bg-[#1C3D63]', 'text-white', 'hover:bg-[#254F7F]');
        p.classList.add('bg-white', 'text-[#222222]', 'border', 'border-[#D8C4B6]', 'hover:border-[#1C3D63]', 'hover:text-[#1C3D63]');
      });
      pill.classList.remove('bg-white', 'text-[#222222]', 'border', 'border-[#D8C4B6]', 'hover:border-[#1C3D63]', 'hover:text-[#1C3D63]');
      pill.classList.add('bg-[#1C3D63]', 'text-white', 'hover:bg-[#254F7F]');

      // Animate card transition (fade-out, change, fade-in)
      card.style.opacity = '0';
      card.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        const item = contentMap[type];
        card.innerHTML = `
          <div class="flex items-center gap-4 mb-6">
            <span class="material-symbols-outlined text-[#E0AC6B] text-4xl" style="font-variation-settings: 'FILL' 1;">${item.icon}</span>
            <div>
              <h3 class="text-2xl font-headline text-[#1C3D63]">${item.title}</h3>
              <p class="text-xs text-[#8E8276] tracking-wider uppercase font-semibold">${item.subtitle}</p>
            </div>
          </div>
          <p class="text-[#222222] leading-relaxed text-sm md:text-base font-light mb-8">${item.text}</p>
          <div class="border-t border-[#D8C4B6] pt-6">
            <p class="text-[#E0AC6B] italic font-headline text-base md:text-lg">${item.quote}</p>
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
    <div id="quick-read-drawer" class="fixed inset-y-0 right-0 z-[110] w-full md:w-[650px] bg-[#F4F7F7] border-l border-[#D8C4B6] shadow-2xl transform translate-x-full transition-transform duration-500 ease-out overflow-y-auto pointer-events-none">
      <div class="relative p-8 md:p-12 space-y-8">
        <button id="close-drawer-btn" class="absolute top-6 left-6 text-[#222222] hover:text-[#1C3D63] transition-colors focus:outline-none flex items-center gap-2 cursor-pointer">
          <span class="material-symbols-outlined text-3xl">arrow_back</span>
          <span class="text-xs uppercase tracking-widest font-label font-bold">დაბრუნება</span>
        </button>
        
        <div class="pt-12 space-y-6">
          <div class="flex items-center gap-4 text-xs font-label uppercase tracking-widest text-[#E0AC6B] font-bold" id="drawer-meta">
            <span>თვითგანვითარება</span>
            <span class="w-1.5 h-1.5 bg-[#E0AC6B] rounded-full"></span>
            <span>15 მარტი, 2024</span>
          </div>
          
          <h2 class="text-4xl md:text-5xl font-headline italic text-[#1C3D63] leading-tight" id="drawer-title">სტატიის სათაური</h2>
          <button type="button" onclick="if(window.openAIChat) { document.getElementById('close-drawer-btn').click(); window.openAIChat(); }" class="mt-3 flex items-center justify-center gap-2 bg-white border border-[#D8C4B6] hover:bg-[#EAE5DF] hover:border-[#1C3D63] text-[#1C3D63] px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-all uppercase w-full cursor-pointer shadow-sm">
            <span class="material-symbols-outlined text-sm text-[#E0AC6B]">psychology</span>
            <span>ჰკითხეთ მეტი ინტელექტუალურ ასისტენტს</span>
          </button>
          
          <div class="aspect-video w-full rounded-2xl overflow-hidden shadow-sm border border-[#D8C4B6]" id="drawer-img-container">
            <img class="w-full h-full object-cover" id="drawer-image" src="" alt="article image"/>
          </div>
          
          <div class="space-y-6 text-[#222222] font-normal leading-relaxed text-base md:text-lg pr-2" id="drawer-content">
            <!-- Article content will be dynamically loaded here -->
          </div>
          
          <div class="border-t border-[#D8C4B6] pt-12 text-center">
            <button class="booking-btn bg-[#1C3D63] text-white hover:bg-[#254F7F] px-8 py-3.5 rounded-xl font-medium tracking-wide active:scale-98 transition-all shadow-sm cursor-pointer">
              დაგვიკავშირდით სესიისთვის
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="drawer-backdrop" class="fixed inset-0 z-[105] bg-black/40 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300"></div>
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
      #n8n-chat-messages::-webkit-scrollbar-thumb { background: #D8C4B6; border-radius: 10px; }
      #n8n-chat-messages::-webkit-scrollbar-thumb:hover { background: #1C3D63; }
      .chat-typing-dots { display: flex; align-items: center; justify-content: center; gap: 4px; width: 30px; height: 12px; }
      .chat-typing-dot { width: 5px; height: 5px; background: #E0AC6B; border-radius: 50%; opacity: 0.3; animation: typing-blink 1.4s infinite both; }
      .chat-typing-dot:nth-child(2) { animation-delay: .2s; }
      .chat-typing-dot:nth-child(3) { animation-delay: .4s; }
      @keyframes typing-blink { 0% { opacity: .3; transform: scale(1); } 20% { opacity: 1; transform: scale(1.1); } 100% { opacity: .3; transform: scale(1); } }
      @keyframes chat-glow-shimmer {
        0%, 100% {
          box-shadow: 0 10px 28px rgba(28,61,99,0.45), 0 0 14px rgba(224,172,107,0.35), 0 0 0 2px rgba(224,172,107,0.5);
          transform: scale(1);
        }
        50% {
          box-shadow: 0 16px 36px rgba(28,61,99,0.65), 0 0 26px rgba(224,172,107,0.75), 0 0 0 3px rgba(224,172,107,0.85);
          transform: scale(1.045);
        }
      }
      .glow-pulse-active {
        animation: chat-glow-shimmer 2.8s infinite ease-in-out !important;
      }
      .chat-shimmer-sweep {
        position: absolute;
        top: 0;
        left: -120%;
        width: 55%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent);
        transform: skewX(-25deg);
        animation: chatShimmerSweep 3s infinite ease-in-out;
        pointer-events: none;
      }
      @keyframes chatShimmerSweep {
        0% { left: -120%; }
        45%, 100% { left: 160%; }
      }
      .chat-logo-img {
        width: 44px;
        height: 44px;
        object-fit: contain;
        filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.45)) brightness(1.15);
        transition: transform 0.3s ease;
      }
      @media (min-width: 640px) {
        .chat-logo-img {
          width: 48px;
          height: 48px;
        }
      }
      #n8n-chat-trigger:hover .chat-logo-img {
        transform: scale(1.08);
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
    <div id="n8n-chat-widget" class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] font-sans">
      <!-- Tooltip showing purpose (Hidden on mobile phones, shown on desktop) -->
      <div id="n8n-chat-tooltip" class="hidden sm:block absolute bottom-20 right-0 mb-3 w-48 bg-[#FFFFFF] border border-[#D8C4B6] text-[#222222] text-[11px] font-semibold px-4 py-2.5 rounded-xl shadow-[0_10px_30px_rgba(28,61,99,0.12)] text-center">
        ინტელექტუალური ასისტენტი 🔮
        <div class="text-[9px] text-[#1C3D63] mt-0.5 font-bold uppercase tracking-wider">ჰკითხეთ კალენდარი და სერვისები</div>
        <div class="absolute bottom-[-5px] right-7 w-2.5 h-2.5 bg-[#FFFFFF] border-r border-b border-[#D8C4B6] rotate-45"></div>
      </div>

      <!-- Floating Action Chat Button with Static Logo & Shimmer Glow -->
      <button id="n8n-chat-trigger" class="glow-pulse-active relative overflow-hidden w-16 h-16 sm:w-[68px] sm:h-[68px] rounded-full bg-[#1C3D63] border-2 border-[#E0AC6B]/80 text-white hover:bg-[#254F7F] flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95" aria-label="IDC ასისტენტი">
        <span class="chat-shimmer-sweep"></span>
        <img src="/logo.png" alt="IDC Logo" class="chat-logo-img pointer-events-none" />
      </button>
      
      <!-- Interactive Frosted Glass Chat Window -->
      <div id="n8n-chat-window" class="hidden absolute bottom-20 right-0 w-[360px] max-w-[calc(100vw-32px)] h-[500px] max-h-[80vh] flex flex-col bg-[#FFFFFF] border border-[#D8C4B6] rounded-3xl shadow-[0_20px_50px_rgba(28,61,99,0.15)] overflow-hidden transition-all duration-300 scale-95 opacity-0 origin-bottom-right">
        
        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-3.5 border-b border-[#D8C4B6] bg-[#F4F7F7]">
          <div class="flex items-center gap-3">
            <div class="relative w-10 h-10 rounded-xl bg-[#1C3D63] border border-[#E0AC6B]/80 flex items-center justify-center p-1.5 shadow-sm shrink-0">
              <img src="/logo.png" alt="IDC Logo" class="w-full h-full object-contain" />
              <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h3 class="text-sm font-bold text-[#1C3D63] font-headline">IDC ასისტენტი</h3>
              <p class="text-[10px] text-[#3B5E63] font-semibold uppercase tracking-wider">ონლაინ მხარდაჭერა</p>
            </div>
          </div>
          <button id="n8n-chat-close" class="text-[#8E8276] hover:text-[#1C3D63] transition-colors focus:outline-none cursor-pointer">
            <span class="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>
        
        <!-- Messages Area -->
        <div id="n8n-chat-messages" class="flex-grow p-6 overflow-y-auto space-y-4 flex flex-col bg-[#F4F7F7]/50">
          <div class="flex flex-col gap-1 max-w-[85%] self-start">
            <div class="flex items-center gap-2 pl-1 mb-0.5">
              <div class="w-4 h-4 rounded bg-[#1C3D63] border border-[#E0AC6B]/80 p-0.5 flex items-center justify-center shrink-0">
                <img src="/logo.png" alt="IDC" class="w-full h-full object-contain" />
              </div>
              <span class="text-[9px] text-[#1C3D63] font-bold uppercase tracking-wider">IDC ასისტენტი</span>
            </div>
            <div class="bg-[#FFFFFF] border border-[#D8C4B6] text-[#222222] px-4 py-3 rounded-2xl rounded-tl-none text-sm font-medium leading-relaxed shadow-sm">
              გამარჯობა! 👋<br/><br/>მე ვარ IDC-ის (პოზიტიური ფსიქოთერაპიის საერთაშორისო ცენტრის) ვირტუალური ასისტენტი. როგორ შემიძლია დაგეხმაროთ? 🧠💬
            </div>
          </div>
        </div>
        
        <!-- Input Form -->
        <form id="n8n-chat-form" class="p-4 border-t border-[#D8C4B6] bg-[#F4F7F7] flex gap-2.5 items-center">
          <input id="n8n-chat-input" type="text" placeholder="ჩაწერეთ შეტყობინება..." required class="flex-grow bg-[#FFFFFF] border border-[#D8C4B6] focus:border-[#1C3D63] focus:outline-none rounded-xl px-4 py-3 text-sm text-[#222222] placeholder-[#8E8276] transition-colors font-medium"/>
          <button type="submit" class="w-11 h-11 rounded-xl bg-[#1C3D63] text-white hover:bg-[#254F7F] flex items-center justify-center shrink-0 cursor-pointer shadow-sm transition-all duration-300">
            <span class="material-symbols-outlined text-2xl text-[#E0AC6B]" style="font-variation-settings: 'FILL' 1;">send</span>
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
        <div class="bg-gradient-to-r from-[#1C3D63] to-[#254F7F] text-[#FAF7F2] border border-[#1C3D63] px-4 py-3 rounded-2xl rounded-tr-none text-sm font-medium leading-relaxed shadow-[0_4px_12px_rgba(28,61,99,0.18)]">
          ${escapeHtml(userMessage)}
        </div>
        <span class="text-[9px] text-[#1C3D63] font-bold uppercase tracking-wider pr-1">თქვენ</span>
      </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', userMessageHTML);
    scrollChatToBottom();

    // Append typing indicator
    const typingIndicatorId = 'typing-' + Date.now();
    const typingHTML = `
      <div id="${typingIndicatorId}" class="flex flex-col gap-1 max-w-[80%] self-start animate-fade-in">
        <div class="bg-[#F4F7F7] border border-[#D8C4B6] text-[#222222] px-5 py-4 rounded-2xl rounded-tl-none shadow-sm">
          <div class="chat-typing-dots">
            <span class="chat-typing-dot"></span>
            <span class="chat-typing-dot"></span>
            <span class="chat-typing-dot"></span>
          </div>
        </div>
        <span class="text-[9px] text-[#1C3D63] font-bold uppercase tracking-wider pl-1">IDC ასისტენტი</span>
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
          <div class="flex items-center gap-2 pl-1 mb-0.5">
            <div class="w-4 h-4 rounded bg-[#1C3D63] border border-[#E0AC6B]/80 p-0.5 flex items-center justify-center shrink-0">
              <img src="/logo.png" alt="IDC" class="w-full h-full object-contain" />
            </div>
            <span class="text-[9px] text-[#1C3D63] font-bold uppercase tracking-wider">IDC ასისტენტი</span>
          </div>
          <div class="bg-[#F4F7F7] border border-[#D8C4B6] text-[#222222] px-4 py-3 rounded-2xl rounded-tl-none text-sm font-medium leading-relaxed shadow-sm">
            ${parseMarkdown(botResponseText)}
          </div>
        </div>
      `;
      chatMessages.insertAdjacentHTML('beforeend', botMessageHTML);
      scrollChatToBottom();

    } catch (err) {
      console.error('n8n integration error:', err);
      const typingEl = document.getElementById(typingIndicatorId);
      if (typingEl) typingEl.remove();

      const errorMessageHTML = `
        <div class="flex flex-col gap-1 max-w-[85%] self-start animate-fade-in text-red-600">
          <div class="bg-red-50 border border-red-200 px-4 py-3 rounded-2xl rounded-tl-none text-sm font-medium leading-relaxed shadow-sm">
            კავშირი ვერ დამყარდა n8n სერვერთან. გთხოვთ შეამოწმოთ ვებჰუკის მისამართი და სერვერის სტატუსი.
          </div>
          <span class="text-[9px] text-red-500 font-bold uppercase tracking-wider pl-1">სისტემური შეცდომა</span>
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
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#1C3D63]">$1</strong>');
    
    // Links: [Text](URL) to styled <a>
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="inline-flex items-center gap-0.5 text-[#1C3D63] hover:text-[#E0AC6B] underline decoration-[#E0AC6B]/50 transition-all font-semibold">$1<span class="material-symbols-outlined text-[10px] inline-block align-middle ml-0.5">arrow_outward</span></a>');
    
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

/* ==========================================================================
   13. Global Form Auto-Fill & LocalStorage Persistence
   ========================================================================== */
function initFormPersistence() {
  const fieldMapping = {
    'first_name': 'idc_user_firstname',
    'first-name': 'idc_user_firstname',
    'last_name': 'idc_user_lastname',
    'last-name': 'idc_user_lastname',
    'phone': 'idc_user_phone',
    'birthdate': 'idc_user_birthdate',
    'date': 'idc_user_birthdate',
    'birthtime': 'idc_user_birthtime',
    'birth-time': 'idc_user_birthtime',
    'birth_time': 'idc_user_birthtime',
    'time': 'idc_user_birthtime',
    'hour': 'idc_user_birthtime'
  };

  const populateFields = () => {
    document.querySelectorAll('input, select, textarea').forEach(el => {
      const identifier = (el.name || el.id || '').toLowerCase();
      if (!identifier) return;

      for (const [key, storageKey] of Object.entries(fieldMapping)) {
        if (identifier.includes(key)) {
          const savedValue = localStorage.getItem(storageKey);
          if (savedValue && !el.value) {
            el.value = savedValue;
          }
        }
      }
    });
  };

  // Populate immediately on init & retry after DOM updates / modal opens
  populateFields();
  setTimeout(populateFields, 200);
  setTimeout(populateFields, 800);

  // Global listener: Save input values into localStorage as user types
  document.addEventListener('input', (e) => {
    const el = e.target;
    const identifier = (el.name || el.id || '').toLowerCase();
    if (!identifier || !el.value) return;

    for (const [key, storageKey] of Object.entries(fieldMapping)) {
      if (identifier.includes(key)) {
        localStorage.setItem(storageKey, el.value.trim());
      }
    }
  });

  // Re-populate when booking modal opens
  document.addEventListener('click', (e) => {
    if (e.target && (e.target.classList.contains('booking-btn') || e.target.closest('.booking-btn'))) {
      setTimeout(populateFields, 50);
    }
  });
}

/* ==========================================================================
   Hero Section Feather Frame Slider Functionality
   ========================================================================== */
function initHeroSlider() {
  const slider = document.getElementById('hero-slider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.slider-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('slider-prev-btn');
  const nextBtn = document.getElementById('slider-next-btn');
  if (!slides || slides.length === 0) return;

  let currentIndex = 0;
  let timer = null;
  const intervalTime = 4500;

  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;

    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.remove('opacity-0', 'pointer-events-none', 'z-0');
        slide.classList.add('opacity-100', 'z-10');
      } else {
        slide.classList.remove('opacity-100', 'z-10');
        slide.classList.add('opacity-0', 'pointer-events-none', 'z-0');
      }
    });

    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.remove('w-2', 'bg-white/70');
        dot.classList.add('w-7', 'bg-[#E0AC6B]');
      } else {
        dot.classList.remove('w-7', 'bg-[#E0AC6B]');
        dot.classList.add('w-2', 'bg-white/70');
      }
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    timer = setInterval(nextSlide, intervalTime);
  }

  function stopAutoPlay() {
    if (timer) clearInterval(timer);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide();
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSlide();
      startAutoPlay();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(dot.getAttribute('data-index') || '0', 10);
      showSlide(idx);
      startAutoPlay();
    });
  });

  // Touch Swipe for Mobile
  let touchStartX = 0;
  let touchEndX = 0;
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoPlay();
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 45) {
      nextSlide();
    } else if (touchEndX - touchStartX > 45) {
      prevSlide();
    }
    startAutoPlay();
  }, { passive: true });

  slider.addEventListener('mouseenter', stopAutoPlay);
  slider.addEventListener('mouseleave', startAutoPlay);

  // Keyboard Arrow Keys Navigation (ArrowLeft / ArrowRight)
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName) || document.activeElement?.isContentEditable) {
      return;
    }
    if (e.key === 'ArrowRight') {
      nextSlide();
      startAutoPlay();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
      startAutoPlay();
    }
  });

  showSlide(0);
  startAutoPlay();
}

/* ==========================================================================
   16. Horizontal Switcher Bar Wheel & Drag Smooth Scrolling
   ========================================================================== */
function initHorizontalSwitcher() {
  const bars = document.querySelectorAll('.horizontal-switcher-bar');
  bars.forEach(bar => {
    // Mouse wheel horizontal scrolling
    bar.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        bar.scrollBy({ left: e.deltaY * 2.5, behavior: 'smooth' });
      }
    }, { passive: false });

    // Click & Drag horizontal scrolling
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    bar.addEventListener('mousedown', (e) => {
      isDown = true;
      bar.classList.add('cursor-grabbing');
      startX = e.pageX - bar.offsetLeft;
      scrollLeft = bar.scrollLeft;
    });

    const stopDrag = () => {
      isDown = false;
      bar.classList.remove('cursor-grabbing');
    };

    bar.addEventListener('mouseleave', stopDrag);
    bar.addEventListener('mouseup', stopDrag);

    bar.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - bar.offsetLeft;
      const walk = (x - startX) * 1.8;
      bar.scrollLeft = scrollLeft - walk;
    });

    // Arrow controls (if present in wrapper)
    const wrapper = bar.closest('.switcher-wrapper') || bar.parentElement;
    if (wrapper) {
      const prevBtn = wrapper.querySelector('.switcher-btn-prev');
      const nextBtn = wrapper.querySelector('.switcher-btn-next');
      if (prevBtn) {
        prevBtn.addEventListener('click', (ev) => {
          ev.preventDefault();
          bar.scrollBy({ left: -260, behavior: 'smooth' });
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener('click', (ev) => {
          ev.preventDefault();
          bar.scrollBy({ left: 260, behavior: 'smooth' });
        });
      }
    }

    // Ensure initial alignment at start without any involuntary jumping
    bar.scrollLeft = 0;
  });
}


