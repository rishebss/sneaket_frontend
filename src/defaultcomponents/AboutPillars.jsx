import { motion } from "framer-motion";
import { Shield, Zap, Globe } from "lucide-react";

export default function AboutPillars({ variants }) {
    const pillars = [
        { icon: Shield, title: "Protocol A", label: "LEGIT CHECK", desc: "Every pair is DNA-verified by our elite team. No fakes, no replicas—only 100% deadstock originals." },
        { icon: Zap, title: "Link v2.1", label: "THE DROP", desc: "Skip the L's. Our high-priority logistics ensure you secure your grails before the hype even peaks." },
        { icon: Globe, title: "Mesh Net", label: "THE NETWORK", desc: "A global sourcing web connecting you to exclusive region-locked pairs and deep-vault rarities." },
    ];

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
            {pillars.map((pillar, i) => (
                <motion.div
                    key={i}
                    variants={variants}
                    className="group relative p-8 bg-white/[0.02] border border-white/5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30 overflow-hidden"
                >
                    {/* Tech Corners */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-cyan-500 transition-colors" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-cyan-500 transition-colors" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-cyan-500 transition-colors" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-cyan-500 transition-colors" />

                    <div className="mb-6 flex justify-between items-start">
                        <pillar.icon className="size-6 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                        <span className="text-[8px] font-mono text-gray-600 uppercase tracking-widest">{pillar.title}</span>
                    </div>

                    <h3 className="font-lemon text-sm tracking-widest mb-3">{pillar.label}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-light">{pillar.desc}</p>
                </motion.div>
            ))}
        </div>
    );
}
