import React, { useState, useEffect } from "react";
import { useVenue } from "../contexts/VenueContext";
import { useMessages } from "../hooks/useMessages";
import { useNavigate } from "react-router-dom";
import ChatModal from "../components/ChatModal";
import { formatDate, formatCurrency } from "../utils/utils";
import "../styles/ownerRequestsAndMessages.css";

const OwnerRequestsAndMessages = () => {
  const [activeTab, setActiveTab] = useState("requests");
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedConversationId, setSelectedConversationId] = useState(null); // Track ID separately
  const { venues } = useVenue();
  const navigate = useNavigate();

  // Get data and functions from MessageContext
  const {
    bookingRequests,
    getUserConversations,
    getUnreadCount,
    updateBookingStatus,
    pendingRequestsCount,
  } = useMessages();

  // Get owner's conversations
  const ownerConversations = getUserConversations("owner");
  const unreadCount = getUnreadCount("owner");

  // Current user object (owner)
  const currentUser = {
    id: "owner",
    name: "Venue Owner",
  };

  // Update selected conversation when conversations change
  useEffect(() => {
    if (selectedConversationId) {
      const updatedConversation = ownerConversations.find(
        (conv) => conv.id === selectedConversationId
      );
      if (updatedConversation) {
        setSelectedConversation(updatedConversation);
      }
    }
  }, [ownerConversations, selectedConversationId]);

  const handleBookingAction = (bookingId, action) => {
    updateBookingStatus(bookingId, action);
  };

  const handleOpenChat = (conversation) => {
    setSelectedConversation(conversation);
    setSelectedConversationId(conversation.id); // Track ID
  };

  const handleCloseChat = () => {
    setSelectedConversation(null);
    setSelectedConversationId(null); // Clear ID
  };

  const handleViewVenue = (venueId) => {
    navigate(`/venue/${venueId}`);
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

  const getUnreadCountForConversation = (conversation) => {
    return conversation.messages.filter(
      (msg) => msg.senderId !== "owner" && !msg.read
    ).length;
  };

  // Get venue image helper function
  const getVenueImage = (request, venue) => {
    // First check if booking has stored image
    if (request.venueImage) {
      return request.venueImage;
    }

    // Then check venue floorPlanImages
    if (venue?.floorPlanImages && venue.floorPlanImages.length > 0) {
      return venue.floorPlanImages[0].url;
    }

    // Return null for placeholder
    return null;
  };

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
          Messages{" "}
          <span className="count-badge">{ownerConversations.length}</span>
          {unreadCount > 0 && (
            <span className="unread-indicator">{unreadCount}</span>
          )}
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
                  const venueImage = getVenueImage(request, venue);

                  return (
                    <div key={request.id} className="request-card">
                      {/* Venue Image */}
                      <div className="request-venue-image">
                        {venueImage ? (
                          <img
                            src={venueImage}
                            alt={request.venueName || "Venue"}
                            className="venue-thumbnail"
                            onClick={() => handleViewVenue(request.venueId)}
                          />
                        ) : (
                          <div
                            className="venue-placeholder"
                            onClick={() => handleViewVenue(request.venueId)}
                          >
                            🏢
                          </div>
                        )}
                      </div>

                      {/* Request Details */}
                      <div className="request-content">
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
                              onClick={() => {
                                // Find conversation for this venue and open it
                                const conversation = ownerConversations.find(
                                  (conv) => conv.venueId === request.venueId
                                );
                                if (conversation) {
                                  handleOpenChat(conversation);
                                }
                              }}
                            >
                              Contact User
                            </button>
                            <button
                              className="view-venue-btn"
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
                              onClick={() => {
                                // Find conversation for this venue and open it
                                const conversation = ownerConversations.find(
                                  (conv) => conv.venueId === request.venueId
                                );
                                if (conversation) {
                                  handleOpenChat(conversation);
                                }
                              }}
                            >
                              Contact User
                            </button>
                            <button
                              className="view-venue-btn"
                              onClick={() => handleViewVenue(request.venueId)}
                            >
                              View Venue
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="no-requests">
                <div className="no-data-icon">📋</div>
                <h3>No booking requests</h3>
                <p>You don't have any booking requests at the moment.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="messages-section">
            {ownerConversations.length > 0 ? (
              <div className="conversations-list">
                <h3>Conversations ({ownerConversations.length})</h3>
                {ownerConversations.map((conversation) => {
                  const venue = venues.find(
                    (v) => v.id === conversation.venueId
                  );
                  const lastMessage =
                    conversation.messages[conversation.messages.length - 1];
                  const conversationUnreadCount =
                    getUnreadCountForConversation(conversation);

                  return (
                    <div
                      key={conversation.id}
                      className={`conversation-card ${
                        conversationUnreadCount > 0 ? "has-unread" : ""
                      }`}
                      onClick={() => handleOpenChat(conversation)}
                    >
                      <div className="conversation-header">
                        <div className="conversation-info">
                          <h4>Admin</h4>
                          <span className="venue-name">
                            {conversation.venueName ||
                              venue?.venueName ||
                              "Unknown Venue"}
                          </span>
                        </div>
                        <div className="conversation-meta">
                          <span className="conversation-time">
                            {formatDate(conversation.lastMessageTime)}
                          </span>
                          {conversationUnreadCount > 0 && (
                            <span className="conversation-unread-badge">
                              {conversationUnreadCount}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="conversation-preview">
                        <span className="last-message-sender">
                          {lastMessage.senderId === "owner"
                            ? "You: "
                            : "Admin: "}
                        </span>
                        <span className="last-message-text">
                          {lastMessage.text}
                        </span>
                      </div>

                      {/* Message Details */}
                      {conversation.metadata && (
                        <div className="message-details">
                          {conversation.metadata.flexibleDates && (
                            <span className="message-tag">
                              Flexible on dates
                            </span>
                          )}
                          {conversation.metadata.requireCatering && (
                            <span className="message-tag">
                              Requires catering
                            </span>
                          )}
                          {conversation.metadata.ownCatering && (
                            <span className="message-tag">Own catering</span>
                          )}
                        </div>
                      )}

                      <div className="conversation-actions">
                        <button
                          className="reply-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenChat(conversation);
                          }}
                        >
                          Reply
                        </button>
                        <button
                          className="view-venue-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewVenue(conversation.venueId);
                          }}
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
                <div className="no-data-icon">💬</div>
                <h3>No messages</h3>
                <p>You don't have any messages at the moment.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chat Modal */}
      {selectedConversation && (
        <ChatModal
          conversation={selectedConversation}
          onClose={handleCloseChat}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default OwnerRequestsAndMessages;
