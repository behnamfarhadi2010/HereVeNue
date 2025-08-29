// src/components/VenueOwnerDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VenueOwnerDashboard = () => {
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    // Load all venues from localStorage
    const savedVenues = localStorage.getItem("venueSubmissions");
    if (savedVenues) {
      setVenues(JSON.parse(savedVenues));
    }
  }, []);

  const deleteVenue = (venueId) => {
    if (window.confirm("Are you sure you want to delete this venue?")) {
      const updatedVenues = venues.filter((venue) => venue.id !== venueId);
      setVenues(updatedVenues);
      localStorage.setItem("venueSubmissions", JSON.stringify(updatedVenues));
    }
  };

  if (venues.length === 0) {
    return (
      <div className="dashboard-container">
        <h1>My Venue Dashboard</h1>
        <p>No venues found. Please create your first venue.</p>
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
          + Create New Venue
        </button>
        <span className="venue-count">Total Venues: {venues.length}</span>
      </div>

      <div className="venues-list">
        {venues.map((venue) => (
          <div key={venue.id} className="venue-card">
            <h2>{venue.venueName || "Unnamed Venue"}</h2>
            <p className="submission-date">
              Submitted on: {new Date(venue.submittedAt).toLocaleDateString()}
            </p>

            <div className="venue-details">
              <div className="detail-grid">
                <div className="detail-item">
                  <strong>Venue Type:</strong>{" "}
                  {venue.spaceType || "Not specified"}
                </div>
                <div className="detail-item">
                  <strong>Location:</strong>{" "}
                  {venue.venueAddress
                    ? `${venue.venueAddress}, ${venue.city}`
                    : "Not specified"}
                </div>
                <div className="detail-item">
                  <strong>Capacity:</strong>{" "}
                  {venue.capacity_standing || "Not specified"}
                </div>
                <div className="detail-item">
                  <strong>Status:</strong>{" "}
                  <span className="status">{venue.status || "draft"}</span>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button className="edit-btn">Edit</button>
              <button className="view-btn">View</button>
              <button
                className="delete-btn"
                onClick={() => deleteVenue(venue.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueOwnerDashboard;
