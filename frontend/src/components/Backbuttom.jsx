import React from 'react';
import { ArrowLeftCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function BackButton() {
  return (
    <div className="mb-8 flex items-center">
      <Link
        to="/"
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-gray-800 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
        aria-label="Go back to the home page"
      >
        <ArrowLeftCircle className="h-6 w-6" /> 
        <span className="font-semibold">Back</span>
      </Link>
    </div>
  );
}