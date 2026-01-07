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
                <span className="bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent">
                  YOUR <span className="font-black">KICKS</span>
                </span>
                <span className="absolute -top-1 left-0 bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent opacity-20 blur-sm">
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
            <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-purple-500/50 to-transparent" />
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
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center justify-center">
          <Link to="/login" className="group relative px-10 py-4 overflow-hidden">
            {/* Extended Lines (2rem each side) */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 w-8 h-px bg-gradient-to-r from-transparent to-cyan-400 group-hover:w-12 group-hover:from-transparent group-hover:to-cyan-500 transition-all duration-500" />
            
            {/* Left Border */}
            <div className="absolute left-0 top-0 h-full w-px">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-cyan-400 blur-[2px] opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
            </div>
            
            {/* Right Border */}
            <div className="absolute right-0 top-0 h-full w-px">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-cyan-400 blur-[2px] opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
            </div>
            
            {/* Extended Lines (2rem each side) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 w-8 h-px bg-gradient-to-l from-transparent to-cyan-400 group-hover:w-12 group-hover:from-transparent group-hover:to-cyan-500 transition-all duration-500" />
            
            {/* Main Button Body */}
            <div className="relative px-8 py-4">
              {/* Glow Effect Behind */}
              <div className="absolute inset-0 bg-cyan-500/10 blur-xl group-hover:bg-cyan-500/20 transition-all duration-500" />
              
              {/* Black Background */}
              <div className="absolute inset-0 bg-black/90 backdrop-blur-sm border-x border-cyan-500/30 group-hover:border-cyan-500/50 transition-all duration-300" />
              
              {/* Corner Accents */}
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-cyan-400 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-cyan-400 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-cyan-400 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-cyan-400 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Scanning Line Effect */}
              <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 animate-[scan_2s_linear_infinite] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              </div>
              
              {/* Content */}
              <span className="relative z-10 flex items-center justify-center gap-4 text-white font-mono text-lg tracking-widest">
                <span className="relative">
                  LOGIN
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                </span>
                <div className="relative flex items-center">
                  <MdDoubleArrow className="w-6 h-6 transform transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110 group-hover:text-cyan-400" />
                  <div className="absolute inset-0 blur-md scale-125 opacity-0 group-hover:opacity-50 transition-opacity">
                    <MdDoubleArrow className="w-6 h-6 text-cyan-400" />
                  </div>
                </div>
              </span>
            </div>
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