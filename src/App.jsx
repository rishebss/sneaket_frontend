import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './defaultcomponents/Navbar';
import Home from './userpages/Home';
import Landing from './defaultpages/Landing';
import Login from './defaultpages/Login';
import Signup from './defaultpages/Signup';

import Products from './userpages/Products';

function App() {
  // Initialize state from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // Effect to listen for login/logout events
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', checkAuth);
    window.addEventListener('auth-change', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('auth-change', checkAuth);
    };
  }, []);

  // Shared content logic to avoid duplication
  const AppContent = () => (
    <>
      {/* Global Navbar */}
      <Navbar isLoggedIn={isLoggedIn} />

      {/* Page Content */}
      <main className="relative">
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Landing />}
          />
          <Route path="/landing" element={<Landing />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/signup"
            element={isLoggedIn ? <Navigate to="/" replace /> : <Signup />}
          />
          {/* Catch-all route to redirect back to home if page not found */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );

  return (
    <Router>
      {isLoggedIn ? (
        <div className="min-h-screen w-full relative bg-gradient-to-br from-gray-950 via-gray-900 to-black overflow-hidden">
          {/* Global Background Elements - Only for Logged In Users */}
          <div
            className="absolute inset-0 z-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-full blur-3xl opacity-50" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

          <AppContent />
        </div>
      ) : (
        <div className="min-h-screen w-full relative bg-black overflow-hidden">
          <AppContent />
        </div>
      )}
    </Router>
  );
}

export default App;