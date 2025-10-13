// components/PaymentPage.jsx
import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useVenue } from "../contexts/VenueContext";
import Header from "./Header";
import "../styles/PaymentPage.css";

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { venues } = useVenue();

  // Get booking details from location state or calculate defaults
  const bookingDetails = location.state?.bookingDetails || {
    date: new Date().toISOString().split("T")[0],
    startTime: "09:00",
    endTime: "11:00",
    guests: 44,
    hours: 2,
  };

  const venue = venues.find((v) => v.id === parseInt(id));

  // State for payment form
  //   const [paymentMethod, setPaymentMethod] = useState("googlePay");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  //   const [cvv, setCvv] = useState("");
  const [country, setCountry] = useState("Canada");
  const [postalCode, setPostalCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!venue) {
    return (
      <div className="payment-container">
        <Header />
        <div className="error">
          <h2>Venue not found</h2>
          <button onClick={() => navigate("/venues")} className="back-button">
            Back to Venues
          </button>
        </div>
      </div>
    );
  }

  // Calculate pricing based on venue data and booking details
  const calculatePricing = () => {
    const hourlyRate = venue.hourlyRate || venue.dailyRate / 8 || 105; // Fallback to $105 if no rate
    const basePrice = hourlyRate * bookingDetails.hours;
    const cleaningFee = venue.cleaningFee || 55;
    const serviceFee = venue.serviceFee || 0;
    const taxRate = 0.13; // 13% tax
    const subtotal = basePrice + cleaningFee + serviceFee;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    return {
      hourlyRate,
      basePrice,
      cleaningFee,
      serviceFee,
      tax,
      total,
      hours: bookingDetails.hours,
    };
  };

  const pricing = calculatePricing();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Navigate to confirmation page
      navigate(`/booking-confirmation/${venue.id}`, {
        state: {
          bookingDetails,
          paymentDetails: {
            cardLastFour: cardNumber.slice(-4),
            total: pricing.total,
          },
          venue,
        },
      });
    } catch (error) {
      console.error("Payment failed:", error);
      setIsProcessing(false);
    }
  };

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
      <div className="payment-container">
        {/* Back Button */}
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back to Venue Details
        </button>

        <div className="payment-content">
          <div className="payment-header">
            <h1>Request to Book</h1>
          </div>

          <div className="payment-layout">
            {/* Left Column - Event Details & Payment Form */}
            <div className="payment-main">
              {/* Event Details Section */}
              <section className="event-section">
                <h2>Your event</h2>
                <div className="event-details-card">
                  <div className="event-row">
                    <span className="label">Event type</span>
                    <span className="value">Event Space</span>
                  </div>
                  <div className="event-row">
                    <span className="label">Date</span>
                    <span className="value">
                      {formatDate(bookingDetails.date)}
                    </span>
                  </div>
                  <div className="event-row">
                    <span className="label">Time</span>
                    <span className="value">
                      {bookingDetails.startTime} - {bookingDetails.endTime}
                    </span>
                  </div>
                  <div className="event-row">
                    <span className="label">Guests</span>
                    <span className="value">{bookingDetails.guests}</span>
                  </div>
                  <div className="event-row">
                    <span className="label">Venue</span>
                    <span className="value">{venue.venueName}</span>
                  </div>
                </div>
              </section>

              <div className="divider"></div>

              {/* Payment Section */}
              <section className="payment-section">
                <h2>Payment</h2>
                <form onSubmit={handleSubmit} className="payment-form">
                  {/* Payment Method Selection */}
                  <div className="payment-method-selection">
                    <div className="payment-method-header">
                      <span>Card</span>
                      <div className="google-pay-badge">
                        <i className="fab fa-google"></i>
                        <span>Google Pay</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="card-details-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Card number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) =>
                            setCardNumber(
                              e.target.value.replace(/\D/g, "").slice(0, 16)
                            )
                          }
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Expiration date</label>
                        <input
                          type="text"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          placeholder="MM / YY"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Country</label>
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          required
                        >
                          <option value="Canada">Canada</option>
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Postal code</label>
                        <input
                          type="text"
                          value={postalCode}
                          onChange={(e) =>
                            setPostalCode(e.target.value.toUpperCase())
                          }
                          placeholder="MST 114"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Terms Notice */}
                  <div className="terms-notice">
                    <p>
                      By providing your card information, you allow Tagvenue
                      Limited to charge your card for future payments in
                      accordance with their terms.
                    </p>
                  </div>

                  {/* Booking Notice */}
                  <div className="booking-notice">
                    <p>
                      <strong>You won't be charged yet.</strong> Your booking
                      won't be confirmed until the host accepts your request.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={`submit-btn ${isProcessing ? "processing" : ""}`}
                    disabled={
                      isProcessing || !cardNumber || !expiryDate || !postalCode
                    }
                  >
                    {isProcessing ? "Processing..." : "Request to Book"}
                  </button>
                </form>
              </section>
            </div>

            {/* Right Column - Price Summary & Protection */}
            <div className="payment-sidebar">
              {/* Venue Summary */}
              <div className="venue-summary-card">
                <h3>{venue.venueName}</h3>
                <div className="venue-location">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>
                    {venue.city}, {venue.country}
                  </span>
                </div>
                {venue.spaceType && (
                  <div className="venue-type">
                    <span>{venue.spaceType}</span>
                  </div>
                )}
              </div>

              {/* Price Details */}
              <div className="price-summary-card">
                <h3>Price details</h3>
                <div className="price-breakdown">
                  <div className="price-row">
                    <span>
                      {formatCurrency(pricing.hourlyRate)} × {pricing.hours}{" "}
                      hours
                    </span>
                    <span>{formatCurrency(pricing.basePrice)}</span>
                  </div>
                  {pricing.cleaningFee > 0 && (
                    <div className="price-row">
                      <span>Cleaning fee ⏱</span>
                      <span>{formatCurrency(pricing.cleaningFee)}</span>
                    </div>
                  )}
                  {pricing.serviceFee > 0 && (
                    <div className="price-row">
                      <span>Service fee</span>
                      <span>{formatCurrency(pricing.serviceFee)}</span>
                    </div>
                  )}
                  <div className="price-total">
                    <span>Total</span>
                    <span>{formatCurrency(pricing.total)}</span>
                  </div>
                  <div className="tax-note">
                    <span>(sales tax included)</span>
                  </div>
                </div>
              </div>

              {/* Payment Protection */}
              <div className="protection-card">
                <h3>Payment protection</h3>
                <p>Book and pay on Tagvenue and get:</p>
                <ul className="protection-features">
                  <li>
                    <i className="fas fa-check"></i>
                    Secure Payment Transactions
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    Comprehensive Booking Support
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    Responsive Customer Service
                  </li>
                </ul>
                <button className="learn-more-btn">Learn more</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
