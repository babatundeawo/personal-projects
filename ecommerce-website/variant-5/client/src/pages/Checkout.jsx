import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { orderService } from '../services/orderService.js';

export default function Checkout() {
  const { items, itemsTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState({ line1: '', city: '', state: '', postalCode: '', country: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const shippingFee = itemsTotal > 100 ? 0 : 7.99;

  function updateField(field, value) {
    setAddress((prev) => ({ ...prev, [field]: value }));
  }

  async function handlePlaceOrder(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const payload = {
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        shippingAddress: address
      };
      const { order } = await orderService.place(payload);
      clearCart();
      navigate(`/order-confirmation/${order._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return <div className="page"><p className="empty-note">Your cart is empty.</p></div>;
  }

  return (
    <div className="page">
      <h1 style={{ marginBottom: 24 }}>Checkout</h1>
      <form onSubmit={handlePlaceOrder} className="checkout-grid">
        <div>
          <h2 style={{ fontSize: '1.1rem', marginBottom: 16 }}>Shipping address</h2>
          {error && <p className="form-error">{error}</p>}
          <div className="field">
            <label>Address line</label>
            <input required value={address.line1} onChange={(e) => updateField('line1', e.target.value)} />
          </div>
          <div className="address-grid">
            <div className="field">
              <label>City</label>
              <input required value={address.city} onChange={(e) => updateField('city', e.target.value)} />
            </div>
            <div className="field">
              <label>State / Region</label>
              <input required value={address.state} onChange={(e) => updateField('state', e.target.value)} />
            </div>
            <div className="field">
              <label>Postal code</label>
              <input required value={address.postalCode} onChange={(e) => updateField('postalCode', e.target.value)} />
            </div>
            <div className="field">
              <label>Country</label>
              <input required value={address.country} onChange={(e) => updateField('country', e.target.value)} />
            </div>
          </div>

          <h2 style={{ fontSize: '1.1rem', margin: '24px 0 12px' }}>Payment</h2>
          <div className="mock-payment-note">
            This project uses a mocked payment step — placing the order below simulates a successful
            charge without contacting a real payment provider. To take real payments, wire this up to
            Stripe or Razorpay from <code>server/controllers/orderController.js</code> (see the comment
            at the top of <code>placeOrder</code>) and collect card details client-side with
            Stripe Elements before calling this endpoint.
          </div>

          <button className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? 'Placing order…' : `Place order — $${(itemsTotal + shippingFee).toFixed(2)}`}
          </button>
        </div>

        <div className="summary-card">
          <h3 style={{ fontSize: '1rem', marginBottom: 14 }}>Order summary</h3>
          {items.map((i) => (
            <div className="summary-row" key={i.productId}>
              <span>{i.name} × {i.quantity}</span>
              <span>${(i.price * i.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-row"><span>Shipping</span><span>{shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}</span></div>
          <div className="summary-row total"><span>Total</span><span>${(itemsTotal + shippingFee).toFixed(2)}</span></div>
        </div>
      </form>
    </div>
  );
}
