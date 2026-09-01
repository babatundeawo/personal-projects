import 'dotenv/config';
import { connectDB } from '../config/db.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

const sampleProducts = [
  {
    name: 'Wireless Over-Ear Headphones',
    description: 'Noise-isolating over-ear headphones with 30-hour battery life and a folding travel case.',
    price: 99,
    category: 'Electronics',
    images: [],
    stock: 25
  },
  {
    name: 'Mechanical Keyboard — 75%',
    description: 'Hot-swappable mechanical keyboard with a compact 75% layout and per-key RGB.',
    price: 79,
    category: 'Electronics',
    images: [],
    stock: 40
  },
  {
    name: 'Ceramic Pour-Over Coffee Set',
    description: 'A hand-glazed ceramic dripper and matching mug, for slow mornings.',
    price: 34,
    category: 'Home',
    images: [],
    stock: 60
  },
  {
    name: 'Canvas Weekender Bag',
    description: 'Water-resistant canvas duffel with leather trim, fits airline carry-on limits.',
    price: 68,
    category: 'Fashion',
    images: [],
    stock: 18
  },
  {
    name: 'Standing Desk Converter',
    description: 'Height-adjustable desktop riser — sit or stand without replacing your whole desk.',
    price: 129,
    category: 'Home',
    images: [],
    stock: 15
  },
  {
    name: 'Minimalist Analog Watch',
    description: 'Stainless steel case, sapphire crystal, 5ATM water resistance.',
    price: 145,
    category: 'Fashion',
    images: [],
    stock: 22
  },
  {
    name: 'Portable Bluetooth Speaker',
    description: 'Pocket-sized speaker with surprisingly big sound and 12-hour playback.',
    price: 45,
    category: 'Electronics',
    images: [],
    stock: 50
  },
  {
    name: 'Cast Iron Skillet, 10"',
    description: 'Pre-seasoned cast iron skillet — goes from stovetop to oven.',
    price: 32,
    category: 'Home',
    images: [],
    stock: 35
  },
  {
    name: 'Running Shoes — Trail',
    description: 'Grippy lugged outsole and a breathable mesh upper for mixed terrain.',
    price: 88,
    category: 'Fashion',
    images: [],
    stock: 28
  },
  {
    name: 'Smart LED Desk Lamp',
    description: 'Adjustable colour temperature and brightness, with a USB-C charging port in the base.',
    price: 39,
    category: 'Electronics',
    images: [],
    stock: 44
  }
];

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function seed() {
  await connectDB();

  const destroy = process.argv.includes('-d');

  if (destroy) {
    await Product.deleteMany();
    console.log('✔ Cleared products.');
    await mongoose.disconnect();
    return;
  }

  await Product.deleteMany();
  const docs = sampleProducts.map((p) => ({ ...p, slug: `${slugify(p.name)}-${Math.random().toString(36).slice(2, 7)}` }));
  await Product.insertMany(docs);
  console.log(`✔ Seeded ${docs.length} products.`);

  const adminExists = await User.findOne({ email: 'admin@example.com' });
  if (!adminExists) {
    await User.create({
      name: 'Store Admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('✔ Created admin user — admin@example.com / admin123 (change this password!).');
  }

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
