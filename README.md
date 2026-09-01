# Babatunde Awoyemi: Build Log

A personal coding workspace. 130 projects, each one a standalone folder
with its own code and its own README — no shared category folders
sitting between the repo root and the actual work.

**No build step, no framework** for the web/JS projects — vanilla HTML,
CSS and JS, so anything with an `index.html` runs by opening it in a
browser. Python projects need Python 3 (and occasionally one `pip
install` — noted in the project's own file where it applies).

## One project, one folder — nothing else to decide

Every project sits directly at the repo root as its own folder. There
are no `builds/`, `experiments/`, `in-progress/` or `learning-archive/`
wrapper folders — those were tried and dropped, because they made
adding a new project a question ("which category is this?") instead of
an action. Now it's just: **make a folder, put the project in it.**

A handful of folders contain more than one file because the project
itself is multi-part — five independent attempts at the same brief
(`portfolio-website/variant-1` … `variant-5`), a course with numbered
lessons (`CodeJIKA/`, `FreeCodeCamp/`), or a growing task series
(`ai-agent-bootcamp/Project-00` … `Project-06`). That's the project's
own internal shape, not a category imposed from outside — remove any
one of those folders and nothing else in the repo needs to change.

## Where to actually look

This README doesn't try to list all 130 projects — that list lives in
two places that are easier to keep current:

- **[`projects.html`](./projects.html)**
  — every project, one line each, search box included, each one
  linking straight to its folder on GitHub. This is the real index
  (opens live once GitHub Pages is enabled on this repo — see
  "Deploying" below — or open it locally in a browser).
- **The repo's own file listing** — since there's no nesting to dig
  through, GitHub's default folder view already shows everything.

## The site shell

Four pages live at the repo root because GitHub Pages requires
`index.html` there (or in `/docs`): `index.html` (home), `projects.html`
(the project index above), `about.html`, `contact.html`, plus
`assets/css/` and `assets/js/` for their shared and page-specific
styling and behaviour.

The site does not showcase, preview, rank or embed the projects. Home
links to a few of the standalone builds and to the full index;
`projects.html` **is** the index, and every entry on it points out to
GitHub rather than trying to reproduce the project inline.

## Deploying

Static site, so it publishes as-is:

1. Push to GitHub.
2. Repo settings → **Pages** → deploy from `main`, root folder.
3. `index.html` becomes the site's home page automatically.

## Adding a new project, at any time

1. Create a new folder at the repo root, named after the project.
2. Put the code in it, plus a README if the project needs one to make
   sense on its own.
3. Add one line to `projects.html`'s project list (name + a link to
   `https://github.com/babatundeawo/personal-projects/tree/main/<folder>`).

That's the whole process — no category to pick, no other file to
touch.

## Current folders

<details>
<summary>All 130 projects, alphabetically (click to expand)</summary>

- [`CodeJIKA/`](./CodeJIKA) — 5 numbered coursework projects
- [`FreeCodeCamp/`](./FreeCodeCamp) — 12 numbered Responsive Web Design curriculum exercises
- [`Portfolio/`](./Portfolio) — an early standalone portfolio page
- [`Simple Game/`](./Simple%20Game) — "Cosmic Color Adventure" browser game
- [`ai-agent-bootcamp/`](./ai-agent-bootcamp) — Project-00 through Project-06, Python exercises building toward a working AI agent
- [`animated-button/`](./animated-button), [`animated-button-pressed-effect/`](./animated-button-pressed-effect), [`animated-button-ripple-effect/`](./animated-button-ripple-effect) — CSS button technique demos
- [`area-of-a-rectangle/`](./area-of-a-rectangle), [`area-of-circle/`](./area-of-circle), [`area-of-parallelogram/`](./area-of-parallelogram) — geometry calculators
- [`bank-account-management/`](./bank-account-management) — `BankAccount` class exercise
- [`bookstore-inventory-management/`](./bookstore-inventory-management) — bookstore inventory exercise
- [`calendar-printer/`](./calendar-printer) — prints a month's calendar
- [`car-game/`](./car-game) — text command-loop car simulation
- [`church-attendance-app/`](./church-attendance-app) — two versions of a church attendance tracker
- [`confusion-matrix-1/`](./confusion-matrix-1), [`confusion-matrix-2/`](./confusion-matrix-2), [`confusion-matrix-3/`](./confusion-matrix-3) — confusion-matrix/precision-recall exercises
- [`contact-book/`](./contact-book), [`contact-finder/`](./contact-finder) — contact-list exercises
- [`data-cleaner-and-validator/`](./data-cleaner-and-validator) — paste-in data cleaning tool
- [`data-scaling/`](./data-scaling) — `StandardScaler` exercise with bundled CSV
- [`drawing-shapes/`](./drawing-shapes) — prints shapes from a list of counts
- [`dropdown-menu/`](./dropdown-menu) — CSS dropdown demo
- [`ecommerce-website/`](./ecommerce-website) — 5 full-stack variants + a static live demo
- [`election-page-snippet-not-runnable/`](./election-page-snippet-not-runnable) — kept for reference only, not valid Python
- [`employee-management-system/`](./employee-management-system) — employee records exercise
- [`enhanced-scientific-calculator/`](./enhanced-scientific-calculator) — `tkinter` scientific calculator
- [`enhanced-to-do-list-manager/`](./enhanced-to-do-list-manager) — file-backed to-do list
- [`even-odd-checker/`](./even-odd-checker) — even/odd check
- [`expense-tracker/`](./expense-tracker), [`expense-tracker-with-monthly-report/`](./expense-tracker-with-monthly-report) — expense-log exercises
- [`factorial-calculator/`](./factorial-calculator) — factorial via a loop
- [`file-handler/`](./file-handler) — write-then-read file I/O
- [`fitness-tracker/`](./fitness-tracker) — workout log exercise
- [`flappy-bird/`](./flappy-bird) — playable `pygame` clone
- [`grade-calculator/`](./grade-calculator), [`grade-calculator-quick-version/`](./grade-calculator-quick-version) — grade/CGPA calculators
- [`guess-the-number-game/`](./guess-the-number-game), [`number-guessing-game/`](./number-guessing-game), [`password-guessing-game/`](./password-guessing-game) — guessing games
- [`hierarchical-clustering-1/`](./hierarchical-clustering-1), [`hierarchical-clustering-2/`](./hierarchical-clustering-2) — dendrogram exercises
- [`house-price-prediction/`](./house-price-prediction) — linear regression exercise with bundled CSVs
- [`largest-number-finder/`](./largest-number-finder) — max of a list
- [`library-management-system/`](./library-management-system) — library records exercise
- [`list-sum-and-average/`](./list-sum-and-average) — sum/average from user input
- [`logistic-regression-1/`](./logistic-regression-1), [`logistic-regression-2/`](./logistic-regression-2) — logistic regression exercises
- [`movie-collection/`](./movie-collection) — movie collection exercise
- [`multiplication-tables/`](./multiplication-tables) — prints times tables
- [`music-playlist-manager/`](./music-playlist-manager) — playlist exercise
- [`mystical-word-game/`](./mystical-word-game) — riddle-based word game
- [`password-validator/`](./password-validator) — password rule checker
- [`portfolio-website/`](./portfolio-website) — 5 independent portfolio builds
- [`prime-number-checker/`](./prime-number-checker), [`prime-number-generator/`](./prime-number-generator) — prime-number exercises
- [`real-world-loan-approval-data/`](./real-world-loan-approval-data) — loan-approval logistic regression
- [`recipe-manager/`](./recipe-manager) — recipe search/manage exercise
- [`remove-duplicates/`](./remove-duplicates) — dedupe a list
- [`responsive-form/`](./responsive-form), [`responsive-image-gallery/`](./responsive-image-gallery), [`responsive-layout/`](./responsive-layout), [`responsive-website/`](./responsive-website), [`responsive-website-sample/`](./responsive-website-sample) — responsive-design demos
- [`safe-calculator/`](./safe-calculator) — calculator that never crashes
- [`save-and-read-a-to-do-list/`](./save-and-read-a-to-do-list), [`simple-to-do-list/`](./simple-to-do-list), [`to-do-list-with-deadlines/`](./to-do-list-with-deadlines) — to-do list exercises
- [`shopping-list/`](./shopping-list) — shopping list with running total
- [`simple-calculator/`](./simple-calculator) — basic four-function calculator
- [`simple-chatbot/`](./simple-chatbot) — keyword-matching chatbot
- [`simple-voting-system/`](./simple-voting-system), [`voting-system/`](./voting-system) — voting exercises
- [`smart-form-validator/`](./smart-form-validator) — gamified accessible form validation
- [`smart-weather-logger-dashboard/`](./smart-weather-logger-dashboard) — weather logging dashboard
- [`smartsave-finance-forecaster/`](./smartsave-finance-forecaster) — personal finance forecaster
- [`snake-game/`](./snake-game) — playable `pygame` clone
- [`student-gradebook/`](./student-gradebook) — student gradebook exercise
- [`student-management-system/`](./student-management-system) — student records exercise
- [`student-performance-analysis-application/`](./student-performance-analysis-application) — charted student-performance analysis
- [`student-report-card/`](./student-report-card) — student records dashboard
- [`sum-of-prices/`](./sum-of-prices) — price list totals
- [`temperature-converter/`](./temperature-converter) — Celsius/Fahrenheit conversion
- [`todo-app/`](./todo-app) — 5 independent to-do app builds
- [`treasure-hunt/`](./treasure-hunt) — number-line guessing game
- [`user-information-validator/`](./user-information-validator) — retry-until-valid input prompts
- [`volume-of-a-closed-cylinder/`](./volume-of-a-closed-cylinder) — cylinder volume calculator
- [`weather-app/`](./weather-app) — 5 independent weather app builds
- [`weather-forecast-fetcher/`](./weather-forecast-fetcher) — live OpenWeatherMap lookup
- [`weather-report/`](./weather-report) — store/retrieve weather notes

</details>
