import { FiCheck, FiX } from "react-icons/fi";

// Presentational Confirm / Cancel pair for gated actions (cancel_order, checkout).
// The parent (ChatDrawer) owns the network call via onConfirm(token)/onCancel().
export default function ConfirmButtons({ action, onConfirm, onCancel, busy }) {
  if (!action) return null;
  return (
    <div className="mt-2 flex items-center gap-2">
      <button
        onClick={() => onConfirm(action.confirm_token)}
        disabled={busy}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-green-500/25 hover:bg-green-500/40 border border-green-500/40 rounded-full px-4 py-1.5 transition-all disabled:opacity-50"
      >
        <FiCheck className="w-3.5 h-3.5" />
        Confirm
      </button>
      <button
        onClick={onCancel}
        disabled={busy}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-1.5 transition-all disabled:opacity-50"
      >
        <FiX className="w-3.5 h-3.5" />
        Cancel
      </button>
    </div>
  );
}
