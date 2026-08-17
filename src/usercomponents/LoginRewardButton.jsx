import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiCheck } from "react-icons/fi";
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

    const rewardClaimed = meData?.daily_reward_claimed;

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                disabled={rewardClaimed}
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
                                {rewardClaimed
                                    ? "Claimed today — come back tomorrow for +₹25."
                                    : "Tap to claim ₹25 free, every day you log in."}
                            </p>
                        </div>
                        {rewardClaimed ? (
                            <span className="shrink-0 text-[10px] font-mono uppercase tracking-wider text-white/90 drop-shadow">
                                Claimed ✓
                            </span>
                        ) : (
                            <span className="shrink-0 font-mono font-bold text-white text-base drop-shadow">
                                +₹25
                            </span>
                        )}
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

            <LoginRewardDialog
                open={open}
                onClose={() => setOpen(false)}
                rewardClaimed={rewardClaimed}
            />
        </>
    );
}
