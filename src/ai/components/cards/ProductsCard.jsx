import { useNavigate } from "react-router-dom";

// Horizontal product list. Tapping an item closes the drawer and opens the
// product page (reuses the existing /products/:id experience).
export default function ProductsCard({ data, onClose }) {
  const products = data || [];
  const navigate = useNavigate();
  if (!products.length) {
    return (
      <div className="w-full max-w-[300px] rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-gray-300">
        No products to show right now.
      </div>
    );
  }
  const open = (id) => {
    if (onClose) onClose();
    navigate(`/products/${id}`);
  };
  return (
    <div className="w-full max-w-[300px] rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-2">
        Latest Products
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
        {products.map((p) => (
          <button
            key={p.id}
            onClick={() => open(p.id)}
            className="shrink-0 w-32 rounded-lg border border-white/10 bg-black/30 p-2 text-left hover:border-cyan-500/40 transition-all"
          >
            <img
              src={p.img}
              alt={p.name}
              className="w-full h-24 object-contain rounded-md bg-gradient-to-b from-[#1a2333]/50 to-transparent border border-white/10"
            />
            <p className="text-white text-[11px] font-medium mt-1 truncate">{p.name}</p>
            <p className="text-gray-500 text-[9px] font-mono">{p.brand}</p>
            <p className="text-white text-xs font-mono mt-0.5">₹{Number(p.price).toLocaleString()}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
