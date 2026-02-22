import { Link } from "react-router-dom";
import { MdDoubleArrow } from "react-icons/md";
import { CgOpenCollective } from "react-icons/cg";
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
            <div className="w-6 sm:w-12 h-px bg-gradient-to-r from-transparent to-cyan-400/50 group-hover:to-cyan-400 transition-all duration-300" />

            {/* Main Button Container */}
            <div className="relative group transition-all duration-500 hover:scale-[1.02]">
              {/* Clipped Background */}
              <div
                className="relative px-8 py-3 sm:px-12 sm:py-4 bg-gradient-to-br from-purple-500/15 via-transparent to-cyan-500/15 backdrop-blur-3xl min-w-[160px] sm:min-w-[200px] text-center overflow-hidden"
                style={{ clipPath: 'polygon(0% 0%, calc(100% - 15px) 0%, 100% 15px, 100% 100%, 15px 100%, 0% calc(100% - 15px))' }}
              >
                {/* Background Glow (Inside) */}
                <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-colors duration-700" />

                {/* Content */}
                <span className="relative z-10 text-white font-mono text-sm sm:text-base tracking-[0.4em] uppercase">
                  Login
                </span>
              </div>

              {/* SVG Border Overlay (Outside clip-path to remain visible) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                viewBox="0 0 200 60"
                preserveAspectRatio="none"
              >
                <path
                  d="M 1,1 L 185,1 L 199,15 L 199,59 L 15,59 L 1,45 Z"
                  fill="none"
                  className="stroke-white/20 group-hover:stroke-cyan-500/50 transition-colors duration-500"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Enhanced Corner Highlights */}
                <path
                  d="M 185,1 L 199,15"
                  fill="none"
                  className="stroke-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 1,45 L 15,59"
                  fill="none"
                  className="stroke-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Top Edge Highlight */}
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
            </div>

            {/* Right Connecting Line */}
            <div className="w-6 sm:w-12 h-px bg-gradient-to-l from-transparent to-cyan-400/50 group-hover:to-cyan-400 transition-all duration-300" />
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