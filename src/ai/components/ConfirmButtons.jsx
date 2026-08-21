import { FiCheck, FiX } from "react-icons/fi";

// Presentational Confirm / Cancel pair for gated actions (cancel_order, checkout).
// When `action.options` is present (checkout without a chosen payment method),
// each option is rendered as its own button, each carrying its own confirm_token.
// The parent (ChatDrawer) owns the network call via onConfirm(token)/onCancel().
export default function ConfirmButtons({ action, onConfirm, onCancel, busy }) {
  if (!action) return null;

  if (Array.isArray(action.options) && action.options.length) {
    return (
      <div className="mt-2 flex flex-col gap-2">
        {action.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => onConfirm(opt.confirm_token)}
            disabled={busy}
            className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-cyan-500/20 hover:bg-cyan-500/35 border border-cyan-500/40 rounded-full px-4 py-1.5 transition-all disabled:opacity-50"
          >
            {opt.label}
          </button>
        ))}
        <button
          onClick={onCancel}
          disabled={busy}
          className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-1.5 transition-all disabled:opacity-50"
        >
          <FiX className="w-3.5 h-3.5" />
          Cancel
        </button>
      </div>
    );
  }

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
