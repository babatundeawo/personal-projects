# Fieldstone — Full-Stack E-Commerce Project

> ⚠️ **Not deployable on GitHub Pages as-is.** This is a full MERN-stack app (React client + Express/MongoDB server) and needs a Node process running, which static GitHub Pages hosting can't provide. See [`../README.md`](../README.md) for the full picture, or open [`../ecommerce-live-demo/`](../ecommerce-live-demo/) for a no-setup, fully client-side version of this idea.

A complete MERN-stack storefront: React (Vite) on the frontend, Node.js + Express on the backend, MongoDB for storage, JWT authentication, and a mocked checkout flow. Built as Project 4 of the web development projects series.

## What's included

- **Browse & search** — product grid with search, category filter, sorting and pagination
- **Product details** — description, stock, star ratings, and customer reviews
- **Cart** — add/remove/update quantity, persisted in the browser (`localStorage`)
- **Wishlist** — server-side, tied to your account
- **Auth** — register/login with JWT, passwords hashed with bcrypt
- **Checkout** — shipping address form + a mocked payment step that creates a real order and reduces stock
- **Order tracking** — order history with a status tracker (processing → shipped → delivered)
- **Admin dashboard** — add/edit/delete products, view all orders and update their status
- **Responsive** throughout, plus a dark/light-aware design system (`client/src/index.css`)

## Not included (see "Taking it further" below)

Real payment processing, a public seller/vendor flow, coupon codes, live chat, multi-currency, AI recommendations, automated tests, and CI/CD — all listed in the original brief as bonus/enhancement ideas rather than core features.

## Project structure

```
ecommerce/
├── client/                 React app (Vite)
│   ├── src/
│   │   ├── api/            fetch wrapper that attaches the JWT
│   │   ├── components/     Navbar, ProductCard, Pagination, route guards…
│   │   ├── context/        AuthContext, CartContext
│   │   ├── pages/          Home, Shop, ProductDetails, Cart, Checkout, Orders, Admin…
│   │   └── services/       one file per API resource (products, orders, wishlist)
│   └── vite.config.js      dev server proxies /api → http://localhost:5000
└── server/                 Express API
    ├── config/db.js        MongoDB connection
    ├── models/              User, Product, Order (Mongoose schemas)
    ├── controllers/         request handlers, one file per resource
    ├── routes/               maps URLs to controllers
    ├── middleware/           JWT auth, admin guard, error handling
    └── data/seed.js          sample products + a demo admin account
```

## Setup

You'll need Node.js 18+ and a MongoDB connection string — the free tier at
[MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) works well and takes a few minutes to set up.

**1. Backend**

```bash
cd server
npm install
cp .env.example .env
# open .env and paste in your MONGO_URI, then set JWT_SECRET to any long random string
npm run seed        # populates sample products + an admin account (admin@example.com / admin123)
npm run dev          # starts the API on http://localhost:5000
```

**2. Frontend** (in a second terminal)

```bash
cd client
npm install
npm run dev          # starts the app on http://localhost:5173
```

Open `http://localhost:5173` — the Vite dev server proxies `/api` requests to the backend automatically, so no extra config is needed.

**3. Try it out**

- Register a normal account to browse, add to cart, checkout, and review products.
- Log in as `admin@example.com` / `admin123` (created by the seed script) to reach `/admin` and manage products and orders. **Change or remove this password before deploying anywhere public.**

## Taking it to production

A few things to change before this goes live anywhere real:

- **Payments are mocked.** `server/controllers/orderController.js` has a comment at the top of `placeOrder` explaining exactly where to plug in Stripe or Razorpay — create a PaymentIntent, confirm it client-side with Stripe Elements, and only call `placeOrder` after that succeeds.
- **Deployment split**, per the original brief: deploy `client/` to Vercel and `server/` to Render or Railway, with MongoDB Atlas as the database. Set `CLIENT_ORIGIN` in the server's environment to your deployed frontend URL, and point the client's API calls at your deployed backend URL instead of the Vite proxy.
- **JWT_SECRET** should be a long, random, unique value in production — never reuse the placeholder.
- Consider adding rate limiting (e.g. `express-rate-limit`) on the auth routes before going public.

## Next steps from here

Real Stripe/Razorpay integration, email order notifications, an inventory/back-in-stock system, an admin analytics dashboard with charts, WebSocket-based live order tracking, and a CI/CD pipeline via GitHub Actions are all natural extensions — each was called out as a bonus in the original project brief.
