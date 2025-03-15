import React from "react";
import { SlidersHorizontal } from "lucide-react";

export const FilterButton = ({ onClick, hasActiveFilters }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-2 py-2 rounded-md shadow-md transition duration-300 ml-auto"
    >
      <SlidersHorizontal size={30} className="text-dark-gray" /> {/* Increase size and apply dark gray color */}
      
      {hasActiveFilters && (
        <span className="w-2 h-2 rounded-full bg-white ml-1"></span>
      )}
    </button>
  );
};
