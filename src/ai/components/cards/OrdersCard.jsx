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

export default function OrdersCard({ data, onClose }) {
  const orders = data || [];
  if (!orders.length) {
    return (
      <div className="w-full max-w-[300px] rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-gray-300">
        You don't have any orders yet.
      </div>
    );
  }
  return (
    <div className="w-full max-w-[300px] rounded-xl border border-white/10 bg-white/5 p-3 space-y-2">
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">
        Recent Orders
      </div>
      {orders.map((o) => (
        <div key={o.order_number} className="flex items-center justify-between gap-2 border-t border-white/10 pt-2 first:border-0 first:pt-0">
          <div className="min-w-0">
            <p className="text-white text-xs font-medium truncate">#{o.order_number}</p>
            <p className="text-gray-500 text-[10px] font-mono">
              {o.created_at} · {o.items?.length ?? o.items ?? "?"} item(s) · ₹{Number(o.total).toLocaleString()}
            </p>
          </div>
          <StatusBadge status={o.status} />
        </div>
      ))}
      <CardLink label="View Orders" path="/accounts?tab=orders" onClose={onClose} />
    </div>
  );
}
