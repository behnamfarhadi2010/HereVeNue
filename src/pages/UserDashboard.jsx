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
  const { venues } = useVenue();

  // Check for activeTab from navigation state
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  // Load favorites from localStorage and listen for updates
  const loadFavorites = () => {
    const savedFavorites = localStorage.getItem("userFavorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    } else {
      setFavorites([]);
    }
  };

  useEffect(() => {
    loadFavorites();

    const handleFavoritesUpdate = () => {
      loadFavorites();
    };

    window.addEventListener("favoritesUpdated", handleFavoritesUpdate);
    window.addEventListener("storage", handleFavoritesUpdate);

    return () => {
      window.removeEventListener("favoritesUpdated", handleFavoritesUpdate);
      window.removeEventListener("storage", handleFavoritesUpdate);
    };
  }, []);

  const favoriteVenues = venues.filter((venue) => favorites.includes(venue.id));

  const handleBrowseVenues = () => {
    navigate("/venues", { state: { results: venues } });
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
            Current <span className="count-badge">0</span>
          </button>
          <button
            className={`tab-button ${activeTab === "past" ? "active" : ""}`}
            onClick={() => setActiveTab("past")}
          >
            Past <span className="count-badge">0</span>
          </button>
          <button
            className={`tab-button ${
              activeTab === "favorites" ? "active" : ""
            }`}
            onClick={() => setActiveTab("favorites")}
          >
            Favorites <span className="count-badge">{favorites.length}</span>
          </button>
        </div>

        <div className="enquiries-content">
          {activeTab === "current" ? (
            <div className="current-enquiries">
              <div className="no-enquiries">
                <div className="no-enquiries-icon"> </div>
                <h2>You don't have any active enquiries at the moment</h2>
                <p>
                  Start exploring venues and submit enquiries to see them here.
                </p>
                <button className="cta-button" onClick={handleBrowseVenues}>
                  Browse Venues
                </button>
              </div>
            </div>
          ) : activeTab === "past" ? (
            <div className="past-enquiries">
              <div className="no-enquiries">
                <div className="no-enquiries-icon"> </div>
                <h2>No past enquiries</h2>
                <p>Your past enquiries will appear here once completed.</p>
              </div>
            </div>
          ) : (
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
                            <div className="image-placeholder"> </div>
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
                  <div className="no-favorites-icon"> </div>
                  <h2>No favorite venues yet</h2>
                  <p>Start browsing venues and add them to your favorites!</p>
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
