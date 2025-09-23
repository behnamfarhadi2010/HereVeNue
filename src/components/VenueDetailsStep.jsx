import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useVenue } from "../contexts/VenueContext";
import "../styles/VenueDetails.css";

const VenueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { venues } = useVenue();

  // Find the specific venue by ID
  const venue = venues.find((v) => v.id === parseInt(id));

  if (!venue) {
    return (
      <div className="venue-details-container">
        <div className="error">
          <h2>Venue not found</h2>
          <button onClick={() => navigate("/venues")} className="back-button">
            Back to Venues
          </button>
        </div>
      </div>
    );
  }

  // Helper functions and data
  const spaceTypes = [
    "Photo Studio",
    "Restaurant",
    "Event Space",
    "Conference Room",
    "Ballroom",
    "Meeting Room",
    "Banquet Hall",
    "Theater",
    "Classroom",
    "Exhibition Hall",
    "Coworking Space",
    "Studio Apartment",
    "Loft",
    "Warehouse",
    "Gallery",
    "Rooftop",
    "Garden",
    "Terrace",
    "Bar",
    "Nightclub",
  ];

  const venueParts = [
    {
      value: "whole-venue",
      label: "Whole venue",
      description: "The entire venue exclusively for the customer.",
    },
    {
      value: "private-space",
      label: "Private space within the venue",
      description:
        "A space within the venue that is exclusively reserved for a specific group or individual.",
    },
    {
      value: "semi-private",
      label: "Semi-private area within the space",
      description:
        "An area that is partially excluded or separated from the rest of the space, but is not completely private.",
    },
    {
      value: "shared-space",
      label: "Shared space",
      description:
        "A non-exclusive, common area with open access for everyone.",
    },
    {
      value: "private-outdoor",
      label: "Private outdoor space",
      description:
        "An outdoor area that is exclusively reserved for the use of a specific group or individual.",
    },
    {
      value: "semi-private-outdoor",
      label: "Semi-private outdoor space",
      description:
        "An outdoor area that is partially separated from the rest of the space, but is not completely private.",
    },
  ];

  const ageRestrictions = { 18: "18+", 21: "21+", 25: "25+", other: "Other" };
  const enforcementTimes = {
    after6pm: "After 6 PM",
    after8pm: "After 8 PM",
    after10pm: "After 10 PM",
    allDay: "All day",
    other: "Other",
  };

  const layoutOptions = [
    { id: "dining", label: "Dining", icon: "🍽️" },
    { id: "standing", label: "Standing", icon: "🧍" },
    { id: "cabaret", label: "Cabaret", icon: "🎭" },
    { id: "classroom", label: "Classroom", icon: "📚" },
    { id: "theatre", label: "Theatre", icon: "🎬" },
    { id: "uShaped", label: "U-Shaped", icon: "⛎" },
    { id: "boardroom", label: "Boardroom", icon: "💼" },
  ];

  const getVenuePartLabel = (partValue) => {
    const part = venueParts.find((p) => p.value === partValue);
    return part ? part.label : partValue;
  };

  const getVenuePartDescription = (partValue) => {
    const part = venueParts.find((p) => p.value === partValue);
    return part ? part.description : "";
  };

  // Get layout capacities from venue data
  const getLayoutCapacities = () => {
    const capacities = {};
    layoutOptions.forEach((layout) => {
      const capacityKey = `capacity_${layout.id}`;
      capacities[layout.id] = venue[capacityKey] || null;
    });
    return capacities;
  };

  const layoutCapacities = getLayoutCapacities();

  // Check which layouts are available
  const getAvailableLayouts = () => {
    return layoutOptions.filter(
      (layout) => layoutCapacities[layout.id] !== null
    );
  };

  const availableLayouts = getAvailableLayouts();

  return (
    <div className="venue-details-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Results
      </button>

      {/* Step 1: Basic Venue Info */}
      <div className="venue-info-section">
        <h1>{venue.venueName || "Unnamed Venue"}</h1>

        <div className="info-group">
          <label>Venue Name</label>
          <div className="info-value">{venue.venueName || "Not specified"}</div>
        </div>

        <div className="info-group">
          <label>Venue Capacity</label>
          <div className="info-value">
            {venue.venueSize ? `${venue.venueSize} guests` : "Not specified"}
          </div>
        </div>

        <div className="info-group">
          <label>Venue Types</label>
          <div className="venue-types-display">
            {venue.venueTypes && venue.venueTypes.length > 0 ? (
              venue.venueTypes.map((type, index) => (
                <span key={index} className="venue-type-tag">
                  {type}
                </span>
              ))
            ) : (
              <span className="no-info">No venue types specified</span>
            )}
          </div>
        </div>

        <div className="info-group">
          <label>Venue Description</label>
          <div className="info-value description-text">
            {venue.venueDescription ||
              venue.description ||
              "No description available"}
          </div>
        </div>

        {venue.spaceType && (
          <div className="info-group">
            <label>Space Type</label>
            <div className="info-value">{venue.spaceType}</div>
          </div>
        )}

        {venue.eventTypes && venue.eventTypes.length > 0 && (
          <div className="info-group">
            <label>Suitable Event Types</label>
            <div className="venue-types-display">
              {venue.eventTypes.map((type, index) => (
                <span key={index} className="event-type-tag">
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Step 2: Location & Address */}
      <div className="venue-info-section step2-section">
        <h2>Location & Address</h2>

        <div className="info-group">
          <label>Country</label>
          <div className="info-value">{venue.country || "Not specified"}</div>
        </div>

        <div className="info-group">
          <label>Street Address</label>
          <div className="info-value">
            {venue.venueAddress || "Not specified"}
          </div>
        </div>

        <div className="form-row">
          <div className="info-group half-width">
            <label>City</label>
            <div className="info-value">{venue.city || "Not specified"}</div>
          </div>
          <div className="info-group half-width">
            <label>State/Province</label>
            <div className="info-value">
              {venue.state || venue.province || "Not specified"}
            </div>
          </div>
        </div>

        <div className="info-group">
          <label>ZIP/Postal Code</label>
          <div className="info-value">
            {venue.zipCode || venue.postalCode || "Not specified"}
          </div>
        </div>

        <div className="info-group">
          <label>Neighborhood/District</label>
          <div className="info-value">
            {venue.neighborhood || venue.district || "Not specified"}
          </div>
        </div>

        <div className="info-group">
          <label>Nearby Landmarks</label>
          <div className="info-value description-text">
            {venue.landmarks || "No landmarks information available"}
          </div>
        </div>

        <div className="info-group">
          <label>Parking Information</label>
          <div className="info-value description-text">
            {venue.parkingInfo || "No parking information available"}
          </div>
        </div>

        <div className="info-group">
          <label>Public Transportation Access</label>
          <div className="info-value description-text">
            {venue.publicTransport ||
              "No public transportation information available"}
          </div>
        </div>

        {venue.latitude && venue.longitude && (
          <div className="info-group">
            <label>Location on Map</label>
            <div className="info-value">
              <button
                className="map-button"
                onClick={() =>
                  window.open(
                    `https://maps.google.com/?q=${venue.latitude},${venue.longitude}`,
                    "_blank"
                  )
                }
              >
                📍 View on Map
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Step 3: Space Details */}
      <div className="venue-info-section step3-section">
        <h2>Space Details</h2>

        <div className="info-group">
          <label>Space Type</label>
          <div className="info-value">
            {venue.spaceType ? (
              <div className="space-type-display">
                <span className="space-type-badge">{venue.spaceType}</span>
                {spaceTypes.includes(venue.spaceType) && (
                  <span className="space-type-verified">✓ Verified type</span>
                )}
              </div>
            ) : (
              "Not specified"
            )}
          </div>
        </div>

        <div className="info-group">
          <label>Venue Accessibility</label>
          <div className="info-value">
            {venue.venuePart ? (
              <div className="venue-part-display">
                <strong>{getVenuePartLabel(venue.venuePart)}</strong>
                <p className="venue-part-description">
                  {getVenuePartDescription(venue.venuePart)}
                </p>
              </div>
            ) : (
              "Not specified"
            )}
          </div>
        </div>

        {(venue.outdoorSpace || venue.hasWindows || venue.naturalLight) && (
          <div className="info-group">
            <label>Space Features</label>
            <div className="features-list">
              {venue.outdoorSpace && (
                <span className="feature-tag">🌳 Outdoor Space</span>
              )}
              {venue.hasWindows && (
                <span className="feature-tag">🪟 Windows</span>
              )}
              {venue.naturalLight && (
                <span className="feature-tag">☀️ Natural Light</span>
              )}
              {venue.airConditioning && (
                <span className="feature-tag">❄️ Air Conditioning</span>
              )}
              {venue.heating && <span className="feature-tag">🔥 Heating</span>}
            </div>
          </div>
        )}

        {(venue.spaceLength || venue.spaceWidth || venue.ceilingHeight) && (
          <div className="info-group">
            <label>Space Dimensions</label>
            <div className="dimensions-grid">
              {venue.spaceLength && (
                <div className="dimension-item">
                  <span>Length:</span>
                  <strong>{venue.spaceLength}m</strong>
                </div>
              )}
              {venue.spaceWidth && (
                <div className="dimension-item">
                  <span>Width:</span>
                  <strong>{venue.spaceWidth}m</strong>
                </div>
              )}
              {venue.ceilingHeight && (
                <div className="dimension-item">
                  <span>Ceiling Height:</span>
                  <strong>{venue.ceilingHeight}m</strong>
                </div>
              )}
              {venue.totalArea && (
                <div className="dimension-item">
                  <span>Total Area:</span>
                  <strong>{venue.totalArea} sqm</strong>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Step 4: Venue Amenities & Policies */}
      <div className="venue-info-section step4-section">
        <h2>Venue Amenities & Policies</h2>

        {/* Parking Options */}
        <div className="info-group">
          <label>Parking Options</label>
          <div className="amenities-list">
            {venue.freeParkingOnPremises && (
              <div className="amenity-item">
                <span className="amenity-icon">🅿️</span>
                <div>
                  <strong>Free parking on premises</strong>
                  {venue.freeParkingSpaces && (
                    <span className="amenity-detail">
                      {" "}
                      - {venue.freeParkingSpaces} spaces available
                    </span>
                  )}
                </div>
              </div>
            )}
            {venue.freeStreetParking && (
              <div className="amenity-item">
                <span className="amenity-icon">🚗</span>
                <strong>Free street parking available</strong>
              </div>
            )}
            {venue.paidParkingOnPremises && (
              <div className="amenity-item">
                <span className="amenity-icon">💰</span>
                <div>
                  <strong>Paid parking on premises</strong>
                  {venue.paidParkingSpaces && (
                    <span className="amenity-detail">
                      {" "}
                      - {venue.paidParkingSpaces} spaces available
                    </span>
                  )}
                </div>
              </div>
            )}
            {venue.paidParkingOffPremises && (
              <div className="amenity-item">
                <span className="amenity-icon">🏢</span>
                <strong>Paid parking off premises available</strong>
              </div>
            )}
            {!venue.freeParkingOnPremises &&
              !venue.freeStreetParking &&
              !venue.paidParkingOnPremises &&
              !venue.paidParkingOffPremises && (
                <span className="no-info">
                  No parking information available
                </span>
              )}
          </div>
        </div>

        {/* Accommodation */}
        <div className="info-group">
          <label>Accommodation</label>
          <div className="amenities-list">
            {venue.accommodationAvailable ? (
              <div className="amenity-item">
                <span className="amenity-icon">🏨</span>
                <div>
                  <strong>Accommodation available on-site</strong>
                  {venue.accommodationRooms && (
                    <span className="amenity-detail">
                      {" "}
                      - {venue.accommodationRooms} rooms available
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <span className="no-info">No on-site accommodation</span>
            )}
          </div>
        </div>

        {/* Event Registration */}
        <div className="info-group">
          <label>Event Registration</label>
          <div className="amenities-list">
            {venue.allowedEvents ? (
              <div className="amenity-item">
                <span className="amenity-icon">🎫</span>
                <div>
                  <strong>
                    Registration for personnel and ticketed events allowed
                  </strong>
                  <p className="amenity-description">
                    This venue can publicly advertise events and set tickets for
                    registered personnel events.
                  </p>
                </div>
              </div>
            ) : (
              <span className="no-info">Ticketed events not specified</span>
            )}
          </div>
        </div>

        {/* Age Policy */}
        <div className="info-group">
          <label>Age Policy</label>
          <div className="amenities-list">
            {venue.ageRestrictions ? (
              <div className="amenity-item">
                <span className="amenity-icon">🔞</span>
                <div>
                  <strong>Age restrictions apply</strong>
                  <div className="age-policy-details">
                    {venue.minAgeRequirement && (
                      <div className="policy-detail">
                        <span>Minimum age: </span>
                        <strong>
                          {ageRestrictions[venue.minAgeRequirement] ||
                            venue.minAgeRequirement}
                        </strong>
                      </div>
                    )}
                    {venue.enforcementTime && (
                      <div className="policy-detail">
                        <span>Enforcement: </span>
                        <strong>
                          {enforcementTimes[venue.enforcementTime] ||
                            venue.enforcementTime}
                        </strong>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <span className="no-info">No age restrictions specified</span>
            )}
          </div>
        </div>
      </div>

      {/* Step 5: Capacity and Layouts */}
      <div className="venue-info-section step5-section">
        <h2>Capacity and Layouts</h2>

        {/* Available Layouts */}
        <div className="info-group">
          <label>Available Layouts</label>
          <div className="layouts-container">
            {availableLayouts.length > 0 ? (
              <div className="layouts-grid">
                {availableLayouts.map((layout) => (
                  <div key={layout.id} className="layout-card">
                    <div className="layout-header">
                      <span className="layout-icon">{layout.icon}</span>
                      <span className="layout-label">{layout.label}</span>
                    </div>
                    <div className="layout-capacity">
                      <strong>{layoutCapacities[layout.id]}</strong>
                      <span>guests</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <span className="no-info">No specific layouts configured</span>
            )}
          </div>
        </div>

        {/* Minimum Attendees */}
        <div className="info-group">
          <label>Minimum Attendees</label>
          <div className="info-value">
            {venue.minAttendees ? (
              <div className="minimum-attendees">
                <span className="attendees-number">{venue.minAttendees}</span>
                <span className="attendees-label">
                  minimum attendees per event
                </span>
              </div>
            ) : (
              <span className="no-info">No minimum attendee requirement</span>
            )}
          </div>
        </div>

        {/* Floor Plans */}
        <div className="info-group">
          <label>Floor Plans</label>
          <div className="floor-plans-container">
            {venue.floorPlanImages && venue.floorPlanImages.length > 0 ? (
              <div className="floor-plans-grid">
                {venue.floorPlanImages.map((image, index) => (
                  <div key={index} className="floor-plan-item">
                    <img
                      src={image.url}
                      alt={`Floor plan ${index + 1}`}
                      className="floor-plan-image"
                    />
                    <span className="floor-plan-name">
                      {image.name || `Floor Plan ${index + 1}`}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <span className="no-info">No floor plans available</span>
            )}
          </div>
        </div>

        {/* Overall Capacity Summary */}
        <div className="info-group">
          <label>Capacity Summary</label>
          <div className="capacity-summary">
            <div className="summary-item">
              <span className="summary-label">Maximum Capacity:</span>
              <span className="summary-value">
                {venue.venueSize || "Not specified"} guests
              </span>
            </div>
            {venue.minAttendees && (
              <div className="summary-item">
                <span className="summary-label">Minimum per Event:</span>
                <span className="summary-value">
                  {venue.minAttendees} guests
                </span>
              </div>
            )}
            <div className="summary-item">
              <span className="summary-label">Available Layouts:</span>
              <span className="summary-value">
                {availableLayouts.length} configurations
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;
