import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Loader from "../defaultcomponents/Loader";

const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) return [];
    const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders/`,
        { headers: { Authorization: `Token ${token}` } }
    );
    if (!res.ok) throw new Error("Failed to load orders");
    return res.json();
};

const STATUS_BADGE = {
    pending_payment: "border-yellow-500/40 bg-yellow-500/10 text-yellow-300",
    confirmed: "border-green-500/40 bg-green-500/10 text-green-300",
    processing: "border-blue-500/40 bg-blue-500/10 text-blue-300",
    shipped: "border-blue-500/40 bg-blue-500/10 text-blue-300",
    delivered: "border-green-500/40 bg-green-500/10 text-green-300",
    cancelled: "border-red-500/40 bg-red-500/10 text-red-300",
    refunded: "border-red-500/40 bg-red-500/10 text-red-300",
};

const PAYMENT_BADGE = {
    pending: "border-yellow-500/40 bg-yellow-500/10 text-yellow-300",
    paid: "border-green-500/40 bg-green-500/10 text-green-300",
    failed: "border-red-500/40 bg-red-500/10 text-red-300",
    refunded: "border-red-500/40 bg-red-500/10 text-red-300",
};

const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

const formatINR = (n) =>
    `₹${Number(n).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

export default function AccountsOrders() {
    const navigate = useNavigate();
    const { data: orders, isLoading, isError } = useQuery({
        queryKey: ["orders"],
        queryFn: fetchOrders,
    });

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
                    Could not load your orders.
                </p>
            </div>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="p-6 rounded-md border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col items-center justify-center min-h-[300px] text-center">
                <img
                    src="/shopping-bag.svg"
                    alt="Orders"
                    className="w-24 h-24 opacity-70 mb-4"
                />
                <h3 className="text-white font-mono text-sm tracking-widest uppercase">
                    No orders yet
                </h3>
                <p className="text-gray-500 font-mono text-xs mt-2 max-w-xs">
                    When you place an order it will show up here.
                </p>
                <button
                    onClick={() => navigate("/products")}
                    className="mt-6 flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-300 text-sm font-mono hover:bg-blue-500/30 transition-all cursor-pointer"
                >
                    Start Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="max-h-[70vh] overflow-y-auto custom-scrollbar pr-2 space-y-4">
            {orders.map((o) => (
                <div
                    key={o.order_number}
                    className="rounded-md border border-white/10 bg-white/5 backdrop-blur-xl p-5"
                >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                            <p className="text-white font-mono text-sm tracking-wider uppercase">
                                {o.order_number}
                            </p>
                            <p className="text-gray-500 font-mono text-[11px] mt-1">
                                {formatDate(o.created_at)}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span
                                className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full border ${
                                    STATUS_BADGE[o.status] ||
                                    "border-white/20 bg-white/5 text-gray-300"
                                }`}
                            >
                                {o.status.replace("_", " ")}
                            </span>
                            <span
                                className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full border ${
                                    PAYMENT_BADGE[o.payment_status] ||
                                    "border-white/20 bg-white/5 text-gray-300"
                                }`}
                            >
                                {o.payment_status}
                            </span>
                        </div>
                    </div>

                    {/* Items */}
                    <div className="mt-4 space-y-3">
                        {o.items.map((it) => (
                            <div
                                key={it.id}
                                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-3"
                            >
                                <img
                                    src={
                                        it.sneaker_image ||
                                        "/shopping-bag.svg"
                                    }
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
                                    {formatINR(it.line_total)}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Total */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                        <span className="text-white font-mono font-bold">
                            Total
                        </span>
                        <span className="text-white font-mono font-bold text-lg">
                            {formatINR(o.total)}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
