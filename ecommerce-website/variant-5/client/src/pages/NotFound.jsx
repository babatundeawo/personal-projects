import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page" style={{ textAlign: 'center' }}>
      <h1 style={{ marginBottom: 12 }}>Page not found</h1>
      <p style={{ color: 'var(--ink-dim)', marginBottom: 20 }}>That page doesn't exist.</p>
      <Link to="/" className="btn btn-primary">Back home</Link>
    </div>
  );
}
