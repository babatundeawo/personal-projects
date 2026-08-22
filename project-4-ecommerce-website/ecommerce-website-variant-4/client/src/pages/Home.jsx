import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getFeatured, categories } from '../services/products';
import './Home.css';

export default function Home() {
  const featured = getFeatured();

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="container hero-content">
          <h1>Discover Quality Products</h1>
          <p>Shop the latest in electronics, fashion, and home essentials. Free shipping on orders over $50.</p>
          <Link to="/products" className="btn btn-primary">
            Shop Now <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="container categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          {categories.filter(c => c !== 'All').map(cat => (
            <Link key={cat} to={`/products?category=${cat}`} className="category-card card">
              <i className={`fas ${
                cat === 'Electronics' ? 'fa-laptop' :
                cat === 'Fashion' ? 'fa-shirt' : 'fa-house'
              }`}></i>
              <span>{cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container featured-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <Link to="/products" className="view-all">View all →</Link>
        </div>
        <div className="products-grid">
          {featured.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="promo-banner">
        <div className="container">
          <h2>Summer Sale – Up to 30% Off</h2>
          <p>Limited time offers on selected items. Don’t miss out!</p>
          <Link to="/products" className="btn btn-primary">Browse Deals</Link>
        </div>
      </section>
    </div>
  );
}
