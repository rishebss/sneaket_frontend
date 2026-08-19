import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { FiCheck } from "react-icons/fi";
import AddressFormDrawer from "./AddressFormDrawer";

const API = import.meta.env.VITE_API_BASE_URL;

const PasswordField = ({ label, name, value, onChange, disabled }) => (
    <div>
        <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-2">
            {label}
        </label>
        <input
            type="password"
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(name, e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        />
    </div>
);

const AccountsSettings = ({ onLogout }) => {
    const [form, setForm] = useState({
        old_password: "",
        new_password: "",
    });
    const [verified, setVerified] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [verifyError, setVerifyError] = useState(null);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState(null);

    const update = (name, val) => {
        if (name === "old_password") {
            setVerified(false);
            setVerifyError(null);
        }
        setForm((f) => ({ ...f, [name]: val }));
    };

    const verifyCurrentPassword = async () => {
        setVerifyError(null);
        if (!form.old_password) {
            setVerifyError("Enter current password first");
            return;
        }
        setVerifying(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API}/api/users/verify-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({ old_password: form.old_password }),
            });
            if (!res.ok) {
                setVerifyError("Current password is incorrect");
                setVerified(false);
            } else {
                setVerified(true);
                setVerifyError(null);
            }
        } catch {
            setVerifyError("Network error");
        } finally {
            setVerifying(false);
        }
    };

    const handleChangePassword = async () => {
        setMsg(null);

        if (!form.old_password || !form.new_password) {
            setMsg({ type: "error", text: "Fill in all fields" });
            return;
        }

        setSaving(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API}/api/users/change-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({
                    old_password: form.old_password,
                    new_password: form.new_password,
                }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                const text =
                    data.old_password?.[0] ||
                    data.new_password?.[0] ||
                    data.detail ||
                    "Could not change password";
                setMsg({ type: "error", text });
            } else {
                setMsg({ type: "success", text: "Password changed" });
                setForm({ old_password: "", new_password: "" });
            }
        } catch {
            setMsg({ type: "error", text: "Network error" });
        } finally {
            setSaving(false);
        }
    };

    // ---- Address book ----
    const queryClient = useQueryClient();
    const [addresses, setAddresses] = useState([]);
    const [loadingAddr, setLoadingAddr] = useState(false);
    const [addrBusy, setAddrBusy] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const token = () => localStorage.getItem("token");

    const loadAddresses = async () => {
        setLoadingAddr(true);
        try {
            const res = await fetch(`${API}/api/users/addresses`, {
                headers: { Authorization: `Token ${token()}` },
            });
            if (res.ok) setAddresses(await res.json());
        } finally {
            setLoadingAddr(false);
        }
    };

    useEffect(() => {
        loadAddresses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const openDrawer = () => setDrawerOpen(true);

    return (
        <div className="space-y-6">
            {/* Address book */}
            <div id="address-book" className="p-6 rounded-md border border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-mono font-bold tracking-widest uppercase text-sm">
                        Address Book
                    </h3>
                    <button
                        onClick={openDrawer}
                        className="px-3 py-1.5 rounded-lg border border-green-500/40 bg-green-500/10 text-green-300 text-[11px] font-mono uppercase tracking-wider transition-all hover:bg-green-500/20 cursor-pointer"
                    >
                        Edit
                    </button>
                </div>

                {loadingAddr ? (
                    <p className="text-gray-500 text-xs font-mono">
                        Loading...
                    </p>
                ) : addresses.length === 0 ? (
                    <p className="text-gray-500 text-xs font-mono">
                        No saved addresses yet.
                    </p>
                ) : (
                    <div className="space-y-3">
                        {addresses.map((a) => (
                            <div
                                key={a.id}
                                className={`rounded-lg border p-3 ${
                                    a.is_default
                                        ? "border-blue-500/40 bg-blue-500/10"
                                        : "border-white/10 bg-white/5"
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-white text-sm font-mono">
                                        {a.label || "Address"}
                                        {a.is_default && (
                                            <span className="text-gray-500">
                                                {" "}
                                                (default)
                                            </span>
                                        )}
                                    </span>
                                </div>
                                <p className="text-gray-400 text-xs font-mono mt-1">
                                    {a.recipient_name}
                                </p>
                                <p className="text-gray-500 text-xs font-mono">
                                    {a.address}
                                    {a.city ? `, ${a.city}` : ""}
                                    {a.state ? `, ${a.state}` : ""} -{" "}
                                    {a.pincode}
                                </p>
                                <p className="text-gray-500 text-xs font-mono">
                                    {a.phone}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Settings */}
            <div className="p-6 rounded-md border border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-white font-mono font-bold tracking-widest uppercase text-sm mb-6">
                    Change password
                </h3>

               

                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-2">
                            {verifyError ? (
                                <span className="text-red-400">
                                    password incorrect, retry
                                </span>
                            ) : verified ? (
                                <span className="text-green-400">
                                    password verified
                                </span>
                            ) : (
                                "Current Password"
                            )}
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="password"
                                value={form.old_password}
                                onChange={(e) => update("old_password", e.target.value)}
                                className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                            />
                            <button
                                type="button"
                                onClick={verifyCurrentPassword}
                                disabled={verifying}
                                className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-lg border transition-all cursor-pointer disabled:opacity-60 ${
                                    verified
                                        ? "border-green-500/50 bg-green-500/20 text-green-400"
                                        : verifyError
                                        ? "border-red-500/50 bg-red-500/20 text-red-400"
                                        : "border-blue-500/50 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                                }`}
                                title="Verify current password"
                            >
                                {verifying ? "..." : <FiCheck />}
                            </button>
                        </div>
                    </div>
                    <PasswordField
                        label="New Password"
                        name="new_password"
                        value={form.new_password}
                        onChange={update}
                        disabled={!verified}
                    />
                </div>

                {msg && (
                    <p
                        className={`mt-4 text-xs font-mono ${
                            msg.type === "success"
                                ? "text-green-400"
                                : "text-red-400"
                        }`}
                    >
                        {msg.text}
                    </p>
                )}

                <div className="mt-5 flex items-center gap-3">
                    <button
                        onClick={handleChangePassword}
                        disabled={saving || !verified}
                        className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-mono transition-all ${
                            saving || !verified
                                ? "bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed"
                                : "bg-blue-500/20 border border-blue-500/40 text-blue-300 hover:bg-blue-500/30 cursor-pointer"
                        }`}
                    >
                        {saving ? "SAVING..." : "Update"}
                    </button>

                    <button
                        onClick={onLogout}
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-mono hover:bg-red-500/20 transition-all cursor-pointer"
                    >
                        Sign Out
                    </button>
                </div>
            </div>

            <AddressFormDrawer
                open={drawerOpen}
                onClose={() => {
                    setDrawerOpen(false);
                    loadAddresses();
                    queryClient.invalidateQueries({ queryKey: ["me"] });
                }}
            />
        </div>
    );
};

export default AccountsSettings;
