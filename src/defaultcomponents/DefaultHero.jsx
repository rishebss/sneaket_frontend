import { Link } from "react-router-dom";
import { MdDoubleArrow } from "react-icons/md";
import { CgOpenCollective } from "react-icons/cg";
import { motion } from "framer-motion";
import DarkVeil from "./DarkVeil";

export default function Hero() {
  return (
    <div className="w-full relative">
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-24 pt-32 pb-12">

        <div className="mb-8 flex items-center justify-start gap-3">
          <span className="text-[12px] sm:text-sm text-gray-500 tracking-widest font-mono flex items-center gap-2">
            <CgOpenCollective />
            The Sneaker Market
          </span>
        </div>

        {/* Main Headline with Glitch Effect */}
        <div className="text-center mb-2 md:mb-12">
          <div className="relative mb-4">
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-7xl font-sneaket text-white mb-2 leading-tight">
              <span className="block">Redefine</span>
              <span className="relative inline-block">
                <span className="bg-white bg-clip-text text-transparent">
                  YOUR <span className="font-black">KICKS</span>
                </span>

              </span>
            </h1>
          </div>

          {/* Animated Subtitle */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-cyan-500/50 to-transparent" />
            <p className="font-mono text-xs sm:text-sm text-cyan-300 animate-pulse">
              // NEXT-GEN FOOTWEAR
            </p>
            <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-cyan-500/50 to-transparent" />
          </div>
        </div>

        {/* Description */}
        <div className="max-w-2xl mx-auto text-center mb-10 md:mb-16">
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
            Top-tier sneaker designs inspired by contemporary street culture.
            Every pair combines superior performance with authentic style.
          </p>
        </div>

        {/* Login Button - Bento Style */}
        <div className="flex items-center justify-center">
          <Link to="/login" className="group relative flex items-center">
            {/* Left Connecting Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="w-6 sm:w-12 h-px bg-gradient-to-r from-transparent to-cyan-400/50 group-hover:to-cyan-400 transition-all duration-300"
            />

            {/* Main Button Container */}
            <div className="relative group transition-all duration-500 hover:scale-[1.02]">
              {/* Delayed Background Reveal */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="relative px-8 py-3 sm:px-12 sm:py-4 bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20 backdrop-blur-3xl min-w-[160px] sm:min-w-[200px] text-center overflow-hidden border border-white/5"
                style={{ clipPath: 'polygon(0% 0%, calc(100% - 15px) 0%, 100% 15px, 100% 100%, 15px 100%, 0% calc(100% - 15px))' }}
              >
                {/* Background Glow (Inside) */}
                <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-colors duration-700" />

                {/* Content - Reveal after build */}
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1.0 }}
                  className="relative z-10 text-white font-mono text-sm sm:text-base tracking-[0.4em] uppercase"
                >
                  Login
                </motion.span>
              </motion.div>

              {/* Sparkling Beam SVG Border */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                viewBox="0 0 200 60"
                preserveAspectRatio="none"
              >
                <defs>
                  <filter id="glow-login" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Background Path (Subtle) */}
                <path
                  d="M 1,1 L 185,1 L 199,15 L 199,59 L 15,59 L 1,45 Z"
                  fill="none"
                  className="stroke-white/10"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />

                {/* The Beam Trace */}
                <motion.path
                  d="M 1,1 L 185,1 L 199,15 L 199,59 L 15,59 L 1,45 Z"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
                  transition={{
                    pathLength: { duration: 0.7, ease: "easeInOut", delay: 0.2 },
                    opacity: { duration: 1, times: [0, 0.1, 0.8, 1], delay: 0.2 }
                  }}
                />

                {/* The Sparkle Head */}
                <motion.path
                  d="M 1,1 L 185,1 L 199,15 L 199,59 L 15,59 L 1,45 Z"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="2.5"
                  strokeDasharray="20 1000"
                  filter="url(#glow-login)"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                  transition={{
                    pathLength: { duration: 0.7, ease: "easeInOut", delay: 0.2 },
                    opacity: { duration: 0.7, times: [0, 0.5, 1], delay: 0.2 }
                  }}
                />
              </svg>

              {/* Top Edge Highlight */}
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
            </div>

            {/* Right Connecting Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="w-6 sm:w-12 h-px bg-gradient-to-l from-transparent to-cyan-400/50 group-hover:to-cyan-400 transition-all duration-300"
            />
          </Link>
        </div>

      </div>

      {/* Add CSS animation for scanning line */}
      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}