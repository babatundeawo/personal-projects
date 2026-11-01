import { useState } from 'react';
import AdminProducts from './AdminProducts.jsx';
import AdminOrders from './AdminOrders.jsx';

export default function AdminDashboard() {
  const [tab, setTab] = useState('products');

  return (
    <div className="page">
      <h1 style={{ marginBottom: 20 }}>Admin dashboard</h1>
      <div className="admin-tabs">
        <button className={`admin-tab ${tab === 'products' ? 'active' : ''}`} onClick={() => setTab('products')}>
          Products
        </button>
        <button className={`admin-tab ${tab === 'orders' ? 'active' : ''}`} onClick={() => setTab('orders')}>
          Orders
        </button>
      </div>
      {tab === 'products' ? <AdminProducts /> : <AdminOrders />}
    </div>
  );
}
