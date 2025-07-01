import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const JoinFormStep3 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Step 1 and 2 data from location.state
  const {
    firstName = "Shavon",
    lastName = "Fernando",
    email = "shavon1234@gmail.com",
    tree = "Jack Tree",
    location: locationText = "Colombo",
    imagePreview, // from Step 2
  } = location.state || {};

  const name = `${firstName} ${lastName}`;

  // Validate required data
  useEffect(() => {
    if (!firstName || !email) {
      setErrors({ form: "Missing required data from previous steps. Please start over." });
    }
  }, [firstName, email]);

  const handleSubmit = async () => {
    if (errors.form) return;

    setIsLoading(true);
    try {
      // Prepare submission data
      const certificateData = {
        name,
        email,
        tree,
        location: locationText,
        image: imagePreview,
      };

      // Persist data to localStorage (remove if using backend)
      localStorage.setItem("joinFormSubmissionData", JSON.stringify(certificateData));

      // Simulate backend submission (replace with API call if needed)
      await new Promise((resolve) => setTimeout(resolve, 500));

      setSubmitted(true);
      setErrors({});
    } catch (err) {
      console.error("Form submission failed:", err);
      setErrors({ form: "Submission failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetCertificate = () => {
    navigate("/certificate", {
      state: {
        name,
        tree,
        location: locationText,
        image: imagePreview,
      },
    });
  };

  // Step indicator data
  const steps = [
    { label: "Enter details", active: false },
    { label: "Upload Picture", active: false },
    { label: "Submit", active: true },
  ];

  let content;
  if (errors.form) {
    content = (
      <div className="mt-2 p-2 border border-red-500 bg-white text-red-500 text-sm text-center rounded-md">
        {errors.form}
      </div>
    );
  } else if (!submitted) {
    content = (
      <>
        {/* User Info */}
        <div className="text-sm sm:text-base leading-7 text-gray-800 mb-6 space-y-1 px-4">
          <p><span className="font-semibold">Name :</span> {name}</p>
          <p><span className="font-semibold">Email :</span> {email}</p>
          <p><span className="font-semibold">Tree (planted) :</span> {tree}</p>
          <p><span className="font-semibold">Location :</span> {locationText}</p>
        </div>

        {/* Uploaded Image */}
        <div className="flex flex-col items-center gap-2 mb-6">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Uploaded preview"
              className="w-24 h-24 rounded-md object-cover"
              aria-label="Uploaded image"
            />
          ) : (
            <div
              className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center text-sm text-gray-500"
              aria-label="No image uploaded"
            >
              No Image
            </div>
          )}
          <p className="text-[#01B157] font-medium">Verified</p>
        </div>

        <p className="text-sm text-gray-600 px-4 mb-6 text-center">
          <strong>Note:</strong> Your name will appear on your certificate.
        </p>

        <button
          onClick={handleSubmit}
          className={`w-full bg-[#01B157] text-white py-2 rounded-md font-semibold hover:bg-green-700 transition ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </>
    );
  } else {
    content = (
      <div className="flex flex-col items-center justify-center text-center py-12">
        {/* Custom Checkmark Icon */}
        <div className="w-24 h-24 rounded-full bg-[#94e3bb] flex items-center justify-center mb-6">
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Successfully Submitted!</h2>
        <button
          className="w-full bg-[#01B157] text-white py-2 rounded-md font-semibold hover:bg-green-700 transition"
          onClick={handleGetCertificate}
          aria-label="Get certificate"
        >
          Get Certificate
        </button>
      </div>
    );
  }

  return (
    <div className="bg-green-50 py-12 px-4 min-h-screen flex flex-col items-center justify-start">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-2xl p-6">
        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-8 gap-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex-1 text-center py-2 rounded-full font-medium text-sm sm:text-base ${
                step.active ? "bg-[#94e3bb] text-white" : "bg-gray-100 text-gray-500"
              }`}
            >
              {index + 1}. {step.label}
            </div>
          ))}
        </div>
        {content}
      </div>
    </div>
  );
};

export default JoinFormStep3;