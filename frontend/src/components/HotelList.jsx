import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaWifi, FaRupeeSign, FaBed } from "react-icons/fa";
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

  // Fetch hotels when the component mounts
  useEffect(() => {
    dispatch(getAllHotels());
  }, [dispatch]);

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

  const handleNext = (hotelId, imagesLength) => {
    setCurrentIndexes((prevIndexes) => ({
      ...prevIndexes,
      [hotelId]: (prevIndexes[hotelId] + 1) % imagesLength,
    }));
  };

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

  // Toggle favorite
  const toggleFavorite = (hotelId) => {
    setFavorites(prev => 
      prev.includes(hotelId) 
        ? prev.filter(id => id !== hotelId)
        : [...prev, hotelId]
    );
  };

  // Handle contact owner click for non-authenticated users
  const handleContactOwner = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    }
  };

  // Navigate to login page
  const goToLogin = () => {
    setShowLoginModal(false);
    navigate('/login');
  };

  const handleShare = (hotelId) => {
    const url = `${window.location.origin}/hotels/`;
    const title = "Check out this amazing Room For Rent!";
    const text = "I found an amazing hotel on Licxo !";

    if (navigator.share) {
      navigator.share({
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
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Find Your Perfect Stay</h1>
        
        {/* Desktop view */}
        <div className="hidden md:block">
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {hotels.map((hotel) => (
              <li
                key={hotel._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 border border-gray-200"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image carousel */}
                  {hotel.images && hotel.images.length > 0 ? (
                    <div className="relative overflow-hidden w-full md:w-2/5 h-64">
                      <div
                        className="flex transition-transform duration-500 h-full"
                        style={{
                          transform: `translateX(-${currentIndexes[hotel._id] * 100}%)`,
                        }}
                      >
                        {hotel.images.map((image, index) => (
                          <img
                            key={index}
                            src={image?.url || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"}
                            alt={`${hotel.name} - Image ${index + 1}`}
                            className="w-full h-full object-cover flex-shrink-0 cursor-pointer"
                            onClick={() => handleImageClick(image?.url || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80")}
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
                                currentIndexes[hotel._id] === i ? "bg-white w-3 h-3" : "bg-white bg-opacity-60"
                              }`}
                            ></div>
                          ))}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(hotel._id)}
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
                        <h3 className="text-2xl font-bold text-gray-800">{hotel.name}</h3>
                        <div className="flex items-center text-2xl font-bold text-blue-600">
                          <FaRupeeSign className="mr-1" />
                          <span>{hotel.price.toLocaleString()}</span>
                          <span className="text-sm text-gray-500 font-normal ml-1">/month</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mb-6">
                        <a
                          className="flex items-center text-sm bg-blue-50 text-blue-700 rounded-full px-3 py-1 hover:bg-blue-100 transition"
                          href={`https://www.google.com/maps?q=${hotel.location.coordinates[1]},${hotel.location.coordinates[0]}`}
                          target="_blank"
                          rel="noopener noreferrer"
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
                              <p className="text-sm font-medium text-green-600">Available</p>
                            </>
                          ) : (
                            <>
                              <MdOutlineWifiOff className="text-2xl text-gray-500 mb-1" />
                              <p className="text-sm font-medium text-gray-500">Not Available</p>
                            </>
                          )}
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <RiSofaLine className="text-2xl text-gray-700 mb-1" />
                          <p className="text-sm font-medium">
                            {hotel.furnished ? (
                              <span className="text-green-600">Furnished</span>
                            ) : (
                              <span className="text-gray-500">Unfurnished</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-auto">
                      {isAuthenticated ? (
                        <a
                          href={`tel:${hotel.phone}`}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                          <IoIosCall /> {hotel.phone}
                        </a>
                      ) : (
                        <button
                          onClick={handleContactOwner}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                          <IoCallOutline />
                          Contact Owner
                        </button>
                      )}
                      <button 
                        className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                        title="Share"
                        onClick={() => handleShare(hotel._id)}
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

        {/* Mobile responsive view */}
        <div className="block md:hidden">
          <div className="grid grid-cols-1 gap-6">
            {hotels.map((hotel) => (
              <div
                key={hotel._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                {/* Image carousel */}
                <div className="relative">
                  {hotel.images && hotel.images.length > 0 ? (
                    <div className="relative overflow-hidden w-full h-56">
                      <div
                        className="flex transition-transform duration-500 h-full"
                        style={{
                          transform: `translateX(-${currentIndexes[hotel._id] * 100}%)`,
                        }}
                      >
                        {hotel.images.map((image, index) => (
                          <img
                            key={index}
                            src={image?.url || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"}
                            alt={`${hotel.name} - Image ${index + 1}`}
                            className="w-full h-full object-cover flex-shrink-0 cursor-pointer"
                            onClick={() => handleImageClick(image?.url || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80")}
                          />
                        ))}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-between p-2">
                        <button
                          className="p-1.5 rounded-full shadow bg-white opacity-80 hover:opacity-100 hover:bg-white transition"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrev(hotel._id, hotel.images.length);
                          }}
                        >
                          <FaChevronLeft size={16} />
                        </button>
                        <button
                          className="p-1.5 rounded-full shadow bg-white opacity-80 hover:opacity-100 hover:bg-white transition"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNext(hotel._id, hotel.images.length);
                          }}
                        >
                          <FaChevronRight size={16} />
                        </button>
                      </div>
                      <div className="absolute bottom-3 inset-x-0">
                        <div className="flex items-center justify-center gap-1">
                          {hotel.images.map((_, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full transition-all ${
                                currentIndexes[hotel._id] === i ? "bg-white w-2.5 h-2.5" : "bg-white bg-opacity-60"
                              }`}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500">No images available</p>
                    </div>
                  )}
                  
                  <button
                    type="button"
                    onClick={() => toggleFavorite(hotel._id)}
                    className={`absolute top-3 right-3 p-2 rounded-full ${
                      favorites.includes(hotel._id) 
                        ? "bg-red-500 text-white" 
                        : "bg-white text-gray-700 hover:text-red-500"
                    } shadow-md transition-colors`}
                  >
                    <IoIosHeart size={18} />
                  </button>
                </div>
                
                {/* Hotel details */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{hotel.name}</h3>
                    <div className="flex items-center text-xl font-bold text-blue-600">
                      <FaRupeeSign className="mr-0.5" />
                      <span>{hotel.price.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <a
                    className="inline-flex items-center text-xs bg-blue-50 text-blue-700 rounded-full px-2 py-1 mb-3"
                    href={`https://www.google.com/maps?q=${hotel.location.coordinates[1]},${hotel.location.coordinates[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLocationDot className="mr-1" size={12} /> 
                    {hotel.address.address1}, {hotel.address.city}
                  </a>
                  
                  <div className="grid grid-cols-4 gap-2 bg-gray-50 p-3 rounded-lg mb-4 text-center">
                    <div className="flex flex-col items-center">
                      <MdMeetingRoom className="text-lg text-gray-700" />
                      <p className="text-xs font-medium mt-1">{hotel.room}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <FaBed className="text-lg text-gray-700" />
                      <p className="text-xs font-medium mt-1">{hotel.bed}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      {hotel.wifi === "Yes" ? (
                        <>
                          <FaWifi className="text-lg text-green-600" />
                          <p className="text-xs font-medium mt-1 text-green-600">WiFi</p>
                        </>
                      ) : (
                        <>
                          <MdOutlineWifiOff className="text-lg text-gray-500" />
                          <p className="text-xs font-medium mt-1 text-gray-500">No WiFi</p>
                        </>
                      )}
                    </div>
                    <div className="flex flex-col items-center">
                      <RiSofaLine className="text-lg text-gray-700" />
                      <p className="text-xs font-medium mt-1">
                        {hotel.furnished ? (
                          <span className="text-green-600">Furnished</span>
                        ) : (
                          <span className="text-gray-500">Unfurnished</span>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    {isAuthenticated ? (
                      <a
                        href={`tel:${hotel.phone}`}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                      >
                        <IoIosCall size={16} /> {hotel.phone}
                      </a>
                    ) : (
                      <button
                        onClick={handleContactOwner}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                      >
                        <IoCallOutline size={16} />
                        Contact Owner
                      </button>
                    )}
                    <button 
                      className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                      title="Share"
                      onClick={() => handleShare(hotel._id)}
                    >
                      <TbShare3 size={18} />
                    </button>
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
              <h3 className="text-xl font-bold text-gray-800">Login Required</h3>
            </div>
            
            <p className="text-gray-600 mb-6 text-center">
              You need to be logged in to view contact information of property owners.
              Please log in to continue.
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
