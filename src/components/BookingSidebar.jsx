// components/BookingSidebar.jsx
import React, { useState, useEffect } from "react";
import "../styles/BookingSidebarStyles.css";

const BookingSidebar = ({ venue }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("11:00");
  const [guestCount, setGuestCount] = useState(1);
  const [includeCleaning, setIncludeCleaning] = useState(false);
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [pricingData, setPricingData] = useState(null);

  // Calculate hours between start and end time
  const calculateHours = () => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const diff = (end - start) / (1000 * 60 * 60);
    return Math.max(diff, venue.minBookingHours || 2);
  };

  const hours = calculateHours();

  // Get day of week from selected date
  useEffect(() => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      const days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ];
      setDayOfWeek(days[date.getDay()]);
    }
  }, [selectedDate]);

  // Extract pricing data from venue
  useEffect(() => {
    if (venue) {
      const data = {
        // Base rates from Step7 additional charges
        baseHourlyRate:
          parseFloat(venue.hourlyRate?.replace(/[^\d.-]/g, "")) || 105,
        baseDailyRate:
          parseFloat(venue.dailyRate?.replace(/[^\d.-]/g, "")) || 900,
        cleaningFee:
          parseFloat(venue.cleaningFee?.replace(/[^\d.-]/g, "")) || 55,
        minBookingHours: parseInt(venue.minBookingHours) || 2,
        maxCapacity: venue.venueSize || 60,

        // Day-specific pricing from Step7 opening hours
        dayPricing: {},
      };

      // Get pricing for each day from Step7 opening hours
      const days = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ];
      days.forEach((day) => {
        const dayData = venue[day];
        if (dayData && dayData.status === "open") {
          // Get hourly rates for this day
          const hourlyRates = venue[`${day}HourlyRates`] || [];
          const hourlyRate =
            hourlyRates.length > 0 && hourlyRates[0].price
              ? parseFloat(hourlyRates[0].price.replace(/[^\d.-]/g, ""))
              : data.baseHourlyRate;

          // Get daily rate for this day
          const dailyRate = dayData.fullDayRate
            ? parseFloat(dayData.fullDayRate.replace(/[^\d.-]/g, ""))
            : data.baseDailyRate;

          data.dayPricing[day] = {
            hourlyRate,
            dailyRate,
            isOpen: true,
          };
        } else {
          data.dayPricing[day] = {
            hourlyRate: data.baseHourlyRate,
            dailyRate: data.baseDailyRate,
            isOpen: false,
          };
        }
      });

      setPricingData(data);
      console.log("Extracted pricing data:", data);
    }
  }, [venue]);

  // Get pricing for selected day
  const getCurrentPricing = () => {
    if (!pricingData) return { hourlyRate: 0, dailyRate: 0, isOpen: false };

    if (dayOfWeek && pricingData.dayPricing[dayOfWeek]) {
      return pricingData.dayPricing[dayOfWeek];
    }

    // Return base rates if no specific day selected
    return {
      hourlyRate: pricingData.baseHourlyRate,
      dailyRate: pricingData.baseDailyRate,
      isOpen: true,
    };
  };

  const currentPricing = getCurrentPricing();

  // Calculate costs
  const subtotal = hours * currentPricing.hourlyRate;
  const total =
    subtotal + (includeCleaning ? pricingData?.cleaningFee || 0 : 0);

  const timeOptions = [
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ];

  const formatTimeDisplay = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "C$0";
    const numberValue =
      typeof amount === "number" ? amount : parseFloat(amount);
    if (isNaN(numberValue)) return "C$0";
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
    }).format(numberValue);
  };

  const handleBookRequest = () => {
    if (!currentPricing.isOpen) {
      alert(
        "Sorry, the venue is closed on the selected date. Please choose another date."
      );
      return;
    }

    const bookingData = {
      venueId: venue.id,
      venueName: venue.venueName,
      date: selectedDate,
      startTime,
      endTime,
      hours,
      guestCount,
      includeCleaning,
      subtotal,
      cleaningFee: includeCleaning ? pricingData.cleaningFee : 0,
      total,
      hourlyRate: currentPricing.hourlyRate,
      dailyRate: currentPricing.dailyRate,
    };

    console.log("Booking request:", bookingData);
    alert(
      "Booking request submitted! This would connect to your booking system."
    );
  };

  // Show loading while extracting pricing data
  if (!pricingData) {
    return (
      <div className="booking-sidebar">
        <div className="booking-card">
          <div className="no-pricing-info">
            <h3>Loading Pricing...</h3>
            <p>Please wait while we load the venue pricing information.</p>
          </div>
        </div>
      </div>
    );
  }

  // Check if pricing data is available
  const hasPricingData =
    pricingData.baseHourlyRate > 0 || pricingData.baseDailyRate > 0;

  if (!hasPricingData) {
    return (
      <div className="booking-sidebar">
        <div className="booking-card">
          <div className="no-pricing-info">
            <h3>Pricing Not Available</h3>
            <p>This venue hasn't set up pricing information yet.</p>
            <p>Please contact the venue directly for booking inquiries.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-sidebar">
      <div className="booking-card">
        {/* Pricing Header */}
        <div className="pricing-header">
          {currentPricing.hourlyRate > 0 && (
            <div className="hourly-rate">
              <span className="price">
                {formatCurrency(currentPricing.hourlyRate)}
              </span>
              <span className="period"> / hour</span>
            </div>
          )}
          {currentPricing.dailyRate > 0 && (
            <div className="daily-rate">
              <span className="price">
                {formatCurrency(currentPricing.dailyRate)}
              </span>
              <span className="period"> / day</span>
            </div>
          )}
        </div>

        {/* Day Status */}
        {selectedDate && (
          <div
            className={`day-status ${
              currentPricing.isOpen ? "open" : "closed"
            }`}
          >
            {currentPricing.isOpen ? "🟢 Open" : "🔴 Closed"} on {selectedDate}
          </div>
        )}

        {/* Minimum Hours */}
        <div className="minimum-hours">
          Minimum {pricingData.minBookingHours} hours
        </div>

        {/* Date Selection */}
        <div className="booking-section">
          <label className="section-label">Date and time</label>
          <div className="date-time-grid">
            <div className="date-input">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="date-picker"
              />
              <span className="dropdown-icon">▼</span>
            </div>
            <div className="time-inputs">
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="time-select"
              >
                {timeOptions.map((time) => (
                  <option key={`start-${time}`} value={time}>
                    {formatTimeDisplay(time)}
                  </option>
                ))}
              </select>
              <span className="time-separator">to</span>
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="time-select"
              >
                {timeOptions.map((time) => (
                  <option key={`end-${time}`} value={time}>
                    {formatTimeDisplay(time)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="duration-display">
            {formatTimeDisplay(startTime)} - {formatTimeDisplay(endTime)} (
            {hours} hours)
          </div>
        </div>

        {/* People Selection */}
        <div className="booking-section">
          <label className="section-label">People</label>
          <div className="people-selector">
            <div className="capacity-info">
              <span className="capacity-icon">☒</span>
              <span className="capacity-text">
                Max {pricingData.maxCapacity}
              </span>
            </div>
            <div className="guest-counter">
              <button
                type="button"
                onClick={() => setGuestCount((prev) => Math.max(1, prev - 1))}
                className="counter-btn"
                disabled={guestCount <= 1}
              >
                -
              </button>
              <span className="guest-count">
                {guestCount} guest{guestCount !== 1 ? "s" : ""}
              </span>
              <button
                type="button"
                onClick={() =>
                  setGuestCount((prev) =>
                    Math.min(pricingData.maxCapacity, prev + 1)
                  )
                }
                className="counter-btn"
                disabled={guestCount >= pricingData.maxCapacity}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="price-breakdown">
          <div className="price-line">
            <span>
              {formatCurrency(currentPricing.hourlyRate)} × {hours} hours
            </span>
            <span>{formatCurrency(subtotal)}</span>
          </div>

          {pricingData.cleaningFee > 0 && (
            <div className="price-line cleaning-fee">
              <label className="cleaning-option">
                <input
                  type="checkbox"
                  checked={includeCleaning}
                  onChange={(e) => setIncludeCleaning(e.target.checked)}
                />
                Cleaning fee
              </label>
              <span>
                {includeCleaning
                  ? formatCurrency(pricingData.cleaningFee)
                  : "C$0"}
              </span>
            </div>
          )}

          <div className="price-line total">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>

          <div className="tax-note">(sales tax included)</div>
        </div>

        {/* Book Button */}
        <button
          className="book-button"
          onClick={handleBookRequest}
          disabled={!selectedDate || !currentPricing.isOpen}
        >
          {!selectedDate
            ? "Select a Date"
            : !currentPricing.isOpen
            ? "Venue Closed"
            : "Request to Book"}
        </button>

        {/* Security Note */}
        <div className="security-note">You won't be charged yet</div>
      </div>
    </div>
  );
};

export default BookingSidebar;
