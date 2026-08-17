import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FiPlus, FiArrowDownLeft, FiArrowUpRight, FiCheck } from "react-icons/fi";
import Loader from "../defaultcomponents/Loader";
import LoginRewardButton from "./LoginRewardButton";

const API = import.meta.env.VITE_API_BASE_URL;

const loadRazorpayScript = () =>
    new Promise((resolve) => {
        if (window.Razorpay) return resolve(true);
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });

const fetchWallet = async () => {
    const token = localStorage.getItem("token");
    if (!token) return { balance: "0.00", transactions: [] };
    const res = await fetch(`${API}/api/wallet/`, {
        headers: { Authorization: `Token ${token}` },
    });
    if (!res.ok) throw new Error("Failed to load wallet");
    return res.json();
};

const formatINR = (n) =>
    `₹${Number(n).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

const REASON_LABEL = {
    add_money: "Added to wallet",
    refund: "Order refund",
    purchase: "Order purchase",
    daily_reward: "Daily login reward",
};

export default function WalletSettings() {
    const queryClient = useQueryClient();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["wallet"],
        queryFn: fetchWallet,
    });
    const [amount, setAmount] = useState("");
    const [adding, setAdding] = useState(false);

    if (isLoading) {
        return (
            <div className="p-6 rounded-md border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center min-h-[300px]">
                <Loader />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6 rounded-md border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col items-center justify-center min-h-[300px] text-center">
                <p className="text-red-400 font-mono text-xs">
                    Could not load your wallet.
                </p>
            </div>
        );
    }

    const balance = data?.balance ?? "0.00";
    const transactions = data?.transactions ?? [];

    const handleAddMoney = async () => {
        const value = parseFloat(amount);
        if (!value || value <= 0) return;
        const token = localStorage.getItem("token");
        if (!token) return;

        setAdding(true);
        try {
            const res = await fetch(`${API}/api/wallet/add/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({ amount: value }),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                alert(err.error || "Could not start top-up");
                setAdding(false);
                return;
            }
            const order = await res.json();

            const ok = await loadRazorpayScript();
            if (!ok) {
                alert("Could not load the payment gateway");
                setAdding(false);
                return;
            }
            setAdding(false);

            const rzp = new window.Razorpay({
                key: order.razorpay_key,
                amount: order.amount,
                currency: order.currency || "INR",
                name: "SNEAKET Wallet",
                description: "Add money to wallet",
                order_id: order.razorpay_order_id,
                theme: { color: "#10b981" },
                handler: async (response) => {
                    try {
                        const vres = await fetch(
                            `${API}/api/wallet/add/verify/`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Token ${token}`,
                                },
                                body: JSON.stringify({
                                    razorpay_order_id:
                                        response.razorpay_order_id,
                                    razorpay_payment_id:
                                        response.razorpay_payment_id,
                                    razorpay_signature:
                                        response.razorpay_signature,
                                }),
                            }
                        );
                        if (vres.ok) {
                            queryClient.invalidateQueries({
                                queryKey: ["wallet"],
                            });
                            setAmount("");
                        } else {
                            const verr = await vres.json().catch(() => ({}));
                            alert(verr.error || "Top-up verification failed");
                        }
                    } catch {
                        alert("Verification failed. Please contact support.");
                    }
                },
            });
            rzp.on("payment.failed", (e) => {
                alert(e?.error?.description || "Payment failed");
            });
            rzp.open();
        } catch {
            setAdding(false);
            alert("Something went wrong");
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left column: balance + add money */}
            <div className="lg:order-2 self-start p-6 rounded-md border border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-white font-mono font-bold tracking-widest uppercase text-sm mb-6">
                    Wallet
                </h3>

                {/* Balance */}
                <div className="flex flex-col items-center justify-center gap-1 py-6 rounded-lg bg-green-500/10 border border-green-500/30">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-green-400/80">
                        Wallet Balance
                    </span>
                    <span className="text-3xl font-mono font-bold text-green-300">
                        {formatINR(balance)}
                    </span>
                </div>

                {/* Add money */}
                <div className="mt-6 flex items-center gap-3">
                    <input
                        type="number"
                        min="1"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="min-w-0 flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm font-mono focus:outline-none focus:border-green-500/50 transition-all"
                    />
                    <button
                        onClick={handleAddMoney}
                        disabled={adding}
                        className="shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-green-500/30 border border-green-500/40 text-green-200 text-xs font-mono tracking-wider uppercase transition-all hover:bg-green-500/40 hover:shadow-[0_0_20px_rgba(34,197,94,0.25)] disabled:opacity-60 cursor-pointer"
                    >
                        <FiPlus className="w-4 h-4" />
                        Add
                    </button>
                </div>

                {/* Withdraw amount banner (disabled / coming soon) */}
                <div className="mt-4 flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-white/5 opacity-60 cursor-not-allowed">
                    <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center border border-white/20 bg-white/5 text-white">
                        <FiArrowUpRight className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                                Withdraw Wallet
                            </span>
                            <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-sm border border-yellow-500/40 bg-yellow-500/10 text-yellow-400">
                                Soon
                            </span>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-snug mt-0.5">
                            Link your bank account to withdraw.
                        </p>
                    </div>
                </div>

                {/* Daily login reward */}
                <LoginRewardButton />
            </div>

            {/* Right column: transactions in its own container */}
            <div className="lg:order-1 lg:min-h-[460px] p-6 rounded-md border border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-white font-mono font-bold tracking-widest uppercase text-sm mb-6">
                    Transactions
                </h3>

                {transactions.length === 0 ? (
                    <p className="text-gray-500 font-mono text-xs">
                        No transactions yet.
                    </p>
                ) : (
                    <div className="space-y-2">
                        {transactions.map((t) => (
                            <div
                                key={t.id}
                                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-3"
                            >
                                <div
                                    className={`w-9 h-9 rounded-full flex items-center justify-center border ${
                                        t.type === "credit"
                                            ? "border-green-500/40 bg-green-500/10 text-green-400"
                                            : "border-red-500/40 bg-red-500/10 text-red-400"
                                    }`}
                                >
                                    {t.type === "credit" ? (
                                        <FiArrowDownLeft className="w-4 h-4" />
                                    ) : (
                                        <FiArrowUpRight className="w-4 h-4" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white text-sm font-mono">
                                        {REASON_LABEL[t.reason] || t.reason}
                                    </p>
                                    <p className="text-gray-500 text-[10px] font-mono">
                                        {formatDate(t.created_at)}
                                    </p>
                                </div>
                                <span
                                    className={`font-mono font-bold ${
                                        t.type === "credit"
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    {t.type === "credit" ? "+" : "-"}
                                    {formatINR(t.amount)}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
