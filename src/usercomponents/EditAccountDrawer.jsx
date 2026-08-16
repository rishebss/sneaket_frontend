import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiSave } from "react-icons/fi";
import GradientDrawerBg from "../usercomponents/GradientDrawerBg";

const InputField = ({ label, name, value, onChange, textarea }) => (
    <div>
        <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-2">
            {label}
        </label>
        {textarea ? (
            <textarea
                rows={3}
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-all resize-none"
            />
        ) : (
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-all"
            />
        )}
    </div>
);

export default function EditAccountDrawer({
    isOpen,
    onClose,
    form,
    setForm,
    saving,
    msg,
    onSave,
}) {
    const update = (name, val) => setForm((f) => ({ ...f, [name]: val }));

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
                        className="fixed top-0 right-0 h-full w-full md:max-w-md bg-black z-[100] shadow-2xl flex flex-col"
                    >
                        <GradientDrawerBg />
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-center justify-between p-4 border-b border-white/10">
                                <h2 className="text-lg font-mono text-white tracking-tight">
                                    Edit Account
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all"
                                >
                                    <FiX className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField label="First Name" name="first_name" value={form.first_name} onChange={update} />
                                    <InputField label="Last Name" name="last_name" value={form.last_name} onChange={update} />
                                    <div className="col-span-2">
                                        <InputField label="Email" name="email" value={form.email} onChange={update} />
                                    </div>
                                    <InputField label="Phone" name="phone" value={form.phone} onChange={update} />
                                    <InputField label="Pincode" name="pincode" value={form.pincode} onChange={update} />
                                    <InputField label="City" name="city" value={form.city} onChange={update} />
                                    <InputField label="State" name="state" value={form.state} onChange={update} />
                                    <div className="col-span-2">
                                        <InputField label="Address" name="address" value={form.address} onChange={update} textarea />
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 md:p-6 border-t border-white/10 space-y-3">
                                {msg && (
                                    <p
                                        className={`text-xs font-mono ${
                                            msg.type === "success"
                                                ? "text-green-400"
                                                : "text-red-400"
                                        }`}
                                    >
                                        {msg.text}
                                    </p>
                                )}
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={onSave}
                                        disabled={saving}
                                        className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-sm font-mono hover:bg-amber-500/30 transition-all cursor-pointer disabled:opacity-60"
                                    >
                                        <FiSave className="w-4 h-4" />
                                        {saving ? "SAVING..." : "SAVE"}
                                    </button>
                                    <button
                                        onClick={onClose}
                                        disabled={saving}
                                        className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-white/10 bg-white/5 text-gray-300 text-sm font-mono hover:bg-white/10 transition-all cursor-pointer disabled:opacity-60"
                                    >
                                        <FiX className="w-4 h-4" />
                                        CANCEL
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
