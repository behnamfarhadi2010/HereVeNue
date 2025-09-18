import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useVenue } from "../contexts/VenueContext";
import "../styles/userDashboard.css";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("current");
  const { venues } = useVenue(); // Get venues from context

  const handleBrowseVenues = () => {
    console.log("All venues from context:", venues);
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
        </div>

        <div className="enquiries-content">
          {activeTab === "current" ? (
            <div className="current-enquiries">
              <div className="no-enquiries">
                <div className="no-enquiries-icon">📋</div>
                <h2>You don't have any active enquiries at the moment</h2>
                <p>
                  Start exploring venues and submit enquiries to see them here.
                </p>
                <button className="cta-button" onClick={handleBrowseVenues}>
                  Browse Venues
                </button>
              </div>
            </div>
          ) : (
            <div className="past-enquiries">
              <div className="no-enquiries">
                <div className="no-enquiries-icon">📊</div>
                <h2>No past enquiries</h2>
                <p>Your past enquiries will appear here once completed.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
