"use strict";

/* ---------------------------------------------------------
   Static product catalog for the live demo.
   No backend: this file stands in for the /api/products
   endpoint that the four full-stack variants call.
--------------------------------------------------------- */
const PRODUCTS = [
  { id: "p01", name: "Aria Wireless Headphones", category: "audio", price: 79.99, rating: 4.6, stock: 14, tag: "Bestseller", emoji: "🎧", blurb: "Over-ear, 30hr battery, active noise cancelling." },
  { id: "p02", name: "Pulse Fitness Tracker", category: "wearables", price: 49.5, rating: 4.2, stock: 22, tag: "New", emoji: "⌚", blurb: "Heart-rate, sleep and step tracking with a 7-day battery." },
  { id: "p03", name: "Nomad Canvas Backpack", category: "bags", price: 64, rating: 4.8, stock: 9, tag: "Bestseller", emoji: "🎒", blurb: "18L water-resistant canvas with a padded 15\" laptop sleeve." },
  { id: "p04", name: "Lumen Desk Lamp", category: "home", price: 32.99, rating: 4.3, stock: 31, tag: "", emoji: "💡", blurb: "Dimmable LED with three color temperatures and USB pass-through." },
  { id: "p05", name: "Kioto Ceramic Mug Set", category: "home", price: 21.5, rating: 4.7, stock: 40, tag: "", emoji: "☕", blurb: "Set of two 350ml matte-glaze mugs, dishwasher safe." },
  { id: "p06", name: "Voyage Travel Wallet", category: "bags", price: 27, rating: 4.1, stock: 17, tag: "", emoji: "👛", blurb: "RFID-blocking passport and card organizer." },
  { id: "p07", name: "Strato Mechanical Keyboard", category: "tech", price: 94.99, rating: 4.5, stock: 6, tag: "Low stock", emoji: "⌨️", blurb: "Hot-swappable switches, per-key RGB, USB-C." },
  { id: "p08", name: "Halo Ring Light", category: "tech", price: 38, rating: 4.0, stock: 25, tag: "", emoji: "📷", blurb: "10-inch adjustable ring light with phone clamp and tripod." },
  { id: "p09", name: "Drift Running Shoes", category: "fitness", price: 89, rating: 4.4, stock: 12, tag: "New", emoji: "👟", blurb: "Breathable knit upper with responsive foam midsole." },
  { id: "p10", name: "Terra Yoga Mat", category: "fitness", price: 34.5, rating: 4.6, stock: 28, tag: "", emoji: "🧘", blurb: "6mm non-slip natural rubber, carry strap included." },
  { id: "p11", name: "Ember Insulated Bottle", category: "home", price: 24.99, rating: 4.9, stock: 33, tag: "Bestseller", emoji: "🍶", blurb: "24hr cold / 12hr hot, 750ml stainless steel." },
  { id: "p12", name: "Cosmo Bluetooth Speaker", category: "audio", price: 55, rating: 4.3, stock: 19, tag: "", emoji: "🔊", blurb: "IPX7 waterproof, 12hr battery, pairs with a second speaker." },
];

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "audio", label: "Audio" },
  { id: "wearables", label: "Wearables" },
  { id: "bags", label: "Bags" },
  { id: "home", label: "Home" },
  { id: "tech", label: "Tech" },
  { id: "fitness", label: "Fitness" },
];
