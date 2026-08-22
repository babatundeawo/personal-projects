# ShopEase — E-Commerce Website

A responsive, full-stack-style ecommerce application demonstrating real-world
shopping flows: frontend architecture, state management, authentication
simulation, cart/order logic and an admin view.

**Current version**: the frontend is a fully functional React SPA that runs
completely standalone using `localStorage` and mock product data — no backend
required to try it. A ready-to-expand Express backend skeleton is included for
when you want to connect real MongoDB, JWT and payment gateways.

> ⚠️ **Not deployable on GitHub Pages as-is**, if you're relying on the
> server. GitHub Pages can only serve static files, so it can't run the
> Express skeleton below. The client, however, is a static Vite build once
> compiled, so *it* can be deployed to GitHub Pages / Vercel / Netlify on its
> own with mock data — see [`../README.md`](../README.md) for the full
> picture, or open [`../ecommerce-live-demo/`](../ecommerce-live-demo/) for
> another zero-setup client-only demo.

## Features

**Customer**
- Home page with featured products and categories
- Product listing with search, category filter and sort
- Product detail pages (description, stock, related items)
- Shopping cart (add / remove / update quantity / totals)
- Wishlist
- Register / login / logout (localStorage + simulated JWT)
- Checkout and order placement
- Order history and status
- Dark mode, fully responsive

**Admin (demo)**
- Product list view, ready to extend into full CRUD once connected to a
  backend

## Stack

**Frontend**: React 18 + Vite, React Router, Context API (auth, cart,
wishlist, theme), modern CSS, localStorage persistence.

**Backend skeleton**: Node.js + Express, Mongoose (MongoDB) and JWT/bcrypt
examples, ready for Stripe/Razorpay integration.

## Prerequisites

- [Node.js](https://nodejs.org) v18 or later

## Run it locally

**Quick start — frontend only (works immediately, no backend needed)**

```bash
cd client
npm install
npm run dev
```

Open the URL Vite prints, typically `http://localhost:5173`. Everything —
products, cart, wishlist, auth, orders — runs against mock data and
`localStorage`, so there's nothing else to configure.

**Optional — bring up the backend skeleton**

The server isn't wired to the client yet (it's a starting point, not a
finished API), but you can run it standalone:

```bash
cd server
npm install
npm run dev
```

The server starts on `http://localhost:5000` with placeholder routes (health
check, product stub, auth stubs that return "not implemented" until you fill
them in).

## Expanding to a real full stack

1. Set up MongoDB Atlas (free tier) or a local MongoDB instance.
2. In `server/`, add your connection string (see `server.js` comments).
3. Implement the controllers using the provided Mongoose models.
4. Replace the mock calls in `client/src/services/` with real `fetch` calls to
   your API.
5. Add JWT middleware and protect the relevant routes.
6. Integrate Stripe Checkout (test mode) for real payments.

## Project structure

```
ecommerce-website-variant-4/
├── client/                 React (Vite) frontend
│   ├── src/
│   │   ├── components/     Reusable UI components
│   │   ├── pages/          Route pages
│   │   ├── context/        Auth, Cart, Wishlist, Theme
│   │   ├── services/       API helpers / mock data
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── server/                 Express backend skeleton
    ├── controllers/
    ├── routes/
    ├── models/             Mongoose schemas (examples)
    ├── middleware/
    ├── config/
    ├── data/                Seed products
    └── server.js
```

## Routes (client-side)

| Route | Description |
|---|---|
| `/` | Home — featured products + categories |
| `/products` | All products + filters |
| `/products/:id` | Product details |
| `/cart` | Shopping cart |
| `/wishlist` | Saved items |
| `/login` | Login |
| `/register` | Register |
| `/checkout` | Checkout form |
| `/orders` | Order history |
| `/admin` | Simple admin product view |
