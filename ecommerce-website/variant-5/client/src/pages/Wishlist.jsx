import { useEffect, useState } from 'react';
import { wishlistService } from '../services/wishlistService.js';
import ProductCard from '../components/ProductCard.jsx';

export default function Wishlist() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    wishlistService.get().then((d) => setProducts(d.wishlist)).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleToggle(productId) {
    await wishlistService.toggle(productId);
    load();
  }

  if (loading) return <p className="loading-block">Loading your wishlist…</p>;

  return (
    <div className="page">
      <h1 style={{ marginBottom: 24 }}>Your wishlist</h1>
      {products.length === 0 ? (
        <p className="empty-note">Nothing saved yet — tap the heart on any product to add it here.</p>
      ) : (
        <div className="product-grid" style={{ padding: 0 }}>
          {products.map((p) => (
            <ProductCard key={p._id} product={p} isWishlisted onToggleWishlist={handleToggle} />
          ))}
        </div>
      )}
    </div>
  );
}
