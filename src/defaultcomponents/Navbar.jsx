import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ isLoggedIn }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('auth-change'));
        navigate('/');
    };

    const navItems = isLoggedIn
        ? ["Products", "About Us", "Profile", "Logout"]
        : ["About Us", "Login", "Signup", "Github"];

    return (
        <>
            <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 sm:px-12 pointer-events-none">
                <nav className="w-full max-w-2xl transition-all duration-500 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl py-4 shadow-[0_8px_32px_rgba(0,0,0,0.2)] pointer-events-auto">
                    <div className="px-6 sm:px-10 flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <span className="text-[12px] text-white tracking-tighter font-sneaket block">
                                S N E A K E T
                            </span>
                        </Link>

                        {/* Navigation Links - Desktop */}
                        <div className="hidden md:flex items-center gap-10">
                            {navItems.map((item) => (
                                item === "Logout" ? (
                                    <button
                                        key={item}
                                        onClick={handleLogout}
                                        className="text-[10px] font-semibold text-gray-400 hover:text-white transition-all tracking-[0.2em] uppercase font-mono relative group"
                                    >
                                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-500 transition-all duration-300 group-hover:w-full" />
                                        {item}
                                    </button>
                                ) : item === "Login" || item === "Signup" || item === "Products" ? (
                                    <Link
                                        key={item}
                                        to={`/${item.toLowerCase()}`}
                                        className="text-[10px] font-semibold text-gray-400 hover:text-white transition-all tracking-[0.2em] uppercase font-mono relative group"
                                    >
                                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-500 transition-all duration-300 group-hover:w-full" />
                                        {item}
                                    </Link>
                                ) : (
                                    <a
                                        key={item}
                                        href={`#${item.toLowerCase().replace(' ', '-')}`}
                                        className="text-[10px] font-semibold text-gray-400 hover:text-white transition-all tracking-[0.2em] uppercase font-mono relative group"
                                    >
                                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-500 transition-all duration-300 group-hover:w-full" />
                                        {item}
                                    </a>
                                )
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 sm:gap-8">
                            {/* Mobile Menu Toggle */}
                            <button
                                className="md:hidden text-white/70 hover:text-white transition-colors"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                    </svg>
                                )}
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
            <div className={`fixed top-0 right-0 h-full w-full md:max-w-sm bg-gradient-to-br from-gray-900 via-gray-950 to-black border-l border-white/10 z-[70] md:hidden transform transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Close Button */}
                <div className="absolute top-8 right-6">
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
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
                        <p className="text-xs text-gray-500 font-mono mt-2 tracking-widest">THE SNEAKER MARKET</p>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex flex-col gap-8 font-mono">
                        {navItems.map((item, index) => (
                            item === "Logout" ? (
                                <button
                                    key={item}
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="group relative text-sm text-white/60 hover:text-red-400 transition-all duration-300 text-left"
                                    style={{
                                        animation: isMenuOpen ? `slideInRight 0.3s ease-out ${index * 0.1}s both` : 'none'
                                    }}
                                >
                                    <span className="flex items-center gap-3">
                                        <span className="w-0 h-px bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300 group-hover:w-8" />
                                        {item}
                                    </span>
                                </button>
                            ) : item === "Login" || item === "Signup" || item === "Products" ? (
                                <Link
                                    key={item}
                                    to={`/${item.toLowerCase()}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="group relative text-sm text-white/60 hover:text-cyan-400 transition-all duration-300"
                                    style={{
                                        animation: isMenuOpen ? `slideInRight 0.3s ease-out ${index * 0.1}s both` : 'none'
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
                                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="group relative text-sm text-white/60 hover:text-cyan-400 transition-all duration-300"
                                    style={{
                                        animation: isMenuOpen ? `slideInRight 0.3s ease-out ${index * 0.1}s both` : 'none'
                                    }}
                                >
                                    <span className="flex items-center gap-3">
                                        <span className="w-0 h-px bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300 group-hover:w-8" />
                                        {item}
                                    </span>
                                </a>
                            )
                        ))}
                    </nav>

                    {/* Bottom Section */}
                    <div className="mt-auto pb-12">
                        <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 backdrop-blur-xl">
                            <p className="text-xs text-gray-400 font-mono mb-2">STAY CONNECTED</p>
                            <p className="text-sm text-white font-semibold">Join the future of footwear</p>
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
