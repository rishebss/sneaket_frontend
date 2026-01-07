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
          <span className="text-[12px] sm:text-sm text-gray-200 tracking-widest font-mono flex items-center gap-2">
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
                <span className="bg-gradient-to-r from-cyan-400 via-white to-blue-400 bg-clip-text text-transparent">
                  YOUR <span className="font-black">KICKS</span>
                </span>
                <span className="absolute -top-1 left-0 bg-gradient-to-r from-cyan-400 via-white to-blue-400 bg-clip-text text-transparent opacity-20 blur-sm">
                  YOUR <span className="font-black">KICKS</span>
                </span>
              </span>
            </h1>
          </div>

          {/* Animated Subtitle */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-cyan-500/50 to-transparent" />
            <p className="font-mono text-xs sm:text-sm text-cyan-300 tracking-[0.3em] animate-pulse">
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

        {/* Login Button with Cyberpunk Style */}
        <div className="flex items-center justify-center">
          <Link to="/login" className="group relative flex items-center">
            {/* Left Connecting Line */}
            <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-cyan-400/50 group-hover:to-cyan-400 transition-all duration-300" />

            {/* Button Main Body */}
            <div className="relative px-8 py-3 sm:px-12 sm:py-4 rounded-full border border-cyan-500/20 group-hover:border-cyan-400/50 bg-white/[0.03] backdrop-blur-md transition-all duration-300 mx-[-1px] overflow-hidden">
              {/* Ambient Background Glow (Inside) */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full h-20 bg-cyan-500/10 blur-2xl pointer-events-none" />

              {/* Sharp Top-Edge Highlight */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-20 shadow-[0_0_12px_rgba(34,211,238,0.6)]" />

              <div className="relative z-10 flex items-center gap-4 text-white font-mono text-base sm:text-lg tracking-[0.3em]">
                <span className="opacity-80 group-hover:opacity-100 transition-opacity">LOGIN</span>

              </div>
            </div>

            {/* Right Connecting Line */}
            <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-cyan-400/50 group-hover:to-cyan-400 transition-all duration-300" />
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