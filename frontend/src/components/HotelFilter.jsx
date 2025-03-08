import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FilterButton } from "./FilterButton";
import { FilterContent } from "./FilterContent";
import { filterHotels } from "../features/hotels/hotelsAPI";

export const HotelFilter = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  // Single-select for roomType & bed, plus wifi/furnished as booleans (or null)
  const [filters, setFilters] = useState({
    roomType: "",   // e.g. "1BHK", "2BHK", "3BHK", or "Single Room"
    bed: "",        // e.g. "1 Bed", "2 Beds", "3 Beds"
    wifi: null,     // true/false/null
    furnished: null // true/false/null
  });

  // Check if any filters are active
  const hasActiveFilters =
    !!filters.roomType || !!filters.bed || filters.wifi || filters.furnished;

  // Update local state with partial changes
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Clear all filters
  const clearFilters = () => {
    const defaultFilters = {
      roomType: "",
      bed: "",
      wifi: null,
      furnished: null
    };
    setFilters(defaultFilters);

    // Dispatch empty filters to show all hotels
    dispatch(filterHotels({}));
  };

  // Apply filters to the back-end
  const applyFilters = () => {
    // Convert our booleans/null to whatever the API expects
    // For example, "Yes" for wifi/furnished if true, else skip the key
    const apiFilters = {
      room: filters.roomType || undefined,
      bed: filters.bed || undefined,
      wifi: filters.wifi ? "Yes" : undefined,
      furnished: filters.furnished ? "Yes" : undefined
    };

    // Remove any falsy/undefined keys
    Object.keys(apiFilters).forEach((key) => {
      if (!apiFilters[key]) {
        delete apiFilters[key];
      }
    });

    dispatch(filterHotels(apiFilters));
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <FilterButton
        onClick={() => setIsOpen(!isOpen)}
        hasActiveFilters={hasActiveFilters}
      />

      {isOpen && (
        <FilterContent
          filters={filters}
          onFilterChange={handleFilterChange}
          onClear={clearFilters}
          onApply={applyFilters}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
