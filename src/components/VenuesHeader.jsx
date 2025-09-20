// src/components/VenuesHeader.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/testVenuesearch.css";
import { useVenue } from "../contexts/VenueContext";

export default function Search() {
  const [eventType, setEventType] = useState("");
  const [venueSize, setVenueSize] = useState("");
  const navigate = useNavigate();
  const { searchVenues } = useVenue();

  const handleSearch = (e) => {
    if (e) {
      e.preventDefault();
    }

    // Create query parameters object
    const queryParams = new URLSearchParams();

    if (eventType.trim()) queryParams.append("type", eventType.trim());
    if (venueSize.trim()) queryParams.append("size", venueSize.trim());

    // Navigate with query string
    navigate(`/venues?${queryParams.toString()}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <Header />
      <form className="search-box" onSubmit={handleSearch}>
        {/* EVENT TYPE */}
        <div className="filter-group">
          <label>EVENT TYPE</label>
          <p className="filter-description">What are you planning?</p>
          <div className="select-wrapper">
            <input
              type="text"
              placeholder="e.g., Wedding"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>

        {/* VENUE SIZE */}
        <div className="filter-group">
          <label>VENUE SIZE</label>
          <p className="filter-description">Pick venue size</p>
          <div className="select-wrapper">
            <input
              type="text"
              placeholder="e.g., Large, Small"
              value={venueSize}
              onChange={(e) => setVenueSize(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>

        {/* Hidden submit button for accessibility */}
        <button type="submit" style={{ display: "none" }}>
          Submit
        </button>
      </form>
    </>
  );
}
