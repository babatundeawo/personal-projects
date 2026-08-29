# Babatunde Awoyemi: Build Log

A personal coding workspace, presented as a small multi-page portfolio
site. Every project is a standalone, fully working page: its own HTML,
its own CSS, its own JS, tied together by a shared top navigation bar and
a common home page.

**No build step, no framework.** Everything here is vanilla HTML, CSS and
JavaScript, so it runs by opening a file in a browser or serving the
folder with any static file server (GitHub Pages works out of the box).

## The five kinds of folder in this repo

Everything below the site shell sorts into exactly one of five
top-level categories. This is the whole filing system — when something
new gets added, it goes in whichever of these five it matches, nothing
more to decide:

| Folder | What lives here | When something new goes here |
|---|---|---|
| [`builds/`](#builds) | Finished, polished, single-purpose projects | A project is done, stable, and worth showing off on its own |
| [`experiments/`](#experiments) | The same brief attempted several times, kept as a comparison | Trying one idea multiple independent ways on purpose |
| [`in-progress/`](#in-progress) | Actively-developing, multi-part work that isn't shippable yet | A body of work with its own internal task numbering, still growing |
| [`learning-archive/`](#learning-archive) | Standalone practice exercises and course work, kept rather than discarded | A one-off script or exercise that isn't a "project" on its own |
| *(site shell — repo root)* | `index.html`, `projects.html`, `about.html`, `contact.html`, `assets/` | Only changes when the hub site itself changes |

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
│   │   ├── about.css              # About-only styling (bio, skills, timeline)
│   │   └── contact.css            # Contact-only styling (form, sidebar, FAQ)
│   └── js/
│       ├── portfolio-nav.js       # Shared theme toggle + mobile menu, every page
│       ├── animations.js          # Shared reveal/count-up/canvas/back-to-top, every page
│       ├── home.js                # Home-only terminal typing effect
│       ├── projects.js            # Projects-only search + tag filtering
│       └── contact.js             # Contact-only validation + mailto handoff
│
├── builds/                        Finished, polished, single-purpose projects
│   ├── safe-calculator/           Build-001, a calculator that never crashes
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   ├── smart-form-validator/      Build-002, gamified, accessible form validation
│   │   ├── index.html
│   │   └── src/
│   │       ├── main.js
│   │       ├── modules/            (validators.js, ui.js, sandbox.js)
│   │       └── styles/main.css
│   └── student-report-card/       Build-003, student records dashboard
│       ├── index.html
│       ├── style.css
│       └── script.js
│
├── experiments/                   Same brief, several independent builds, kept side by side
│   ├── portfolio-website/         5-way comparison, one portfolio brief
│   │   ├── variant-1/ … variant-5/
│   ├── todo-app/                  5-way comparison, one to-do app brief
│   │   ├── variant-1/, variant-2/, variant-3.html (single file), variant-4/, variant-5/
│   ├── weather-app/                5-way comparison, one weather app brief
│   │   ├── variant-1/, variant-2/, variant-3.html (single file), variant-4/, variant-5/
│   └── ecommerce-website/          5-way full-stack comparison + a 6th static demo
│       ├── variant-1/ … variant-5/  (React + Node + MongoDB, don't run on Pages)
│       └── live-demo/               Static, client-only rebuild — this one runs on Pages
│
├── in-progress/                   Actively-developing, multi-part work
│   └── ai-agent-bootcamp/         Build-004, Python exercises → a working AI agent
│       ├── Project-00/ … Project-06/
│       └── README.md              Indexes every task
│
└── learning-archive/              Standalone practice exercises, kept and organised
    ├── python-programming/        Python exercises by topic (games, calculators,
    │   │                          management systems, validators, data science/ML)
    │   └── README.md              Indexes every script
    └── web-development/           HTML/CSS/JS course work and mini-apps (CodeJIKA,
        │                          FreeCodeCamp, practice files, an early portfolio,
        │                          standalone tools)
        └── README.md              Indexes every file
```

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
- The site shell (`index.html`, `projects.html`, `about.html`,
  `contact.html`, `assets/`) must stay at the repository root — GitHub
  Pages serves `index.html` from the root (or `/docs`), so this is the
  one thing in the tree above that doesn't move.

## Deploying

This is a static site, so it can be published as-is:

1. Push to GitHub.
2. In the repo settings, enable **GitHub Pages** → deploy from the `main`
   branch, root folder.
3. The hub page (`index.html`) becomes the site's home page automatically.

## `builds/`

Three finished, polished, single-purpose projects — each referenced from
the Projects page as a stable "BUILD-00N" card with an "Open build" link.

| Build | Live page | README |
|---|---|---|
| Build-001 — Safe Calculator | [Open](./builds/safe-calculator/index.html) | [README](./builds/safe-calculator/README.md) |
| Build-002 — Magical Code Validator (smart form validator) | [Open](./builds/smart-form-validator/index.html) | [README](./builds/smart-form-validator/README.md) |
| Build-003 — Student Report Card | [Open](./builds/student-report-card/index.html) | [README](./builds/student-report-card/README.md) |

**Adding a new build:** create `builds/<name>/`, give it its own
`index.html` + assets + `README.md`, then add one card to `projects.html`
and one row to the table above.

## `experiments/`

The same brief attempted five separate times as an independent
comparison, kept as comparisons rather than folded into one polished
build. Each is referenced from the Projects page as an "Experiment"
card with an expandable list linking to every variant.

### Portfolio Website: 5 Ways

[Folder on GitHub](https://github.com/babatundeawo/personal-projects/tree/main/experiments/portfolio-website)

| Variant | Live page | README |
|---|---|---|
| 1 | [Open](./experiments/portfolio-website/variant-1/index.html) | [README](./experiments/portfolio-website/variant-1/README.md) |
| 2 | [Open](./experiments/portfolio-website/variant-2/index.html) | [README](./experiments/portfolio-website/variant-2/README.md) |
| 3 | [Open](./experiments/portfolio-website/variant-3/index.html) | [README](./experiments/portfolio-website/variant-3/README.md) |
| 4 | [Open](./experiments/portfolio-website/variant-4/index.html) | [README](./experiments/portfolio-website/variant-4/README.md) |
| 5 | [Open](./experiments/portfolio-website/variant-5/index.html) | [README](./experiments/portfolio-website/variant-5/README.md) |

### To Do App: 5 Ways

[Folder on GitHub](https://github.com/babatundeawo/personal-projects/tree/main/experiments/todo-app)

| Variant | Live page | README |
|---|---|---|
| 1 | [Open](./experiments/todo-app/variant-1/index.html) | [README](./experiments/todo-app/variant-1/README.md) |
| 2 | [Open](./experiments/todo-app/variant-2/index.html) | [README](./experiments/todo-app/variant-2/README.md) |
| 3 | [Open](./experiments/todo-app/variant-3.html) | *single-file build, no folder/README* |
| 4 | [Open](./experiments/todo-app/variant-4/index.html) | [README](./experiments/todo-app/variant-4/README.md) |
| 5 | [Open](./experiments/todo-app/variant-5/index.html) | [README](./experiments/todo-app/variant-5/README.md) |

### Weather App: 5 Ways

[Folder on GitHub](https://github.com/babatundeawo/personal-projects/tree/main/experiments/weather-app)

| Variant | Live page | README |
|---|---|---|
| 1 | [Open](./experiments/weather-app/variant-1/index.html) | [README](./experiments/weather-app/variant-1/README.md) |
| 2 | [Open](./experiments/weather-app/variant-2/index.html) | [README](./experiments/weather-app/variant-2/README.md) |
| 3 | [Open](./experiments/weather-app/variant-3.html) | *single-file build, no folder/README* |
| 4 | [Open](./experiments/weather-app/variant-4/index.html) | [README](./experiments/weather-app/variant-4/README.md) |
| 5 | [Open](./experiments/weather-app/variant-5/index.html) | [README](./experiments/weather-app/variant-5/README.md) |

### Ecommerce Website: 5 Ways + live demo

Full-stack (React + Node + MongoDB), so these don't run on GitHub Pages —
start with the [project README](./experiments/ecommerce-website/README.md), which
explains why and how to run each one locally. **This is the one to look
at first if you just want to see the ecommerce work live:
[`experiments/ecommerce-website/live-demo/`](./experiments/ecommerce-website/live-demo/index.html).**

| Variant | Stack | README |
|---|---|---|
| Live demo (static, no setup) | Vanilla HTML/CSS/JS | [Open](./experiments/ecommerce-website/live-demo/index.html) · [README](./experiments/ecommerce-website/live-demo/README.md) |
| 1 | React + Vite / Express (in-memory) | [README](./experiments/ecommerce-website/variant-1/README.md) |
| 2 | Static HTML+JS / Express + MongoDB | [README](./experiments/ecommerce-website/variant-2/README.md) |
| 3 | React (CRA-style) / Express + MongoDB | [README](./experiments/ecommerce-website/variant-3/README.md) |
| 4 | React + Vite (mock data) / Express skeleton | [README](./experiments/ecommerce-website/variant-4/README.md) |
| 5 | React + Vite / Express + MongoDB + JWT + admin | [README](./experiments/ecommerce-website/variant-5/README.md) |

**Adding a new experiment:** create `experiments/<brief-name>/`, one
`variant-N/` per attempt (or `variant-N.html` for a single-file build),
a `README.md` in the parent folder summarising the comparison, then add
one card to `projects.html` and one section here.

## `in-progress/`

Actively-developing, multi-part work that isn't a finished build yet —
referenced from the Projects page as an "IN PROGRESS" card.

- **[`ai-agent-bootcamp/`](./in-progress/ai-agent-bootcamp/README.md)** —
  Build-004. A self-paced series of Python exercises working up to a
  full AI agent: memory, tools, and reasoning loops built from first
  principles. Its own README documents every task individually:

  - [Project-00 — Python fundamentals](./in-progress/ai-agent-bootcamp/Project-00) (7 warm-up scripts)
  - [Project-01 — Student assistant](./in-progress/ai-agent-bootcamp/Project-01/student_assistant.py)
  - [Project-02 — First AI chat](./in-progress/ai-agent-bootcamp/Project-02/ai_chat.py)
  - [Project-03 — Chat loop + memory](./in-progress/ai-agent-bootcamp/Project-03)
  - [Project-04 — A calculator tool](./in-progress/ai-agent-bootcamp/Project-04)
  - [Project-05 — Deciding when to use the tool](./in-progress/ai-agent-bootcamp/Project-05)
  - [Project-06 — LLM-driven decisions](./in-progress/ai-agent-bootcamp/Project-06)

**Adding new in-progress work:** create `in-progress/<name>/` with its
own README and its own internal numbering (`Project-00`, `Task-01`,
whatever fits); it graduates into `builds/` once it's finished and
shippable.

## `learning-archive/`

Not shipped builds or experiments — the running archive of standalone
exercises, course projects and mini-apps behind them, kept and organised
rather than discarded. Every file is indexed individually in each
folder's own README.

- **[`python-programming/`](./learning-archive/python-programming/README.md)** — standalone
  Python exercises, organised by topic:
  [games](./learning-archive/python-programming/README.md#games),
  [calculators & converters](./learning-archive/python-programming/README.md#calculators-and-converters),
  [management systems](./learning-archive/python-programming/README.md#management-systems),
  [validators & utilities](./learning-archive/python-programming/README.md#validators-and-utilities),
  [data science & ML](./learning-archive/python-programming/README.md#data-science-and-ml),
  [misc & drafts](./learning-archive/python-programming/README.md#misc-and-drafts).
- **[`web-development/`](./learning-archive/web-development/README.md)** — HTML/CSS/JS
  course work and mini-apps:
  [mini-apps](./learning-archive/web-development/README.md#mini-apps),
  [CodeJIKA](./learning-archive/web-development/README.md#codejika),
  [FreeCodeCamp](./learning-archive/web-development/README.md#freecodecamp),
  [HTML/CSS practice files](./learning-archive/web-development/README.md#html-css-practice-files),
  [an early Portfolio page](./learning-archive/web-development/README.md#portfolio),
  [Simple Game](./learning-archive/web-development/README.md#simple-game).

**Adding a new archive entry:** drop the file into the matching topic
folder (or a new one, if it doesn't fit an existing topic) and add one
line to that archive's own README — no changes needed anywhere else.
