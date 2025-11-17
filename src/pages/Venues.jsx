// src/pages/Venues.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MyMap from "../components/MyMap";
import VenuesHeader from "../components/VenuesHeader";
import { useVenue } from "../contexts/VenueContext";
import { useFavorites } from "../contexts/FavoritesContext";
import "../styles/VenuesPage.css";

export default function Venues() {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchVenues } = useVenue();
  const { favorites, toggleFavorite, isFavorited } = useFavorites();
  const [filteredVenues, setFilteredVenues] = useState([]);

  useEffect(() => {
    // Parse query parameters from URL
    const queryParams = new URLSearchParams(location.search);

    // Convert query parameters to filters object
    const filters = {
      eventType: queryParams.get("type") || "",
      venueSize: queryParams.get("size") || "",
      venueName: queryParams.get("name") || "",
      city: queryParams.get("city") || "",
    };

    console.log("Filters from URL:", filters);

    // Perform search with filters
    const results = searchVenues(filters);
    console.log("Filtered results:", results);

    setFilteredVenues(results);
  }, [location.search, searchVenues]);

  // Toggle favorite status for a venue using context
  const handleToggleFavorite = (venueId, e) => {
    e.stopPropagation(); // Prevent card click when clicking favorite button
    toggleFavorite(venueId);
  };

  return (
    <div>
      <VenuesHeader />
      <div className="venues-layout">
        {/* Left side - search results */}
        <div className="venues-results">
          {filteredVenues.length > 0 ? (
            <div className="venues-grid">
              {filteredVenues.map((venue) => (
                <div
                  key={venue.id}
                  className="venue-card"
                  onClick={() => navigate(`/venue/${venue.id}`)}
                  style={{ cursor: "pointer", position: "relative" }}
                >
                  {venue.floorPlanImages?.[0]?.url && (
                    <div style={{ position: "relative" }}>
                      <img
                        src={venue.floorPlanImages[0].url}
                        alt={venue.venueName}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                      {/* Favorite Heart Button */}
                      <button
                        className={`favorite-heart-btn ${
                          isFavorited(venue.id) ? "favorited" : ""
                        }`}
                        onClick={(e) => handleToggleFavorite(venue.id, e)}
                        title={
                          isFavorited(venue.id)
                            ? "Remove from favorites"
                            : "Add to favorites"
                        }
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          background: "rgba(255, 255, 255, 0.9)",
                          border: "none",
                          borderRadius: "50%",
                          width: "36px",
                          height: "36px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          fontSize: "18px",
                          transition: "all 0.2s ease",
                          zIndex: 10,
                        }}
                      >
                        {isFavorited(venue.id) ? "❤️" : "🤍"}
                      </button>
                    </div>
                  )}

                  <div style={{ padding: "10px" }}>
                    <h3>{venue.venueName || "Unnamed Venue"}</h3>
                    <p>
                      {venue.venueTypes?.join(", ") || "No event type"} •{" "}
                      {venue.venueSize || "Capacity not set"} guests •{" "}
                      {venue.city || "Unknown city"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h2>No venues found</h2>
              <p>Try adjusting your search criteria or browse all venues.</p>
            </div>
          )}
        </div>

        {/* Right side - fixed map */}
        <div className="venues-map">
          <MyMap />
        </div>
      </div>
    </div>
  );
}
