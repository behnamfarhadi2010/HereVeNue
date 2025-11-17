// components/ChatModal.jsx
import React, { useState, useEffect, useRef } from "react";
import { useMessages } from "../contexts/MessageContext";
import "../styles/ChatModal.css";

const ChatModal = ({ conversation, onClose, currentUser }) => {
  const [newMessage, setNewMessage] = useState("");
  const { replyToMessage, markConversationAsRead } = useMessages(); // Changed from sendMessage to replyToMessage
  const messagesEndRef = useRef(null);

  // Mark messages as read when modal opens
  useEffect(() => {
    if (conversation) {
      markConversationAsRead(conversation.id, currentUser.id);
    }
  }, [conversation, currentUser.id, markConversationAsRead]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Use replyToMessage instead of sendMessage
    replyToMessage(conversation.id, {
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: newMessage.trim(),
    });

    setNewMessage("");
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!conversation) return null;

  return (
    <div className="chat-modal-overlay">
      <div className="chat-modal">
        <div className="chat-header">
          <div className="chat-partner-info">
            <h3>
              Chat with {currentUser.id === "admin" ? "Venue Owner" : "Admin"}
            </h3>
            <span className="venue-name">{conversation.venueName}</span>
          </div>
          <button className="close-chat-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="chat-messages">
          {conversation.messages.map((message) => (
            <div
              key={message.id}
              className={`message-bubble ${
                message.senderId === currentUser.id ? "sent" : "received"
              }`}
            >
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">
                  {formatTime(message.timestamp)}
                </span>
              </div>
              <div className="message-sender">{message.senderName}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="chat-input"
          />
          <button type="submit" className="send-message-btn">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatModal;
