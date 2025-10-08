// src/components/AddListing/Steps/Step7.jsx
import React, { useState } from "react";

const Step7 = ({ formData, handleChange, prevStep, nextStep }) => {
  const [selectedPricingOption, setSelectedPricingOption] = useState(
    formData.pricingOption || ""
  );

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const pricingOptions = [
    {
      id: "hireFee",
      label: "Hire fee only",
      description: "We charge based on hire fee per hour or per day.",
    },
    {
      id: "customPricing",
      label: "Custom pricing",
      description:
        "We charge based on minimum spend, price per person or hire fee.",
    },
  ];

  const handlePricingOptionSelect = (optionId) => {
    setSelectedPricingOption(optionId);
    handleChange({ target: { name: "pricingOption", value: optionId } });
  };

  const handleDayChange = (day, field, value) => {
    const currentDayData = formData[day.toLowerCase()] || { status: "closed" };

    if (field === "status") {
      handleChange({
        target: {
          name: day.toLowerCase(),
          value: { ...currentDayData, status: value },
        },
      });
    } else {
      handleChange({
        target: {
          name: day.toLowerCase(),
          value: { ...currentDayData, [field]: value },
        },
      });
    }
  };

  // REMOVED: handleHourlyRateAdd function since it's not used anymore

  const handleHourlyRateChange = (day, index, field, value) => {
    const currentRates = formData[`${day.toLowerCase()}HourlyRates`] || [];
    const updatedRates = currentRates.map((rate, i) =>
      i === index ? { ...rate, [field]: value } : rate
    );
    handleChange({
      target: {
        name: `${day.toLowerCase()}HourlyRates`,
        value: updatedRates,
      },
    });
  };

  return (
    <div className="step7-form">
      <h2>Prices and opening hours</h2>

      {/* Pricing Options */}
      <div className="form-group">
        <h3>What is your pricing?</h3>
        <p className="form-subtext">
          <strong>Required for online payments</strong>
        </p>

        <div className="pricing-options">
          {pricingOptions.map((option) => (
            <div
              key={option.id}
              className={`pricing-option-card ${
                selectedPricingOption === option.id ? "selected" : ""
              }`}
              onClick={() => handlePricingOptionSelect(option.id)}
            >
              <div className="pricing-option-content">
                <h4>{option.label}</h4>
                <p>{option.description}</p>
                {selectedPricingOption === option.id && (
                  <span className="selected-badge">Selected</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Opening Hours Table */}
      <div className="form-group">
        <h3>Opening hours and pricing</h3>

        <div className="opening-hours-table">
          {daysOfWeek.map((day) => {
            const dayData = formData[day.toLowerCase()] || { status: "closed" };
            const hourlyRates =
              formData[`${day.toLowerCase()}HourlyRates`] || [];

            return (
              <div key={day} className="day-row">
                <div className="day-header">
                  <span className="day-name">{day}</span>
                  <div className="day-status">
                    <label>
                      <input
                        type="radio"
                        name={`${day.toLowerCase()}_status`}
                        value="open"
                        checked={dayData.status === "open"}
                        onChange={(e) =>
                          handleDayChange(day, "status", e.target.value)
                        }
                      />
                      Open
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`${day.toLowerCase()}_status`}
                        value="closed"
                        checked={dayData.status === "closed"}
                        onChange={(e) =>
                          handleDayChange(day, "status", e.target.value)
                        }
                      />
                      Closed
                    </label>
                  </div>
                </div>

                {dayData.status === "open" && (
                  <div className="day-rates">
                    <div className="hourly-rates">
                      <h5>Hourly rates</h5>
                      {hourlyRates.map((rate, index) => (
                        <div key={index} className="rate-input">
                          <input
                            type="text"
                            placeholder="$ 00"
                            value={rate.price || ""}
                            onChange={(e) =>
                              handleHourlyRateChange(
                                day,
                                index,
                                "price",
                                e.target.value
                              )
                            }
                          />
                          <span>Inc. sales tax per hour</span>
                        </div>
                      ))}
                      {/* REMOVED: Add hourly rate button since it's not needed */}
                    </div>

                    <div className="full-day-rate">
                      <h5>Full day rate</h5>
                      <div className="rate-input">
                        <input
                          type="text"
                          placeholder="$ 00"
                          value={dayData.fullDayRate || ""}
                          onChange={(e) =>
                            handleDayChange(day, "fullDayRate", e.target.value)
                          }
                        />
                        <span>Inc. sales tax per day</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Charges */}
      <div className="form-group">
        <h3>Additional charges</h3>
        <div className="additional-charges">
          <div className="charge-item">
            <span>Cleaning fee</span>
            <div className="charge-input">
              <input
                type="text"
                name="cleaningFee"
                value={formData.cleaningFee || ""}
                onChange={handleChange}
                placeholder="$ 00"
              />
            </div>
          </div>
          {/* Add base hourly and daily rates for the BookingSidebar to use */}
          <div className="charge-item">
            <span>Base hourly rate (for days without specific rates)</span>
            <div className="charge-input">
              <input
                type="text"
                name="hourlyRate"
                value={formData.hourlyRate || ""}
                onChange={handleChange}
                placeholder="$ 00"
              />
            </div>
          </div>
          <div className="charge-item">
            <span>Base daily rate</span>
            <div className="charge-input">
              <input
                type="text"
                name="dailyRate"
                value={formData.dailyRate || ""}
                onChange={handleChange}
                placeholder="$ 00"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Minimum Hours */}
      <div className="form-group">
        <h3>Minimum number of hours for a booking</h3>
        <div className="minimum-hours">
          <input
            type="number"
            name="minBookingHours"
            value={formData.minBookingHours || "2"}
            onChange={handleChange}
            min="1"
            className="hours-input"
          />
          <span>hours</span>
        </div>
      </div>

      {/* Pricing Details */}
      <div className="form-group">
        <h3>Pricing details</h3>
        <label>Pricing comment (Optional)</label>
        <textarea
          name="pricingComment"
          value={formData.pricingComment || ""}
          onChange={handleChange}
          placeholder="Add any additional pricing details or comments"
          rows={3}
        />
      </div>

      {/* Navigation */}
      <div className="form-navigation">
        <button type="button" className="prev-btn" onClick={prevStep}>
          Previous
        </button>
        <button type="button" className="next-btn" onClick={nextStep}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Step7;
