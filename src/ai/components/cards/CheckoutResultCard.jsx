import { FiCheck } from "react-icons/fi";
import CardLink from "./CardLink";

export default function CheckoutResultCard({ data, onClose }) {
  if (!data) return null;
  return (
    <div className="w-full max-w-[300px] rounded-xl border border-green-500/30 bg-green-500/10 p-3 space-y-2">
      <div className="flex items-center gap-2 text-green-400">
        <FiCheck className="w-4 h-4" />
        <span className="text-sm font-semibold">Order placed!</span>
      </div>
      <p className="text-white text-xs font-mono">
        #{data.order_number} · ₹{Number(data.total).toLocaleString()} · {data.payment}
      </p>
      <CardLink label="View Orders" path="/accounts?tab=orders" onClose={onClose} />
    </div>
  );
}
