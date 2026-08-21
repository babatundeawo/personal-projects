# Ecommerce Website: 4 Ways (+ 1 live demo)

The same ecommerce brief, given to four different AI models, plus one hand-built
static demo. Like `project-1-portfolio-website/`, `project-2-todo-app/` and
`project-3-weather-app/`, this is a side-by-side comparison folder rather than a
single polished build — except this brief asked for a **full-stack** app, which
changes what "open it in a browser" means.

## Why these don't just open like the other experiments

The portfolio/todo/weather comparisons are static HTML/CSS/JS: open `index.html`
and they work, on your machine or on GitHub Pages. These four are different — every
variant is a **MERN-stack app** (MongoDB, Express, React, Node):

| Variant | Client | Server |
|---|---|---|
| [`ecommerce-website-chatgpt`](./ecommerce-website-chatgpt) | React + Vite | Express (in-memory data by default) |
| [`ecommerce-website-deepseek`](./ecommerce-website-deepseek) | Static HTML/JS calling an API | Express + MongoDB + Nodemailer |
| [`ecommerce-website-gemini`](./ecommerce-website-gemini) | React (CRA-style) | Express + MongoDB |
| [`ecommerce-website-grok`](./ecommerce-website-grok) | React + Vite (works standalone off mock data) | Express skeleton, MongoDB-ready |

**GitHub Pages only serves static files.** It can't run a Node process, so it can't
run any Express server, and it can't run the `npm run build` step a React app needs
before it's a set of static files in the first place. That combination is why this
folder was easy to leave unlinked from the rest of the site — there's no single
`index.html` to point a "live demo" button at.

## How to actually see them

1. **Fastest — the live static demo.** [`ecommerce-live-demo/`](./ecommerce-live-demo)
   is a fully client-side rebuild of the same catalog/cart/checkout idea, with zero
   backend and zero build step. It's linked directly from the Projects page and works
   the moment GitHub Pages serves it.
2. **See the real thing — run a variant locally.** Each variant folder has its own
   README with exact `npm install` / `npm run dev` steps. `ecommerce-website-grok`'s
   client works on its own with mock data (no MongoDB needed); the other three need
   their Express server (and for deepseek/gemini, a MongoDB connection string) running
   alongside the client.
3. **Just read the code.** Every variant is browsable straight on GitHub without
   running anything, which is what the "Source" links on the Projects page point to.
4. **Deploy one for real, outside GitHub Pages.** If you want an actual live full-stack
   demo, host the client on Vercel/Netlify and the server + MongoDB on Render/Railway/
   MongoDB Atlas — none of that is GitHub Pages, but all four variants are already
   structured (separate `client/`/`server/`) to make that split easy.

## A note on secrets

Real `.env` files (with real credentials) should never be committed. This repo's
`.gitignore` now excludes `.env` everywhere; each server folder ships only an
`.env.example` with placeholder values — copy it to `.env` locally and fill in your
own secrets before running any variant.
