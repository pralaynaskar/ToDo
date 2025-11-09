import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TodoDashboard from './pages/TodoDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  if (isAuthenticated) {
    return <TodoDashboard onLogout={handleLogout} />;
  }

  return showLogin ? (
    <Login onLogin={handleLogin} switchToSignup={() => setShowLogin(false)} />
  ) : (
    <Signup switchToLogin={() => setShowLogin(true)} />
  );
}

export default App;
