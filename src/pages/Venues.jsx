// src/pages/Venues.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MyMap from "../components/MyMap";
import VenuesHeader from "../components/VenuesHeader";
import { useVenue } from "../contexts/VenueContext";

export default function Venues() {
  const location = useLocation();
  const { searchVenues } = useVenue();
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

  return (
    <div>
      <VenuesHeader />
      <div className="venues-layout">
        {/* Left side - search results */}
        <div className="venues-results">
          {filteredVenues.length > 0 ? (
            <div className="venues-grid">
              {filteredVenues.map((venue) => (
                <div key={venue.id} className="venue-card">
                  {venue.floorPlanImages?.[0]?.url && (
                    <img
                      src={venue.floorPlanImages[0].url}
                      alt={venue.venueName}
                      style={{
                        width: "330px",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
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
