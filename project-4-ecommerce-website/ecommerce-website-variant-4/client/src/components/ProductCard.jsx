import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleAdd = (e) => {
    e.preventDefault();
    if (product.stock > 0) addToCart(product);
  };

  return (
    <Link to={`/products/${product.id}`} className="product-card card">
      <div className="product-img-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        <button
          className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <i className={`fas fa-heart`}></i>
        </button>
        {product.stock === 0 && <span className="out-of-stock">Out of Stock</span>}
      </div>
      <div className="product-info">
        <span className="category">{product.category}</span>
        <h3 className="name">{product.name}</h3>
        <div className="rating">
          <i className="fas fa-star"></i>
          <span>{product.rating}</span>
          <span className="reviews">({product.reviews})</span>
        </div>
        <div className="price-row">
          <span className="price">${product.price.toFixed(2)}</span>
          <button
            className="btn btn-sm btn-primary add-btn"
            onClick={handleAdd}
            disabled={product.stock === 0}
          >
            <i className="fas fa-cart-plus"></i>
          </button>
        </div>
      </div>
    </Link>
  );
}
