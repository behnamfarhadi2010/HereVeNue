import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVenue } from "../contexts/VenueContext"; // Import context
import "../styles/main.css";

export default function Search() {
  const [eventType, setEventType] = useState("");
  const [venueSize, setVenueSize] = useState("");
  const [venueName, setvenueName] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  // Use the venue context - you can use venues or other values from context
  const { venues, searchVenues } = useVenue();

  const handleSearch = (e) => {
    e.preventDefault();

    // You can use the context values here if needed
    console.log("Total venues in context:", venues.length);

    // Example: Preview search results using searchVenues function
    const filters = {
      eventType: eventType.trim(),
      venueSize: venueSize.trim(),
      venueName: venueName.trim(),
      city: city.trim(),
    };

    const previewResults = searchVenues(filters);
    console.log(
      "Would find",
      previewResults.length,
      "venues with current filters"
    );

    // Create query parameters object
    const queryParams = new URLSearchParams();

    if (eventType.trim()) queryParams.append("type", eventType.trim());
    if (venueSize.trim()) queryParams.append("size", venueSize.trim());
    if (venueName.trim()) queryParams.append("name", venueName.trim());
    if (city.trim()) queryParams.append("city", city.trim());

    // Navigate with query string
    navigate(`/venues?${queryParams.toString()}`);
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

      {/* VENUE NAME */}
      <div className="filter-group">
        <label>NAME</label>
        <p className="filter-description">Venue Name</p>
        <div className="select-wrapper">
          <input
            type="text"
            placeholder="Venue name"
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
            placeholder="e.g., St. John's"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
      </div>

      <button className="search-btn" type="submit">
        Search
      </button>

      {/* Optional: Display venue count from context */}
      <div style={{ marginTop: "10px", fontSize: "0.9rem", color: "#666" }}>
        Browse from {venues.length} available venues
      </div>
    </form>
  );
}
