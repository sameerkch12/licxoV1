import React from "react";
import { SlidersHorizontal } from "lucide-react";

export const FilterButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full hover:bg-gray-900 transition-all shadow-lg ml-auto"
    >
      <SlidersHorizontal size={20} />
      <span className="font-medium">Filters</span>
    </button>
  );
};
