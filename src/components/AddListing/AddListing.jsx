// src/components/AddListing/AddListing.jsx
import { useState } from "react";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import "../../styles/add-listing.css";
import Header from "../Header"; // Adjust the import path as necessary

const AddListing = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    venueName: "",
    venueDescription: "",
    venueTypes: [],
    // Step 2 fields
    venueAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    neighborhood: "",
    landmarks: "",
    parkingInfo: "",
    publicTransport: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVenueTypeToggle = (type) => {
    setFormData((prev) => ({
      ...prev,
      venueTypes: prev.venueTypes.includes(type)
        ? prev.venueTypes.filter((t) => t !== type)
        : [...prev.venueTypes, type],
    }));
  };
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            formData={formData}
            handleChange={handleChange}
            handleVenueTypeToggle={handleVenueTypeToggle}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <Step2
            formData={formData}
            handleChange={handleChange}
            prevStep={prevStep}
            // Add other props needed for Step2
          />
        );
      // Add more cases for additional steps
      default:
        return <Step1 />;
    }
  };
  return (
    <>
      <Header />
      <div className="add-listing-container">
        <h1>Add New Venue</h1>

        {/* Step Progress Indicator */}
        {/* <div className="step-progress">
          <div className={`step ${currentStep >= 1 ? "active" : ""}`}>1</div>
          <div className={`step ${currentStep >= 2 ? "active" : ""}`}>2</div> */}
        {/* Add more steps as needed */}
        {/* </div> */}

        {renderStep()}

        {/* Debug panel (optional) */}
        {/* <div className="debug-panel">
          <h3>Current Form Data:</h3>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div> */}
      </div>
    </>
  );
};

export default AddListing;
