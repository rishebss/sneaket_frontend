import { useNavigate } from "react-router-dom";

export default function AccountsOrders() {
    const navigate = useNavigate();

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
