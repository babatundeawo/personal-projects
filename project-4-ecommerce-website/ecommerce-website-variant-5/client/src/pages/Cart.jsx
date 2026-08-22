import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Cart() {
  const { items, updateQuantity, removeItem, itemsTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const shippingFee = itemsTotal > 100 || itemsTotal === 0 ? 0 : 7.99;

  if (items.length === 0) {
    return (
      <div className="page">
        <p className="empty-note">
          Your cart is empty. <Link to="/shop" style={{ color: 'var(--accent)', fontWeight: 600 }}>Start shopping →</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 style={{ marginBottom: 24 }}>Your cart</h1>
      <div className="cart-layout">
        <div>
          {items.map((item) => (
            <div className="cart-line" key={item.productId}>
              <div className="cart-thumb">{item.name.slice(0, 1)}</div>
              <div>
                <h4>{item.name}</h4>
                <p className="line-price">${item.price.toFixed(2)} each</p>
              </div>
              <div className="qty-control">
                <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} aria-label="Decrease">−</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} aria-label="Increase">+</button>
              </div>
              <button className="btn-danger btn-sm" onClick={() => removeItem(item.productId)}>Remove</button>
            </div>
          ))}
        </div>

        <div className="summary-card">
          <div className="summary-row"><span>Subtotal</span><span>${itemsTotal.toFixed(2)}</span></div>
          <div className="summary-row"><span>Shipping</span><span>{shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}</span></div>
          <div className="summary-row total"><span>Total</span><span>${(itemsTotal + shippingFee).toFixed(2)}</span></div>
          <button
            className="btn btn-primary btn-block"
            style={{ marginTop: 16 }}
            onClick={() => navigate(user ? '/checkout' : '/login')}
          >
            {user ? 'Checkout' : 'Log in to checkout'}
          </button>
        </div>
      </div>
    </div>
  );
}
