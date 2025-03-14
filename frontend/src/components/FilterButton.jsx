import React from "react";
import { SlidersHorizontal } from "lucide-react";

export const FilterButton = ({ onClick, hasActiveFilters }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-md shadow-md transition duration-300 ml-auto ${
        hasActiveFilters
          ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-gray-800"
          : "bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-gray-800"
      }`}
    >
      <SlidersHorizontal size={18} className="mr-1" />
      <span className="font-medium text-sm">Filters</span>
      {hasActiveFilters && (
        <span className="w-2 h-2 rounded-full bg-white ml-1"></span>
      )}
    </button>
  );
};