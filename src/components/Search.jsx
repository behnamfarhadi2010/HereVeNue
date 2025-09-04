// src/components/Search.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVenue } from "../contexts/VenueContext";

export default function Search() {
  const [eventType, setEventType] = useState("");
  const [guests, setGuests] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const { searchVenues } = useVenue();

  const handleSearch = (e) => {
    e.preventDefault();

    const filters = {
      eventType: eventType.trim(),
      guests: guests.trim(),
      city: city.trim(),
    };

    // Use context to search venues
    const filteredResults = searchVenues(filters);

    // Navigate to /venues with results
    navigate("/venues", { state: { results: filteredResults } });
  };

  return (
    <form className="search-box" onSubmit={handleSearch}>
      {/* ... your existing JSX remains the same */}
      <div className="filter-group">
        <label>EVENT TYPE</label>
        <p className="filter-description">What are you planning?</p>
        <div className="select-wrapper">
          <input
            type="text"
            placeholder="e.g., Wedding, Conference, Birthday"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          />
        </div>
      </div>

      {/* GUESTS */}
      <div className="filter-group">
        <label>GUESTS</label>
        <p className="filter-description">Number of guests</p>
        <div className="select-wrapper">
          <input
            type="number"
            placeholder="e.g., 100"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
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
            placeholder="e.g., New York, London"
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
