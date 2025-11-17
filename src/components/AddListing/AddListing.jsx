// src/components/AddListing/AddListing.jsx
import { useState, useEffect } from "react"; // Add useEffect import
import { useVenue } from "../../contexts/VenueContext";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";
import Step5 from "./Steps/Step5";
import Step6 from "./Steps/Step6";
import Step7 from "./Steps/Step7";
import Step8 from "./Steps/Step8";
// import "../../styles/Add-listing.css";
import Header from "../Header";

const AddListing = () => {
  const { addVenue, updateVenue } = useVenue(); // Add updateVenue
  const [currentStep, setCurrentStep] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editingVenueId, setEditingVenueId] = useState(null);

  const [formData, setFormData] = useState({
    venueName: "",
    venueSize: "",
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

  // Check if we're in edit mode
  useEffect(() => {
    const editing = localStorage.getItem("isEditing") === "true";
    const venueId = localStorage.getItem("editingVenueId");
    const venueToEdit = localStorage.getItem("venueToEdit");

    if (editing && venueId && venueToEdit) {
      setIsEditing(true);
      setEditingVenueId(parseInt(venueId));
      setFormData(JSON.parse(venueToEdit));
    }
  }, []);

  const handleSubmit = () => {
    if (isEditing && editingVenueId) {
      // Update existing venue
      updateVenue(editingVenueId, formData);
      alert("Venue updated successfully!");
    } else {
      // Add new venue
      addVenue(formData);
      const existingVenues = JSON.parse(
        localStorage.getItem("venueSubmissions") || "[]"
      );

      const newVenue = {
        ...formData,
        id: Date.now(),
        submittedAt: new Date().toISOString(),
        status: "submitted",
      };

      const updatedVenues = [...existingVenues, newVenue];
      localStorage.setItem("venueSubmissions", JSON.stringify(updatedVenues));
      localStorage.setItem("venueFormData", JSON.stringify(formData));

      console.log("Venue submitted:", newVenue);
      console.log("Total venues:", updatedVenues.length);
    }

    // Clear editing state
    localStorage.removeItem("isEditing");
    localStorage.removeItem("editingVenueId");
    localStorage.removeItem("venueToEdit");

    window.location.href = "/dashboard";
  };

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
    const commonProps = {
      formData,
      handleChange,
      prevStep,
      nextStep,
      isEditing,
    };

    switch (currentStep) {
      case 1:
        return (
          <Step1
            {...commonProps}
            handleVenueTypeToggle={handleVenueTypeToggle}
          />
        );
      case 2:
        return <Step2 {...commonProps} />;
      case 3:
        return <Step3 {...commonProps} />;
      case 4:
        return <Step4 {...commonProps} />;
      case 5:
        return <Step5 {...commonProps} />;
      case 6:
        return <Step6 {...commonProps} />;
      case 7:
        return <Step7 {...commonProps} />;
      case 8:
        return (
          <Step8
            {...commonProps}
            onSubmit={handleSubmit}
            isEditing={isEditing}
          />
        );
      default:
        return (
          <Step1
            {...commonProps}
            handleVenueTypeToggle={handleVenueTypeToggle}
          />
        );
    }
  };

  return (
    <>
      <Header />
      <div className="add-listing-container">
        {/* Show edit mode header */}
        {isEditing && (
          <div className="edit-mode-header">
            <h3> Editing Venue: {formData.venueName || "Unnamed Venue"}</h3>
            <p>
              You are currently editing this venue. Changes will be saved when
              you submit.
            </p>
          </div>
        )}

        <h1>{isEditing ? "Edit Venue" : "Add New Venue"}</h1>

        {renderStep()}
      </div>
    </>
  );
};

export default AddListing;
