import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { getProductById, products } from '../services/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="container empty-state">
        <i className="fas fa-exclamation-circle"></i>
        <p>Product not found</p>
        <Link to="/products" className="btn btn-primary">Back to Products</Link>
      </div>
    );
  }

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    addToCart(product, qty);
  };

  return (
    <div className="container product-detail">
      <div className="detail-grid">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="detail-info">
          <span className="category">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="rating">
            <i className="fas fa-star"></i> {product.rating}
            <span className="reviews">({product.reviews} reviews)</span>
          </div>
          <p className="price">${product.price.toFixed(2)}</p>
          <p className="description">{product.description}</p>
          <p className="stock">
            {product.stock > 0
              ? <span className="badge badge-success">In Stock ({product.stock})</span>
              : <span className="badge badge-warning">Out of Stock</span>}
          </p>

          <div className="actions">
            <div className="qty-control">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
            </div>
            <button
              className="btn btn-primary"
              onClick={handleAdd}
              disabled={product.stock === 0}
            >
              <i className="fas fa-cart-plus"></i> Add to Cart
            </button>
            <button
              className={`btn btn-outline wishlist-toggle ${isInWishlist(product.id) ? 'active' : ''}`}
              onClick={() => toggleWishlist(product)}
            >
              <i className="fas fa-heart"></i>
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="related">
          <h2>Related Products</h2>
          <div className="products-grid">
            {related.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
