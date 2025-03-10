import React from "react";
import { SlidersHorizontal } from "lucide-react";

export const FilterButton = ({ onClick, hasActiveFilters }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all shadow-md ml-auto ${
        hasActiveFilters
          ? "bg-black text-white"
          : "bg-white text-gray-700 hover:bg-gray-50"
      }`}
    >
      <SlidersHorizontal size={18} />
      <span className="font-medium text-sm">Filters</span>
      {hasActiveFilters && (
        <span className="w-2 h-2 rounded-full bg-white ml-1"></span>
      )}
    </button>
  );
};
