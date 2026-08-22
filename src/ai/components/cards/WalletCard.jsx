import { useState } from "react";
import { FiGift } from "react-icons/fi";

const API = import.meta.env.VITE_API_BASE_URL;

export default function WalletCard({ data }) {
  const [balance, setBalance] = useState(data?.balance ?? "0.00");
  const [claimed, setClaimed] = useState(!!data?.daily_reward_claimed);
  const [busy, setBusy] = useState(false);

  const claim = async () => {
    setBusy(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/api/users/claim-daily-reward`, {
        method: "POST",
        headers: { Authorization: `Token ${token}` },
      });
      if (res.ok) {
        const d = await res.json();
        setBalance(d.balance ?? balance);
        setClaimed(true);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="w-full max-w-[300px] rounded-xl border border-white/10 bg-white/5 p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">Wallet</span>
        <span className="text-white font-mono font-bold">₹{Number(balance).toLocaleString()}</span>
      </div>
      {claimed ? (
        <p className="text-green-400 text-xs font-mono">Daily reward claimed ✅</p>
      ) : (
        <button
          onClick={claim}
          disabled={busy}
          className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-yellow-500/25 hover:bg-yellow-500/40 border border-yellow-500/40 rounded-full px-3 py-1.5 transition-all disabled:opacity-50"
        >
          <FiGift className="w-3.5 h-3.5" />
          Claim Daily Reward (₹25)
        </button>
      )}
    </div>
  );
}
