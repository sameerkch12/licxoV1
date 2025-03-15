import { useState } from "react";
import { useDispatch } from "react-redux";
import { MapPin, Search, X, SlidersHorizontal } from "lucide-react";
import { filterHotels, findNearestHotels } from "../features/hotels/hotelsAPI";
import GooglePlacesAutocomplete from "./GooglePlacesAutocomplete";
import { HotelFilter } from "./HotelFilter";

const SearchFilterDistrict = () => {
  const [locationStatus, setLocationStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useState({
    location: {
      latitude: null,
      longitude: null,
    },
  });

  const dispatch = useDispatch();

  const getLocation = () => {
    setLocationStatus("Fetching...");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          setLocationStatus(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);

          setSearchParams((prev) => ({
            ...prev,
            location: { latitude, longitude },
          }));

          // Reverse geocoding API call using OpenStreetMap Nominatim
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          )
            .then((response) => response.json())
            .then((data) => {
              const address = data.address || {};
              const city =
                address.city || address.town || address.village || "";
              console.log("Reverse geocoding result:", data);
              setSearchQuery(city);
            })
            .catch((error) => {
              console.error("Error during reverse geocoding:", error);
            });
        },
        (error) => {
          console.error("Error fetching location:", error);
          setLocationStatus(`Error: ${error.message}`);
          alert("Error fetching location: " + error.message);
        }
      );
    } else {
      setLocationStatus("Not supported");
      alert("Geolocation is not supported by this browser.");
    }
  };

  const clearLocation = () => {
    setLocationStatus("");
    setSearchParams((prev) => ({
      ...prev,
      location: { latitude: null, longitude: null },
    }));
    setSearchQuery("");
  };

  const handleSearch = () => {
    const searchData = {
      ...searchParams,
      query: searchQuery,
    };

    console.log("Searching with parameters:", searchData);

    if (searchData.location.latitude && searchData.location.longitude) {
      dispatch(findNearestHotels(searchData.location));
    } else {
      dispatch(filterHotels(searchData));
    }
  };

  return (
    <div>
      {/* Desktop View */}
      <div className="bg-gradient-to-r bg-gray-800 px-4 py-8 shadow-lg hidden md:block">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl p-6 border border-blue-200">
            <div className="mb-4 relative">
              <div className="relative flex items-center">
                <Search className="absolute left-3 text-gray-400" size={18} />
                <div className="w-full">
                  <GooglePlacesAutocomplete
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    setSearchParams={setSearchParams}
                  />
                </div>

                {searchQuery && (
                  <button
                    onClick={clearLocation}
                    className="absolute right-3 text-gray-500 hover:text-gray-700"
                  >
                    <X size={14} />
                  </button>
                )}

                {locationStatus ? (
                  <div className="absolute right-3 flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs">
                    <MapPin size={14} className="mr-1" />
                    <span className="mr-1">{locationStatus}</span>
                    <button
                      onClick={clearLocation}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={getLocation}
                    className="absolute right-3 text-white bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-gray-800 text-sm flex items-center px-3 py-1 rounded-md shadow-lg transition duration-300"
                  >
                    <MapPin size={16} className="mr-1" />
                    <span>Near Me</span>
                  </button>
                )}
              </div>
            </div>

            {/* Filter and Search Buttons Side by Side */}
            <div className="flex gap-3 mb-4">
              {/* Search Button - 90% width */}
              <button
                onClick={handleSearch}
                className="w-[95%] py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold rounded-lg transition-all shadow-md flex items-center justify-center hover:opacity-90"
              >
                <Search className="mr-2" size={18} />
                Search Rooms
              </button>

              {/* Filter Button - 10% width */}
              <div className="w-[5%]">
                <HotelFilter />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden bg-gradient-to-r from-gray-800 to-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mt-12 mb-4 text-white">
            {/* Heading */}
          </h2>

          <div className="bg-white rounded-xl shadow-xl p-4 border border-blue-200">
            <div className="mb-4 relative">
              <div className="relative flex items-center">
                <Search className="absolute left-3 text-gray-400" size={18} />
                <div className="w-full">
                  <GooglePlacesAutocomplete
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    setSearchParams={setSearchParams}
                  />
                </div>

                {searchQuery && (
                  <button
                    onClick={clearLocation}
                    className="absolute right-3 text-gray-500 hover:text-gray-700"
                  >
                    <X size={14} />
                  </button>
                )}

                {locationStatus ? (
                  <div className="absolute right-3 flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs">
                    <MapPin size={14} className="mr-1" />
                    <span className="mr-1 max-w-[80px] truncate">
                      {locationStatus}
                    </span>
                    <button
                      onClick={clearLocation}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={getLocation}
                    className="absolute right-3 text-white bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-gray-800 text-xs flex items-center px-2 py-1 rounded-md shadow-md transition duration-300"
                  >
                    <MapPin size={14} className="mr-1" />
                    <span>Near Me</span>
                  </button>
                )}
              </div>
            </div>

            {/* Filter and Search Buttons Side by Side */}
            <div className="flex gap-3 mb-4">
              {/* Search Button - 99% width with reduced height */}
              <button
                onClick={handleSearch}
                className="w-[99%] py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold rounded-lg transition-all shadow-md flex items-center justify-center hover:opacity-90"
              >
                <Search className="mr-2" size={18} />
                Search Rooms
              </button>

              {/* Filter Button - 30% width */}
              <div className="w-[30%]">
                <HotelFilter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterDistrict;
