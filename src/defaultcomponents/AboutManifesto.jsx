import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export default function AboutManifesto({ variants }) {
    return (
        <motion.section
            variants={variants}
            className="mb-32 p-10 bg-gray-900/40 border border-white/5 rounded-sm font-mono overflow-hidden relative"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10">

            </div>

            <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
                <div className="size-2 rounded-full bg-red-500" />
                <div className="size-2 rounded-full bg-amber-500" />
                <div className="size-2 rounded-full bg-green-500" />
                <span className="text-[10px] text-gray-600 ml-4 uppercase tracking-widest">Manifesto.exe</span>
            </div>

            <div className="space-y-6 text-sm md:text-base leading-relaxed text-gray-300">
                <p>
                    <span className="text-cyan-400">$</span> INITIALIZING CULTURE_CORE...
                </p>
                <p>
                    WE ARE NOT MERELY A STORE. WE ARE THE GUARDIANS OF THE HYPE.
                    A SNEAKER IS NO LONGER JUST APPAREL; IT IS A STATEMENT, A GRAIL,
                    A PIECE OF THE NEW STREET ARCHIVE.
                </p>
                <p>
                    SNEAKET IS THE CULTURE. SNEAKET IS THE FUTURE.
                </p>
                <div className="flex gap-2 text-cyan-500 animate-pulse">
                    <span>_</span>
                </div>
            </div>
        </motion.section>
    );
}
