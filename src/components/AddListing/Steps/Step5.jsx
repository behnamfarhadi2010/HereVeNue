// src/components/AddListing/Steps/Step5.jsx
import React, { useState } from "react";

const Step5 = ({ formData, handleChange, prevStep, nextStep }) => {
  const [selectedLayouts, setSelectedLayouts] = useState(
    formData.layouts || {
      dining: false,
      standing: false,
      cabaret: false,
      classroom: false,
      theatre: false,
      uShaped: false,
      boardroom: false,
    }
  );

  const layoutOptions = [
    { id: "dining", label: "Dining" },
    { id: "standing", label: "Standing" },
    { id: "cabaret", label: "Cabaret" },
    { id: "classroom", label: "Classroom" },
    { id: "theatre", label: "Theatre" },
    { id: "uShaped", label: "U-Shaped" },
    { id: "boardroom", label: "Boardroom" },
  ];

  const handleLayoutToggle = (layoutId) => {
    const updatedLayouts = {
      ...selectedLayouts,
      [layoutId]: !selectedLayouts[layoutId],
    };
    setSelectedLayouts(updatedLayouts);
    handleChange({ target: { name: "layouts", value: updatedLayouts } });
  };

  const handleCapacityChange = (layoutId, capacity) => {
    handleChange({
      target: {
        name: `capacity_${layoutId}`,
        value: capacity,
      },
    });
  };

  const [floorPlanImages, setFloorPlanImages] = useState(
    formData.floorPlanImages || []
  );

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
    }));

    const updatedImages = [...floorPlanImages, ...newImages];
    setFloorPlanImages(updatedImages);
    handleChange({ target: { name: "floorPlanImages", value: updatedImages } });
  };

  return (
    <div className="step5-form">
      <h2>Capacity and Layouts</h2>

      {/* Capacity for New Space */}
      <div className="form-group">
        <h3>Capacity for New Space</h3>
        <p className="form-subtext">
          Tell us how many people you can accommodate for each layout.
        </p>

        <div className="layout-options">
          {layoutOptions.map((layout) => (
            <div key={layout.id} className="layout-option">
              <label className="layout-checkbox">
                <input
                  type="checkbox"
                  checked={selectedLayouts[layout.id] || false}
                  onChange={() => handleLayoutToggle(layout.id)}
                />
                {layout.label}
              </label>

              {selectedLayouts[layout.id] && (
                <div className="capacity-input">
                  <label>Max {layout.label.toLowerCase()} capacity</label>
                  <input
                    type="number"
                    min="1"
                    value={formData[`capacity_${layout.id}`] || ""}
                    onChange={(e) =>
                      handleCapacityChange(layout.id, e.target.value)
                    }
                    placeholder="Enter capacity"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Guest Capacity Preferences */}
      <div className="form-group">
        <h3>Guest capacity preferences</h3>
        <p className="form-subtext">
          Set a minimum number of attendees per event. Enter the smallest group
          size that makes renting your space economically viable.
        </p>

        <div className="minimum-capacity">
          <label>Minimum:</label>
          <div className="price-input">
            <span className="currency">$</span>
            <input
              type="number"
              name="minAttendees"
              value={formData.minAttendees || ""}
              onChange={handleChange}
              placeholder="6"
              min="1"
            />
          </div>
        </div>
      </div>

      {/* Floor Plan Upload */}
      <div className="form-group">
        <h3>Floor plan</h3>
        <p className="form-subtext">
          Floor plans help users to visualize the layout of the space itself,
          and how they can move through the venue. Upload floor plan images of
          both the space and the whole venue.
        </p>

        <div className="file-upload">
          <label htmlFor="floorPlanUpload" className="upload-area">
            <div className="upload-content">
              <p>Upload multiple or drag & drop photos</p>
              <small>PNG, JPG, GIF up to 10MB</small>
            </div>
            <input
              id="floorPlanUpload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </label>
        </div>

        {floorPlanImages.length > 0 && (
          <div className="uploaded-images">
            <h4>Uploaded Images ({floorPlanImages.length})</h4>
            <div className="image-grid">
              {floorPlanImages.map((image, index) => (
                <div key={index} className="image-preview">
                  <img src={image.url} alt={image.name} />
                  <span className="image-name">{image.name}</span>
                </div>
              ))}
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

export default Step5;
