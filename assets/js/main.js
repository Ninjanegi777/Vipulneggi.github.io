/* ==========================================================================
   Vipul Negi — Portfolio scripts
   - SITE: edit your name, email, links and navigation here (used on every page)
   - The header, footer and contact band are built from SITE, so change them once.
   ========================================================================== */

const SITE = {
  name: "Vipul Negi",
  initials: "VN",
  email: "vipul1negi@gmail.com",
  resume: "https://drive.google.com/file/d/1iauAGseeMoaIC74NTz6H7hw4zyhPWUAh/view?usp=sharing",
  linkedin: "https://www.linkedin.com/in/vipul-negi19/",
  instagram: "https://www.instagram.com/",
  nav: [
    { label: "Work", href: "index.html#work" },
    { label: "About", href: "about.html" },
    { label: "Contact", href: "contact.html" },
  ],
};

/* Pages inside sub-folders (e.g. work/lisha.html) set <body data-root="../"> so links resolve. */
const ROOT = document.body.dataset.root || "";
const PAGE = document.body.dataset.page || "";

const icons = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.1c0-1.22-.02-2.79-1.7-2.79-1.7 0-1.96 1.33-1.96 2.7V21h-4z"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/></svg>',
};

/* ---------- Header ---------- */
function renderHeader() {
  const el = document.getElementById("site-header");
  if (!el) return;
  const links = SITE.nav
    .map((n) => {
      const current = !n.href.includes("#") && n.href === PAGE ? ' aria-current="page"' : "";
      return `<a href="${ROOT}${n.href}"${current}>${n.label}</a>`;
    })
    .join("");
  el.className = "site-header";
  el.innerHTML = `
    <div class="container">
      <a class="logo" href="${ROOT}index.html" aria-label="${SITE.name}, home">
        <span class="logo-mark">${SITE.initials}</span><span>${SITE.name}</span>
      </a>
      <div class="header-actions">
        <nav class="nav" id="site-nav" aria-label="Main">
          ${links}
          <a class="btn btn--primary" href="${SITE.resume}" target="_blank" rel="noopener">Resume ${icons.arrow}</a>
        </nav>
        <button class="icon-btn" id="theme-toggle" type="button" aria-label="Switch colour theme"></button>
        <button class="icon-btn menu-toggle" id="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">${icons.menu}</button>
      </div>
    </div>`;

  const toggle = el.querySelector("#menu-toggle");
  const nav = el.querySelector("#site-nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    toggle.innerHTML = open ? icons.close : icons.menu;
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = icons.menu;
  }));

  const onScroll = () => el.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- Theme (light / dark, remembered per visitor) ---------- */
function initTheme() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  if (saved) document.documentElement.dataset.theme = saved;
  const isDark = () =>
    document.documentElement.dataset.theme === "dark" ||
    (!document.documentElement.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
  const paint = () => { btn.innerHTML = isDark() ? icons.sun : icons.moon; };
  paint();
  btn.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    paint();
  });
}

/* ---------- Footer + contact band ---------- */
function renderFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;
  const showBand = document.body.dataset.ctaBand !== "off";
  const band = showBand ? `
    <div class="container">
      <section class="cta-band reveal" aria-labelledby="cta-title">
        <div>
          <p class="eyebrow" style="color:inherit;opacity:.8">Open to new projects</p>
          <h2 id="cta-title">Let’s turn your “What ifs” into “Let’s dos”!</h2>
        </div>
        <div class="cta-actions">
          <p>Have a product that needs untangling? I reply within a day or two.</p>
          <a class="btn" href="${ROOT}contact.html">Start a conversation ${icons.arrow}</a>
        </div>
      </section>
    </div>` : "";
  el.innerHTML = `
    ${band}
    <footer class="site-footer">
      <div class="container footer-grid">
        <small>© ${new Date().getFullYear()} ${SITE.name}. Designed with care, built by hand.</small>
        <div class="footer-links">
          <a href="mailto:${SITE.email}">Email</a>
          <a href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
          <a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a>
          <a href="${SITE.resume}" target="_blank" rel="noopener">Resume</a>
        </div>
      </div>
    </footer>`;
}

/* ---------- "What I bring": rotating phrases ---------- */
function initRotators() {
  document.querySelectorAll("[data-rotate]").forEach((el, i) => {
    const words = el.dataset.rotate.split("|").map((s) => s.trim());
    let n = 0;
    el.textContent = words[0];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setTimeout(() => {
      setInterval(() => {
        el.classList.add("is-out");
        setTimeout(() => {
          n = (n + 1) % words.length;
          el.textContent = words[n];
          el.classList.remove("is-out");
        }, 350);
      }, 2800);
    }, i * 500);
  });
}

/* ---------- Testimonials: tabs ---------- */
function initTabs() {
  document.querySelectorAll("[data-tabs]").forEach((group) => {
    const tabs = [...group.querySelectorAll('[role="tab"]')];
    const select = (tab) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", on);
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(t));
      t.addEventListener("keydown", (e) => {
        const dir = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (!dir) return;
        e.preventDefault();
        const next = tabs[(i + dir + tabs.length) % tabs.length];
        select(next);
        next.focus();
      });
    });
  });
}

/* ---------- Case studies: table of contents highlight ---------- */
function initToc() {
  const links = [...document.querySelectorAll(".toc a")];
  if (!links.length || !("IntersectionObserver" in window)) return;
  const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.remove("is-active"));
      map.get(e.target.id)?.classList.add("is-active");
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
}

/* ---------- Image lightbox (any .gallery img) ---------- */
function initLightbox() {
  const imgs = document.querySelectorAll(".gallery img, .cs-cover img");
  if (!imgs.length) return;
  const box = document.createElement("div");
  box.className = "lightbox";
  box.hidden = true;
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-label", "Image preview");
  box.innerHTML = "<img alt=''>";
  document.body.appendChild(box);
  const big = box.querySelector("img");
  const close = () => { box.hidden = true; document.body.style.overflow = ""; };
  imgs.forEach((img) => img.addEventListener("click", () => {
    big.src = img.dataset.full || img.currentSrc || img.src;
    big.alt = img.alt;
    box.hidden = false;
    document.body.style.overflow = "hidden";
  }));
  box.addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !box.hidden) close(); });
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("is-visible")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach((e) => io.observe(e));
}

/* ---------- Brands marquee: duplicate the row so it loops seamlessly ---------- */
function initMarquee() {
  document.querySelectorAll(".marquee-track").forEach((t) => {
    t.innerHTML += t.innerHTML;
    [...t.children].slice(t.children.length / 2).forEach((c) => c.setAttribute("aria-hidden", "true"));
  });
}

/* ---------- Contact form ----------
   No server needed: the form opens the visitor's email app with the message filled in.
   To receive messages without email apps, set data-endpoint on the <form> to a
   Formspree (or similar) URL — see README.md. */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const status = form.querySelector("[data-status]");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    const endpoint = form.dataset.endpoint;
    if (endpoint) {
      status.textContent = "Sending…";
      try {
        const res = await fetch(endpoint, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
        if (!res.ok) throw new Error();
        form.reset();
        status.textContent = "Thanks! Your message is on its way. I’ll get back to you soon.";
      } catch {
        status.textContent = `Something went wrong. Please email me at ${SITE.email}.`;
      }
      return;
    }
    const subject = encodeURIComponent(`Hello from ${data.name}`);
    const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    status.textContent = "Your email app should open with the message ready to send.";
  });
}

renderHeader();
initTheme();
renderFooter();
initRotators();
initTabs();
initToc();
initLightbox();
initMarquee();
initContactForm();
initReveal();
