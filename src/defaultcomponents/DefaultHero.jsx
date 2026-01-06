import { Link } from "react-router-dom";
import { MdDoubleArrow } from "react-icons/md";
import { CgOpenCollective } from "react-icons/cg";
import DarkVeil from "./DarkVeil";

export default function Hero() {
  return (
    <div className="w-full relative">
      {/* Dark Overlay for Better Text Readability */}
      <div className="absolute inset-0 z-0">
        <DarkVeil
          hueShift={35}
          noiseIntensity={0.02}
          scanlineIntensity={0}
          speed={1.1}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>

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

        {/* Login and Signup Links */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center justify-center">
          {/* Login Link */}
          <Link to="/login" className="group relative px-6 py-3 sm:px-8 sm:py-4 overflow-hidden rounded-full">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-700/10 via-blue-500/10 to-cyan-700/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Animated Border Gradient */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-700 via-blue-500 to-cyan-700 rounded-full opacity-30 group-hover:opacity-100 blur-[2px] group-hover:blur-[4px] transition-all duration-500 animate-[pulse_3s_infinite]" />

            {/* Glassmorphism Inner Body */}
            <div className="absolute inset-[1px] bg-black/40 backdrop-blur-md rounded-full z-1 shadow-inner" />

            {/* Hover Sweep Effect */}
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out z-2" />

            {/* Content */}
            <span className="relative z-10 flex items-center justify-center gap-3 sm:gap-4 text-white font-lemon text-base sm:text-lg tracking-widest transition-all duration-300 group-hover:gap-6">
              <span className="drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">LOGIN</span>
              <div className="relative flex items-center justify-center">
                <MdDoubleArrow className="w-5 h-5 sm:w-6 sm:h-6 transform transition-all duration-300 group-hover:scale-125 group-hover:text-cyan-400" />
                <div className="absolute inset-0 blur-sm scale-150 opacity-0 group-hover:opacity-40 transition-opacity">
                  <MdDoubleArrow className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                </div>
              </div>
            </span>
          </Link>
        </div>

      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20"
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