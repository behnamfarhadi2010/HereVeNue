import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useVenue } from "../contexts/VenueContext";
import "../styles/userDashboard.css";

const UserDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("current");
  const [favorites, setFavorites] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const { venues } = useVenue();

  // Check for activeTab from navigation state
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  // Load favorites from localStorage
  const loadFavorites = () => {
    const savedFavorites = localStorage.getItem("userFavorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    } else {
      setFavorites([]);
    }
  };

  // Load bookings from localStorage
  const loadBookings = () => {
    const savedBookings = localStorage.getItem("userBookings");
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    } else {
      setBookings([]);
    }
  };

  // Load messages from localStorage
  const loadMessages = () => {
    const savedMessages = localStorage.getItem("ownerMessages");
    if (savedMessages) {
      const allMessages = JSON.parse(savedMessages);
      // Filter messages sent by the current user (Admin)
      const userMessages = allMessages.filter(
        (message) => message.userName === "Admin"
      );
      setMessages(userMessages);
    } else {
      setMessages([]);
    }
  };

  useEffect(() => {
    loadFavorites();
    loadBookings();
    loadMessages();

    const handleFavoritesUpdate = () => {
      loadFavorites();
    };

    const handleBookingsUpdate = () => {
      loadBookings();
    };

    const handleMessagesUpdate = () => {
      loadMessages();
    };

    window.addEventListener("favoritesUpdated", handleFavoritesUpdate);
    window.addEventListener("bookingsUpdated", handleBookingsUpdate);
    window.addEventListener("ownerMessageEvent", handleMessagesUpdate);
    window.addEventListener("storage", handleFavoritesUpdate);
    window.addEventListener("storage", handleBookingsUpdate);
    window.addEventListener("storage", handleMessagesUpdate);

    return () => {
      window.removeEventListener("favoritesUpdated", handleFavoritesUpdate);
      window.removeEventListener("bookingsUpdated", handleBookingsUpdate);
      window.removeEventListener("ownerMessageEvent", handleMessagesUpdate);
      window.removeEventListener("storage", handleFavoritesUpdate);
      window.removeEventListener("storage", handleBookingsUpdate);
      window.removeEventListener("storage", handleMessagesUpdate);
    };
  }, []);

  const favoriteVenues = venues.filter((venue) => favorites.includes(venue.id));

  // Get current bookings (pending and confirmed)
  const currentBookings = bookings.filter(
    (booking) => booking.status === "pending" || booking.status === "confirmed"
  );

  // Get past bookings (cancelled and completed)
  const pastBookings = bookings.filter(
    (booking) =>
      booking.status === "cancelled" || booking.status === "completed"
  );

  const handleBrowseVenues = () => {
    navigate("/venues", { state: { results: venues } });
  };

  const handleViewVenue = (venueId) => {
    navigate(`/venue/${venueId}`);
  };

  const handleFollowUp = (messageId, venueName) => {
    alert(`Follow up on your message about ${venueName}`);
    // You can implement follow-up functionality here
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
            Messages <span className="count-badge">{messages.length}</span>
          </button>
        </div>

        <div className="enquiries-content">
          {activeTab === "current" ? (
            <div className="current-enquiries">
              {currentBookings.length > 0 ? (
                <div className="bookings-grid">
                  <h2>Your Current Bookings ({currentBookings.length})</h2>
                  <div className="bookings-list">
                    {currentBookings.map((booking) => (
                      <div key={booking.id} className="booking-card">
                        <div className="booking-image-container">
                          {booking.venueImage ? (
                            <img
                              src={booking.venueImage}
                              alt={booking.venueName}
                              className="booking-image"
                            />
                          ) : (
                            <div className="image-placeholder">🏢</div>
                          )}
                        </div>
                        <div className="booking-info">
                          <div className="booking-header">
                            <h3>{booking.venueName}</h3>
                            {getStatusBadge(booking.status)}
                          </div>
                          <p className="booking-location">
                            📍 {booking.city}, {booking.country}
                          </p>
                          <div className="booking-details">
                            <p>
                              <strong>Date:</strong>{" "}
                              {formatDate(booking.bookingDetails.date)}
                            </p>
                            <p>
                              <strong>Time:</strong>{" "}
                              {booking.bookingDetails.startTime} -{" "}
                              {booking.bookingDetails.endTime}
                            </p>
                            <p>
                              <strong>Guests:</strong>{" "}
                              {booking.bookingDetails.guests} people
                            </p>
                            <p>
                              <strong>Total:</strong>{" "}
                              {formatCurrency(booking.pricing.total)}
                            </p>
                          </div>
                          <div className="booking-actions">
                            <button
                              className="view-venue-btn"
                              onClick={() => handleViewVenue(booking.venueId)}
                            >
                              View Venue
                            </button>
                            <button className="contact-host-btn">
                              Contact Host
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
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
                    {pastBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="booking-card past-booking"
                      >
                        <div className="booking-image-container">
                          {booking.venueImage ? (
                            <img
                              src={booking.venueImage}
                              alt={booking.venueName}
                              className="booking-image"
                            />
                          ) : (
                            <div className="image-placeholder">🏢</div>
                          )}
                        </div>
                        <div className="booking-info">
                          <div className="booking-header">
                            <h3>{booking.venueName}</h3>
                            {getStatusBadge(booking.status)}
                          </div>
                          <p className="booking-location">
                            📍 {booking.city}, {booking.country}
                          </p>
                          <div className="booking-details">
                            <p>
                              <strong>Date:</strong>{" "}
                              {formatDate(booking.bookingDetails.date)}
                            </p>
                            <p>
                              <strong>Time:</strong>{" "}
                              {booking.bookingDetails.startTime} -{" "}
                              {booking.bookingDetails.endTime}
                            </p>
                            <p>
                              <strong>Guests:</strong>{" "}
                              {booking.bookingDetails.guests} people
                            </p>
                            <p>
                              <strong>Total:</strong>{" "}
                              {formatCurrency(booking.pricing.total)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="no-enquiries">
                  <div className="no-enquiries-icon">📊</div>
                  <h2>No past enquiries</h2>
                  <p>Your past enquiries will appear here once completed.</p>
                </div>
              )}
            </div>
          ) : activeTab === "favorites" ? (
            <div className="favorites-section">
              {favoriteVenues.length > 0 ? (
                <div className="favorites-grid">
                  <h2>Your Favorite Venues ({favoriteVenues.length})</h2>
                  <div className="venues-list">
                    {favoriteVenues.map((venue) => (
                      <div key={venue.id} className="favorite-venue-card">
                        <div className="venue-image-container">
                          {venue.floorPlanImages?.[0]?.url ? (
                            <img
                              src={venue.floorPlanImages[0].url}
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
                          {venue.venueTypes && (
                            <div className="venue-types">
                              {venue.venueTypes.map((type, index) => (
                                <span key={index} className="venue-type-tag">
                                  {type}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="no-favorites">
                  <div className="no-favorites-icon"></div>
                  <h2>No favorite venues yet</h2>
                  <p>Start browsing venues and add them to your favorites!</p>
                  <button className="cta-button" onClick={handleBrowseVenues}>
                    Browse Venues
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Messages Tab Content
            <div className="messages-section">
              {messages.length > 0 ? (
                <div className="messages-list">
                  <h2>Your Messages ({messages.length})</h2>
                  {messages.map((message) => {
                    const venue = venues.find((v) => v.id === message.venueId);
                    return (
                      <div
                        key={message.id}
                        className={`message-card ${
                          message.read ? "read" : "unread"
                        }`}
                      >
                        <div className="message-header">
                          <div className="message-sender">
                            <h4>To: Venue Owner</h4>
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
                            <span
                              className={`status-indicator ${
                                message.read ? "read" : "unread"
                              }`}
                            >
                              {message.read ? "✓ Read" : "◷ Pending"}
                            </span>
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
                            className="view-venue-btn"
                            onClick={() => handleViewVenue(message.venueId)}
                          >
                            View Venue
                          </button>
                          <button
                            className="follow-up-btn"
                            onClick={() =>
                              handleFollowUp(message.id, message.venueName)
                            }
                          ></button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="no-messages">
                  <div className="no-messages-icon">💬</div>
                  <h2>No messages sent yet</h2>
                  <p>
                    Your messages to hosts will appear here once you send them.
                  </p>
                  <button className="cta-button" onClick={handleBrowseVenues}>
                    Browse Venues
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
