# Demo — Psicoterapia Gestalt (RigidCode sample site)

Sample website for psychologists in Colima, used as the "ver un ejemplo" link in RigidCode
outreach. First prospect: "Atención Psicológica con Enfoque Gestalt" (asked for info + costs on
2026-10-12).

- Fictitious practitioner: **Psic. Lucía Arenal** — all names, credentials (cédula 0000000) and
  texts are illustrative and labeled as such on the page.
- Static site: `index.html`, `styles.css`, `main.js`, `assets/`. No build step. `noindex` +
  `robots.txt` disallow.
- All WhatsApp CTAs go to RigidCode (33 1346 6132) with prefilled messages — see
  `WHATSAPP_MESSAGES` in `main.js`.

## Design direction

| Pillar | Decision |
|---|---|
| Point of view | Warm editorial calm; Gestalt perception principles (closure) as the visual motif |
| Typography | Fraunces (display, SOFT axis) + Hanken Grotesk (body). No Inter |
| Color | Paper `#F4EFE6`, paper-2 `#EBE3D5`, ink `#1E2B25`, moss `#2C4639`, clay `#B5653D`, sage `#C9D3C1` |
| Motion | Hero load stagger, SVG arcs drawn on load (closure), scroll reveals, subtle cursor parallax; reduced-motion respected |
| Imagery | No stock photos. SVG closure illustration; "Aquí va su fotografía" monogram placeholder in About |
| Pitch rule | Sells "patients find you and trust you before writing"; no reviews angle (psychologist ethics) |

## Sections

Demo bar → header/nav → hero → "Quizá llegas aquí porque…" → ¿Qué es la terapia Gestalt? (3
principles + quote) → Servicios (individual / pareja / en línea) → Primera sesión (4 steps) →
Sobre mí → FAQ → Contacto → footer (Línea de la Vida 800 911 2000).

## Status (2026-10-12)

- [x] First build, desktop + mobile reviewed via headless Chrome screenshots
- [x] Fixes: monogram portrait, dot bullets, "+" FAQ icons, mobile availability card below caption
- [x] Verify the last mobile fix (availability card) renders correctly
- [x] Polish pass with `taste-skill:high-end-visual-design` + `emil-design-eng`: floating pill
      header (blur on pseudo-element so the fixed mobile menu isn't trapped), button-in-button
      WhatsApp CTA, double-bezel cards, hover gated to fine pointers, `:active` scale, faster
      hovers, IntersectionObserver instead of scroll listener, full-screen mobile menu with
      stagger (exit faster than enter), FAQ open fade
- [ ] Optional: user runs `/review-animations` (user-invocable only) for a strict motion audit
- [ ] Deploy (rigidcode.com/demo/psicologia or GitHub Pages) — ask the user first
- [ ] Send link + reply message to the Gestalt prospect

## Preview locally

Open `index.html` in a browser. Mobile check: headless Chrome on Windows has a minimum window
width, so render a 390px-wide iframe wrapper instead of `--window-size=390,…`.
