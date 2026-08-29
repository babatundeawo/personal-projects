# Python Programming

A working archive of standalone Python exercises and small projects —
mostly single-file, `input()`-driven console programs written while
learning core language and data-science concepts. Unlike the polished
builds in the repo root, these are learning reps: some overlap in
subject matter on purpose (multiple takes at the same idea), and they're
organised here by topic rather than in the order they were written.

**Requirements:** Python 3 for everything. A few files need extra
packages — noted per script below — install with `pip install <package>`.

## games/

- [`car-game.py`](./games/car-game.py) — text command loop (`start`/`stop`/`gas`) simulating a simple car
- [`guess-the-number-game.py`](./games/guess-the-number-game.py) — classic number-guessing game with too high/too low hints
- [`number-guessing-game.py`](./games/number-guessing-game.py) — same idea, a leaner rewrite that also counts attempts
- [`password-guessing-game.py`](./games/password-guessing-game.py) — guess a hidden password, get a hint after 3 misses
- [`treasure-hunt.py`](./games/treasure-hunt.py) — guess a hidden position on a 1–10 line, warmer/colder feedback
- [`mystical-word-game.py`](./games/mystical-word-game.py) — riddle-based word-guessing game with a random secret word
- [`flappy-bird/`](./games/flappy-bird) — a playable Flappy Bird clone (`FlappyBird.py`, needs `pygame`, uses the bundled sprite images)
- [`snake-game/`](./games/snake-game) — a playable Snake clone (`snakeGame.py`, needs `pygame`, uses the bundled background image)

## calculators-and-converters/

- [`simple-calculator.py`](./calculators-and-converters/simple-calculator.py) — add/subtract/multiply/divide via functions *(a byte-identical duplicate, `Simple_Calculator.py`, was removed during cleanup)*
- [`enhanced-scientific-calculator.py`](./calculators-and-converters/enhanced-scientific-calculator.py) — a `tkinter` GUI calculator with scientific functions
- [`factorial-calculator.py`](./calculators-and-converters/factorial-calculator.py) — factorial of a number via a loop
- [`temperature-converter.py`](./calculators-and-converters/temperature-converter.py) — Celsius ⇄ Fahrenheit conversion functions
- [`grade-calculator.py`](./calculators-and-converters/grade-calculator.py) — average + CGPA from a list of grades
- [`grade-calculator-quick-version.py`](./calculators-and-converters/grade-calculator-quick-version.py) — single-score → letter-grade lookup, with input validation
- [`area-of-circle.py`](./calculators-and-converters/area-of-circle.py) — area from a radius
- [`area-of-parallelogram.py`](./calculators-and-converters/area-of-parallelogram.py) — area from base × height
- [`area-of-a-rectangle.py`](./calculators-and-converters/area-of-a-rectangle.py) — area from length × width
- [`volume-of-a-closed-cylinder.py`](./calculators-and-converters/volume-of-a-closed-cylinder.py) — volume from radius and height
- [`sum-of-prices.py`](./calculators-and-converters/sum-of-prices.py) — total of a price list, two ways (manual loop vs. `sum()`)
- [`list-sum-and-average.py`](./calculators-and-converters/list-sum-and-average.py) — collects numbers from the user, prints total and average

## management-systems/

Class-based, menu-driven "manage a collection of things" programs —
the bulk of the OOP practice.

- [`bank-account-management.py`](./management-systems/bank-account-management.py) — `BankAccount` class with deposits, withdrawals and a transaction list
- [`bookstore-inventory-management.py`](./management-systems/bookstore-inventory-management.py) — `Book` class + inventory operations
- [`contact-book.py`](./management-systems/contact-book.py) — add/view/remove contacts, dictionary-backed
- [`contact-finder.py`](./management-systems/contact-finder.py) — look up a name in a fixed contact list
- [`employee-management-system.py`](./management-systems/employee-management-system.py) — `Employee` class with name/position/salary records
- [`library-management-system.py`](./management-systems/library-management-system.py) — `Library` class tracking books and authors
- [`movie-collection.py`](./management-systems/movie-collection.py) — `Movie` class for a personal collection
- [`music-playlist-manager.py`](./management-systems/music-playlist-manager.py) — `Song` class + playlist operations
- [`recipe-manager.py`](./management-systems/recipe-manager.py) — add/remove/search recipes by ingredient, menu loop
- [`student-management-system.py`](./management-systems/student-management-system.py) — `Student` class with name/age/ID records
- [`student-gradebook.py`](./management-systems/student-gradebook.py) — add students, record grades, compute averages *(a byte-identical duplicate, `Grade Book.py`, was removed during cleanup)*
- [`shopping-list.py`](./management-systems/shopping-list.py) — add/remove/view items with running total cost
- [`simple-to-do-list.py`](./management-systems/simple-to-do-list.py) — basic add/remove/view task list
- [`enhanced-to-do-list-manager.py`](./management-systems/enhanced-to-do-list-manager.py) — to-do list persisted to a text file, with task removal
- [`to-do-list-with-deadlines.py`](./management-systems/to-do-list-with-deadlines.py) — `Task` class pairing each item with a parsed deadline date
- [`save-and-read-a-to-do-list.py`](./management-systems/save-and-read-a-to-do-list.py) — `ToDoList` class that reads/writes tasks to a file
- [`expense-tracker.py`](./management-systems/expense-tracker.py) — `Expense` class with name/amount/category
- [`expense-tracker-with-monthly-report.py`](./management-systems/expense-tracker-with-monthly-report.py) — file-backed expense log with a currency symbol and monthly report generation
- [`fitness-tracker.py`](./management-systems/fitness-tracker.py) — `Workout` class logging duration and calories
- [`calendar-printer.py`](./management-systems/calendar-printer.py) — prints a given month's calendar via the `calendar` module
- [`voting-system.py`](./management-systems/voting-system.py) — `election` dictionary: add candidates, cast/update votes
- [`simple-voting-system.py`](./management-systems/simple-voting-system.py) — a leaner rewrite of the same voting idea, menu-driven

## validators-and-utilities/

Smaller, single-purpose scripts: string/number checks, small algorithms,
and a couple of one-off tools.

- [`password-validator.py`](./validators-and-utilities/password-validator.py) — checks length, digits, and character rules
- [`user-information-validator.py`](./validators-and-utilities/user-information-validator.py) — retry-until-valid prompts for name/age/etc.
- [`prime-number-checker.py`](./validators-and-utilities/prime-number-checker.py) — is a single number prime?
- [`prime-number-generator.py`](./validators-and-utilities/prime-number-generator.py) — lists all primes in a range
- [`even-odd-checker.py`](./validators-and-utilities/even-odd-checker.py) — even/odd check with input validation
- [`largest-number-finder.py`](./validators-and-utilities/largest-number-finder.py) — max of a hardcoded list
- [`remove-duplicates.py`](./validators-and-utilities/remove-duplicates.py) — dedupe a list while preserving order
- [`drawing-shapes.py`](./validators-and-utilities/drawing-shapes.py) — prints rows of `X`s sized from a list of counts
- [`multiplication-tables.py`](./validators-and-utilities/multiplication-tables.py) — prints times tables up to a chosen range
- [`simple-chatbot.py`](./validators-and-utilities/simple-chatbot.py) — greeting-keyword pattern matcher
- [`weather-report.py`](./validators-and-utilities/weather-report.py) — store/retrieve weather notes per city (no live API)
- [`weather-forecast-fetcher.py`](./validators-and-utilities/weather-forecast-fetcher.py) — live lookup via the OpenWeatherMap API (needs `requests`; **the script has an API key hardcoded in it — treat it as already-exposed and swap in your own key before using it**)
- [`file-handler.py`](./validators-and-utilities/file-handler.py) — minimal write-then-read file I/O example
- [`student-performance-analysis-application.py`](./validators-and-utilities/student-performance-analysis-application.py) — aggregates a small student dataset and charts it (needs `matplotlib`, `numpy`)

## data-science-and-ml/

Small `numpy`/`pandas`/`scikit-learn`/`matplotlib` exercises. Needs
`pip install numpy pandas scikit-learn scipy matplotlib`.

- [`confusion-matrix-1.py`](./data-science-and-ml/confusion-matrix-1.py) — confusion matrix from random binomial data
- [`confusion-matrix-2.py`](./data-science-and-ml/confusion-matrix-2.py) — confusion matrix for a spam/not-spam example
- [`confusion-matrix-3.py`](./data-science-and-ml/confusion-matrix-3.py) — precision-recall curve from example predictions
- [`hierarchical-clustering-1.py`](./data-science-and-ml/hierarchical-clustering-1.py) — dendrogram over toy test-score data
- [`hierarchical-clustering-2.py`](./data-science-and-ml/hierarchical-clustering-2.py) — dendrogram over toy customer-spending data
- [`logistic-regression-1.py`](./data-science-and-ml/logistic-regression-1.py) — pass/fail prediction from hours studied
- [`logistic-regression-2.py`](./data-science-and-ml/logistic-regression-2.py) — logistic regression on a small tabular dataset, with an accuracy/confusion-matrix report
- [`real-world-loan-approval-data.py`](./data-science-and-ml/real-world-loan-approval-data.py) — logistic regression applied to a loan-approval-style dataset
- [`data-scaling.py`](./data-science-and-ml/data-scaling.py) — `StandardScaler` example, reads [`data.csv`](./data-science-and-ml/data.csv) and writes `data_scaled.csv`
- [`house-price-prediction.py`](./data-science-and-ml/house-price-prediction.py) — linear regression on [`houses.csv`](./data-science-and-ml/houses.csv), writes predictions to [`houses_with_predictions.csv`](./data-science-and-ml/houses_with_predictions.csv)

## misc-and-drafts/

- [`election-page-snippet-not-runnable.py`](./misc-and-drafts/election-page-snippet-not-runnable.py) — **not valid Python.** This is a pasted JSON/HTML snippet from a GitHub page view, kept here for reference only; it won't run as-is.
