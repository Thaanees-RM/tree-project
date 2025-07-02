import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const JoinFormStep3 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state) {
      setFormData(location.state);
    } else {
      const savedStep1 = JSON.parse(localStorage.getItem("joinFormData") || "{}");
      const savedStep2 = JSON.parse(localStorage.getItem("joinFormStep2Data") || "{}");

      if (savedStep1.firstName && savedStep1.email && savedStep2.imagePreview) {
        setFormData({ ...savedStep1, ...savedStep2 });
      } else {
        setErrors({ form: "Missing required data from previous steps. Please start over." });
      }
    }
  }, [location.state]);

  const handleSubmit = async () => {
    if (errors.form || !formData) return;

    setIsLoading(true);
    try {
      const certificateData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        tree: formData.tree,
        location: formData.location,
        image: formData.imagePreview,
      };

      localStorage.setItem("joinFormSubmissionData", JSON.stringify(certificateData));
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
    if (!formData) return;
    navigate("/certificate", {
      state: {
        name: `${formData.firstName} ${formData.lastName}`,
        tree: formData.tree,
        location: formData.location,
        image: formData.imagePreview,
      },
    });
  };

  const steps = [
    { label: "Enter details", active: false },
    { label: "Upload Picture", active: false },
    { label: "Submit", active: true },
  ];

  let content;

  if (errors.form) {
    content = (
      <div className="mt-2 p-3 border border-red-500 bg-white text-red-500 text-sm text-center rounded-md">
        {errors.form}
      </div>
    );
  } else if (!submitted && formData) {
    const name = `${formData.firstName} ${formData.lastName}`;
    content = (
      <>
        {/* Info Display */}
        <div className="text-sm sm:text-base leading-7 text-gray-800 mb-6 space-y-1 px-2 sm:px-4">
          <p><span className="font-semibold">Name :</span> {name}</p>
          <p><span className="font-semibold">Email :</span> {formData.email}</p>
          <p><span className="font-semibold">Tree (planted) :</span> {formData.tree}</p>
          <p><span className="font-semibold">Location :</span> {formData.location}</p>
        </div>

        {/* Uploaded Image */}
        <div className="flex flex-col items-center gap-2 mb-6">
          {formData.imagePreview ? (
            <img
              src={formData.imagePreview}
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

        {/* Note */}
        <p className="text-sm text-gray-600 px-4 mb-6 text-center">
          <strong>Note:</strong> Your name will appear on your certificate.
        </p>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className={`w-full py-3 text-sm sm:text-base rounded-md font-semibold transition ${
            isLoading
              ? "bg-green-300 text-white opacity-50 cursor-not-allowed"
              : "bg-[#01B157] text-white hover:bg-green-700"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </>
    );
  } else if (submitted) {
    content = (
      <div className="flex flex-col items-center justify-center text-center py-12">
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
          className="w-full py-3 text-sm sm:text-base bg-[#01B157] text-white rounded-md font-semibold hover:bg-green-700 transition"
          onClick={handleGetCertificate}
        >
          Get Certificate
        </button>
      </div>
    );
  }

  return (
    <div className="bg-green-50 py-10 px-4 sm:py-14 sm:px-6 min-h-screen flex flex-col items-center justify-start">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-2xl p-5 sm:p-8">
        {/* Step Indicator */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`w-full sm:w-auto text-center py-2 px-3 rounded-full font-medium text-sm sm:text-base ${
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
