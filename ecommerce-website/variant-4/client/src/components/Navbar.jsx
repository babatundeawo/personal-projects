import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo">
          <i className="fas fa-bag-shopping"></i> ShopEase
        </Link>

        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          {user && <NavLink to="/orders">Orders</NavLink>}
          {user?.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
        </nav>

        <div className="nav-actions">
          <button className="icon-btn" onClick={toggle} title="Toggle theme">
            <i className={`fas ${dark ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>

          <Link to="/wishlist" className="icon-btn" title="Wishlist">
            <i className="fas fa-heart"></i>
            {wishlist.length > 0 && <span className="badge-count">{wishlist.length}</span>}
          </Link>

          <Link to="/cart" className="icon-btn" title="Cart">
            <i className="fas fa-cart-shopping"></i>
            {totalItems > 0 && <span className="badge-count">{totalItems}</span>}
          </Link>

          {user ? (
            <div className="user-menu">
              <span className="user-name">Hi, {user.name.split(' ')[0]}</span>
              <button className="btn btn-sm btn-outline" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="auth-btns">
              <Link to="/login" className="btn btn-sm btn-outline">Login</Link>
              <Link to="/register" className="btn btn-sm btn-primary">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
