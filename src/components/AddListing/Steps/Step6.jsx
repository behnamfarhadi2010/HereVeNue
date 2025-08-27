// src/components/AddListing/Steps/Step6.jsx
import React, { useState } from "react";

const Step6 = ({ formData, handleChange, prevStep, nextStep }) => {
  const [customFacility, setCustomFacility] = useState("");

  // Licenses
  const licenses = [
    {
      id: "weddingLicense",
      label: "Wedding licence",
      description:
        "A civil marriage / permission can be performed by a recognized affiliate or religious body at your venue.",
    },
  ];

  // Facilities
  const facilities = [
    "Wi-Fi",
    "Projector",
    "Flatscreen TV",
    "Whiteboard",
    "Flipchart",
    "PA system / speakers",
    "Conference call facilities",
    "Air conditioning",
    "Natural light",
    "Storage space",
    "Quiet space",
  ];

  // Music & Sound options
  const musicOptions = [
    {
      id: "playOwnMusic",
      label: "Clients can play their own music",
      description:
        "Customers can connect their devices to the in-house speakers.",
    },
    {
      id: "bringOwnDJ",
      label: "Clients can bring their own DJ",
      description: "Customers can invite their own DJ with equipment.",
    },
    {
      id: "noiseRestrictions",
      label: "Space has noise restriction",
      description: "Loud noise permitted until designated hours.",
    },
  ];

  // Accessibility features
  const spaceAccessibility = [
    {
      id: "wheelchairAccessible",
      label: "Wheelchair accessible",
      description:
        "The entrance and path is wide enough for a wheelchair user, the access is accessible without steps or with a lift if steps are present.",
    },
    {
      id: "accessibleToilet",
      label: "Accessible toilet",
      description: "There is an accessible toilet facility within the space.",
    },
    {
      id: "stepFreeEntrance",
      label: "Step-free guest entrance",
      description:
        "The guest entrance is free of steps and barriers and the space is on street level.",
    },
  ];

  const venueAccessibility = [
    {
      id: "accessibleParking",
      label: "Accessible parking spot",
      description:
        "There is a private parking spot at least 11 feet wide or designated public parking for disabilities.",
    },
    {
      id: "liftAllFloors",
      label: "Lift to all floors",
      description:
        "If this venue is multi-leveled, there is a lift that serves all floors.",
    },
    {
      id: "cargolift",
      label: "Cargo lift",
      description:
        "This venue is multi-leveled, there is a cargo lift to facilitate transportation of goods between floors.",
    },
  ];

  const handleCheckboxChange = (field) => {
    handleChange({
      target: {
        name: field,
        value: !formData[field],
      },
    });
  };

  const handleCustomFacilityAdd = () => {
    if (customFacility.trim()) {
      const currentFacilities = formData.customFacilities || [];
      handleChange({
        target: {
          name: "customFacilities",
          value: [...currentFacilities, customFacility.trim()],
        },
      });
      setCustomFacility("");
    }
  };

  const handleCustomFacilityRemove = (index) => {
    const currentFacilities = formData.customFacilities || [];
    handleChange({
      target: {
        name: "customFacilities",
        value: currentFacilities.filter((_, i) => i !== index),
      },
    });
  };

  return (
    <div className="step6-form">
      <h2>Features</h2>

      {/* Licenses Section */}
      <div className="form-group">
        <h3>Licences</h3>
        <p className="form-subtext">Indicate the licences your space holds.</p>

        {licenses.map((license) => (
          <div key={license.id} className="checkbox-field">
            <label>
              <input
                type="checkbox"
                name={license.id}
                checked={formData[license.id] || false}
                onChange={() => handleCheckboxChange(license.id)}
              />
              <strong>{license.label}</strong>
            </label>
            <p className="facility-description">{license.description}</p>
          </div>
        ))}
      </div>

      {/* Facilities Section */}
      <div className="form-group">
        <h3>Facilities</h3>
        <p className="form-subtext">
          Please confirm the availability of each facility.
        </p>

        <div className="facilities-grid">
          {facilities.map((facility) => (
            <div key={facility} className="checkbox-field">
              <label>
                <input
                  type="checkbox"
                  name={`facility_${facility.replace(/\s+/g, "_")}`}
                  checked={
                    formData[`facility_${facility.replace(/\s+/g, "_")}`] ||
                    false
                  }
                  onChange={() =>
                    handleCheckboxChange(
                      `facility_${facility.replace(/\s+/g, "_")}`
                    )
                  }
                />
                {facility}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Facilities Section */}
      <div className="form-group">
        <h3>Custom facilities</h3>
        <p className="form-subtext">
          Complement the standard facilities with your own custom facilities for
          guests.
        </p>

        <div className="custom-facilities">
          <div className="add-facility-input">
            <input
              type="text"
              value={customFacility}
              onChange={(e) => setCustomFacility(e.target.value)}
              placeholder="Add facility"
              onKeyPress={(e) => e.key === "Enter" && handleCustomFacilityAdd()}
            />
            <button
              type="button"
              onClick={handleCustomFacilityAdd}
              className="add-btn"
            >
              Add
            </button>
          </div>

          {formData.customFacilities &&
            formData.customFacilities.length > 0 && (
              <div className="custom-facilities-list">
                {formData.customFacilities.map((facility, index) => (
                  <div key={index} className="custom-facility-item">
                    <span>{facility}</span>
                    <button
                      type="button"
                      onClick={() => handleCustomFacilityRemove(index)}
                      className="remove-btn"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>

      {/* Music & Sound Section */}
      <div className="form-group">
        <h3>Music & sound</h3>
        <p className="form-subtext">
          Add the music and sound options you provide, including any noise
          limitations.
        </p>

        {musicOptions.map((option) => (
          <div key={option.id} className="checkbox-field">
            <label>
              <input
                type="checkbox"
                name={option.id}
                checked={formData[option.id] || false}
                onChange={() => handleCheckboxChange(option.id)}
              />
              <strong>{option.label}</strong>
            </label>
            <p className="facility-description">{option.description}</p>
          </div>
        ))}
      </div>

      {/* Accessibility Section */}
      <div className="form-group">
        <h3>Accessibility</h3>
        <p className="form-subtext">
          What accessibility features does the space and venue have?
        </p>

        <h4>Space accessibility features</h4>
        {spaceAccessibility.map((feature) => (
          <div key={feature.id} className="checkbox-field">
            <label>
              <input
                type="checkbox"
                name={feature.id}
                checked={formData[feature.id] || false}
                onChange={() => handleCheckboxChange(feature.id)}
              />
              <strong>{feature.label}</strong>
            </label>
            <p className="facility-description">{feature.description}</p>
          </div>
        ))}

        <h4>Venue accessibility features</h4>
        <p className="form-subtext">
          (changes will be applied to all spaces in the venue)
        </p>
        {venueAccessibility.map((feature) => (
          <div key={feature.id} className="checkbox-field">
            <label>
              <input
                type="checkbox"
                name={feature.id}
                checked={formData[feature.id] || false}
                onChange={() => handleCheckboxChange(feature.id)}
              />
              <strong>{feature.label}</strong>
            </label>
            <p className="facility-description">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="form-navigation">
        <button type="button" className="prev-btn" onClick={prevStep}>
          Back
        </button>
        <button type="button" className="next-btn" onClick={nextStep}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Step6;
