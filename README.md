# Babatunde Awoyemi: Build Log

A personal coding workspace, presented as a small multi-page portfolio
site. Every project is a standalone, fully working page: its own HTML,
its own CSS, its own JS, tied together by a shared top navigation bar and
a common home page.

**No build step, no framework.** Everything here is vanilla HTML, CSS and
JavaScript, so it runs by opening a file in a browser or serving the
folder with any static file server (GitHub Pages works out of the box).

## Live structure

```
personal-projects/
├── index.html                     # Home
├── projects.html                  # Projects, searchable/filterable build list
├── about.html                     # About, skills, timeline, values
├── contact.html                   # Contact form + contact methods + FAQ
├── assets/
│   ├── css/
│   │   ├── base.css               # Shared tokens, reset, typography, buttons, footer
│   │   ├── portfolio-nav.css      # Shared top bar (incl. mobile menu), every page
│   │   ├── home.css               # Home-only styling (hero, terminal, process)
│   │   ├── projects.css           # Projects-only styling (filter bar, grid)
│   │   ├── about.css               # About-only styling (bio, skills, timeline)
│   │   └── contact.css            # Contact-only styling (form, sidebar, FAQ)
│   └── js/
│       ├── portfolio-nav.js       # Shared theme toggle + mobile menu, every page
│       ├── animations.js          # Shared reveal/count-up/canvas/back-to-top, every page
│       ├── home.js                # Home-only terminal typing effect
│       ├── projects.js            # Projects-only search + tag filtering
│       └── contact.js             # Contact-only validation + mailto handoff
│
├── safe-calculator/                Build-001, a calculator that never crashes
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── smart-form-validator/           Build-002, gamified, accessible form validation
│   ├── index.html
│   └── src/
│       ├── main.js
│       ├── modules/                 (validators.js, ui.js, sandbox.js)
│       └── styles/main.css
│
├── student-report-card/            Build-003, student records dashboard
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── AI-Agent-Bootcamp/               In progress, kept untouched, see below
│
├── project-1-portfolio-website/    Experiment: 5 AI models, one portfolio brief
│   ├── portfolio-website-chatgpt/
│   ├── portfolio-website-claude/
│   ├── portfolio-website-deepseek/
│   ├── portfolio-website-gemini/
│   └── portfolio-website-grok/
│
├── project-2-todo-app/             Experiment: 5 AI models, one to-do app brief
│   ├── todo-app-project-chatgpt/
│   ├── todo-app-project-claude/
│   ├── todo-app-project-deepseek.html   (single-file build, no folder)
│   ├── todo-app-project-gemini/
│   └── todo-app-project-grok/
│
└── project-3-weather-app/          Experiment: 5 AI models, one weather app brief
    ├── weather-app-chatgpt/
    ├── weather-app-claude/
    ├── weather-app-deepseek.html        (single-file build, no folder)
    ├── weather-app-gemini/
    └── weather-app-grok/
```

More experiment folders will be added here as new briefs are run — this
repo is actively growing.

## How the pages fit together

- The hub is a genuine **four-page site**: Home (`index.html`), Projects
  (`projects.html`), About (`about.html`) and Contact (`contact.html`),
  each with its own page-specific CSS and JS file rather than one long
  scrolling page. Shared styling and behaviour (design tokens, the top
  bar, scroll-reveal animations, the ambient canvas background) live in
  `base.css`, `portfolio-nav.css` and `animations.js`, loaded on every
  hub page.
- Every project page (and every hub page) includes the same **shared top
  bar** (`assets/css/portfolio-nav.css` + `assets/js/portfolio-nav.js`),
  which collapses into a mobile menu on small screens, so you can always
  jump back to the hub, and light/dark mode preference is remembered
  across the whole site via `localStorage`.
- Beyond that shared top bar, **each project keeps its own visual
  identity** and its own separated CSS/JS files. They were each designed
  for their own subject matter and didn't need to be forced into one
  template.

## Deploying

This is a static site, so it can be published as-is:

1. Push to GitHub.
2. In the repo settings, enable **GitHub Pages** → deploy from the `main`
   branch, root folder.
3. The hub page (`index.html`) becomes the site's home page automatically.

## A note on `AI-Agent-Bootcamp/` and the `project-N-*` experiment folders

These folders are separate, actively-developing projects and sit outside
the three stable, shipped builds.

- `AI-Agent-Bootcamp/` is referenced from the Projects page as an "in
  progress" card that links out to its folder on GitHub.
- `project-1-portfolio-website/`, `project-2-todo-app/` and
  `project-3-weather-app/` are self-directed experiments: the same brief
  given to five different AI models each time (ChatGPT, Claude, DeepSeek,
  Gemini, Grok), kept as comparisons rather than polished builds. Each is
  referenced from the Projects page as an "Experiment" card with an
  expandable list linking to every individual variant.

More projects are currently being built and will be added to this log —
both as `project-N-*` experiments and as new standalone builds — as they
ship.

## Individual project docs

- [`safe-calculator/README.md`](./safe-calculator/README.md)
- [`smart-form-validator/README.md`](./smart-form-validator/README.md)
- [`student-report-card/README.md`](./student-report-card/README.md)
