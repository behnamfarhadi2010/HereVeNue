// src/components/AddListing/Steps/Step2.jsx
import React from "react";

const Step2 = ({ formData, handleChange, prevStep, nextStep }) => {
  return (
    <div className="step2-form">
      <h2>Step 2: Location & Address</h2>
      <div className="form-group">
        <label htmlFor="country">Country</label>
        <select
          id="country"
          name="country"
          value={formData.country || ""}
          onChange={handleChange}
          required
        >
          <option value="">Select Country</option>
          <option value="USA">United States</option>
          <option value="UK">United Kingdom</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
          <option value="Germany">Germany</option>
          <option value="France">France</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="venueAddress">Street Address</label>
        <input
          type="text"
          id="venueAddress"
          name="venueAddress"
          value={formData.venueAddress || ""}
          onChange={handleChange}
          placeholder="Enter street address"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city || ""}
            onChange={handleChange}
            placeholder="Enter city"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="state">State/Province</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state || ""}
            onChange={handleChange}
            placeholder="Enter state or province"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="zipCode">ZIP/Postal Code</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode || ""}
            onChange={handleChange}
            placeholder="Enter ZIP code"
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="zipCode">Show your location on Map</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode || ""}
            onChange={handleChange}
            placeholder="Enter ZIP code"
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="neighborhood">Neighborhood/District</label>
        <input
          type="text"
          id="neighborhood"
          name="neighborhood"
          value={formData.neighborhood || ""}
          onChange={handleChange}
          placeholder="Enter neighborhood or district (optional)"
        />
      </div>

      <div className="form-group">
        <label htmlFor="landmarks">Nearby Landmarks</label>
        <textarea
          id="landmarks"
          name="landmarks"
          value={formData.landmarks || ""}
          onChange={handleChange}
          placeholder="List nearby landmarks or easy-to-find locations (optional)"
          rows={3}
        />
      </div>

      <div className="form-group">
        <label htmlFor="parkingInfo">Parking Information</label>
        <textarea
          id="parkingInfo"
          name="parkingInfo"
          value={formData.parkingInfo || ""}
          onChange={handleChange}
          placeholder="Describe parking options and availability"
          rows={3}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="publicTransport">Public Transportation Access</label>
        <textarea
          id="publicTransport"
          name="publicTransport"
          value={formData.publicTransport || ""}
          onChange={handleChange}
          placeholder="Describe nearby public transportation options"
          rows={3}
        />
      </div>

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

export default Step2;
