import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdBubbleChart } from "react-icons/md";
import { HiOutlineSparkles } from "react-icons/hi2";
import AskAIButton from "../ai/components/AskAIButton";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => setIsLoggedIn(!!localStorage.getItem("token"));
    window.addEventListener("storage", checkAuth);
    window.addEventListener("auth-change", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("auth-change", checkAuth);
    };
  }, []);

  // Keep cart badge in sync
  useEffect(() => {
    if (!isLoggedIn) {
      setCartCount(0);
      return;
    }
    const fetchCount = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/cart/count/`,
          { headers: { Authorization: `Token ${token}` } }
        );
        if (res.ok) {
          const data = await res.json();
          setCartCount(data.count || 0);
        }
      } catch {
        // ignore
      }
    };
    fetchCount();
    const onCartChange = (e) =>
      setCartCount((c) => e.detail?.count ?? c + 1);
    window.addEventListener("cart-change", onCartChange);
    window.addEventListener("auth-change", fetchCount);
    return () => {
      window.removeEventListener("cart-change", onCartChange);
      window.removeEventListener("auth-change", fetchCount);
    };
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-change"));
    navigate("/");
  };

  const navItems = isLoggedIn
    ? ["Products", "Favorites", "Cart", "About Us", "Profile", "Logout"]
    : ["About Us", "Login", "Signup", "Github"];

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 sm:px-12 pointer-events-none">
        <nav className={`relative w-full max-w-2xl ${isLoggedIn ? "md:max-w-5xl" : "md:max-w-3xl"} transition-all duration-500 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl py-2.5 md:py-4 shadow-[0_8px_32px_rgba(0,0,0,0.2)] pointer-events-auto`}>
          <div className="px-6 sm:px-10 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className="text-[12px] text-white tracking-tighter font-sneaket block">
                S N E A K E T
              </span>
            </Link>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) =>
                item === "Logout" ? (
                  <button
                    key={item}
                    onClick={handleLogout}
                    className="text-[10px] font-semibold text-gray-400 hover:text-white transition-all tracking-[0.2em] uppercase font-mono relative group"
                  >
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-500 transition-all duration-300 group-hover:w-full" />
                    {item}
                  </button>
                ) : item === "Cart" ? (
                  <Link
                    key={item}
                    to="/cart"
                    className="text-[10px] font-semibold text-gray-400 hover:text-white transition-all tracking-[0.2em] uppercase font-mono relative group flex items-center gap-1"
                  >
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-500 transition-all duration-300 group-hover:w-full" />
                    {item}
                    {cartCount > 0 && (
                      <span className="min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-blue-500/20 border border-blue-500/50 text-blue-400 text-[10px] font-mono leading-none">
                        {cartCount > 99 ? "99+" : cartCount}
                      </span>
                    )}
                  </Link>
                ) : item === "Login" ||
                  item === "Signup" ||
                  item === "Products" ||
                  item === "Favorites" ||
                  item === "About Us" ||
                  item === "Profile" ? (
                  <Link
                    key={item}
                    to={
                      item === "About Us"
                        ? "/about"
                        : item === "Profile"
                        ? "/accounts"
                        : `/${item.toLowerCase()}`
                    }
                    className="text-[10px] font-semibold text-gray-400 hover:text-white transition-all tracking-[0.2em] uppercase font-mono relative group"
                  >
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-500 transition-all duration-300 group-hover:w-full" />
                    {item}
                  </Link>
                ) : (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-[10px] font-semibold text-gray-400 hover:text-white transition-all tracking-[0.2em] uppercase font-mono relative group"
                  >
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-500 transition-all duration-300 group-hover:w-full" />
                    {item}
                  </a>
                ),
              )}
            </div>

            {/* Right side: Ask AI + Mobile menu */}
            <div className="flex items-center gap-5 sm:gap-8">
              <AskAIButton />
              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden flex items-center justify-center -mr-[14px] sm:-mr-[30px] w-9 h-9 rounded-full border border-white/10 bg-white/5 text-white hover:text-white hover:bg-white/10 transition-all"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
              >
                <MdBubbleChart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu - Full Screen Slide from Right */}
      {/* Backdrop Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Slide-in Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:max-w-sm bg-gradient-to-br from-gray-900 via-gray-950 to-black border-l border-white/10 z-[70] md:hidden transform transition-transform duration-300 ease-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close Button */}
        <div className="absolute top-8 right-6">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex flex-col h-full pt-24 px-8">
          {/* Logo */}
          <div className="mb-12">
            <span className="text-xl text-white tracking-tighter font-sneaket block">
              S N E A K E T
            </span>
            <p className="text-xs text-gray-500 font-mono mt-2 tracking-widest">
              THE SNEAKER MARKET
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-8 font-mono">
            {navItems.map((item, index) =>
              item === "Logout" ? (
                <button
                  key={item}
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="group relative text-sm text-white/60 hover:text-red-400 transition-all duration-300 text-left"
                  style={{
                    animation: isMenuOpen
                      ? `slideInRight 0.3s ease-out ${index * 0.1}s both`
                      : "none",
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-0 h-px bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300 group-hover:w-8" />
                    {item}
                  </span>
                </button>
              ) : item === "Cart" ? (
                <Link
                  key={item}
                  to="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className="group relative text-sm text-white/60 hover:text-cyan-400 transition-all duration-300 flex items-center gap-2"
                  style={{
                    animation: isMenuOpen
                      ? `slideInRight 0.3s ease-out ${index * 0.1}s both`
                      : "none",
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-0 h-px bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300 group-hover:w-8" />
                    {item}
                  </span>
                  {cartCount > 0 && (
                    <span className="min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-blue-500/20 border border-blue-500/50 text-blue-400 text-[10px] font-mono leading-none">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Link>
              ) : item === "Login" ||
                item === "Signup" ||
                item === "Products" ||
                item === "Favorites" ||
                item === "About Us" ||
                item === "Profile" ? (
                <Link
                  key={item}
                  to={
                    item === "About Us"
                      ? "/about"
                      : item === "Profile"
                      ? "/accounts"
                      : `/${item.toLowerCase()}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                  className="group relative text-sm text-white/60 hover:text-cyan-400 transition-all duration-300"
                  style={{
                    animation: isMenuOpen
                      ? `slideInRight 0.3s ease-out ${index * 0.1}s both`
                      : "none",
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-0 h-px bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300 group-hover:w-8" />
                    {item}
                  </span>
                </Link>
              ) : (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="group relative text-sm text-white/60 hover:text-cyan-400 transition-all duration-300"
                  style={{
                    animation: isMenuOpen
                      ? `slideInRight 0.3s ease-out ${index * 0.1}s both`
                      : "none",
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-0 h-px bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300 group-hover:w-8" />
                    {item}
                  </span>
                </a>
              ),
             )}
          </nav>

          {/* Bottom Section */}
          <div className="mt-auto pb-12">
            <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 backdrop-blur-xl">
              <p className="text-xs text-gray-400 font-mono mb-2">
                STAY CONNECTED
              </p>
              <p className="text-sm text-white font-semibold">
                Join the future of footwear
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* Add animation keyframes */}
      <style>{`
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
    </>
  );
}
