import { motion } from "framer-motion";
import { FiShield, FiCpu, FiLock, FiGlobe, FiInfo } from "react-icons/fi";
import PixelBlast from "../usercomponents/PixelBlast";

export default function AboutContents({ variants }) {
    const sections = [
        {
            id: "origin",
            icon: FiGlobe,
            title: "THE ORIGIN",
            subtitle: "EST. 2024",
            content: "Sneaket emerged from the heart of the digital underground, founded by a collective of architects and street-culture purists. What started as a private Discord for grail hunters evolved into a decentralized network for high-end silhouettes. We don't just sell footwear; we preserve the timeline of industrial design as seen on the streets.",
            accent: "bg-cyan-500/10 text-cyan-400",
            hoverGrid: "rgba(34, 211, 238, 0.4)", // cyan-400
            glow: "rgba(34, 211, 238, 0.15)",
            variant: "square"
        },
        {
            id: "why",
            icon: FiCpu,
            title: "WHY SNEAKET?",
            subtitle: "THE ECOSYSTEM",
            content: "Our interface bridges the gap between raw streetwear energy and precision data. We provide more than a checkout—we offer a curated archival experience. Every SKU is vetted for its cultural significance, ensuring that your collection isn't just a set of items, but a portfolio of street history. Real-time sync, exclusive drops, and a community of verified collectors.",
            accent: "bg-purple-500/10 text-purple-400",
            hoverGrid: "rgba(192, 132, 252, 0.4)", // purple-400
            glow: "rgba(192, 132, 252, 0.15)",
            variant: "square"
        },
        {
            id: "authenticity",
            icon: FiShield,
            title: "AUTHENTICITY",
            subtitle: "VERIFIED_GRAILS",
            content: "Trust is our primary protocol. Every single piece flowing through Sneaket is subjected to a multi-stage physical and digital verification process. Our team of experts examines materials, stitching patterns, and manufacturing signatures to ensure 100% authenticity. We operate with a zero-tolerance policy for fakes—your grail is always the real deal.",
            accent: "bg-green-500/10 text-green-400",
            hoverGrid: "rgba(74, 222, 128, 0.4)", // green-400
            glow: "rgba(74, 222, 128, 0.15)",
            variant: "square"
        },
        {
            id: "privacy",
            icon: FiLock,
            title: "PRIVACY_POLICY",
            subtitle: "DATA_ENCRYPTION",
            content: "In our network, your data is as protected as your sneakers. We implement enterprise-grade encryption for every transaction and session. We do not sell your personal data; we only use it to optimize your shopping experience and secure your account. Your privacy is a fundamental right within the Sneaket ecosystem.",
            accent: "bg-amber-500/10 text-amber-400",
            hoverGrid: "rgba(251, 191, 36, 0.4)", // amber-400
            glow: "rgba(251, 191, 36, 0.15)",
            variant: "square"
        }
    ];

    return (
        <motion.div variants={variants} className="space-y-22 mt-[-70px] mb-24 pt-10">
            {sections.map((section, idx) => (
                <div key={section.id} className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
                    {/* Visual Side */}
                    <div className="w-full md:w-[40%] relative group h-[280px] overflow-hidden">
                        <div className="absolute inset-0 bg-white/[0.01] border border-white/5 transition-all duration-700 group-hover:bg-white/[0.03] group-hover:border-white/10" />

                        {/* Pixel Blast Background for the whole container */}
                        <div className="absolute inset-0 opacity-20 group-hover:opacity-60 transition-opacity duration-700" style={{
                            maskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)',
                            WebkitMaskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)'
                        }}>
                            <PixelBlast
                                variant={section.variant}
                                color={section.hoverGrid}
                                pixelSize={6}
                                patternScale={12}
                                patternDensity={0.6}
                                speed={0.15}
                                edgeFade={0}
                            />
                        </div>

                        {/* Tech Corner Accents */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/20 transition-all duration-500 group-hover:border-white/40 z-20" />
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/20 transition-all duration-500 group-hover:border-white/40 z-20" />

                        <div className="relative z-10 p-6 h-full flex flex-col items-center justify-center">
                            {/* Icon Box */}
                            <div className={`p-4 border border-white/10 bg-black/60 backdrop-blur-md ${section.accent.split(' ')[1]} mb-4 transition-transform duration-700 group-hover:scale-110 shadow-2xl`}>
                                <section.icon className="size-8" />
                            </div>

                            <h2 className="text-xl font-lemon tracking-tighter text-white/90 uppercase">{section.title}</h2>
                            <div className="h-px w-16 bg-white/10 my-3" />
                            <p className={`text-[8px] font-mono ${section.accent.split(' ')[1]} tracking-[0.4em] uppercase`}>{section.subtitle}</p>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full md:w-[70%] flex flex-col justify-center py-8">
                        <div className="flex items-center gap-4 mb-6">
                            <FiInfo className={`size-4 ${section.accent.split(' ')[1]}`} />
                            <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Protocols</span>
                        </div>
                        <p className="text-lg md:text-xl text-gray-400 font-mono leading-relaxed uppercase tracking-tight">
                            {section.content}
                        </p>
                        
                    </div>
                </div>
            ))}
        </motion.div>
    );
}
