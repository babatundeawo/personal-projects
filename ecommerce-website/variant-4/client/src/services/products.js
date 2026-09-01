// Mock product catalog – replace with real API calls later
export const products = [
  {
    id: '1',
    name: 'Wireless Noise-Cancelling Headphones',
    price: 129.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound. Perfect for travel and daily commuting.',
    stock: 45,
    rating: 4.7,
    reviews: 328,
    featured: true,
    tags: ['audio', 'wireless', 'bestseller']
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 89.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    description: 'Track your steps, heart rate, sleep, and workouts. Water-resistant with vibrant AMOLED display and 7-day battery.',
    stock: 60,
    rating: 4.5,
    reviews: 512,
    featured: true,
    tags: ['wearable', 'fitness']
  },
  {
    id: '3',
    name: 'Minimalist Leather Backpack',
    price: 79.00,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    description: 'Handcrafted genuine leather backpack with laptop compartment (up to 15"), multiple pockets, and adjustable straps. Timeless design.',
    stock: 28,
    rating: 4.8,
    reviews: 189,
    featured: true,
    tags: ['bag', 'leather']
  },
  {
    id: '4',
    name: 'Organic Cotton T-Shirt',
    price: 24.99,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    description: 'Soft, breathable 100% organic cotton tee. Available in multiple colors. Ethically made and machine washable.',
    stock: 120,
    rating: 4.4,
    reviews: 756,
    featured: false,
    tags: ['clothing', 'basics']
  },
  {
    id: '5',
    name: 'Ceramic Pour-Over Coffee Set',
    price: 42.50,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
    description: 'Elegant ceramic dripper, server, and two mugs. Perfect for brewing specialty coffee at home. Dishwasher safe.',
    stock: 35,
    rating: 4.6,
    reviews: 94,
    featured: true,
    tags: ['kitchen', 'coffee']
  },
  {
    id: '6',
    name: 'Wireless Mechanical Keyboard',
    price: 99.00,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1511467687898-9710954ad0f2?w=400&h=400&fit=crop',
    description: 'Compact 75% mechanical keyboard with hot-swappable switches, RGB lighting, and multi-device Bluetooth connectivity.',
    stock: 22,
    rating: 4.9,
    reviews: 267,
    featured: false,
    tags: ['gaming', 'office']
  },
  {
    id: '7',
    name: 'Scented Soy Candle Trio',
    price: 34.99,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=400&fit=crop',
    description: 'Set of three hand-poured soy candles: Lavender, Vanilla, and Cedarwood. 40+ hour burn time each. Clean, non-toxic fragrance.',
    stock: 50,
    rating: 4.7,
    reviews: 143,
    featured: false,
    tags: ['decor', 'gift']
  },
  {
    id: '8',
    name: 'Running Shoes – Lightweight',
    price: 110.00,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    description: 'Breathable mesh upper, responsive cushioning, and durable outsole. Ideal for daily runs and gym sessions.',
    stock: 40,
    rating: 4.5,
    reviews: 421,
    featured: true,
    tags: ['shoes', 'sports']
  },
  {
    id: '9',
    name: 'Portable Bluetooth Speaker',
    price: 59.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    description: '360° sound, IPX7 waterproof, 12-hour playtime. Compact and perfect for outdoor adventures.',
    stock: 55,
    rating: 4.6,
    reviews: 198,
    featured: false,
    tags: ['audio', 'portable']
  },
  {
    id: '10',
    name: 'Stainless Steel Water Bottle',
    price: 28.00,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
    description: 'Double-wall vacuum insulated. Keeps drinks cold 24h or hot 12h. Leak-proof and BPA-free. 750ml capacity.',
    stock: 80,
    rating: 4.8,
    reviews: 634,
    featured: false,
    tags: ['drinkware', 'eco']
  },
  {
    id: '11',
    name: 'Desk Organizer Set',
    price: 32.50,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1587825147497-6d2e0f4a4e8f?w=400&h=400&fit=crop',
    description: 'Bamboo desk organizer with compartments for pens, notes, phone, and accessories. Clean up your workspace.',
    stock: 30,
    rating: 4.3,
    reviews: 87,
    featured: false,
    tags: ['office', 'organization']
  },
  {
    id: '12',
    name: 'Classic Aviator Sunglasses',
    price: 45.00,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop',
    description: 'UV400 protection, polarized lenses, lightweight metal frame. Timeless style for any occasion.',
    stock: 65,
    rating: 4.4,
    reviews: 312,
    featured: false,
    tags: ['accessories', 'summer']
  }
];

export const categories = ['All', 'Electronics', 'Fashion', 'Home'];

export function getProductById(id) {
  return products.find(p => p.id === id);
}

export function getFeatured() {
  return products.filter(p => p.featured);
}

export function getByCategory(category) {
  if (!category || category === 'All') return products;
  return products.filter(p => p.category === category);
}

export function searchProducts(query) {
  const q = query.toLowerCase().trim();
  if (!q) return products;
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.tags.some(t => t.includes(q))
  );
}
