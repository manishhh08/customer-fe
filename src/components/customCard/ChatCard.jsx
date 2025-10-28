import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Form,
  InputGroup,
  Spinner,
  Badge,
} from "react-bootstrap";
import { FaCommentDots, FaTimes } from "react-icons/fa";
import { postMessageAction } from "../../features/chatbot/chatAction"; // adjust path

const ChatCard = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const chatEndRef = useRef(null);

  // Scroll to bottom
  useEffect(() => {
    if (chatEndRef.current)
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });

    // Unread badge logic
    if (!isOpen && messages.length > 0) {
      const last = messages[messages.length - 1];
      if (last.sender === "bot") setUnreadCount((prev) => prev + 1);
    }
  }, [messages, isOpen]);

  // Reset unread count when chat opens
  useEffect(() => {
    if (isOpen) setUnreadCount(0);
  }, [isOpen]);

  // Handle message sending
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

    // Add typing message
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
    } catch (err) {
      console.error("Chatbot error:", err);
      const errMsg = {
        id: Date.now() + 3,
        sender: "bot",
        text: "There was a problem connecting to the chatbot.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => prev.map((msg) => (msg.typing ? errMsg : msg)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Floating Button */}
      {!isOpen && unreadCount > 0 && (
        <Badge
          bg="danger"
          pill
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            transform: "translate(50%, -50%)",
            fontSize: "0.7rem",
          }}
        >
          {unreadCount}
        </Badge>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "350px",
            height: "500px",
            display: "flex",
            flexDirection: "column",
            zIndex: 1100,
          }}
        >
          <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
            <span>💬 Electra Hub Assistant</span>
            <Button size="sm" variant="light" onClick={onToggle}>
              <FaTimes />
            </Button>
          </Card.Header>

          <Card.Body className="overflow-auto p-2" style={{ flex: 1 }}>
            {messages.length === 0 && (
              <div className="text-center text-muted mt-5">
                <p>Hi there 👋</p>
                <p>Ask me about products, offers, or your orders.</p>
              </div>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`d-flex mb-2 ${
                  msg.sender === "user"
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <div
                  className={`p-2 rounded-3 ${
                    msg.sender === "user"
                      ? "bg-primary text-white"
                      : "bg-light border"
                  }`}
                  style={{ maxWidth: "80%" }}
                >
                  {msg.typing ? (
                    <div className="d-flex gap-1">
                      <Spinner animation="grow" size="sm" />
                      <Spinner animation="grow" size="sm" />
                      <Spinner animation="grow" size="sm" />
                    </div>
                  ) : (
                    <span>{msg.text}</span>
                  )}
                  {msg.timestamp && (
                    <div className="small text-muted mt-1">{msg.timestamp}</div>
                  )}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </Card.Body>

          <Card.Footer className="p-2 border-top">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Ask about products, deals..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading}
                />
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? <Spinner size="sm" /> : "Send"}
                </Button>
              </InputGroup>
            </Form>
          </Card.Footer>
        </Card>
      )}
    </div>
  );
};

export default ChatCard;
