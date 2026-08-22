import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiSend } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import GradientDrawerBg from "../../usercomponents/GradientDrawerBg";
import BrowseButton from "../components/BrowseButton";
import ConfirmButtons from "../components/ConfirmButtons";
import { renderUi } from "../components/cards";

const markdownComponents = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  ul: ({ children }) => <ul className="list-disc pl-5 mb-2 space-y-1">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-5 mb-2 space-y-1">{children}</ol>,
  li: ({ children }) => <li className="pl-1">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
  a: ({ children, href }) => (
    <a href={href} target="_blank" rel="noreferrer" className="text-cyan-400 underline">
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="bg-black/40 px-1 py-0.5 rounded text-cyan-200">{children}</code>
  ),
  h1: ({ children }) => <h1 className="text-base font-semibold mb-1">{children}</h1>,
  h2: ({ children }) => <h2 className="text-sm font-semibold mb-1">{children}</h2>,
  h3: ({ children }) => <h3 className="text-sm font-semibold mb-1">{children}</h3>,
};

const API = import.meta.env.VITE_API_BASE_URL;

const transition = { type: "spring", damping: 25, stiffness: 200 };

// Rolling-summary config: keep only the last RECENT_TURNS in raw form and
// compact older turns into `summary` every SUMMARY_EVERY user turns.
const RECENT_TURNS = 4;
const SUMMARY_EVERY = 6;

const ChatDrawer = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm your SNEAKET assistant. Ask me about products, your cart, or daily rewards!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [acting, setActing] = useState(false);
  const [summary, setSummary] = useState("");
  const messagesEndRef = useRef(null);
  const userTurns = useRef(0);

  useEffect(() => {
    if (!isOpen) return;
    // Jump to the latest message whenever the drawer opens or a message
    // arrives/loads — chat drawers always start pinned to the bottom.
    messagesEndRef.current?.scrollIntoView({
      behavior: messages.length > 1 ? "auto" : "smooth",
    });
  }, [messages, loading, isOpen]);

  // Build the history payload: a rolling summary of older turns (if any)
  // followed by only the last RECENT_TURNS. Keeps tokens bounded while
  // preserving long-term context.
  const buildHistory = () => {
    const hist = [];
    if (summary) {
      hist.push({
        role: "user",
        content: `Summary of earlier conversation:\n${summary}`,
      });
    }
    const recent = messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-RECENT_TURNS * 2)
      .map((m) => ({ role: m.role, content: m.content }));
    return [...hist, ...recent];
  };

  // Best-effort compaction: ask the backend to summarize the full conversation
  // so far; store the result to (re)use on subsequent requests.
  const summarize = async (fullMessages) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/api/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ summarize: true, history: fullMessages }),
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.summary) setSummary(data.summary);
    } catch {
      /* summarization is best-effort; ignore failures */
    }
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    // Typed confirmation: ONLY the most recent assistant message can hold a
    // pending gated action — scanning older ones would re-fire stale
    // (already-used or expired) tokens when the user says "confirm" later.
    const lastAssistant = [...messages]
      .reverse()
      .find((m) => m.role === "assistant");
    const pending =
      lastAssistant && lastAssistant.action && lastAssistant.action.confirm_token
        ? lastAssistant
        : null;
    if (
      pending &&
      /^(yes|yeah|yep|y|confirm|proceed|ok|okay|sure|do it|go ahead|accept)\b|confirm/i.test(
        text
      )
    ) {
      const idx = messages.indexOf(pending);
      setInput("");
      confirmAction(pending.action.confirm_token, idx);
      return;
    }

    setInput("");

    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/api/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ message: text, history: buildHistory() }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      const assistantMsg = {
        role: "assistant",
        content: data.reply,
        redirect: data.redirect || null,
        action: data.action || null,
        ui: data.ui || null,
      };
      const nextMessages = [...messages, userMsg, assistantMsg];
      setMessages(nextMessages);
      userTurns.current += 1;
      if (userTurns.current % SUMMARY_EVERY === 0) summarize(nextMessages);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Execute a gated action after the user taps Confirm on the confirm_token.
  const confirmAction = async (token, idx) => {
    if (acting) return;
    setActing(true);
    try {
      const tk = localStorage.getItem("token");
      const res = await fetch(`${API}/api/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${tk}`,
        },
        body: JSON.stringify({ confirm_token: token, history: buildHistory() }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setMessages((prev) =>
        prev.map((m, i) =>
          i === idx
            ? {
                ...m,
                content: data.reply,
                ui: data.ui || null,
                redirect: data.redirect || null,
                action: null,
              }
            : m
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((m, i) =>
          i === idx
            ? { ...m, action: null, content: "Sorry, that action couldn't be completed." }
            : m
        )
      );
    } finally {
      setActing(false);
    }
  };

  // Dismiss a gated action without executing it.
  const cancelAction = (idx) => {
    setMessages((prev) =>
      prev.map((m, i) =>
        i === idx ? { ...m, action: null, content: "No problem — I didn't do that." } : m
      )
    );
  };

  // Patch a message's ui.data (e.g. mark a Razorpay card as paid) so the
  // change survives the card unmounting/remounting when the drawer reopens.
  const updateMessageData = (idx, patch) => {
    setMessages((prev) =>
      prev.map((m, i) =>
        i === idx && m.ui
          ? { ...m, ui: { ...m.ui, data: { ...(m.ui.data || {}), ...patch } } }
          : m
      )
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={transition}
            className="fixed top-0 right-0 h-full w-full md:max-w-md bg-black z-[100] shadow-2xl flex flex-col"
          >
            <GradientDrawerBg />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <HiOutlineSparkles className="w-5 h-5 text-white" />
                  <h2 className="text-sm font-mono tracking-[0.2em] uppercase text-white">
                    AI Assistant
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                <AnimatePresence>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-blue-500/20 border border-blue-500/30 text-blue-100 rounded-br-sm"
                            : "bg-white/5 border border-white/10 text-gray-200 rounded-bl-sm"
                        }`}
                      >
                        {msg.role === "assistant" ? (
                          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                            {msg.content}
                          </ReactMarkdown>
                        ) : (
                          msg.content
                        )}
                        {msg.role === "assistant" && msg.redirect && (
                          <BrowseButton
                            label={msg.redirect.label}
                            path={msg.redirect.path}
                            onClose={onClose}
                          />
                        )}
                      </div>

                      {msg.role === "assistant" && msg.action && (
                        <ConfirmButtons
                          action={msg.action}
                          busy={acting}
                          onConfirm={(token) => confirmAction(token, i)}
                          onCancel={() => cancelAction(i)}
                        />
                      )}

                      {msg.role === "assistant" && msg.ui && (
                        <div className="w-full mt-1">
                          {renderUi(msg.ui, onClose, (patch) => updateMessageData(i, patch))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none"
                  />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="flex items-center justify-center w-11 h-11 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/30 disabled:opacity-30 transition-all shrink-0"
            >
                    <FiSend className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatDrawer;
