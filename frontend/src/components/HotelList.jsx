import { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaWifi,
  FaRupeeSign,
  FaBed,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosCall, IoIosHeart } from "react-icons/io";
import { IoCallOutline } from "react-icons/io5";
import { MdMeetingRoom, MdOutlineWifiOff } from "react-icons/md";
import { RiSofaLine } from "react-icons/ri";
import { TbShare3 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllHotels } from "../features/hotels/hotelsAPI";
 

// Custom hook to check if the user is authenticated
const useAuth = () => {
  return !!localStorage.getItem("token");
};

const HotelList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hotels, status, error } = useSelector((state) => state.hotels);
  const [currentIndexes, setCurrentIndexes] = useState({});
  const [modalImage, setModalImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isAuthenticated = useAuth();
  const [hoveredHotel, setHoveredHotel] = useState(null);

  // Fetch hotels when the component mounts
  useEffect(() => {
    dispatch(getAllHotels());
  }, [dispatch]);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (hotels && hotels.length > 0) {
        setCurrentIndexes((prevIndexes) => {
          const updatedIndexes = { ...prevIndexes };
          hotels.forEach((hotel) => {
            if (hoveredHotel !== hotel._id) {
              // Skip auto-slide if hovered
              const imagesLength = hotel.images.length;
              updatedIndexes[hotel._id] =
                (prevIndexes[hotel._id] + 1) % imagesLength;
            }
          });
          return updatedIndexes;
        });
      }
    }, 3000); // Auto-slide every 3 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, [hotels, hoveredHotel]);

  // Initialize currentIndexes when hotels are loaded
  useEffect(() => {
    if (hotels && hotels.length > 0) {
      const initialIndexes = hotels.reduce((acc, hotel) => {
        acc[hotel._id] = 0;
        return acc;
      }, {});
      setCurrentIndexes(initialIndexes);
    }
  }, [hotels]);

  // Handle Mouse Enter (Pause Slide)
  const handleMouseEnter = (hotelId) => {
    setHoveredHotel(hotelId);
  };

  // Handle Mouse Leave (Resume Slide)
  const handleMouseLeave = () => {
    setHoveredHotel(null);
  };

  // Handle Next Slide
  const handleNext = (hotelId, imagesLength) => {
    setCurrentIndexes((prevIndexes) => ({
      ...prevIndexes,
      [hotelId]: (prevIndexes[hotelId] + 1) % imagesLength,
    }));
  };

  // Handle Previous Slide
  const handlePrev = (hotelId, imagesLength) => {
    setCurrentIndexes((prevIndexes) => ({
      ...prevIndexes,
      [hotelId]: (prevIndexes[hotelId] - 1 + imagesLength) % imagesLength,
    }));
  };

  // Open modal with clicked image
  const handleImageClick = (url) => {
    setModalImage(url);
    setShowModal(true);
  };

  // Navigate to hotel detail page
  const goToHotelDetail = (hotelId) => {
    navigate(`/hotel/${hotelId}`);
  };

  // Toggle favorite
  const toggleFavorite = (hotelId, e) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(hotelId)
        ? prev.filter((id) => id !== hotelId)
        : [...prev, hotelId]
    );
  };

  // Handle contact owner click for non-authenticated users
  const handleContactOwner = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      setShowLoginModal(true);
    }
  };

  // Navigate to login page
  const goToLogin = () => {
    setShowLoginModal(false);
    navigate("/login");
  };

  const handleShare = (hotelId, e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/hotel/${hotelId}`;
    const title = "Check out this amazing Room For Rent!";
    const text = "I found an amazing hotel on Licxo!";

    if (navigator.share) {
      navigator
        .share({
          title,
          text,
          url,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback for older browsers
      const shareLink = document.createElement("a");
      shareLink.href = url;
      shareLink.target = "_blank";
      shareLink.rel = "noopener noreferrer";
      shareLink.click();
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="text-center py-8 px-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-2xl mx-auto">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 text-center">
          Find Your <span className="text-red-500 italic">Perfect</span> Stay
        </h1>
         

        {/* Desktop view */}
        <div className="hidden md:block">
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {hotels.map((hotel) => (
              <li
                key={hotel._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 border border-gray-200 cursor-pointer"
                onClick={() => goToHotelDetail(hotel._id)}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image carousel */}
                  {hotel.images && hotel.images.length > 0 ? (
                    <div className="relative overflow-hidden w-full md:w-2/5 h-64">
                      <div
                        className="flex transition-transform duration-500 h-full"
                        style={{
                          transform: `translateX(-${
                            currentIndexes[hotel._id] * 100
                          }%)`,
                        }}
                      >
                        {hotel.images.map((image, index) => (
                          <img
                            key={index}
                            src={
                              image?.url ||
                              "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                            }
                            alt={`${hotel.name} - Image ${index + 1}`}
                            className="w-full h-full object-cover flex-shrink-0 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleImageClick(
                                image?.url ||
                                  "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                              );
                            }}
                          />
                        ))}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-between p-2">
                        <button
                          className="p-2 rounded-full shadow bg-white opacity-80 hover:opacity-100 hover:bg-white transition"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrev(hotel._id, hotel.images.length);
                          }}
                        >
                          <FaChevronLeft size={18} />
                        </button>
                        <button
                          className="p-2 rounded-full shadow bg-white opacity-80 hover:opacity-100 hover:bg-white transition"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNext(hotel._id, hotel.images.length);
                          }}
                        >
                          <FaChevronRight size={18} />
                        </button>
                      </div>
                      <div className="absolute bottom-4 inset-x-0">
                        <div className="flex items-center justify-center gap-1">
                          {hotel.images.map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full transition-all ${
                                currentIndexes[hotel._id] === i
                                  ? "bg-white w-3 h-3"
                                  : "bg-white bg-opacity-60"
                              }`}
                            ></div>
                          ))}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => toggleFavorite(hotel._id, e)}
                        className={`absolute top-3 right-3 p-2 rounded-full ${
                          favorites.includes(hotel._id)
                            ? "bg-red-500 text-white"
                            : "bg-white text-gray-700 hover:text-red-500"
                        } shadow-md transition-colors`}
                      >
                        <IoIosHeart size={20} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-full md:w-2/5 h-64 bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500">No images available</p>
                    </div>
                  )}

                  {/* Hotel details */}
                  <div className="p-6 flex flex-col justify-between w-full md:w-3/5">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-gray-800">
                          {hotel.name}
                        </h3>
                        <div className="flex items-center text-2xl font-bold text-black">
                          <FaRupeeSign className="mr-1" />
                          <span>{hotel.price.toLocaleString()}</span>
                          <span className="text-sm text-gray-500 font-normal ml-1">
                            /month
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 mb-6">
                        <a
                          className="flex items-center text-sm bg-blue-50 text-blue-700 rounded-full px-3 py-1 hover:bg-blue-100 transition"
                          href={`https://www.google.com/maps?q=${hotel.location.coordinates[1]},${hotel.location.coordinates[0]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaLocationDot className="mr-1" />
                          {hotel.address.address1}, {hotel.address.city}
                        </a>
                        <div className="flex items-center text-sm bg-gray-100 text-gray-700 rounded-full px-3 py-1">
                          <MdMeetingRoom className="mr-1" /> {hotel.room}
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-3 bg-gray-50 p-4 rounded-lg mb-4">
                        <div className="flex flex-col items-center text-center">
                          <MdMeetingRoom className="text-2xl text-gray-700 mb-1" />
                          <p className="text-sm font-medium">{hotel.room}</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <FaBed className="text-2xl text-gray-700 mb-1" />
                          <p className="text-sm font-medium">{hotel.bed}</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          {hotel.wifi === "Yes" ? (
                            <>
                              <FaWifi className="text-2xl text-green-600 mb-1" />
                              <p className="text-sm font-medium text-green-600">
                                Available
                              </p>
                            </>
                          ) : (
                            <>
                              <MdOutlineWifiOff className="text-2xl text-gray-500 mb-1" />
                              <p className="text-sm font-medium text-gray-500">
                                Not Available
                              </p>
                            </>
                          )}
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <RiSofaLine className="text-2xl text-gray-700 mb-1" />
                          <p className="text-sm font-medium">
                            {hotel.Furnished ? (
                              <span className="text-green-600"> Available</span>
                            ) : (
                              <span className="text-gray-500">
                                {" "}
                                Not Available
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-auto">
                      {isAuthenticated ? (
                        <a
                          href={`tel:${hotel.phone}`}
                          className="flex items-center gap-2 px-4 py-2 bg-[#122455] text-white rounded-lg hover:bg-blue-700 transition"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <IoIosCall /> {hotel.phone}
                        </a>
                      ) : (
                        <button
                          onClick={(e) => handleContactOwner(e)}
                          className="flex items-center gap-2 px-4 py-2 bg-[#122455] text-white rounded-lg hover:bg-blue-700 transition"
                        >
                          <IoCallOutline />
                          Contact Owner
                        </button>
                      )}
                      <button
                        className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                        title="Share"
                        onClick={(e) => handleShare(hotel._id, e)}
                      >
                        <TbShare3 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Responsive View */}
        <div className="block md:hidden">
          <div className="grid grid-cols-1 gap-6">
            {hotels.map((hotel) => (
              <div
                key={hotel._id}
                className="bg-gradient-to-r from-white to-gray-100 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.6)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.7)] overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out"
                onClick={() => goToHotelDetail(hotel._id)}
              >
                {/* Image Carousel */}
                <div
                  className="relative overflow-hidden w-full h-60"
                  onMouseEnter={() => handleMouseEnter(hotel._id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    className="flex transition-transform duration-500 h-full"
                    style={{
                      transform: `translateX(-${
                        (currentIndexes[hotel._id] || 0) * 100
                      }%)`,
                    }}
                  >
                    {hotel.images.map((image, index) => (
                      <img
                        key={index}
                        src={
                          image?.url ||
                          "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                        }
                        alt={`${hotel.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover flex-shrink-0 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageClick(image?.url);
                        }}
                      />
                    ))}
                  </div>

                  {/* Previous Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev(hotel._id, hotel.images.length);
                    }}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow-md hover:bg-gray-200"
                  >
                    &#10094;
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext(hotel._id, hotel.images.length);
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow-md hover:bg-gray-200"
                  >
                    &#10095;
                  </button>

                  {/* Gallery Icon with Image Count */}
                  <div className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5h18M3 10h18M3 15h18M3 20h18"
                      />
                    </svg>
                    <span>{hotel.images.length}</span>
                  </div>
                </div>
                <div className="p-4">
                  {/* Hotel Details */}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-800">
                      {hotel.name}
                      <span className="text-gray-500 font-normal text-sm">
                        {" "}
                        /Owner
                      </span>
                    </h3>

                    <div className="flex items-center text-lg font-bold text-gray-800 px-4 py-2 rounded-lg shadow-md">
                      <FaRupeeSign className="mr-1" size={14} />
                      <span className="text-sm">
                        {hotel.price.toLocaleString()}
                      </span>
                      <span className="text-gray-500 font-normal text-xs ml-1">
                        /Month
                      </span>
                    </div>
                  </div>

                  {/* Room Details Section */}
                  {/* Room Details Section */}
                  <div className="flex justify-around bg-gray-50 p-3 rounded-lg mb-4 text-center text-xs font-bold text-gray-800">
                    <span>{hotel.room}</span>
                    <div className="border-l h-5 border-gray-400"></div>

                    <span>{hotel.bed}</span>
                    <div className="border-l h-5 border-gray-400"></div>

                    <span>
                      {hotel.wifi?.toLowerCase() === "yes" ? "WiFi" : "No WiFi"}
                    </span>
                    <div className="border-l h-5 border-gray-400"></div>

                    <span>
                      {hotel.furnished?.toLowerCase() === "yes"
                        ? "Furnished"
                        : "Not Furnished"}
                    </span>
                  </div>

                  {/* Call and Location Buttons */}
                  <div className="flex justify-between items-center bg-gray-800 p-3 rounded-lg">
                    <a
                      href={`tel:${hotel.phone}`}
                      className="flex items-center gap-2 text-white text-xs font-medium hover:text-gray-300 transition-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <IoIosCall size={16} /> Call
                    </a>

                    <a
                      href={`https://www.google.com/maps?q=${hotel.location.coordinates[1]},${hotel.location.coordinates[0]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white text-xs font-medium hover:text-gray-300 transition-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaLocationDot size={14} /> Go to Location
                    </a>
                  </div>

                  {/* View More Text */}
                  <div
                    className="flex justify-center items-center mt-3 cursor-pointer"
                    onClick={() => handleViewMore(hotel)}
                  >
                    <span className="flex items-center text-gray-600 text-xs font-medium hover:text-gray-800 transition-all">
                      View More <FaChevronRight size={10} className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enlarged Image Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative max-w-4xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={modalImage || ""}
              alt="Enlarged view"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-white text-3xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-80 transition"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Login Required Modal */}
      {showLoginModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-4">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <IoCallOutline size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Login Required
              </h3>
            </div>

            <p className="text-gray-600 mb-6 text-center">
              You need to be logged in to view contact information of property
              owners. Please log in to continue.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={goToLogin}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
              >
                <IoIosCall className="mr-2" />
                Login to See Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HotelList;