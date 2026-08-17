import { useState } from "react";

const API = import.meta.env.VITE_API_BASE_URL;

const PasswordField = ({ label, name, value, onChange }) => (
    <div>
        <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-2">
            {label}
        </label>
        <input
            type="password"
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
        />
    </div>
);

const AccountsSettings = ({ onLogout }) => {
    const [form, setForm] = useState({
        old_password: "",
        new_password: "",
    });
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState(null);

    const update = (name, val) => setForm((f) => ({ ...f, [name]: val }));

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

    return (
        <div className="p-6 rounded-md border border-white/10 bg-white/5 backdrop-blur-xl">
            <h3 className="text-white font-mono font-bold tracking-widest uppercase text-sm mb-6">
                Settings
            </h3>

            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-4">
                Reset
            </p>

            <div className="grid grid-cols-1 gap-4">
                <PasswordField
                    label="Current Password"
                    name="old_password"
                    value={form.old_password}
                    onChange={update}
                />
                <PasswordField
                    label="New Password"
                    name="new_password"
                    value={form.new_password}
                    onChange={update}
                />
            </div>

            {msg && (
                <p
                    className={`mt-4 text-xs font-mono ${
                        msg.type === "success" ? "text-green-400" : "text-red-400"
                    }`}
                >
                    {msg.text}
                </p>
            )}

            <div className="mt-5 flex items-center gap-3">
                <button
                    onClick={handleChangePassword}
                    disabled={saving}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-300 text-sm font-mono hover:bg-blue-500/30 transition-all cursor-pointer disabled:opacity-60"
                >
                    {saving ? "SAVING..." : "Change Password"}
                </button>

                <button
                    onClick={onLogout}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-mono hover:bg-red-500/20 transition-all cursor-pointer"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default AccountsSettings;
