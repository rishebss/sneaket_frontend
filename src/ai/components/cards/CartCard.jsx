import { Link } from "react-router-dom";

export default function CartCard({ data }) {
  const items = data?.items || [];
  const total = data?.total || "0.00";
  if (!items.length) {
    return (
      <div className="w-full max-w-[300px] rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-gray-300">
        Your cart is empty.
      </div>
    );
  }
  return (
    <div className="w-full max-w-[300px] rounded-xl border border-white/10 bg-white/5 p-3 space-y-2">
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">
        Your Cart
      </div>
      {items.map((it) => (
        <div key={it.id} className="flex items-center gap-3">
          <img
            src={it.img}
            alt={it.name}
            className="w-10 h-10 rounded-md object-contain bg-gradient-to-b from-[#1a2333]/50 to-transparent border border-white/10 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium truncate">{it.name}</p>
            <p className="text-gray-500 text-[10px] font-mono">
              {it.brand}
              {it.size ? ` · US ${it.size}` : ""} · ×{it.quantity}
            </p>
          </div>
          <span className="text-white text-xs font-mono">₹{Number(it.line_total).toLocaleString()}</span>
        </div>
      ))}
      <div className="flex items-center justify-between border-t border-white/10 pt-2">
        <span className="text-white font-mono font-bold">Total</span>
        <span className="text-white font-mono font-bold">₹{Number(total).toLocaleString()}</span>
      </div>
      <Link
        to="/cart"
        className="block text-center text-xs font-semibold text-cyan-300 hover:text-cyan-200 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-full px-3 py-1.5 transition-all"
      >
        View Cart
      </Link>
    </div>
  );
}
