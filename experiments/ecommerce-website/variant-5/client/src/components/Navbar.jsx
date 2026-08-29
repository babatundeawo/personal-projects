import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  function handleSearch(e) {
    e.preventDefault();
    navigate(`/shop?search=${encodeURIComponent(search)}`);
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">Fieldstone</Link>

        <form className="nav-search" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <nav className="nav-links">
          <Link to="/shop">Shop</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart{itemCount > 0 && <span className="cart-badge">{itemCount}</span>}</Link>
          {user ? (
            <>
              <Link to="/orders">Orders</Link>
              {isAdmin && <Link to="/admin">Admin</Link>}
              <button onClick={() => { logout(); navigate('/'); }}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
