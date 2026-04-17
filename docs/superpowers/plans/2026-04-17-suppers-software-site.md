# Suppers Software Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a single-page static site at `suppers.ai` for Suppers Software — the independent studio of Joris Suppers — showcasing the wafer.run and solobase open-source projects.

**Architecture:** Zero-JS static HTML + CSS served by GitHub Pages from `suppers-ai/suppers-ai.github.io`. Single `index.html`, single `styles.css`, CSS custom properties for theming, single Google Fonts family (Inter). Design per `docs/superpowers/specs/2026-04-17-suppers-software-site-design.md` — the "Stone & Sage" palette, personal-first section order.

**Tech Stack:** HTML5, CSS3 (custom properties, Grid, Flexbox, `backdrop-filter`), Inter via Google Fonts, GitHub Pages, Playwright (for visual QA), W3C Nu HTML Checker (optional local validation).

**Reference files in repo (already present, do not recreate):**
- `suppers_logo.png` — 512×512 PNG, used in header + footer.
- `wafer_run_logo.png` — 600×601 PNG, used in project card.
- `solobase_logo.png` — 128×128 PNG, used in project card.
- `joris.png` — 1034×1024 PNG, used in About avatar.

**How to preview locally:** `python3 -m http.server 8000` in the repo root, then open `http://localhost:8000`. Each task below assumes the dev server is running.

**Note on TDD:** This is a static design-driven site, so tasks use "write artifact → verify visually" instead of "write failing test → implement". The final Playwright task substitutes for an integration test by capturing screenshots and asserting key elements are present.

---

## File Structure

All paths are relative to the git repo root, which is the `site/` directory (`/home/joris/Programs/suppers-ai/site/`). All `git` and `npm` commands assume you are in that directory.

Files to create:
- `index.html` — single-page HTML document; semantic `<header>`, `<main>`, five `<section>`s, `<footer>`.
- `styles.css` — all styling; ~220 lines organized as: tokens → base → layout → components → responsive → motion overrides.
- `CNAME` — single line: `suppers.ai`.
- `favicon.svg` — minimal "S" monogram, inline SVG.
- `DEPLOY.md` — DNS + Pages setup notes.
- `tests/smoke.spec.ts` — Playwright smoke test (visual + presence).
- `package.json` + `playwright.config.ts` — scoped under `tests/` tooling only.

Files to modify:
- `README.md` — replace placeholder with project blurb + local-preview instructions.

---

## Task 1: HTML skeleton with SEO meta

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create `index.html` with full document skeleton**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Suppers Software — Independent software studio</title>
  <meta name="description" content="Suppers Software is the independent studio of Joris Suppers, building durable, mostly open tools for developers — including wafer.run and solobase.">
  <link rel="canonical" href="https://suppers.ai/">

  <meta property="og:title" content="Suppers Software — Independent software studio">
  <meta property="og:description" content="Independent studio building durable, mostly open tools for developers. Behind wafer.run and solobase.">
  <meta property="og:image" content="https://suppers.ai/suppers_logo.png">
  <meta property="og:url" content="https://suppers.ai/">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:site" content="@suppers_ai">

  <link rel="icon" type="image/svg+xml" href="favicon.svg">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap">

  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="site-header">
    <!-- Task 3 -->
  </header>

  <main>
    <section class="hero" id="top">
      <!-- Task 4 -->
    </section>

    <section class="about" id="about">
      <!-- Task 5 -->
    </section>

    <section class="work" id="open-source">
      <!-- Task 6 -->
    </section>
  </main>

  <footer class="site-footer" id="contact">
    <!-- Task 7 -->
  </footer>
</body>
</html>
```

- [ ] **Step 2: Verify the file loads without 404**

Start the dev server (if not running): `python3 -m http.server 8000`
Load `http://localhost:8000/`.
Expected: the browser shows a blank page with title "Suppers Software — Independent software studio" and no console 404s (the `styles.css` 404 is expected — we create it in Task 2).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "scaffold: empty index.html with head and semantic body"
```

---

## Task 2: CSS design tokens and base reset

**Files:**
- Create: `styles.css`

- [ ] **Step 1: Create `styles.css` with tokens, reset, and typographic base**

```css
/* ============  Tokens  ============ */
:root {
  --bg:       #efebe2;
  --bg-alt:   #e7e2d6;
  --surface:  #ffffff;
  --ink:      #14241c;
  --muted:    #495549;
  --accent:   #2d5a3d;
  --border:   #dad4c7;

  --radius:   10px;
  --radius-sm: 6px;
  --radius-pill: 999px;

  --shadow-card:  0 1px 2px rgba(20, 36, 28, 0.04);
  --shadow-lift:  0 8px 24px rgba(20, 36, 28, 0.08);

  --max-w: 1080px;
  --prose: 62ch;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;

  --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif;
}

/* ============  Reset & base  ============ */
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
img { display: block; max-width: 100%; height: auto; }
a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }

/* Focus ring */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* ============  Typography  ============ */
h1, h2, h3 { margin: 0; letter-spacing: -0.02em; line-height: 1.1; }
h1 { font-size: clamp(36px, 6vw, 64px); font-weight: 700; letter-spacing: -0.025em; line-height: 1.02; }
h2 { font-size: clamp(22px, 3vw, 28px); font-weight: 700; }
h3 { font-size: 18px; font-weight: 600; }
p  { margin: 0; }

.eyebrow {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--accent);
}

.lede {
  color: var(--muted);
  font-size: clamp(15px, 1.5vw, 17px);
  max-width: var(--prose);
}

/* ============  Layout wrapper  ============ */
.wrap {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 var(--space-5);
}

/* Motion overrides (later tasks add more) */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```

- [ ] **Step 2: Verify the stylesheet loads**

Reload `http://localhost:8000/`.
Expected: the page now has the stone background color `#efebe2`, Inter font loaded (check Network tab — `fonts.gstatic.com` request 200). No console errors.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "style: add design tokens and typographic base"
```

---

## Task 3: Sticky header with logo and nav

**Files:**
- Modify: `index.html` (replace the `<header>` placeholder)
- Modify: `styles.css` (append header styles)

- [ ] **Step 1: Replace the `<header>` block in `index.html`**

```html
<header class="site-header">
  <div class="wrap site-header__inner">
    <a class="brand" href="#top" aria-label="Suppers Software — home">
      <img src="suppers_logo.png" alt="" width="28" height="28" class="brand__mark">
      <span class="brand__name">Suppers Software</span>
    </a>
    <nav class="nav" aria-label="Primary">
      <a href="#about">About</a>
      <a href="#open-source">Open Source</a>
      <a href="#contact">Contact</a>
    </nav>
  </div>
</header>
```

- [ ] **Step 2: Append header styles to `styles.css`**

```css
/* ============  Header  ============ */
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgb(239 235 226 / 0.82);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}
.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-5);
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--ink);
  font-weight: 700;
  letter-spacing: -0.015em;
}
.brand:hover { text-decoration: none; }
.brand__mark { border-radius: var(--radius-sm); }
.brand__name { font-size: 15px; }

.nav {
  display: flex;
  gap: var(--space-5);
  font-size: 14px;
  color: var(--muted);
}
.nav a { color: inherit; }
.nav a:hover { color: var(--ink); text-decoration: none; }
```

- [ ] **Step 3: Verify header renders and sticks on scroll**

Reload. Expected: logo + wordmark on left, three nav links on right. Scroll down past the (empty) body — header stays at top with a blurred translucent background. Hover a nav link — color darkens to `--ink`.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: sticky header with logo and anchor nav"
```

---

## Task 4: Hero section

**Files:**
- Modify: `index.html` (replace `.hero` placeholder)
- Modify: `styles.css` (append hero styles)

- [ ] **Step 1: Replace `<section class="hero">` contents**

```html
<section class="hero" id="top">
  <div class="wrap hero__inner">
    <p class="eyebrow">Independent software studio</p>
    <h1>Software that scales —<br>and solves real problems.</h1>
    <p class="lede">Suppers Software is an independent studio building durable, mostly open tools for developers.</p>
    <ul class="socials" aria-label="Social profiles">
      <li><a rel="me" href="https://github.com/suppers-ai">GitHub</a></li>
      <li><a rel="me" href="https://x.com/suppers_ai">X</a></li>
      <li><a rel="me" href="https://www.linkedin.com/in/joris-suppers">LinkedIn</a></li>
    </ul>
  </div>
</section>
```

- [ ] **Step 2: Append hero styles to `styles.css`**

```css
/* ============  Hero  ============ */
.hero {
  padding: var(--space-9) 0 var(--space-8);
}
.hero__inner > * + * { margin-top: var(--space-4); }
.hero h1 { max-width: 18ch; }

.socials {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  padding: 0;
  margin: var(--space-5) 0 0;
  list-style: none;
}
.socials a {
  display: inline-block;
  padding: 6px 14px;
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  color: var(--ink);
  font-size: 13px;
  font-weight: 500;
  background: var(--bg);
  transition: border-color 180ms ease, color 180ms ease;
}
.socials a:hover {
  border-color: var(--accent);
  color: var(--accent);
  text-decoration: none;
}
```

- [ ] **Step 3: Verify**

Reload. Expected:
- Green eyebrow text "INDEPENDENT SOFTWARE STUDIO" (uppercase, spaced).
- Large bold headline on two lines.
- Muted lede below.
- Three pill-style social links; hover turns border + text green.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: hero with headline, lede, and social pills"
```

---

## Task 5: About section with avatar

**Files:**
- Modify: `index.html` (replace `.about` placeholder)
- Modify: `styles.css` (append about styles)

- [ ] **Step 1: Replace `<section class="about">` contents**

```html
<section class="about" id="about">
  <div class="wrap about__inner">
    <img class="about__avatar" src="joris.png" alt="Joris Suppers" width="120" height="120" loading="lazy">
    <div class="about__body">
      <p class="eyebrow">About</p>
      <h2>Hi, I'm Joris.</h2>
      <p class="about__copy">Currently CTO at <a href="https://campertunity.com">Campertunity</a>, the platform for finding and booking unique outdoor stays. Suppers Software is the studio behind my open-source work — the place I build the tools I wish existed. Small team, long horizons, open by default.</p>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append about styles to `styles.css`**

```css
/* ============  About  ============ */
.about {
  background: var(--bg-alt);
  padding: var(--space-8) 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.about__inner {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-7);
  align-items: center;
}
.about__avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border);
  background: var(--bg);
}
.about__body > * + * { margin-top: var(--space-3); }
.about__copy {
  color: var(--muted);
  max-width: var(--prose);
  font-size: 16px;
}
.about__copy a { font-weight: 500; }
```

- [ ] **Step 3: Verify**

Reload. Expected:
- Section background is slightly darker (`--bg-alt`) with hairlines top/bottom.
- Circular avatar (120px) on left, bio on right.
- "ABOUT" eyebrow, "Hi, I'm Joris." H2, paragraph with green underlined "Campertunity" link.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: about section with avatar and bio"
```

---

## Task 6: Open Source section with two project cards

**Files:**
- Modify: `index.html` (replace `.work` placeholder)
- Modify: `styles.css` (append cards styles)

- [ ] **Step 1: Replace `<section class="work">` contents**

```html
<section class="work" id="open-source">
  <div class="wrap work__inner">
    <header class="section-head">
      <p class="eyebrow">Open Source</p>
      <h2>Tools we build in the open.</h2>
    </header>

    <div class="cards">
      <article class="card">
        <img class="card__logo" src="wafer_run_logo.png" alt="" width="48" height="48" loading="lazy">
        <div class="card__body">
          <h3>wafer.run</h3>
          <p>A runtime that forces code into small, testable blocks — purpose-built for AI to write and verify.</p>
          <a class="card__link" href="https://github.com/wafer-run/wafer-run">View on GitHub <span aria-hidden="true">→</span></a>
        </div>
      </article>

      <article class="card">
        <img class="card__logo" src="solobase_logo.png" alt="" width="48" height="48" loading="lazy">
        <div class="card__body">
          <h3>solobase</h3>
          <p>The backend that runs in your frontend. A single binary, deployable anywhere — even your browser.</p>
          <a class="card__link" href="https://github.com/suppers-ai/solobase">View on GitHub <span aria-hidden="true">→</span></a>
        </div>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append cards styles to `styles.css`**

```css
/* ============  Open Source  ============ */
.work { padding: var(--space-8) 0; }
.section-head > * + * { margin-top: var(--space-2); }
.section-head { margin-bottom: var(--space-6); }

.cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-5);
}
.card {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: var(--space-5);
  box-shadow: var(--shadow-card);
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}
.card:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
  box-shadow: var(--shadow-lift);
}
@media (prefers-reduced-motion: reduce) {
  .card { transition: none; }
  .card:hover { transform: none; }
}

.card__logo {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-sm);
  object-fit: contain;
}
.card__body > * + * { margin-top: var(--space-2); }
.card__body p {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.55;
}
.card__link {
  display: inline-block;
  margin-top: var(--space-3);
  font-size: 13px;
  font-weight: 500;
}
```

- [ ] **Step 3: Verify**

Reload. Expected:
- "OPEN SOURCE" eyebrow + "Tools we build in the open." H2.
- Two white cards side-by-side, each with logo, project name, tagline, green "View on GitHub →" link.
- Hovering a card lifts it 2px and turns the border green.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: open-source section with wafer.run and solobase cards"
```

---

## Task 7: Footer

**Files:**
- Modify: `index.html` (replace `<footer>` placeholder)
- Modify: `styles.css` (append footer styles)

- [ ] **Step 1: Replace `<footer>` contents**

```html
<footer class="site-footer" id="contact">
  <div class="wrap site-footer__inner">
    <div class="site-footer__brand">
      <img src="suppers_logo.png" alt="" width="24" height="24" class="site-footer__mark" loading="lazy">
      <span>© Suppers Software · Utrecht</span>
    </div>
    <ul class="site-footer__links" aria-label="Social profiles">
      <li><a rel="me" href="https://github.com/suppers-ai">GitHub</a></li>
      <li aria-hidden="true">·</li>
      <li><a rel="me" href="https://x.com/suppers_ai">X</a></li>
      <li aria-hidden="true">·</li>
      <li><a rel="me" href="https://www.linkedin.com/in/joris-suppers">LinkedIn</a></li>
    </ul>
  </div>
</footer>
```

- [ ] **Step 2: Append footer styles to `styles.css`**

```css
/* ============  Footer  ============ */
.site-footer {
  background: var(--ink);
  color: var(--bg);
  padding: var(--space-7) 0;
  margin-top: var(--space-8);
  font-size: 13px;
}
.site-footer__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-5);
  flex-wrap: wrap;
}
.site-footer__brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--bg);
  opacity: 0.9;
}
.site-footer__mark {
  filter: invert(1) brightness(1.1);
  border-radius: 4px;
}
.site-footer__links {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  list-style: none;
  margin: 0;
  padding: 0;
}
.site-footer__links a {
  color: var(--bg);
  opacity: 0.85;
}
.site-footer__links a:hover {
  opacity: 1;
  text-decoration: underline;
}
.site-footer__links li[aria-hidden="true"] { opacity: 0.4; }
```

- [ ] **Step 3: Verify**

Reload. Expected:
- Dark forest footer with cream text.
- Left: small logo (inverted so it reads on dark) + "© Suppers Software · Utrecht".
- Right: GitHub · X · LinkedIn separated by middots, underlined on hover.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: dark footer with socials and copyright"
```

---

## Task 8: Responsive styles (mobile breakpoint 720px)

**Files:**
- Modify: `styles.css` (append media query block at end)

- [ ] **Step 1: Append responsive block to `styles.css`**

```css
/* ============  Responsive  ============ */
@media (max-width: 720px) {
  .site-header__inner { padding: var(--space-3) var(--space-4); }
  .nav { gap: var(--space-4); font-size: 13px; }

  .hero { padding: var(--space-8) 0 var(--space-7); }
  .hero h1 { font-size: 36px; }

  .about { padding: var(--space-7) 0; }
  .about__inner {
    grid-template-columns: 1fr;
    gap: var(--space-5);
    justify-items: start;
  }
  .about__avatar { width: 96px; height: 96px; }

  .work { padding: var(--space-7) 0; }
  .cards { grid-template-columns: 1fr; }

  .site-footer__inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
```

- [ ] **Step 2: Verify at 720px and below**

In the browser, open devtools, toggle device toolbar, pick iPhone SE (375px) and iPad (768px).
Expected at 375px:
- Header nav links fit (smaller gap, smaller font).
- Hero headline shrinks to 36px.
- About avatar drops above the bio text; avatar shrinks to 96px.
- Project cards stack to a single column.
- Footer brand and links stack vertically.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "style: responsive rules for <=720px"
```

---

## Task 9: Favicon SVG

**Files:**
- Create: `favicon.svg`

- [ ] **Step 1: Create minimal monogram favicon**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#14241c"/>
  <path d="M41.2 22.6c-1.9-2.6-5-4-8.7-4-5.8 0-9.6 3-9.6 7.5 0 4.3 3.1 6.3 8.6 7.5l2.4.5c3.6.8 4.8 1.7 4.8 3.3 0 2-1.9 3.2-5 3.2-3.4 0-5.6-1.2-7.1-3.6l-3.9 2.8c2 3.4 5.9 5.3 10.9 5.3 6.4 0 10.5-3.1 10.5-7.9 0-4.3-3-6.3-8.9-7.6l-2.4-.5c-3.1-.7-4.4-1.5-4.4-3 0-1.8 1.7-2.9 4.4-2.9 2.5 0 4.3.9 5.6 2.7z" fill="#efebe2"/>
</svg>
```

- [ ] **Step 2: Verify the favicon shows**

Reload the page. Expected: the browser tab shows a dark green square with a cream "S" monogram.

- [ ] **Step 3: Commit**

```bash
git add favicon.svg
git commit -m "assets: monogram favicon"
```

---

## Task 10: CNAME, DEPLOY.md, and README

**Files:**
- Create: `CNAME`
- Create: `DEPLOY.md`
- Modify: `README.md`

- [ ] **Step 1: Create `CNAME` — a single line, no trailing whitespace or newline beyond one**

```
suppers.ai
```

- [ ] **Step 2: Create `DEPLOY.md`**

````markdown
# Deployment — suppers.ai

Static site served by GitHub Pages from `github.com/suppers-ai/site` at the custom domain `suppers.ai`.

## One-time setup

1. Push `main` to `origin` (`https://github.com/suppers-ai/site`).
2. In the repo's **Settings → Pages**:
   - Source: *Deploy from a branch*
   - Branch: `main` / `(root)`
3. The presence of `CNAME` at the repo root tells Pages to serve the site at the custom domain.
4. At the `suppers.ai` DNS registrar:
   - Apex **A** records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **AAAA** records → `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - Optional **CNAME** `www` → `suppers-ai.github.io`
5. Wait a few minutes for GitHub to provision the Let's Encrypt certificate (visible under Settings → Pages).
6. Enable **Enforce HTTPS**.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Updating content

Edit `index.html`, `styles.css`, or the images in place. Pages redeploys automatically on push.
````

- [ ] **Step 3: Replace `README.md` contents**

```markdown
# suppers.ai

The public site for **Suppers Software** — the independent studio of [Joris Suppers](https://www.linkedin.com/in/joris-suppers). Hosted on GitHub Pages at [suppers.ai](https://suppers.ai).

Zero-JS static HTML + CSS. Preview locally:

```bash
python3 -m http.server 8000
```

See `DEPLOY.md` for deployment details.
```

- [ ] **Step 4: Verify the files**

- `cat CNAME` prints exactly `suppers.ai` and nothing else.
- Open `DEPLOY.md` and `README.md` in a preview to check rendering.

- [ ] **Step 5: Commit**

```bash
git add CNAME DEPLOY.md README.md
git commit -m "docs: CNAME, deploy notes, and README"
```

---

## Task 11: Playwright smoke test

**Files:**
- Create: `tests/smoke.spec.ts`
- Create: `package.json`
- Create: `playwright.config.ts`
- Modify: `.gitignore` (add `node_modules/`, `test-results/`, `playwright-report/`)

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "suppers-site-tests",
  "private": true,
  "scripts": {
    "test": "playwright test"
  },
  "devDependencies": {
    "@playwright/test": "^1.48.0"
  }
}
```

- [ ] **Step 2: Create `playwright.config.ts`**

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:8000',
  },
  webServer: {
    command: 'python3 -m http.server 8000',
    url: 'http://localhost:8000',
    reuseExistingServer: true,
    timeout: 10_000,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile',  use: { ...devices['iPhone 13'] } },
  ],
});
```

- [ ] **Step 3: Create `tests/smoke.spec.ts`**

```ts
import { expect, test } from '@playwright/test';

test('page has correct title and description', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Suppers Software/);
  const desc = await page.locator('meta[name="description"]').getAttribute('content');
  expect(desc).toContain('Suppers Software');
});

test('hero shows headline and socials', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Software that scales');
  await expect(page.getByRole('link', { name: 'GitHub' }).first()).toHaveAttribute('href', 'https://github.com/suppers-ai');
  await expect(page.getByRole('link', { name: 'X' }).first()).toHaveAttribute('href', 'https://x.com/suppers_ai');
  await expect(page.getByRole('link', { name: 'LinkedIn' }).first()).toHaveAttribute('href', 'https://www.linkedin.com/in/joris-suppers');
});

test('about links to Campertunity', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Campertunity' })).toHaveAttribute('href', 'https://campertunity.com');
});

test('open-source section shows both project cards', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'wafer.run' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'solobase' })).toBeVisible();
  await expect(page.getByRole('link', { name: /View on GitHub/ })).toHaveCount(2);
});

test('takes full-page screenshot (desktop + mobile)', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await testInfo.attach('full-page', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
});
```

- [ ] **Step 4: Update `.gitignore`**

Append these lines to `.gitignore`:

```
node_modules/
test-results/
playwright-report/
```

- [ ] **Step 5: Install and run the tests**

```bash
npm install
npx playwright install chromium webkit
npm test
```

Expected: all four functional tests pass on both desktop and mobile projects. The screenshot test attaches PNGs to the report. Open `npx playwright show-report` to inspect the rendered page.

- [ ] **Step 6: Commit**

```bash
git add package.json playwright.config.ts tests/smoke.spec.ts .gitignore
git commit -m "test: Playwright smoke tests for structure and copy"
```

---

## Task 12: Final manual QA and Lighthouse audit

**Files:** none (verification only).

- [ ] **Step 1: Keyboard navigation**

Load the site, press Tab repeatedly from the top. Expected: focus ring (green outline) visibly cycles through header brand → nav links → hero social pills → About Campertunity link → card GitHub links → footer links. Every link is reachable.

- [ ] **Step 2: Reduced-motion check**

In devtools → Rendering → emulate CSS `prefers-reduced-motion: reduce`. Hover a project card. Expected: no lift animation, no scroll-behavior smoothing.

- [ ] **Step 3: Run Lighthouse (Chrome DevTools → Lighthouse tab)**

Choose Performance, Accessibility, Best Practices, SEO. Run against the local dev server.
Expected scores: 100 / 100 / 100 / 100. If any score is below 95, investigate and fix (most likely culprit is missing `alt`/`meta` or CLS from an unsized image).

- [ ] **Step 4: Cross-browser spot check**

Open the site in Firefox and Safari (or WebKit via Playwright's browsers). Expected: layout identical; `backdrop-filter` falls back gracefully in older browsers (still readable).

- [ ] **Step 5: HTML validation (optional)**

```bash
npx --yes html-validate index.html
```


Expected: no errors.

- [ ] **Step 6: Commit any fixes, tag v1**

If fixes were needed, commit each fix separately. Then:

```bash
git tag v1.0
```

---

## Appendix: Section order reference

Final DOM inside `<main>`:

```
<header class="site-header"> ... </header>
<main>
  <section class="hero" id="top"> ... </section>
  <section class="about" id="about"> ... </section>
  <section class="work" id="open-source"> ... </section>
</main>
<footer class="site-footer" id="contact"> ... </footer>
```
