import React from "react";
import { X, Check, Wifi, Home, BedDouble } from "lucide-react";

export const FilterContent = ({
  filters,
  onFilterChange,
  onClear,
  onApply,
  onClose,
}) => {
  return (
    <>
      {/* Overlay backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Filter modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm max-h-[80vh] overflow-y-auto bg-white p-6 rounded-2xl shadow-2xl border border-gray-200 z-50">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <X size={20} />
        </button>

        {/* Room Type */}
        <div className="mb-6">
          <h3 className="text-base font-semibold mb-3 text-gray-900">Room Type</h3>
          <div className="grid grid-cols-2 gap-2">
            {["1BHK", "2BHK", "3BHK", "Single Room"].map((type) => (
              <button
                key={type}
                onClick={() => {
                  const newRoomTypes = filters.roomType.includes(type)
                    ? filters.roomType.filter((t) => t !== type)
                    : [...filters.roomType, type];
                  onFilterChange({ roomType: newRoomTypes });
                }}
                className={`flex items-center justify-center gap-1.5 p-2 rounded-lg border text-sm transition-all ${
                  filters.roomType.includes(type)
                    ? "border-black bg-black text-white"
                    : "border-gray-200 hover:border-gray-900 text-gray-900 hover:bg-gray-50"
                }`}
              >
                <BedDouble size={16} />
                <span className="font-medium">{type}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h3 className="text-base font-semibold mb-3 text-gray-900">Amenities</h3>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => onFilterChange({ furnished: !filters.furnished })}
              className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                filters.furnished
                  ? "border-black bg-black text-white"
                  : "border-gray-200 hover:border-gray-900 text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Home size={18} />
              <span className="font-medium text-sm">Furnished</span>
              {filters.furnished && <Check size={16} className="ml-auto" />}
            </button>

            <button
              onClick={() => onFilterChange({ wifi: !filters.wifi })}
              className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                filters.wifi
                  ? "border-black bg-black text-white"
                  : "border-gray-200 hover:border-gray-900 text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Wifi size={18} />
              <span className="font-medium text-sm">WiFi Available</span>
              {filters.wifi && <Check size={16} className="ml-auto" />}
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClear}
            className="px-3 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center gap-1.5 text-sm"
          >
            <X size={16} />
            Clear
          </button>
          <button
            onClick={onApply}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors font-medium flex items-center gap-1.5 text-sm"
          >
            <Check size={16} />
            Apply
          </button>
        </div>
      </div>
    </>
  );
};