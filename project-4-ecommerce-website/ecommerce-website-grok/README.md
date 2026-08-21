# 🛍️ ShopEase – E-Commerce Website

> ⚠️ **Not deployable on GitHub Pages as-is.** This is a full MERN-stack app (React client + Express/MongoDB server) and needs a Node process running, which static GitHub Pages hosting can't provide. See [`../README.md`](../README.md) for the full picture, or open [`../ecommerce-live-demo/`](../ecommerce-live-demo/) for a no-setup, fully client-side version of this idea.


A modern, responsive full-stack-style e-commerce application demonstrating real-world shopping flows. Built as a portfolio project covering frontend architecture, state management, authentication simulation, cart/order logic, and admin capabilities.

> **Current version**: Fully functional **frontend React SPA** with LocalStorage persistence + mock product data.  
> A ready-to-expand **Express backend skeleton** is included so you can easily connect MongoDB, JWT, and payment gateways later.

---

## ✨ Features

### Customer
- 🏠 Beautiful home page with featured products & categories
- 🛍️ Product listing with search, category filter & sort
- 📄 Product detail page (description, stock, related items)
- 🛒 Shopping cart (add / remove / update quantity / total)
- ❤️ Wishlist
- 👤 Register / Login / Logout (LocalStorage + simulated JWT)
- 📦 Checkout & place order
- 📋 Order history & order status
- ⭐ Product ratings display
- 🌙 Dark mode
- 📱 Fully responsive (mobile-first)

### Admin (demo)
- ➕ View products
- Basic product management UI (ready for backend connection)

---

## 📂 Project Structure

```
ecommerce/
├── client/                 # React (Vite) Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route pages
│   │   ├── context/        # Auth, Cart, Wishlist, Theme
│   │   ├── services/       # API helpers / mock data
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express Backend Skeleton
│   ├── controllers/
│   ├── routes/
│   ├── models/             # Mongoose schemas (examples)
│   ├── middleware/
│   ├── config/
│   ├── data/               # Seed products
│   └── server.js
└── README.md
```

---

## 🚀 Quick Start (Frontend – works immediately)

```bash
cd ecommerce/client
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

No backend or database required for the demo version. All data is stored in the browser (LocalStorage).

---

## 🛠 Technologies

**Frontend**
- React 18 + Vite
- React Router
- Context API (Auth, Cart, Wishlist, Theme)
- CSS Modules / modern CSS
- LocalStorage for persistence

**Backend Skeleton**
- Node.js + Express
- Mongoose (MongoDB)
- JWT + bcrypt (examples)
- Ready for Stripe / Razorpay integration

---

## 🔑 Expanding to Full Stack

1. Set up MongoDB Atlas (free tier) or local MongoDB
2. In `server/`, add your connection string
3. Implement the controllers using the provided models
4. Replace mock calls in `client/src/services/` with real `fetch` to your API
5. Add JWT middleware and protect routes
6. Integrate Stripe Checkout (test mode)

See comments inside `server/` files for guidance.

---

## 📱 Pages & Routes

| Route            | Description                  |
|------------------|------------------------------|
| `/`              | Home – featured + categories |
| `/products`      | All products + filters       |
| `/products/:id`  | Product details              |
| `/cart`          | Shopping cart                |
| `/wishlist`      | Saved items                  |
| `/login`         | Login                        |
| `/register`      | Register                     |
| `/checkout`      | Checkout form                |
| `/orders`        | Order history                |
| `/admin`         | Simple admin product view    |

---

## 🌟 Skills Demonstrated

- React component architecture & React Router
- Global state with Context API
- CRUD-like operations (cart, wishlist, orders)
- Form handling & validation
- Responsive design & dark mode
- Clean folder structure for scalable apps
- Preparation for real backend (JWT, MongoDB schemas, REST patterns)

---

## 📚 Challenges Covered

- Responsive product grid
- Search + category filter + sort
- Cart quantity management & totals
- Auth simulation with protected routes
- Order creation & history
- Out-of-stock handling
- Persistent state across refreshes
- Dark mode toggle
- Mobile-friendly navigation

---

## 🚀 Next Steps (Portfolio Upgrades)

- Connect real MongoDB + JWT authentication
- Stripe payment integration
- Admin dashboard with product CRUD
- Image uploads (Cloudinary)
- Email order confirmations
- Product reviews system
- Pagination & infinite scroll
- Deploy: Vercel (client) + Render/Railway (server)

---

Built as a strong beginner-to-intermediate full-stack portfolio project.  
Happy coding! 🛒
