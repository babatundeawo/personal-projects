import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Orders.css';

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('shopease-orders') || '[]');
    setOrders(all.filter(o => o.userId === user.id));
  }, [user]);

  if (orders.length === 0) {
    return (
      <div className="container empty-state">
        <i className="fas fa-box"></i>
        <p>No orders yet</p>
        <Link to="/products" className="btn btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container orders-page">
      <div className="page-header">
        <h1>My Orders</h1>
      </div>
      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card card">
            <div className="order-header">
              <div>
                <span className="order-id">{order.id}</span>
                <span className="order-date">
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric'
                  })}
                </span>
              </div>
              <span className={`status badge ${
                order.status === 'Delivered' ? 'badge-success' :
                order.status === 'Shipped' ? 'badge-warning' : 'badge-warning'
              }`}>
                {order.status}
              </span>
            </div>
            <div className="order-items">
              {order.items.map(item => (
                <div key={item.id} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p className="name">{item.name}</p>
                    <p className="meta">Qty: {item.quantity} · ${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="order-footer">
              <span>Ship to: {order.address}</span>
              <strong>Total: ${order.total.toFixed(2)}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
