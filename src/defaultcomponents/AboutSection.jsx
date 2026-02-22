import { motion } from "framer-motion";
import { Shield, Truck, Star } from "lucide-react";

export default function AboutSection() {
  const cards = [
    {
      id: "auth",
      icon: <Shield className="size-6 text-red-500" />,
      title: "Authenticity",
      subtitle: "Guaranteed",
      desc: "Every sneaker undergoes rigorous verification by experts. 100% authentic collections.",
      accent: "border-red-500",
      tag: "sys_auth_01"
    },
    {
      id: "ship",
      icon: <Truck className="size-6 text-blue-500" />,
      title: "Delivery",
      subtitle: "Secure Flow",
      desc: "Worldwide delivery with tracked packaging. Protected and ready to wear pairs.",
      accent: "border-blue-500",
      tag: "log_idx_02"
    },
    {
      id: "curat",
      icon: <Star className="size-6 text-green-500" />,
      title: "Curation",
      subtitle: "Hand Picked",
      desc: "Discover rare finds and exclusive drops. Hand-picked selections from hottest brands.",
      accent: "border-green-500",
      tag: "cur_ref_03"
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-blue-500/50" />
            <span className="text-xs md:text-xl font-mono text-cyan-400 uppercase tracking-[0.3em] whitespace-nowrap">
              Why sneaket
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-blue-500/50" />
          </motion.div>


          <p className="text-center mt-0 text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-12">
            Advanced Authentication and in Demand Sneaker Collections
          </p>
        </div>

        {/* Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Main Card Container */}
              <div className="relative h-full bg-gradient-to-br from-transparent to-gray-500/15 backdrop-blur-3xl border border-white/5 p-8 overflow-hidden transition-all duration-700 hover:bg-white/[0.03] hover:border-white/10">

                {/* Tech Corner Accents */}
                <div className={`absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:${card.accent}`} />
                <div className={`absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:${card.accent}`} />

                {/* Card Meta */}
                <div className="flex justify-between items-start mb-10">
                  <div className="p-4 bg-black/40 border border-white/5 backdrop-blur-xl group-hover:border-white/10 transition-all duration-500">
                    <div className="transition-transform duration-500 group-hover:scale-110">
                      {card.icon}
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.4em]">{card.tag}</span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-lemon text-white uppercase mb-1 tracking-tight">
                    {card.title}
                  </h3>
                  <p className={`text-[10px] font-mono opacity-60 uppercase tracking-[0.3em] mb-4 ${card.accent.replace('border-', 'text-')}`}>
                    {card.subtitle}
                  </p>
                  <p className="text-sm text-gray-500 font-mono leading-relaxed group-hover:text-gray-300 transition-colors uppercase tracking-wider">
                    {card.desc}
                  </p>
                </div>

                {/* Hover Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
