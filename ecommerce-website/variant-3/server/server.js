const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mock in-memory database for instant standalone execution
let products = [
  { id: "1", name: "Wireless ANC Headphones", price: 99.99, category: "Electronics", rating: 4.8, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500", stock: 15, description: "Premium noise-canceling headphones with deep bass." },
  { id: "2", name: "Ergonomic Mechanical Keyboard", price: 129.50, category: "Electronics", rating: 4.9, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500", stock: 8, description: "Tactile RGB mechanical switches with wireless connectivity." },
  { id: "3", name: "Minimalist Leather Backpack", price: 79.00, category: "Fashion", rating: 4.6, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500", stock: 20, description: "Durable water-resistant leather backpack for everyday commute." },
  { id: "4", name: "Smart Fitness Watch v2", price: 149.99, category: "Electronics", rating: 4.7, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500", stock: 12, description: "Tracks heart rate, sleep metrics, and workout routines." }
];

let orders = [];

// REST API Endpoints
app.get('/api/products', (req, res) => {
  const { category, search } = req.query;
  let filtered = [...products];
  if (category && category !== 'All') {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  if (search) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }
  res.json(filtered);
});

app.post('/api/orders', (req, res) => {
  const { items, total, customer } = req.body;
  const newOrder = {
    id: `ORD-${Date.now()}`,
    items,
    total,
    customer,
    status: "Processing",
    date: new Date().toISOString()
  };
  orders.push(newOrder);
  res.status(201).json({ success: true, order: newOrder });
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`E-Commerce Server running on port ${PORT}`);
});
