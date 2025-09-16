import React, { useState, useEffect, useContext } from "react";
import { useVenue } from "../contexts/VenueContext";

const VenueCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { venues } = useVenue(); // Access venues from context

  const nextSlide = () => {
    if (venues.length === 0) return; // Prevent errors if no venues
    setCurrentIndex((prevIndex) =>
      prevIndex === venues.length - 1 ? 0 : prevIndex + 1
    );
  };
};

const prevSlide = () => {
  if (venues.length === 0) return; // Prevent errors if no venues
  setCurrentIndex((prevIndex) =>
    prevIndex === 0 ? venues.length - 1 : prevIndex - 1
  );
};

export const carouselImage = () => {
  return <div>carouselImage</div>;
};
