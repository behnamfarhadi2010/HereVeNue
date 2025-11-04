// contexts/MessageContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const MessageContext = createContext();

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load messages from localStorage on mount
  useEffect(() => {
    loadMessages();

    // Listen for storage events from other tabs
    const handleStorageChange = () => {
      loadMessages();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Update unread count when messages change
  useEffect(() => {
    const unread = messages.filter((msg) => !msg.read).length;
    setUnreadCount(unread);
  }, [messages]);

  const loadMessages = () => {
    const savedMessages = localStorage.getItem("ownerMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([]);
    }
  };

  const sendMessage = (messageData) => {
    const newMessage = {
      id: Date.now(),
      userId: "admin",
      userName: "Admin",
      venueId: messageData.venueId,
      venueName: messageData.venueName,
      message: messageData.messageText,
      timestamp: new Date().toISOString(),
      read: false,
      flexibleDates: messageData.flexibleDates,
      requireCatering: messageData.requireCatering,
      ownCatering: messageData.ownCatering,
    };

    const updatedMessages = [newMessage, ...messages];
    setMessages(updatedMessages);
    localStorage.setItem("ownerMessages", JSON.stringify(updatedMessages));

    // Trigger custom event for other components
    window.dispatchEvent(
      new CustomEvent("ownerMessageEvent", {
        detail: {
          type: "NEW_MESSAGE",
          ...newMessage,
        },
      })
    );

    return newMessage;
  };

  const markAsRead = (messageId) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === messageId ? { ...msg, read: true } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem("ownerMessages", JSON.stringify(updatedMessages));
  };

  const markAllAsRead = () => {
    const updatedMessages = messages.map((msg) => ({ ...msg, read: true }));
    setMessages(updatedMessages);
    localStorage.setItem("ownerMessages", JSON.stringify(updatedMessages));
  };

  const deleteMessage = (messageId) => {
    const updatedMessages = messages.filter((msg) => msg.id !== messageId);
    setMessages(updatedMessages);
    localStorage.setItem("ownerMessages", JSON.stringify(updatedMessages));
  };

  const getMessagesByVenue = (venueId) => {
    return messages.filter((msg) => msg.venueId === venueId);
  };

  const getUserMessages = (userName = "Admin") => {
    return messages.filter((msg) => msg.userName === userName);
  };

  const value = {
    messages,
    unreadCount,
    sendMessage,
    markAsRead,
    markAllAsRead,
    deleteMessage,
    getMessagesByVenue,
    getUserMessages,
    loadMessages,
  };

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};
