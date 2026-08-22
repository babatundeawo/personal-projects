# ApexCart — E-Commerce Application

A full-stack ecommerce application with a React (Create React App style)
frontend and an Express + MongoDB REST API backend.

> ⚠️ **Not deployable on GitHub Pages as-is.** This is a full-stack app (React
> client + Express/MongoDB server), and static GitHub Pages hosting can't run a
> Node process. See [`../README.md`](../README.md) for the full picture, or
> open [`../ecommerce-live-demo/`](../ecommerce-live-demo/) for a no-setup,
> fully client-side version of the same idea.

## Stack

- **Frontend**: React 18, Tailwind CSS (via CDN)
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose), with a mock in-memory fallback so the UI
  still works if no database is connected
- **Authentication**: JSON Web Tokens (JWT) + bcryptjs

## Prerequisites

- [Node.js](https://nodejs.org) v16 or later

## Project structure

```
ecommerce-website-variant-3/
├── client/              React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── server/               Express REST API
    ├── config/           Database connection setup
    ├── controllers/      Route logic handlers
    ├── middleware/       JWT auth & error handling
    ├── models/           Mongoose schemas
    ├── routes/           Express API endpoints
    └── server.js
```

## Run it locally

Open two terminals — one for the API, one for the client.

**Terminal 1 — API server**

```bash
cd server
npm install
npm start
```

*(Or `npm run dev` to run it with `nodemon`, which restarts automatically on
file changes.)*

The API server starts at `http://localhost:5000`. It runs against an in-memory
product list by default, so you can start it with no MongoDB connection at
all; connect a real MongoDB instance in `server/config` if you want data to
persist between restarts.

**Terminal 2 — React client**

```bash
cd client
npm install
npm start
```

This opens the app automatically in your browser at `http://localhost:3000`.
The client tries to fetch live data from `http://localhost:5000/api/products`
on load and falls back to a small built-in mock catalog if the API isn't
reachable — so it's viewable even before the server is running, though cart
and checkout flows need the API for the full experience.

## Key API routes

- `GET /api/products` — retrieve the product catalog (supports `?category=`
  and `?search=`)
- `POST /api/orders` — submit a new order / checkout request
- `GET /api/orders` — fetch placed customer orders
