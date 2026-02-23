import { MdDoubleArrow } from "react-icons/md";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FiBookOpen } from "react-icons/fi";
import { CgOpenCollective } from "react-icons/cg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
                <span className="block mb-2 text-white/90 font-sneaket">
                  REDEFINE
                </span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-cyan-400 via-white to-cyan-400 bg-clip-text text-transparent font-sneaket">
                    YOUR <span className="font-sneaket">KICKS</span>
                  </span>
                  <span className="absolute -top-1 left-0 bg-gradient-to-r from-cyan-400 via-white to-cyan-400 bg-clip-text text-transparent opacity-20 blur-sm font-sneaket">
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
                <div className="h-px flex-1 lg:flex-none lg:w-24 bg-gradient-to-r from-transparent to-cyan-500/50" />
              </div>
            </div>

            {/* AI Description */}
            <p className="mb-10 max-w-xl text-base sm:text-lg text-gray-400 leading-relaxed text-left ">
              Top-tier sneaker designs inspired by contemporary street culture.
              Every pair combines superior performance with authentic style.
            </p>

            {/* Interactive CTA */}
            <div className="flex flex-col sm:flex-row items-start justify-start gap-5">
              <Link to="/products">
                <button className="group relative w-auto sm:w-auto rounded-none overflow-hidden bg-white/[0.02] px-10 py-4 text-sm font-mono text-white backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] cursor-pointer">
                  {/* Corner Framework Borders */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-800 group-hover:border-cyan-400 transition-colors duration-300" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-800 group-hover:border-cyan-400 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-800 group-hover:border-cyan-400 transition-colors duration-300" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-800 group-hover:border-cyan-400 transition-colors duration-300" />

                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <span className="tracking-[0.2em] font-bold">
                      VIEW MARKET
                    </span>
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {/* RIGHT: Sneaker Showcase - Responsive Layout */}
          <div className="relative order-2 lg:ml-auto w-full max-w-2xl">
            {/* Mobile View: Stack vertically */}

            {/* Desktop View: Grid Layout */}
            <div className="hidden lg:grid grid-cols-2 gap-4 h-[480px]">
              {/* LATEST Button - Desktop */}
              <motion.div
                initial="initial"
                animate="animate"
                className="group relative overflow-hidden p-5 transition-colors duration-1000"
              >
                {/* Delayed Background Reveal */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                  className="absolute inset-0 bg-gradient-to-br from-gray-700/80 to-black-500/80 backdrop-blur-xl border border-white/10 z-0"
                />

                {/* Border Drawing Animation Overlay (The Beam with Sparkling Head) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                  <defs>
                    <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* The Main Trace Line */}
                  <motion.rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
                    transition={{
                      pathLength: { duration: 1, ease: "easeInOut", delay: 0.1 },
                      opacity: { duration: 1.5, times: [0, 0.1, 0.8, 1], delay: 0.1 }
                    }}
                  />

                  {/* The Sparkling Head */}
                  <motion.rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="none"
                    stroke="#2cc1e6ff"
                    strokeWidth="1"
                    strokeDasharray="40 1000"
                    filter="url(#glow-cyan)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                    transition={{
                      pathLength: { duration: 1, ease: "easeInOut", delay: 0.1 },
                      opacity: { duration: 1, times: [0, 0.5, 1], delay: 0.1 }
                    }}
                  />

                  {/* Corner Sparkle Points */}
                  <motion.circle
                    cx="0" cy="0" r="2" fill="#188edcff"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [0, 2, 0] }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  />
                  <motion.circle
                    cx="100%" cy="100%" r="2" fill="#fff"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [0, 2, 0] }}
                    transition={{ delay: 1.1, duration: 0.4 }}
                  />
                </svg>

                {/* Tech Corners - Reveal with flicker */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.1 }}
                  className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:border-cyan-500 z-30"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.1 }}
                  className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:border-cyan-500 z-30"
                />

                {/* Animated gradient background (Static on hover) */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]" />

                {/* Animated border pulse (Hover) */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur group-hover:blur-sm transition-all duration-500 z-0" />

                {/* Content Overlay */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                  className="relative z-10 h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 animate-pulse" />
                      <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-[0.3em]">
                        THIS WEEK'S
                      </span>
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

                    </p>
                  </div>

                  {/* Stats & Progress */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] text-gray-400 font-mono">
                        SYNCING
                      </span>
                      <span className="text-xs text-cyan-300 font-bold">
                        12 NEW
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-pulse" />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[8px] text-gray-500 font-mono">
                        v2.1
                      </span>
                      <span className="text-[8px] text-gray-500 font-mono">
                        75%
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Main Sneaker - Right Column (Tall) */}
              <motion.div
                initial="initial"
                animate="animate"
                className="group relative row-span-2 overflow-hidden bg-transparent z-10"
              >
                {/* Delayed Background Reveal */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="absolute inset-0 bg-black backdrop-blur-xl z-0"
                  style={{ clipPath: 'polygon(0% 0%, 88% 0%, 100% 12%, 100% 100%, 12% 100%, 0% 88%)' }}
                />

                {/* Sparkling Beam SVG Border (Double Clipped Shape) */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <filter id="glow-customs" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Permanent Subtle Border */}
                  <motion.path
                    d="M 0.5,0.5 H 88 L 99.5,12 V 99.5 H 12 L 0.5,88 Z"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                  />

                  {/* The Trace Line */}
                  <motion.path
                    d="M 0.5,0.5 H 88 L 99.5,12 V 99.5 H 12 L 0.5,88 Z"
                    fill="none"
                    stroke="#1282d2ff"
                    strokeWidth="0.5"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 0.4, 0.4, 0] }}
                    transition={{
                      pathLength: { duration: 0.8, ease: "easeInOut", delay: 0.25 },
                      opacity: { duration: 1.2, times: [0, 0.1, 0.8, 1], delay: 0.25 }
                    }}
                  />

                  {/* The Sparkle Head */}
                  <motion.path
                    d="M 0.5,0.5 H 88 L 99.5,12 V 99.5 H 12 L 0.5,88 Z"
                    fill="none"
                    stroke="#3c12d2ff"
                    strokeWidth="1.2"
                    strokeDasharray="10 200"
                    filter="url(#glow-customs)"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 0.8, 0] }}
                    transition={{
                      pathLength: { duration: 0.8, ease: "easeInOut", delay: 0.25 },
                      opacity: { duration: 0.8, times: [0, 0.5, 1], delay: 0.25 }
                    }}
                  />
                </svg>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.1 }}
                  className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:border-white/50 z-30"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.1 }}
                  className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:border-white/50 z-30"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
                  className="h-full w-full relative z-[1]"
                  style={{ clipPath: 'polygon(0% 0%, 88% 0%, 100% 12%, 100% 100%, 12% 100%, 0% 88%)' }}
                >
                  <img
                    src="https://res.cloudinary.com/dviwae8cc/image/upload/v1766753393/ChatGPT_Image_Dec_26_2025_06_17_30_PM_zz8am5.jpg"
                    alt="AI-Designed Quantum Sneaker"
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-right">
                    <span className="text-[12px] font-mono text-white/90 uppercase">
                      C U S T O M S
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Sneaker Detail - Left Column (Tall) */}
              <motion.div
                initial="initial"
                animate="animate"
                className="group relative row-span-2 overflow-hidden bg-transparent z-10"
              >
                {/* Delayed Background Reveal */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.25 }}
                  className="absolute inset-0 bg-gray-900 backdrop-blur-xl z-0"
                  style={{ clipPath: 'polygon(0% 0%, 88% 0%, 100% 12%, 100% 100%, 12% 100%, 0% 88%)' }}
                />

                {/* Sparkling Beam SVG Border (Double Clipped Shape) */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <filter id="glow-sports" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Permanent Subtle Border */}
                  <motion.path
                    d="M 0.5,0.5 H 88 L 99.5,12 V 99.5 H 12 L 0.5,88 Z"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.25 }}
                  />

                  {/* The Main Trace Line */}
                  <motion.path
                    d="M 0.5,0.5 H 88 L 99.5,12 V 99.5 H 12 L 0.5,88 Z"
                    fill="none"
                    stroke="#188dc8ff"
                    strokeWidth="0.5"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 0.4, 0.4, 0] }}
                    transition={{
                      pathLength: { duration: 0.8, ease: "easeInOut", delay: 0.45 },
                      opacity: { duration: 1.2, times: [0, 0.1, 0.8, 1], delay: 0.45 }
                    }}
                  />

                  {/* The Sparkle Head */}
                  <motion.path
                    d="M 0.5,0.5 H 88 L 99.5,12 V 99.5 H 12 L 0.5,88 Z"
                    fill="none"
                    stroke="#a518c8ff"
                    strokeWidth="1.2"
                    strokeDasharray="10 200"
                    filter="url(#glow-sports)"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 0.8, 0] }}
                    transition={{
                      pathLength: { duration: 0.8, ease: "easeInOut", delay: 0.45 },
                      opacity: { duration: 0.8, times: [0, 0.5, 1], delay: 0.45 }
                    }}
                  />
                </svg>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.25, duration: 0.1 }}
                  className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:border-white/50 z-30"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.35, duration: 0.1 }}
                  className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:border-white/50 z-30"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.35, ease: "easeOut" }}
                  className="h-full w-full relative z-[1]"
                  style={{ clipPath: 'polygon(0% 0%, 88% 0%, 100% 12%, 100% 100%, 12% 100%, 0% 88%)' }}
                >
                  <img
                    src="https://i.pinimg.com/1200x/64/5f/38/645f38c362cf5a87877f555cde3e0787.jpg"
                    alt="Quantum React Technology"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                    <span className="text-[12px] font-mono text-white/90 uppercase">
                      S P O R T S
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* MAGAZINE Button - Desktop */}
              <motion.div
                initial="initial"
                animate="animate"
                className="group relative overflow-hidden p-5 transition-colors duration-1000"
              >
                {/* Delayed Background Reveal */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.55 }}
                  className="absolute inset-0 bg-gradient-to-br from-gray-700/80 to-black-500/80 backdrop-blur-xl border border-white/10 z-0"
                />

                {/* Border Drawing Animation Overlay (The Pink Sparkling Beam) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                  <defs>
                    <filter id="glow-magenta" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  <motion.rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="none"
                    stroke="#d946ef"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
                    transition={{
                      pathLength: { duration: 1, ease: "easeInOut", delay: 0.55 },
                      opacity: { duration: 1.5, times: [0, 0.1, 0.8, 1], delay: 0.55 }
                    }}
                  />

                  <motion.rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="none"
                    stroke="#168843ff"
                    strokeWidth="2"
                    strokeDasharray="40 1000"
                    filter="url(#glow-magenta)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                    transition={{
                      pathLength: { duration: 1, ease: "easeInOut", delay: 0.55 },
                      opacity: { duration: 1, times: [0, 0.5, 1], delay: 0.55 }
                    }}
                  />
                </svg>

                {/* Tech Corners - Reveal with flicker */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.55, duration: 0.1 }}
                  className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:border-purple-500 z-30"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.65, duration: 0.1 }}
                  className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:border-purple-500 z-30"
                />

                {/* Animated gradient background (Static on hover) */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]" />

                {/* Animated border pulse (Hover) */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-20 blur group-hover:blur-sm transition-all duration-500 z-0" />

                {/* Content Overlay */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.65, ease: "easeOut" }}
                  className="relative z-10 h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <FiBookOpen className="w-4 h-4 text-purple-300" />
                      <span className="text-[10px] font-mono text-purple-300 uppercase tracking-[0.3em]">
                        sneaker stories
                      </span>
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
                      <span className="text-[10px] text-gray-400 font-mono">
                        ARCHIVED
                      </span>
                      <span className="text-xs text-purple-300 font-bold">
                        24 ISSUES
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full w-2/3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[8px] text-gray-500 font-mono">
                        v1.8
                      </span>
                      <span className="text-[8px] text-gray-500 font-mono">
                        65%
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

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
