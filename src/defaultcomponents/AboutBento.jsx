import { motion } from "framer-motion";
import { FiBookOpen, FiUser, FiArrowRight, FiActivity, FiTerminal } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AboutBento({ variants }) {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

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

    return (
        <motion.div
            variants={variants}
            className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-32"
        >
            {/* Magazine Card */}
            <div className="md:col-span-4 h-80 group relative overflow-hidden border border-white/10 bg-white/[0.01] backdrop-blur-3xl transition-all duration-500 hover:bg-white/[0.03]">
                <div className="absolute inset-0 z-0 hidden md:block">
                    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110 left-1/3">
                        <img
                            src="/images/anime3.png"
                            alt="MAGAZINE"
                            className="w-full h-full object-contain object-right opacity-60 group-hover:opacity-60 transition-opacity duration-700"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent" />
                </div>

                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-purple-500" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-purple-500" />

                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="p-4 rounded-none border border-white/5 bg-black/40 backdrop-blur-xl text-purple-400 group-hover:border-white/10 transition-all duration-500">
                            <FiBookOpen className="size-6" />
                        </div>
                        <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.4em] pt-2">v.2.0.4</span>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-3xl font-lemon tracking-tight text-white mb-0.5">MAGAZINE</h3>
                            <p className="text-[10px] font-mono text-purple-400 opacity-80 tracking-[0.3em] mb-3 uppercase">CULTURE & ARCHIVE</p>
                            <p className="text-[11px] text-gray-500 font-mono leading-relaxed group-hover:text-gray-300 transition-colors uppercase tracking-wider mt-3 max-w-[80%]">
                                Deep dives into the silhouettes that defined street culture.
                            </p>
                        </div>
                        <div className="flex items-end justify-between pt-2">
                            <Link to="/magazine" className="inline-flex items-center gap-3 text-[10px] font-mono text-white/30 group-hover:text-white transition-all duration-300">
                                <span className="relative py-1">VIEW <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full" /></span>
                                <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-500" />
                            </Link>
                            <div className="hidden group-hover:block transition-all duration-700">
                                <FiActivity className="size-4 text-purple-400 opacity-30 animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Login/Account Card */}
            <div className="md:col-span-2 h-80 group relative overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-3xl transition-all duration-500">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-3xl opacity-100 transition-opacity duration-700" />
                </div>

                <div className={`absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20 transition-all duration-500 group-hover:w-6 group-hover:h-6 ${isLoggedIn ? 'group-hover:border-blue-500' : 'group-hover:border-cyan-500'}`} />
                <div className={`absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20 transition-all duration-500 group-hover:w-6 group-hover:h-6 ${isLoggedIn ? 'group-hover:border-blue-500' : 'group-hover:border-cyan-500'}`} />

                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className={`p-4 rounded-none border border-white/5 bg-black/40 backdrop-blur-xl ${isLoggedIn ? 'text-blue-400' : 'text-cyan-400'} group-hover:border-white/10 transition-all duration-500`}>
                            <FiUser className="size-6" />
                        </div>
                        <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.4em] pt-2">v.2.0.4</span>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-3xl font-lemon tracking-tight text-white mb-0.5">{isLoggedIn ? "ACCOUNT" : "LOGIN"}</h3>
                            <p className={`text-[10px] font-mono ${isLoggedIn ? 'text-blue-400' : 'text-cyan-400'} opacity-80 tracking-[0.3em] mb-3 uppercase`}>{isLoggedIn ? "YOUR PROFILE" : "JOIN THE COMMUNITY"}</p>
                            <p className="text-[11px] text-gray-500 font-mono leading-relaxed group-hover:text-gray-300 transition-colors uppercase tracking-wider mt-3">
                                {isLoggedIn ? "View your profile and track your recent activity." : "Join the network to access exclusive drops and personalized data."}
                            </p>
                        </div>
                        <div className="flex items-end justify-between pt-2">
                            <Link to={isLoggedIn ? "/profile" : "/login"} className="inline-flex items-center gap-3 text-[10px] font-mono text-white/30 group-hover:text-white transition-all duration-300">
                                <span className="relative py-1">VIEW <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full" /></span>
                                <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-500" />
                            </Link>
                            <div className="hidden group-hover:block transition-all duration-700">
                                <FiActivity className={`size-4 ${isLoggedIn ? 'text-blue-400' : 'text-cyan-400'} opacity-30 animate-pulse`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Manifesto / Terminal Card */}
            <div className="md:col-span-6 min-h-[300px] group relative overflow-hidden border border-white/10 bg-black/40 backdrop-blur-3xl transition-all duration-500 hover:bg-black/60">
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-cyan-500" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-cyan-500" />

                <div className="p-8 font-mono">
                    <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
                        <div className="flex gap-1.5">
                            <div className="size-2.5 rounded-full bg-red-500/50" />
                            <div className="size-2.5 rounded-full bg-amber-500/50" />
                            <div className="size-2.5 rounded-full bg-green-500/50" />
                        </div>
                        <div className="ml-4 flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest">
                            <FiTerminal className="size-3" />
                            <span>Sneaket.sys</span>
                        </div>
                        <div className="ml-auto text-[8px] text-white/5 tracking-[0.5em] uppercase hidden md:block">CORE_ARCH_v2.0</div>
                    </div>

                    <div className="space-y-6 text-sm md:text-base leading-relaxed">
                        <div className="flex gap-3">
                            <span className="text-cyan-500 opacity-50">$</span>
                            <p className="text-cyan-400/80 uppercase tracking-wider text-xs">INITIALIZING CULTURE_CORE...</p>
                        </div>

                        <div className="pl-6 border-l border-white/5 space-y-4">
                            <p className="text-gray-300 uppercase leading-loose tracking-wide">
                                WE ARE NOT MERELY A STORE. WE ARE THE GUARDIANS OF THE HYPE.
                                A SNEAKER IS NO LONGER JUST APPAREL; IT IS A STATEMENT, A GRAIL,
                                A PIECE OF THE NEW STREET ARCHIVE.
                            </p>
                            <p className="text-gray-400 uppercase tracking-widest text-xs">
                                SNEAKET IS THE CULTURE. SNEAKET IS THE FUTURE.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-cyan-500 pl-6">
                            <span className="text-xs uppercase tracking-tighter opacity-50">STATUS: ACTIVE</span>
                            <span className="inline-block w-2 h-4 bg-cyan-500 animate-pulse ml-2" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
