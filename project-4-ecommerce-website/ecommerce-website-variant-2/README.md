# ShopVerse — E-Commerce

A full-stack ecommerce build: a vanilla HTML/CSS/JS client (no framework, no
build step) talking to an Express + MongoDB API for products, auth, orders,
reviews, wishlist and admin.

> ⚠️ **Not deployable on GitHub Pages as-is.** `client/app.js` calls
> `http://localhost:5000/api` directly, so the client needs the server below
> running locally (and the server needs MongoDB) even just to load the product
> list. See [`../README.md`](../README.md) for why, and try
> [`../ecommerce-live-demo/`](../ecommerce-live-demo/) for a version of this
> idea that runs with no setup.

## Stack

- **Client**: static HTML/CSS/JS, no framework, no bundler — `client/index.html`
  + `client/app.js`.
- **Server**: Node.js + Express + Mongoose, JWT auth, bcrypt password hashing,
  Nodemailer for transactional email.

## Prerequisites

- [Node.js](https://nodejs.org) v18 or later
- A MongoDB connection — either installed locally, or a free
  [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (see the deploy guide
  in [`../README.md`](../README.md) for exact Atlas setup steps)

## Run it locally

**1. Get a MongoDB connection string**

Local install: the default in `.env.example` (`mongodb://localhost:27017/ecommerce`)
works if you have MongoDB running on your machine. Otherwise, create a free
Atlas cluster and copy its connection string instead.

**2. Start the server**

```bash
cd server
npm install
cp .env.example .env
```

Open `.env` and fill in real values:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=replace-with-a-long-random-string
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

`EMAIL_USER`/`EMAIL_PASS` are only needed if you want order-confirmation emails
to actually send — for local testing you can leave the placeholders and just
expect email sending to fail silently or log an error.

```bash
npm run dev
```

The API listens on `http://localhost:5000`.

**3. Serve the client**

The client is plain static files — no `npm install` needed. With the server
from step 2 still running, serve the `client/` folder with any static file
server:

```bash
cd client
npx serve .
```

Then open the URL it prints (typically `http://localhost:3000`). The page
calls `http://localhost:5000/api` for everything, so the server must already
be running.

## Project structure

```
ecommerce-website-variant-2/
├── client/
│   ├── index.html
│   ├── app.js         Fetches from http://localhost:5000/api
│   └── style.css
└── server/
    ├── config/        db.js, email.js
    ├── controllers/   auth, product, order, review, wishlist, admin
    ├── middleware/    auth.js, admin.js
    ├── models/        User, Product, Order, Review, Wishlist
    ├── routes/
    ├── server.js
    └── .env.example   Copy to .env and fill in real values — never commit .env
```

## Security note

`.env.example` ships with placeholder values only. Always copy it to `.env`
(already git-ignored) and put your real secrets there — never commit an actual
`.env` file to a public repo.
