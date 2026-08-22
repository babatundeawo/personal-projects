# ShopFront — Live Static Demo

The one ecommerce build in this repo that actually runs on GitHub Pages.

The other variants in `project-4-ecommerce-website/` (`ecommerce-website-variant-1`
through `ecommerce-website-variant-5`) are full MERN-stack apps: a React client that
needs a build step (Vite or Create React App) talking to an Express + MongoDB server.
GitHub Pages only serves static files, so none of them can run there as-is — see the
[project README](../README.md) for how to run those locally instead.

This folder is a deliberately separate, fully static build: same product-catalog /
cart / checkout shape, zero backend, zero build step. Open `index.html` directly, or
serve the folder, and it works.

## What it does

- Product catalog with category filter and live search (`data.js` stands in for a
  `/api/products` endpoint).
- A cart drawer with quantity controls, backed by `localStorage` so it survives a
  page refresh.
- A simulated checkout: fills a form, "places" an order, and saves it to
  `localStorage` under `shopfront_orders_v1`. No network request is made, no real
  order is created.

## Stack

Vanilla HTML, CSS and JavaScript. No dependencies, no `npm install`, no build tool.

## Run it locally

No installation needed — just open it.

**Easiest**: double-click `index.html`, or drag it into a browser window.

**Or serve it properly** (recommended, avoids some browsers' quirks with
`file://` URLs):

```bash
cd ecommerce-live-demo
npx serve .
```

Then open the URL it prints, typically `http://localhost:3000`.

Once GitHub Pages serves the whole repo, this folder works at
`https://<your-username>.github.io/<repo-name>/project-4-ecommerce-website/ecommerce-live-demo/`
with no extra configuration.

## Files

```
ecommerce-live-demo/
├── index.html     Markup + cart drawer + checkout modal
├── style.css       Self-contained styling (doesn't depend on the hub's assets/)
├── data.js         Static product catalog
├── script.js       Catalog rendering, cart, checkout, localStorage
└── README.md
```
