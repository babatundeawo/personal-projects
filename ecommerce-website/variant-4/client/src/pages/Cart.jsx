import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Cart.css';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { user } = useAuth();

  if (cart.length === 0) {
    return (
      <div className="container empty-state">
        <i className="fas fa-cart-shopping"></i>
        <p>Your cart is empty</p>
        <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <div className="page-header">
        <h1>Shopping Cart</h1>
        <button className="btn btn-sm btn-outline" onClick={clearCart}>Clear Cart</button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item card">
              <img src={item.image} alt={item.name} />
              <div className="item-info">
                <Link to={`/products/${item.id}`} className="item-name">{item.name}</Link>
                <p className="item-price">${item.price.toFixed(2)}</p>
                <div className="item-actions">
                  <div className="qty-control">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              <div className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary card">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{totalPrice >= 50 ? 'Free' : '$5.99'}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${(totalPrice + (totalPrice >= 50 ? 0 : 5.99)).toFixed(2)}</span>
          </div>
          <Link
            to={user ? '/checkout' : '/login'}
            className="btn btn-primary checkout-btn"
          >
            {user ? 'Proceed to Checkout' : 'Login to Checkout'}
          </Link>
        </div>
      </div>
    </div>
  );
}
