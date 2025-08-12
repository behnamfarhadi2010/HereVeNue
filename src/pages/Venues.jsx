// src/pages/Venues.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import VenuesHeader from "../components/VenuesHeader";

export default function Venues() {
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <div style={{ padding: "20px" }}>
      <VenuesHeader />
      <h2>Search Results</h2>
      {results.length > 0 ? (
        <div className="venues-grid">
          {results.map((venue) => (
            <div key={venue.id} className="venue-card">
              {/* Image display added here */}
              {venue.image && (
                <img
                  src={venue.image}
                  alt={venue.title}
                  style={{
                    width: "300px",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              )}
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
  );
}
