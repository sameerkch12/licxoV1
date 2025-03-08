import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { createHotel } from "../features/hotels/hotelsAPI";
import {
  Building2,
  MapPin,
  Wifi,
  Bed,
  Phone,
  Home,
  IndianRupee,
  Upload,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import PlacesAutocomplete from "react-places-autocomplete";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";


const token = localStorage.getItem("token");
let userPhone = null;

if (token) {
  try {
    const decodedToken = jwtDecode(token);
    userPhone = decodedToken.phoneNumber.replace(/^\+91/, "");
  } catch (err) {
    console.error("Invalid token:", err);
  }
}

const AddHotels = () => {
  const [hotel, setHotel] = useState({
    name: "",
    phone: userPhone || "",
    address1: "",
    district: "",
    state: "",
    bed: "none",
    price: "",
    room: "",
    wifi: "No",
    furnished: "No",
    latitude: null,
    longitude: null,
  });
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();



  const validateForm = () => {
    const newErrors = {};
    if (!hotel.name) newErrors.name = "Hotel name is required";
    if (!hotel.phone) newErrors.phone = "Contact number is required";
    else if (!/^\d{10}$/.test(hotel.phone))
      newErrors.phone = "Please enter a valid 10-digit phone number";
    if (!hotel.address1) newErrors.address1 = "Address Line 1 is required";
    if (!hotel.district) newErrors.district = "District is required";
    if (!hotel.state) newErrors.state = "State is required";
    if (!hotel.price) newErrors.price = "Price is required";
    else if (Number(hotel.price) <= 0)
      newErrors.price = "Price must be greater than 0";
    if (!hotel.room || hotel.room === "Select Room Type")
      newErrors.room = "Please select a room type";
    if (images.length === 0) newErrors.images = "At least one image is required";
    if (hotel.latitude === null || hotel.longitude === null) {
      newErrors.location =
        "Please use the 'Use My Location' button to set your location";
    }
    return newErrors;
  };

  // Generic change handler for normal input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Change handler for PlacesAutocomplete fields
  const handlePlacesChange = (field, value) => {
    setHotel((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages(selectedFiles);
      const urls = selectedFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
      if (errors.images) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.images;
          return newErrors;
        });
      }
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setHotel((prev) => ({ ...prev, latitude, longitude }));
          if (errors.location) {
            setErrors((prev) => {
              const newErrors = { ...prev };
              delete newErrors.location;
              return newErrors;
            });
          }
          // Show success toast for location retrieval
          const toast = document.createElement("div");
          toast.className =
            "fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md";
          toast.innerHTML =
            '<div class="flex items-center"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Location retrieved successfully!</div>';
          document.body.appendChild(toast);
          setTimeout(() => {
            document.body.removeChild(toast);
          }, 3000);
        },
        (error) => {
          console.error("Error getting location:", error);
          setErrors((prev) => ({
            ...prev,
            location:
              "Unable to retrieve location. Please try again or enter manually.",
          }));
        }
      );
    } else {
      setErrors((prev) => ({
        ...prev,
        location: "Geolocation is not supported by this browser.",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      const firstErrorField = Object.keys(formErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    setLoading(true);
    try {
      await dispatch(createHotel({ hotel, images }));
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/");
        setHotel({
          name: "",
          phone: "",
          address1: "",
          district: "",
          state: "",
          bed: "",
          price: "",
          room: "",
          wifi: "No",
          furnished: "No",
          latitude: null,
          longitude: null,
        });
        setImages([]);
        setPreviewUrls([]);
        setErrors({});
      }, 2000);
    } catch (error) {
      console.error("Error adding hotel:", error.message);
      setErrors((prev) => ({
        ...prev,
        general: `Error adding hotel: ${
          error.response?.data?.msg || error.message
        }`,
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
    
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl transform transition-all">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Hotel Added Successfully!
              </h3>
              <p className="text-gray-600 mb-6">
                Your hotel "{hotel.name}" has been added to the system.
              </p>
              <p className="text-sm text-gray-500">
                Redirecting to home page...
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center">
          <Link
            to="/"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Hotels</span>
          </Link>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8">
            <div className="flex items-center">
              <Building2 className="h-10 w-10 text-white mr-3" />
              <h2 className="text-3xl font-bold text-white">Add Your Rental Room</h2>
            </div>
            <p className="mt-2 text-blue-100">
              Fill in the details to add a new hotel to your collection
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-8">
            {loading && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-center text-blue-600 font-medium flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-blue-600"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing your request...
                </p>
              </div>
            )}

            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg">
                <p className="text-center text-red-600">{errors.general}</p>
              </div>
            )}

            {/* Input Fields Group */}
            <div className="grid grid-cols-1 gap-6">
              {/* Hotel Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hotel Name <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute left-0 pl-3 flex items-center pointer-events-none top-1/2 transform -translate-y-1/2">
                    <Building2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Hotel Name"
                    value={hotel.name}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.name
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    } rounded-lg`}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute left-0 pl-3 flex items-center pointer-events-none top-1/2 transform -translate-y-1/2">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter 10-digit number"
                    value={hotel.phone}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.phone
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    } rounded-lg`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* Price per Night */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price per Night (₹){" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute left-0 pl-3 flex items-center pointer-events-none top-1/2 transform -translate-y-1/2">
                    <IndianRupee className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="price"
                    placeholder="Enter Price in ₹"
                    value={hotel.price}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.price
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    } rounded-lg`}
                  />
                </div>
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute left-0 pl-3 flex items-center pointer-events-none top-1/2 transform -translate-y-1/2">
                    <Home className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="address1"
                    placeholder="Enter Address Line 1"
                    value={hotel.address1}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.address1
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    } rounded-lg`}
                  />
                </div>
                {errors.address1 && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.address1}
                  </p>
                )}
              </div>

              {/* District with Places Autocomplete */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  District <span className="text-red-500">*</span>
                </label>
                <PlacesAutocomplete
                  value={hotel.district}
                  onChange={(value) =>
                    handlePlacesChange("district", value)
                  }
                  onSelect={(address) =>
                    handlePlacesChange("district", address)
                  }
                  searchOptions={{ types: ["(regions)"] }}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading: loadingDistrict,
                  }) => (
                    <div className="relative">
                      <input
                        {...getInputProps({
                          placeholder: "Enter District",
                          name: "district",
                        })}
                        className={`block w-full px-3 py-3 border ${
                          errors.district
                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        } rounded-lg`}
                      />
                      {suggestions.length > 0 && (
                        <div className="absolute left-0 right-0 bg-white border border-gray-300 z-10">
                          {loadingDistrict && (
                            <div className="p-2 text-gray-500">Loading...</div>
                          )}
                          {suggestions.map((suggestion, index) => {
                            const style = suggestion.active
                              ? { backgroundColor: "#e0e0e0", cursor: "pointer" }
                              : { backgroundColor: "#fff", cursor: "pointer" };
                            return (
                              <div
                                key={index}
                                {...getSuggestionItemProps(suggestion, {
                                  style,
                                })}
                                className="p-2"
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </PlacesAutocomplete>
                {errors.district && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.district}
                  </p>
                )}
              </div>

              {/* State with Places Autocomplete */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <PlacesAutocomplete
                  value={hotel.state}
                  onChange={(value) => handlePlacesChange("state", value)}
                  onSelect={(address) => handlePlacesChange("state", address)}
                  searchOptions={{ types: ["(regions)"] }}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading: loadingState,
                  }) => (
                    <div className="relative">
                      <input
                        {...getInputProps({
                          placeholder: "Enter State",
                          name: "state",
                        })}
                        className={`block w-full px-3 py-3 border ${
                          errors.state
                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        } rounded-lg`}
                      />
                      {suggestions.length > 0 && (
                        <div className="absolute left-0 right-0 bg-white border border-gray-300 z-10">
                          {loadingState && (
                            <div className="p-2 text-gray-500">Loading...</div>
                          )}
                          {suggestions.map((suggestion, index) => {
                            const style = suggestion.active
                              ? { backgroundColor: "#e0e0e0", cursor: "pointer" }
                              : { backgroundColor: "#fff", cursor: "pointer" };
                            return (
                              <div
                                key={index}
                                {...getSuggestionItemProps(suggestion, {
                                  style,
                                })}
                                className="p-2"
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </PlacesAutocomplete>
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                )}
              </div>
            </div>

            {/* Select Boxes Group */}
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Bed */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bed
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute left-0 pl-3 flex items-center pointer-events-none top-1/2 transform -translate-y-1/2">
                    <Bed className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="bed"
                    value={hotel.bed}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="none">None</option>
                    <option value="1Bed">1 Bed</option>
                    <option value="2Bed">2 Beds</option>
                    <option value="3Bed">3 Beds</option>
                  </select>
                </div>
              </div>

              {/* Room Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="room"
                  value={hotel.room}
                  onChange={handleChange}
                  className={`block w-full px-3 py-3 border ${
                    errors.room
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  } rounded-lg`}
                >
                  <option value="Select Room Type">Select Room Type</option>
                  <option value="Single Room">Single Room</option>
                  <option value="1BHK">1BHK</option>
                  <option value="2BHK">2BHK</option>
                </select>
                {errors.room && (
                  <p className="mt-1 text-sm text-red-600">{errors.room}</p>
                )}
              </div>

              {/* WiFi Available */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  WiFi Available
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute left-0 pl-3 flex items-center pointer-events-none top-1/2 transform -translate-y-1/2">
                    <Wifi className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="wifi"
                    value={hotel.wifi}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              {/* Furnished */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Furnished
                </label>
                <select
                  name="furnished"
                  value={hotel.furnished}
                  onChange={handleChange}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            {/* Upload Images */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Images <span className="text-red-500">*</span>
              </label>
              <div
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
                  errors.images
                    ? "border-red-300 border-dashed"
                    : "border-gray-300 border-dashed"
                } rounded-lg`}
              >
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload images</span>
                      <input
                        id="file-upload"
                        name="images"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              {errors.images && (
                <p className="mt-1 text-sm text-red-600">{errors.images}</p>
              )}

              {previewUrls.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Selected Images:
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {previewUrls.map((url, index) => (
                      <div
                        key={index}
                        className="relative h-24 rounded-md overflow-hidden"
                      >
                        <img
                          src={url}
                          alt={`Preview ${index}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={getLocation}
                className="flex-1 flex justify-center items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <MapPin className="h-5 w-5 mr-2" />
                Use My Location
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex justify-center items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <Building2 className="h-5 w-5 mr-2" />
                {loading ? "Creating..." : "Create Hotel"}
              </button>
            </div>

            {errors.location && (
              <div className="mt-4 p-3 bg-red-50 rounded-lg">
                <p className="text-sm text-red-600 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {errors.location}
                </p>
              </div>
            )}

            <div className="mt-6 text-xs text-gray-500">
              <p>
                Fields marked with <span className="text-red-500">*</span> are
                required
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHotels;
