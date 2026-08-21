import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Checkout.css';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    zip: '',
    card: '',
    expiry: '',
    cvv: ''
  });
  const [placed, setPlaced] = useState(false);

  const shipping = totalPrice >= 50 ? 0 : 5.99;
  const total = totalPrice + shipping;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate order placement
    const orders = JSON.parse(localStorage.getItem('shopease-orders') || '[]');
    const order = {
      id: 'ORD-' + Date.now().toString(36).toUpperCase(),
      userId: user.id,
      items: cart,
      total,
      shipping,
      status: 'Processing',
      address: `${form.address}, ${form.city}, ${form.zip}`,
      createdAt: new Date().toISOString()
    };
    orders.unshift(order);
    localStorage.setItem('shopease-orders', JSON.stringify(orders));
    clearCart();
    setPlaced(true);
  };

  if (cart.length === 0 && !placed) {
    navigate('/cart');
    return null;
  }

  if (placed) {
    return (
      <div className="container empty-state">
        <i className="fas fa-circle-check" style={{ color: 'var(--success)', fontSize: '3.5rem' }}></i>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your purchase. You can track your order in the Orders page.</p>
        <button className="btn btn-primary" onClick={() => navigate('/orders')}>
          View Orders
        </button>
      </div>
    );
  }

  return (
    <div className="container checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-layout">
        <form className="checkout-form card" onSubmit={handleSubmit}>
          <h3>Shipping Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-group">
            <label>Address</label>
            <input name="address" value={form.address} onChange={handleChange} required placeholder="Street address" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input name="city" value={form.city} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>ZIP Code</label>
              <input name="zip" value={form.zip} onChange={handleChange} required />
            </div>
          </div>

          <h3>Payment (Demo)</h3>
          <p className="demo-note">This is a simulated payment form. No real charges.</p>
          <div className="form-group">
            <label>Card Number</label>
            <input name="card" value={form.card} onChange={handleChange} required placeholder="4242 4242 4242 4242" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Expiry</label>
              <input name="expiry" value={form.expiry} onChange={handleChange} required placeholder="MM/YY" />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input name="cvv" value={form.cvv} onChange={handleChange} required placeholder="123" />
            </div>
          </div>

          <button type="submit" className="btn btn-primary place-btn">
            Place Order – ${total.toFixed(2)}
          </button>
        </form>

        <div className="order-summary card">
          <h3>Your Order</h3>
          {cart.map(item => (
            <div key={item.id} className="summary-item">
              <span>{item.name} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
