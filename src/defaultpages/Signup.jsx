import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MdEmail, MdLock, MdPerson, MdBadge } from 'react-icons/md';
import { FaGoogle } from 'react-icons/fa';

export default function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        // Clear errors for the field being changed
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
        setGeneralError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});
        setGeneralError('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Store token or user data
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                // Notify App of authentication change
                window.dispatchEvent(new Event('auth-change'));

                // Redirect to home or dashboard
                navigate('/');
            } else {
                if (response.status === 400) {
                    setErrors(data); // Django returns field-specific errors in 400
                } else {
                    setGeneralError(data.detail || data.message || 'Registration failed');
                }
            }
        } catch (err) {
            setGeneralError('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full relative flex items-center justify-center px-4 py-12">
            {/* Main Card */}
            <div className="relative z-10 w-full max-w-md mt-0 md:mt-10">
                {/* Expansive Ambient Glow (Behind) */}
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full h-64 bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none -z-10" />

                {/* Glass Card */}
                <div className="relative bg-gray-900/50 backdrop-blur-2xl rounded-2xl border border-white/10 p-5 md:p-7 shadow-2xl">
                    {/* Sharp Top-Edge Highlight */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px w-1/3 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent blur-[2px] z-10" />
                    {/* Header */}
                    <div className="text-center mb-4 md:mb-6">
                        <h1 className="text-xl font-semibold text-white tracking-tight mb-1">
                            Create Account
                        </h1>
                        
                    </div>

                    {/* General Error Message */}
                    {generalError && (
                        <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                            <p className="text-red-400 text-sm text-center">{generalError}</p>
                        </div>
                    )}

                    {/* Signup Form */}
                    <form onSubmit={handleSubmit} className="space-y-2 md:space-y-3">
                        {/* Name Fields (Row) */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="group">
                                <label className="block text-[11px] font-medium text-gray-300 mb-1">
                                    
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <MdBadge className="h-5 w-5 text-gray-500 group-focus-within:text-cyan-500/70 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        className={`w-full pl-11 pr-4 py-1.5 md:py-2 bg-white/5 border ${errors.first_name ? 'border-red-500/50' : 'border-white/10'} rounded-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/40 focus:bg-white/[0.08] transition-all text-md`}
                                        placeholder="First Name"
                                        required
                                    />
                                </div>
                                {errors.first_name && <p className="text-red-500 text-[10px] mt-1">{errors.first_name[0]}</p>}
                            </div>
                            <div className="group">
                                <label className="block text-[11px] font-medium text-gray-300 mb-1">
                                   
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <MdBadge className="h-5 w-5 text-gray-500 group-focus-within:text-cyan-500/70 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        className={`w-full pl-11 pr-4 py-1.5 md:py-2 bg-white/5 border ${errors.last_name ? 'border-red-500/50' : 'border-white/10'} rounded-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/40 focus:bg-white/[0.08] transition-all text-md`}
                                        placeholder="Last Name"
                                        required
                                    />
                                </div>
                                {errors.last_name && <p className="text-red-500 text-[10px] mt-1">{errors.last_name[0]}</p>}
                            </div>
                        </div>

                        {/* Username Field */}
                        <div className="group">
                            <label className="block text-[11px] font-medium text-gray-300 mb-1 mt-4">
                               
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <MdPerson className="h-5 w-5 text-gray-500 group-focus-within:text-cyan-500/70 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className={`w-full pl-11 pr-4 py-1.5 md:py-2 bg-white/5 border ${errors.username ? 'border-red-500/50' : 'border-white/10'} rounded-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/40 focus:bg-white/[0.08] transition-all text-md`}
                                    placeholder="johndoe123"
                                    required
                                />
                            </div>
                            {errors.username && <p className="text-red-500 text-[10px] mt-1">{errors.username[0]}</p>}
                        </div>

                        {/* Email Field */}
                        <div className="group">
                            <label className="block text-[11px] font-medium text-gray-300 mb-1 mt-4">
                               
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <MdEmail className="h-5 w-5 text-gray-500 group-focus-within:text-cyan-500/70 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full pl-11 pr-4 py-1.5 md:py-2 bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/40 focus:bg-white/[0.08] transition-all text-md`}
                                    placeholder="Mail"
                                    required
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email[0]}</p>}
                        </div>

                        {/* Password Field */}
                        <div className="group">
                            <label className="block text-[11px] font-medium text-gray-300 mb-1 mt-4">
                              
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <MdLock className="h-5 w-5 text-gray-500 group-focus-within:text-cyan-500/70 transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full pl-11 pr-4 py-1.5 md:py-2 bg-white/5 border ${errors.password ? 'border-red-500/50' : 'border-white/10'} rounded-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/40 focus:bg-white/[0.08] transition-all text-md`}
                                    placeholder="Password"
                                    required
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-[10px] mt-1">{errors.password[0]}</p>}
                        </div>

                        {/* Signup Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full group relative py-2 md:py-2.5 mt-4 rounded-sm bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-500 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <span className="relative z-10 flex items-center justify-center gap-2 text-white/90 group-hover:text-white font-medium tracking-wide text-md transition-colors">
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
                                        <span>Creating Account...</span>
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </span>
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-3 md:my-4 flex items-center">
                        <div className="flex-1 h-px bg-gray-700/50" />
                        <span className="px-4 text-[10px] text-gray-500 uppercase tracking-widest">Or</span>
                        <div className="flex-1 h-px bg-gray-700/50" />
                    </div>

                    {/* Social Signup */}
                    <div className="flex flex-col gap-3">
                        <button className="group relative w-full py-2 md:py-2.5 bg-white/5 border border-white/10 rounded-sm hover:border-white/20 hover:bg-white/10 transition-all duration-300">
                            <div className="flex items-center justify-center gap-2">
                                <FaGoogle className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                                <span className="text-md text-gray-400 group-hover:text-white">Sign up with Google</span>
                            </div>
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className="mt-3 md:mt-4 text-center">
                        <p className="text-gray-400 text-sm">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                            >
                                Sign in
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
