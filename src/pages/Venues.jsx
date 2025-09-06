// src/pages/Venues.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import MyMap from "../components/MyMap";
import VenuesHeader from "../components/VenuesHeader";

export default function Venues() {
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <div>
      <VenuesHeader />
      <div className="venues-layout">
        {/* Left side - search results */}
        <div className="venues-results">
          {results.length > 0 ? (
            <div className="venues-grid">
              {results.map((venue) => (
                <div key={venue.id} className="venue-card">
                  {/* {venue.image && (
                    <img
                      src={venue.image}
                      alt={venue.title}
                      style={{
                        width: "330px",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  )} */}
                  {results.map((venue) => (
                    <div key={venue.id} className="venue-card">
                      {venue.floorPlanImages?.[0] && (
                        <img
                          src={venue.floorPlanImages[0]}
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
                          {venue.capacity_standing ||
                            venue.capacity_dining ||
                            venue.capacity_theatre ||
                            "Capacity not set"}{" "}
                          guests • {venue.city || "Unknown city"}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div style={{ padding: "10px" }}>
                    <h3>{venue.title}</h3>
                    <p>
                      {venue.eventType} • {venue.guests} guests • {venue.city}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No results found.</p>
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
