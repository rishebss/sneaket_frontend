import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiAlertTriangle } from "react-icons/fi";

export default function ConfirmCancel({
    isOpen,
    onClose,
    onConfirm,
    order,
    busy = false,
}) {
    const [reason, setReason] = useState("");

    const handleClose = () => {
        setReason("");
        onClose();
    };

    const handleConfirm = () => {
        onConfirm(reason.trim());
        setReason("");
        onClose();
    };

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
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="group/modal relative w-full max-w-md bg-gradient-to-b from-[#142036]/95 via-[#0f182b]/95 to-[#0b111e]/95 backdrop-blur-2xl border border-blue-500/20 shadow-[0_0_50px_rgba(15,23,42,0.9)] overflow-hidden z-10 p-6 md:p-8"
                    >
                        {/* Tech Corner Brackets */}
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
                                        CONFIRM CANCELLATION
                                    </span>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
                                >
                                    <FiX className="w-5 h-5" />
                                </button>
                            </div>

                            {order && (
                                <p className="text-xs font-mono text-gray-400 text-center mb-4">
                                    Order{" "}
                                    <span className="text-white">
                                        {order.order_number}
                                    </span>
                                </p>
                            )}

                            <p className="text-xs font-mono text-gray-400 text-center mb-4 leading-relaxed">
                                Are you sure you want to request cancellation for
                                this order? Our team will review your request.
                            </p>

                            <textarea
                                rows={3}
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="Reason (optional)"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-blue-500/50 transition-all resize-none mb-6"
                            />

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={handleClose}
                                    disabled={busy}
                                    className="group relative w-full overflow-hidden px-4 py-3 text-xs font-mono transition-all duration-500 hover:scale-[1.02] cursor-pointer bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] disabled:opacity-60"
                                >
                                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20 group-hover:border-white transition-all duration-300" />
                                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20 group-hover:border-white transition-all duration-300" />
                                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20 group-hover:border-white transition-all duration-300" />
                                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20 group-hover:border-white transition-all duration-300" />

                                    <span className="relative z-10 flex items-center justify-center gap-2 font-bold tracking-[0.15em]">
                                        KEEP ORDER
                                    </span>
                                </button>

                                <button
                                    onClick={handleConfirm}
                                    disabled={busy}
                                    className="group relative w-full overflow-hidden px-4 py-3 text-xs font-mono transition-all duration-500 hover:scale-[1.02] cursor-pointer bg-rose-500/30 border border-rose-500/30 text-white hover:bg-rose-500/40 hover:shadow-[0_0_30px_rgba(244,63,94,0.3)] disabled:opacity-60"
                                >
                                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20 group-hover:border-rose-400 group-hover:shadow-[0_0_8px_rgba(244,63,94,0.5)] transition-all duration-300" />
                                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20 group-hover:border-rose-400 group-hover:shadow-[0_0_8px_rgba(244,63,94,0.5)] transition-all duration-300" />
                                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20 group-hover:border-rose-400 group-hover:shadow-[0_0_8px_rgba(244,63,94,0.5)] transition-all duration-300" />
                                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20 group-hover:border-rose-400 group-hover:shadow-[0_0_8px_rgba(244,63,94,0.5)] transition-all duration-300" />

                                    <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-transparent to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <span className="relative z-10 flex items-center justify-center gap-2 font-bold tracking-[0.15em]">
                                        {busy ? "REQUESTING..." : "CANCEL"}
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
