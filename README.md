# Babatunde Awoyemi — Build Log

A personal coding workspace, presented as a small multi-page portfolio
site. Every project is a standalone, fully working page — its own HTML,
its own CSS, its own JS — tied together by a shared top navigation bar and
a common home page.

**No build step, no framework.** Everything here is vanilla HTML, CSS and
JavaScript, so it runs by opening a file in a browser or serving the
folder with any static file server (GitHub Pages works out of the box).

## Live structure

```
personal-projects/
├── index.html                     # Portfolio hub — links to every build
├── assets/
│   ├── css/
│   │   ├── main.css               # Hub page styling (design tokens, hero, cards)
│   │   └── portfolio-nav.css      # Shared top bar, used on every page
│   └── js/
│       ├── main.js                # Hub page interactivity
│       └── portfolio-nav.js       # Shared theme toggle, used on every page
│
├── safe-calculator/                Build-001 — a calculator that never crashes
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── smart-form-validator/           Build-002 — gamified, accessible form validation
│   ├── index.html
│   └── src/
│       ├── main.js
│       ├── modules/                 (validators.js, ui.js, sandbox.js)
│       └── styles/main.css
│
├── student-report-card/            Build-003 — student records dashboard
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── AI-Agent-Bootcamp/               In progress — kept untouched, see below
```

## How the pages fit together

- **`index.html`** at the repo root is the portfolio hub: a hero section,
  a grid of project cards linking to each build, and a short "about" note.
- Every project page includes the same **shared top bar**
  (`assets/css/portfolio-nav.css` + `assets/js/portfolio-nav.js`) so you
  can always jump back to the hub, and light/dark mode preference is
  remembered across the whole site via `localStorage`.
- Beyond that shared top bar, **each project keeps its own visual
  identity** and its own separated CSS/JS files — they were each designed
  for their own subject matter and didn't need to be forced into one
  template.

## Deploying

This is a static site, so it can be published as-is:

1. Push to GitHub.
2. In the repo settings, enable **GitHub Pages** → deploy from the `main`
   branch, root folder.
3. The hub page (`index.html`) becomes the site's home page automatically.

## A note on `AI-Agent-Bootcamp/`

That folder is a separate, actively-developing project and was **left
untouched** by this redesign — none of its Python files or structure were
modified. It's referenced from the hub page as an "in progress" card that
links out to its folder on GitHub, but it isn't part of the web build log
itself.

## Individual project docs

- [`safe-calculator/README.md`](./safe-calculator/README.md)
- [`smart-form-validator/README.md`](./smart-form-validator/README.md)
- [`student-report-card/README.md`](./student-report-card/README.md)
