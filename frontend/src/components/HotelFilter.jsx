import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FilterButton } from "./FilterButton";
import { FilterContent } from "./FilterContent";
import { filterHotels } from "../features/hotels/hotelsAPI";

export const HotelFilter = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  // Initialize wifi and furnished as booleans (false) for consistency
  const [filters, setFilters] = useState({
    roomType: "",   // e.g. "1BHK", "2BHK", "3BHK", or "Single Room"
    bed: "",        // e.g. "1Bed", "2Bed", "3Bed"
    wifi: false,    // Changed from null to false
    furnished: false, // Changed from null to false
    maxPrice: 10000, // Default max price
  });

  // Check if any filters are active
  const hasActiveFilters =
    !!filters.roomType ||
    !!filters.bed ||
    filters.wifi ||
    filters.furnished ||
    filters.maxPrice !== 10000;

  // Update local state with partial changes
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Clear all filters
  const clearFilters = () => {
    const defaultFilters = {
      roomType: "",
      bed: "",
      wifi: false,
      furnished: false,
      maxPrice: 10000,
    };
    setFilters(defaultFilters);

    // Dispatch empty filters to show all hotels
    dispatch(filterHotels({}));
  };

  // Apply filters to the back-end
  const applyFilters = () => {
    // Convert our booleans to what the API expects
    const apiFilters = {
      room: filters.roomType || undefined,
      bed: filters.bed || undefined,
      wifi: filters.wifi ? "Yes" : undefined,
      furnished: filters.furnished ? "Yes" : undefined,
      maxPrice: filters.maxPrice || undefined,
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
