import { useNavigate } from "react-router-dom";
import { FiSend } from "react-icons/fi";

/**
 * Button that navigates to a (possibly AI-decided, query-string) in-app route.
 * `path` may include a query string, e.g. "/products?brand=nike&category=running".
 * The destination is always validated/whitelisted server-side before it is sent.
 */
export default function BrowseButton({ label, path, onClose }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!path) return;
    if (onClose) onClose();
    navigate(path);
  };

  return (
    <button
      onClick={handleClick}
      className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-cyan-200 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-full px-3 py-1.5 transition-all"
    >
      {label}
      <FiSend className="w-3 h-3" />
    </button>
  );
}
