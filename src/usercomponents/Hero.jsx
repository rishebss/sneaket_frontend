import { MdDoubleArrow } from "react-icons/md";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FiBookOpen } from "react-icons/fi";
import { CgOpenCollective } from "react-icons/cg";


export default function Hero() {
    return (
        <section className="w-full relative pt-32 pb-12 md:py-24 lg:py-32 overflow-hidden">
            <div className="mx-auto max-w-8xl px-6 sm:px-12 lg:px-24">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-30 items-center">

                    {/* LEFT: Text Content - AI Futuristic Design */}
                    <div className="flex flex-col justify-center text-left order-1 lg:order-1">

                        <div className="mb-8 flex items-center justify-start gap-3 mt-10 md:mt-0">
                            <span className="text-[12px] sm:text-sm text-gray-500 tracking-widest font-mono flex items-center gap-2">
                                <CgOpenCollective />
                                The Sneaker Market
                            </span>
                        </div>

                        {/* Main Headline with Glitch Effect */}
                        <div className="relative mb-8">
                            <h1 className="text-3xl font-normal tracking-tight text-white sm:text-5xl lg:text-6xl leading-[0.9]">
                                <span className="block mb-2 text-white/90 font-sneaket">REDEFINE</span>
                                <span className="relative inline-block">
                                    <span className="bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent font-sneaket">
                                        YOUR <span className="font-sneaket">KICKS</span>
                                    </span>
                                    <span className="absolute -top-1 left-0 bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent opacity-20 blur-sm font-sneaket">
                                        YOUR <span className="font-sneaket">KICKS</span>
                                    </span>
                                </span>
                            </h1>

                            {/* Animated Subtitle */}
                            <div className="mt-8 flex items-center justify-start gap-4">
                                <div className="hidden sm:block h-px w-12 bg-gradient-to-r from-cyan-500/50 to-transparent" />
                                <p className="font-mono text-xs sm:text-sm text-gray-400 tracking-[0.2em] animate-pulse">
                                    // NEXT-GEN FOOTWEAR
                                </p>
                                <div className="h-px flex-1 lg:flex-none lg:w-24 bg-gradient-to-r from-transparent to-purple-500/50" />
                            </div>
                        </div>

                        {/* AI Description */}
                        <p className="mb-10 max-w-xl text-base sm:text-lg text-gray-400 leading-relaxed text-left ">
                            Top-tier sneaker designs inspired by contemporary street culture. Every pair combines superior performance with authentic style.
                        </p>

                        {/* Interactive CTA */}
                        <div className="flex flex-col sm:flex-row items-start justify-start gap-5">
                            <button className="group relative w-auto sm:w-auto rounded-none overflow-hidden bg-white/[0.02] px-10 py-4 text-sm font-mono text-white backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                                {/* Corner Framework Borders */}
                                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30 group-hover:border-cyan-400 transition-colors duration-300" />
                                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/30 group-hover:border-cyan-400 transition-colors duration-300" />
                                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/30 group-hover:border-cyan-400 transition-colors duration-300" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30 group-hover:border-cyan-400 transition-colors duration-300" />

                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    <span className="tracking-[0.2em] font-bold">VIEW MARKET</span>
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* RIGHT: Sneaker Showcase - Responsive Layout */}
                    <div className="relative order-2 lg:ml-auto w-full max-w-2xl">
                        {/* Mobile View: Stack vertically */}
                        

                        {/* Desktop View: Grid Layout */}
                        <div className="hidden lg:grid grid-cols-2 gap-4 h-[480px]">

                            {/* LATEST Button - Desktop */}
                            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-700/80 to-black-500/80 p-5 backdrop-blur-xl">
                                {/* Animated gradient background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Animated border */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur group-hover:blur-sm transition-all duration-500" />

                                {/* Content */}
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 animate-pulse" />
                                            <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-[0.3em]">THIS WEEK'S</span>
                                        </div>
                                        <h3 className="font-bold text-white text-2xl uppercase tracking-tight mb-2 flex items-center gap-4">
                                            <span className="bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-transparent">
                                                LATEST
                                            </span>
                                            <span className="text-white/90">
                                                <MdDoubleArrow className="w-8 h-8 transition-transform group-hover:translate-x-2 group-hover:scale-110" />
                                            </span>
                                        </h3>
                                        <p className="text-xs text-gray-400 font-mono mb-4">
                                            LATEST & MOST RECENT DROPS
                                        </p>
                                    </div>

                                    {/* Stats & Progress */}
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[10px] text-gray-400 font-mono">SYNCING</span>
                                            <span className="text-xs text-cyan-300 font-bold">12 NEW</span>
                                        </div>
                                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                                            <div className="h-full w-3/4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-pulse" />
                                        </div>
                                        <div className="flex justify-between mt-1">
                                            <span className="text-[8px] text-gray-500 font-mono">v2.1</span>
                                            <span className="text-[8px] text-gray-500 font-mono">75%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Sneaker - Right Column (Tall) */}
                            <div className="group relative row-span-2 overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
                                <img
                                    src="https://res.cloudinary.com/dviwae8cc/image/upload/v1766753393/ChatGPT_Image_Dec_26_2025_06_17_30_PM_zz8am5.jpg"
                                    alt="AI-Designed Quantum Sneaker"
                                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-right">
                                    <span className="text-[12px] font-mono text-white/90 uppercase">C U S T O M S</span>
                                </div>
                            </div>

                            {/* Sneaker Detail - Left Column (Tall) */}
                            <div className="group relative row-span-2 overflow-hidden rounded-2xl border border-white/10 bg-gray-900">
                                <img
                                    src="https://i.pinimg.com/1200x/64/5f/38/645f38c362cf5a87877f555cde3e0787.jpg"
                                    alt="Quantum React Technology"
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                                    <span className="text-[12px] font-mono text-white/90 uppercase">S P O R T S</span>
                                </div>
                            </div>

                            {/* MAGAZINE Button - Desktop */}
                            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-700/80 to-black-500/80 p-5 backdrop-blur-xl">
                                {/* Animated gradient background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Animated border */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-20 blur group-hover:blur-sm transition-all duration-500" />

                                {/* Content */}
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <FiBookOpen className="w-4 h-4 text-purple-300" />
                                            <span className="text-[10px] font-mono text-purple-300 uppercase tracking-[0.3em]">sneaker stories</span>
                                        </div>
                                        <h3 className="font-bold text-white text-2xl uppercase tracking-tight mb-2 flex items-center gap-4">
                                            <span className="bg-gradient-to-r from-purple-300 via-white to-pink-300 bg-clip-text text-transparent">
                                                MAGAZINE
                                            </span>
                                            <span className="text-white/90">
                                                <MdDoubleArrow className="w-8 h-8 transition-transform group-hover:translate-x-2 group-hover:scale-110" />
                                            </span>
                                        </h3>

                                    </div>

                                    {/* Stats & Progress */}
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[10px] text-gray-400 font-mono">ARCHIVED</span>
                                            <span className="text-xs text-purple-300 font-bold">24 ISSUES</span>
                                        </div>
                                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                                            <div className="h-full w-2/3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
                                        </div>
                                        <div className="flex justify-between mt-1">
                                            <span className="text-[8px] text-gray-500 font-mono">v1.8</span>
                                            <span className="text-[8px] text-gray-500 font-mono">65%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating AI Elements */}
                            <div className="absolute -top-10 -right-10 h-32 w-32 animate-pulse rounded-full bg-cyan-500/10 blur-[60px] pointer-events-none" />
                            <div className="absolute -bottom-10 -left-10 h-32 w-32 animate-pulse rounded-full bg-purple-500/10 blur-[60px] pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}