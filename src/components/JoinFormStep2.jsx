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

  const userDetails = location.state || {};

  useEffect(() => {
    if (!userDetails.firstName || !userDetails.email) {
      navigate("/join", { replace: true });
    }
  }, [userDetails, navigate]);

  useEffect(() => {
    return () => {
      if (preview) {
        try {
          URL.revokeObjectURL(preview);
        } catch (err) {
          console.warn("Failed to revoke preview URL", err);
        }
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

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(selectedFile.type)) {
      setErrors({ file: "Please upload a JPEG, PNG, or GIF image." });
      setPreview(null);
      setFile(null);
      return;
    }

    if (selectedFile.size > 7 * 1024 * 1024) {
      setErrors({ file: "Image size must be under 7MB." });
      setPreview(null);
      setFile(null);
      return;
    }

    if (preview) {
      try {
        URL.revokeObjectURL(preview);
      } catch (err) {
        console.warn("Failed to revoke previous URL", err);
      }
    }

    const imageUrl = URL.createObjectURL(selectedFile);
    setPreview(imageUrl);
    setFile(selectedFile);
    setErrors({});
  };

  const handleRemoveImage = () => {
    if (preview) {
      try {
        URL.revokeObjectURL(preview);
      } catch (err) {
        console.warn("Failed to revoke preview URL", err);
      }
    }
    setPreview(null);
    setFile(null);
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleNext = async () => {
    if (!userDetails.firstName || !userDetails.email) {
      setErrors({ form: "Please complete the first step before uploading an image." });
      return;
    }

    if (!file) {
      setErrors({ file: "*The picture should include the member & the tree." });
      return;
    }

    setIsLoading(true);
    try {
      const step2Data = {
        ...userDetails,
        imageFile: file.name,
        imagePreview: preview,
      };
      localStorage.setItem("joinFormStep2Data", JSON.stringify(step2Data));

      await new Promise((resolve) => setTimeout(resolve, 500));

      navigate("/join/submit", { state: step2Data });
    } catch (error) {
      console.error("Error in handleNext:", error);
      setErrors({ form: "An error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { label: "Enter details", active: false },
    { label: "Upload Picture", active: true },
    { label: "Submit", active: false },
  ];

  return (
    <div className="bg-green-50 py-10 px-4 sm:py-14 sm:px-6 min-h-screen flex flex-col items-center justify-start">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-2xl p-5 sm:p-8">
        
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

        {/* Upload Area */}
        <div>
          <button
            type="button"
            className="w-full min-h-[16rem] sm:min-h-[18rem] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer bg-gray-100 hover:bg-gray-200 transition px-2"
            onClick={handleUploadClick}
            aria-label="Upload an image of the member and the tree"
            aria-describedby={errors.file ? "file-error" : undefined}
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview of uploaded member and tree"
                className="max-h-64 object-contain"
              />
            ) : (
              <div className="flex flex-col items-center text-center">
                <FiUpload size={48} className="text-gray-500" />
                <p className="text-gray-500 mt-2 text-sm sm:text-base">
                  Upload an image (JPEG, PNG, GIF, &lt;7MB)
                </p>
              </div>
            )}
          </button>

          <input
            type="file"
            id="fileUpload"
            name="fileUpload"
            accept="image/jpeg,image/png,image/gif"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            aria-label="Upload image file of the tree and member"
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
              className={`mt-2 p-2 bg-white text-red-500 text-sm text-center rounded-md ${
                errors.file === "*The picture should include the member & the tree."
                  ? ""
                  : "border border-red-500"
              }`}
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
          className={`w-full py-3 text-sm sm:text-base font-semibold rounded-md mt-6 transition ${
            isLoading ? "bg-green-300 text-white" : "bg-green-600 text-white hover:bg-green-700"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Next"}
        </button>
      </div>
    </div>
  );
};

export default JoinFormStep2;
