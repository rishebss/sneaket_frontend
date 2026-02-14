import { motion } from "framer-motion";
import { Shield, Truck, Star } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="bg-transparent py-16 md:py-32">
      <div className="@container mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-blue-500/50" />
            <span className="text-xs md:text-xl font-mono text-cyan-400 uppercase tracking-[0.3em] whitespace-nowrap">
              WHY CHOOSE SNEAKET
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-blue-500/50" />
          </div>

          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            From rare collectibles to everyday essentials - discover the world's finest sneakers
            with authenticity guaranteed and exceptional service.
          </p>
        </div>

        <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm grid-cols-1 md:grid-cols-3 gap-6 *:text-center md:mt-16">
          {/* Card 1 */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-xl p-6 transition-all duration-300 hover:border-red-500/30 hover:shadow-[0_0_50px_rgba(239,68,68,0.15)]">
            <CardDecorator color="rgba(239, 68, 68, 0.15)" hoverGridColor="rgba(239, 68, 68, 0.4)">
              <Shield className="size-6 text-red-400" />
            </CardDecorator>

            <h3 className="mt-6 font-medium text-white group-hover:text-red-400 transition-colors">Authenticity Guaranteed</h3>
            <div className="mt-3 text-sm text-gray-400">
              <p>Every sneaker undergoes rigorous verification by experts. 100% authentic collections.</p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Card 2 */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-xl p-6 transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)]">
            <CardDecorator color="rgba(59, 130, 246, 0.15)" hoverGridColor="rgba(59, 130, 246, 0.4)">
              <Truck className="size-6 text-blue-400" />
            </CardDecorator>

            <h3 className="mt-6 font-medium text-white group-hover:text-blue-400 transition-colors">Fast & Secure Shipping</h3>
            <div className="mt-3 text-sm text-gray-400">
              <p>Worldwide delivery with tracked packaging. Protected and ready to wear pairs.</p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Card 3 */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-xl p-6 transition-all duration-300 hover:border-green-500/30 hover:shadow-[0_0_50px_rgba(34,197,94,0.15)]">
            <CardDecorator color="rgba(34, 197, 94, 0.15)" hoverGridColor="rgba(34, 197, 94, 0.4)">
              <Star className="size-6 text-green-400" />
            </CardDecorator>

            <h3 className="mt-6 font-medium text-white group-hover:text-green-400 transition-colors">Curated Collections</h3>
            <div className="mt-3 text-sm text-gray-400">
              <p>Discover rare finds and exclusive drops. Hand-picked selections from hottest brands.</p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
}

const CardDecorator = ({ children, color, hoverGridColor }) => (
  <div className="relative mx-auto size-36 duration-200" style={{
    maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
    WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
  }}>
    {/* Default White Grid Background */}
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-60 transition-all duration-300 group-hover:opacity-0"
    />

    {/* Themed Grid Background (Visible on Hover) */}
    <div
      aria-hidden
      className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        backgroundImage: `linear-gradient(to right, ${hoverGridColor} 1px, transparent 1px), linear-gradient(to bottom, ${hoverGridColor} 1px, transparent 1px)`,
        backgroundSize: '24px 24px'
      }}
    />

    {/* Center Icon Box */}
    <div className="absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t border-white/10 bg-gray-950/50 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20 group-hover:bg-gray-900">
      {/* Themed Glow */}
      <div className="absolute inset-0 blur-lg opacity-20 group-hover:opacity-40" style={{ backgroundColor: color }} />
      <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
        {children}
      </div>
    </div>
  </div>
);
