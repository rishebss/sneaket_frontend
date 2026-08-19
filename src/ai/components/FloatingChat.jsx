import { useRef, useState, useEffect } from "react";
import { useChat } from "../context/ChatContext";
import { HiOutlineSparkles } from "react-icons/hi2";

const SIZE = 56;
const MARGIN = 16;

export default function FloatingChat() {
  const { openChat } = useChat();
  const btnRef = useRef(null);
  const draggedRef = useRef(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [snapping, setSnapping] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [drag, setDrag] = useState({
    active: false,
    moved: false,
    startX: 0,
    startY: 0,
    baseX: 0,
    baseY: 0,
  });

  const clamp = (x, y) => ({
    x: Math.max(MARGIN, Math.min(window.innerWidth - SIZE - MARGIN, x)),
    y: Math.max(MARGIN, Math.min(window.innerHeight - SIZE - MARGIN, y)),
  });

  const onPointerDown = (e) => {
    setSnapping(false);
    setPressed(true);
    draggedRef.current = false;
    const rect = btnRef.current.getBoundingClientRect();
    setDrag({
      active: true,
      moved: false,
      startX: e.clientX,
      startY: e.clientY,
      baseX: rect.left,
      baseY: rect.top,
    });
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!drag.active) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
      draggedRef.current = true;
      setDrag((d) => ({ ...d, moved: true }));
    }
    setPos(clamp(drag.baseX + dx, drag.baseY + dy));
  };

  const onPointerUp = () => {
    setPressed(false);
    if (!drag.active) return;
    if (drag.moved) {
      setSnapping(true);
      const snapLeft = pos.x + SIZE / 2 < window.innerWidth / 2;
      setPos((p) => ({
        x: snapLeft ? MARGIN : window.innerWidth - SIZE - MARGIN,
        y: p.y,
      }));
    }
    setDrag({ active: false, moved: false, startX: 0, startY: 0, baseX: 0, baseY: 0 });
  };

  const onClick = () => {
    if (!draggedRef.current) openChat();
  };

  useEffect(() => {
    if (!snapping) return;
    const t = setTimeout(() => setSnapping(false), 350);
    return () => clearTimeout(t);
  }, [snapping]);

  const placed = pos.x !== 0;

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={() => setPressed(false)}
      aria-label="Ask AI"
      className={`md:hidden fixed z-[80] flex items-center justify-center w-14 h-14 rounded-full
        bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950
        border border-white/20
        text-white
        touch-none select-none
        transition-transform duration-100
        ${pressed ? "scale-95" : "scale-100"}
        ${snapping ? "transition-all duration-300 ease-out" : ""}
      `}
      style={{
        left: placed ? pos.x : undefined,
        right: placed ? undefined : MARGIN,
        top: placed ? pos.y : undefined,
        bottom: placed ? undefined : 90,
        cursor: "grab",
        boxShadow: pressed
          ? `inset 0 2px 4px rgba(0,0,0,0.6),
             inset 0 -1px 1px rgba(255,255,255,0.05),
             0 2px 4px rgba(0,0,0,0.4)`
          : `inset 0 1px 1px rgba(255,255,255,0.25),
             inset 0 -3px 6px rgba(0,0,0,0.5),
             0 6px 10px rgba(0,0,0,0.45),
             0 2px 3px rgba(0,0,0,0.35)`,
      }}
    >
      <HiOutlineSparkles className="w-6 h-6 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]" />
    </button>
  );
}