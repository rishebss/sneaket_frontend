import { FiTrendingUp, FiStar, FiShield } from 'react-icons/fi';
import { HiShoppingBag } from "react-icons/hi2";
import { MdDoubleArrow } from "react-icons/md";
import { LuDroplets } from "react-icons/lu";
import DarkVeil from '../defaultcomponents/DarkVeil';
import PixelBlast from "../usercomponents/PixelBlast";
import { motion } from "framer-motion";

export default function BentoCards() {
    return (
        <section className="w-full relative py-16 md:py-20 overflow-hidden bg-transparent">
            <motion.div
                initial={{ opacity: 0, y: 50, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                    opacity: { duration: 0.8 }
                }}
                className="mx-auto max-w-8xl px-6 sm:px-12 lg:px-24 relative z-10"
            >

                {/* Section Header */}
                <div className="text-center mb-12 md:mt-[-40px] mt-[-50px]">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500/50" />
                        <span className="md:text-xl text-xs font-mono text-cyan-400 uppercase tracking-[0.3em] whitespace-nowrap">
                            EXPLORE COLLECTIONS
                        </span>
                        <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-500/50" />
                    </div>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto relative">

                    {/* Large Card - View Store with Plasma Background */}
                    <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-cyan-500/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] min-h-[300px] md:min-h-0">
                        {/* Plasma Background */}
                        <div className="absolute inset-0 z-0">
                            <PixelBlast
                                color="#44289f"
                            />
                        </div>

                        {/* Dark Overlay for Better Text Readability */}
                        <div className="absolute inset-0 z-1 bg-transparent rounded-2xl" />

                        {/* Cyan Gradient Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-2" />

                        <div className="relative z-10 h-full flex flex-col p-8">
                            <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-cyan-500/30 to-cyan-500/15 border border-cyan-500/40 mb-6 w-fit backdrop-blur-md">
                                <HiShoppingBag className="w-8 h-8 text-cyan-300" />
                            </div>

                            <h3 className="text-2xl font-mono text-white mb-3">View Store</h3>
                            <p className="text-gray-200 text-sm leading-relaxed mb-6">
                                <span className="md:hidden">Discover the hottest sneakers making waves in street culture</span>
                                <span className="hidden md:block">Browse our complete collection of premium sneakers. From trending releases to timeless classics, explore hundreds of verified authentic styles from top brands. Filter by category, size, and price to find your perfect pair.</span>
                            </p>

                            <div className="mt-auto">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="h-1 flex-1 rounded-full bg-white/15 overflow-hidden">
                                        <div className="h-full w-3/4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
                                    </div>
                                    <span className="text-cyan-300 text-xs font-mono">75%</span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-300">
                                    <span>120+ Styles</span>
                                    <span>Updated Daily</span>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    </div>

                    {/* Small Card - New Arrivals */}
                    <div className="group relative overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 hover:border-purple-500/30 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] min-h-[220px]">
                        {/* Background Image */}
                        <img
                            src="https://res.cloudinary.com/dviwae8cc/image/upload/v1766771666/3963741fb9717877df5396e593fc0752_2_q3iyff_11zon_i0vzfq.jpg"
                            alt="New Arrivals Sneaker"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/30" />
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                            <div>
                                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 mb-4 backdrop-blur-md">
                                    <LuDroplets className="w-6 h-6 text-purple-400" />
                                </div>
                                <h3 className="text-lg font-mono text-white mb-2">New Drops</h3>
                                <p className="text-gray-400 text-xs mb-4 font-mono tracking-wider">
                                    Fresh releases
                                </p>
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-md w-fit">
                                <span className="text-purple-400 text-xs font-mono">JUST IN</span>
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Small Card - Best Sellers */}
                    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/90 to-gray-950/90 p-6 backdrop-blur-xl transition-all duration-500 hover:border-green-500/30 hover:shadow-[0_0_40px_rgba(34,197,94,0.15)] min-h-[220px]">

                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 mb-4">
                                    <FiStar className="w-6 h-6 text-green-400" />
                                </div>
                                <h3 className="text-lg font-mono text-white mb-2">Best Sellers</h3>
                                <p className="text-gray-400 text-xs mb-4 font-mono tracking-wider">
                                    Top-rated picks
                                </p>
                            </div>
                            <div className="flex items-center gap-2">

                                <span className="text-green-400 text-xs font-mono">50+ Picks</span>
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Medium Card - Be a member (Hero Style) */}
                    <div className="md:col-span-2 group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-700/80 to-black-500/80 p-5 backdrop-blur-xl transition-all duration-500 min-h-[180px] hover:border-amber-500/30 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]">

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl text-white mb-2 flex items-center gap-4">
                                    <span className="font-mono tracking-tight">
                                        Account
                                    </span>

                                </h3>
                                <p className="text-gray-400 font-mono text-sm">
                                    View profile details
                                </p>
                            </div>

                            {/* Stats & Progress section at bottom */}
                            <div className="mt-8 flex items-end justify-between gap-4">
                                <div className="flex-1 max-w-[150px] sm:max-w-[200px]">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-amber-300 font-mono ">Profile Status</span>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                                        <div className="h-full w-2/3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse" />
                                    </div>
                                    <div className="mt-1">
                                        <span className="text-[8px] text-gray-500 font-mono">65% LOCK</span>
                                    </div>
                                </div>

                                {/* Login button - integrated into the flow to prevent overlap */}
                                <div className="z-20 mb-1">
                                    <div className="px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 backdrop-blur-md group-hover:bg-amber-500/20 transition-all duration-300 cursor-pointer">
                                        <span className="text-amber-400 text-sm font-mono">VIEW</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                </div>

            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>
        </section>
    );
}