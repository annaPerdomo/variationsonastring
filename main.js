/**
 * variationsonastring.com — interactive behaviour.
 *
 * Loaded as a deferred ES module, so it runs after the DOM is parsed
 * and its bindings stay out of the global scope. Responsibilities:
 *   0. Derived stats (years coding, SaaS shipped)
 *   1. Scroll-triggered reveal animations
 *   2. Dark-mode toggle (initial theme is set pre-paint in <head>)
 *   3. Handmade gallery filter + show more/fewer
 *   4. Nav shadow on scroll
 *   5. Mobile nav drop panel
 *   7. Proof-band count-up numbers
 *   8. Case-study inline SVG charts + tooltips
 *   9. Screenshot galleries + lightbox
 *  10. Demo video autoplay-in-view
 *  12. Lightbox media types (image / MP4 / YouTube)
 *  14. Case toggle — opens/closes a case study's detail panel
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

const themeColorMeta = document.querySelector('meta[name="theme-color"]');

function applyThemeColor(theme) {
  if (themeColorMeta) {
    themeColorMeta.setAttribute('content', theme === 'dark' ? '#0f0d16' : '#fbf8f3');
  }
}

applyThemeColor(root.getAttribute('data-theme'));

themeToggle.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  const next   = isDark ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  applyThemeColor(next);
});

// -----------------------------------------------------------------
// 3. HANDMADE GALLERY — DATA-DRIVEN, FILTER + SHOW MORE / SHOW FEWER
//    Cards come from data/crafts.json. Filtering hides non-matching cards;
//    only the first INITIAL_VISIBLE matches show until "Show all" is clicked.
// -----------------------------------------------------------------
const INITIAL_VISIBLE = 12;

const handmadeGrid   = document.getElementById('handmadeGrid');
const showMoreBtn    = document.getElementById('show-more-btn');
const hiddenCountEl  = document.getElementById('handmade-hidden-count');
const handmadeFooter = document.getElementById('handmade-footer');

const CATEGORY_LABELS = {
  crochet: 'Crochet',
  knitting: 'Knitting',
  'cross-stitch': 'Cross-stitch',
  sewing: 'Sewing',
};

let allHandmadeCards = [];
let currentFilter = 'all';
let isExpanded    = false;

// CSS shows only the first .handmade-card-img, so images must precede the overlay in the DOM.
function buildHandmadeCard(craft) {
  const card = document.createElement('div');
  card.className = 'handmade-card';
  card.dataset.cat = craft.category || '';

  (craft.images || []).forEach((src, i) => {
    if (!src) return;
    const img = document.createElement('img');
    img.src = src;
    img.alt = i === 0 ? craft.title : `${craft.title} (${i + 1})`;
    img.className = 'handmade-card-img';
    img.loading = 'lazy';
    card.appendChild(img);
  });

  const overlay = document.createElement('div');
  overlay.className = 'handmade-overlay';
  const h4 = document.createElement('h4');
  h4.textContent = craft.title || '';
  const p = document.createElement('p');
  const label = CATEGORY_LABELS[craft.category] || craft.category || '';
  p.textContent = craft.date ? `${label} · Completed ${craft.date}` : label;
  overlay.append(h4, p);
  card.appendChild(overlay);

  return card;
}

// Sveltia CMS writes the `{ items: [...] }` wrapper form, not a bare array.
async function loadHandmadeCards() {
  if (!handmadeGrid) return;
  try {
    const res = await fetch('/data/crafts.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data  = await res.json();
    const items = Array.isArray(data) ? data : (data.items || []);
    const frag  = document.createDocumentFragment();
    items.forEach((craft) => frag.appendChild(buildHandmadeCard(craft)));
    handmadeGrid.replaceChildren(frag);
  } catch (err) {
    console.error('Could not load handmade crafts:', err);
    handmadeGrid.replaceChildren();
    const notice = document.createElement('p');
    notice.className = 'handmade-load-error';
    notice.textContent = "Couldn't load the gallery right now — please refresh or check back later.";
    handmadeGrid.appendChild(notice);
  }
  allHandmadeCards = Array.from(handmadeGrid.querySelectorAll('.handmade-card'));
}

function getMatchingCards() {
  return allHandmadeCards.filter((card) =>
    currentFilter === 'all' || card.dataset.cat === currentFilter
  );
}

function renderHandmadeCards() {
  const matching = getMatchingCards();
  const limit    = isExpanded ? matching.length : INITIAL_VISIBLE;
  const hidden   = Math.max(0, matching.length - limit);

  allHandmadeCards.forEach((card) => {
    const matches      = currentFilter === 'all' || card.dataset.cat === currentFilter;
    const withinLimit  = matches && matching.indexOf(card) < limit;

    card.classList.toggle('is-filtered-out', !matches);
    card.classList.toggle('is-hidden',        matches && !withinLimit);
  });

  // Update the show-more button text
  if (hidden > 0) {
    showMoreBtn.textContent = 'Show all ';
    hiddenCountEl.textContent = '(+' + hidden + ' more)';
    showMoreBtn.appendChild(hiddenCountEl);
    handmadeFooter.style.display = 'block';
  } else if (isExpanded && matching.length > INITIAL_VISIBLE) {
    showMoreBtn.textContent = 'Show fewer';
    handmadeFooter.style.display = 'block';
  } else {
    handmadeFooter.style.display = 'none';
  }

  showMoreBtn.setAttribute('aria-expanded', String(isExpanded));
}

document.querySelectorAll('.filter-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    isExpanded    = false;

    document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    renderHandmadeCards();
  });
});

showMoreBtn.addEventListener('click', () => {
  isExpanded = !isExpanded;
  renderHandmadeCards();
});

// Listeners above are bound to static elements, so they stay valid once
// cards are fetched and appended asynchronously below.
loadHandmadeCards().then(renderHandmadeCards);

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
// 7. PROOF BAND — count-up numbers when they scroll into view
//    Targets: [data-count]. Optional data-decimals, data-sep (thousands).
// -----------------------------------------------------------------
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function formatCount(value, decimals, sep) {
  const fixed = value.toFixed(decimals);
  if (!sep) return fixed;
  const [int, frac] = fixed.split('.');
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return frac ? `${grouped}.${frac}` : grouped;
}

function countUp(el) {
  const target   = Number(el.dataset.count);
  const decimals = Number(el.dataset.decimals || 0);
  const sep      = 'sep' in el.dataset;
  if (reduceMotion || !Number.isFinite(target)) {
    el.textContent = formatCount(target, decimals, sep);
    return;
  }
  const duration = 1400;
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = formatCount(target * eased, decimals, sep);
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    countUp(entry.target);
    countObserver.unobserve(entry.target);
  });
}, { threshold: 0.6 });

document.querySelectorAll('[data-count]').forEach((el) => countObserver.observe(el));

// -----------------------------------------------------------------
// 8. CASE-STUDY CHARTS — tiny inline-SVG bar charts, no library.
//    Contract with the markup: .chart__plot carries data-chart="hbar|vbar"
//    and a JSON data-series of [label, value] pairs, one series per chart.
// -----------------------------------------------------------------
const SVG_NS = 'http://www.w3.org/2000/svg';
const tip = document.getElementById('chart-tip');

function svgEl(name, attrs = {}) {
  const el = document.createElementNS(SVG_NS, name);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

function bindTip(mark, label, valueText) {
  if (!tip) return;
  const show = (e) => {
    tip.innerHTML = `<b>${label}</b> · ${valueText}`;
    tip.hidden = false;
    move(e);
  };
  const move = (e) => {
    const p = e.touches ? e.touches[0] : e;
    tip.style.left = `${p.clientX}px`;
    tip.style.top  = `${p.clientY}px`;
  };
  const hide = () => { tip.hidden = true; };
  mark.addEventListener('mouseenter', show);
  mark.addEventListener('mousemove', move);
  mark.addEventListener('mouseleave', hide);
  mark.addEventListener('touchstart', show, { passive: true });
  mark.addEventListener('touchend', hide);
}

// Rows labelled "Everywhere else" render muted — it's a remainder, not a
// category.
function drawHBar(plot, series) {
  const rowH = 30, labelW = 118, valueW = 44, barH = 12;
  const width = 480;
  const height = series.length * rowH;
  const max = Math.max(...series.map(([, v]) => v));
  const svg = svgEl('svg', { viewBox: `0 0 ${width} ${height}`, role: 'img', 'aria-hidden': 'true' });
  const trackW = width - labelW - valueW;

  series.forEach(([label, value], i) => {
    const y = i * rowH + (rowH - barH) / 2;
    const isOther = /else|other/i.test(label);
    const lbl = svgEl('text', { x: 0, y: y + barH / 2 + 4, class: isOther ? 'lbl lbl--muted' : 'lbl' });
    lbl.textContent = label;
    svg.appendChild(lbl);

    svg.appendChild(svgEl('rect', { x: labelW, y, width: trackW, height: barH, rx: 4, class: 'bar-track' }));

    const w = Math.max(6, (value / max) * trackW);
    const bar = svgEl('rect', { x: labelW, y, width: w, height: barH, rx: 4, class: isOther ? 'bar bar--muted' : 'bar', style: `--i:${i}` });
    svg.appendChild(bar);

    const val = svgEl('text', { x: width, y: y + barH / 2 + 4, 'text-anchor': 'end', class: 'val' });
    val.textContent = `${value}%`;
    svg.appendChild(val);

    // Oversized invisible hit target so the tooltip is easy to reach
    const hit = svgEl('rect', { x: 0, y: i * rowH, width, height: rowH, fill: 'transparent' });
    bindTip(hit, label, `${value}% of visitors`);
    svg.appendChild(hit);
  });
  plot.appendChild(svg);
}

function drawVBar(plot, series) {
  const width = 480, height = 200, padB = 26, padT = 18, gap = 14;
  const max = Math.max(...series.map(([, v]) => v));
  const niceMax = Math.ceil(max / 50) * 50;
  const plotH = height - padB - padT;
  const colW = width / series.length;
  const barW = colW - gap;
  const svg = svgEl('svg', { viewBox: `0 0 ${width} ${height}`, role: 'img', 'aria-hidden': 'true' });

  for (let g = 1; g <= 4; g++) {
    const y = padT + plotH - (plotH * g) / 4;
    svg.appendChild(svgEl('line', { x1: 0, x2: width, y1: y, y2: y, class: 'grid-line' }));
    const t = svgEl('text', { x: width, y: y - 4, 'text-anchor': 'end', class: 'lbl--muted' });
    t.textContent = Math.round((niceMax * g) / 4);
    svg.appendChild(t);
  }
  const baseY = padT + plotH;
  svg.appendChild(svgEl('line', { x1: 0, x2: width, y1: baseY, y2: baseY, class: 'grid-line' }));

  series.forEach(([label, value], i) => {
    const h = (value / niceMax) * plotH;
    const x = i * colW + gap / 2;
    const y = baseY - h;
    const isPeak = value === max;
    const isLast = i === series.length - 1;

    // Rounded top only: draw as a path so the baseline stays square
    const r = Math.min(4, barW / 2, h);
    const d = `M${x},${baseY} V${y + r} Q${x},${y} ${x + r},${y} H${x + barW - r} Q${x + barW},${y} ${x + barW},${y + r} V${baseY} Z`;
    const bar = svgEl('path', { d, class: isPeak ? 'bar bar--peak' : 'bar', style: `--i:${i}` });
    svg.appendChild(bar);

    if (isPeak || isLast) {
      const val = svgEl('text', { x: x + barW / 2, y: y - 6, 'text-anchor': 'middle', class: 'val' });
      val.textContent = value;
      svg.appendChild(val);
    }

    const lbl = svgEl('text', { x: x + barW / 2, y: height - 8, 'text-anchor': 'middle', class: 'lbl lbl--muted' });
    lbl.textContent = label;
    svg.appendChild(lbl);

    const hit = svgEl('rect', { x: i * colW, y: 0, width: colW, height, fill: 'transparent' });
    bindTip(hit, `${label} 2026`, `${value} commits`);
    svg.appendChild(hit);
  });
  plot.appendChild(svg);
}

document.querySelectorAll('.chart__plot[data-chart]').forEach((plot) => {
  let series;
  try { series = JSON.parse(plot.dataset.series); } catch { return; }
  if (plot.dataset.chart === 'hbar') drawHBar(plot, series);
  else if (plot.dataset.chart === 'vbar') drawVBar(plot, series);
});

// Grow the bars the first time each chart scrolls into view
const chartObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-drawn');
    chartObserver.unobserve(entry.target);
  });
}, { threshold: 0.35 });
document.querySelectorAll('.chart__plot[data-chart]').forEach((plot) => {
  // A frame to paint the collapsed state, so the transition has a start.
  requestAnimationFrame(() => chartObserver.observe(plot));
});

// -----------------------------------------------------------------
// 9. SCREENSHOT GALLERIES + LIGHTBOX
//    Each case study has a .gallery of thumbnail buttons carrying
//    data-full / data-caption. One shared <dialog> shows them with
//    prev/next inside the same case study's set.
// -----------------------------------------------------------------
const lightbox   = document.getElementById('lightbox');
const lbImg      = document.getElementById('lightbox-img');
const lbCaption  = document.getElementById('lightbox-caption');
let lbSet = [];
let lbIndex = 0;

let showLightboxItem = function (i) {
  lbIndex = (i + lbSet.length) % lbSet.length;
  const btn = lbSet[lbIndex];
  lbImg.src = btn.dataset.full;
  lbImg.alt = btn.dataset.caption || '';
  lbCaption.textContent = btn.dataset.caption || '';
  [lbIndex + 1, lbIndex - 1].forEach((n) => {
    const b = lbSet[(n + lbSet.length) % lbSet.length];
    if (b) { const im = new Image(); im.src = b.dataset.full; }
  });
};

if (lightbox && typeof lightbox.showModal === 'function') {
  document.querySelectorAll('.gallery').forEach((gal) => {
    const thumbs = Array.from(gal.querySelectorAll('.gallery__thumb'));
    thumbs.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        lbSet = thumbs;
        showLightboxItem(i);
        lightbox.showModal();
      });
    });
  });

  lightbox.querySelector('[data-lb-close]').addEventListener('click', () => lightbox.close());
  lightbox.querySelector('[data-lb-prev]').addEventListener('click', () => showLightboxItem(lbIndex - 1));
  lightbox.querySelector('[data-lb-next]').addEventListener('click', () => showLightboxItem(lbIndex + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') showLightboxItem(lbIndex + 1);
    if (e.key === 'ArrowLeft')  showLightboxItem(lbIndex - 1);
  });
  lightbox.addEventListener('close', () => { lbImg.removeAttribute('src'); });
}

document.querySelectorAll('.case').forEach((c) => {
  const main = c.querySelector('.shot--desktop img');
  const first = c.querySelector('.gallery__thumb');
  if (main && first) {
    main.style.cursor = 'zoom-in';
    main.addEventListener('click', () => first.click());
  }
});

// -----------------------------------------------------------------
// 10. DEMO VIDEO — only download + play while it's on screen
// -----------------------------------------------------------------
const demoVideos = document.querySelectorAll('.shot__video');
if (demoVideos.length && !reduceMotion) {
  const vidObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const v = entry.target;
      if (entry.isIntersecting) {
        if (v.preload === 'none') v.preload = 'auto';
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, { threshold: 0.4 });
  demoVideos.forEach((v) => vidObserver.observe(v));
}

// -----------------------------------------------------------------
// 12. LIGHTBOX MEDIA TYPES — images, local MP4s, and YouTube embeds
//     Overrides showLightboxItem so a gallery can mix all three.
//     Videos only load when opened; leaving the item stops playback.
// -----------------------------------------------------------------
const lbVideo = document.getElementById('lightbox-video');
const lbEmbed = document.getElementById('lightbox-embed');

function lightboxStopMedia() {
  if (lbVideo) { lbVideo.pause(); lbVideo.removeAttribute('src'); lbVideo.load(); lbVideo.hidden = true; }
  if (lbEmbed) { lbEmbed.innerHTML = ''; lbEmbed.hidden = true; }
  if (lbImg)   { lbImg.hidden = true; }
}

if (lightbox && lbVideo && lbEmbed) {
  // Replace the image-only renderer defined in section 9
  showLightboxItem = function (i) {
    lbIndex = (i + lbSet.length) % lbSet.length;
    const btn = lbSet[lbIndex];
    lightboxStopMedia();
    lbCaption.textContent = btn.dataset.caption || '';

    if (btn.dataset.youtube) {
      const id = btn.dataset.youtube;
      const f = document.createElement('iframe');
      f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
      f.title = btn.dataset.caption || 'Demo video';
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      f.allowFullscreen = true;
      lbEmbed.appendChild(f);
      lbEmbed.hidden = false;
    } else if (btn.dataset.video) {
      lbVideo.poster = btn.dataset.poster || '';
      lbVideo.src = btn.dataset.video;
      lbVideo.hidden = false;
      lbVideo.play().catch(() => {});
    } else {
      lbImg.src = btn.dataset.full;
      lbImg.alt = btn.dataset.caption || '';
      lbImg.hidden = false;
      [lbIndex + 1, lbIndex - 1].forEach((n) => {
        const b = lbSet[(n + lbSet.length) % lbSet.length];
        if (b && b.dataset.full) { const im = new Image(); im.src = b.dataset.full; }
      });
    }
  };
  lightbox.addEventListener('close', lightboxStopMedia);
}

// -----------------------------------------------------------------
// 14. CASE TOGGLE — button in the body opens the detail panel.
//     Charts must be (re)drawn on open: they measure zero while hidden.
// -----------------------------------------------------------------
document.querySelectorAll('.case__toggle').forEach((btn) => {
  const panel = document.getElementById(btn.getAttribute('aria-controls'));
  if (!panel) return;
  const setOpen = (open) => {
    btn.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
    if (open) {
      panel.querySelectorAll('.chart__plot[data-chart]').forEach((plot) => {
        plot.classList.remove('is-drawn');
        requestAnimationFrame(() => requestAnimationFrame(() => plot.classList.add('is-drawn')));
      });
    }
  };
  btn.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
  panel.querySelectorAll('[data-collapse]').forEach((c) => {
    c.addEventListener('click', () => {
      setOpen(false);
      btn.closest('.case').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });
});
