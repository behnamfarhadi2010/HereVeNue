// components/ChatModal.jsx
import React, { useState, useEffect, useRef } from "react";
import { useMessages } from "../contexts/MessageContext";
import "../styles/ChatModal.css";

const ChatModal = ({ conversation, onClose, currentUser }) => {
  const [messageText, setMessageText] = useState("");
  const { replyToMessage, markConversationAsRead } = useMessages();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Mark messages as read when opening the chat
    markConversationAsRead(conversation.id, currentUser.id);
    scrollToBottom();
  }, [conversation.id, currentUser.id, markConversationAsRead]);

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!messageText.trim()) return;

    replyToMessage(conversation.id, {
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: messageText,
    });

    setMessageText("");
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    }
  };

  return (
    <div className="chat-modal-overlay" onClick={onClose}>
      <div className="chat-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <h3>{conversation.venueName}</h3>
            <p className="chat-participants">
              {currentUser.id === "admin"
                ? "Chatting with Venue Owner"
                : "Chatting with Guest"}
            </p>
          </div>
          <button className="close-chat-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Metadata section (first message details) */}
        {conversation.metadata &&
          Object.keys(conversation.metadata).length > 0 && (
            <div className="chat-metadata">
              <p className="metadata-title">Event Details:</p>
              <div className="metadata-tags">
                {conversation.metadata.flexibleDates && (
                  <span className="metadata-tag">Flexible on dates</span>
                )}
                {conversation.metadata.requireCatering && (
                  <span className="metadata-tag">Requires catering</span>
                )}
                {conversation.metadata.ownCatering && (
                  <span className="metadata-tag">Own catering</span>
                )}
              </div>
            </div>
          )}

        {/* Messages */}
        <div className="chat-messages">
          {conversation.messages.map((message, index) => {
            const isCurrentUser = message.senderId === currentUser.id;
            const showAvatar =
              index === 0 ||
              conversation.messages[index - 1].senderId !== message.senderId;

            return (
              <div
                key={message.id}
                className={`chat-message ${
                  isCurrentUser ? "current-user" : "other-user"
                }`}
              >
                {!isCurrentUser && showAvatar && (
                  <div className="message-avatar">
                    {message.senderName.charAt(0)}
                  </div>
                )}
                <div className="message-content-wrapper">
                  {!isCurrentUser && showAvatar && (
                    <div className="message-sender-name">
                      {message.senderName}
                    </div>
                  )}
                  <div className="message-bubble">
                    <p>{message.text}</p>
                    <span className="message-time">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form className="chat-input-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type your message..."
            className="chat-input"
            autoFocus
          />
          <button
            type="submit"
            className="send-btn"
            disabled={!messageText.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatModal;
