import React from 'react';
import { ArrowLeftCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Previous page pe le jayega
  };

  return (
    <div className="mb-8 flex items-center">
      <button
        onClick={handleBack}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-gray-800 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
        aria-label="Go back"
      >
        <ArrowLeftCircle className="h-6 w-6" /> 
        <span className="font-semibold">Back</span>
      </button>
    </div>
  );
}
