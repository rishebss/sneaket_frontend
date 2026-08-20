import { useNavigate } from "react-router-dom";
import { FiSend } from "react-icons/fi";

// Link that closes the chat drawer, then navigates in-app.
export default function CardLink({ label, path, onClose }) {
  const navigate = useNavigate();
  const handle = () => {
    if (onClose) onClose();
    navigate(path);
  };
  return (
    <button
      onClick={handle}
      className="block w-full text-center text-xs font-semibold text-cyan-300 hover:text-cyan-200 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-full px-3 py-1.5 transition-all"
    >
      <span className="inline-flex items-center gap-1.5">
        {label}
        <FiSend className="w-3 h-3" />
      </span>
    </button>
  );
}
