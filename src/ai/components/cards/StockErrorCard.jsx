import { FiAlertTriangle } from "react-icons/fi";

export default function StockErrorCard({ data }) {
  const items = data || [];
  return (
    <div className="w-full max-w-[300px] rounded-xl border border-red-500/30 bg-red-500/10 p-3 space-y-1">
      <div className="flex items-center gap-2 text-red-400 text-xs font-semibold">
        <FiAlertTriangle className="w-3.5 h-3.5" />
        Some items are out of stock
      </div>
      {items.map((it, i) => (
        <p key={i} className="text-gray-300 text-[11px] font-mono">
          {it.sneaker}: {it.available} available (you wanted {it.requested})
        </p>
      ))}
    </div>
  );
}
