import React from "react";
import { X, Check, Wifi, Home, BedDouble } from "lucide-react";

export const FilterContent = ({
  filters,
  onFilterChange,
  onClear,
  onApply,
  onClose, // Close function for mobile users
}) => {
  return (
    <div className="fixed md:absolute top-0 right-0 h-full md:h-auto w-3/4 md:w-1/3 bg-white p-8 rounded-l-2xl shadow-2xl border border-gray-200 z-50">
      {/* Close Button for Mobile */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 md:hidden"
      >
        <X size={24} />
      </button>

      {/* Room Type */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Room Type</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {["1 BHK", "2 BHK", "3 BHK", "Single Room"].map((type) => (
            <button
              key={type}
              onClick={() => {
                const newRoomTypes = filters.roomType.includes(type)
                  ? filters.roomType.filter((t) => t !== type)
                  : [...filters.roomType, type];
                onFilterChange({ roomType: newRoomTypes });
              }}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                filters.roomType.includes(type)
                  ? "border-black bg-black text-white"
                  : "border-gray-200 hover:border-gray-900 text-gray-900 hover:bg-gray-50"
              }`}
            >
              <BedDouble size={18} />
              <span className="font-medium">{type}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Amenities</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onFilterChange({ furnished: !filters.furnished })}
            className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
              filters.furnished
                ? "border-black bg-black text-white"
                : "border-gray-200 hover:border-gray-900 text-gray-900 hover:bg-gray-50"
            }`}
          >
            <Home size={20} />
            <span className="font-medium">Furnished</span>
            {filters.furnished && <Check size={18} className="ml-auto" />}
          </button>

          <button
            onClick={() => onFilterChange({ wifi: !filters.wifi })}
            className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
              filters.wifi
                ? "border-black bg-black text-white"
                : "border-gray-200 hover:border-gray-900 text-gray-900 hover:bg-gray-50"
            }`}
          >
            <Wifi size={20} />
            <span className="font-medium">WiFi Available</span>
            {filters.wifi && <Check size={18} className="ml-auto" />}
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={onClear}
          className="px-5 py-2.5 text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center gap-2"
        >
          <X size={18} />
          Clear All
        </button>
        <button
          onClick={onApply}
          className="px-5 py-2.5 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors font-medium flex items-center gap-2"
        >
          <Check size={18} />
          Apply Filters
        </button>
      </div>
    </div>
  );
};
