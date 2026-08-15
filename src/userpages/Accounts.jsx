import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FiMail } from "react-icons/fi";
import Loader from "../defaultcomponents/Loader";
import PixelBlast from "../usercomponents/PixelBlast";
import AccountDetails from "../usercomponents/AccountDetails";
import EditAccountDrawer from "../usercomponents/EditAccountDrawer";

const API = import.meta.env.VITE_API_BASE_URL;

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

export default function Accounts() {
    const queryClient = useQueryClient();

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

    return (
        <div className="pb-28 lg:pb-20 px-4 md:px-8 lg:px-12 relative mt-24 md:mt-32">
            <div className="max-w-[1100px] mx-auto">
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
                        {/* Identity card - mobile fixed footer (like checkout) */}
                        <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 flex items-center gap-4 px-4 py-3 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-t border-white/10">
                            <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-amber-500/30 to-orange-500/10 border border-amber-500/30 flex items-center justify-center text-base font-mono font-bold text-white">
                                {bannerInitials}
                            </div>
                            <div className="min-w-0">
                                <p className="text-white font-mono text-sm truncate">
                                    {fullName || data.username}
                                </p>
                                <p className="text-gray-400 text-xs font-mono truncate">
                                    {data.email}
                                </p>
                            </div>
                        </div>

                        {/* Identity card - desktop banner */}
                        <div className="hidden lg:block lg:col-span-1 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden flex flex-col text-left">
                            {/* Banner with PixelBlast background */}
                            <div className="relative h-20 w-full overflow-hidden">
                                <PixelBlast color="#f59e0b" />
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

                        <AccountDetails data={data} onEdit={() => setDrawerOpen(true)} />

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
