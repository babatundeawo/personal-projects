import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate(location.state?.from || '/');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="page" style={{ display: 'flex', justifyContent: 'center' }}>
      <form className="form-card" onSubmit={handleSubmit}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: 20 }}>Welcome back</h1>
        {error && <p className="form-error">{error}</p>}
        <div className="field">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary btn-block" disabled={loading}>
          {loading ? 'Logging in…' : 'Log in'}
        </button>
        <p className="form-note">
          New here? <Link to="/register" style={{ color: 'var(--accent)', fontWeight: 600 }}>Create an account</Link>
        </p>
        <p className="form-note" style={{ marginTop: 6 }}>
          Admin demo: admin@example.com / admin123 (after running the seed script)
        </p>
      </form>
    </div>
  );
}
