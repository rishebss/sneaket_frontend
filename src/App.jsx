import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./defaultcomponents/Navbar";
import Home from "./userpages/Home";
import Landing from "./defaultpages/Landing";
import Login from "./defaultpages/Login";
import Signup from "./defaultpages/Signup";
import Products from "./userpages/Products";
import Favorites from "./userpages/Favorites";
import PageTransition from "./components/PageTransition";

function App() {
  // Initialize state from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // Effect to listen for login/logout events
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", checkAuth);
    window.addEventListener("auth-change", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("auth-change", checkAuth);
    };
  }, []);

  // Shared content logic to avoid duplication
  const AppContent = () => {
    const location = useLocation();

    return (
      <>
        {/* Global Navbar */}
        <Navbar isLoggedIn={isLoggedIn} />

        {/* Page Content */}
        <main className="relative">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageTransition>
                    {isLoggedIn ? <Home /> : <Landing />}
                  </PageTransition>
                }
              />
              <Route
                path="/landing"
                element={
                  <PageTransition>
                    <Landing />
                  </PageTransition>
                }
              />
              <Route
                path="/products"
                element={
                  <PageTransition>
                    <Products />
                  </PageTransition>
                }
              />
              <Route
                path="/favorites"
                element={
                  <PageTransition>
                    {isLoggedIn ? <Favorites /> : <Navigate to="/login" replace />}
                  </PageTransition>
                }
              />
              <Route
                path="/login"
                element={
                  <PageTransition>
                    {isLoggedIn ? <Navigate to="/" replace /> : <Login />}
                  </PageTransition>
                }
              />
              <Route
                path="/signup"
                element={
                  <PageTransition>
                    {isLoggedIn ? <Navigate to="/" replace /> : <Signup />}
                  </PageTransition>
                }
              />
              {/* Catch-all route to redirect back to home if page not found */}
              <Route
                path="*"
                element={
                  <PageTransition>
                    <Navigate to="/" replace />
                  </PageTransition>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>
      </>
    );
  };

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
              backgroundSize: "50px 50px",
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
