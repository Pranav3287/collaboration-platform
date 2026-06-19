import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect: load saved user from localStorage on app start
  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  function loginUser(authData) {
    localStorage.setItem('token', authData.token);
    const userData = {
      id: authData.id,
      name: authData.name,
      email: authData.email,
      role: authData.role,
    };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }

  const isAdmin = user?.role === 'ADMIN';
  const isMember = user?.role === 'MEMBER' || isAdmin;
  const isGuest = user?.role === 'GUEST';
  const canEdit = isAdmin || user?.role === 'MEMBER';

  return (
    <AuthContext.Provider value={{ user, loginUser, logout, loading, isAdmin, isMember, isGuest, canEdit }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
