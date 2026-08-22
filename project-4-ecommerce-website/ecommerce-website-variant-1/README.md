# NovaShop E-Commerce

Full-stack ecommerce build: React + Vite client, Express API server. The server
uses in-memory data by default, so it runs with **no database setup at all** —
the fastest of the four variants to get running locally.

> ⚠️ **Not deployable on GitHub Pages as-is.** This is a full-stack app (React
> client + Express server), and static GitHub Pages hosting can't run a Node
> process. See [`../README.md`](../README.md) for the full picture, or open
> [`../ecommerce-live-demo/`](../ecommerce-live-demo/) for a no-setup, fully
> client-side version of the same idea.

## Features

- Responsive product catalog with search and category filters
- Product detail pages, wishlist, cart with quantity controls
- Registration / login / logout with JWT authentication
- bcrypt password hashing
- Order creation and order history
- Product reviews API
- Foundations for admin authorization and product CRUD
- Mobile-responsive UI

## Stack

- **Client**: React 19 + Vite, React Router
- **Server**: Node.js + Express 5, JWT auth, bcrypt, in-memory data store
  (Mongoose-ready if you want to swap in MongoDB later)

## Prerequisites

- [Node.js](https://nodejs.org) v18 or later (includes npm)

## Run it locally

Open two terminals — one for the API, one for the client.

**Terminal 1 — API server**

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

The API starts on `http://localhost:5000`.

**Terminal 2 — client**

```bash
cd client
npm install
npm run dev
```

Vite will print a local URL, typically `http://localhost:5173` — open that in
your browser. The client is already pointed at `http://localhost:5000/api`, so
as long as the server from Terminal 1 is running, the app works end-to-end:
browse products, register/log in, add to cart, place an order.

No MongoDB, no extra setup — the API keeps its data in memory (which means it
resets every time you restart the server).

## Project structure

```
ecommerce-website-variant-1/
├── client/          React + Vite frontend
│   ├── src/
│   └── package.json
└── server/          Express API
    ├── server.js
    ├── .env.example  Copy to .env — never commit a real .env
    └── package.json
```

## Notes

- **Payments are intentionally left as an exercise.** For a real deployment, use
  Stripe or a similar provider through a server-side payment flow with verified
  webhooks. Never expose payment secrets or the JWT secret in frontend code.
- To move past the in-memory store, swap the data layer for Mongoose models
  connected to MongoDB — the dependency is already in `server/package.json`.
