import { useState } from "react";
import { useDispatch } from "react-redux";
import { MapPin, Search, X } from "lucide-react";
import { filterHotels, findNearestHotels } from "../features/hotels/hotelsAPI";
import GooglePlacesAutocomplete from "./GooglePlacesAutocomplete";

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
              const city = address.city || address.town || address.village || "";
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
      <div className="bg-gradient-to-r from-blue-900 to-indigo-800 px-4 py-8 shadow-lg hidden md:block">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">
            Find Your Perfect Room
          </h2>

          <div className="bg-white rounded-xl shadow-xl p-6 border border-blue-200">
            <div className="grid grid-cols-1 gap-5 mb-5">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destination
                </label>
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
                      className="absolute right-3 text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      <MapPin size={16} className="mr-1" />
                      <span>Near Me</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleSearch}
                className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Search className="inline mr-2" size={18} />
                Search Rooms
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden bg-gradient-to-r from-blue-900 to-indigo-800 p-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mt-12 mb-4 text-white">
            Find Your Perfect Room
          </h2>

          <div className="bg-white rounded-xl shadow-xl p-4 border border-blue-200">
            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destination
              </label>
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
                    className="absolute right-3 text-blue-600 hover:text-blue-800 text-xs flex items-center"
                  >
                    <MapPin size={14} className="mr-1" />
                    <span>Near Me</span>
                  </button>
                )}
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md flex items-center justify-center"
            >
              <Search className="mr-2" size={18} />
              Search Rooms
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterDistrict;
