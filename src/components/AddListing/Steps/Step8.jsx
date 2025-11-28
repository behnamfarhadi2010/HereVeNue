// src/components/AddListing/Steps/Step8.jsx
import React, { useState } from "react";
import { useVenue } from "../../../contexts/VenueContext";

const Step8 = ({ formData, handleChange, prevStep, onSubmit }) => {
  const venue = useVenue();

  const [rules, setRules] = useState(formData.rules || "");

  const cancellationPolicies = [
    {
      id: "veryFlexible",
      label: "Very flexible",
      description:
        "Cancellations up to 24 hours from event start time will receive a full refund. Cancellations for events starting within 24 hours are non-refundable.",
    },
    {
      id: "flexible",
      label: "Flexible",
      description:
        "Cancellations 7 days in advance will receive a full refund. Cancellations 7 days to 24 hours in advance will receive a 50% refund. Cancellations for events starting within 24 hours are non-refundable.",
    },
    {
      id: "standard30",
      label: "Standard 30 day",
      description:
        "Cancellations 30 days in advance will receive a full refund. Cancellations 30 days to 7 days in advance will receive a 50% refund. Cancellations for events starting within 7 days are non-refundable.",
    },
    {
      id: "standard60",
      label: "Standard 60 day",
      description:
        "Cancellations 60 days in advance will receive a full refund. Cancellations 60 days to 30 days in advance will receive a 50% refund. Cancellations for events starting within 30 days are non-refundable.",
    },
    {
      id: "custom",
      label: "Custom",
      description: "Custom cancellation policy with specific notice periods.",
    },
    {
      id: "other",
      label: "Other",
      description:
        "None of the cancellation policies can be applied to my venue.",
    },
  ];

  const handleRulesChange = (e) => {
    const value = e.target.value;
    setRules(value);
    handleChange({ target: { name: "rules", value } });
  };

  const handleCancellationPolicyChange = (policyId) => {
    handleChange({ target: { name: "cancellationPolicy", value: policyId } });
  };

  const handleCustomPolicyChange = (field, value) => {
    handleChange({ target: { name: `customPolicy_${field}`, value } });
  };

  const handleReschedulingChange = (e) => {
    handleChange({
      target: { name: "allowRescheduling", value: e.target.checked },
    });
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div className="step8-form">
      <h2>Rules and cancellations</h2>

      {/* Rules Section */}
      <div className="form-group">
        <h3>Rules of the space</h3>
        <p className="form-subtext">
          <strong>Required for online payments</strong>
        </p>
        <p className="form-subtext">
          Include any rules about what your guests can and cannot do in the
          space. Customers will have to accept them when booking the space.
        </p>

        <div className="rules-examples">
          <h4>Example rules:</h4>
          <ul>
            <li>No smoking in the building</li>
            <li>Outside catering is allowed</li>
            <li>No alcohol allowed after 8pm</li>
          </ul>
        </div>

        <div className="rules-dont-include">
          <h4>Do not include:</h4>
          <ul>
            <li>
              Cleaning fee - Basic cleaning is the responsibility of the host.
              If you charge a cleaning fee, you should include it in your
              pricing.
            </li>
            <li>
              Contracts - Do not paste your contract, cancellation policy, or
              liability policy.
            </li>
          </ul>
        </div>

        <div className="form-group">
          <label>Enter rules of your space...</label>
          <textarea
            name="rules"
            value={rules}
            onChange={handleRulesChange}
            placeholder="Example: No smoking, outside catering allowed, no alcohol after 8pm..."
            rows={6}
            required
          />
        </div>
      </div>

      {/* Cancellation Policy */}
      <div className="form-group">
        <h3>Cancellation policy</h3>
        <p className="form-subtext">
          Guests may cancel their booking within 24 hours of the booking
          confirmation (but no later than 48 hours before the event) and receive
          a full refund. Bookings cancelled after 24 hours (or less than 48
          hours before the event) will follow the cancellation policy selected
          below. Cancellations by hosts are always fully refunded.
        </p>

        <div className="cancellation-policies">
          {cancellationPolicies.map((policy) => (
            <div key={policy.id} className="policy-option">
              <label>
                <input
                  type="radio"
                  name="cancellationPolicy"
                  checked={formData.cancellationPolicy === policy.id}
                  onChange={() => handleCancellationPolicyChange(policy.id)}
                />
                <strong>{policy.label}</strong>
              </label>
              <p className="policy-description">{policy.description}</p>

              {policy.id === "custom" &&
                formData.cancellationPolicy === "custom" && (
                  <div className="custom-policy-fields">
                    <div className="form-row">
                      <div className="form-group">
                        <label>At least (days prior to the event)</label>
                        <input
                          type="number"
                          min="1"
                          value={formData.customPolicy_atLeast || ""}
                          onChange={(e) =>
                            handleCustomPolicyChange("atLeast", e.target.value)
                          }
                          placeholder="30"
                        />
                      </div>
                      <div className="form-group">
                        <label>Less than (days prior to the event)</label>
                        <input
                          type="number"
                          min="1"
                          value={formData.customPolicy_lessThan || ""}
                          onChange={(e) =>
                            handleCustomPolicyChange("lessThan", e.target.value)
                          }
                          placeholder="7"
                        />
                      </div>
                    </div>
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>

      {/* Rescheduling Section */}
      <div className="form-group">
        <h3>Rescheduling Policy</h3>
        <div className="checkbox-field">
          <label>
            <input
              type="checkbox"
              name="allowRescheduling"
              checked={formData.allowRescheduling || false}
              onChange={handleReschedulingChange}
            />
            Guests may move the event date of a confirmed booking to another
            date within
            <input
              type="number"
              min="1"
              max="12"
              value={formData.rescheduleMonths || "3"}
              onChange={(e) =>
                handleChange({
                  target: { name: "rescheduleMonths", value: e.target.value },
                })
              }
              className="months-input"
            />
            months from the original date, at no cost.
          </label>
        </div>
      </div>

      {/* Navigation */}
      <div className="form-navigation">
        <button type="button" className="prev-btn" onClick={prevStep}>
          Previous
        </button>
        <button type="button" className="submit-btn" onClick={handleSubmit}>
          Submit Venue
        </button>
      </div>
    </div>
  );
};

export default Step8;
