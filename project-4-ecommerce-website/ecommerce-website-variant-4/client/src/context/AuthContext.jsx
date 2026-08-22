import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('shopease-user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem('shopease-user');
      }
    }
    setLoading(false);
  }, []);

  const register = (name, email, password) => {
    // Simulated registration – in real app this hits the backend
    const users = JSON.parse(localStorage.getItem('shopease-users') || '[]');
    if (users.some(u => u.email === email)) {
      return { success: false, message: 'Email already registered' };
    }
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      // Never store plain passwords in production – this is demo only
      password,
      role: email === 'admin@shopease.com' ? 'admin' : 'customer',
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('shopease-users', JSON.stringify(users));

    const session = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
    localStorage.setItem('shopease-user', JSON.stringify(session));
    setUser(session);
    return { success: true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('shopease-users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) {
      return { success: false, message: 'Invalid email or password' };
    }
    const session = { id: found.id, name: found.name, email: found.email, role: found.role };
    localStorage.setItem('shopease-user', JSON.stringify(session));
    setUser(session);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('shopease-user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
