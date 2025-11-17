// contexts/MessageContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const MessageContext = createContext();

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessageProvider");
  }
  return context;
};

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [bookingRequests, setBookingRequests] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now()); // Track updates

  // Load data from storage on mount
  useEffect(() => {
    loadMessages();
    loadBookingRequests();
    loadConversations();
  }, []);

  const loadMessages = useCallback(() => {
    const savedMessages = localStorage.getItem("ownerMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
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
    const savedConversations = localStorage.getItem("conversations");
    if (savedConversations) {
      setConversations(JSON.parse(savedConversations));
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
    setLastUpdate(Date.now()); // Trigger re-render

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
      setLastUpdate(Date.now()); // Trigger re-render
    }
  };

  // Send initial message (creates a conversation)
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

    // Create a new conversation
    const conversationId = `conv_${Date.now()}`;
    const newConversation = {
      id: conversationId,
      venueId: messageData.venueId,
      venueName: messageData.venueName,
      participants: ["admin", "owner"],
      messages: [
        {
          id: newMessage.id,
          senderId: "admin",
          senderName: "Admin",
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

    const updatedConversations = [newConversation, ...conversations];
    setConversations(updatedConversations);
    localStorage.setItem("conversations", JSON.stringify(updatedConversations));
    setLastUpdate(Date.now()); // Trigger re-render

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
    setLastUpdate(Date.now()); // Trigger re-render

    return updatedConversations.find((c) => c.id === conversationId);
  };

  // Mark conversation messages as read
  const markConversationAsRead = (conversationId, userId) => {
    const updatedConversations = conversations.map((conv) => {
      if (conv.id === conversationId) {
        const updatedMessages = conv.messages.map((msg) => {
          if (msg.senderId !== userId) {
            return { ...msg, read: true };
          }
          return msg;
        });
        return { ...conv, messages: updatedMessages };
      }
      return conv;
    });

    setConversations(updatedConversations);
    localStorage.setItem("conversations", JSON.stringify(updatedConversations));
    setLastUpdate(Date.now()); // Trigger re-render
  };

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
    setLastUpdate(Date.now()); // Trigger re-render
  };

  // Refresh all data from localStorage
  const refreshData = useCallback(() => {
    loadMessages();
    loadBookingRequests();
    loadConversations();
    setLastUpdate(Date.now());
  }, [loadMessages, loadBookingRequests, loadConversations]);

  // Poll for updates (optional - for syncing between tabs)
  useEffect(() => {
    const interval = setInterval(() => {
      // Check if localStorage has been updated by another tab
      const savedConversations = localStorage.getItem("conversations");
      if (savedConversations) {
        const parsed = JSON.parse(savedConversations);
        // Only update if there's a difference
        if (JSON.stringify(parsed) !== JSON.stringify(conversations)) {
          setConversations(parsed);
          setLastUpdate(Date.now());
        }
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
    lastUpdate, // Export this so components can use it as a dependency
    refreshData, // Export refresh function
  };

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};
