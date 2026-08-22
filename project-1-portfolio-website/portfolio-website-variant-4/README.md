# Portfolio Website — Variant 4

A responsive personal portfolio site built with plain HTML5, CSS3 and
vanilla JavaScript. No frameworks, no build tools.

## Stack

Static HTML/CSS/JS. No dependencies.

## Run it locally

No installation needed — just open it.

**Easiest**: double-click `index.html`, or drag it into a browser window.

**Or serve it properly** (recommended — some browsers restrict local scripts
and fonts when opened directly via `file://`):

```bash
cd portfolio-website-variant-4
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy

Upload the folder as-is to GitHub Pages, Netlify, or Vercel — no build step
required.

## Project structure

```
portfolio-website-variant-4/
├── index.html
├── style.css
├── script.js
├── resume.pdf     Placeholder — swap for a real resume
└── assets/        Placeholder profile/project artwork
```

## Customize

1. Replace the placeholder images in `assets/` with real project/profile
   photos.
2. Replace `resume.pdf` with an actual resume.
3. Update social links and contact email in `index.html`.
4. Connect the contact form in `script.js` to a real backend or form service
   when ready — right now it's a client-side demo only.
