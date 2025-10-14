// components/BookingConfirmation.jsx
import React from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { useVenue } from "../contexts/VenueContext";
import Header from "./Header";
import "../styles/BookingConfirmation.css";

const BookingConfirmation = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { venues } = useVenue();

  const { bookingDetails, paymentDetails, venue } = location.state || {};

  // Fallback if no state (user directly navigates to URL)
  const venueData = venue || venues.find((v) => v.id === parseInt(id));

  if (!venueData || !bookingDetails) {
    return (
      <div className="confirmation-container">
        <Header />
        <div className="error-state">
          <h2>Booking information not found</h2>
          <p>Please make a booking to see confirmation details.</p>
          <button onClick={() => navigate("/venues")} className="back-button">
            Browse Venues
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
    }).format(amount);
  };

  return (
    <>
      <Header />
      <div className="confirmation-container">
        <div className="confirmation-content">
          {/* Success Header */}
          <div className="success-header">
            <div className="success-icon">✓</div>
            <h1>Booking Request Sent!</h1>
            <p className="success-message">
              Your booking request has been sent to the venue host. You'll
              receive a confirmation email once they accept your request.
            </p>
          </div>

          <div className="confirmation-layout">
            {/* Left Column - Booking Details */}
            <div className="confirmation-main">
              {/* Booking Summary */}
              <section className="booking-summary">
                <h2>Booking Summary</h2>
                <div className="summary-card">
                  <div className="summary-row">
                    <span className="label">Venue</span>
                    <span className="value">{venueData.venueName}</span>
                  </div>
                  <div className="summary-row">
                    <span className="label">Date</span>
                    <span className="value">
                      {formatDate(bookingDetails.date)}
                    </span>
                  </div>
                  <div className="summary-row">
                    <span className="label">Time</span>
                    <span className="value">
                      {bookingDetails.startTime} - {bookingDetails.endTime}
                    </span>
                  </div>
                  <div className="summary-row">
                    <span className="label">Guests</span>
                    <span className="value">
                      {bookingDetails.guests} people
                    </span>
                  </div>
                  <div className="summary-row">
                    <span className="label">Duration</span>
                    <span className="value">{bookingDetails.hours} hours</span>
                  </div>
                </div>
              </section>

              {/* Payment Information */}
              {paymentDetails && (
                <section className="payment-info">
                  <h2>Payment Information</h2>
                  <div className="payment-card">
                    <div className="payment-row">
                      <span className="label">Payment Method</span>
                      <span className="value">
                        Card ending in {paymentDetails.cardLastFour}
                      </span>
                    </div>
                    <div className="payment-row">
                      <span className="label">Total Amount</span>
                      <span className="value total-amount">
                        {formatCurrency(paymentDetails.total)}
                      </span>
                    </div>
                  </div>
                </section>
              )}

              {/* Next Steps */}
              <section className="next-steps">
                <h2>What Happens Next?</h2>
                <div className="steps-timeline">
                  <div className="step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <strong>Request Sent</strong>
                      <p>
                        Your booking request has been sent to the venue host
                      </p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <strong>Host Review</strong>
                      <p>
                        The host has 24 hours to accept or decline your request
                      </p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <strong>Confirmation</strong>
                      <p>You'll receive an email confirmation once accepted</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column - Venue Info & Actions */}
            <div className="confirmation-sidebar">
              {/* Venue Card */}
              <div className="venue-card">
                <h3>{venueData.venueName}</h3>
                <div className="venue-location">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>
                    {venueData.city}, {venueData.country}
                  </span>
                </div>
                {venueData.contactInfo && (
                  <div className="venue-contact">
                    <i className="fas fa-phone"></i>
                    <span>{venueData.contactInfo}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <Link to="/venues" className="btn btn-primary">
                  Browse More Venues
                </Link>
                <button
                  onClick={() => navigate("/")}
                  className="btn btn-secondary"
                >
                  Back to Home
                </button>
                <button
                  onClick={() => window.print()}
                  className="btn btn-outline"
                >
                  Print Confirmation
                </button>
              </div>

              {/* Support Info */}
              <div className="support-card">
                <h4>Need Help?</h4>
                <p>Our customer support team is here to assist you.</p>
                <div className="contact-info">
                  <p>📞 1-709-VENUES</p>
                  <p>✉️ support@onlinevenuebooking.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingConfirmation;
