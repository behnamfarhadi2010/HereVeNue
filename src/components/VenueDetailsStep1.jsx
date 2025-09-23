import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useVenue } from "../contexts/VenueContext";
import "../styles/VenueDetails.css";

const VenueDetailsStep1 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { venues } = useVenue();

  // Find the specific venue by ID
  const venue = venues.find((v) => v.id === parseInt(id));

  if (!venue) {
    return (
      <div className="venue-details-container">
        <div className="error">
          <h2>Venue not found</h2>
          <button onClick={() => navigate("/venues")} className="back-button">
            Back to Venues
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="venue-details-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Results
      </button>

      {/* Step 1 Information - Read Only View */}
      <div className="venue-info-section">
        <h1>{venue.venueName || "Unnamed Venue"}</h1>

        {/* Venue Name */}
        <div className="info-group">
          <label>Venue Name</label>
          <div className="info-value">{venue.venueName || "Not specified"}</div>
        </div>

        {/* Venue Size */}
        <div className="info-group">
          <label>Venue Capacity</label>
          <div className="info-value">
            {venue.venueSize ? `${venue.venueSize} guests` : "Not specified"}
          </div>
        </div>

        {/* Venue Types */}
        <div className="info-group">
          <label>Venue Types</label>
          <div className="venue-types-display">
            {venue.venueTypes && venue.venueTypes.length > 0 ? (
              venue.venueTypes.map((type, index) => (
                <span key={index} className="venue-type-tag">
                  {type}
                </span>
              ))
            ) : (
              <span className="no-info">No venue types specified</span>
            )}
          </div>
        </div>

        {/* Venue Description */}
        <div className="info-group">
          <label>Venue Description</label>
          <div className="info-value description-text">
            {venue.venueDescription ||
              venue.description ||
              "No description available"}
          </div>
        </div>

        {/* Additional Step 1 Information if available */}
        {venue.spaceType && (
          <div className="info-group">
            <label>Space Type</label>
            <div className="info-value">{venue.spaceType}</div>
          </div>
        )}

        {venue.eventTypes && venue.eventTypes.length > 0 && (
          <div className="info-group">
            <label>Suitable Event Types</label>
            <div className="venue-types-display">
              {venue.eventTypes.map((type, index) => (
                <span key={index} className="event-type-tag">
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueDetailsStep1;
