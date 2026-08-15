import { FiEdit2, FiCheck, FiAlertTriangle } from "react-icons/fi";

const DisplayField = ({ label, value }) => (
    <div>
        <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-2">
            {label}
        </label>
        <p className="text-white/90 text-sm font-mono break-words">{value || "—"}</p>
    </div>
);

export default function AccountDetails({ data, onEdit }) {
    const p = data.profile || {};
    const addressComplete = [p.phone, p.address, p.pincode, p.city, p.state].every(
        (v) => v && String(v).trim() !== ""
    );

    return (
        <div className="lg:col-span-2 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-mono font-bold tracking-widest uppercase text-sm">
                    Account Details
                </h3>
                <button
                    onClick={onEdit}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-mono hover:bg-amber-500/20 transition-all cursor-pointer"
                >
                    <FiEdit2 className="w-3.5 h-3.5" />
                    EDIT
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <DisplayField label="First Name" value={data.first_name} />
                <DisplayField label="Last Name" value={data.last_name} />
                <div className="sm:col-span-2">
                    <DisplayField label="Email" value={data.email} />
                </div>
                <DisplayField label="Phone" value={p.phone} />
                <DisplayField label="Pincode" value={p.pincode} />
                <DisplayField label="City" value={p.city} />
                <DisplayField label="State" value={p.state} />
                <div className="sm:col-span-2">
                    <DisplayField label="Address" value={p.address} />
                </div>
            </div>

            <div
                className={`mt-6 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest ${
                    addressComplete ? "text-green-400/80" : "text-amber-400/80"
                }`}
            >
                {addressComplete ? (
                    <>
                        <FiCheck className="w-3.5 h-3.5" />
                        Ready for checkout
                    </>
                ) : (
                    <>
                        <FiAlertTriangle className="w-3.5 h-3.5" />
                        Complete your address to checkout
                    </>
                )}
            </div>
        </div>
    );
}
