# To-Do List — Variant 2

A to-do list application built with HTML5, CSS3 and vanilla JavaScript.

## Stack

Static HTML/CSS/JS. No dependencies, no build tools.

## Run it locally

No installation needed — just open it.

**Easiest**: double-click `index.html`, or drag it into a browser window.

**Or serve it properly** (recommended for the best experience with icons and
local storage):

```bash
cd todo-app-project-variant-2
npx serve .
```

Then open the URL it prints, typically `http://localhost:3000`. VS Code's
Live Server extension works too.

## Project structure

```
todo-app-project-variant-2/
├── index.html
├── style.css
├── script.js
└── icons/          check.svg, edit.svg, plus.svg, trash.svg
```

## Notes

Tasks are saved to the browser's Local Storage, so they persist across page
refreshes but are specific to that browser/device — there's no server or
account system involved.
