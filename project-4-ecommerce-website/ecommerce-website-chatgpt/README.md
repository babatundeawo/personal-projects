# Project 4 — NovaShop E-Commerce

> ⚠️ **Not deployable on GitHub Pages as-is.** This is a full MERN-stack app (React client + Express/MongoDB server) and needs a Node process running, which static GitHub Pages hosting can't provide. See [`../README.md`](../README.md) for the full picture, or open [`../ecommerce-live-demo/`](../ecommerce-live-demo/) for a no-setup, fully client-side version of this idea.


Full-stack portfolio starter using React, Vite, Node.js, Express, JWT and bcrypt.

## Features
- Responsive product catalog
- Search and category filters
- Product details
- Wishlist
- Cart and quantity controls
- Registration/login/logout
- JWT authentication
- bcrypt password hashing
- Order creation and order history
- Product reviews API
- Admin authorization foundation
- Product CRUD API foundation
- MongoDB-ready architecture
- Mobile responsive UI

## Run

### API
```bash
cd server
npm install
npm run dev
```

Copy `.env.example` to `.env`.

### Frontend
```bash
cd client
npm install
npm run dev
```

The frontend uses `http://localhost:5000/api`.

The starter API uses in-memory data so it can run without MongoDB. Replace this with Mongoose models when you are ready.

**Payments are intentionally left as a secure integration exercise.** For production, use Stripe/Razorpay through a server-side payment flow and verified webhooks. Never expose payment secrets or JWT secrets in frontend code.
