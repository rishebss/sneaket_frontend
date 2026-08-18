import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import LoginRewardDialog from "./LoginRewardDialog";

const API = import.meta.env.VITE_API_BASE_URL;

const fetchMe = async () => {
    const token = localStorage.getItem("token");
    if (!token) return { daily_reward_claimed: false };
    const res = await fetch(`${API}/api/users/me`, {
        headers: { Authorization: `Token ${token}` },
    });
    if (!res.ok) return { daily_reward_claimed: false };
    return res.json();
};

export default function LoginRewardButton() {
    const { data: meData } = useQuery({
        queryKey: ["me"],
        queryFn: fetchMe,
    });
    const [open, setOpen] = useState(false);
    const [now, setNow] = useState(() => Date.now());

    const rewardClaimed = meData?.daily_reward_claimed;

    useEffect(() => {
        if (!rewardClaimed) return;
        const t = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(t);
    }, [rewardClaimed]);

    let countdown = "";
    if (rewardClaimed) {
        const next = new Date();
        next.setHours(24, 0, 0, 0);
        let diff = Math.max(0, Math.floor((next.getTime() - now) / 1000));
        const h = Math.floor(diff / 3600);
        const m = Math.floor((diff % 3600) / 60);
        const s = diff % 60;
        const pad = (n) => String(n).padStart(2, "0");
        countdown = `Come back in ${h}h ${pad(m)}m ${pad(s)}s for +₹25.`;
    }

    return (
        <>
            {rewardClaimed ? (
                <button
                    type="button"
                    disabled
                    className="relative mt-4 block w-full overflow-hidden text-left rounded-lg bg-green-500/10 backdrop-blur-xl border border-white/15 shadow-[0_4px_24px_rgba(0,0,0,0.35)] cursor-default"
                >
                    <div className="relative z-[5] flex items-center gap-4 px-4 py-3 text-left">
                        <div className="flex-1 min-w-0">
                            <span className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                                Login reward claimed
                            </span>
                            <p className="text-[11px] text-white/85 leading-snug mt-0.5">
                                {countdown}
                            </p>
                        </div>
                    </div>
                </button>
            ) : (
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="uiverse relative mt-4 block w-full overflow-hidden text-left"
                >
                    <div className="wrapper">
                        <div className="scrim"></div>
                        <div className="relative z-[5] flex items-center gap-4 px-4 py-3 text-left">
                            <div className="flex-1 min-w-0">
                                <span className="text-sm font-mono font-bold text-white uppercase tracking-wider drop-shadow">
                                    Daily Login Reward
                                </span>
                                <p className="text-[11px] text-white/85 leading-snug mt-0.5 drop-shadow">
                                    Tap to claim ₹25 free, every day you log
                                    in.
                                </p>
                            </div>
                        </div>
                        <div className="circle circle-1"></div>
                        <div className="circle circle-2"></div>
                        <div className="circle circle-3"></div>
                        <div className="circle circle-4"></div>
                        <div className="circle circle-5"></div>
                        <div className="circle circle-6"></div>
                        <div className="circle circle-7"></div>
                        <div className="circle circle-8"></div>
                        <div className="circle circle-9"></div>
                        <div className="circle circle-10"></div>
                        <div className="circle circle-11"></div>
                        <div className="circle circle-12"></div>
                    </div>
                </button>
            )}

            <LoginRewardDialog
                open={open}
                onClose={() => setOpen(false)}
                rewardClaimed={rewardClaimed}
            />
        </>
    );
}
