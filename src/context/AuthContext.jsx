
import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const useAuthAction = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (actionCallback, message) => {
    if (!user) {
      navigate('/auth', { state: { message: message || 'Devi accedere per eseguire questa azione.' } });
    } else {
      actionCallback();
    }
  };
};

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isGuest, setIsGuest] = useState(() => {
    return localStorage.getItem('isGuest') === 'true';
  });

  const setGuestMode = () => {
    setIsGuest(true);
    localStorage.setItem('isGuest', 'true');
  };

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find(u => u.email === userData.email)) {
      throw new Error('Email già registrata');
    }
    
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));

    login(userData.email, userData.password);
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      setIsGuest(false);
      localStorage.removeItem('isGuest');
      return true;
    }
    throw new Error('Credenziali non valide');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    setIsGuest(false);
    localStorage.removeItem('isGuest');
  };

  return (
    <AuthContext.Provider value={{ user, isGuest, setGuestMode, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
