import React from "react";
// src/components/AddListing/Steps/Step1.jsx

const Step1 = ({ formData, handleChange, handleVenueTypeToggle }) => {
  const venueCategories = {
    Popular: [
      "Apartments / Penthouse",
      "Auditorium",
      "Conference Centre",
      "Hotel",
      "Meeting Centre",
    ],
    "Drinks and Dining": ["Restaurant", "Cafe", "Bar / Pub", "Nightclub"],
  };

  return (
    <div className="step1-form">
      <div className="form-group">
        <label htmlFor="venueName">Venue Name</label>
        <input
          type="text"
          id="venueName"
          name="venueName"
          value={formData.venueName}
          onChange={handleChange}
          placeholder="Enter venue name"
          required
        />
      </div>

      <div className="form-group">
        <h3>Venue Type</h3>
        <p>Select one or more options</p>

        {Object.entries(venueCategories).map(([category, types]) => (
          <div key={category} className="venue-category">
            <h4>{category}</h4>
            <div className="venue-types-grid">
              {types.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`venue-type-btn ${
                    formData.venueTypes.includes(type) ? "selected" : ""
                  }`}
                  onClick={() => handleVenueTypeToggle(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="form-group">
        <label htmlFor="venueDescription">Venue Description</label>
        <textarea
          id="venueDescription"
          name="venueDescription"
          value={formData.venueDescription}
          onChange={handleChange}
          placeholder="Describe your venue (minimum 50 characters)"
          rows={5}
          minLength={50}
          required
        />
        <div className="character-count">
          {formData.venueDescription.length}/50 characters minimum
        </div>
      </div>
    </div>
  );
};

export default Step1;
