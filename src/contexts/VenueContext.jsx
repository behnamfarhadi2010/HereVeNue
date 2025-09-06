// src/contexts/VenueContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const VenueContext = createContext();

export function VenueProvider({ children }) {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    // Load all venues from localStorage
    const savedVenues = localStorage.getItem("venueSubmissions");
    if (savedVenues) {
      setVenues(JSON.parse(savedVenues));
    }
  }, []);
  //add a new venue
  const addVenue = (venueData) => {
    const newVenue = {
      ...venueData,
      id: Date.now(),
      submittedAt: new Date().toISOString(),
    };
    setVenues((prev) => [...prev, newVenue]);

    localStorage.setItem("venueFormData", JSON.stringify(venueData));
    localStorage.setItem(
      "venueSubmission",
      JSON.stringify({
        ...venueData,
        submittedAt: new Date().toISOString(),
        status: "submitted",
      })
    );
  };

  const deleteVenue = (venueId) => {
    if (window.confirm("Are you sure you want to delete this venue?")) {
      const updatedVenues = venues.filter((venue) => venue.id !== venueId);
      setVenues(updatedVenues);
      localStorage.setItem("venueSubmissions", JSON.stringify(updatedVenues));
    }
  };
  //to search venues
  const searchVenues = (filters) => {
    // const venues = getVenues();
    console.log("All venues from storage:", venues);

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

      const matchesSize = filters.venueSize
        ? venue.venueSize
            ?.toLowerCase()
            .includes(filters.venueSize.toLowerCase())
        : true;
      return matchesEvent && matchesGuests && matchesCity && matchesSize;
    });
  };

  const value = {
    venues,
    addVenue,
    deleteVenue,
    searchVenues,
  };
  console.log("VenueContext venues:", venues);

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
