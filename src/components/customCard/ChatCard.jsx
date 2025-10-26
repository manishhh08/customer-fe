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

const ChatCard = ({
  messages,
  input,
  setInput,
  handleSend,
  isOpen,
  toggleOpen,
  loading,
}) => {
  const chatEndRef = useRef(null);
  const [unreadCount, setUnreadCount] = useState(0);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatEndRef.current)
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });

    // Increase unread count when bot sends message & chat is closed
    if (!isOpen && messages.length > 0) {
      const last = messages[messages.length - 1];
      if (last.sender === "bot") setUnreadCount((prev) => prev + 1);
    }
  }, [messages, isOpen]);

  // Reset unread badge when opened
  useEffect(() => {
    if (isOpen) setUnreadCount(0);
  }, [isOpen]);

  return (
    <div>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={toggleOpen}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            fontSize: "1.5rem",
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          variant="primary"
        >
          <FaCommentDots />
          {unreadCount > 0 && (
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
        </Button>
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
          {/* Header */}
          <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
            <span>💬 Electra Hub Assistant</span>
            <Button size="sm" variant="light" onClick={toggleOpen}>
              <FaTimes />
            </Button>
          </Card.Header>

          {/* Body */}
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

          {/* Footer Input */}
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
