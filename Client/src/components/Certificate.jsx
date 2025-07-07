import React from "react";
import { useLocation } from "react-router-dom";
import certificate from "../assets/certificate.jpg";

const Certificate = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-green-50 py-12 px-4 min-h-screen flex flex-col items-center justify-start">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-4xl p-6">
        <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden border border-gray-300">
          <img
            src={certificate}
            alt="Certificate"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex justify-center items-center mt-10">
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 bg-[#01B157] text-white px-16 py-4 rounded-xl shadow-lg hover:bg-green-600 transition-all duration-200"
          >
            <span className="text-lg font-medium">Print</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 9V4h12v5M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v7H6v-7z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
