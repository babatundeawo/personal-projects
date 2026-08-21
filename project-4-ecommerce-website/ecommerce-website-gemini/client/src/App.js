import React, { useState, useEffect } from 'react';

const MOCK_PRODUCTS = [
  { id: "1", name: "Wireless ANC Headphones", price: 99.99, category: "Electronics", rating: 4.8, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500", stock: 15 },
  { id: "2", name: "Ergonomic Mechanical Keyboard", price: 129.50, category: "Electronics", rating: 4.9, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500", stock: 8 },
  { id: "3", name: "Minimalist Leather Backpack", price: 79.00, category: "Fashion", rating: 4.6, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500", stock: 20 },
  { id: "4", name: "Smart Fitness Watch v2", price: 149.99, category: "Electronics", rating: 4.7, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500", stock: 12 }
];

export default function App() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Sync with Backend if available
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => console.log('Using local mock dataset'));
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCheckout = () => {
    setCart([]);
    setIsCartOpen(false);
    setOrderConfirmed(true);
    setTimeout(() => setOrderConfirmed(false), 4000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛍️</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ApexCart</h1>
          </div>

          <div className="flex-1 max-w-md mx-4">
            <input 
              type="search"
              placeholder="Search products..."
              className="w-full px-4 py-2 bg-slate-100 border-0 rounded-full text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative text-slate-600 hover:text-blue-600">
              ❤️ <span className="text-xs font-semibold">{wishlist.length}</span>
            </button>
            <button onClick={() => setIsCartOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition">
              🛒 Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
            </button>
          </div>
        </div>
      </header>

      {/* Confirmation Toast */}
      {orderConfirmed && (
        <div className="bg-emerald-600 text-white text-center py-3 font-semibold shadow-inner">
          🎉 Order Placed Successfully! Your items are processing.
        </div>
      )}

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        {/* Category Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {['All', 'Electronics', 'Fashion'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${selectedCategory === cat ? 'bg-blue-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition group flex flex-col">
              <div className="relative aspect-square bg-slate-100 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300"/>
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full text-xs shadow-sm hover:scale-110 transition"
                >
                  {wishlist.includes(product.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">{product.category}</span>
                <h3 className="font-semibold text-slate-800 text-base mb-1 line-clamp-1">{product.name}</h3>
                <div className="flex items-center gap-1 text-amber-500 text-xs mb-3">
                  ★ <span>{product.rating}</span>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-bold text-slate-900">${product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-slate-900 hover:bg-blue-600 text-white px-3 py-2 rounded-xl text-xs font-semibold transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Drawer Slide-Over */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="font-bold text-lg">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-xl">✕</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-slate-400">Cart is empty.</div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover"/>
                      <div>
                        <h4 className="font-semibold text-sm line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-slate-500">${item.price} x {item.quantity}</p>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-xs font-semibold hover:underline">Remove</button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t border-slate-200 space-y-3">
                <div className="flex justify-between font-bold text-base">
                  <span>Total:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <button onClick={handleCheckout} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition">
                  Checkout Now
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
