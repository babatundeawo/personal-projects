import { products } from '../services/products';
import './Admin.css';

export default function Admin() {
  return (
    <div className="container admin-page">
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p className="subtitle">Demo view – connect a real backend for full CRUD</p>
      </div>

      <div className="admin-stats">
        <div className="stat-card card">
          <i className="fas fa-box"></i>
          <div>
            <span className="stat-value">{products.length}</span>
            <span className="stat-label">Products</span>
          </div>
        </div>
        <div className="stat-card card">
          <i className="fas fa-users"></i>
          <div>
            <span className="stat-value">—</span>
            <span className="stat-label">Users</span>
          </div>
        </div>
        <div className="stat-card card">
          <i className="fas fa-receipt"></i>
          <div>
            <span className="stat-value">—</span>
            <span className="stat-label">Orders</span>
          </div>
        </div>
      </div>

      <h2>Products</h2>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td><img src={p.image} alt="" className="thumb" /></td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>${p.price.toFixed(2)}</td>
                <td>{p.stock}</td>
                <td>{p.rating} ★</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
