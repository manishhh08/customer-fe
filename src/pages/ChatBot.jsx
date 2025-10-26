import { useState } from "react";
import { postMessageAction } from "../features/chatbot/chatAction";
import ChatCard from "../components/customCard/ChatCard";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  // ✅ Handle send and backend chat/search logic
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Show typing indicator
    const typingMsg = { id: Date.now() + 1, sender: "bot", typing: true };
    setMessages((prev) => [...prev, typingMsg]);

    try {
      const res = await postMessageAction(input);

      const botMsg = {
        id: Date.now() + 2,
        sender: "bot",
        text: res?.output || "I'm sorry, I didn’t quite catch that.",
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => prev.map((msg) => (msg.typing ? botMsg : msg)));

      // ✅ Automatically open chatbot when bot sends message
      setIsOpen(true);
    } catch (err) {
      console.error("Chatbot error:", err);
      const errMsg = {
        id: Date.now() + 3,
        sender: "bot",
        text: "There was a problem connecting to the chatbot.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => prev.map((msg) => (msg.typing ? errMsg : msg)));
      setIsOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatCard
      messages={messages}
      input={input}
      setInput={setInput}
      handleSend={handleSend}
      isOpen={isOpen}
      toggleOpen={toggleOpen}
      loading={loading}
    />
  );
};

export default ChatBot;
