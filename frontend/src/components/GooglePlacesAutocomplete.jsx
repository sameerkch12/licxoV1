import { useState, useEffect, useRef } from "react";

const GooglePlacesAutocomplete = ({ searchQuery, setSearchQuery, setSearchParams }) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!window.google) {
      console.error("Google Maps JavaScript API not loaded.");
      return;
    }

    const autoCompleteInstance = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ["geocode"], // You can change this to "establishment" for businesses
      componentRestrictions: { country: "IN" }, // Restrict to a specific country if needed
    });

    autoCompleteInstance.addListener("place_changed", () => handlePlaceSelect(autoCompleteInstance));
    setAutocomplete(autoCompleteInstance);
  }, []);

  const handlePlaceSelect = (autoCompleteInstance) => {
    const place = autoCompleteInstance.getPlace();
    if (!place.geometry) return;

    const location = {
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
    };

    setSearchQuery(place.formatted_address);
    setSearchParams((prev) => ({
      ...prev,
      location,
    }));
  };

  return (
    <input
      ref={inputRef}
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search for city"
      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  );
};

export default GooglePlacesAutocomplete;
