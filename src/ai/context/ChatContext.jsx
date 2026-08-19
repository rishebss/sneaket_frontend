import { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";
import ChatDrawer from "../drawer/ChatDrawer";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [chatOpen, setChatOpen] = useState(false);
  const backCloseRef = useRef(false);

  const openChat = useCallback(() => setChatOpen(true), []);
  const closeChat = useCallback(() => {
    backCloseRef.current = false;
    setChatOpen(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = chatOpen ? "hidden" : "";
  }, [chatOpen]);

  useEffect(() => {
    if (!chatOpen) return;
    window.history.pushState({ chat: true }, "");
    const onPop = () => {
      backCloseRef.current = true;
      setChatOpen(false);
    };
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      if (!backCloseRef.current) window.history.back();
      backCloseRef.current = false;
    };
  }, [chatOpen]);

  return (
    <ChatContext.Provider value={{ chatOpen, openChat, closeChat }}>
      {children}
      <ChatDrawer isOpen={chatOpen} onClose={closeChat} />
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
