// src/components/VenueOwnerDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VenueOwnerDashboard = () => {
  const navigate = useNavigate();
  const [venueData, setVenueData] = useState(null);

  useEffect(() => {
    // Load from localStorage
    const savedVenue = localStorage.getItem("venueSubmission");
    if (savedVenue) {
      setVenueData(JSON.parse(savedVenue));
    }
  }, []);

  if (!venueData) {
    return (
      <div className="dashboard-container">
        <h1>My Venue Dashboard</h1>
        <p>No venue data found. Please create a venue first.</p>
        <button
          onClick={() => navigate("/add-listing")}
          className="primary-btn"
        >
          Create New Venue
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1>My Venue Dashboard</h1>

      <div className="dashboard-actions">
        <button
          onClick={() => navigate("/add-listing")}
          className="primary-btn"
        >
          ➕ Create New Venue
        </button>
        <button onClick={() => navigate("/")} className="secondary-btn">
          ← Back to Home
        </button>
      </div>

      <div className="venue-card">
        <h2>{venueData.venueName || "Unnamed Venue"}</h2>
        <p className="submission-date">
          Submitted on: {new Date(venueData.submittedAt).toLocaleDateString()}
        </p>

        <div className="venue-details">
          <h3>Venue Details</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <strong>Venue Type:</strong>{" "}
              {venueData.spaceType || "Not specified"}
            </div>
            <div className="detail-item">
              <strong>Location:</strong>{" "}
              {venueData.venueAddress
                ? `${venueData.venueAddress}, ${venueData.city}`
                : "Not specified"}
            </div>
            <div className="detail-item">
              <strong>Capacity:</strong>{" "}
              {venueData.capacity_standing || "Not specified"}
            </div>
            <div className="detail-item">
              <strong>Pricing:</strong>{" "}
              {venueData.pricingOption
                ? venueData.pricingOption.replace(/([A-Z])/g, " $1").trim()
                : "Not specified"}
            </div>
          </div>
        </div>

        {venueData.venueDescription && (
          <div className="description-section">
            <h3>Description</h3>
            <p>{venueData.venueDescription}</p>
          </div>
        )}

        {venueData.venueTypes && venueData.venueTypes.length > 0 && (
          <div className="venue-types">
            <h3>Venue Types</h3>
            <div className="tags">
              {venueData.venueTypes.map((type, index) => (
                <span key={index} className="tag">
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="status-badge">
          Status: <span className="status">{venueData.status || "draft"}</span>
        </div>

        <div className="action-buttons">
          <button className="edit-btn">Edit Venue</button>
          <button className="view-btn">View Public Page</button>
          <button className="delete-btn">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default VenueOwnerDashboard;
