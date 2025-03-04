import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getHotelById } from "../features/hotels/hotelsAPI"
import {
  FaChevronLeft,
  FaChevronRight,
  FaWifi,
  FaRupeeSign,
  FaBed,
  FaArrowLeft
} from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6"
import { IoIosCall, IoIosHeart } from "react-icons/io"
import { IoCallOutline } from "react-icons/io5"
import { MdMeetingRoom, MdOutlineWifiOff } from "react-icons/md"
import { RiSofaLine } from "react-icons/ri"
import { TbShare3 } from "react-icons/tb"

// Custom hook to check if the user is authenticated
const useAuth = () => {
  return !!localStorage.getItem("token")
}

const HotelDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentHotel, status, error } = useSelector(state => state.hotels)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [modalImage, setModalImage] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const isAuthenticated = useAuth()

  useEffect(() => {
    if (id) {
      dispatch(getHotelById(id))
    }
  }, [dispatch, id])

  const handleNext = () => {
    if (currentHotel?.images && currentHotel.images.length > 0) {
      setCurrentImageIndex(prev => (prev + 1) % currentHotel.images.length)
    }
  }

  const handlePrev = () => {
    if (currentHotel?.images && currentHotel.images.length > 0) {
      setCurrentImageIndex(
        prev =>
          (prev - 1 + currentHotel.images.length) % currentHotel.images.length
      )
    }
  }

  const handleImageClick = url => {
    setModalImage(url)
    setShowModal(true)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const handleContactOwner = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true)
    }
  }

  const goToLogin = () => {
    setShowLoginModal(false)
    navigate("/login")
  }

  const handleShare = () => {
    const url = window.location.href
    const title = `Check out ${currentHotel?.name ||
      "this amazing Room For Rent"}!`
    const text = "I found an amazing hotel on Licxo!"

    if (navigator.share) {
      navigator
        .share({
          title,
          text,
          url
        })
        .then(() => console.log("Shared successfully"))
        .catch(error => console.error("Error sharing:", error))
    } else {
      // Fallback for older browsers
      const shareLink = document.createElement("a")
      shareLink.href = url
      shareLink.target = "_blank"
      shareLink.rel = "noopener noreferrer"
      shareLink.click()
    }
  }

  const goBack = () => {
    navigate(-1)
  }

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (status === "failed" || !currentHotel) {
    return (
      <div className="text-center py-8 px-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-2xl mx-auto">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error || "Hotel not found"}</span>
        </div>
        <button
          onClick={goBack}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center mx-auto"
        >
          <FaArrowLeft className="mr-2" /> Go Back
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={goBack}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition"
        >
          <FaArrowLeft className="mr-2" /> Back to listings
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {/* Desktop view */}
          <div className="hidden md:block">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Image gallery */}
              <div className="relative">
                {currentHotel.images && currentHotel.images.length > 0 ? (
                  <div className="relative h-[500px] overflow-hidden">
                    <img
                      src={
                        currentHotel.images[currentImageIndex]?.url ||
                        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                      }
                      alt={`${currentHotel.name} - Image ${currentImageIndex +
                        1}`}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() =>
                        handleImageClick(
                          currentHotel.images[currentImageIndex]?.url ||
                            "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                        )
                      }
                    />
                    <div className="absolute inset-0 flex items-center justify-between p-4">
                      <button
                        className="p-2 rounded-full shadow bg-white opacity-80 hover:opacity-100 hover:bg-white transition"
                        onClick={handlePrev}
                      >
                        <FaChevronLeft size={20} />
                      </button>
                      <button
                        className="p-2 rounded-full shadow bg-white opacity-80 hover:opacity-100 hover:bg-white transition"
                        onClick={handleNext}
                      >
                        <FaChevronRight size={20} />
                      </button>
                    </div>
                    <div className="absolute bottom-4 inset-x-0">
                      <div className="flex items-center justify-center gap-2">
                        {currentHotel.images.map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all ${
                              currentImageIndex === i
                                ? "bg-white w-3 h-3"
                                : "bg-white bg-opacity-60"
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={toggleFavorite}
                      className={`absolute top-4 right-4 p-2 rounded-full ${
                        isFavorite
                          ? "bg-red-500 text-white"
                          : "bg-white text-gray-700 hover:text-red-500"
                      } shadow-md transition-colors`}
                    >
                      <IoIosHeart size={24} />
                    </button>
                  </div>
                ) : (
                  <div className="h-[500px] bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">No images available</p>
                  </div>
                )}

                {/* Thumbnail gallery */}
                {currentHotel.images && currentHotel.images.length > 1 && (
                  <div className="flex overflow-x-auto p-2 gap-2 bg-gray-100">
                    {currentHotel.images.map((image, index) => (
                      <div
                        key={index}
                        className={`flex-shrink-0 w-20 h-20 cursor-pointer ${
                          currentImageIndex === index
                            ? "ring-2 ring-blue-500"
                            : ""
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img
                          src={
                            image?.url ||
                            "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                          }
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Hotel details */}
              <div className="p-8 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <h1 className="text-3xl font-bold text-gray-800">
                    {currentHotel.name}
                  </h1>
                  <div className="flex items-center text-3xl font-bold text-blue-600">
                    <FaRupeeSign className="mr-1" />
                    <span>{currentHotel.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500 font-normal ml-1">
                      /month
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-6">
                  <a
                    className="flex items-center text-sm bg-blue-50 text-blue-700 rounded-full px-3 py-1 hover:bg-blue-100 transition"
                    href={`https://www.google.com/maps?q=${currentHotel.location.coordinates[1]},${currentHotel.location.coordinates[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLocationDot className="mr-1" />
                    {currentHotel.address.address1}, {currentHotel.address.city}
                  </a>
                  <div className="flex items-center text-sm bg-gray-100 text-gray-700 rounded-full px-3 py-1">
                    <MdMeetingRoom className="mr-1" /> {currentHotel.room}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="flex flex-col items-center text-center">
                    <MdMeetingRoom className="text-3xl text-gray-700 mb-2" />
                    <p className="text-sm font-medium">{currentHotel.room}</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <FaBed className="text-3xl text-gray-700 mb-2" />
                    <p className="text-sm font-medium">{currentHotel.bed}</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    {currentHotel.wifi === "Yes" ? (
                      <>
                        <FaWifi className="text-3xl text-green-600 mb-2" />
                        <p className="text-sm font-medium text-green-600">
                          Available
                        </p>
                      </>
                    ) : (
                      <>
                        <MdOutlineWifiOff className="text-3xl text-gray-500 mb-2" />
                        <p className="text-sm font-medium text-gray-500">
                          Not Available
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <RiSofaLine className="text-3xl text-gray-700 mb-2" />
                    <p className="text-sm font-medium">
                      {currentHotel.furnished ? (
                        <span className="text-green-600">Furnished</span>
                      ) : (
                        <span className="text-gray-500">Unfurnished</span>
                      )}
                    </p>
                  </div>
                </div>

                {currentHotel.description && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Description</h2>
                    <p className="text-gray-700">{currentHotel.description}</p>
                  </div>
                )}

                <div className="mt-auto flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    {isAuthenticated ? (
                      <a
                        href={`tel:${currentHotel.phone}`}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-medium"
                      >
                        <IoIosCall size={20} /> {currentHotel.phone}
                      </a>
                    ) : (
                      <button
                        onClick={handleContactOwner}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-medium"
                      >
                        <IoCallOutline size={20} />
                        Contact Owner
                      </button>
                    )}
                    <button
                      className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                      title="Share"
                      onClick={handleShare}
                    >
                      <TbShare3 size={24} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile view */}
          <div className="block md:hidden">
            {/* Image gallery */}
            <div className="relative">
              {currentHotel.images && currentHotel.images.length > 0 ? (
                <div className="relative h-[300px] overflow-hidden">
                  <img
                    src={
                      currentHotel.images[currentImageIndex]?.url ||
                      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                    }
                    alt={`${currentHotel.name} - Image ${currentImageIndex +
                      1}`}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() =>
                      handleImageClick(
                        currentHotel.images[currentImageIndex]?.url ||
                          "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                      )
                    }
                  />
                  <div className="absolute inset-0 flex items-center justify-between p-3">
                    <button
                      className="p-1.5 rounded-full shadow bg-white opacity-80 hover:opacity-100 hover:bg-white transition"
                      onClick={handlePrev}
                    >
                      <FaChevronLeft size={16} />
                    </button>
                    <button
                      className="p-1.5 rounded-full shadow bg-white opacity-80 hover:opacity-100 hover:bg-white transition"
                      onClick={handleNext}
                    >
                      <FaChevronRight size={16} />
                    </button>
                  </div>
                  <div className="absolute bottom-3 inset-x-0">
                    <div className="flex items-center justify-center gap-1">
                      {currentHotel.images.map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${
                            currentImageIndex === i
                              ? "bg-white w-2.5 h-2.5"
                              : "bg-white bg-opacity-60"
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={toggleFavorite}
                    className={`absolute top-3 right-3 p-2 rounded-full ${
                      isFavorite
                        ? "bg-red-500 text-white"
                        : "bg-white text-gray-700 hover:text-red-500"
                    } shadow-md transition-colors`}
                  >
                    <IoIosHeart size={18} />
                  </button>
                </div>
              ) : (
                <div className="h-[300px] bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No images available</p>
                </div>
              )}

              {/* Thumbnail gallery */}
              {currentHotel.images && currentHotel.images.length > 1 && (
                <div className="flex overflow-x-auto p-2 gap-2 bg-gray-100">
                  {currentHotel.images.map((image, index) => (
                    <div
                      key={index}
                      className={`flex-shrink-0 w-16 h-16 cursor-pointer ${
                        currentImageIndex === index
                          ? "ring-2 ring-blue-500"
                          : ""
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img
                        src={
                          image?.url ||
                          "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                        }
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Hotel details */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold text-gray-800">
                  {currentHotel.name}
                </h1>
                <div className="flex items-center text-2xl font-bold text-blue-600">
                  <FaRupeeSign className="mr-0.5" />
                  <span>{currentHotel.price.toLocaleString()}</span>
                </div>
              </div>

              <a
                className="inline-flex items-center text-xs bg-blue-50 text-blue-700 rounded-full px-2 py-1 mb-4"
                href={`https://www.google.com/maps?q=${currentHotel.location.coordinates[1]},${currentHotel.location.coordinates[0]}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLocationDot className="mr-1" size={12} />
                {currentHotel.address.address1}, {currentHotel.address.city}
              </a>

              <div className="grid grid-cols-4 gap-2 bg-gray-50 p-3 rounded-lg mb-4 text-center">
                <div className="flex flex-col items-center">
                  <MdMeetingRoom className="text-lg text-gray-700" />
                  <p className="text-xs font-medium mt-1">
                    {currentHotel.room}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <FaBed className="text-lg text-gray-700" />
                  <p className="text-xs font-medium mt-1">{currentHotel.bed}</p>
                </div>
                <div className="flex flex-col items-center">
                  {currentHotel.wifi === "Yes" ? (
                    <>
                      <FaWifi className="text-lg text-green-600" />
                      <p className="text-xs font-medium mt-1 text-green-600">
                        WiFi
                      </p>
                    </>
                  ) : (
                    <>
                      <MdOutlineWifiOff className="text-lg text-gray-500" />
                      <p className="text-xs font-medium mt-1 text-gray-500">
                        No WiFi
                      </p>
                    </>
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <RiSofaLine className="text-lg text-gray-700" />
                  <p className="text-xs font-medium mt-1">
                    {currentHotel.furnished ? (
                      <span className="text-green-600">Furnished</span>
                    ) : (
                      <span className="text-gray-500">Unfurnished</span>
                    )}
                  </p>
                </div>
              </div>

              {currentHotel.description && (
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-1">Description</h2>
                  <p className="text-gray-700 text-sm">
                    {currentHotel.description}
                  </p>
                </div>
              )}

              <div className="flex justify-between items-center mt-4">
                {isAuthenticated ? (
                  <a
                    href={`tel:${currentHotel.phone}`}
                    className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                  >
                    <IoIosCall size={16} /> {currentHotel.phone}
                  </a>
                ) : (
                  <button
                    onClick={handleContactOwner}
                    className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                  >
                    <IoCallOutline size={16} />
                    Contact Owner
                  </button>
                )}
                <button
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                  title="Share"
                  onClick={handleShare}
                >
                  <TbShare3 size={18} />
                </button>
              </div>
            </div>
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
            onClick={e => e.stopPropagation()}
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
            onClick={e => e.stopPropagation()}
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
  )
}

export default HotelDetail
