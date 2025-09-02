// src/contexts/VenueContext.jsx
import React, { createContext, useContext, useState } from "react";

const VenueContext = createContext();

export function VenueProvider({ children }) {
  const [venues, setVenues] = useState([]);

  //add a new venue
  const addVenue = (venueData) => {
    const newVenue = {
      ...venueData,
      id: Date.now(),
      submittedAt: new Date().toISOString(),
    };
    setVenues((prev) => [...prev, newVenue]);
  };

  //to search venues
  const searchVenues = (filters) => {
    return venues.filter((venue) => {
      const matchesEvent = filters.eventType
        ? venue.venueTypes?.some((type) =>
            type.toLowerCase().includes(filters.eventType.toLowerCase())
          ) || false
        : true;

      const matchesGuests = filters.guests
        ? venue.capacity_standing >= Number(filters.guests) ||
          venue.capacity_dining >= Number(filters.guests) ||
          venue.capacity_theatre >= Number(filters.guests)
        : true;

      const matchesCity = filters.city
        ? venue.city?.toLowerCase().includes(filters.city.toLowerCase()) ||
          false
        : true;

      return matchesEvent && matchesGuests && matchesCity;
    });
  };

  const value = {
    venues,
    addVenue,
    searchVenues,
  };

  return (
    <VenueContext.Provider value={value}>{children}</VenueContext.Provider>
  );
}

export function useVenue() {
  const context = useContext(VenueContext);
  if (!context) {
    throw new Error("useVenue must be used within a VenueProvider");
  }
  return context;
}
