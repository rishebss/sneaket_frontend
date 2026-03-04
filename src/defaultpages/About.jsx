import { motion } from "framer-motion";
import AboutHeader from "../defaultcomponents/AboutHeader";
import AboutPillars from "../defaultcomponents/AboutPillars";
import AboutSpecs from "../defaultcomponents/AboutSpecs";
import AboutContents from "../defaultcomponents/AboutContents";
import AboutBento from "../defaultcomponents/AboutBento";
import Footer from "../defaultcomponents/DefaultFooter";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="w-full bg-transparent text-white selection:bg-cyan-500/30 overflow-x-hidden font-sans">
      <main className="relative z-10 pt-32 px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          <AboutHeader variants={itemVariants} />
          <AboutPillars variants={itemVariants} />
          <AboutSpecs variants={itemVariants} />
          <AboutBento variants={itemVariants} />
          <AboutContents variants={itemVariants} />
          
        </motion.div>
        <Footer />
      </main>
      

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
        }
        @media (min-width: 768px) {
          .stroke-text {
            -webkit-text-stroke: 1.5px rgba(255,255,255,0.2);
          }
        }
      `}</style>
    </div>
  );
}
