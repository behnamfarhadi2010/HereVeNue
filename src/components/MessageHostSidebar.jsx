// components/MessageHostSidebar.jsx
import React, { useState, useEffect } from "react";
import "../styles/MessageHostSidebarStyles.css";

const MessageHostSidebar = ({ venue }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageData, setMessageData] = useState({
    flexibleDates: false,
    messageText: "",
    requireCatering: false,
    ownCatering: true,
  });

  // Load favorite status from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("userFavorites");
    if (savedFavorites) {
      const favorites = JSON.parse(savedFavorites);
      setIsFavorited(favorites.includes(venue.id));
    }
  }, [venue.id]);

  const handleSendMessage = () => {
    setShowMessageModal(true);
  };

  const handleCloseModal = () => {
    setShowMessageModal(false);
  };

  const handleSubmitMessage = () => {
    console.log("Message to host:", {
      venueId: venue.id,
      venueName: venue.venueName,
      ...messageData,
      timestamp: new Date().toISOString(),
    });

    alert("Message sent to host! They typically respond within 1 hour.");
    setShowMessageModal(false);
    setMessageData({
      flexibleDates: false,
      messageText: "",
      requireCatering: false,
      ownCatering: true,
    });
  };

  const toggleFavorite = () => {
    const savedFavorites = localStorage.getItem("userFavorites");
    let favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

    let updatedFavorites;
    if (isFavorited) {
      // Remove from favorites
      updatedFavorites = favorites.filter((id) => id !== venue.id);
    } else {
      // Add to favorites
      updatedFavorites = [...favorites, venue.id];
    }

    // Update localStorage
    localStorage.setItem("userFavorites", JSON.stringify(updatedFavorites));

    // Update local state
    setIsFavorited(!isFavorited);

    console.log(
      `${venue.venueName} ${
        !isFavorited ? "added to" : "removed from"
      } favorites`
    );

    // Optional: Trigger a custom event to notify other components
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  return (
    <>
      <div className="message-host-sidebar">
        <div className="message-host-card">
          {/* Host Information */}
          <div className="host-info-section">
            <h3>Message host</h3>

            <div className="host-details">
              <div className="host-item">
                <span className="checkbox">☑</span>
                <div className="host-text">
                  <strong>Adrian R.</strong>
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
            <button className="send-message-btn" onClick={handleSendMessage}>
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
              <span className="favorite-label">
                {isFavorited ? "Remove from Favourites" : "Add to Favourites"}
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="modal-overlay">
          <div className="message-modal">
            <div className="modal-header">
              <h2>Message host</h2>
            </div>

            <div className="modal-content">
              {/* Host Info */}
              <div className="modal-section">
                <h3>Adrian R.</h3>
                <p className="host-description">
                  Your Personal Event Manager from Sorry Studio
                </p>
              </div>

              <div className="modal-divider"></div>

              {/* Event Details */}
              <div className="modal-section">
                <div className="checklist">
                  <label className="check-item">
                    <input
                      type="checkbox"
                      checked={messageData.flexibleDates}
                      onChange={(e) =>
                        setMessageData((prev) => ({
                          ...prev,
                          flexibleDates: e.target.checked,
                        }))
                      }
                    />
                    <span>I'm flexible on dates and time</span>
                  </label>
                </div>
              </div>

              <div className="modal-divider"></div>

              {/* Message Section */}
              <div className="modal-section">
                <h4>Message to Adrian R.</h4>
                <p className="instruction">
                  Please write what you'd like to use the space for and any
                  questions you might have
                </p>

                <textarea
                  value={messageData.messageText}
                  onChange={(e) =>
                    setMessageData((prev) => ({
                      ...prev,
                      messageText: e.target.value,
                    }))
                  }
                  className="modal-textarea"
                  placeholder="Type your message here..."
                  rows="4"
                />

                <div className="catering-options">
                  <label className="check-item">
                    <input
                      type="checkbox"
                      checked={messageData.requireCatering}
                      onChange={(e) =>
                        setMessageData((prev) => ({
                          ...prev,
                          requireCatering: e.target.checked,
                        }))
                      }
                    />
                    <span>I require catering</span>
                  </label>
                  <label className="check-item">
                    <input
                      type="checkbox"
                      checked={messageData.ownCatering}
                      onChange={(e) =>
                        setMessageData((prev) => ({
                          ...prev,
                          ownCatering: e.target.checked,
                        }))
                      }
                    />
                    <span>I want my own catering</span>
                  </label>
                </div>
              </div>

              <div className="modal-divider"></div>

              {/* Catering Info */}
              <div className="modal-section">
                <p className="catering-info">
                  <strong>External catering allowed</strong>
                </p>
                <p className="catering-detail">
                  X. Buyout fee for external catering
                </p>
                <p className="catering-detail">
                  X. Kitchen facilities available for guests
                </p>
              </div>
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={handleCloseModal}>
                Cancel
              </button>
              <button
                className="submit-btn"
                onClick={handleSubmitMessage}
                disabled={!messageData.messageText.trim()}
              >
                Send message
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageHostSidebar;
