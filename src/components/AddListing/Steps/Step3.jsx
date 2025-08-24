// src/components/AddListing/Steps/Step3.jsx
import React from "react";

const Step3 = ({ formData, handleChange, prevStep, nextStep }) => {
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

  const handleSpaceTypeSelect = (type) => {
    handleChange({ target: { name: "spaceType", value: type } });
  };

  const handleVenuePartSelect = (part) => {
    handleChange({ target: { name: "venuePart", value: part } });
  };

  const isStepValid = () => {
    return formData.spaceType && formData.venuePart;
  };

  return (
    <div className="step3-form">
      <h2>Space Type</h2>

      {/* Space Type Selection */}
      <div className="form-group">
        <label>What type of space is it?</label>
        <p className="form-subtext">
          Enter the type of space that most closely represents the physical
          space being listed.
        </p>
        <p className="form-example">
          e.g. Photo Studio, Restaurant in a Hotel, Event Space in a Pub
        </p>

        <div className="space-types-grid">
          {spaceTypes.map((type) => (
            <button
              key={type}
              type="button"
              className={`space-type-btn ${
                formData.spaceType === type ? "selected" : ""
              }`}
              onClick={() => handleSpaceTypeSelect(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Venue Part Selection */}
      <div className="form-group">
        <label>What part of the venue does this space represent?</label>
        <p className="form-subtext">
          Let your customers know whether the space is private or will be shared
          with other guests.
        </p>

        <div className="venue-parts-list">
          {venueParts.map((part) => (
            <div
              key={part.value}
              className={`venue-part-card ${
                formData.venuePart === part.value ? "selected" : ""
              }`}
              onClick={() => handleVenuePartSelect(part.value)}
            >
              <div className="venue-part-content">
                <h4>{part.label}</h4>
                <p>{part.description}</p>
              </div>
              <div className="selection-indicator">
                {formData.venuePart === part.value && (
                  <span className="checkmark">✓</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="form-navigation">
        <button type="button" className="prev-btn" onClick={prevStep}>
          Previous
        </button>
        <button
          type="button"
          className="next-btn"
          onClick={nextStep}
          disabled={!isStepValid()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3;
