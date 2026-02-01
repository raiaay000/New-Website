/* ============================================================
   LOADING SCREEN
   waits for everything to load then fades out
   ============================================================ */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2200);
});

/* ============================================================
   HERO CAROUSEL
   auto-cycles every 5 seconds with fade transition
   the dot indicators also work if u click them
   ============================================================ */
(function() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  let current = 0;
  let interval;

  function goToSlide(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = n;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function nextSlide() {
    goToSlide((current + 1) % slides.length);
  }

  function startCarousel() {
    interval = setInterval(nextSlide, 5000);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(interval);
      goToSlide(parseInt(dot.dataset.slide));
      startCarousel();
    });
  });

  startCarousel();
})();

/* ============================================================
   COUNTDOWN TIMER
   counting down to May 8, 2026 10:00 AM CDT
   ============================================================ */
(function() {
  // may 8 2026 10am central time
  const target = new Date('2026-05-08T15:00:00Z').getTime();
  
  function update() {
    const now = Date.now();
    const diff = target - now;
    
    if (diff <= 0) {
      document.getElementById('cd-days').textContent = '00';
      document.getElementById('cd-hrs').textContent = '00';
      document.getElementById('cd-min').textContent = '00';
      document.getElementById('cd-sec').textContent = '00';
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hrs = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const min = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const sec = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
    document.getElementById('cd-hrs').textContent = String(hrs).padStart(2, '0');
    document.getElementById('cd-min').textContent = String(min).padStart(2, '0');
    document.getElementById('cd-sec').textContent = String(sec).padStart(2, '0');
  }
  
  update();
  setInterval(update, 1000);
})();

/* ============================================================
   SCROLL FADE-IN ANIMATIONS
   uses IntersectionObserver to detect when elements enter viewport
   adds 'visible' class which triggers the CSS transition
   ============================================================ */
(function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
    observer.observe(el);
  });
})();

/* ============================================================
   NAVBAR SCROLL EFFECT
   adds the 'scrolled' class when you scroll past 50px
   also highlights the current section in the nav
   ============================================================ */
(function() {
  const nav = document.getElementById('mainNav');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    // sticky nav bg
    nav.classList.toggle('scrolled', window.scrollY > 50);
    
    // active section highlighting
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
})();

/* ============================================================
   MOBILE NAV
   hamburger menu toggle
   ============================================================ */
(function() {
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  const closeBtn = document.getElementById('mobileNavClose');
  const links = document.querySelectorAll('.mobile-nav-link');

  hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
  closeBtn.addEventListener('click', () => mobileNav.classList.remove('open'));
  links.forEach(link => {
    link.addEventListener('click', () => mobileNav.classList.remove('open'));
  });
})();

/* ============================================================
   TEAMS FILTER
   filter teams by game when clicking the tabs
   ============================================================ */
(function() {
  const tabs = document.querySelectorAll('.teams-tab');
  const cards = document.querySelectorAll('.team-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const game = tab.dataset.game;
      cards.forEach(card => {
        if (game === 'all' || card.dataset.teamGame === game) {
          card.style.display = '';
          // re-trigger fade animation
          card.classList.remove('visible');
          setTimeout(() => card.classList.add('visible'), 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
})();

/* ============================================================
   SCHEDULE TABS
   switch between day 1, 2, 3
   ============================================================ */
(function() {
  const btns = document.querySelectorAll('.schedule-day-btn');
  const lists = document.querySelectorAll('[data-schedule-day]');
  
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const day = btn.dataset.day;
      lists.forEach(list => {
        if (list.dataset.scheduleDay === day) {
          list.style.display = '';
          // re-trigger fade animations on the items inside
          list.querySelectorAll('.fade-in').forEach(item => {
            item.classList.remove('visible');
            setTimeout(() => item.classList.add('visible'), 50);
          });
        } else {
          list.style.display = 'none';
        }
      });
    });
  });
})();

/* ============================================================
   MUSIC TABS
   switches between curated playlists
   ============================================================ */
(function() {
  const tabs = document.querySelectorAll('.music-tab');
  const lists = document.querySelectorAll('.music-list');

  if (!tabs.length || !lists.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.musicTab;
      lists.forEach(list => {
        list.classList.toggle('active', list.dataset.musicList === target);
      });
    });
  });
})();

/* ============================================================
   GAME DETAIL PAGES
   open secondary page per game from the Games section
   ============================================================ */
(function() {
  const buttons = document.querySelectorAll('.game-card-btn[data-game]');
  const pages = document.querySelectorAll('[data-game-detail]');
  const overlay = document.getElementById('gameDetailOverlay');
  const backButtons = document.querySelectorAll('[data-game-back]');

  if (!buttons.length || !pages.length || !overlay) return;

  function closeAll() {
    pages.forEach(page => {
      page.classList.remove('open');
      page.setAttribute('aria-hidden', 'true');
    });
    overlay.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  function openGame(game) {
    const page = document.querySelector(`[data-game-detail="${game}"]`);
    if (!page) return;
    closeAll();
    page.classList.add('open');
    page.setAttribute('aria-hidden', 'false');
    overlay.classList.add('open');
    document.body.classList.add('no-scroll');
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openGame(btn.dataset.game);
    });
  });

  backButtons.forEach(btn => {
    btn.addEventListener('click', closeAll);
  });
  overlay.addEventListener('click', closeAll);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
})();

/* ============================================================
   LOGIN MODAL
   shows when you click sign in
   ============================================================ */
(function() {
  const btn = document.getElementById('loginBtn');
  const modal = document.getElementById('loginModal');
  const close = document.getElementById('loginClose');
  const googleBtn = document.getElementById('googleSignIn');
  
  btn.addEventListener('click', () => modal.classList.add('open'));
  close.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });
  googleBtn.addEventListener('click', () => {
    // in a real app this would trigger Google OAuth
    // for now just show a toast
    modal.classList.remove('open');
    showToast('Google Sign-In would launch here. Backend integration needed!');
  });
})();

/* ============================================================
   CHATBOT
   simple rule-based chatbot that answers NECS questions
   not the smartest bot but it gets the job done lol
   ============================================================ */
(function() {
  const trigger = document.getElementById('chatbotTrigger');
  const window_ = document.getElementById('chatbotWindow');
  const close = document.getElementById('chatbotClose');
  const input = document.getElementById('chatInput');
  const send = document.getElementById('chatSend');
  const messages = document.getElementById('chatMessages');

  trigger.addEventListener('click', () => {
    window_.classList.toggle('open');
    if (window_.classList.contains('open')) input.focus();
  });
  close.addEventListener('click', () => window_.classList.remove('open'));

  function addMessage(text, type) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg ' + type;
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function getBotResponse(userMsg) {
    const msg = userMsg.toLowerCase();
    
    if (msg.includes('ticket') || msg.includes('price') || msg.includes('cost')) {
      return 'Tickets start at $45/day for General Admission, $129/day for Premium, and $349/day for VIP. Weekend passes are available at a discount! Scroll to the Tickets section for full details.';
    }
    if (msg.includes('schedule') || msg.includes('when') || msg.includes('time')) {
      return 'NECS 2026 runs May 8-10 at Bridgestone Arena, Nashville. Day 1 kicks off at 10 AM with the Opening Ceremony. Check the Schedule section for the full breakdown!';
    }
    if (msg.includes('food') || msg.includes('chicken') || msg.includes('eat') || msg.includes('menu')) {
      return "Oh you're in for a treat. We've got Nashville Hot Chicken ($14), Smoked Brisket ($16), Hot Chicken Sandwiches ($13), Loaded Fries ($10), and more. Check the Food section!";
    }
    if (msg.includes('venue') || msg.includes('arena') || msg.includes('where') || msg.includes('location') || msg.includes('parking')) {
      return 'Bridgestone Arena, 501 Broadway, Nashville TN 37203. Right on Broadway! 20,000 seats, free Wi-Fi, and multiple parking garages nearby.';
    }
    if (msg.includes('game') || msg.includes('valorant') || msg.includes('rocket') || msg.includes('smash')) {
      return 'We feature three games: Valorant ($200K prize), Rocket League ($150K prize), and Super Smash Bros. Ultimate ($150K prize). 4 teams/players per title!';
    }
    if (msg.includes('merch') || msg.includes('shirt') || msg.includes('jersey') || msg.includes('buy')) {
      return 'Check out our merch section! Smash Collage Tee ($45), Rocket League Glow Hoodie ($79), and Valorant Champions Jersey ($89).';
    }
    if (msg.includes('music') || msg.includes('concert') || msg.includes('perform')) {
      return "It's Nashville baby! We have live music all three days — Opening Night Jam (Friday), a big Saturday headliner, Sunday DJ set, plus local artists between matches and a Broadway Block Party!";
    }
    if (msg.includes('team') || msg.includes('player') || msg.includes('roster')) {
      return '12 teams/players total across 3 games. Valorant has 4 teams (Sentinels, C9, 100T, NRG), Rocket League has 4 teams, and Smash has 4 top-ranked players. Check the Teams section!';
    }
    if (msg.includes('sponsor') || msg.includes('partner')) {
      return 'Our sponsors include Titan Gaming, NexGen Peripherals, VoltDrink, and Apex Displays.';
    }
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('sup')) {
      return "What's good! Welcome to NECS 2026. How can I help you? Ask me about tickets, schedule, food, venue, games, teams, merch, music, or sponsors!";
    }
    if (msg.includes('hotel') || msg.includes('stay') || msg.includes('sleep')) {
      return 'There are tons of hotels near Bridgestone Arena in downtown Nashville. The Omni Nashville Hotel is connected via skybridge! Check booking.com for Nashville hotels near the arena.';
    }
    
    return "I'm not sure about that one, but I can help with: tickets, schedule, food, venue, games, teams, merch, music, or sponsors. What would you like to know?";
  }

  function handleSend() {
    const text = input.value.trim();
    if (!text) return;
    
    addMessage(text, 'user');
    input.value = '';
    
    // fake typing delay
    setTimeout(() => {
      addMessage(getBotResponse(text), 'bot');
    }, 600);
  }

  send.addEventListener('click', handleSend);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
  });
})();

/* ============================================================
   VENUE MODAL
   ============================================================ */
(function() {
  const openBtn = document.getElementById('venueLearnMore');
  const modal = document.getElementById('venueModal');
  const overlay = document.getElementById('venueModalOverlay');
  const closeBtn = document.getElementById('venueModalClose');

  if (!openBtn || !modal || !overlay) return;

  function open() {
    modal.classList.add('open');
    overlay.classList.add('open');
  }

  function close() {
    modal.classList.remove('open');
    overlay.classList.remove('open');
  }

  openBtn.addEventListener('click', open);
  overlay.addEventListener('click', close);
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
})();

/* ============================================================
   CART SYSTEM
   simple drawer cart for merch items
   ============================================================ */
(function() {
  const cartBtn = document.getElementById('cartBtn');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartClose = document.getElementById('cartClose');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const cartCount = document.getElementById('cartCount');
  const checkoutBtn = document.getElementById('cartCheckout');

  if (!cartBtn || !cartDrawer) return;

  const storageKey = 'necs_cart';
  let cart = [];

  function loadCart() {
    try {
      cart = JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch {
      cart = [];
    }
  }

  function saveCart() {
    localStorage.setItem(storageKey, JSON.stringify(cart));
  }

  function formatMoney(value) {
    return '$' + value.toFixed(2).replace(/\\.00$/, '');
  }

  function getCount() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }

  function getTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  function renderCart() {
    if (!cart.length) {
      cartItems.innerHTML = '<div class=\"cart-empty\">Your cart is empty.</div>';
    } else {
      cartItems.innerHTML = cart.map((item, idx) => `
        <div class=\"cart-item\">
          <div>
            <div class=\"cart-item-title\">${item.name}</div>
            <div class=\"cart-item-meta\">${formatMoney(item.price)} each</div>
          </div>
          <div class=\"cart-item-actions\">
            <button class=\"cart-qty-btn\" data-action=\"dec\" data-index=\"${idx}\">-</button>
            <span class=\"cart-qty\">${item.qty}</span>
            <button class=\"cart-qty-btn\" data-action=\"inc\" data-index=\"${idx}\">+</button>
          </div>
        </div>
      `).join('');
    }

    cartTotal.textContent = formatMoney(getTotal());
    cartCount.textContent = String(getCount());
  }

  function openCart() {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
  }

  function closeCart() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
  }

  function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, qty: 1 });
    }
    saveCart();
    renderCart();
    openCart();
  }

  cartBtn.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.item;
      const price = Number(btn.dataset.price || 0);
      addToCart(name, price);
    });
  });

  cartItems.addEventListener('click', (e) => {
    const btn = e.target.closest('.cart-qty-btn');
    if (!btn) return;
    const index = Number(btn.dataset.index);
    const action = btn.dataset.action;
    if (!cart[index]) return;

    if (action === 'inc') cart[index].qty += 1;
    if (action === 'dec') cart[index].qty -= 1;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    saveCart();
    renderCart();
  });

  checkoutBtn.addEventListener('click', () => {
    if (!cart.length) {
      showToast('Your cart is empty.');
      return;
    }
    showToast('Checkout is coming soon!');
  });

  loadCart();
  renderCart();
})();

/* ============================================================
   TOAST NOTIFICATIONS
   little popup at the bottom for feedback
   ============================================================ */
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
  }, 2500);
}
