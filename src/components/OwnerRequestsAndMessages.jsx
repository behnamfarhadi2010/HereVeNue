import React, { useState, useEffect } from "react";
import { useVenue } from "../contexts/VenueContext";
import { useNavigate } from "react-router-dom";
import "../styles/ownerRequestsAndMessages.css";

const OwnerRequestsAndMessages = () => {
  const [activeTab, setActiveTab] = useState("requests");
  const [bookingRequests, setBookingRequests] = useState([]);
  const [messages, setMessages] = useState([]);
  const { venues } = useVenue();
  const navigate = useNavigate();

  // Load booking requests from localStorage
  const loadBookingRequests = () => {
    const savedBookings = localStorage.getItem("userBookings");
    if (savedBookings) {
      const allBookings = JSON.parse(savedBookings);
      // Filter bpending and confirmed
      const relevantBookings = allBookings.filter(
        (booking) =>
          booking.status === "pending" || booking.status === "confirmed"
      );
      setBookingRequests(relevantBookings);
    } else {
      setBookingRequests([]);
    }
  };

  // Load messages from localStorage
  const loadMessages = () => {
    const savedMessages = localStorage.getItem("ownerMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([]);
    }
  };

  // Listen for new messages from MessageHostSidebar
  useEffect(() => {
    const handleNewMessage = (event) => {
      if (event.detail && event.detail.type === "NEW_MESSAGE") {
        const newMessage = {
          id: Date.now(),
          userId: "admin",
          userName: "Admin",
          venueId: event.detail.venueId,
          venueName: event.detail.venueName,
          message: event.detail.messageText,
          timestamp: new Date().toISOString(),
          read: false,
          flexibleDates: event.detail.flexibleDates,
          requireCatering: event.detail.requireCatering,
          ownCatering: event.detail.ownCatering,
        };

        const updatedMessages = [newMessage, ...messages];
        setMessages(updatedMessages);
        localStorage.setItem("ownerMessages", JSON.stringify(updatedMessages));
      }
    };

    window.addEventListener("ownerMessageEvent", handleNewMessage);

    return () => {
      window.removeEventListener("ownerMessageEvent", handleNewMessage);
    };
  }, [messages]);

  useEffect(() => {
    loadBookingRequests();
    loadMessages();

    // Listen for booking updates from PaymentPage
    const handleBookingsUpdate = () => {
      loadBookingRequests();
    };

    // Listen for custom event when new booking is created
    const handleNewBooking = (event) => {
      if (event.detail && event.detail.type === "NEW_BOOKING") {
        loadBookingRequests();
      }
    };

    window.addEventListener("bookingsUpdated", handleBookingsUpdate);
    window.addEventListener("storage", handleBookingsUpdate);
    window.addEventListener("newBookingEvent", handleNewBooking);

    return () => {
      window.removeEventListener("bookingsUpdated", handleBookingsUpdate);
      window.removeEventListener("storage", handleBookingsUpdate);
      window.removeEventListener("newBookingEvent", handleNewBooking);
    };
  }, []);

  const handleBookingAction = (bookingId, action) => {
    const savedBookings = localStorage.getItem("userBookings");
    if (savedBookings) {
      const bookings = JSON.parse(savedBookings);
      const updatedBookings = bookings.map((booking) => {
        if (booking.id === bookingId) {
          return {
            ...booking,
            status: action,
            updatedAt: new Date().toISOString(),
          };
        }
        return booking;
      });
      localStorage.setItem("userBookings", JSON.stringify(updatedBookings));
      loadBookingRequests();

      // Trigger event for other components to update
      window.dispatchEvent(new Event("bookingsUpdated"));
    }
  };

  const handleMarkAsRead = (messageId) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === messageId ? { ...msg, read: true } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem("ownerMessages", JSON.stringify(updatedMessages));
  };

  const handleReplyToMessage = (messageId, userName) => {
    // (Temporarily) Just alert for now
    alert(`Reply to ${userName} - Message ID: ${messageId}`);
    //  reply message logic would go here (I don't know yet how can I do this)
  };

  const handleViewVenue = (venueId) => {
    navigate(`/venue/${venueId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) return "$0.00";

    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
    }).format(numericAmount);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { text: "Pending Review", class: "status-pending" },
      confirmed: { text: "Confirmed", class: "status-confirmed" },
      cancelled: { text: "Cancelled", class: "status-cancelled" },
      completed: { text: "Completed", class: "status-completed" },
    };

    const config = statusConfig[status] || {
      text: status,
      class: "status-pending",
    };
    return (
      <span className={`status-badge ${config.class}`}>{config.text}</span>
    );
  };

  const unreadMessagesCount = messages.filter((msg) => !msg.read).length;
  const pendingRequestsCount = bookingRequests.filter(
    (req) => req.status === "pending"
  ).length;

  return (
    <div className="owner-requests-messages">
      <div className="section-header">
        <h2>Customer Interactions</h2>
      </div>

      <div className="interaction-tabs">
        <button
          className={`tab-button ${activeTab === "requests" ? "active" : ""}`}
          onClick={() => setActiveTab("requests")}
        >
          Booking Requests{" "}
          <span className="count-badge">{pendingRequestsCount}</span>
        </button>
        <button
          className={`tab-button ${activeTab === "messages" ? "active" : ""}`}
          onClick={() => setActiveTab("messages")}
        >
          Messages <span className="count-badge">{unreadMessagesCount}</span>
        </button>
      </div>

      <div className="interaction-content">
        {activeTab === "requests" ? (
          <div className="booking-requests-section">
            {bookingRequests.length > 0 ? (
              <div className="requests-list">
                <h3>Booking Requests ({bookingRequests.length})</h3>
                {bookingRequests.map((request) => {
                  const venue = venues.find((v) => v.id === request.venueId);
                  return (
                    <div key={request.id} className="request-card">
                      <div className="request-header">
                        <div className="request-info">
                          <h4>
                            {request.venueName ||
                              venue?.venueName ||
                              "Unknown Venue"}
                          </h4>
                          <p className="user-info">From: Admin</p>
                          <p className="request-date">
                            Submitted:{" "}
                            {formatDate(
                              request.submittedAt ||
                                request.createdAt ||
                                new Date().toISOString()
                            )}
                          </p>
                        </div>
                        <div className="request-status">
                          {getStatusBadge(request.status)}
                        </div>
                      </div>

                      <div className="booking-details">
                        <div className="detail-row">
                          <span>
                            <strong>Date:</strong>{" "}
                            {formatDate(request.bookingDetails?.date)}
                          </span>
                          <span>
                            <strong>Time:</strong>{" "}
                            {request.bookingDetails?.startTime} -{" "}
                            {request.bookingDetails?.endTime}
                          </span>
                        </div>
                        <div className="detail-row">
                          <span>
                            <strong>Guests:</strong>{" "}
                            {request.bookingDetails?.guests} people
                          </span>
                          <span>
                            <strong>Total:</strong>{" "}
                            {formatCurrency(request.pricing?.total)}
                          </span>
                        </div>
                        <div className="detail-row">
                          <span>
                            <strong>Duration:</strong>{" "}
                            {request.bookingDetails?.hours} hours
                          </span>
                          <span>
                            <strong>Hourly Rate:</strong>{" "}
                            {formatCurrency(request.pricing?.hourlyRate)}
                          </span>
                        </div>
                      </div>

                      {request.specialRequests && (
                        <div className="special-requests">
                          <strong>Special Requests:</strong>
                          <p>{request.specialRequests}</p>
                        </div>
                      )}

                      {request.status === "pending" && (
                        <div className="request-actions">
                          <button
                            className="confirm-btn"
                            onClick={() =>
                              handleBookingAction(request.id, "confirmed")
                            }
                          >
                            Confirm Booking
                          </button>
                          <button
                            className="decline-btn"
                            onClick={() =>
                              handleBookingAction(request.id, "cancelled")
                            }
                          >
                            Decline
                          </button>
                          <button
                            className="contact-user-btn"
                            onClick={() => handleViewVenue(request.venueId)}
                          >
                            View Venue
                          </button>
                        </div>
                      )}

                      {request.status === "confirmed" && (
                        <div className="confirmed-actions">
                          <button
                            className="complete-btn"
                            onClick={() =>
                              handleBookingAction(request.id, "completed")
                            }
                          >
                            Mark as Completed
                          </button>
                          <button
                            className="contact-user-btn"
                            onClick={() => handleViewVenue(request.venueId)}
                          >
                            View Venue
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="no-requests">
                <div className="no-data-icon"></div>
                <h3>No booking requests</h3>
                <p>You don't have any booking requests at the moment.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="messages-section">
            {messages.length > 0 ? (
              <div className="messages-list">
                <h3>Messages ({messages.length})</h3>
                {messages.map((message) => {
                  const venue = venues.find((v) => v.id === message.venueId);
                  return (
                    <div
                      key={message.id}
                      className={`message-card ${
                        message.read ? "read" : "unread"
                      }`}
                      onClick={() =>
                        !message.read && handleMarkAsRead(message.id)
                      }
                    >
                      <div className="message-header">
                        <div className="message-sender">
                          <h4>Admin</h4>
                          <span className="venue-name">
                            {message.venueName ||
                              venue?.venueName ||
                              "Unknown Venue"}
                          </span>
                        </div>
                        <div className="message-meta">
                          <span className="message-time">
                            {formatDate(message.timestamp)}
                          </span>
                          {!message.read && (
                            <span className="unread-dot"></span>
                          )}
                        </div>
                      </div>
                      <div className="message-content">
                        <p>{message.message}</p>

                        {/* Message Details */}
                        <div className="message-details">
                          {message.flexibleDates && (
                            <span className="message-tag">
                              Flexible on dates
                            </span>
                          )}
                          {message.requireCatering && (
                            <span className="message-tag">
                              Requires catering
                            </span>
                          )}
                          {message.ownCatering && (
                            <span className="message-tag">Own catering</span>
                          )}
                        </div>
                      </div>
                      <div className="message-actions">
                        <button
                          className="reply-btn"
                          onClick={() =>
                            handleReplyToMessage(message.id, "Admin")
                          }
                        >
                          Reply
                        </button>
                        <button
                          className="view-venue-btn"
                          onClick={() => handleViewVenue(message.venueId)}
                        >
                          View Venue
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="no-messages">
                <div className="no-data-icon"></div>
                <h3>No messages</h3>
                <p>You don't have any messages at the moment.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerRequestsAndMessages;
