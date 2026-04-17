# Suppers Software — Personal/Studio Site Design

**Date:** 2026-04-17
**Owner:** Joris Suppers
**Status:** Approved, ready for implementation plan

## Goal

A single-page, static, professional site for **Suppers Software** — the independent studio of Joris Suppers. Hosts at **suppers.ai** via GitHub Pages. Positions the studio and its founder, and showcases the two open-source projects **wafer.run** and **solobase**.

## Constraints & non-goals

- Static HTML/CSS only. No build step, no framework, no runtime JS dependency.
- GitHub Pages hosting (organization root page repo: `suppers-ai/suppers-ai.github.io`).
- No blog, contact form, analytics, or newsletter signup in v1.
- No dark-mode toggle in v1 (the chosen palette is the light-warm "Stone & Sage" direction).

## Visual direction

**Palette — "Stone & Sage":** muted stone background, deep-forest ink, modern grotesk sans. Calm, considered, Scandinavian-adjacent.

| Token | Value | Use |
|---|---|---|
| `--bg` | `#efebe2` | Page background |
| `--bg-alt` | `#e7e2d6` | Alternating section background (About) |
| `--surface` | `#ffffff` | Project cards |
| `--ink` | `#14241c` | Headings, footer background |
| `--muted` | `#495549` | Body copy |
| `--accent` | `#2d5a3d` | Eyebrows, links, hover states |
| `--border` | `#dad4c7` | Hairlines, card borders |

**Typography:** Inter via Google Fonts, single family, weights 400 / 500 / 700. Load with `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` and `<link rel="stylesheet" href="…">` in `<head>`; `font-display: swap` is the Google Fonts default.

- Hero H1: Inter 700, `-0.025em` letter-spacing, `1.02` line-height.
- Section headings (H2): Inter 700, `-0.02em`, `1.1`.
- Body: Inter 400/500, `1.55` line-height, max-width ~62ch for prose.
- Eyebrows: uppercase 11px, `0.18em` letter-spacing, accent green.

## Page structure (single-page scroll, personal-first)

1. **Sticky header**
   - Left: `suppers_logo.png` (28px) + wordmark "Suppers Software".
   - Right: anchor links — *Work · Open Source · Contact*.
   - `position: sticky; top: 0;` with semi-transparent stone background (`rgb(239 235 226 / 0.82)`) and `backdrop-filter: blur(12px)` applied always (no scroll-state detection → no JS).
   - Bottom hairline in `--border` for separation.

2. **Hero**
   - Eyebrow: "Independent software studio"
   - H1: **"Software that scales — and solves real problems."**
   - Lede: "Suppers Software is an independent studio building durable, mostly open tools for developers."
   - Row of three social pills: GitHub, X, LinkedIn (links below).

3. **About** (on `--bg-alt`)
   - Two-column layout: `joris.webp` avatar (120px, circular, subtle 2px ring in `--border`) left; bio right.
   - Copy:
     > I'm Joris Suppers, currently CTO at [Campertunity](https://campertunity.com), the platform for finding and booking unique outdoor stays. Suppers Software is the studio behind my open-source work — the place I build the tools I wish existed. Small team, long horizons, open by default.

4. **Open Source**
   - Grid of 2 project cards (`--surface` background, 1px `--border` hairline, 10px radius).
   - Hover state: `transform: translateY(-2px)` and border color shifts to `--accent`, 180ms ease. Suppressed under `prefers-reduced-motion`.
   - Each card: project logo (48px) + project name (Inter 600, 18px) + tagline (`--muted`, 14px, 1.5 line-height) + secondary "View on GitHub →" link in `--accent`.
   - **wafer.run** — uses `wafer_run_logo.png`, tagline: *"A runtime that forces code into small, testable blocks — purpose-built for AI to write and verify."* Links to `https://github.com/wafer-run/wafer-run`.
   - **solobase** — uses `solobase_logo.png`, tagline: *"The backend that runs in your frontend. A single binary, deployable anywhere — even your browser."* Links to `https://github.com/suppers-ai/solobase`.

5. **Footer**
   - Dark (`--ink`) background with `--bg` text color.
   - Left column: small `suppers_logo.png` (24px, `filter: invert(1) brightness(1.1)` so it reads on the dark bg) + "© Suppers Software · Utrecht".
   - Right column: GitHub / X / LinkedIn text links separated by middots, hover underline.
   - `padding: 48px 0` on large screens, stacks on mobile.

## Social links

| Network | URL |
|---|---|
| GitHub | https://github.com/suppers-ai |
| X | https://x.com/suppers_ai |
| LinkedIn | https://www.linkedin.com/in/joris-suppers |

All social anchors use `rel="me"` for verification/identity.

## SEO & meta

`<head>` includes:

- `<title>Suppers Software — Independent software studio</title>`
- `<meta name="description" content="Suppers Software is the independent studio of Joris Suppers, building durable, mostly open tools for developers — including wafer.run and solobase.">`
- `<link rel="canonical" href="https://suppers.ai/">`
- Open Graph tags (`og:title`, `og:description`, `og:image` pointing to `suppers_logo.png`, `og:url`, `og:type=website`).
- `<meta name="twitter:card" content="summary">` and `<meta name="twitter:site" content="@suppers_ai">`.
- `<link rel="icon" type="image/svg+xml" href="favicon.svg">`.

## Responsive & accessibility

- Mobile-first CSS. Single breakpoint at **720px** — at which point About and Open Source columns stack.
- Prose constrained to `max-width: 62ch`.
- Respects `prefers-reduced-motion`: disables smooth-scroll and hover-lift transitions when reduced.
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`, landmark roles implicit.
- Every `<img>` has meaningful `alt` text (logos named; `joris.webp` as "Joris Suppers").
- Focus-visible ring in `--accent` for keyboard nav.
- Color contrast: `--ink` on `--bg` and `--muted` on `--bg` both meet WCAG AA.

## Performance target

Lighthouse 100 / 100 / 100 / 100 (Performance, Accessibility, Best Practices, SEO). Zero-JS page with one self-hosted webfont subset (Inter latin, weights 400/500/700) makes this trivial.

- Inline critical CSS is **not** required (single CSS file, ~200 lines).
- Images pre-optimized PNGs; `<img>` tags use explicit `width`/`height` to reserve layout space.
- Use `loading="lazy"` on below-fold images (project logos, Joris photo).

## Deployment

1. Repo: **`suppers-ai/site`** (current remote — a project Pages repo; custom domain handled via CNAME).
2. Push the site files to the default branch.
3. Add a `CNAME` file at the repo root containing the single line `suppers.ai`.
4. In the repo's *Settings → Pages*: confirm deploy from the default branch, enable **Enforce HTTPS**.
5. DNS at the `suppers.ai` registrar:
   - Apex `A` records pointing to GitHub Pages IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - `AAAA` records for IPv6: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.
   - Optional `CNAME` for `www` → `suppers-ai.github.io`.
6. Wait for GitHub's TLS certificate to provision, then enable HTTPS enforcement.

A short `DEPLOY.md` in the repo documents steps 3–6 for future reference.

## File layout

```
site/
├── index.html          # single page
├── styles.css          # ~200 lines, CSS custom properties
├── CNAME               # "suppers.ai"
├── favicon.svg         # minimal 'S' monogram, stone/sage colors
├── suppers_logo.png    # (existing)
├── wafer_run_logo.png  # (existing)
├── solobase_logo.png   # (existing)
├── joris.webp           # (existing)
├── DEPLOY.md           # DNS + Pages setup notes
└── README.md           # short project description
```

## Out of scope (may revisit later)

- Dark-mode toggle.
- Blog / writing section.
- Additional project cards beyond wafer.run and solobase.
- Contact form or mailto link.
- Analytics.
- Any server-rendered content or build tooling.
