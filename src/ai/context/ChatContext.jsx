import { createContext, useContext, useState, useCallback, useEffect } from "react";
import ChatDrawer from "../drawer/ChatDrawer";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [chatOpen, setChatOpen] = useState(false);

  const openChat = useCallback(() => setChatOpen(true), []);
  const closeChat = useCallback(() => setChatOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = chatOpen ? "hidden" : "";
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
