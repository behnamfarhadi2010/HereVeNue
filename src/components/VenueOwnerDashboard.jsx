// src/components/VenueOwnerDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useVenue } from "../contexts/VenueContext";
import "../styles/main.css";
import "../styles/Add-Listing.css";
import Header from "./Header";

const VenueOwnerDashboard = () => {
  const venueContext = useVenue();
  const deleteVenue = venueContext.deleteVenue;
  const venues = venueContext.venues;

  const navigate = useNavigate();
  //   const [venues, setVenues] = useState([]);

  //   const deleteVenue = (venueId) => {
  //     if (window.confirm("Are you sure you want to delete this venue?")) {
  //       const updatedVenues = venues.filter((venue) => venue.id !== venueId);
  //       setVenues(updatedVenues);
  //       localStorage.setItem("venueSubmissions", JSON.stringify(updatedVenues));
  //     }
  //   };

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
                  <div className="detail-item">
                    <strong>Capacity:</strong>{" "}
                    {venue.venueSize || "Not specified"}
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
    </>
  );
};

export default VenueOwnerDashboard;
