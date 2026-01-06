import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MdArrowBack, MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { FaGoogle } from 'react-icons/fa';
import DarkVeil from '../defaultcomponents/DarkVeil';

export default function Login() {
    const [formData, setFormData] = useState({
        username_or_email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Store token or user data
                localStorage.setItem('token', data.access_token || data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                // Notify App of authentication change
                window.dispatchEvent(new Event('auth-change'));

                // Redirect to home or dashboard
                navigate('/');
            } else {
                setError(data.detail || data.message || 'Login failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full relative flex items-center justify-center px-4 py-12">


            {/* Back to Home */}


            {/* Main Card */}
            <div className="relative z-10 w-full max-w-sm mt-0 md:mt-10">
                {/* Expansive Ambient Glow (Behind) */}
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full h-64 bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none -z-10" />

                {/* Glass Card */}
                <div className="relative bg-gray-900/50 backdrop-blur-2xl rounded-2xl border border-white/10 p-6 shadow-2xl">
                    {/* Sharp Top-Edge Highlight */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px w-1/3 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent blur-[2px] z-10" />
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">
                            Welcome Back
                        </h1>
                        <p className="text-gray-400 text-xs font-light">
                            Enter your credentials to access your account
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                            <p className="text-red-400 text-sm text-center">{error}</p>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Username/Email Field */}
                        <div className="group">
                            <label className="block text-[11px] font-medium text-gray-300 mb-1">
                                Username or Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <MdPerson className="h-5 w-5 text-gray-500 group-focus-within:text-cyan-500/70 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    name="username_or_email"
                                    value={formData.username_or_email}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/40 focus:bg-white/[0.08] transition-all text-sm"
                                    placeholder="Username or Email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="group">
                            <div className="flex items-center justify-between mb-1">
                                <label className="block text-[11px] font-medium text-gray-300">
                                    Password
                                </label>
                                <Link
                                    to="/forgot-password"
                                    className="text-[10px] text-cyan-400 hover:text-cyan-300 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <MdLock className="h-5 w-5 text-gray-500 group-focus-within:text-cyan-500/70 transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/40 focus:bg-white/[0.08] transition-all text-sm"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>



                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full group relative py-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-500 overflow-hidden"
                        >
                            {/* Subtle Inner Glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            {/* Button Content */}
                            <span className="relative z-10 flex items-center justify-center gap-2 text-white/90 group-hover:text-white font-medium tracking-wide text-sm transition-colors">
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
                                        <span>Authenticating...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Sign In</span>
                                    </>
                                )}
                            </span>
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-4 flex items-center">
                        <div className="flex-1 h-px bg-gray-700/50" />
                        <span className="px-4 text-[10px] text-gray-500">Or continue with</span>
                        <div className="flex-1 h-px bg-gray-700/50" />
                    </div>

                    {/* Social Login */}
                    <div className="flex flex-col gap-3">
                        <button className="group relative w-full py-2.5 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/10 transition-all duration-300">
                            <div className="flex items-center justify-center gap-2">
                                <FaGoogle className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                                <span className="text-xs text-gray-400 group-hover:text-white">Sign in with Google</span>
                            </div>
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="mt-4 text-center">
                        <p className="text-gray-400 text-sm">
                            Don't have an account?{' '}
                            <Link
                                to="/signup"
                                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Floating Particles */}
                <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10"
                            style={{
                                width: `${Math.random() * 4 + 1}px`,
                                height: `${Math.random() * 4 + 1}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                                animationDelay: `${Math.random() * 5}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* CSS Animation */}
            <style jsx="true">{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
      `}</style>
        </div>
    );
}