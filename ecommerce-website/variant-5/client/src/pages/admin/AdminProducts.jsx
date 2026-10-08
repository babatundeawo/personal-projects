import { useEffect, useState } from 'react';
import { productService } from '../../services/productService.js';

const emptyForm = { name: '', description: '', price: '', category: '', stock: '' };

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  function load() {
    setLoading(true);
    productService.list({ limit: 48 }).then((d) => setProducts(d.products)).finally(() => setLoading(false));
  }
  useEffect(load, []);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function startEdit(product) {
    setEditingId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock)
    };
    try {
      if (editingId) {
        await productService.update(editingId, payload);
      } else {
        await productService.create(payload);
      }
      cancelEdit();
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this product?')) return;
    await productService.remove(id);
    load();
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-card" style={{ maxWidth: 520, marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.1rem', marginBottom: 16 }}>{editingId ? 'Edit product' : 'Add a product'}</h2>
        {error && <p className="form-error">{error}</p>}
        <div className="field">
          <label>Name</label>
          <input required value={form.name} onChange={(e) => updateField('name', e.target.value)} />
        </div>
        <div className="field">
          <label>Description</label>
          <textarea required rows={3} value={form.description} onChange={(e) => updateField('description', e.target.value)} />
        </div>
        <div className="address-grid">
          <div className="field">
            <label>Price ($)</label>
            <input required type="number" step="0.01" min="0" value={form.price} onChange={(e) => updateField('price', e.target.value)} />
          </div>
          <div className="field">
            <label>Stock</label>
            <input required type="number" min="0" value={form.stock} onChange={(e) => updateField('stock', e.target.value)} />
          </div>
        </div>
        <div className="field">
          <label>Category</label>
          <input required value={form.category} onChange={(e) => updateField('category', e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-primary">{editingId ? 'Save changes' : 'Add product'}</button>
          {editingId && <button type="button" className="btn btn-outline" onClick={cancelEdit}>Cancel</button>}
        </div>
      </form>

      {loading ? (
        <p className="loading-block">Loading products…</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>${p.price.toFixed(2)}</td>
                <td>{p.stock}</td>
                <td className="admin-actions">
                  <button className="btn btn-outline btn-sm" onClick={() => startEdit(p)}>Edit</button>
                  <button className="btn-danger btn-sm" onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
