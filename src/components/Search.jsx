// src/components/Search.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import venues from "../data";
import { useVenue } from "../contexts/VenueContext";

export default function Search() {
  const [eventType, setEventType] = useState("");
  const [venueSize, setVenueSize] = useState("");
  const [guests, setGuests] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const { searchVenues } = useVenue();

  const handleSearch = (e) => {
    e.preventDefault();

    const filters = {
      venueSize: venueSize.trim(),
      eventType: eventType.trim(),
      guests: guests.trim(),
      city: city.trim(),
    };
    console.log("Search filters:", filters);

    const filteredResults = searchVenues(filters);
    console.log("Filtered results from Context:", filteredResults);
    navigate("/venues", { state: { results: filteredResults } });
  };

  //   const filtered = venues.filter((v) => {
  //     const matchesEvent = eventType
  //       ? v.eventType.toLowerCase().includes(eventType.trim().toLowerCase())
  //       : true;
  //     const matchesGuests = guests ? v.guests >= Number(guests) : true;
  //     const matchesCity = city
  //       ? v.city.toLowerCase().includes(city.trim().toLowerCase())
  //       : true;
  //     return matchesEvent && matchesGuests && matchesCity;
  //   });

  //   // Navigate to /venues and pass the results
  //   navigate("/venues", { state: { results: filtered } });
  // };

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
        <label>GUESTS</label>
        <p className="filter-description">Number of guests</p>
        <div className="select-wrapper">
          <input
            type="number"
            id="guests"
            placeholder="e.g., 100"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
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
