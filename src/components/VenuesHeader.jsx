// src/components/Search.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import venues from "../data";
import Header from "../components/Header";
import "../styles/testVenuesearch.css"; // import your CSS styles

export default function Search() {
  const [eventType, setEventType] = useState("");
  const [guests, setGuests] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const filtered = venues.filter((v) => {
      const matchesEvent = eventType
        ? v.eventType.toLowerCase().includes(eventType.trim().toLowerCase())
        : true;
      const matchesGuests = guests ? v.guests >= Number(guests) : true;

      return matchesEvent && matchesGuests;
    });

    // Navigate to /venues and pass the results
    navigate("/venues", { state: { results: filtered } });
  };

  return (
    <>
      <Header />
      <form className="search-box1" onSubmit={handleSearch}>
        {/* EVENT TYPE */}
        <div className="filter-group1">
          <label>EVENT TYPE</label>
          <p className="filter-description1">What are you planning?</p>
          <div className="select-wrapper1">
            <input
              type="text"
              placeholder="e.g., Wedding"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
            />
          </div>
        </div>

        {/* GUESTS */}
        <div className="filter-group1">
          <label>GUESTS</label>
          <p className="filter-description1">Number of guests</p>
          <div className="select-wrapper1">
            <input
              type="number"
              id="guests"
              placeholder="e.g., 100"
              min="1"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
            />
          </div>
        </div>

        {/* LOCATION */}
        {/* <div className="filter-group">
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
      </div> */}

        {/* <button className="search-btn" type="submit">
        Search
      </button> */}
      </form>
    </>
  );
}
