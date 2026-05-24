# abhisaini.in

Personal portfolio — a minimal editorial single-page site. Vanilla HTML, CSS, and JS. No build step.

## Run locally

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8080
```

Then visit http://localhost:8080.

## Structure

```
.
├── index.html        # all sections + meta + JSON-LD
├── styles.css        # design tokens, layout, components, motion
├── script.js         # theme toggle, scroll reveal, mobile menu, active nav, card halo
├── assets/
│   ├── favicon.svg
│   ├── og-image.png  # add a 1200x630 social preview
│   └── resume.pdf    # add your resume
├── .nojekyll         # GitHub Pages: serve files as-is
└── README.md
```

## Customizing

All copy is in `index.html`, marked with bracketed placeholders like `[PROJECT 1]` or `[ONE-LINE POSITIONING]`. Replace them in place.

### Design tokens

Theme colors, type scale, spacing, and motion live in `:root` at the top of [`styles.css`](styles.css). Change the accent in one place:

```css
--accent: #b85427;       /* burnt orange */
--accent-soft: #d2814f;
```

Light/dark mode follow `prefers-color-scheme` by default. The theme toggle in the nav lets visitors override and remembers their choice via `localStorage`.

### Sections

1. **Hero** — name + one-line positioning + two CTAs
2. **Now strip** — current focus, one sentence
3. **Selected Work** — case-study cards (2-up grid on desktop)
4. **Experience** — timeline (years column + role + bullets)
5. **About** — short essay paragraphs
6. **Stack** — skills as inline lists by category
7. **Writing** — placeholder slots for future essays
8. **Contact** — large email link + socials

### Adding a project card

Duplicate one `<li class="card reveal" data-hover-halo>` block inside `<ul class="cards">` and fill in meta, title, lede, and tags.

### Adding an experience row

Duplicate one `<li class="timeline__row reveal">` block inside `<ol class="timeline">`.

## Mobile

Mobile-first throughout. Verified breakpoints: 320 / 375 / 390 / 768 / 1024 / 1440. The nav collapses to a full-screen drawer under 768px with focus trap, body scroll lock, Esc-to-close, and backdrop tap-to-close.

## Accessibility

- Semantic landmarks, skip link, proper heading order
- `:focus-visible` rings using the accent color
- Honors `prefers-reduced-motion` (disables scroll-reveal, pulse, smooth scrolling)
- Tap targets ≥ 44px

## Deploy (GitHub Pages)

1. Push to `main`.
2. In repo settings, set **Pages → Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
3. Add your custom domain (`abhisaini.in`) and create a `CNAME` file with that domain.

The `.nojekyll` file ensures GitHub Pages serves files without Jekyll processing.
