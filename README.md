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
├── python-programming/              Learning archive: standalone Python
│   │                                exercises, organised by topic (games,
│   │                                calculators, management systems,
│   │                                validators, data science/ML)
│   └── README.md
│
├── web-development/                 Learning archive: HTML/CSS/JS course
│   │                                work and mini-apps (CodeJIKA,
│   │                                FreeCodeCamp, practice files, an
│   │                                early portfolio, standalone tools)
│   └── README.md
│
├── project-1-portfolio-website/    Experiment: 5-way comparison, one portfolio brief
│   ├── portfolio-website-variant-1/
│   ├── portfolio-website-variant-2/
│   ├── portfolio-website-variant-3/
│   ├── portfolio-website-variant-4/
│   └── portfolio-website-variant-5/
│
├── project-2-todo-app/             Experiment: 5-way comparison, one to-do app brief
│   ├── todo-app-project-variant-1/
│   ├── todo-app-project-variant-2/
│   ├── todo-app-project-variant-3.html   (single-file build, no folder)
│   ├── todo-app-project-variant-4/
│   └── todo-app-project-variant-5/
│
├── project-3-weather-app/          Experiment: 5-way comparison, one weather app brief
│   ├── weather-app-variant-1/
│   ├── weather-app-variant-2/
│   ├── weather-app-variant-3.html        (single-file build, no folder)
│   ├── weather-app-variant-4/
│   └── weather-app-variant-5/
│
└── project-4-ecommerce-website/    Experiment: 5-way comparison, one full-stack
    │                                ecommerce brief (React + Node + MongoDB),
    │                                plus a 6th, hand-built entry that actually
    │                                runs on Pages
    ├── ecommerce-website-variant-1/
    ├── ecommerce-website-variant-2/
    ├── ecommerce-website-variant-3/
    ├── ecommerce-website-variant-4/
    ├── ecommerce-website-variant-5/
    └── ecommerce-live-demo/         Static, client-only demo — no backend needed
```

More experiment folders will be added here as new briefs are run — this
repo is actively growing.

`python-programming/` and `web-development/` are a different kind of
folder again: not shipped builds and not side-by-side experiments, but
the running **learning archive** behind them — every standalone exercise,
course project and mini-app, kept and organised rather than discarded.
Each has its own README indexing every file:
[`python-programming/README.md`](./python-programming/README.md) and
[`web-development/README.md`](./web-development/README.md).

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
  progress" card that links out to its folder on GitHub. It has its own
  [README](./AI-Agent-Bootcamp/README.md) that documents every task
  (`Project-00` through `Project-06`) individually, with a direct link to
  every script.
- `project-1-portfolio-website/`, `project-2-todo-app/` and
  `project-3-weather-app/` are self-directed experiments: the same brief
  attempted five separate times as an independent comparison, kept as
  comparisons rather than polished builds. Each is referenced from the
  Projects page as an "Experiment" card with an expandable list linking to
  every individual variant.
- `project-4-ecommerce-website/` is the same idea, but the brief asked for a
  **full-stack** app (React + Node + MongoDB), which is where "just open
  `index.html`" stops working — none of the five variants can run
  on static GitHub Pages hosting. That folder has its own
  [README](./project-4-ecommerce-website/README.md) explaining why, plus a
  sixth entry, `ecommerce-live-demo/`, that's a fully static, client-only
  rebuild of the same catalog/cart/checkout flow so there's still something
  to click "Open build" on. **This is the one to look at first if you just
  want to see the ecommerce work live: [`project-4-ecommerce-website/ecommerce-live-demo/`](./project-4-ecommerce-website/ecommerce-live-demo/index.html).**

More projects are currently being built and will be added to this log —
both as `project-N-*` experiments and as new standalone builds — as they
ship.

## Full project & task index

Every build, every variant, every bootcamp task, and every learning-archive
file, linked directly — this is the "everything, referenced" version of
the tree above.

### Shipped builds

| Build | Live page | Source / README |
|---|---|---|
| Build-001 — Safe Calculator | [Open](./safe-calculator/index.html) | [README](./safe-calculator/README.md) |
| Build-002 — Magical Code Validator (smart form validator) | [Open](./smart-form-validator/index.html) | [README](./smart-form-validator/README.md) |
| Build-003 — Student Report Card | [Open](./student-report-card/index.html) | [README](./student-report-card/README.md) |

### Build-004 — AI Agent Bootcamp (in progress)

Python-only, not a browser page — see the
[bootcamp README](./AI-Agent-Bootcamp/README.md) for the full write-up.
Every task:

- [Project-00 — Python fundamentals](./AI-Agent-Bootcamp/Project-00) (7 warm-up scripts)
- [Project-01 — Student assistant](./AI-Agent-Bootcamp/Project-01/student_assistant.py)
- [Project-02 — First AI chat](./AI-Agent-Bootcamp/Project-02/ai_chat.py)
- [Project-03 — Chat loop + memory](./AI-Agent-Bootcamp/Project-03)
- [Project-04 — A calculator tool](./AI-Agent-Bootcamp/Project-04)
- [Project-05 — Deciding when to use the tool](./AI-Agent-Bootcamp/Project-05)
- [Project-06 — LLM-driven decisions](./AI-Agent-Bootcamp/Project-06)

### Experiment 1 — Portfolio Website: 5 Ways

Same brief, five independent builds. [Folder on GitHub](https://github.com/babatundeawo/personal-projects/tree/main/project-1-portfolio-website)

| Variant | Live page | README |
|---|---|---|
| 1 | [Open](./project-1-portfolio-website/portfolio-website-variant-1/index.html) | [README](./project-1-portfolio-website/portfolio-website-variant-1/README.md) |
| 2 | [Open](./project-1-portfolio-website/portfolio-website-variant-2/index.html) | [README](./project-1-portfolio-website/portfolio-website-variant-2/README.md) |
| 3 | [Open](./project-1-portfolio-website/portfolio-website-variant-3/index.html) | [README](./project-1-portfolio-website/portfolio-website-variant-3/README.md) |
| 4 | [Open](./project-1-portfolio-website/portfolio-website-variant-4/index.html) | [README](./project-1-portfolio-website/portfolio-website-variant-4/README.md) |
| 5 | [Open](./project-1-portfolio-website/portfolio-website-variant-5/index.html) | [README](./project-1-portfolio-website/portfolio-website-variant-5/README.md) |

### Experiment 2 — To Do App: 5 Ways

Same brief, five independent builds. [Folder on GitHub](https://github.com/babatundeawo/personal-projects/tree/main/project-2-todo-app)

| Variant | Live page | README |
|---|---|---|
| 1 | [Open](./project-2-todo-app/todo-app-project-variant-1/index.html) | [README](./project-2-todo-app/todo-app-project-variant-1/README.md) |
| 2 | [Open](./project-2-todo-app/todo-app-project-variant-2/index.html) | [README](./project-2-todo-app/todo-app-project-variant-2/README.md) |
| 3 | [Open](./project-2-todo-app/todo-app-project-variant-3.html) | *single-file build, no folder/README* |
| 4 | [Open](./project-2-todo-app/todo-app-project-variant-4/index.html) | [README](./project-2-todo-app/todo-app-project-variant-4/README.md) |
| 5 | [Open](./project-2-todo-app/todo-app-project-variant-5/index.html) | [README](./project-2-todo-app/todo-app-project-variant-5/README.md) |

### Experiment 3 — Weather App: 5 Ways

Same brief, five independent builds. [Folder on GitHub](https://github.com/babatundeawo/personal-projects/tree/main/project-3-weather-app)

| Variant | Live page | README |
|---|---|---|
| 1 | [Open](./project-3-weather-app/weather-app-variant-1/index.html) | [README](./project-3-weather-app/weather-app-variant-1/README.md) |
| 2 | [Open](./project-3-weather-app/weather-app-variant-2/index.html) | [README](./project-3-weather-app/weather-app-variant-2/README.md) |
| 3 | [Open](./project-3-weather-app/weather-app-variant-3.html) | *single-file build, no folder/README* |
| 4 | [Open](./project-3-weather-app/weather-app-variant-4/index.html) | [README](./project-3-weather-app/weather-app-variant-4/README.md) |
| 5 | [Open](./project-3-weather-app/weather-app-variant-5/index.html) | [README](./project-3-weather-app/weather-app-variant-5/README.md) |

### Experiment 4 — Ecommerce Website: 5 Ways + live demo

Full-stack (React + Node + MongoDB), so these don't run on GitHub Pages —
start with the [project README](./project-4-ecommerce-website/README.md), which
explains why and how to run each one locally.

| Variant | Stack | README |
|---|---|---|
| Live demo (static, no setup) | Vanilla HTML/CSS/JS | [Open](./project-4-ecommerce-website/ecommerce-live-demo/index.html) · [README](./project-4-ecommerce-website/ecommerce-live-demo/README.md) |
| 1 | React + Vite / Express (in-memory) | [README](./project-4-ecommerce-website/ecommerce-website-variant-1/README.md) |
| 2 | Static HTML+JS / Express + MongoDB | [README](./project-4-ecommerce-website/ecommerce-website-variant-2/README.md) |
| 3 | React (CRA-style) / Express + MongoDB | [README](./project-4-ecommerce-website/ecommerce-website-variant-3/README.md) |
| 4 | React + Vite (mock data) / Express skeleton | [README](./project-4-ecommerce-website/ecommerce-website-variant-4/README.md) |
| 5 | React + Vite / Express + MongoDB + JWT + admin | [README](./project-4-ecommerce-website/ecommerce-website-variant-5/README.md) |

### Learning archives

Not shipped builds or experiments — the full set of standalone exercises
kept and organised rather than discarded. Every file is indexed
individually in each folder's own README.

- **[`python-programming/`](./python-programming/README.md)** — standalone
  Python exercises, organised by topic:
  [games](./python-programming/README.md#games),
  [calculators & converters](./python-programming/README.md#calculators-and-converters),
  [management systems](./python-programming/README.md#management-systems),
  [validators & utilities](./python-programming/README.md#validators-and-utilities),
  [data science & ML](./python-programming/README.md#data-science-and-ml),
  [misc & drafts](./python-programming/README.md#misc-and-drafts).
- **[`web-development/`](./web-development/README.md)** — HTML/CSS/JS
  course work and mini-apps:
  [mini-apps](./web-development/README.md#mini-apps),
  [CodeJIKA](./web-development/README.md#codejika),
  [FreeCodeCamp](./web-development/README.md#freecodecamp),
  [HTML/CSS practice files](./web-development/README.md#html-css-practice-files),
  [an early Portfolio page](./web-development/README.md#portfolio),
  [Simple Game](./web-development/README.md#simple-game).
