import { useEffect, useState } from 'react';
import { orderService } from '../services/orderService.js';

const STEPS = ['processing', 'shipped', 'delivered'];

function StatusTracker({ status }) {
  if (status === 'cancelled') {
    return <span className="status-chip status-cancelled">Cancelled</span>;
  }
  const currentIdx = STEPS.indexOf(status);
  return (
    <div>
      <span className={`status-chip status-${status}`}>{status}</span>
      <div className="tracker">
        {STEPS.map((s, i) => (
          <div key={s} className={`tracker-step ${i <= currentIdx ? 'done' : ''}`} />
        ))}
      </div>
    </div>
  );
}

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderService.mine().then((d) => setOrders(d.orders)).finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="loading-block">Loading your orders…</p>;

  return (
    <div className="page">
      <h1 style={{ marginBottom: 24 }}>Order history</h1>
      {orders.length === 0 ? (
        <p className="empty-note">No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-head">
              <div>
                <strong>#{order._id.slice(-8).toUpperCase()}</strong>
                <p style={{ fontSize: '.8rem', color: 'var(--ink-dim)' }}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <StatusTracker status={order.status} />
            </div>
            {order.items.map((item) => (
              <div className="summary-row" key={item.product}>
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="summary-row total"><span>Total</span><span>${order.total.toFixed(2)}</span></div>
          </div>
        ))
      )}
    </div>
  );
}
