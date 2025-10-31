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
  const [isProcessing, setIsProcessing] = useState(false);

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
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [country, setCountry] = useState("Canada");
  const [postalCode, setPostalCode] = useState("");

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
    try {
      // Safely parse all values with defaults
      const hourlyRate =
        parseFloat(venue.hourlyRate) ||
        (venue.dailyRate ? parseFloat(venue.dailyRate) / 8 : 105);

      const cleaningFee = parseFloat(venue.cleaningFee) || 0;
      const serviceFee = parseFloat(venue.serviceFee) || 0;
      const hours = parseInt(bookingDetails.hours) || 2;

      // Ensure we have valid numbers
      if (isNaN(hourlyRate) || isNaN(hours)) {
        console.error("Invalid pricing data:", { hourlyRate, hours });
        return getDefaultPricing();
      }

      const basePrice = hourlyRate * hours;
      const taxRate = 0.15;
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
        hours,
      };
    } catch (error) {
      console.error("Error calculating pricing:", error);
      return getDefaultPricing();
    }
  };

  // Fallback pricing if calculation fails
  const getDefaultPricing = () => {
    const hourlyRate = 105;
    const hours = parseInt(bookingDetails.hours) || 2;
    const basePrice = hourlyRate * hours;
    const tax = basePrice * 0.15;
    const total = basePrice + tax;

    return {
      hourlyRate,
      basePrice,
      cleaningFee: 0,
      serviceFee: 0,
      tax,
      total,
      hours,
    };
  };

  const pricing = calculatePricing();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create booking object
      const newBooking = {
        id: Date.now(),
        venueId: venue.id,
        venueName: venue.venueName,
        userName: "Guest User", // Replace with actual user name from context
        status: "pending",
        bookingDetails: bookingDetails,
        pricing: pricing,
        submittedAt: new Date().toISOString(),
        venueImage: venue.floorPlanImages?.[0]?.url || null,
        city: venue.city,
        country: venue.country,
      };

      // Save to localStorage
      const existingBookings = JSON.parse(
        localStorage.getItem("userBookings") || "[]"
      );
      const updatedBookings = [newBooking, ...existingBookings];
      localStorage.setItem("userBookings", JSON.stringify(updatedBookings));

      // Trigger events for other components
      window.dispatchEvent(new Event("bookingsUpdated"));
      window.dispatchEvent(
        new CustomEvent("newBookingEvent", {
          detail: {
            type: "NEW_BOOKING",
            booking: newBooking,
          },
        })
      );

      // Navigate to confirmation page
      navigate(`/booking-confirmation/${venue.id}`, {
        state: {
          bookingDetails,
          paymentDetails: {
            cardLastFour: cardNumber.slice(-4),
            total: pricing.total,
          },
          venue,
          bookingId: newBooking.id,
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
    // Ensure amount is a valid number
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      return "$0.00";
    }

    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
    }).format(numericAmount);
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
                      By providing your card information, you allow OVB Limited
                      to charge your card for future payments in accordance with
                      their terms.
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
                      <span>Cleaning fee </span>
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
                    <span>(About 15% sales tax included)</span>
                  </div>
                </div>
              </div>

              {/* Payment Protection */}
              <div className="protection-card">
                <h3>Payment protection</h3>
                <p>Book and pay on OVB and get:</p>
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
