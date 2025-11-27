import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useVenue } from "../contexts/VenueContext";
import "../styles/VenueCarousel.css";

const VenueCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { venues } = useVenue();
  const navigate = useNavigate(); // Add navigate hook

  // Calculate how many slides we need (each slide shows 4 venues)
  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(venues.length / itemsPerSlide);

  const nextSlide = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  }, [totalSlides]);

  const prevSlide = () => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    if (totalSlides <= 1) return;
    setCurrentIndex(index);
  };

  // Handle venue click  ,  redirect to venue details page
  const handleVenueClick = (venueId) => {
    navigate(`/venue/${venueId}`);
  };

  // Handle "Explore Venue" button click
  const handleExploreClick = (venueId, e) => {
    e.stopPropagation(); // Prevent the card click from triggering
    navigate(`/venue/${venueId}`);
  };

  // Auto-advance the carousel only if we have venues
  useEffect(() => {
    if (totalSlides <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, totalSlides, nextSlide]);

  // Get image for venue ,  use floorPlanImages
  const getVenueImage = (venue) => {
    return venue.floorPlanImages?.[0]?.url || "../assets/ovblogo.png";
  };

  if (venues.length === 0) {
    return (
      <div className="venue-carousel-container">
        <div className="no-venues">
          <p>No venues available yet.</p>
          <button
            className="cta-button"
            onClick={() => navigate("/add-listing")}
          >
            Add Your First Venue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="venue-carousel-container">
      <div className="carousel">
        <div
          className="carousel-inner"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="carousel-slide">
              {venues
                .slice(
                  slideIndex * itemsPerSlide,
                  slideIndex * itemsPerSlide + itemsPerSlide
                )
                .map((venue, index) => (
                  <div
                    key={venue.id || index}
                    className="venue-card"
                    onClick={() => handleVenueClick(venue.id)}
                    style={{ cursor: "pointer" }} // Add pointer cursor
                  >
                    <div className="venue-image-container">
                      <img
                        src={getVenueImage(venue)}
                        alt={venue.venueName || "Venue"}
                        className="venue-image"
                        onError={(e) => {
                          e.target.src = "/placeholder-venue.jpg";
                        }}
                      />
                      <div className="venue-overlay">
                        <button
                          className="venue-button"
                          onClick={(e) => handleExploreClick(venue.id, e)}
                        >
                          Explore Venue
                        </button>
                      </div>
                    </div>
                    <div className="venue-content">
                      <h3>{venue.venueName || venue.city || "Venue"}</h3>
                      <div className="venue-details">
                        {venue.city && (
                          <span className="detail-item">{venue.city}</span>
                        )}
                        {venue.venueSize && (
                          <span className="detail-item">
                            Capacity: {venue.venueSize}
                          </span>
                        )}
                        {venue.venueTypes && venue.venueTypes.length > 0 && (
                          <span className="detail-item">
                            {venue.venueTypes.join(", ")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>

        {totalSlides > 1 && (
          <>
            <button className="carousel-control prev" onClick={prevSlide}>
              &#10094;
            </button>
            <button className="carousel-control next" onClick={nextSlide}>
              &#10095;
            </button>

            {/* Indicators */}
            <div className="carousel-indicators">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${
                    index === currentIndex ? "active" : ""
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VenueCarousel;
