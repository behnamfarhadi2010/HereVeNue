import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useVenue } from "../contexts/VenueContext";
import "../styles/VenueDetails.css";
import Header from "./Header";
import BookingSidebar from "../components/BookingSidebar.jsx";

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

  // Format currency function
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "Not specified";
    const numericAmount =
      typeof amount === "string" ? amount.replace(/[^\d.-]/g, "") : amount;
    const numberValue = parseFloat(numericAmount);
    if (isNaN(numberValue)) return "Invalid amount";
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
    }).format(numberValue);
  };

  return (
    <>
      <Header />
      <div className="venue-details-container">
        {/* Back Button */}
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back to Results
        </button>

        <div className="venue-details-layout">
          {/* Left side - All venue info sections */}
          <div className="venue-info-sections">
            {/* Step 1: Basic Venue Info */}
            <div className="venue-info-section">
              <h1>{venue.venueName || "Unnamed Venue"}</h1>

              <div className="info-group">
                <label>Venue Name</label>
                <div className="info-value">
                  {venue.venueName || "Not specified"}
                </div>
              </div>

              <div className="info-group">
                <label>Venue Capacity</label>
                <div className="info-value">
                  {venue.venueSize
                    ? `${venue.venueSize} guests`
                    : "Not specified"}
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
                <div className="info-value">
                  {venue.country || "Not specified"}
                </div>
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
                  <div className="info-value">
                    {venue.city || "Not specified"}
                  </div>
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
                      <span className="space-type-badge">
                        {venue.spaceType}
                      </span>
                      {spaceTypes.includes(venue.spaceType) && (
                        <span className="space-type-verified">
                          ✓ Verified type
                        </span>
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

              {(venue.outdoorSpace ||
                venue.hasWindows ||
                venue.naturalLight) && (
                <div className="info-group">
                  <label>Space Features</label>
                  <div className="space-features-list">
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
                    {venue.heating && (
                      <span className="feature-tag">🔥 Heating</span>
                    )}
                  </div>
                </div>
              )}

              {(venue.spaceLength ||
                venue.spaceWidth ||
                venue.ceilingHeight) && (
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
                          This venue can publicly advertise events and set
                          tickets for registered personnel events.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <span className="no-info">
                      Ticketed events not specified
                    </span>
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
                    <span className="no-info">
                      No age restrictions specified
                    </span>
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
                    <span className="no-info">
                      No specific layouts configured
                    </span>
                  )}
                </div>
              </div>

              {/* Minimum Attendees */}
              <div className="info-group">
                <label>Minimum Attendees</label>
                <div className="info-value">
                  {venue.minAttendees ? (
                    <div className="minimum-attendees">
                      <span className="attendees-number">
                        {venue.minAttendees}
                      </span>
                      <span className="attendees-label">
                        minimum attendees per event
                      </span>
                    </div>
                  ) : (
                    <span className="no-info">
                      No minimum attendee requirement
                    </span>
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

            {/* Step 6: Features & Amenities */}
            <div className="venue-info-section step6-section">
              <h2>Features & Amenities</h2>

              {/* Licenses */}
              <div className="info-group">
                <label>Licenses</label>
                <div className="amenities-list">
                  {venue.weddingLicense ? (
                    <div className="amenity-item">
                      <span className="amenity-icon">📜</span>
                      <div>
                        <strong>Wedding License</strong>
                        <p className="amenity-description">
                          A civil marriage / permission can be performed by a
                          recognized affiliate or religious body at your venue.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <span className="no-info">
                      No special licenses specified
                    </span>
                  )}
                </div>
              </div>

              {/* Facilities */}
              <div className="info-group">
                <label>Available Facilities</label>
                <div className="facilities-container">
                  {Object.entries(venue).some(
                    ([key, value]) => key.startsWith("facility_") && value
                  ) ? (
                    <div className="facilities-grid">
                      {venue.facility_Wi_Fi && (
                        <span className="facility-tag">📶 Wi-Fi</span>
                      )}
                      {venue.facility_Projector && (
                        <span className="facility-tag">📽️ Projector</span>
                      )}
                      {venue.facility_Flatscreen_TV && (
                        <span className="facility-tag">📺 Flatscreen TV</span>
                      )}
                      {venue.facility_Whiteboard && (
                        <span className="facility-tag">📋 Whiteboard</span>
                      )}
                      {venue.facility_Flipchart && (
                        <span className="facility-tag">📊 Flipchart</span>
                      )}
                      {venue.facility_PA_system_speakers && (
                        <span className="facility-tag">
                          🔊 PA system / speakers
                        </span>
                      )}
                      {venue.facility_Conference_call_facilities && (
                        <span className="facility-tag">
                          📞 Conference call facilities
                        </span>
                      )}
                      {venue.facility_Air_conditioning && (
                        <span className="facility-tag">
                          ❄️ Air conditioning
                        </span>
                      )}
                      {venue.facility_Natural_light && (
                        <span className="facility-tag">☀️ Natural light</span>
                      )}
                      {venue.facility_Storage_space && (
                        <span className="facility-tag">📦 Storage space</span>
                      )}
                      {venue.facility_Quiet_space && (
                        <span className="facility-tag">🤫 Quiet space</span>
                      )}
                    </div>
                  ) : (
                    <span className="no-info">
                      No standard facilities specified
                    </span>
                  )}
                </div>
              </div>

              {/* Custom Facilities */}
              {venue.customFacilities && venue.customFacilities.length > 0 && (
                <div className="info-group">
                  <label>Custom Facilities</label>
                  <div className="custom-facilities-list">
                    {venue.customFacilities.map((facility, index) => (
                      <div key={index} className="custom-facility-item">
                        <span className="facility-icon">⭐</span>
                        <span>{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Music & Sound */}
              <div className="info-group">
                <label>Music & Sound Options</label>
                <div className="music-options">
                  {venue.playOwnMusic ||
                  venue.bringOwnDJ ||
                  venue.noiseRestrictions ? (
                    <div className="options-list">
                      {venue.playOwnMusic && (
                        <div className="music-option">
                          <span className="option-icon">🎵</span>
                          <div>
                            <strong>Clients can play their own music</strong>
                            <p className="option-description">
                              Customers can connect their devices to the
                              in-house speakers.
                            </p>
                          </div>
                        </div>
                      )}
                      {venue.bringOwnDJ && (
                        <div className="music-option">
                          <span className="option-icon">🎧</span>
                          <div>
                            <strong>Clients can bring their own DJ</strong>
                            <p className="option-description">
                              Customers can invite their own DJ with equipment.
                            </p>
                          </div>
                        </div>
                      )}
                      {venue.noiseRestrictions && (
                        <div className="music-option">
                          <span className="option-icon">🔇</span>
                          <div>
                            <strong>Space has noise restrictions</strong>
                            <p className="option-description">
                              Loud noise permitted until designated hours.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="no-info">
                      No music and sound options specified
                    </span>
                  )}
                </div>
              </div>

              {/* Accessibility */}
              <div className="info-group">
                <label>Accessibility Features</label>
                <div className="accessibility-container">
                  {/* Space Accessibility */}
                  <div className="accessibility-section">
                    <h4>Space Accessibility</h4>
                    <div className="accessibility-features">
                      {venue.wheelchairAccessible ||
                      venue.accessibleToilet ||
                      venue.stepFreeEntrance ? (
                        <div className="features-list">
                          {venue.wheelchairAccessible && (
                            <div className="accessibility-feature">
                              <span className="feature-icon">♿</span>
                              <div>
                                <strong>Wheelchair accessible</strong>
                                <p className="feature-description">
                                  The entrance and path is wide enough for a
                                  wheelchair user, the access is accessible
                                  without steps or with a lift if steps are
                                  present.
                                </p>
                              </div>
                            </div>
                          )}
                          {venue.accessibleToilet && (
                            <div className="accessibility-feature">
                              <span className="feature-icon">🚽</span>
                              <div>
                                <strong>Accessible toilet</strong>
                                <p className="feature-description">
                                  There is an accessible toilet facility within
                                  the space.
                                </p>
                              </div>
                            </div>
                          )}
                          {venue.stepFreeEntrance && (
                            <div className="accessibility-feature">
                              <span className="feature-icon">🚶</span>
                              <div>
                                <strong>Step-free guest entrance</strong>
                                <p className="feature-description">
                                  The guest entrance is free of steps and
                                  barriers and the space is on street level.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="no-info">
                          No space accessibility features specified
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Venue Accessibility */}
                  <div className="accessibility-section">
                    <h4>Venue Accessibility</h4>
                    <div className="accessibility-features">
                      {venue.accessibleParking ||
                      venue.liftAllFloors ||
                      venue.cargolift ? (
                        <div className="features-list">
                          {venue.accessibleParking && (
                            <div className="accessibility-feature">
                              <span className="feature-icon">🅿️</span>
                              <div>
                                <strong>Accessible parking spot</strong>
                                <p className="feature-description">
                                  There is a private parking spot at least 11
                                  feet wide or designated public parking for
                                  disabilities.
                                </p>
                              </div>
                            </div>
                          )}
                          {venue.liftAllFloors && (
                            <div className="accessibility-feature">
                              <span className="feature-icon">🛗</span>
                              <div>
                                <strong>Lift to all floors</strong>
                                <p className="feature-description">
                                  If this venue is multi-leveled, there is a
                                  lift that serves all floors.
                                </p>
                              </div>
                            </div>
                          )}
                          {venue.cargolift && (
                            <div className="accessibility-feature">
                              <span className="feature-icon">📦</span>
                              <div>
                                <strong>Cargo lift</strong>
                                <p className="feature-description">
                                  This venue is multi-leveled, there is a cargo
                                  lift to facilitate transportation of goods
                                  between floors.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="no-info">
                          No venue accessibility features specified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 7: Pricing & Opening Hours */}
            <div className="venue-info-section step7-section">
              <h2>Pricing & Opening Hours</h2>

              {/* Pricing Option */}
              <div className="info-group">
                <label>Pricing Model</label>
                <div className="pricing-model">
                  {venue.pricingOption ? (
                    <div className="pricing-option-display">
                      {venue.pricingOption === "hireFee" && (
                        <div className="pricing-option-card selected">
                          <span className="pricing-icon">💰</span>
                          <div>
                            <strong>Hire fee only</strong>
                            <p className="pricing-description">
                              We charge based on hire fee per hour or per day.
                            </p>
                          </div>
                        </div>
                      )}
                      {venue.pricingOption === "customPricing" && (
                        <div className="pricing-option-card selected">
                          <span className="pricing-icon">⚡</span>
                          <div>
                            <strong>Custom pricing</strong>
                            <p className="pricing-description">
                              We charge based on minimum spend, price per person
                              or hire fee.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="no-info">No pricing model specified</span>
                  )}
                </div>
              </div>

              {/* Opening Hours */}
              <div className="info-group">
                <label>Opening Hours</label>
                <div className="opening-hours-container">
                  {[
                    "monday",
                    "tuesday",
                    "wednesday",
                    "thursday",
                    "friday",
                    "saturday",
                    "sunday",
                  ].some(
                    (day) => venue[day] && venue[day].status === "open"
                  ) ? (
                    <div className="opening-hours-table">
                      {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ].map((day) => {
                        const dayData = venue[day.toLowerCase()] || {
                          status: "closed",
                        };
                        const hourlyRates =
                          venue[`${day.toLowerCase()}HourlyRates`] || [];

                        return (
                          <div key={day} className="day-row">
                            <div className="day-header">
                              <span className="day-name">{day}</span>
                              <span className={`day-status ${dayData.status}`}>
                                {dayData.status === "open"
                                  ? "🟢 Open"
                                  : "🔴 Closed"}
                              </span>
                            </div>

                            {dayData.status === "open" && (
                              <div className="day-details">
                                {/* Hourly Rates */}
                                {hourlyRates.length > 0 && (
                                  <div className="hourly-rates-section">
                                    <strong>Hourly Rates:</strong>
                                    <div className="rates-list">
                                      {hourlyRates.map((rate, index) => (
                                        <div key={index} className="rate-item">
                                          <span className="rate-price">
                                            {rate.price
                                              ? formatCurrency(rate.price)
                                              : "Not specified"}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Full Day Rate */}
                                {dayData.fullDayRate && (
                                  <div className="full-day-rate-section">
                                    <strong>Full Day Rate:</strong>
                                    <div className="rate-item">
                                      <span className="rate-price">
                                        {formatCurrency(dayData.fullDayRate)}
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <span className="no-info">No opening hours specified</span>
                  )}
                </div>
              </div>

              {/* Additional Charges */}
              {(venue.cleaningFee ||
                venue.securityDeposit ||
                venue.serviceFee ||
                venue.hourlyRate ||
                venue.dailyRate) && (
                <div className="info-group">
                  <label>Additional Charges</label>
                  <div className="additional-charges-grid">
                    {venue.cleaningFee && (
                      <div className="charge-item">
                        <span className="charge-label">Cleaning Fee:</span>
                        <span className="charge-value">
                          {formatCurrency(venue.cleaningFee)}
                        </span>
                      </div>
                    )}
                    {venue.securityDeposit && (
                      <div className="charge-item">
                        <span className="charge-label">Security Deposit:</span>
                        <span className="charge-value">
                          {formatCurrency(venue.securityDeposit)}
                        </span>
                      </div>
                    )}
                    {venue.serviceFee && (
                      <div className="charge-item">
                        <span className="charge-label">Service Fee:</span>
                        <span className="charge-value">
                          {formatCurrency(venue.serviceFee)}
                        </span>
                      </div>
                    )}
                    {venue.hourlyRate && (
                      <div className="charge-item">
                        <span className="charge-label">Base Hourly Rate:</span>
                        <span className="charge-value">
                          {formatCurrency(venue.hourlyRate)}
                        </span>
                      </div>
                    )}
                    {venue.dailyRate && (
                      <div className="charge-item">
                        <span className="charge-label">Base Daily Rate:</span>
                        <span className="charge-value">
                          {formatCurrency(venue.dailyRate)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Minimum Booking Requirements */}
              {(venue.minBookingHours || venue.minBookingNotice) && (
                <div className="info-group">
                  <label>Minimum Booking Requirements</label>
                  <div className="booking-requirements-grid">
                    {venue.minBookingHours && (
                      <div className="requirement-item">
                        <span className="requirement-label">
                          Minimum Hours:
                        </span>
                        <span className="requirement-value">
                          {venue.minBookingHours} hours
                        </span>
                      </div>
                    )}
                    {venue.minBookingNotice && (
                      <div className="requirement-item">
                        <span className="requirement-label">
                          Advance Notice:
                        </span>
                        <span className="requirement-value">
                          {venue.minBookingNotice} days
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Pricing Details */}
              {venue.pricingComment && (
                <div className="info-group">
                  <label>Pricing Details</label>
                  <div className="pricing-comment">
                    <p className="description-text">{venue.pricingComment}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Step 8: Rules & Cancellations */}
            <div className="venue-info-section step8-section">
              <h2>Rules & Cancellations</h2>

              {/* Rules Section */}
              <div className="info-group">
                <label>Rules of the Space</label>
                <div className="rules-container">
                  {venue.rules ? (
                    <div className="rules-content">
                      <div className="rules-text">
                        <p className="description-text">{venue.rules}</p>
                      </div>
                    </div>
                  ) : (
                    <span className="no-info">No rules specified</span>
                  )}
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className="info-group">
                <label>Cancellation Policy</label>
                <div className="cancellation-policy-container">
                  {venue.cancellationPolicy ? (
                    <div className="policy-display">
                      {venue.cancellationPolicy === "veryFlexible" && (
                        <div className="policy-card">
                          <span className="policy-icon">🔄</span>
                          <div>
                            <strong>Very Flexible</strong>
                            <p className="policy-description">
                              Cancellations up to 24 hours from event start time
                              will receive a full refund. Cancellations for
                              events starting within 24 hours are
                              non-refundable.
                            </p>
                          </div>
                        </div>
                      )}
                      {venue.cancellationPolicy === "flexible" && (
                        <div className="policy-card">
                          <span className="policy-icon">📅</span>
                          <div>
                            <strong>Flexible</strong>
                            <p className="policy-description">
                              Cancellations 7 days in advance will receive a
                              full refund. Cancellations 7 days to 24 hours in
                              advance will receive a 50% refund. Cancellations
                              for events starting within 24 hours are
                              non-refundable.
                            </p>
                          </div>
                        </div>
                      )}
                      {venue.cancellationPolicy === "standard30" && (
                        <div className="policy-card">
                          <span className="policy-icon">📋</span>
                          <div>
                            <strong>Standard 30 Day</strong>
                            <p className="policy-description">
                              Cancellations 30 days in advance will receive a
                              full refund. Cancellations 30 days to 7 days in
                              advance will receive a 50% refund. Cancellations
                              for events starting within 7 days are
                              non-refundable.
                            </p>
                          </div>
                        </div>
                      )}
                      {venue.cancellationPolicy === "standard60" && (
                        <div className="policy-card">
                          <span className="policy-icon">📊</span>
                          <div>
                            <strong>Standard 60 Day</strong>
                            <p className="policy-description">
                              Cancellations 60 days in advance will receive a
                              full refund. Cancellations 60 days to 30 days in
                              advance will receive a 50% refund. Cancellations
                              for events starting within 30 days are
                              non-refundable.
                            </p>
                          </div>
                        </div>
                      )}
                      {venue.cancellationPolicy === "custom" && (
                        <div className="policy-card">
                          <span className="policy-icon">⚡</span>
                          <div>
                            <strong>Custom Policy</strong>
                            <p className="policy-description">
                              Custom cancellation policy with specific notice
                              periods.
                            </p>
                            {(venue.customPolicy_atLeast ||
                              venue.customPolicy_lessThan) && (
                              <div className="custom-policy-details">
                                {venue.customPolicy_atLeast && (
                                  <div className="policy-detail">
                                    <span>At least:</span>
                                    <strong>
                                      {venue.customPolicy_atLeast} days prior
                                    </strong>
                                  </div>
                                )}
                                {venue.customPolicy_lessThan && (
                                  <div className="policy-detail">
                                    <span>Less than:</span>
                                    <strong>
                                      {venue.customPolicy_lessThan} days prior
                                    </strong>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {venue.cancellationPolicy === "other" && (
                        <div className="policy-card">
                          <span className="policy-icon">❓</span>
                          <div>
                            <strong>Other</strong>
                            <p className="policy-description">
                              None of the standard cancellation policies can be
                              applied to this venue.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="no-info">
                      No cancellation policy specified
                    </span>
                  )}
                </div>
              </div>

              {/* Rescheduling Policy */}
              <div className="info-group">
                <label>Rescheduling Policy</label>
                <div className="rescheduling-policy">
                  {venue.allowRescheduling ? (
                    <div className="rescheduling-enabled">
                      <span className="rescheduling-icon">✅</span>
                      <div>
                        <strong>Rescheduling Allowed</strong>
                        <p className="rescheduling-description">
                          Guests may move the event date of a confirmed booking
                          to another date within{" "}
                          <strong>
                            {venue.rescheduleMonths || "3"} months
                          </strong>{" "}
                          from the original date, at no cost.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="rescheduling-disabled">
                      <span className="rescheduling-icon">❌</span>
                      <div>
                        <strong>Rescheduling Not Allowed</strong>
                        <p className="rescheduling-description">
                          Date changes are not permitted for confirmed bookings.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submission Information */}
              {(venue.submittedAt || venue.status) && (
                <div className="info-group">
                  <label>Submission Information</label>
                  <div className="submission-details">
                    {venue.submittedAt && (
                      <div className="submission-item">
                        <span className="submission-label">Submitted:</span>
                        <span className="submission-value">
                          {new Date(venue.submittedAt).toLocaleDateString()} at{" "}
                          {new Date(venue.submittedAt).toLocaleTimeString()}
                        </span>
                      </div>
                    )}
                    {venue.status && (
                      <div className="submission-item">
                        <span className="submission-label">Status:</span>
                        <span className={`status-badge ${venue.status}`}>
                          {venue.status.charAt(0).toUpperCase() +
                            venue.status.slice(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right side - Booking Sidebar */}
          <BookingSidebar venue={venue} />
        </div>
      </div>
    </>
  );
};

export default VenueDetails;
