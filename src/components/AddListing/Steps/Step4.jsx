// src/components/AddListing/Steps/Step4.jsx
import React from "react";

const Step4 = ({ formData, handleChange, prevStep, nextStep }) => {
  const handleCheckboxChange = (field) => {
    handleChange({
      target: {
        name: field,
        value: !formData[field],
      },
    });
  };

  return (
    <div className="step4-form">
      <h2>Venue Details</h2>

      {/* Parking Section */}
      <div className="form-group">
        <h3>Parking</h3>

        <div className="checkbox-field">
          <label>
            <input
              type="checkbox"
              name="freeParkingOnPremises"
              checked={formData.freeParkingOnPremises || false}
              onChange={() => handleCheckboxChange("freeParkingOnPremises")}
            />
            Free parking on premises
          </label>
          {formData.freeParkingOnPremises && (
            <div className="sub-field">
              <label>Number of spaces available</label>
              <input
                type="number"
                name="freeParkingSpaces"
                value={formData.freeParkingSpaces || ""}
                onChange={handleChange}
                placeholder="Enter number of spaces"
              />
            </div>
          )}
        </div>

        <div className="checkbox-field">
          <label>
            <input
              type="checkbox"
              name="freeStreetParking"
              checked={formData.freeStreetParking || false}
              onChange={() => handleCheckboxChange("freeStreetParking")}
            />
            Free street parking
          </label>
        </div>

        <div className="checkbox-field">
          <label>
            <input
              type="checkbox"
              name="paidParkingOnPremises"
              checked={formData.paidParkingOnPremises || false}
              onChange={() => handleCheckboxChange("paidParkingOnPremises")}
            />
            Paid parking on premises
          </label>
          {formData.paidParkingOnPremises && (
            <div className="sub-field">
              <label>Number of spaces available</label>
              <input
                type="number"
                name="paidParkingSpaces"
                value={formData.paidParkingSpaces || ""}
                onChange={handleChange}
                placeholder="Enter number of spaces"
              />
            </div>
          )}
        </div>

        <div className="checkbox-field">
          <label>
            <input
              type="checkbox"
              name="paidParkingOffPremises"
              checked={formData.paidParkingOffPremises || false}
              onChange={() => handleCheckboxChange("paidParkingOffPremises")}
            />
            Paid parking off premises
          </label>
        </div>
      </div>

      {/* Accommodation Section */}
      <div className="form-group">
        <h3>Accommodation</h3>
        <div className="checkbox-field">
          <label>
            <input
              type="checkbox"
              name="accommodationAvailable"
              checked={formData.accommodationAvailable || false}
              onChange={() => handleCheckboxChange("accommodationAvailable")}
            />
            Accommodation is available on-site
          </label>
          {formData.accommodationAvailable && (
            <div className="sub-field">
              <label>Number of rooms available</label>
              <input
                type="number"
                name="accommodationRooms"
                value={formData.accommodationRooms || ""}
                onChange={handleChange}
                placeholder="Enter number of rooms"
              />
            </div>
          )}
        </div>
      </div>

      {/* Allowed Events Section */}
      <div className="form-group">
        <h3>Allowed events</h3>
        <div className="checkbox-field">
          <label>
            <input
              type="checkbox"
              name="allowedEvents"
              checked={formData.allowedEvents || false}
              onChange={() => handleCheckboxChange("allowedEvents")}
            />
            Register for personnel and ticketed events
          </label>
          <p className="form-subtext">
            The user frequently hears contact and issues events for which the
            operator can publicly advertise and set tickets.
          </p>
        </div>
      </div>

      {/* Age Policy Section */}
      <div className="form-group">
        <h3>Age policy</h3>
        <div className="checkbox-field">
          <label>
            <input
              type="checkbox"
              name="ageRestrictions"
              checked={formData.ageRestrictions || false}
              onChange={() => handleCheckboxChange("ageRestrictions")}
            />
            Age restrictions at the venue
          </label>
          <p className="form-subtext">
            Specify if your venue has age limits for event attendees.
          </p>
        </div>

        {formData.ageRestrictions && (
          <div className="form-row">
            <div className="form-group">
              <label>Minimum age requirement</label>
              <select
                name="minAgeRequirement"
                value={formData.minAgeRequirement || ""}
                onChange={handleChange}
              >
                <option value="">Select restriction</option>
                <option value="18">18+</option>
                <option value="21">21+</option>
                <option value="25">25+</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Enforcement time</label>
              <select
                name="enforcementTime"
                value={formData.enforcementTime || ""}
                onChange={handleChange}
              >
                <option value="">Select time</option>
                <option value="after6pm">After 6 PM</option>
                <option value="after8pm">After 8 PM</option>
                <option value="after10pm">After 10 PM</option>
                <option value="allDay">All day</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        )}
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

export default Step4;
