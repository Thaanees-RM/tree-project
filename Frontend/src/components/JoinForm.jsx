import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    tree: "",
    location: "",
    acceptedTerms: false,
    subscribe: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    { label: "Enter details", active: true },
    { label: "Upload Picture", active: false },
    { label: "Submit", active: false },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      localStorage.setItem("joinFormData", JSON.stringify(formData));
      await new Promise((resolve) => setTimeout(resolve, 500));
      navigate("/join/upload", { state: formData });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-green-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-5 sm:p-8">
        {/* Step Indicator */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`w-full sm:w-auto text-center py-2 px-3 rounded-full font-medium text-sm sm:text-base ${
                step.active ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500"
              }`}
            >
              {index + 1}. {step.label}
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">First Name*</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={validateForm}
              aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
              className={`w-full border ${errors.firstName ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-green-600 transition`}
              placeholder="First name"
            />
            {errors.firstName && (
              <p id="firstName-error" className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Last Name*</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={validateForm}
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
              className={`w-full border ${errors.lastName ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-green-600 transition`}
              placeholder="Last name"
            />
            {errors.lastName && (
              <p id="lastName-error" className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Email*</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={validateForm}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`w-full border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-green-600 transition`}
              placeholder="Email"
            />
            {errors.email && (
              <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Tree */}
          <div>
            <label htmlFor="tree" className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Tree (planted)*</label>
            <input
              id="tree"
              type="text"
              name="tree"
              value={formData.tree}
              onChange={handleChange}
              onBlur={validateForm}
              aria-invalid={!!errors.tree}
              aria-describedby={errors.tree ? "tree-error" : undefined}
              className={`w-full border ${errors.tree ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-green-600 transition`}
              placeholder="e.g., Jackfruit"
            />
            {errors.tree && (
              <p id="tree-error" className="text-red-500 text-sm mt-1">{errors.tree}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Location*</label>
            <input
              id="location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              onBlur={validateForm}
              aria-invalid={!!errors.location}
              aria-describedby={errors.location ? "location-error" : undefined}
              className={`w-full border ${errors.location ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-green-600 transition`}
              placeholder="e.g., Colombo"
            />
            {errors.location && (
              <p id="location-error" className="text-red-500 text-sm mt-1">{errors.location}</p>
            )}
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="acceptedTerms"
                checked={formData.acceptedTerms}
                onChange={handleChange}
                className="mr-2 h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-600"
                aria-describedby={errors.acceptedTerms ? "acceptedTerms-error" : undefined}
              />
              <span className="text-sm sm:text-base text-gray-700">I accept the Terms & Conditions</span>
            </label>
            {errors.acceptedTerms && (
              <p id="acceptedTerms-error" className="text-red-500 text-sm mt-1">{errors.acceptedTerms}</p>
            )}

            <label className="flex items-center">
              <input
                type="checkbox"
                name="subscribe"
                checked={formData.subscribe}
                onChange={handleChange}
                className="mr-2 h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-600"
              />
              <span className="text-sm sm:text-base text-gray-700">Subscribe for future updates</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !formData.acceptedTerms}
            className={`w-full py-3 text-sm sm:text-base font-semibold text-white rounded-md transition ${
              isLoading || !formData.acceptedTerms
                ? "bg-green-600 opacity-50 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isLoading ? "Processing..." : "Next"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinForm;
