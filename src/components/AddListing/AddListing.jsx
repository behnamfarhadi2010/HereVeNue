// src/components/AddListing/AddListing.jsx
import { useState } from "react";
import Step1 from "./Steps/Step1";
import "../../styles/add-listing.css";
import Header from "../Header"; // Adjust the import path as necessary

const AddListing = () => {
  const [formData, setFormData] = useState({
    venueName: "",
    venueDescription: "",
    venueTypes: [],
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

  return (
    <>
      <Header />
      <div className="add-listing-container">
        <h1>Add New Venue</h1>
        <Step1
          formData={formData}
          handleChange={handleChange}
          handleVenueTypeToggle={handleVenueTypeToggle}
        />
        {/* <div className="debug-panel">
            <h3>Current Form Data:</h3>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div> */}
      </div>
    </>
  );
};

export default AddListing;
