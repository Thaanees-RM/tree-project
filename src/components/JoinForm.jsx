import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinForm = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    tree: "",
    location: "",
    acceptedTerms: false,
    subscribe: false,
  });

  // Error and loading states
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Step indicator data
  const steps = [
    { label: "Enter details", active: true },
    { label: "Upload Picture", active: false },
    { label: "Submit", active: false },
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for the field being edited
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    else if (formData.firstName.length < 2) newErrors.firstName = "First name must be at least 2 characters.";

    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
    else if (formData.lastName.length < 2) newErrors.lastName = "Last name must be at least 2 characters.";

    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format.";

    if (!formData.tree.trim()) newErrors.tree = "Tree name is required.";
    if (!formData.location.trim()) newErrors.location = "Location is required.";
    if (!formData.acceptedTerms) newErrors.acceptedTerms = "You must accept the Terms & Conditions.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Persist form data to localStorage
      localStorage.setItem("joinFormData", JSON.stringify(formData));
      // Simulate async operation (e.g., API call)
      await new Promise((resolve) => setTimeout(resolve, 500));
      navigate("/join/upload", { state: formData });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-green-50 py-12 px-4 min-h-screen flex flex-col items-center justify-start">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-2xl p-6">
        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-8 gap-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex-1 text-center py-2 rounded-full font-medium text-sm sm:text-base ${
                step.active ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500"
              }`}
            >
              {index + 1}. {step.label}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block font-medium mb-1 text-gray-700">
              First Name*
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={validateForm}
              className={`w-full border ${errors.firstName ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-green-600 transition`}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
            />
            {errors.firstName && (
              <p id="firstName-error" className="text-red-500 text-sm mt-1">
                {errors.firstName}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block font-medium mb-1 text-gray-700">
              Last Name*
            </label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={validateForm}
              className={`w-full border ${errors.lastName ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-green-600 transition`}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
            />
            {errors.lastName && (
              <p id="lastName-error" className="text-red-500 text-sm mt-1">
                {errors.lastName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-medium mb-1 text-gray-700">
              Email*
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              onBlur={validateForm}
              className={`w-full border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-green-600 transition`}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Tree */}
          <div>
            <label htmlFor="tree" className="block font-medium mb-1 text-gray-700">
              Tree (planted)*
            </label>
            <input
              id="tree"
              type="text"
              name="tree"
              placeholder="Jack"
              value={formData.tree}
              onChange={handleChange}
              onBlur={validateForm}
              className={`w-full border ${errors.tree ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-green-600 transition`}
              aria-describedby={errors.tree ? "tree-error" : undefined}
            />
            {errors.tree && (
              <p id="tree-error" className="text-red-500 text-sm mt-1">
                {errors.tree}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block font-medium mb-1 text-gray-700">
              Location*
            </label>
            <input
              id="location"
              type="text"
              name="location"
              placeholder="Colombo"
              value={formData.location}
              onChange={handleChange}
              onBlur={validateForm}
              className={`w-full border ${errors.location ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-green-600 transition`}
              aria-describedby={errors.location ? "location-error" : undefined}
            />
            {errors.location && (
              <p id="location-error" className="text-red-500 text-sm mt-1">
                {errors.location}
              </p>
            )}
          </div>

          {/* Checkboxes */}
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="acceptedTerms"
                checked={formData.acceptedTerms}
                onChange={handleChange}
                className="mr-2 h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-600"
                aria-describedby={errors.acceptedTerms ? "acceptedTerms-error" : undefined}
              />
              <span className="text-gray-700">I have accepted the Terms & Conditions.</span>
            </label>
            {errors.acceptedTerms && (
              <p id="acceptedTerms-error" className="text-red-500 text-sm mt-1">
                {errors.acceptedTerms}
              </p>
            )}
            <label className="flex items-center">
              <input
                type="checkbox"
                name="subscribe"
                checked={formData.subscribe}
                onChange={handleChange}
                className="mr-2 h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-600"
              />
              <span className="text-gray-700">Subscribe for future updates</span>
            </label>
          </div>

          {/* Form-level error */}
          {errors.form && (
            <p className="text-red-500 text-sm mt-2">{errors.form}</p>
          )}

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className={`w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinForm;