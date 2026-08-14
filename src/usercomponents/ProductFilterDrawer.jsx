import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useEffect } from "react";
import GradientDrawerBg from "./GradientDrawerBg";

export default function ProductFilterDrawer({
  isOpen,
  onClose,
  onPopStateClose,
  categories,
  brands,
  features,
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  selectedFeature,
  setSelectedFeature,
  onReset,
}) {
  useEffect(() => {
    const handlePopState = () => {
      if (isOpen) {
        onPopStateClose();
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isOpen, onPopStateClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:max-w-sm bg-black z-[100] shadow-2xl flex flex-col overflow-hidden"
          >
            <GradientDrawerBg />
            <div className="relative z-10 flex flex-col h-full p-8 overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-xl font-mono text-white tracking-tight">
                  Filters
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-10">
                <div>
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <span className="w-1 h-1 bg-cyan-500 rounded-lg" />
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                          selectedCategory === cat.id
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold"
                            : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <span className="w-1 h-1 bg-blue-500 rounded-lg" />
                    Brands
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {brands.map((brand) => (
                      <button
                        key={brand.id}
                        onClick={() => setSelectedBrand(brand.id)}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                          selectedBrand === brand.id
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold"
                            : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                        }`}
                      >
                        {brand.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <span className="w-1 h-1 bg-blue-500 rounded-lg" />
                    Features
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {features.map((feature) => (
                      <button
                        key={feature.id}
                        onClick={() => setSelectedFeature(feature.id)}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                          selectedFeature === feature.id
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold"
                            : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                        }`}
                      >
                        {feature.name}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onReset}
                  className="w-full py-4 mt-8 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-mono"
                >
                  RESET FILTERS
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
