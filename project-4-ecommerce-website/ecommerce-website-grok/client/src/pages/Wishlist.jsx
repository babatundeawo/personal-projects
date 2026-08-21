import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="container empty-state">
        <i className="fas fa-heart"></i>
        <p>Your wishlist is empty</p>
        <Link to="/products" className="btn btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingBottom: 48 }}>
      <div className="page-header">
        <h1>My Wishlist</h1>
        <span className="count">{wishlist.length} items</span>
      </div>
      <div className="products-grid">
        {wishlist.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
