import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { FiX, FiTruck, FiCreditCard, FiDollarSign, FiCheck, FiEdit2 } from "react-icons/fi";
import GradientDrawerBg from "../usercomponents/GradientDrawerBg";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";

const API = import.meta.env.VITE_API_BASE_URL;

const fetchWallet = async () => {
    const token = localStorage.getItem("token");
    if (!token) return { balance: "0.00" };
    const res = await fetch(`${API}/api/wallet/`, {
        headers: { Authorization: `Token ${token}` },
    });
    if (!res.ok) return { balance: "0.00" };
    return res.json();
};

const SHIPPING_DISPLAY = [
    { name: "recipient", label: "Recipient Name" },
    { name: "email", label: "Email" },
];

const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

const SHIPPING_EDITABLE = [
    { name: "phone", label: "Phone" },
    { name: "state", label: "State", select: true },
    { name: "pincode", label: "Pincode" },
    { name: "city", label: "City" },
    { name: "address", label: "Address", textarea: true },
];

const StateSelect = ({ value, onChange }) => {
    const canonical =
        INDIAN_STATES.find(
            (s) => s.toLowerCase() === String(value || "").toLowerCase()
        ) || undefined;
    return (
        <Select
            value={canonical}
            onValueChange={(v) => onChange("state", v)}
        >
            <SelectTrigger>
                <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
                {INDIAN_STATES.map((s) => (
                    <SelectItem key={s} value={s}>
                        {s}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

const PAYMENT_METHODS = [
    {
        id: "wallet",
        label: "Pay with Wallet",
        icon: FiDollarSign,
        desc: "Pay using your SNEAKET wallet balance.",
    },
    {
        id: "online",
        label: "Pay Now",
        icon: FiCreditCard,
        desc: "Pay securely on razorpay via card, UPI, or net banking.",
    },
];

const Field = ({ label, name, value, onChange, textarea }) => (
    <div>
        <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-2">
            {label}
        </label>
        {textarea ? (
            <textarea
                rows={2}
                value={value || ""}
                onChange={(e) => onChange(name, e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all resize-none"
            />
        ) : (
            <input
                type="text"
                value={value || ""}
                onChange={(e) => onChange(name, e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
            />
        )}
    </div>
);

const DisplayRow = ({ label, value, wrap }) => (
    <div className="flex flex-col gap-1 bg-white/5 border border-white/10 rounded-lg p-3">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">
            {label}
        </span>
        <span
            className={`text-white text-sm font-mono ${
                wrap ? "whitespace-pre-wrap break-words" : "truncate"
            }`}
        >
            {value || "—"}
        </span>
    </div>
);

export default function CheckoutDrawer({
    isOpen,
    onClose,
    profile,
    items = [],
    subtotal = 0,
    placing,
    onPlaceOrder,
}) {
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        pincode: "",
        state: "",
        city: "",
    });
    const [paymentMethod, setPaymentMethod] = useState("online");
    const [editing, setEditing] = useState(false);

    const { data: walletData } = useQuery({
        queryKey: ["wallet"],
        queryFn: fetchWallet,
        enabled: isOpen,
    });
    const walletBalance = Number(walletData?.balance || 0);

    // Prefill shipping details from the account profile when available / drawer opens
    useEffect(() => {
        if (profile) {
            setForm({
                first_name: profile.first_name || "",
                last_name: profile.last_name || "",
                email: profile.email || "",
                phone: profile.profile?.phone || "",
                address: profile.profile?.address || "",
                pincode: profile.profile?.pincode || "",
                state: profile.profile?.state || "",
                city: profile.profile?.city || "",
            });
        }
        setEditing(false);
    }, [profile, isOpen]);

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
                                    Checkout
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all"
                                >
                                    <FiX className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar space-y-6">
                                {/* Shipping details (prefilled from profile) */}
                                <section>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-white font-mono font-bold tracking-widest uppercase text-xs">
                                            Shipping Details
                                        </h3>
                                        <button
                                            onClick={() => setEditing((e) => !e)}
                                            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[10px] font-mono uppercase tracking-wider transition-all ${
                                                editing
                                                    ? "border-blue-500/50 bg-blue-500/10 text-blue-300"
                                                    : "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                                            }`}
                                        >
                                            {editing ? (
                                                <>
                                                    <FiCheck className="w-3.5 h-3.5" />
                                                    Done
                                                </>
                                            ) : (
                                                <>
                                                    <FiEdit2 className="w-3.5 h-3.5" />
                                                    Edit
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {/* Non-editable identity fields — plain text, no box */}
                                    <div className="space-y-2">
                                        {SHIPPING_DISPLAY.map((f) => {
                                            const value =
                                                f.name === "recipient"
                                                    ? `${form.first_name} ${form.last_name}`.trim()
                                                    : form[f.name];
                                            return (
                                                <div
                                                    key={f.name}
                                                    className="flex flex-col gap-0.5"
                                                >
                                                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">
                                                        {f.label}
                                                    </span>
                                                    <span className="text-white text-sm font-mono">
                                                        {value || "—"}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Editable address fields */}
                                    <div className="mt-4 space-y-3">
                                        {/* Phone + State in the same row */}
                                        <div className="grid grid-cols-2 gap-3">
                                            {editing ? (
                                                <Field
                                                    label="Phone"
                                                    name="phone"
                                                    value={form.phone}
                                                    onChange={update}
                                                />
                                            ) : (
                                                <DisplayRow
                                                    label="Phone"
                                                    value={form.phone}
                                                />
                                            )}
                                            {editing ? (
                                                <div>
                                                    <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-2">
                                                        State
                                                    </label>
                                                    <StateSelect
                                                        value={form.state}
                                                        onChange={update}
                                                    />
                                                </div>
                                            ) : (
                                                <DisplayRow
                                                    label="State"
                                                    value={form.state}
                                                />
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            {editing ? (
                                                <Field
                                                    label="Pincode"
                                                    name="pincode"
                                                    value={form.pincode}
                                                    onChange={update}
                                                />
                                            ) : (
                                                <DisplayRow
                                                    label="Pincode"
                                                    value={form.pincode}
                                                />
                                            )}
                                            {editing ? (
                                                <Field
                                                    label="City"
                                                    name="city"
                                                    value={form.city}
                                                    onChange={update}
                                                />
                                            ) : (
                                                <DisplayRow
                                                    label="City"
                                                    value={form.city}
                                                />
                                            )}
                                        </div>

                                        {editing ? (
                                            <Field
                                                label="Address"
                                                name="address"
                                                value={form.address}
                                                onChange={update}
                                                textarea
                                            />
                                        ) : (
                                            <DisplayRow
                                                label="Address"
                                                value={form.address}
                                                wrap
                                            />
                                        )}
                                    </div>
                                </section>

                                {/* Payment method */}
                                <section>
                                    <h3 className="text-white font-mono font-bold tracking-widest uppercase text-xs mb-4">
                                        Payment Method
                                    </h3>
                                    <div className="flex flex-col gap-3">
                                        {PAYMENT_METHODS.map((m) => {
                                            const Icon = m.icon;
                                            const active = paymentMethod === m.id;
                                            const isWallet = m.id === "wallet";
                                            const insufficient =
                                                isWallet && walletBalance < subtotal;
                                            const disabled = insufficient;
                                            return (
                                                <button
                                                    key={m.id}
                                                    type="button"
                                                    disabled={disabled}
                                                    onClick={() =>
                                                        !disabled && setPaymentMethod(m.id)
                                                    }
                                                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all text-left relative ${
                                                        disabled
                                                            ? "border-white/10 bg-white/5 opacity-60 cursor-not-allowed"
                                                            : active
                                                            ? "border-yellow-500/50 bg-yellow-400/20"
                                                            : "border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer"
                                                    }`}
                                                >
                                                    {isWallet && (
                                                        <span className="absolute top-2 right-2 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-sm border border-green-500/40 bg-green-500/10 text-green-400">
                                                            ₹
                                                            {walletBalance.toLocaleString(
                                                                "en-IN"
                                                            )}
                                                        </span>
                                                    )}
                                                    {insufficient && (
                                                        <span className="absolute bottom-2 right-2 text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-sm border border-red-500/40 bg-red-500/10 text-red-400">
                                                            Insufficient
                                                        </span>
                                                    )}
                                                    <div
                                                        className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center border border-white bg-white/5 text-white transition-all"
                                                    >
                                                        <Icon className="w-5 h-5" />
                                                    </div>
                                                    <div className={`flex-1 min-w-0 ${isWallet ? "pr-24" : ""}`}>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                                                                {m.label}
                                                            </span>
                                                            {active && !disabled && (
                                                                <FiCheck className="w-3.5 h-3.5 text-yellow-400" />
                                                            )}
                                                        </div>
                                                        <p className="text-[11px] text-gray-400 leading-snug mt-0.5">
                                                            {m.desc}
                                                        </p>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </section>

                                {/* Order summary */}
                                <section>
                                    <h3 className="text-white font-mono font-bold tracking-widest uppercase text-xs mb-4">
                                        Order Summary
                                    </h3>
                                    <div className="space-y-3">
                                        {items.map((it) => (
                                            <div
                                                key={it.id}
                                                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-3"
                                            >
                                                <img
                                                    src={it.sneaker_image}
                                                    alt={it.sneaker_name}
                                                    className="w-12 h-12 rounded-md object-contain bg-gradient-to-b from-[#1a2333]/50 to-transparent border border-white/10 shrink-0"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-white text-sm font-mono truncate">
                                                        {it.sneaker_name}
                                                    </p>
                                                    <p className="text-gray-500 text-xs font-mono">
                                                        {it.size ? `US ${it.size} · ` : ""}
                                                        Qty {it.quantity}
                                                    </p>
                                                </div>
                                                <span className="text-white text-sm font-mono">
                                                    ₹
                                                    {(
                                                        parseFloat(it.sneaker_price) *
                                                        it.quantity
                                                    ).toLocaleString()}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                                        <span className="text-white font-mono font-bold">
                                            Total
                                        </span>
                                        <span className="text-white font-mono font-bold text-lg">
                                            ₹{subtotal.toLocaleString()}
                                        </span>
                                    </div>
                                </section>
                            </div>

                            {/* Footer */}
                            <div className="p-4 md:p-6 border-t border-white/10">
                                <button
                                    onClick={() => onPlaceOrder({ ...form, payment_method: paymentMethod })}
                                    disabled={placing}
                                    className="group relative w-full flex items-center justify-center gap-2 h-12 overflow-hidden bg-green-500/30 px-6 text-sm font-mono text-white transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] cursor-pointer disabled:opacity-60"
                                >
                                    {placing ? "PROCESSING..." : "CONFIRM"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
