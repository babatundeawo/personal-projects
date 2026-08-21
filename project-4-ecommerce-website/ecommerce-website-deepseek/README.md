# ShopVerse — E-Commerce (DeepSeek variant)

A full-stack ecommerce build: a vanilla HTML/CSS/JS client (no build step) talking to
an Express + MongoDB API for products, auth, orders, reviews, wishlist and admin.

> ⚠️ **Not deployable on GitHub Pages as-is.** `client/app.js` calls
> `http://localhost:5000/api` directly, so the client needs the server below running
> locally (and the server needs MongoDB) even just to load the product list. See
> [`../README.md`](../README.md) for why, and try
> [`../ecommerce-live-demo/`](../ecommerce-live-demo/) for a version of this idea that
> runs with no setup.

## Stack

- **Client**: static HTML/CSS/JS, no framework, no bundler — `client/index.html` +
  `client/app.js`.
- **Server**: Node.js + Express + Mongoose, JWT auth, bcrypt password hashing,
  Nodemailer for transactional email.

## Run locally

### 1. Start MongoDB

Use a local MongoDB instance or a free [MongoDB Atlas](https://www.mongodb.com/atlas)
cluster, and grab its connection string.

### 2. Server

```bash
cd server
npm install
cp .env.example .env   # then fill in MONGO_URI, JWT_SECRET, EMAIL_USER, EMAIL_PASS
npm run dev
```

The API listens on `http://localhost:5000`.

### 3. Client

The client is plain static files — no `npm install` needed. Serve the `client/`
folder with any static server (or open `client/index.html` directly) while the API
above is running, for example:

```bash
cd client
npx serve .
```

## Project structure

```
ecommerce-website-deepseek/
├── client/
│   ├── index.html
│   ├── app.js         Fetches from http://localhost:5000/api
│   └── style.css
└── server/
    ├── config/        db.js, email.js
    ├── controllers/   auth, product, order, review, wishlist, admin
    ├── middleware/     auth.js, admin.js
    ├── models/         User, Product, Order, Review, Wishlist
    ├── routes/
    ├── server.js
    └── .env.example    Copy to .env and fill in real values — never commit .env
```

**Security note:** `.env.example` ships with placeholder values only. Always copy it
to `.env` (already git-ignored) and put your real secrets there — never commit an
actual `.env` file to a public repo.
