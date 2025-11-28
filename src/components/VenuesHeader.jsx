// src/components/VenuesHeader.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/testVenuesearch.css";
// import "../styles/VenuesResultSearch.css";
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

    const filters = {
      venueSize: venueSize.trim(),
      eventType: eventType.trim(),
    };
    console.log("Search filters:", filters);

    const filteredResults = searchVenues(filters);
    console.log("Filtered results from Context:", filteredResults);
    navigate("/venues", { state: { results: filteredResults } });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission behavior
      handleSearch();
    }
  };

  return (
    <>
      <Header />
      <form className="search-box venues-search-box" onSubmit={handleSearch}>
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
