// src/components/AddListing/AddListing.jsx
import { useState } from "react";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";
import Step5 from "./Steps/Step5";
import Step6 from "./Steps/Step6";
import Step7 from "./Steps/Step7";
import Step8 from "./Steps/Step8";
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
    // Step 3 fields
    spaceType: "",
    venuePart: "",
    spaceTypeSearch: "",
    // Step 4 fields
    freeParkingOnPremises: false,
    freeParkingSpaces: "",
    freeStreetParking: false,
    paidParkingOnPremises: false,
    paidParkingSpaces: "",
    paidParkingOffPremises: false,
    accommodationAvailable: false,
    accommodationRooms: "",
    allowedEvents: false,
    ageRestrictions: false,
    minAgeRequirement: "",
    enforcementTime: "",
    // Step 5 fields
    layouts: {
      dining: false,
      standing: false,
      cabaret: false,
      classroom: false,
      theatre: false,
      uShaped: false,
      boardroom: false,
    },
    capacity_dining: "",
    capacity_standing: "",
    capacity_cabaret: "",
    capacity_classroom: "",
    capacity_theatre: "",
    capacity_uShaped: "",
    capacity_boardroom: "",
    minAttendees: "",
    floorPlanImages: [],
    // Step 6 fields
    weddingLicense: false,
    // Facilities
    customFacilities: [],
    playOwnMusic: false,
    bringOwnDJ: false,
    noiseRestrictions: false,
    wheelchairAccessible: false,
    accessibleToilet: false,
    stepFreeEntrance: false,
    accessibleParking: false,
    liftAllFloors: false,
    cargolift: false,
    // Step 7 fields
    pricingOption: "",
    monday: { status: "closed", fullDayRate: "" },
    tuesday: { status: "closed", fullDayRate: "" },
    wednesday: { status: "closed", fullDayRate: "" },
    thursday: { status: "closed", fullDayRate: "" },
    friday: { status: "closed", fullDayRate: "" },
    saturday: { status: "closed", fullDayRate: "" },
    sunday: { status: "closed", fullDayRate: "" },
    mondayHourlyRates: [],
    tuesdayHourlyRates: [],
    wednesdayHourlyRates: [],
    thursdayHourlyRates: [],
    fridayHourlyRates: [],
    saturdayHourlyRates: [],
    sundayHourlyRates: [],
    cleaningFee: "",
    minBookingHours: "2",
    pricingComment: "",
    // Step 8 fields
    rules: "",
    cancellationPolicy: "",
    customPolicy_atLeast: "",
    customPolicy_lessThan: "",
    allowRescheduling: false,
    rescheduleMonths: "3",
  });

  const handleSubmit = () => {
    // Save final data to localStorage
    const submissionData = {
      ...formData,
      submittedAt: new Date().toISOString(),
      status: "submitted",
    };

    localStorage.setItem("venueFormData", JSON.stringify(formData));
    localStorage.setItem("venueSubmission", JSON.stringify(submissionData));

    console.log("Form submitted:", submissionData);

    // Show success message
    alert("Venue submitted successfully! Redirecting to dashboard...");

    // Redirect to dashboard
    window.location.href = "/dashboard";
  };
  // const handleSubmit = () => {
  //   localStorage.setItem("venueFormData", JSON.stringify(formData));
  //   localStorage.setItem(
  //     "venueSubmission",
  //     JSON.stringify({
  //       ...formData,
  //       submittedAt: new Date().toISOString(),
  //       status: "submitted",
  //     })
  //   );
  // };

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
            nextStep={nextStep}
            // Add other props needed for Step2
          />
        );
      case 3:
        return (
          <Step3
            formData={formData}
            handleChange={handleChange}
            prevStep={prevStep}
            nextStep={nextStep}

            // Add other props needed for Step2
          />
        );
      case 4:
        return (
          <Step4
            formData={formData}
            handleChange={handleChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 5:
        return (
          <Step5
            formData={formData}
            handleChange={handleChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 6:
        return (
          <Step6
            formData={formData}
            handleChange={handleChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 7:
        return (
          <Step7
            formData={formData}
            handleChange={handleChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 8:
        return (
          <Step8
            formData={formData}
            handleChange={handleChange}
            prevStep={prevStep}
            onSubmit={handleSubmit}
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
