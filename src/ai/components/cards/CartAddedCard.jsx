import CardLink from "./CardLink";

// Confirmation card shown after add_to_cart.
export default function CartAddedCard({ data, onClose }) {
  if (!data) return null;
  return (
    <div className="w-fit max-w-[280px] rounded-xl border border-green-500/30 bg-green-500/10 p-3 flex items-start gap-3">
      <img
        src={data.img}
        alt={data.name}
        className="w-20 h-20 rounded-lg object-contain bg-white/5 border border-white/10 shrink-0"
      />
      <div className="flex-1 min-w-0 space-y-1">
        <p className="text-white text-sm font-semibold truncate">{data.name}</p>
        <p className="text-gray-300 text-xs font-mono">
          {data.size ? `US ${data.size}` : "OS"}
          {data.quantity > 1 ? ` · ×${data.quantity}` : ""}
        </p>
        <p className="text-green-400 text-sm font-semibold">${data.price}</p>
        <div className="pt-1">
          <CardLink label="View Cart" path="/cart" onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
