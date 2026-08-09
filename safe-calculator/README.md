# 🧮 Safe Calculator — Build-001

A calculator engineered to never crash. Every calculation runs through guard
clauses that catch bad input, non-numeric values, and division by zero
*before* they can throw an unhandled error — you get a clear, friendly
message instead of a broken page.

## Features

- **Guard-clause validation** — checks both inputs are real numbers before
  doing any math.
- **Division-by-zero protection** — caught and explained, never `Infinity`
  or `NaN` on screen.
- **Keyboard-first** — press <kbd>Enter</kbd> in either field to calculate.
- **Calculation history** — the last 8 calculations are kept in a sidebar
  for quick reference.
- **Light / dark mode** — synced with the rest of the portfolio via the
  shared top bar.
- **Fully responsive** — from a small phone to a wide desktop monitor.

## Structure

```
safe-calculator/
├── index.html   # Markup + shared portfolio nav
├── style.css    # All styling, incl. responsive breakpoints
└── script.js    # Calculation logic, history, keyboard handling
```

## Run it

Open `index.html` directly in a browser, or serve the repository root with
any static file server (e.g. the VS Code "Live Server" extension).
