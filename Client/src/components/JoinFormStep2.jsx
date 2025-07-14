import React, { useRef, useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const JoinFormStep2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Step 1 data from location.state
  const userDetails = location.state || {};

  // Step indicator data
  const steps = [
    { label: "Enter details", active: false },
    { label: "Upload Picture", active: true },
    { label: "Submit", active: false },
  ];

  // Cleanup preview URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);  
      }
    };
  }, [preview]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setErrors({ file: "No image selected." });
      setPreview(null);
      setFile(null);
      return;
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(selectedFile.type)) {
      setErrors({ file: "Please upload a JPEG, PNG, or GIF image." });
      setPreview(null);
      setFile(null);
      return;
    }

    // Validate file size (2MB limit)
    if (selectedFile.size > 2 * 1024 * 1024) {
      setErrors({ file: "Image size must be under 2MB." });
      setPreview(null);
      setFile(null);
      return;
    }

    // Revoke previous preview URL
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    // Generate new preview
    const imageUrl = URL.createObjectURL(selectedFile);
    setPreview(imageUrl);
    setFile(selectedFile);
    setErrors({});
  };

  const handleRemoveImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setFile(null);
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleNext = async () => {
    // Validate userDetails from Step 1
    if (!userDetails.firstName || !userDetails.email) {
      setErrors({ form: "Please complete the first step before uploading an image." });
      return;
    }

    // Validate file
    if (!file) {
      setErrors({ file: "*The picture should include the member & the tree." });
      return;
    }

    setIsLoading(true);
    try {
      // Persist data to localStorage
      const step2Data = { ...userDetails, imageFile: file.name, imagePreview: preview };
      localStorage.setItem("joinFormStep2Data", JSON.stringify(step2Data));

      // Simulate async operation (replace with API call if needed)
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Navigate to Step 3
      navigate("/join/submit", { state: step2Data });
    } catch (error) {
      console.error("Error in handleNext:", error);
      setErrors({ form: "An error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#E3FFEF] py-12 px-4 min-h-screen flex flex-col items-center justify-start">
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

        {/* Upload Area */}
        <div>
          <button
            type="button"
            className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer bg-gray-100 hover:bg-gray-200 transition"
            onClick={handleUploadClick}
            aria-label="Upload an image of the member and the tree"
            aria-describedby={errors.file ? "file-error" : undefined}
          >
            {preview ? (
              <img src={preview} alt="Preview of uploaded file" className="h-full object-contain" />
            ) : (
              <div className="flex flex-col items-center">
                <FiUpload size={48} className="text-gray-500" />
                <p className="text-gray-500 mt-2 text-sm">Upload an image (JPEG, PNG, GIF, &lt;2MB)</p>
              </div>
            )}
          </button>
          <input
            type="file"
            accept="image/jpeg,image/png,image/gif"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          {preview && (
            <button
              type="button"
              onClick={handleRemoveImage}
              className="mt-2 text-sm text-red-500 hover:text-red-600 underline"
            >
              Remove Image
            </button>
          )}
          {errors.file && (
            <div
              id="file-error"
              className="mt-2 p-2 border border-red-500 bg-white text-red-500 text-sm text-center rounded-md"
            >
              {errors.file}
            </div>
          )}
          {errors.form && (
            <div className="mt-2 p-2 border border-red-500 bg-white text-red-500 text-sm text-center rounded-md">
              {errors.form}
            </div>
          )}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          className={`w-full py-2 rounded-md font-semibold mt-6 transition ${
            isLoading ? "bg-green-300 text-white" : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {isLoading ? "Processing..." : "Next"}
        </button>
      </div>
    </div>
  );
};

export default JoinFormStep2;