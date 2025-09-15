// src/components/Search.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import venues from "../data";
import { useVenue } from "../contexts/VenueContext";
import "../styles/main.css";

export default function Search() {
  const [eventType, setEventType] = useState("");
  const [venueSize, setVenueSize] = useState("");
  const [venueName, setvenueName] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const { searchVenues } = useVenue();

  const handleSearch = (e) => {
    e.preventDefault();

    const filters = {
      venueSize: venueSize.trim(),
      eventType: eventType.trim(),
      venueName: venueName.trim(),
      city: city.trim(),
    };
    console.log("Search filters:", filters);

    const filteredResults = searchVenues(filters);
    console.log("Filtered results from Context:", filteredResults);
    navigate("/venues", { state: { results: filteredResults } });
  };

  return (
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
          />
        </div>
      </div>

      {/* GUESTS */}
      <div className="filter-group">
        <label> Name </label>
        <p className="filter-description"> Venue Name</p>
        <div className="select-wrapper">
          <input
            type="text"
            id="guests"
            placeholder="Venue name"
            min="1"
            value={venueName}
            onChange={(e) => setvenueName(e.target.value)}
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
          />
        </div>
      </div>

      {/* LOCATION */}
      <div className="filter-group">
        <label>LOCATION</label>
        <p className="filter-description">Choose City</p>
        <div className="select-wrapper">
          <input
            type="text"
            id="location"
            placeholder="e.g., St. John's"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
      </div>

      <button className="search-btn" type="submit">
        Search
      </button>
    </form>
  );
}
