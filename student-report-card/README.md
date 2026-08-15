# 🎓 Student Report Card: Build-003

A student records dashboard for tracking academic scores, attendance and
behavioural ratings, with a searchable roster and print-ready report cards.

## Features

- **Live roster** with search and filters by grade level and pass/fail
  status.
- **Editable curriculum**: add, rename, or remove subjects and every
  student's scores update accordingly.
- **Auto-calculated metrics**: total marks, average, letter grade, class
  rank, and pass/fail status.
- **Print-ready report cards**: open any student's report and print or
  save it as a PDF straight from the browser.
- **Persistent data**: everything is saved to `localStorage`, so your data
  survives a page refresh.

## Structure

```
student-report-card/
├── index.html   # Markup + shared portfolio nav
├── style.css    # All styling (extracted from the original inline <style>)
└── script.js    # App state, rendering, and event handling
```

## Run it

Open `index.html` directly in a browser, or serve the repository root with
any static file server (e.g. the VS Code "Live Server" extension).
