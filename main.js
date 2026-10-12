// Demo site: every WhatsApp CTA goes to RigidCode, so prospects who click it reach the seller.
const WHATSAPP_NUMBER = "523313466132";

const WHATSAPP_MESSAGES = {
  demo: "Hola, vi el sitio de ejemplo de psicología y me gustaría uno para mi consultorio.",
  general: "Hola, vi el sitio de ejemplo de psicología y me gustaría más información.",
  individual: "Hola, vi el sitio de ejemplo (terapia individual) y me gustaría más información.",
  pareja: "Hola, vi el sitio de ejemplo (terapia de pareja) y me gustaría más información.",
  enlinea: "Hola, vi el sitio de ejemplo (terapia en línea) y me gustaría más información.",
};

document.documentElement.classList.add("js");

function buildWhatsAppUrl(key) {
  const message = WHATSAPP_MESSAGES[key] ?? WHATSAPP_MESSAGES.general;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function setupWhatsAppLinks() {
  document.querySelectorAll("[data-wa]").forEach((link) => {
    link.href = buildWhatsAppUrl(link.dataset.wa);
    link.target = "_blank";
    link.rel = "noopener";
  });
}

function setupNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav-menu]");
  if (!toggle || !menu) return;

  const header = document.querySelector("[data-header]");

  const setOpen = (open) => {
    // The demo bar pushes the header down, so start the sheet below the header's real position
    if (open && header) {
      menu.style.paddingTop = `${Math.round(header.getBoundingClientRect().bottom + 24)}px`;
    }
    toggle.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  };

  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
}

// IntersectionObserver instead of a scroll listener: no work on every scroll frame
function setupScrollState() {
  const header = document.querySelector("[data-header]");
  const sentinel = document.querySelector("[data-scroll-sentinel]");
  const floatButton = document.querySelector(".wa-float");
  const heroActions = document.querySelector(".hero__actions");
  if (!("IntersectionObserver" in window)) return;

  if (header && sentinel) {
    new IntersectionObserver(([entry]) => {
      header.classList.toggle("is-scrolled", !entry.isIntersecting);
    }).observe(sentinel);
  }

  // Floating WhatsApp shows only once the hero CTA has left the screen
  if (floatButton && heroActions) {
    new IntersectionObserver(([entry]) => {
      const scrolledPast = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      floatButton.classList.toggle("is-visible", scrolledPast);
    }).observe(heroActions);
  }
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-in"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );

  items.forEach((item, index) => {
    // Stagger siblings inside the same list for a calmer cascade
    item.style.transitionDelay = `${(index % 4) * 70}ms`;
    observer.observe(item);
  });
}

// Hero illustration drifts slightly with the cursor (desktop, motion allowed)
function setupHeroParallax() {
  const art = document.querySelector(".closure");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (!art || reduceMotion || !finePointer) return;

  window.addEventListener("pointermove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 10;
    const y = (event.clientY / window.innerHeight - 0.5) * 10;
    art.style.transform = `translate(${x}px, ${y}px)`;
  });
}

function setYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}

setupWhatsAppLinks();
setupNav();
setupScrollState();
setupReveal();
setupHeroParallax();
setYear();
