# Ecommerce Website: 5 Ways (+ 1 live demo)

The same ecommerce brief, built five separate times as an independent comparison,
plus one hand-built static demo. Like `project-1-portfolio-website/`,
`project-2-todo-app/` and `project-3-weather-app/`, this is a side-by-side
comparison folder rather than a single polished build — except this brief asked
for a **full-stack** app, which changes what "open it in a browser" means.

## Why these don't just open like the other experiments

The portfolio/todo/weather comparisons are static HTML/CSS/JS: open `index.html`
and they work, on your machine or on GitHub Pages. These five are different — every
variant is a **MERN-stack app** (MongoDB, Express, React, Node):

| Variant | Client | Server |
|---|---|---|
| [`ecommerce-website-variant-1`](./ecommerce-website-variant-1) | React + Vite | Express (in-memory data, no database required) |
| [`ecommerce-website-variant-2`](./ecommerce-website-variant-2) | Static HTML/JS calling an API | Express + MongoDB + Nodemailer |
| [`ecommerce-website-variant-3`](./ecommerce-website-variant-3) | React (Create React App style) | Express + MongoDB |
| [`ecommerce-website-variant-4`](./ecommerce-website-variant-4) | React + Vite (works standalone off mock data) | Express skeleton, MongoDB-ready but not wired up |
| [`ecommerce-website-variant-5`](./ecommerce-website-variant-5) | React + Vite, with a dev-server proxy to the API | Express + MongoDB, JWT auth, admin dashboard, seed script |

**GitHub Pages only serves static files.** It can't run a Node process, so it can't
run any Express server, and it can't run the `npm run build` step a React app needs
before it's a set of static files in the first place. That's why this folder needs
a different launch path than the rest of the site.

## How to actually see them

1. **Fastest — the live static demo, zero setup.**
   [`ecommerce-live-demo/`](./ecommerce-live-demo) is a fully client-side rebuild of
   the same catalog/cart/checkout idea, with no backend and no build step. It's
   linked directly from the Projects page and works the moment GitHub Pages serves
   it — open `ecommerce-live-demo/index.html`.
2. **See the real thing — run a variant locally.** Each variant folder below has
   detailed step-by-step launch instructions in its own README. Quick summary:

   - **Variant 1** — two terminals: `server/` (`npm install && npm run dev`, no
     database needed) and `client/` (`npm install && npm run dev`).
   - **Variant 2** — needs a MongoDB connection (local or free Atlas cluster) in
     `server/.env`, then `npm install && npm run dev` in `server/`, and just serve
     `client/` as static files (`npx serve client` or open `client/index.html`
     directly once the server is running).
   - **Variant 3** — same MongoDB requirement as Variant 2, then `server/`
     (`npm install && npm start`) and `client/` (`npm install && npm start`, Create
     React App dev server).
   - **Variant 4** — the client runs standalone with mock data, no server or
     database needed: just `cd client && npm install && npm run dev`. The `server/`
     folder is a skeleton (routes exist but aren't connected to a real database) if
     you want to build it out further.
   - **Variant 5** — needs a MongoDB connection, then `server/`
     (`npm install`, `cp .env.example .env` and fill it in, `npm run seed` to load
     sample products + a demo admin account, `npm run dev`) and `client/`
     (`npm install && npm run dev`). The Vite dev server proxies `/api` calls to the
     backend automatically, so no extra config is needed once both are running.

3. **Just read the code.** Every variant is browsable straight on GitHub without
   running anything, which is what the "Source" links on the Projects page point to.
4. **Deploy one for real, outside GitHub Pages.** Host the client on
   Vercel/Netlify and the server + database on Render/Railway + MongoDB Atlas —
   none of that is GitHub Pages, but all five variants already separate `client/`
   and `server/` to make that split straightforward.

## A note on secrets

Real `.env` files (with real credentials) should never be committed. This repo's
`.gitignore` excludes `.env` everywhere; each server folder ships only an
`.env.example` with placeholder values — copy it to `.env` locally and fill in
your own secrets before running any variant.
