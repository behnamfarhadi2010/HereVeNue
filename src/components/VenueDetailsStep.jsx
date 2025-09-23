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

  return (
    <div className="venue-details-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Results
      </button>

      {/* Step 1 Information - Basic Details */}
      <div className="venue-info-section">
        <h1>{venue.venueName || "Unnamed Venue"}</h1>

        {/* Venue Name */}
        <div className="info-group">
          <label>Venue Name</label>
          <div className="info-value">{venue.venueName || "Not specified"}</div>
        </div>

        {/* Venue Size */}
        <div className="info-group">
          <label>Venue Capacity</label>
          <div className="info-value">
            {venue.venueSize ? `${venue.venueSize} guests` : "Not specified"}
          </div>
        </div>

        {/* Venue Types */}
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

        {/* Venue Description */}
        <div className="info-group">
          <label>Venue Description</label>
          <div className="info-value description-text">
            {venue.venueDescription ||
              venue.description ||
              "No description available"}
          </div>
        </div>

        {/* Additional Step 1 Information if available */}
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

      {/* Step 2 Information - Location & Address */}
      <div className="venue-info-section step2-section">
        <h2>Location & Address</h2>

        {/* Country */}
        <div className="info-group">
          <label>Country</label>
          <div className="info-value">{venue.country || "Not specified"}</div>
        </div>

        {/* Street Address */}
        <div className="info-group">
          <label>Street Address</label>
          <div className="info-value">
            {venue.venueAddress || "Not specified"}
          </div>
        </div>

        {/* City and State/Province */}
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

        {/* ZIP/Postal Code */}
        <div className="info-group">
          <label>ZIP/Postal Code</label>
          <div className="info-value">
            {venue.zipCode || venue.postalCode || "Not specified"}
          </div>
        </div>

        {/* Neighborhood/District */}
        <div className="info-group">
          <label>Neighborhood/District</label>
          <div className="info-value">
            {venue.neighborhood || venue.district || "Not specified"}
          </div>
        </div>

        {/* Nearby Landmarks */}
        <div className="info-group">
          <label>Nearby Landmarks</label>
          <div className="info-value description-text">
            {venue.landmarks || "No landmarks information available"}
          </div>
        </div>

        {/* Parking Information */}
        <div className="info-group">
          <label>Parking Information</label>
          <div className="info-value description-text">
            {venue.parkingInfo || "No parking information available"}
          </div>
        </div>

        {/* Public Transportation Access */}
        <div className="info-group">
          <label>Public Transportation Access</label>
          <div className="info-value description-text">
            {venue.publicTransport ||
              "No public transportation information available"}
          </div>
        </div>

        {/* Map Location (if available) */}
        {venue.latitude && venue.longitude && (
          <div className="info-group">
            <label>Location on Map</label>
            <div className="info-value">
              <button
                className="map-button"
                onClick={() => {
                  window.open(
                    `https://maps.google.com/?q=${venue.latitude},${venue.longitude}`,
                    "_blank"
                  );
                }}
              >
                📍 View on Map
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Step 3 Information - Pricing & Packages */}
      <div className="venue-info-section step3-section">
        <h2>Pricing & Packages</h2>

        {/* Pricing Model */}
        <div className="info-group">
          <label>Pricing Model</label>
          <div className="info-value">
            {venue.pricingModel ||
              venue.pricingType ||
              "Contact for pricing information"}
          </div>
        </div>

        {/* Pricing Options */}
        <div className="pricing-options">
          <div className="form-row">
            {/* Starting Price */}
            <div className="info-group half-width">
              <label>Starting Price</label>
              <div className="info-value pricing-amount">
                {venue.startingPrice
                  ? `$${venue.startingPrice}`
                  : "Not specified"}
              </div>
            </div>

            {/* Minimum Spend */}
            <div className="info-group half-width">
              <label>Minimum Spend</label>
              <div className="info-value pricing-amount">
                {venue.minSpend ? `$${venue.minSpend}` : "Not specified"}
              </div>
            </div>
          </div>

          {/* Hourly Rate */}
          <div className="info-group">
            <label>Hourly Rate</label>
            <div className="info-value pricing-amount">
              {venue.hourlyRate ? `$${venue.hourlyRate}/hour` : "Not specified"}
            </div>
          </div>

          {/* Package Options */}
          <div className="info-group">
            <label>Package Options</label>
            <div className="info-value">
              {venue.packageOptions && venue.packageOptions.length > 0 ? (
                <ul className="package-list">
                  {venue.packageOptions.map((pkg, index) => (
                    <li key={index} className="package-item">
                      <strong>{pkg.name}:</strong> ${pkg.price}
                      {pkg.description && ` - ${pkg.description}`}
                    </li>
                  ))}
                </ul>
              ) : (
                "No package options specified"
              )}
            </div>
          </div>

          {/* Additional Fees */}
          <div className="info-group">
            <label>Additional Fees</label>
            <div className="info-value">
              {venue.additionalFees || "No additional fees specified"}
            </div>
          </div>

          {/* Security Deposit */}
          <div className="info-group">
            <label>Security Deposit</label>
            <div className="info-value pricing-amount">
              {venue.securityDeposit
                ? `$${venue.securityDeposit}`
                : "Not required"}
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="info-group">
            <label>Cancellation Policy</label>
            <div className="info-value description-text">
              {venue.cancellationPolicy ||
                "Standard cancellation policy applies"}
            </div>
          </div>

          {/* Payment Terms */}
          <div className="info-group">
            <label>Payment Terms</label>
            <div className="info-value">
              {venue.paymentTerms || "50% deposit required to secure booking"}
            </div>
          </div>

          {/* Included Services */}
          {venue.includedServices && venue.includedServices.length > 0 && (
            <div className="info-group">
              <label>Included Services</label>
              <div className="included-services">
                {venue.includedServices.map((service, index) => (
                  <span key={index} className="service-tag">
                    ✓ {service}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Extra Services */}
          {venue.extraServices && venue.extraServices.length > 0 && (
            <div className="info-group">
              <label>Extra Services (Additional Cost)</label>
              <div className="extra-services">
                {venue.extraServices.map((service, index) => (
                  <span key={index} className="service-tag extra">
                    💰 {service}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;
