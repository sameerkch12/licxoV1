import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Trash2, Edit, Phone, MapPin, Wifi, BedDouble } from "lucide-react";
import { jwtDecode } from "jwt-decode";

export default function Myrooms() {
  const navigate = useNavigate();

  // Local state for rooms, loading status, and errors
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  // Decode token from localStorage (remove +91 if present)
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

  // Fetch the user's rooms from the API
  const fetchRooms = async (phone) => {
    setLoading(true);
    try {
      // Replace "YOUR_BACKEND_URL" with your actual API URL
      const response = await fetch(`${API_URL}/api/v1/hotels/myroom/${phone}`);
      if (!response.ok) {
        throw new Error("Failed to fetch rooms.");
      }
      const data = await response.json();

      // The response could be an object or an array:
      // If it's wrapped like { data: [...] }, handle that. If it's a single object, wrap in an array.
      if (Array.isArray(data)) {
        // If data is already an array
        setRooms(data);
      } else if (data && data.data) {
        // If data is in { data: [...] } format
        if (Array.isArray(data.data)) {
          setRooms(data.data);
        } else {
          setRooms([data.data]);
        }
      } else {
        // If data is a single object
        setRooms([data]);
      }

      setError(null);
    } catch (err) {
      setError(err.message || "Error fetching rooms.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a specific room by phone number
  const handleDelete = async (phone) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      setLoading(true);
      try {
        // Replace "YOUR_BACKEND_URL" with your actual API URL
        const response = await fetch(`YOUR_BACKEND_URL/hotels/${phone}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete room.");
        }
        // Re-fetch rooms after successful deletion
        if (userPhone) {
          fetchRooms(userPhone);
        }
      } catch (err) {
        setError(err.message || "Error deleting room.");
      } finally {
        setLoading(false);
      }
    }
  };

  // On component mount (and when userPhone changes), fetch the rooms
  useEffect(() => {
    if (userPhone) {
      fetchRooms(userPhone);
    }
  }, [userPhone]);

  return (
    <>
    <div>
    <Navbar/>
    </div>
    
    <div className="min-h-screen bg-gray-50 pt-10">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Rooms</h1>
          <button
            onClick={() => navigate("/addhotel")}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 shadow-lg"
          >
            Add Room
          </button>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(rooms) && rooms.length > 0 ? (
            rooms.map((room) => {
              if (!room) return null; // Safeguard against any undefined entries

              // If images array is missing or empty, use a placeholder
              const imageUrl =
                room.images && room.images.length > 0
                  ? room.images[0].url
                  : "https://via.placeholder.com/300";

              return (
                <div
                  key={room._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
                >
                  <div className="relative h-48">
                    <img
                      src={imageUrl}
                      alt={room.name || "Room"}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => navigate(`/edit-room/${room._id}`)}
                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(room.phone)}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {room.name}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <MapPin size={18} className="mr-2" />
                        <span>{room.address?.district || "No Address Provided"}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone size={18} className="mr-2" />
                        <span>
                          {String(room.phone).replace(/^\+91/, "") || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <BedDouble size={18} className="mr-2" />
                        <span>{room.room ? `${room.room} Rooms` : "No Room Info"}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Wifi size={18} className="mr-2" />
                        <span>{room.wifi ? "WiFi Available" : "No WiFi"}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-2xl font-bold text-red-500">
                        ₹{room.price}/Month
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl text-gray-600">No rooms available.</h3>
              <p className="text-gray-500 mt-2">
                Click the "Add Room" button to get started!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
    
    </>
    
  );
}
