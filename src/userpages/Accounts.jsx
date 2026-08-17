import { useState, useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FiMail, FiChevronRight } from "react-icons/fi";
import Loader from "../defaultcomponents/Loader";
import PixelBlast from "../usercomponents/PixelBlast";
import AccountDetails from "../usercomponents/AccountDetails";
import AccountsOrders from "../usercomponents/AccountsOrders";
import AccountsSettings from "../usercomponents/AccountSettings";
import WalletSettings from "../usercomponents/WalletSettings";
import EditAccountDrawer from "../usercomponents/EditAccountDrawer";

const API = import.meta.env.VITE_API_BASE_URL;

const TABS = [
    { key: "wallet", label: "Wallet" },
    { key: "orders", label: "Orders" },
    { key: "settings", label: "Settings" },
];

const TAB_KEYS = TABS.map((t) => t.key);

const fetchMe = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const res = await fetch(`${API}/api/users/me`, {
        headers: { Authorization: `Token ${token}` },
    });
    if (!res.ok) throw new Error("Failed to load profile");
    return res.json();
};

const emptyForm = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    state: "",
    city: "",
};

const BannerNavCard = ({ label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center justify-between px-5 py-4 rounded-md border transition-all cursor-pointer text-left ${
            active
                ? "border-blue-500/40 bg-blue-500/10 shadow-[0_4px_24px_rgba(59,130,246,0.12)]"
                : "border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10"
        }`}
    >
        <span
            className={`font-mono text-sm tracking-[0.2em] uppercase ${
                active ? "text-blue-300" : "text-white/90"
            }`}
        >
            {label}
        </span>
        <FiChevronRight
            className={`w-5 h-5 transition-transform ${
                active ? "text-blue-400 translate-x-0.5" : "text-gray-500"
            }`}
        />
    </button>
);

const MobileTabs = ({ active, onChange }) => (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 flex items-center gap-2 p-2 border-t border-white/10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 backdrop-blur-xl">
        {TABS.map((t) => {
            const isActive = active === t.key;
            return (
                <button
                    key={t.key}
                    onClick={() => onChange(t.key)}
                    className="relative flex-1 px-3 py-2.5 rounded-xl font-mono text-xs tracking-[0.15em] uppercase transition-colors cursor-pointer"
                >
                    {isActive && (
                        <motion.div
                            layoutId="mobileTabIndicator"
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="absolute inset-0 bg-blue-500/20 border border-blue-500/40"
                        />
                    )}
                    <span
                        className={`relative z-10 transition-colors ${
                            isActive ? "text-blue-300" : "text-gray-400 hover:text-white"
                        }`}
                    >
                        {t.label}
                    </span>
                </button>
            );
        })}
    </div>
);

export default function Accounts() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const tabParam = searchParams.get("tab");
    const activeTab = TAB_KEYS.includes(tabParam) ? tabParam : "wallet";

    const setActiveTab = (key) => {
        if (key === "wallet") {
            setSearchParams({}, { replace: true });
        } else {
            setSearchParams({ tab: key }, { replace: true });
        }
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["me"],
        queryFn: fetchMe,
        staleTime: 30 * 1000,
    });

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState(null);

    useEffect(() => {
        if (data) {
            setForm({
                first_name: data.first_name || "",
                last_name: data.last_name || "",
                email: data.email || "",
                phone: data.profile?.phone || "",
                address: data.profile?.address || "",
                pincode: data.profile?.pincode || "",
                state: data.profile?.state || "",
                city: data.profile?.city || "",
            });
        }
    }, [data]);

    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" replace />;
    }

    const fullName = `${data?.first_name || ""} ${data?.last_name || ""}`.trim();
    const bannerInitials =
        `${
            data?.first_name?.[0] || data?.username?.[0] || "U"
        }${data?.last_name ? data.last_name[data.last_name.length - 1] : ""}`.toUpperCase();

    const resetForm = () => {
        setMsg(null);
        if (data)
            setForm({
                first_name: data.first_name || "",
                last_name: data.last_name || "",
                email: data.email || "",
                phone: data.profile?.phone || "",
                address: data.profile?.address || "",
                pincode: data.profile?.pincode || "",
                state: data.profile?.state || "",
                city: data.profile?.city || "",
            });
    };

    const handleSave = async () => {
        const token = localStorage.getItem("token");
        setSaving(true);
        setMsg(null);
        try {
            const res = await fetch(`${API}/api/users/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({
                    first_name: form.first_name,
                    last_name: form.last_name,
                    email: form.email,
                    profile: {
                        phone: form.phone,
                        address: form.address,
                        pincode: form.pincode,
                        state: form.state,
                        city: form.city,
                    },
                }),
            });
            if (!res.ok) {
                setMsg({ type: "error", text: "Could not save changes" });
                return;
            }
            setMsg({ type: "success", text: "Profile updated" });
            setDrawerOpen(false);
            queryClient.invalidateQueries({ queryKey: ["me"] });
        } catch {
            setMsg({ type: "error", text: "Network error" });
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setDrawerOpen(false);
        resetForm();
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("auth-change"));
        navigate("/");
    };

    return (
        <div className="pb-28 lg:pb-20 px-4 md:px-8 lg:px-12 relative mt-24 md:mt-32">
            <div className="max-w-[1100px] mx-auto">
                {/* Mobile profile banner on top */}
                {data && (
                    <div className="lg:hidden sticky top-0 z-20 mt-5 mb-3 rounded-md border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden flex items-center gap-4 p-4">
                        <div className="relative shrink-0 w-16 h-16 rounded-full overflow-hidden border border-white/10">
                            <PixelBlast color="#3b82f6" />
                            <div
                                className="absolute inset-0 flex items-center justify-center text-2xl font-mono font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                                style={{ WebKitTextStroke: "2px #000", paintOrder: "stroke" }}
                            >
                                {bannerInitials}
                            </div>
                        </div>
                        <div className="min-w-0 flex-1">
                            <h2 className="text-white font-mono text-base truncate">
                                {fullName || data.username}
                            </h2>
                            <p className="text-gray-500 font-mono text-xs mt-0.5 truncate">
                                @{data.username}
                            </p>
                            <div className="mt-2 flex items-center gap-2 text-gray-400 text-xs font-mono truncate">
                                <FiMail className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate">{data.email}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Mobile tabs fixed as bottom footer */}
                {data && (
                    <MobileTabs active={activeTab} onChange={setActiveTab} />
                )}

                {isLoading ? (
                    <div className="flex items-center justify-center min-h-[300px]">
                        <Loader />
                    </div>
                ) : isError || !data ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                        <p className="text-gray-400 font-mono text-sm">
                            Could not load your account.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                        {/* Left column: identity banner + 3 banner nav cards (desktop) */}
                        <div className="lg:col-span-1 space-y-4 lg:space-y-6">
                            {/* Identity card - desktop banner */}
                            <div className="hidden lg:block rounded-md border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden flex flex-col text-left">
                                <div className="relative h-20 w-full overflow-hidden">
                                    <PixelBlast color="#3b82f6" />
                                    <div
                                        className="absolute left-6 bottom-3 text-5xl font-mono font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                                        style={{ WebkitTextStroke: "3px #000", paintOrder: "stroke" }}
                                    >
                                        {bannerInitials}
                                    </div>
                                </div>
                                <div className="p-6 pt-4 flex flex-col items-start">
                                    <h2 className="text-white font-mono text-lg">
                                        {fullName || data.username}
                                    </h2>
                                    <p className="text-gray-500 font-mono text-xs mt-1">
                                        @{data.username}
                                    </p>
                                    <div className="mt-4 flex items-center gap-2 text-gray-400 text-xs font-mono">
                                        <FiMail className="w-3.5 h-3.5" />
                                        {data.email}
                                    </div>
                                    {data.profile?.created_at && (
                                        <p className="text-gray-600 font-mono text-[10px] mt-3 uppercase tracking-widest">
                                            Joined {new Date(data.profile.created_at).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* 3 banner nav cards stacked vertically */}
                            <div className="hidden lg:flex lg:flex-col gap-3">
                                {TABS.map((t) => (
                                    <BannerNavCard
                                        key={t.key}
                                        label={t.label}
                                        active={activeTab === t.key}
                                        onClick={() => setActiveTab(t.key)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Right column: active tab content */}
                        <div className="lg:col-span-2">
                            {activeTab === "wallet" && <WalletSettings />}
                            {activeTab === "orders" && <AccountsOrders />}
                            {activeTab === "settings" && (
                                <div className="max-h-[70vh] overflow-y-auto custom-scrollbar fade-bottom pr-2 space-y-6">
                                    <AccountDetails
                                        data={data}
                                        onEdit={() => setDrawerOpen(true)}
                                    />
                                    <AccountsSettings
                                        onLogout={handleLogout}
                                    />
                                </div>
                            )}
                        </div>

                        <EditAccountDrawer
                            isOpen={drawerOpen}
                            onClose={handleCancel}
                            form={form}
                            setForm={setForm}
                            saving={saving}
                            msg={msg}
                            onSave={handleSave}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
