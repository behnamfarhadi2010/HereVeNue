// src/components/VenueOwnerDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useVenue } from "../contexts/VenueContext";
import Header from "./Header";
const VenueOwnerDashboard = () => {
  const venueContext = useVenue();
  const deleteVenue = venueContext.deleteVenue;
  const editVenue = venueContext.editVenue;
  const venues = venueContext.venues;

  const navigate = useNavigate();

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
    <>
      <Header />
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
                <button
                  className="edit-btn"
                  onClick={() => {
                    const venueToEdit = editVenue(venue.id);
                    if (venueToEdit) {
                      // Navigate to the edit page (AddListing component)
                      navigate("/add-listing", {
                        state: { editing: true, venue: venueToEdit },
                      });
                    }
                  }}
                >
                  Edit
                </button>
                {/* <button className="view-btn">View</button> */}
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
    </>
  );
};

export default VenueOwnerDashboard;
