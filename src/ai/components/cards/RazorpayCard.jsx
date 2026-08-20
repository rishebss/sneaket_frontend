import { useState } from "react";
import { FiCreditCard, FiCheck } from "react-icons/fi";
import CardLink from "./CardLink";

const API = import.meta.env.VITE_API_BASE_URL;

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export default function RazorpayCard({ data, onClose, onUpdateData }) {
  const [busy, setBusy] = useState(false);
  const [paid, setPaid] = useState(!!data?.paid);
  const [error, setError] = useState(null);

  const amount = Number(data?.amount || 0) / 100;

  const pay = async () => {
    setBusy(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const ok = await loadRazorpayScript();
      if (!ok) {
        setError("Could not load the payment gateway");
        setBusy(false);
        return;
      }
      const options = {
        key: data.razorpay_key,
        amount: data.amount,
        currency: data.currency || "INR",
        name: "SNEAKET",
        description: "Chat checkout",
        order_id: data.razorpay_order_id,
        theme: { color: "#10b981" },
        handler: async (response) => {
          try {
            const vres = await fetch(`${API}/api/orders/verify/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            if (vres.ok) {
              setPaid(true);
              onUpdateData?.({ paid: true });
              window.dispatchEvent(new CustomEvent("cart-change", { detail: { count: 0 } }));
            } else {
              setError("Payment verification failed");
            }
          } catch {
            setError("Payment verification failed");
          } finally {
            setBusy(false);
          }
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        setError("Payment failed. Please try again.");
        setBusy(false);
      });
      rzp.open();
    } catch {
      setError("Something went wrong during checkout");
      setBusy(false);
    }
  };

  if (paid) {
    return (
      <div className="w-full max-w-[300px] rounded-xl border border-green-500/30 bg-green-500/10 p-3 space-y-2">
        <div className="flex items-center gap-2 text-green-400">
          <FiCheck className="w-4 h-4" />
          <span className="text-sm font-semibold">Payment successful!</span>
        </div>
        <CardLink label="View Orders" path="/accounts?tab=orders" onClose={onClose} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[300px] rounded-xl border border-white/10 bg-white/5 p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">Online Payment</span>
        <span className="text-white font-mono font-bold">₹{amount.toLocaleString()}</span>
      </div>
      <button
        onClick={pay}
        disabled={busy}
        className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-blue-500/25 hover:bg-blue-500/40 border border-blue-500/40 rounded-full px-3 py-1.5 transition-all disabled:opacity-50"
      >
        <FiCreditCard className="w-3.5 h-3.5" />
        {busy ? "Opening..." : "Pay Now"}
      </button>
      {error && <p className="text-red-400 text-[11px] font-mono">{error}</p>}
    </div>
  );
}
