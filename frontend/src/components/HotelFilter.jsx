import React, { useState } from "react"
import { FilterButton } from "./FilterButton"
import { FilterContent } from "./FilterContent"
import { useDispatch, useSelector } from "react-redux";
import { filterHotels} from "../features/hotels/hotelsAPI";

export const HotelFilter = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    roomType: [],
    furnished: null,
    wifi: null
  })

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
    // Here you would typically dispatch your filter action
    
     // Convert filters to API format
     const apiFilters = {
  
      room: filters.roomType.join(','),
      wifi: filters.wifi ? 'Yes' : undefined,
      furnished: filters.furnished || undefined,
    };

    // Dispatch the filter action
    dispatch(filterHotels(apiFilters));
    setIsOpen(false);
  }

  return (
    <div className="relative flex justify-end ">
      <FilterButton onClick={() => setIsOpen(!isOpen)} />
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
