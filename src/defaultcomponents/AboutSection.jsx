import { FiStar, FiTruck, FiShield } from 'react-icons/fi';
import { MdDoubleArrow } from "react-icons/md";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="w-full relative py-16 md:py- md:mt-10 overflow-hidden bg-transparent">
      {/* Animated Background Elements */}

      <motion.div
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 }
        }}
        className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24 relative z-10"
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-transparent" />
            <span className="text-xs md:text-xl font-mono text-cyan-400 uppercase tracking-[0.3em]">
              WHY CHOOSE SNEAKET
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-blue-500/50" />
          </div>

          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            From rare collectibles to everyday essentials - discover the world's finest sneakers
            with authenticity guaranteed and exceptional service.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

          {/* Card 1: Authenticity Guaranteed */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-950/50 p-8 backdrop-blur-xl transition-all duration-500 hover:border-red-500/30 hover:shadow-[0_0_40px_rgba(239,68,68,0.15)]">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Icon */}
            <div className="relative mb-6">
              <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20">
                <FiShield className="w-8 h-8 text-red-400" />
              </div>
              {/* Pulse ring effect */}
              <div className="absolute inset-0 rounded-xl bg-red-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <h3 className="text-base font-mono text-white mb-3 flex items-center gap-2">
              Authenticity Guaranteed

            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Every sneaker undergoes rigorous verification by our expert team. Shop with
              confidence knowing every pair is 100% authentic and brand new.
            </p>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Card 2: Fast & Secure Shipping */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-950/50 p-8 backdrop-blur-xl transition-all duration-500 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Icon */}
            <div className="relative mb-6">
              <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                <FiTruck className="w-8 h-8 text-blue-400" />
              </div>
              {/* Pulse ring effect */}
              <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <h3 className="text-base font-mono text-white mb-3 flex items-center gap-2">
              Fast & Secure Shipping

            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Worldwide delivery with premium packaging and real-time tracking. Your sneakers
              arrive protected and ready to wear, wherever you are.
            </p>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Card 3: Curated Collections */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-950/50 p-8 backdrop-blur-xl transition-all duration-500 hover:border-green-500/30 hover:shadow-[0_0_40px_rgba(34,197,94,0.15)]">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Icon */}
            <div className="relative mb-6">
              <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
                <FiStar className="w-8 h-8 text-green-400" />
              </div>
              {/* Pulse ring effect */}
              <div className="absolute inset-0 rounded-xl bg-green-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <h3 className="text-base font-mono text-white mb-3 flex items-center gap-2">
              Curated Collections

            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Hand-picked selections from the hottest brands and most sought-after releases.
              Discover rare finds and exclusive drops you won't find anywhere else.
            </p>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

        </div>


      </motion.div>

      {/* Decorative grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>
    </section>
  );
}