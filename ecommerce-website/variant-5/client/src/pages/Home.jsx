import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/productService.js';
import { wishlistService } from '../services/wishlistService.js';
import { useAuth } from '../context/AuthContext.jsx';
import ProductCard from '../components/ProductCard.jsx';

export default function Home() {
  const { user } = useAuth();
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.list({ limit: 8, sort: '-createdAt' })
      .then((data) => {
        setFeatured(data.products);
        setCategories(data.categories);
      })
      .finally(() => setLoading(false));

    if (user) {
      wishlistService.get().then((data) => setWishlist(data.wishlist.map((p) => p._id)));
    }
  }, [user]);

  async function handleToggleWishlist(productId) {
    const data = await wishlistService.toggle(productId);
    setWishlist(data.wishlist.map((id) => (typeof id === 'string' ? id : id._id || id)));
  }

  return (
    <>
      <section className="hero">
        <div>
          <p className="hero-eyebrow">New season</p>
          <h1>Considered goods for everyday living.</h1>
          <p>A small, well-edited catalog — electronics, home, and fashion pieces picked for how they hold up, not just how they photograph.</p>
          <Link to="/shop" className="btn btn-primary">Browse the shop</Link>
        </div>
        <div className="hero-visual">Fieldstone</div>
      </section>

      <div className="category-strip">
        {categories.map((c) => (
          <Link key={c} to={`/shop?category=${encodeURIComponent(c)}`} className="category-pill">
            {c}
          </Link>
        ))}
      </div>

      <div className="section-heading">
        <h2>Newly added</h2>
        <Link to="/shop">View all →</Link>
      </div>

      {loading ? (
        <p className="loading-block">Loading products…</p>
      ) : (
        <div className="product-grid">
          {featured.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              isWishlisted={wishlist.includes(p._id)}
              onToggleWishlist={handleToggleWishlist}
            />
          ))}
        </div>
      )}
    </>
  );
}
