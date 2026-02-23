import { motion } from "framer-motion";
import { Shield, Truck, Star } from "lucide-react";

export default function FeatureSection() {
  const features = [
    {
      id: "verify",
      icon: <Shield className="size-6 text-red-400" />,
      title: "AUTHENTICITY GUARANTEED",
      subtitle: "VERIFICATION_CORE",
      desc: "Every sneaker undergoes rigorous verification by experts. 100% authentic collections.",
      accent: "border-red-500",
      tag: "v.1.0.2"
    },
    {
      id: "ship",
      icon: <Truck className="size-6 text-blue-400" />,
      title: "FAST & SECURE SHIPPING",
      subtitle: "LOGISTICS_EXEC",
      desc: "Worldwide delivery with tracked packaging. Protected and ready to wear pairs.",
      accent: "border-blue-500",
      tag: "v.2.1.0"
    },
    {
      id: "curate",
      icon: <Star className="size-6 text-green-400" />,
      title: "CURATED COLLECTIONS",
      subtitle: "ARCHIVE_SYNC",
      desc: "Discover rare finds and exclusive drops. Hand-picked selections from hottest brands.",
      accent: "border-green-500",
      tag: "v.0.9.4"
    }
  ];

  return (
    <section className="bg-transparent py-20 md:py-40 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 }
        }}
        className="container mx-auto max-w-7xl px-6 relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-blue-500/50" />
            <span className="text-xs md:text-xl font-mono text-cyan-400 uppercase tracking-[0.3em] whitespace-nowrap">
              WHY CHOOSE SNEAKET
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-blue-500/50" />
          </div>

          <p className="text-center mt-0 text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-12 uppercase tracking-wide">
            Advanced Authentication and in Demand Sneaker Collections
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Main Card Container */}
              <div className="relative h-full bg-white/[0.01] backdrop-blur-3xl border border-white/5 p-8 overflow-hidden transition-all duration-700 hover:bg-white/[0.03] hover:border-white/10">

                {/* Tech Corner Accents */}
                <div className={`absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:${feature.accent}`} />
                <div className={`absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:${feature.accent}`} />

                {/* Card Meta */}
                <div className="flex justify-between items-start mb-10">
                  <div className="p-4 border border-white/5 bg-black/40 backdrop-blur-xl group-hover:border-white/10 transition-all duration-500">
                    <div className="transition-transform duration-500 group-hover:scale-110">
                      {feature.icon}
                    </div>
                  </div>
                  <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.4em] pt-2">{feature.tag}</span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <p className={`text-[10px] font-mono ${feature.accent.replace('border-', 'text-')} opacity-80 tracking-[0.3em] mb-2 uppercase`}>
                    {feature.subtitle}
                  </p>
                  <h3 className="text-xl font-lemon text-white uppercase mb-4 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 font-mono leading-relaxed group-hover:text-gray-300 transition-colors uppercase tracking-wider">
                    {feature.desc}
                  </p>
                </div>

                {/* Bottom Glow Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-${feature.accent.replace('border-', '')}/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
