import { useChat } from "../context/ChatContext";
import { HiOutlineSparkles } from "react-icons/hi2";

export default function AskAIButton() {
  const { openChat } = useChat();

  return (
    <button
      onClick={openChat}
      className="hidden md:flex items-center gap-3 pl-5 pr-3 py-1.5 rounded-full bg-white/5 border border-cyan-500/30 text-cyan-400 hover:bg-white/10 hover:border-cyan-500 shadow-[0_2px_12px_rgba(0,0,0,0.25)] hover:shadow-[0_4px_20px_rgba(6,182,212,0.2)] transition-all"
    >
      <span className="text-[10px] font-semibold tracking-[0.2em] uppercase font-mono">Ask AI</span>
      <HiOutlineSparkles className="w-4 h-4" />
    </button>
  );
}
