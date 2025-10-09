// components/MessageHostSidebar.jsx
import React, { useState } from "react";
import "../styles/MessageHostSidebarStyles.css";

const MessageHostSidebar = ({ venue }) => {
  const [message, setMessage] = useState("");
  const [isFavorited, setIsFavorited] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) {
      alert("Please enter a message before sending.");
      return;
    }

    console.log("Message to host:", {
      venueId: venue.id,
      venueName: venue.venueName,
      message: message,
      timestamp: new Date().toISOString(),
    });

    alert("Message sent to host! They typically respond within 1 hour.");
    setMessage("");
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    console.log(
      `${venue.venueName} ${
        !isFavorited ? "added to" : "removed from"
      } favorites`
    );
  };

  return (
    <div className="message-host-sidebar">
      <div className="message-host-card">
        {/* Host Information */}
        <div className="host-info-section">
          <h3>Message host</h3>

          <div className="host-details">
            <div className="host-item">
              <span className="checkbox">☑</span>
              <div className="host-text">
                <strong>Admin</strong>
                <span className="host-role">
                  Your Personal Event Manager from Sorry Studio
                </span>
              </div>
            </div>

            <div className="host-item">
              <span className="checkbox">☑</span>
              <div className="host-text">
                <strong>Response rate - 100%</strong>
              </div>
            </div>

            <div className="host-item">
              <span className="checkbox">☒</span>
              <div className="host-text">
                <strong>Response time - 1h</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="message-section">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hi! I'm interested in booking your venue. Could you tell me more about availability and any special requirements?"
            className="message-input"
            rows="4"
          />
          <button
            className="send-message-btn"
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            Send Message
          </button>
        </div>

        {/* Add to Favorites */}
        <div className="favorites-section">
          <label className="favorite-option">
            <input
              type="checkbox"
              checked={isFavorited}
              onChange={toggleFavorite}
              className="favorite-checkbox"
            />
            <span className="favorite-label">Add to Favourites</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default MessageHostSidebar;
