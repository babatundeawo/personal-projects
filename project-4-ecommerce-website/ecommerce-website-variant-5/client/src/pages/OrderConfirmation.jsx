import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../services/orderService.js';

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    orderService.get(id).then((d) => setOrder(d.order));
  }, [id]);

  if (!order) return <p className="loading-block">Loading your order…</p>;

  return (
    <div className="page" style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ fontSize: '2.4rem', marginBottom: 8 }}>✓</p>
      <h1 style={{ marginBottom: 10 }}>Order confirmed</h1>
      <p style={{ color: 'var(--ink-dim)', marginBottom: 24 }}>
        Order <strong>#{order._id.slice(-8).toUpperCase()}</strong> has been placed and is now processing.
      </p>

      <div className="order-card" style={{ textAlign: 'left' }}>
        {order.items.map((item) => (
          <div className="summary-row" key={item.product}>
            <span>{item.name} × {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="summary-row total"><span>Total</span><span>${order.total.toFixed(2)}</span></div>
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
        <Link to="/orders" className="btn btn-primary">View order history</Link>
        <Link to="/shop" className="btn btn-outline">Continue shopping</Link>
      </div>
    </div>
  );
}
