import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import StarRating from './StarRating.jsx';

export default function ProductCard({ product, isWishlisted, onToggleWishlist }) {
  const { user } = useAuth();
  const { addItem } = useCart();

  return (
    <div className="product-card">
      <Link to={`/product/${product.slug}`}>
        <div className="product-media">
          {user && (
            <button
              className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onToggleWishlist?.(product._id);
              }}
              aria-label="Toggle wishlist"
            >
              {isWishlisted ? '♥' : '♡'}
            </button>
          )}
          {product.name.slice(0, 1)}
        </div>
      </Link>
      <div className="product-body">
        <p className="product-category">{product.category}</p>
        <h3><Link to={`/product/${product.slug}`}>{product.name}</Link></h3>
        <StarRating rating={product.rating} count={product.numReviews} />
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          {product.stock === 0 ? (
            <span className="stock-note">Out of stock</span>
          ) : (
            <button className="btn btn-outline btn-sm" onClick={() => addItem(product, 1)}>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
