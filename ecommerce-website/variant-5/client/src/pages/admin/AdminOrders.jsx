import { useEffect, useState } from 'react';
import { orderService } from '../../services/orderService.js';

const STATUSES = ['processing', 'shipped', 'delivered', 'cancelled'];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    orderService.listAll().then((d) => setOrders(d.orders)).finally(() => setLoading(false));
  }
  useEffect(load, []);

  async function handleStatusChange(id, status) {
    await orderService.updateStatus(id, status);
    load();
  }

  if (loading) return <p className="loading-block">Loading orders…</p>;

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Order</th><th>Customer</th><th>Total</th><th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((o) => (
          <tr key={o._id}>
            <td>#{o._id.slice(-8).toUpperCase()}</td>
            <td>{o.user?.name || 'Unknown'} <br /><span style={{ color: 'var(--ink-dim)', fontSize: '.78rem' }}>{o.user?.email}</span></td>
            <td>${o.total.toFixed(2)}</td>
            <td>
              <select value={o.status} onChange={(e) => handleStatusChange(o._id, e.target.value)}>
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
