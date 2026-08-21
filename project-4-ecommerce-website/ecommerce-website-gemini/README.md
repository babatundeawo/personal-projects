# ApexCart - Full-Stack E-Commerce Application

> ⚠️ **Not deployable on GitHub Pages as-is.** This is a full MERN-stack app (React client + Express/MongoDB server) and needs a Node process running, which static GitHub Pages hosting can't provide. See [`../README.md`](../README.md) for the full picture, or open [`../ecommerce-live-demo/`](../ecommerce-live-demo/) for a no-setup, fully client-side version of this idea.


ApexCart is a modern, responsive full-stack e-commerce web application featuring a React-powered frontend interface and an Express.js REST API backend.

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ORM) with local fallback support
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs

---

## 📂 Project Structure

```text
ecommerce-app/
├── client/              # React Frontend Application
│   ├── public/          # HTML Template & Static Assets
│   └── src/             # App.js, Components, & React Logic
├── server/              # Express REST API Backend
│   ├── config/          # Database connection setup
│   ├── controllers/     # Route logic handlers
│   ├── middleware/      # JWT Auth & error handling
│   ├── models/          # Mongoose DB Schemas
│   ├── routes/          # Express API Endpoints
│   └── server.js        # Entry point script
└── README.md            # Execution Guide & Documentation
```

---

## 🚀 How to Run the Application

### 1. Prerequisites
Ensure you have **Node.js** (v16 or higher) installed on your system.

---

### 2. Run the Backend API (`/server`)

1. Open a terminal and navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Node.js Express server:
   ```bash
   npm start
   ```
   *(Or run `npm run dev` for nodemon development execution)*

The API server will launch at **`http://localhost:5000`**.

---

### 3. Run the Frontend Client (`/client`)

1. Open a second terminal window and navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies (if setting up via create-react-app or custom build):
   ```bash
   npm install
   ```
3. Start the React development client:
   ```bash
   npm start
   ```

The store UI will launch in your browser at **`http://localhost:3000`**.

---

## 🔍 Key API Routes

- `GET /api/products` — Retrieve product catalog (Supports `?category=` & `?search=`)
- `POST /api/orders` — Submit a new order checkout request
- `GET /api/orders` — Fetch placed customer orders
