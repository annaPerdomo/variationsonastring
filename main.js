/**
 * variationsonastring.com — interactive behaviour.
 *
 * Loaded as a deferred ES module, so it runs after the DOM is parsed
 * and its bindings stay out of the global scope. Responsibilities:
 *   0. Derived stats (years coding, SaaS shipped)
 *   1. Scroll-triggered reveal animations
 *   2. Dark-mode toggle (initial theme is set pre-paint in <head>)
 *   3. Craft gallery filter + show more/fewer
 *   4. Nav shadow on scroll
 *   5. Mobile nav drop panel
 *   6. Footer greeting
 */

// -----------------------------------------------------------------
// 0. DYNAMIC YEARS OF EXPERIENCE (started coding in 2018)
// -----------------------------------------------------------------
const currentYear = new Date().getFullYear();
document.querySelectorAll('.years-coding').forEach((el) => {
  el.textContent = currentYear - 2018;
});
document.querySelectorAll('.footer-year').forEach((el) => {
  el.textContent = currentYear;
});
document.querySelectorAll('.skill-since__text[data-since]').forEach((el) => {
  const since = Number(el.dataset.since);
  const years = currentYear - since;
  el.textContent = `since ${since} · ${years} yr${years === 1 ? '' : 's'}`;
});
// SaaS platforms shipped = work cards tagged with data-saas
// (every shipped SaaS in Experience + live personal SaaS projects)
const saasShipped = document.querySelectorAll('.work-card[data-saas]').length;
document.querySelectorAll('.saas-shipped').forEach((el) => {
  el.textContent = saasShipped;
});

// -----------------------------------------------------------------
// 1. SCROLL-TRIGGERED REVEALS
//    Elements are visible by default so content never flashes hidden.
//    We add .needs-reveal just before observing, so only elements
//    that haven't scrolled into view yet get the hidden-then-animate
//    treatment. Elements already in view on load skip the animation.
// -----------------------------------------------------------------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // Work/project cards replay their entrance every time they
      // scroll into view (up OR down). Everything else animates once.
      const replays = entry.target.classList.contains('work-card');

      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        if (!replays) {
          revealObserver.unobserve(entry.target); // animate once only
        }
      } else if (replays) {
        // Reset so the spring + cascade fire again on re-entry
        entry.target.classList.remove('is-visible');
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => {
  const replays = el.classList.contains('work-card');

  // Check if already in viewport — if so, skip the initial animation.
  // Work cards always opt in so they can re-hide and replay on scroll.
  const rect = el.getBoundingClientRect();
  const inView = rect.top < window.innerHeight && rect.bottom > 0;

  if (replays || !inView) {
    el.classList.add('needs-reveal');
  }

  revealObserver.observe(el);
});

// -----------------------------------------------------------------
// 2. DARK MODE TOGGLE
//    The initial theme is applied by a render-blocking script in
//    <head> (see index.html) so the page never flashes the wrong
//    palette. Here we only wire up the toggle and persist the choice.
// -----------------------------------------------------------------
const themeToggle = document.getElementById('theme-toggle');
const root        = document.documentElement;

themeToggle.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  const next   = isDark ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// -----------------------------------------------------------------
// 3. CRAFT GALLERY — FILTER + SHOW MORE / SHOW FEWER
//    Filtering hides non-matching cards entirely.
//    Only the first INITIAL_VISIBLE matching cards show by default;
//    the "Show all" button reveals the rest.
// -----------------------------------------------------------------
const INITIAL_VISIBLE = 12;

const allCraftCards  = Array.from(document.querySelectorAll('.craft-card'));
const showMoreBtn    = document.getElementById('show-more-btn');
const hiddenCountEl  = document.getElementById('crafts-hidden-count');
const craftsFooter   = document.getElementById('crafts-footer');

let currentFilter = 'all';
let isExpanded    = false;

function getMatchingCards() {
  return allCraftCards.filter((card) =>
    currentFilter === 'all' || card.dataset.cat === currentFilter
  );
}

function renderCraftCards() {
  const matching = getMatchingCards();
  const limit    = isExpanded ? matching.length : INITIAL_VISIBLE;
  const hidden   = Math.max(0, matching.length - limit);

  allCraftCards.forEach((card) => {
    const matches      = currentFilter === 'all' || card.dataset.cat === currentFilter;
    const withinLimit  = matches && matching.indexOf(card) < limit;

    card.classList.toggle('is-filtered-out', !matches);
    card.classList.toggle('is-hidden',        matches && !withinLimit);
  });

  // Update the show-more button text
  if (hidden > 0) {
    showMoreBtn.textContent = 'Show all crafts ';
    hiddenCountEl.textContent = '(+' + hidden + ' more)';
    showMoreBtn.appendChild(hiddenCountEl);
    craftsFooter.style.display = 'block';
  } else if (isExpanded && matching.length > INITIAL_VISIBLE) {
    showMoreBtn.textContent = 'Show fewer';
    craftsFooter.style.display = 'block';
  } else {
    craftsFooter.style.display = 'none';
  }

  showMoreBtn.setAttribute('aria-expanded', String(isExpanded));
}

document.querySelectorAll('.filter-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    isExpanded    = false;

    document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    renderCraftCards();
  });
});

showMoreBtn.addEventListener('click', () => {
  isExpanded = !isExpanded;
  renderCraftCards();
});

// Initial render on page load
renderCraftCards();

// -----------------------------------------------------------------
// 4. NAV SHADOW ON SCROLL
// -----------------------------------------------------------------
const nav = document.getElementById('site-nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// -----------------------------------------------------------------
// 5. MOBILE NAV — hamburger drop panel
//    Opens the nav links as a full-width panel on phones, with a
//    tap-anywhere scrim. Closes on link tap, scrim tap, Escape, or
//    when the viewport grows back to the desktop layout.
// -----------------------------------------------------------------
const navToggle = document.getElementById('nav-toggle');
const navScrim  = document.getElementById('nav-scrim');
const navLinks  = document.getElementById('nav-links');

function setMenu(open) {
  nav.classList.toggle('is-menu-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  navScrim.hidden = !open;
}

navToggle.addEventListener('click', () => {
  setMenu(!nav.classList.contains('is-menu-open'));
});

navScrim.addEventListener('click', () => setMenu(false));

navLinks.addEventListener('click', (e) => {
  if (e.target.closest('a')) setMenu(false);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('is-menu-open')) {
    setMenu(false);
    navToggle.focus();
  }
});

// If the menu is open and the screen widens past the mobile breakpoint,
// reset state so the desktop layout never inherits the open panel.
window.matchMedia('(min-width: 601px)').addEventListener('change', (e) => {
  if (e.matches) setMenu(false);
});

// -----------------------------------------------------------------
// 6. "SAY HELLO" → FOOTER GREETING PULSE
//    On click, let the smooth scroll travel to the footer, then play
//    a brief grow-and-settle so it lands with a little wave.
// -----------------------------------------------------------------
const greetBtn = document.querySelector('a[href="#connect"]');
const footerEl = document.getElementById('connect');

if (greetBtn && footerEl) {
  let greetArmed = false;

  // Strip the class only when the LAST staggered circle finishes —
  // animationend bubbles, so an earlier circle's event would
  // otherwise cut the later ones off mid-animation.
  footerEl.addEventListener('animationend', (e) => {
    const links = footerEl.querySelectorAll('.social-link');
    if (e.target === links[links.length - 1]) {
      footerEl.classList.remove('footer--greet');
    }
  });

  // Fire the pulse the moment the footer scrolls into view *after*
  // a click — robust regardless of how long the smooth scroll takes.
  const greetObserver = new IntersectionObserver((entries) => {
    if (greetArmed && entries[0].isIntersecting) {
      greetArmed = false;
      footerEl.classList.remove('footer--greet');
      // Reflow so the animation restarts if it played recently.
      void footerEl.offsetWidth;
      footerEl.classList.add('footer--greet');
    }
  }, { threshold: 0.4 });

  greetObserver.observe(footerEl);

  greetBtn.addEventListener('click', () => {
    greetArmed = true;
  });
}
