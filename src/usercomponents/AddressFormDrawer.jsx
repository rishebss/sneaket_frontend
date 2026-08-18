import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";

const API = import.meta.env.VITE_API_BASE_URL;

const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

const StateSelect = ({ value, onChange }) => {
    const canonical =
        INDIAN_STATES.find(
            (s) => s.toLowerCase() === String(value || "").toLowerCase()
        ) || undefined;
    return (
        <Select
            value={canonical}
            onValueChange={(v) => onChange("state", v)}
        >
            <SelectTrigger>
                <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
                {INDIAN_STATES.map((s) => (
                    <SelectItem key={s} value={s}>
                        {s}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

const FIELDS = [
    { name: "label", label: "Label", placeholder: "Home / Work" },
    { name: "recipient_name", label: "Recipient Name", required: true },
    { name: "phone", label: "Phone" },
    {
        name: "address",
        label: "Address",
        textarea: true,
        required: true,
        placeholder: "House / street / area",
    },
    { name: "pincode", label: "Pincode" },
    { name: "city", label: "City" },
    { name: "state", label: "State", select: true },
];

const emptyForm = {
    label: "",
    recipient_name: "",
    phone: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
};

const AddressFormDrawer = ({ open, onClose }) => {
    const [addresses, setAddresses] = useState([]);
    const [activeTab, setActiveTab] = useState("1");
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [isDefault, setIsDefault] = useState(false);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState(null);

    const token = () => localStorage.getItem("token");

    const load = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API}/api/users/addresses`, {
                headers: { Authorization: `Token ${token()}` },
            });
            if (res.ok) setAddresses(await res.json());
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!open) return;
        setEditing(false);
        setError(null);
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    // Address 1 = primary/default; Address 2 = next saved address (if any)
    const addr1 = addresses.find((a) => a.is_default) || addresses[0] || null;
    const addr2 =
        addresses.find((a) => !addr1 || a.id !== addr1.id) || null;
    const current = activeTab === "1" ? addr1 : addr2;

    const update = (name, val) => setForm((f) => ({ ...f, [name]: val }));

    const startEdit = (a) => {
        setForm({
            label: a.label || "",
            recipient_name: a.recipient_name || "",
            phone: a.phone || "",
            address: a.address || "",
            pincode: a.pincode || "",
            city: a.city || "",
            state: a.state || "",
        });
        setIsDefault(!!a.is_default);
        setError(null);
        setEditing(true);
    };

    const startAdd = () => {
        setForm(emptyForm);
        setIsDefault(activeTab === "1");
        setError(null);
        setEditing(true);
    };

    const cancelEdit = () => {
        setEditing(false);
        setError(null);
    };

    const switchTab = (tab) => {
        setActiveTab(tab);
        setEditing(false);
        setError(null);
    };

    const handleSave = async () => {
        if (!form.recipient_name || !form.address) {
            setError("Recipient name and address are required");
            return;
        }
        setBusy(true);
        setError(null);
        try {
            const isEdit = !!current?.id;
            const url = isEdit
                ? `${API}/api/users/addresses/${current.id}`
                : `${API}/api/users/addresses`;
            const payload = { ...form };
            if (isDefault) payload.is_default = true;
            const res = await fetch(url, {
                method: isEdit ? "PATCH" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token()}`,
                },
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                setEditing(false);
                await load();
            } else {
                const data = await res.json().catch(() => ({}));
                const first = Object.values(data).flat()[0];
                setError(first || "Could not save address");
            }
        } catch {
            setError("Network error");
        } finally {
            setBusy(false);
        }
    };

    const del = async (id) => {
        if (!window.confirm("Delete this address?")) return;
        setBusy(true);
        try {
            const res = await fetch(`${API}/api/users/addresses/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Token ${token()}` },
            });
            if (res.ok) await load();
        } finally {
            setBusy(false);
        }
    };

    const showForm = editing;

    return createPortal(
        <div
            className={`fixed inset-0 z-[60] ${
                open ? "" : "pointer-events-none"
            }`}
            aria-hidden={!open}
        >
            <div
                onClick={onClose}
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${
                    open ? "opacity-100" : "opacity-0"
                }`}
            />
            <div
                className={`absolute right-0 top-0 h-full w-full max-w-md bg-[#0a0e17] border-l border-white/10 flex flex-col transition-transform duration-200 ${
                    open ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                    <h3 className="text-white font-mono font-bold tracking-widest uppercase text-sm">
                        Address Book
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white text-lg leading-none cursor-pointer"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-5">
                    {loading ? (
                        <p className="text-gray-500 text-xs font-mono">
                            Loading...
                        </p>
                    ) : showForm ? (
                        <div className="space-y-4">
                            {FIELDS.map((f) => (
                                <div key={f.name}>
                                    <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-2">
                                        {f.label}
                                        {f.required && (
                                            <span className="text-red-400">
                                                *
                                            </span>
                                        )}
                                    </label>
                                    {f.select ? (
                                        <StateSelect
                                            value={form[f.name]}
                                            onChange={update}
                                        />
                                    ) : f.textarea ? (
                                        <textarea
                                            rows={2}
                                            value={form[f.name] || ""}
                                            placeholder={f.placeholder}
                                            onChange={(e) =>
                                                update(f.name, e.target.value)
                                            }
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={form[f.name] || ""}
                                            placeholder={f.placeholder}
                                            onChange={(e) =>
                                                update(f.name, e.target.value)
                                            }
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                                        />
                                    )}
                                </div>
                            ))}
                            {error && (
                                <p className="text-red-400 text-xs font-mono">
                                    {error}
                                </p>
                            )}
                            <div className="flex items-center gap-3 pt-1">
                                <button
                                    onClick={handleSave}
                                    disabled={busy}
                                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-green-500/30 border border-green-500/40 text-green-200 text-sm font-mono uppercase tracking-wider transition-all hover:bg-green-500/40 disabled:opacity-60 cursor-pointer"
                                >
                                    {busy
                                        ? "SAVING..."
                                        : current?.id
                                        ? "Save"
                                        : "Add Address"}
                                </button>
                                <button
                                    onClick={cancelEdit}
                                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-white/10 bg-white/5 text-gray-300 text-sm font-mono uppercase tracking-wider transition-all hover:bg-white/10 cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : current ? (
                        <div
                            className={`rounded-lg border p-3 ${
                                current.is_default
                                    ? "border-blue-500/40 bg-blue-500/10"
                                    : "border-white/10 bg-white/5"
                            }`}
                        >
                            <span className="text-white text-sm font-mono">
                                {current.label || "Address"}
                                {current.is_default && (
                                    <span className="text-gray-500">
                                        {" "}
                                        (default)
                                    </span>
                                )}
                            </span>
                            <p className="text-gray-400 text-xs font-mono mt-1">
                                {current.recipient_name}
                            </p>
                            <p className="text-gray-500 text-xs font-mono">
                                {current.address}
                                {current.city ? `, ${current.city}` : ""}
                                {current.state ? `, ${current.state}` : ""} -{" "}
                                {current.pincode}
                            </p>
                            <p className="text-gray-500 text-xs font-mono">
                                {current.phone}
                            </p>
                            <div className="flex items-center gap-3 mt-3">
                                <button
                                    onClick={() => startEdit(current)}
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-300 text-[11px] font-mono uppercase tracking-wider transition-all hover:bg-white/10 cursor-pointer"
                                >
                                    <FiEdit2 className="w-3.5 h-3.5" />
                                    Edit
                                </button>
                                {activeTab === "2" && (
                                    <button
                                        onClick={() => del(current.id)}
                                        disabled={busy}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-[11px] font-mono uppercase tracking-wider transition-all hover:bg-red-500/20 disabled:opacity-60 cursor-pointer"
                                    >
                                        <FiTrash2 className="w-3.5 h-3.5" />
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                            <p className="text-gray-500 text-xs font-mono mb-5">
                                {activeTab === "1"
                                    ? "No primary address yet."
                                    : "No second address added."}
                            </p>
                            <button
                                onClick={startAdd}
                                className="px-5 py-3 rounded-lg bg-green-500/30 border border-green-500/40 text-green-200 text-sm font-mono uppercase tracking-wider transition-all hover:bg-green-500/40 cursor-pointer"
                            >
                                + Add Address
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer tabs */}
                <div className="flex border-t border-white/10">
                    {["1", "2"].map((t) => (
                        <button
                            key={t}
                            onClick={() => switchTab(t)}
                            className={`flex-1 py-3 text-center text-[11px] font-mono uppercase tracking-widest transition-all cursor-pointer ${
                                activeTab === t
                                    ? "bg-blue-500/10 text-blue-300"
                                    : "text-gray-500 hover:bg-white/5"
                            }`}
                        >
                            Address {t}
                        </button>
                    ))}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default AddressFormDrawer;
