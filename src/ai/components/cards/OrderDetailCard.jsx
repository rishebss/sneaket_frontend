import CardLink from "./CardLink";

function StatusBadge({ status }) {
  const s = (status || "").toLowerCase();
  const color =
    s.includes("cancel") || s.includes("refund")
      ? "text-red-400 border-red-500/40 bg-red-500/10"
      : s.includes("deliver") || s === "confirmed"
      ? "text-green-400 border-green-500/40 bg-green-500/10"
      : "text-cyan-300 border-cyan-500/40 bg-cyan-500/10";
  return (
    <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-sm border ${color}`}>
      {status}
    </span>
  );
}

export default function OrderDetailCard({ data, onClose }) {
  if (!data) return null;
  const items = data.items || [];
  return (
    <div className="w-full max-w-[300px] rounded-xl border border-white/10 bg-white/5 p-3 space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-white text-sm font-medium">#{data.order_number}</p>
        <StatusBadge status={data.status} />
      </div>
      {data.delivery_date && (
        <p className="text-gray-400 text-[10px] font-mono">Est. delivery: {data.delivery_date}</p>
      )}
      <div className="space-y-1 border-t border-white/10 pt-2">
        {items.map((it, i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <span className="text-gray-300 truncate">
              {it.sneaker_name} {it.size ? `· US ${it.size}` : ""} ×{it.quantity}
            </span>
            <span className="text-white font-mono">₹{Number(it.line_total).toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-white/10 pt-2">
        <span className="text-white font-mono font-bold">Total</span>
        <span className="text-white font-mono font-bold">₹{Number(data.total).toLocaleString()}</span>
      </div>
      <CardLink label="View Orders" path="/accounts?tab=orders" onClose={onClose} />
    </div>
  );
}
