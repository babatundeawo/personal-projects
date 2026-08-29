# Python Programming

A working archive of standalone Python exercises and small projects —
mostly single-file, `input()`-driven console programs written while
learning core language and data-science concepts.

**One project, one folder.** Every project here — even a five-line
script — lives in its own top-level folder, flat, directly under this
one. There's no topic grouping to decide between: to add a new project,
just create a new folder for it and drop the file(s) in. The headings
below are only a reading aid; they don't reflect any physical nesting.

**Requirements:** Python 3 for everything. A few files need extra
packages — noted per project below — install with `pip install <package>`.

## Games

- [`car-game/`](./car-game) — text command loop (`start`/`stop`/`gas`) simulating a simple car
- [`guess-the-number-game/`](./guess-the-number-game) — classic number-guessing game with too high/too low hints
- [`number-guessing-game/`](./number-guessing-game) — same idea, a leaner rewrite that also counts attempts
- [`password-guessing-game/`](./password-guessing-game) — guess a hidden password, get a hint after 3 misses
- [`treasure-hunt/`](./treasure-hunt) — guess a hidden position on a 1–10 line, warmer/colder feedback
- [`mystical-word-game/`](./mystical-word-game) — riddle-based word-guessing game with a random secret word
- [`flappy-bird/`](./flappy-bird) — a playable Flappy Bird clone (`FlappyBird.py`, needs `pygame`, uses the bundled sprite images)
- [`snake-game/`](./snake-game) — a playable Snake clone (`snakeGame.py`, needs `pygame`, uses the bundled background image)

## Calculators and converters

- [`simple-calculator/`](./simple-calculator) — add/subtract/multiply/divide via functions *(a byte-identical duplicate, `Simple_Calculator.py`, was removed during cleanup)*
- [`enhanced-scientific-calculator/`](./enhanced-scientific-calculator) — a `tkinter` GUI calculator with scientific functions
- [`factorial-calculator/`](./factorial-calculator) — factorial of a number via a loop
- [`temperature-converter/`](./temperature-converter) — Celsius ⇄ Fahrenheit conversion functions
- [`grade-calculator/`](./grade-calculator) — average + CGPA from a list of grades
- [`grade-calculator-quick-version/`](./grade-calculator-quick-version) — single-score → letter-grade lookup, with input validation
- [`area-of-circle/`](./area-of-circle) — area from a radius
- [`area-of-parallelogram/`](./area-of-parallelogram) — area from base × height
- [`area-of-a-rectangle/`](./area-of-a-rectangle) — area from length × width
- [`volume-of-a-closed-cylinder/`](./volume-of-a-closed-cylinder) — volume from radius and height
- [`sum-of-prices/`](./sum-of-prices) — total of a price list, two ways (manual loop vs. `sum()`)
- [`list-sum-and-average/`](./list-sum-and-average) — collects numbers from the user, prints total and average

## Management systems

Class-based, menu-driven "manage a collection of things" programs —
the bulk of the OOP practice.

- [`bank-account-management/`](./bank-account-management) — `BankAccount` class with deposits, withdrawals and a transaction list
- [`bookstore-inventory-management/`](./bookstore-inventory-management) — `Book` class + inventory operations
- [`contact-book/`](./contact-book) — add/view/remove contacts, dictionary-backed
- [`contact-finder/`](./contact-finder) — look up a name in a fixed contact list
- [`employee-management-system/`](./employee-management-system) — `Employee` class with name/position/salary records
- [`library-management-system/`](./library-management-system) — `Library` class tracking books and authors
- [`movie-collection/`](./movie-collection) — `Movie` class for a personal collection
- [`music-playlist-manager/`](./music-playlist-manager) — `Song` class + playlist operations
- [`recipe-manager/`](./recipe-manager) — add/remove/search recipes by ingredient, menu loop
- [`student-management-system/`](./student-management-system) — `Student` class with name/age/ID records
- [`student-gradebook/`](./student-gradebook) — add students, record grades, compute averages *(a byte-identical duplicate, `Grade Book.py`, was removed during cleanup)*
- [`shopping-list/`](./shopping-list) — add/remove/view items with running total cost
- [`simple-to-do-list/`](./simple-to-do-list) — basic add/remove/view task list
- [`enhanced-to-do-list-manager/`](./enhanced-to-do-list-manager) — to-do list persisted to a text file, with task removal
- [`to-do-list-with-deadlines/`](./to-do-list-with-deadlines) — `Task` class pairing each item with a parsed deadline date
- [`save-and-read-a-to-do-list/`](./save-and-read-a-to-do-list) — `ToDoList` class that reads/writes tasks to a file
- [`expense-tracker/`](./expense-tracker) — `Expense` class with name/amount/category
- [`expense-tracker-with-monthly-report/`](./expense-tracker-with-monthly-report) — file-backed expense log with a currency symbol and monthly report generation
- [`fitness-tracker/`](./fitness-tracker) — `Workout` class logging duration and calories
- [`calendar-printer/`](./calendar-printer) — prints a given month's calendar via the `calendar` module
- [`voting-system/`](./voting-system) — `election` dictionary: add candidates, cast/update votes
- [`simple-voting-system/`](./simple-voting-system) — a leaner rewrite of the same voting idea, menu-driven

## Validators and utilities

Smaller, single-purpose scripts: string/number checks, small algorithms,
and a couple of one-off tools.

- [`password-validator/`](./password-validator) — checks length, digits, and character rules
- [`user-information-validator/`](./user-information-validator) — retry-until-valid prompts for name/age/etc.
- [`prime-number-checker/`](./prime-number-checker) — is a single number prime?
- [`prime-number-generator/`](./prime-number-generator) — lists all primes in a range
- [`even-odd-checker/`](./even-odd-checker) — even/odd check with input validation
- [`largest-number-finder/`](./largest-number-finder) — max of a hardcoded list
- [`remove-duplicates/`](./remove-duplicates) — dedupe a list while preserving order
- [`drawing-shapes/`](./drawing-shapes) — prints rows of `X`s sized from a list of counts
- [`multiplication-tables/`](./multiplication-tables) — prints times tables up to a chosen range
- [`simple-chatbot/`](./simple-chatbot) — greeting-keyword pattern matcher
- [`weather-report/`](./weather-report) — store/retrieve weather notes per city (no live API)
- [`weather-forecast-fetcher/`](./weather-forecast-fetcher) — live lookup via the OpenWeatherMap API (needs `requests`; **the script has an API key hardcoded in it — treat it as already-exposed and swap in your own key before using it**)
- [`file-handler/`](./file-handler) — minimal write-then-read file I/O example
- [`student-performance-analysis-application/`](./student-performance-analysis-application) — aggregates a small student dataset and charts it (needs `matplotlib`, `numpy`)

## Data science and ML

Small `numpy`/`pandas`/`scikit-learn`/`matplotlib` exercises. Needs
`pip install numpy pandas scikit-learn scipy matplotlib`.

- [`confusion-matrix-1/`](./confusion-matrix-1) — confusion matrix from random binomial data
- [`confusion-matrix-2/`](./confusion-matrix-2) — confusion matrix for a spam/not-spam example
- [`confusion-matrix-3/`](./confusion-matrix-3) — precision-recall curve from example predictions
- [`hierarchical-clustering-1/`](./hierarchical-clustering-1) — dendrogram over toy test-score data
- [`hierarchical-clustering-2/`](./hierarchical-clustering-2) — dendrogram over toy customer-spending data
- [`logistic-regression-1/`](./logistic-regression-1) — pass/fail prediction from hours studied
- [`logistic-regression-2/`](./logistic-regression-2) — logistic regression on a small tabular dataset, with an accuracy/confusion-matrix report
- [`real-world-loan-approval-data/`](./real-world-loan-approval-data) — logistic regression applied to a loan-approval-style dataset
- [`data-scaling/`](./data-scaling) — `StandardScaler` example; reads `data.csv` (bundled in the same folder) and writes `data_scaled.csv`
- [`house-price-prediction/`](./house-price-prediction) — linear regression on `houses.csv` (bundled in the same folder), writes predictions to `houses_with_predictions.csv`

## Misc and drafts

- [`election-page-snippet-not-runnable/`](./election-page-snippet-not-runnable) — **not valid Python.** This is a pasted JSON/HTML snippet from a GitHub page view, kept here for reference only; it won't run as-is.
