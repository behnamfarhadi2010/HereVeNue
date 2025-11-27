// contexts/MessageContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import MessageContext from "./MessageContextDefinition";

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [bookingRequests, setBookingRequests] = useState([]);
  const [conversations, setConversations] = useState([]);

  // Load data from storage on mount
  useEffect(() => {
    loadMessages();
    loadBookingRequests();
    loadConversations();
  }, []);

  const loadMessages = useCallback(() => {
    try {
      const savedMessages = localStorage.getItem("ownerMessages");
      if (savedMessages) {
        const parsed = JSON.parse(savedMessages);
        setMessages(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
      setMessages([]);
    }
  }, []);

  const loadBookingRequests = useCallback(() => {
    const savedBookings = localStorage.getItem("userBookings");
    if (savedBookings) {
      const allBookings = JSON.parse(savedBookings);
      // Filter for pending and confirmed bookings
      const relevantBookings = allBookings.filter(
        (booking) =>
          booking.status === "pending" || booking.status === "confirmed"
      );
      setBookingRequests(relevantBookings);
    }
  }, []);

  const loadConversations = useCallback(() => {
    try {
      const savedConversations = localStorage.getItem("conversations");
      if (savedConversations) {
        const parsed = JSON.parse(savedConversations);
        setConversations(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error("Failed to load conversations:", error);
      setConversations([]);
    }
  }, []);

  // Create a new booking request (called from PaymentPage)
  const createBookingRequest = (bookingData) => {
    const savedBookings = localStorage.getItem("userBookings");
    const existingBookings = savedBookings ? JSON.parse(savedBookings) : [];

    const newBooking = {
      id: Date.now(),
      ...bookingData,
      status: "pending",
      createdAt: new Date().toISOString(),
      submittedAt: new Date().toISOString(),
    };

    const updatedBookings = [newBooking, ...existingBookings];
    localStorage.setItem("userBookings", JSON.stringify(updatedBookings));

    // Update state
    loadBookingRequests();

    return newBooking;
  };

  // Update booking status (accept, decline, complete)
  const updateBookingStatus = (bookingId, status) => {
    const savedBookings = localStorage.getItem("userBookings");
    if (savedBookings) {
      const bookings = JSON.parse(savedBookings);
      const updatedBookings = bookings.map((booking) => {
        if (booking.id === bookingId) {
          return {
            ...booking,
            status: status,
            updatedAt: new Date().toISOString(),
          };
        }
        return booking;
      });
      localStorage.setItem("userBookings", JSON.stringify(updatedBookings));
      loadBookingRequests();
    }
  };

  // Send initial message (creates a conversation)
  const sendMessage = (messageData) => {
    const senderId = messageData.senderId || "guest";
    const senderName = messageData.senderName || "Guest User";

    const newMessage = {
      id: Date.now(),
      userId: senderId,
      userName: senderName,
      venueId: messageData.venueId,
      venueName: messageData.venueName,
      message: messageData.messageText,
      timestamp: new Date().toISOString(),
      read: false,
      flexibleDates: messageData.flexibleDates,
      requireCatering: messageData.requireCatering,
      ownCatering: messageData.ownCatering,
    };

    const currentMessages = Array.isArray(messages) ? messages : [];
    const updatedMessages = [newMessage, ...currentMessages];
    setMessages(updatedMessages);
    localStorage.setItem("ownerMessages", JSON.stringify(updatedMessages));

    // Create a new conversation
    const conversationId = `conv_${Date.now()}`;
    const newConversation = {
      id: conversationId,
      venueId: messageData.venueId,
      venueName: messageData.venueName,
      participants: [senderId, "owner"],
      messages: [
        {
          id: newMessage.id,
          senderId: senderId,
          senderName: senderName,
          text: messageData.messageText,
          timestamp: new Date().toISOString(),
          read: false,
        },
      ],
      lastMessageTime: new Date().toISOString(),
      metadata: {
        flexibleDates: messageData.flexibleDates,
        requireCatering: messageData.requireCatering,
        ownCatering: messageData.ownCatering,
      },
    };

    const currentConversations = Array.isArray(conversations) ? conversations : [];
    const updatedConversations = [newConversation, ...currentConversations];
    setConversations(updatedConversations);
    localStorage.setItem("conversations", JSON.stringify(updatedConversations));

    return { message: newMessage, conversationId };
  };

  // Reply to a message in a conversation
  const replyToMessage = (conversationId, replyData) => {
    const updatedConversations = conversations.map((conv) => {
      if (conv.id === conversationId) {
        const newReply = {
          id: Date.now(),
          senderId: replyData.senderId,
          senderName: replyData.senderName,
          text: replyData.text,
          timestamp: new Date().toISOString(),
          read: false,
        };

        return {
          ...conv,
          messages: [...conv.messages, newReply],
          lastMessageTime: new Date().toISOString(),
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    localStorage.setItem("conversations", JSON.stringify(updatedConversations));

    return updatedConversations.find((c) => c.id === conversationId);
  };

  // Mark conversation messages as read
  const markConversationAsRead = useCallback((conversationId, userId) => {
    let hasChanges = false;
    const updatedConversations = conversations.map((conv) => {
      if (conv.id === conversationId) {
        const updatedMessages = conv.messages.map((msg) => {
          if (msg.senderId !== userId && !msg.read) {
            hasChanges = true;
            return { ...msg, read: true };
          }
          return msg;
        });
        if (hasChanges) {
          return { ...conv, messages: updatedMessages };
        }
        return conv;
      }
      return conv;
    });

    if (hasChanges) {
      setConversations(updatedConversations);
      localStorage.setItem("conversations", JSON.stringify(updatedConversations));
    }
  }, [conversations]);

  // Get conversations for a specific user
  const getUserConversations = (userId) => {
    return conversations.filter((conv) => conv.participants.includes(userId));
  };

  // Get unread message count for a user
  const getUnreadCount = (userId) => {
    let count = 0;
    conversations.forEach((conv) => {
      conv.messages.forEach((msg) => {
        if (msg.senderId !== userId && !msg.read) {
          count++;
        }
      });
    });
    return count;
  };

  // Mark message as read (legacy support)
  const markAsRead = (messageId) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === messageId ? { ...msg, read: true } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem("ownerMessages", JSON.stringify(updatedMessages));
  };

  // Refresh all data from localStorage
  const refreshData = useCallback(() => {
    loadMessages();
    loadBookingRequests();
    loadConversations();
  }, [loadMessages, loadBookingRequests, loadConversations]);

  // Poll for updates (optional - for syncing between tabs)
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        // Check if localStorage has been updated by another tab
        const savedConversations = localStorage.getItem("conversations");
        if (savedConversations) {
          const parsed = JSON.parse(savedConversations);
          // Only update if there's a difference and it's an array
          if (Array.isArray(parsed) && JSON.stringify(parsed) !== JSON.stringify(conversations)) {
            setConversations(parsed);
          }
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    }, 2000); // Check every 2 seconds

    return () => clearInterval(interval);
  }, [conversations]);

  // Get user-specific messages (sent by the current user) - legacy support
  const getUserMessages = () => {
    return messages.filter((msg) => msg.userName === "Admin");
  };

  // Get unread message count (legacy)
  const unreadCount = messages.filter((msg) => !msg.read).length;

  // Get pending requests count
  const pendingRequestsCount = bookingRequests.filter(
    (req) => req.status === "pending"
  ).length;

  const value = {
    messages,
    bookingRequests,
    conversations,
    sendMessage,
    replyToMessage,
    markAsRead,
    markConversationAsRead,
    createBookingRequest,
    updateBookingStatus,
    loadMessages,
    loadBookingRequests,
    loadConversations,
    getUserMessages,
    getUserConversations,
    getUnreadCount,
    unreadCount,
    pendingRequestsCount,
    refreshData, // Export refresh function
  };

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};
