import { motion } from "framer-motion";

export default function AboutHeader({ variants }) {
    return (
        <header className="mb-24 mt-10 md:mt-24 text-left md:text-left">
            <motion.div variants={variants} className="flex items-left justify-left md:justify-start gap-3 mb-6">

                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.5em]">
                    Sneaket // About
                </span>
                <div className="h-px w-8 bg-cyan-500/50" />
            </motion.div>

            <motion.h1 variants={variants} className="text-3xl md:text-6xl font-sneaket leading-none mb-8 tracking-tighter">
                BEYOND FOOTWEAR
            </motion.h1>

            <motion.p variants={variants} className="max-w-2xl text-gray-400 text-lg md:text-xl font-light leading-relaxed">
                Sneaket is a curated sanctuary for the modern collector. We don't just trade footwear;
                we archive the history, design, and culture of the silhouettes that define our generation.
            </motion.p>
        </header>
    );
}
