import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheck } from "react-icons/fi";
import { useQueryClient } from "@tanstack/react-query";
import { Lottie } from "lottie-react";
import giftData from "../assets/Gift.json";

const API = import.meta.env.VITE_API_BASE_URL;

export default function LoginRewardDialog({ open, onClose, rewardClaimed }) {
    const queryClient = useQueryClient();
    const [claiming, setClaiming] = useState(false);

    const handleClaim = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
        setClaiming(true);
        try {
            const res = await fetch(`${API}/api/users/claim-daily-reward`, {
                method: "POST",
                headers: { Authorization: `Token ${token}` },
            });
            if (res.ok) {
                queryClient.invalidateQueries({ queryKey: ["wallet"] });
                queryClient.invalidateQueries({ queryKey: ["me"] });
                onClose();
            }
        } finally {
            setClaiming(false);
        }
    };

    if (!open) return null;

    return createPortal(
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="group/modal relative w-full max-w-md bg-gradient-to-b from-[#142036]/95 via-[#0f182b]/95 to-[#0b111e]/95 backdrop-blur-2xl border border-blue-500/20 shadow-[0_0_50px_rgba(15,23,42,0.9)] overflow-hidden z-10 p-6 md:p-8"
                    >
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/30 group-hover/modal:border-cyan-400 transition-all duration-300" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/30 group-hover/modal:border-cyan-400 transition-all duration-300" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/30 group-hover/modal:border-cyan-400 transition-all duration-300" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/30 group-hover/modal:border-cyan-400 transition-all duration-300" />

                        <div className="relative z-10 text-center">
                            <button
                                onClick={onClose}
                                className="absolute -top-2 -right-2 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
                            >
                                <FiX className="w-5 h-5" />
                            </button>

                            <Lottie
                                src={giftData}
                                loop
                                autoplay
                                className="w-36 h-36 mx-auto mb-2"
                            />

                            <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-white font-bold mb-2">
                                Daily Login Reward
                            </h3>
                            <p className="text-xs font-mono text-gray-400 leading-relaxed mb-2">
                                {rewardClaimed
                                    ? "You've already claimed today's reward. Come back tomorrow!"
                                    : "Claim ₹25 free, every day you log in."}
                            </p>
                            <p className="text-2xl font-mono font-bold text-green-300">
                                +₹25
                            </p>

                            {rewardClaimed ? (
                                <button
                                    onClick={onClose}
                                    className="group relative w-full mt-6 overflow-hidden px-4 py-3 text-xs font-mono transition-all duration-500 hover:scale-[1.02] cursor-pointer bg-white/10 border border-white/15 text-white hover:bg-white/15"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2 font-bold tracking-[0.15em]">
                                        DONE
                                    </span>
                                </button>
                            ) : (
                                <button
                                    onClick={handleClaim}
                                    disabled={claiming}
                                    className="group relative w-full mt-6 overflow-hidden px-4 py-3 text-xs font-mono transition-all duration-500 hover:scale-[1.02] cursor-pointer bg-green-500/30 border border-green-500/40 text-white hover:bg-green-500/40 disabled:opacity-60"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2 font-bold tracking-[0.15em]">
                                        {claiming ? (
                                            "Claiming..."
                                        ) : (
                                            <>
                                                <FiCheck className="w-4 h-4" />
                                                Claim Reward
                                            </>
                                        )}
                                    </span>
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
