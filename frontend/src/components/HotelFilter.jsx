import React, { useState } from "react"
import { FilterButton } from "./FilterButton"
import { FilterContent } from "./FilterContent"
import { useDispatch } from "react-redux";
import { filterHotels } from "../features/hotels/hotelsAPI";

export const HotelFilter = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    roomType: [],
    furnished: null,
    wifi: null
  })

  // Check if any filters are active
  const hasActiveFilters = filters.roomType.length > 0 || filters.furnished || filters.wifi;

  const handleFilterChange = newFilters => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const clearFilters = () => {
    const defaultFilters = {
      roomType: [],
      furnished: null,
      wifi: null,
    };
    setFilters(defaultFilters);
    dispatch(filterHotels({})); 
  }

  const applyFilters = () => {
    const apiFilters = {
      room: filters.roomType.join(','),
      wifi: filters.wifi ? 'Yes' : undefined,
      furnished: filters.furnished || undefined,
    };

    // Remove empty filters
    Object.keys(apiFilters).forEach(key => 
      !apiFilters[key] && delete apiFilters[key]
    );

    dispatch(filterHotels(apiFilters));
    setIsOpen(false);
  }

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
  )
}