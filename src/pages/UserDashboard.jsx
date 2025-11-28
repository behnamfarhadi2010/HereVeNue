// pages/UserDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useVenue } from "../contexts/VenueContext";
import { useMessages } from "../hooks/useMessages";
import { useFavorites } from "../contexts/FavoritesContext";
import ChatModal from "../components/ChatModal";
import { formatDate, formatCurrency } from "../utils/utils";
import { useAuth } from "../contexts/AuthContext";
import "../styles/UserDashboard.css";

const UserDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("current");
  const [selectedConversation, setSelectedConversation] = useState(null);
  const { currentUser: authUser } = useAuth();

  const { venues } = useVenue();
  const {
    bookingRequests,
    getUserConversations,
    getUnreadCount,
    markConversationAsRead,
    conversations, // Add this
  } = useMessages();
  const { favorites, toggleFavorite, isFavorited } = useFavorites();

  // Current user object
  const currentUser = {
    id: authUser ? authUser.toLowerCase() : "admin",
    name: authUser || "Admin",
  };

  console.log("UserDashboard: authUser from context:", authUser);
  console.log("UserDashboard: currentUser.id:", currentUser.id);

  // Get user's conversations
  const userConversations = getUserConversations(currentUser.id);
  console.log("UserDashboard: All conversations:", getUserConversations("")); // Hack to see all? No, getUserConversations filters.
  // Let's log the raw conversations from context if possible, but we only have getUserConversations.
  // Wait, we can get 'conversations' from useMessages if we destructure it.
  
  const unreadCount = getUnreadCount(currentUser.id);
  console.log("UserDashboard: userConversations:", userConversations);
  console.log("UserDashboard: ALL RAW CONVERSATIONS:", conversations);

  // Check for activeTab from navigation state
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  // Update selected conversation when conversations change
  useEffect(() => {
    if (selectedConversation) {
      const updatedConversation = userConversations.find(
        (conv) => conv.id === selectedConversation.id
      );
      if (
        updatedConversation &&
        JSON.stringify(updatedConversation) !==
          JSON.stringify(selectedConversation)
      ) {
        setSelectedConversation(updatedConversation);
      }
    }
    // eslint-disable-next-line
  }, [userConversations]);

  // Get favorite venues using context
  const favoriteVenues = venues.filter((venue) => favorites.includes(venue.id));

  // Get current bookings (pending and confirmed)
  const currentBookings = bookingRequests.filter(
    (booking) => booking.status === "pending" || booking.status === "confirmed"
  );

  // Get past bookings (cancelled and completed)
  const pastBookings = bookingRequests.filter(
    (booking) =>
      booking.status === "cancelled" || booking.status === "completed"
  );

  const handleBrowseVenues = () => {
    navigate("/venues", { state: { results: venues } });
  };

  const handleViewVenue = (venueId) => {
    navigate(`/venue/${venueId}`);
  };

  const handleOpenChat = (conversation) => {
    // Mark conversation as read when opening
    markConversationAsRead(conversation.id, currentUser.id);
    setSelectedConversation(conversation);
  };

  const handleCloseChat = () => {
    setSelectedConversation(null);
  };

  // Toggle favorite venue using context
  const handleToggleFavorite = (venueId, event) => {
    event.stopPropagation(); // Prevent card click
    toggleFavorite(venueId);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { text: "Pending", class: "status-pending" },
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
      (msg) => msg.senderId !== "admin" && !msg.read
    ).length;
  };

  // Get venue image helper function
  const getVenueImage = (venue) => {
    if (venue?.floorPlanImages && venue.floorPlanImages.length > 0) {
      return venue.floorPlanImages[0].url;
    }
    return null;
  };

  return (
    <div className="user-dashboard">
      <Header />

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Manage your enquiries here</h1>
        </div>

        <div className="enquiry-tabs">
          <button
            className={`tab-button ${activeTab === "current" ? "active" : ""}`}
            onClick={() => setActiveTab("current")}
          >
            Current{" "}
            <span className="count-badge">{currentBookings.length}</span>
          </button>
          <button
            className={`tab-button ${activeTab === "past" ? "active" : ""}`}
            onClick={() => setActiveTab("past")}
          >
            Past <span className="count-badge">{pastBookings.length}</span>
          </button>
          <button
            className={`tab-button ${
              activeTab === "favorites" ? "active" : ""
            }`}
            onClick={() => setActiveTab("favorites")}
          >
            Favorites <span className="count-badge">{favorites.length}</span>
          </button>
          <button
            className={`tab-button ${activeTab === "messages" ? "active" : ""}`}
            onClick={() => setActiveTab("messages")}
          >
            Messages{" "}
            <span className="count-badge">{userConversations.length}</span>
            {unreadCount > 0 && (
              <span className="unread-indicator">{unreadCount}</span>
            )}
          </button>
        </div>

        <div className="enquiries-content">
          {activeTab === "current" ? (
            <div className="current-enquiries">
              {currentBookings.length > 0 ? (
                <div className="bookings-grid">
                  <h2>Your Current Bookings ({currentBookings.length})</h2>
                  <div className="bookings-list">
                    {currentBookings.map((booking) => {
                      const venue = venues.find(
                        (v) => v.id === booking.venueId
                      );
                      const venueImage = getVenueImage(venue);

                      return (
                        <div key={booking.id} className="booking-card">
                          <div className="booking-image-container">
                            {venueImage ? (
                              <img
                                src={venueImage}
                                alt={booking.venueName}
                                className="booking-image"
                                onClick={() => handleViewVenue(booking.venueId)}
                              />
                            ) : (
                              <div
                                className="image-placeholder"
                                onClick={() => handleViewVenue(booking.venueId)}
                              >
                                🏢
                              </div>
                            )}
                          </div>
                          <div className="booking-info">
                            <div className="booking-header">
                              <h3
                                onClick={() => handleViewVenue(booking.venueId)}
                                className="clickable-title"
                              >
                                {booking.venueName}
                              </h3>
                              {getStatusBadge(booking.status)}
                            </div>
                            <p className="booking-location">
                              📍 {booking.city}, {booking.country}
                            </p>
                            <div className="booking-details">
                              <p>
                                <strong>Date:</strong>{" "}
                                {formatDate(booking.bookingDetails?.date)}
                              </p>
                              <p>
                                <strong>Time:</strong>{" "}
                                {booking.bookingDetails?.startTime} -{" "}
                                {booking.bookingDetails?.endTime}
                              </p>
                              <p>
                                <strong>Guests:</strong>{" "}
                                {booking.bookingDetails?.guests} people
                              </p>
                              <p>
                                <strong>Total:</strong>{" "}
                                {formatCurrency(booking.pricing?.total)}
                              </p>
                            </div>
                            <div className="booking-actions">
                              <button
                                className="view-venue-btn"
                                onClick={() => handleViewVenue(booking.venueId)}
                              >
                                View Venue
                              </button>
                              {/* Find conversation for this venue */}
                              <button
                                className="contact-host-btn"
                                onClick={() => {
                                  const conversation = userConversations.find(
                                    (conv) => conv.venueId === booking.venueId
                                  );
                                  if (conversation) {
                                    handleOpenChat(conversation);
                                  }
                                }}
                              >
                                Contact Host
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="no-enquiries">
                  <div className="no-enquiries-icon">📋</div>
                  <h2>You don't have any active enquiries at the moment</h2>
                  <p>
                    Start exploring venues and submit enquiries to see them
                    here.
                  </p>
                  <button className="cta-button" onClick={handleBrowseVenues}>
                    Browse Venues
                  </button>
                </div>
              )}
            </div>
          ) : activeTab === "past" ? (
            <div className="past-enquiries">
              {pastBookings.length > 0 ? (
                <div className="bookings-grid">
                  <h2>Your Past Bookings ({pastBookings.length})</h2>
                  <div className="bookings-list">
                    {pastBookings.map((booking) => {
                      const venue = venues.find(
                        (v) => v.id === booking.venueId
                      );
                      const venueImage = getVenueImage(venue);

                      return (
                        <div
                          key={booking.id}
                          className="booking-card past-booking"
                        >
                          <div className="booking-image-container">
                            {venueImage ? (
                              <img
                                src={venueImage}
                                alt={booking.venueName}
                                className="booking-image"
                                onClick={() => handleViewVenue(booking.venueId)}
                              />
                            ) : (
                              <div
                                className="image-placeholder"
                                onClick={() => handleViewVenue(booking.venueId)}
                              >
                                🏢
                              </div>
                            )}
                          </div>
                          <div className="booking-info">
                            <div className="booking-header">
                              <h3
                                onClick={() => handleViewVenue(booking.venueId)}
                                className="clickable-title"
                              >
                                {booking.venueName}
                              </h3>
                              {getStatusBadge(booking.status)}
                            </div>
                            <p className="booking-location">
                              📍 {booking.city}, {booking.country}
                            </p>
                            <div className="booking-details">
                              <p>
                                <strong>Date:</strong>{" "}
                                {formatDate(booking.bookingDetails?.date)}
                              </p>
                              <p>
                                <strong>Time:</strong>{" "}
                                {booking.bookingDetails?.startTime} -{" "}
                                {booking.bookingDetails?.endTime}
                              </p>
                              <p>
                                <strong>Guests:</strong>{" "}
                                {booking.bookingDetails?.guests} people
                              </p>
                              <p>
                                <strong>Total:</strong>{" "}
                                {formatCurrency(booking.pricing?.total)}
                              </p>
                            </div>
                            <div className="booking-actions">
                              <button
                                className="view-venue-btn"
                                onClick={() => handleViewVenue(booking.venueId)}
                              >
                                View Venue
                              </button>
                              {booking.status === "completed" && (
                                <button className="review-btn">
                                  Leave Review
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="no-enquiries">
                  <div className="no-enquiries-icon">📊</div>
                  <h2>No past enquiries</h2>
                  <p>Your past enquiries will appear here once completed.</p>
                  <button className="cta-button" onClick={handleBrowseVenues}>
                    Browse Venues
                  </button>
                </div>
              )}
            </div>
          ) : activeTab === "favorites" ? (
            <div className="favorites-section">
              {favoriteVenues.length > 0 ? (
                <div className="favorites-grid">
                  <h2>Your Favorite Venues ({favoriteVenues.length})</h2>
                  <div className="venues-list">
                    {favoriteVenues.map((venue) => {
                      const venueImage = getVenueImage(venue);

                      return (
                        <div
                          key={venue.id}
                          className="favorite-venue-card"
                          onClick={() => handleViewVenue(venue.id)}
                        >
                          {/* Favorite Heart Icon */}
                          <button
                            className={`favorite-heart-btn ${
                              isFavorited(venue.id) ? "active" : ""
                            }`}
                            onClick={(e) => handleToggleFavorite(venue.id, e)}
                            aria-label={
                              isFavorited(venue.id)
                                ? "Remove from favorites"
                                : "Add to favorites"
                            }
                          >
                            {isFavorited(venue.id) ? "❤️" : "🤍"}
                          </button>

                          <div className="venue-image-container">
                            {venueImage ? (
                              <img
                                src={venueImage}
                                alt={venue.venueName}
                                className="venue-image"
                              />
                            ) : (
                              <div className="image-placeholder">🏢</div>
                            )}
                          </div>
                          <div className="venue-info">
                            <h3>{venue.venueName || "Unnamed Venue"}</h3>
                            <p className="venue-location">
                              📍 {venue.city}, {venue.country}
                            </p>
                            <p className="venue-capacity">
                              👥 Capacity: {venue.venueSize} people
                            </p>
                            {venue.venueTypes &&
                              venue.venueTypes.length > 0 && (
                                <div className="venue-types">
                                  {venue.venueTypes
                                    .slice(0, 3)
                                    .map((type, index) => (
                                      <span
                                        key={index}
                                        className="venue-type-tag"
                                      >
                                        {type}
                                      </span>
                                    ))}
                                  {venue.venueTypes.length > 3 && (
                                    <span className="venue-type-tag">
                                      +{venue.venueTypes.length - 3} more
                                    </span>
                                  )}
                                </div>
                              )}
                            {venue.hourlyRate && (
                              <p className="venue-price">
                                From {formatCurrency(venue.hourlyRate)} / hour
                              </p>
                            )}
                            <div className="venue-actions">
                              <button
                                className="enquire-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewVenue(venue.id);
                                }}
                              >
                                Send Enquiry
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="no-favorites">
                  <div className="no-favorites-icon">💙</div>
                  <h2>No favorite venues yet</h2>
                  <p>Start browsing venues and add them to your favorites!</p>
                  <button className="cta-button" onClick={handleBrowseVenues}>
                    Browse Venues
                  </button>
                </div>
              )}
            </div>
          ) : activeTab === "messages" ? (
            <div className="messages-section">
              {userConversations.length > 0 ? (
                <div className="conversations-list">
                  <h2>Your Conversations ({userConversations.length})</h2>
                  {userConversations.map((conversation) => {
                    const venue = venues.find(
                      (v) => v.id === conversation.venueId
                    );
                    const lastMessage =
                      conversation.messages.length > 0
                        ? conversation.messages[
                            conversation.messages.length - 1
                          ]
                        : null;
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
                            <h4>
                              {conversation.venueName ||
                                venue?.venueName ||
                                "Unknown Venue"}
                            </h4>
                            <span className="conversation-participants">
                              with Venue Owner
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

                        {lastMessage && (
                          <div className="conversation-preview">
                            <span className="last-message-sender">
                              {lastMessage.senderId === "admin"
                                ? "You: "
                                : "Owner: "}
                            </span>
                            <span className="last-message-text">
                              {lastMessage.text}
                            </span>
                          </div>
                        )}

                        {/* Show conversation metadata if available */}
                        {conversation.metadata && (
                          <div className="conversation-metadata">
                            {conversation.metadata.flexibleDates && (
                              <span className="metadata-tag">
                                Flexible dates
                              </span>
                            )}
                            {conversation.metadata.requireCatering && (
                              <span className="metadata-tag">
                                Requires catering
                              </span>
                            )}
                            {conversation.metadata.ownCatering && (
                              <span className="metadata-tag">Own catering</span>
                            )}
                          </div>
                        )}

                        <div className="conversation-actions">
                          <button
                            className="open-chat-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenChat(conversation);
                            }}
                          >
                            Open Chat
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
                  <div className="no-messages-icon">💬</div>
                  <h2>No conversations yet</h2>
                  <p>
                    Your conversations with venue owners will appear here once
                    you send them a message.
                  </p>
                  <button className="cta-button" onClick={handleBrowseVenues}>
                    Browse Venues
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
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

export default UserDashboard;
