import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiX, FiAlertTriangle } from "react-icons/fi";

export default function ConfirmRemoveModal({
  isOpen,
  onClose,
  onConfirm,
  item,
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Container with Add-To-Cart Tech Style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="group/modal relative w-full max-w-md bg-gradient-to-b from-[#142036]/95 via-[#0f182b]/95 to-[#0b111e]/95 backdrop-blur-2xl border border-blue-500/20 shadow-[0_0_50px_rgba(15,23,42,0.9)] overflow-hidden z-10 p-6 md:p-8"
          >

            {/* Modal Tech Corner Brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/30 group-hover/modal:border-cyan-400 group-hover/modal:shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all duration-300" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/30 group-hover/modal:border-cyan-400 group-hover/modal:shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all duration-300" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/30 group-hover/modal:border-cyan-400 group-hover/modal:shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all duration-300" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/30 group-hover/modal:border-cyan-400 group-hover/modal:shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all duration-300" />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <FiAlertTriangle className="w-4 h-4 text-rose-400" />
                  <span className="text-sm font-mono uppercase tracking-[0.2em] text-white font-bold">
                    CONFIRM REMOVAL
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Product Preview Card */}
              {item && (
                <div className="flex items-center gap-4 p-3 border border-white/10 bg-white/5 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-b from-[#1a2333]/50 to-transparent border border-white/10 p-1 flex-shrink-0 overflow-hidden">
                    <img
                      src={item.sneaker_image}
                      alt={item.sneaker_name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-0.5">
                      {item.sneaker_brand}
                    </span>
                    <h4 className="text-sm font-medium text-white/90 truncate">
                      {item.sneaker_name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      {item.size && (
                        <span className="text-[10px] font-mono text-cyan-400 bg-white/5 border border-white/10 px-2 py-0.5">
                          US {item.size}
                        </span>
                      )}
                      <span className="text-xs font-mono text-gray-400">
                        ₹{parseFloat(item.sneaker_price).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-xs font-mono text-gray-400 text-center mb-6 leading-relaxed">
                Are you sure you want to remove this item from your cart?
              </p>

              {/* Tech Action Buttons (Add to Cart style) */}
              <div className="grid grid-cols-2 gap-4">
                {/* KEEP ITEM BUTTON */}
                <button
                  onClick={onClose}
                  className="group relative w-full overflow-hidden px-4 py-3 text-xs font-mono transition-all duration-500 hover:scale-[1.02] cursor-pointer bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                >
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20 group-hover:border-white transition-all duration-300" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20 group-hover:border-white transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20 group-hover:border-white transition-all duration-300" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20 group-hover:border-white transition-all duration-300" />

                  <span className="relative z-10 flex items-center justify-center gap-2 font-bold tracking-[0.15em]">
                    KEEP ITEM
                  </span>
                </button>

                {/* REMOVE BUTTON */}
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="group relative w-full overflow-hidden px-4 py-3 text-xs font-mono transition-all duration-500 hover:scale-[1.02] cursor-pointer bg-rose-500/30 border border-rose-500/30 text-white hover:bg-rose-500/40 hover:shadow-[0_0_30px_rgba(244,63,94,0.3)]"
                >
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20 group-hover:border-rose-400 group-hover:shadow-[0_0_8px_rgba(244,63,94,0.5)] transition-all duration-300" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20 group-hover:border-rose-400 group-hover:shadow-[0_0_8px_rgba(244,63,94,0.5)] transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20 group-hover:border-rose-400 group-hover:shadow-[0_0_8px_rgba(244,63,94,0.5)] transition-all duration-300" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20 group-hover:border-rose-400 group-hover:shadow-[0_0_8px_rgba(244,63,94,0.5)] transition-all duration-300" />

                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-transparent to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <span className="relative z-10 flex items-center justify-center gap-2 font-bold tracking-[0.15em]">
                    <FiTrash2 className="w-3.5 h-3.5 text-rose-400" />
                    <span>REMOVE</span>
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
