import React, { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/login'); // Local route pe navigate karega
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        const payload = JSON.parse(jsonPayload);

        setProfile({
          id: payload.id,
          phoneNumber: payload.phoneNumber || "N/A",
          username: username || "User",
        });
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500 text-lg mb-4">Please login to view your profile</p>
        <button
          onClick={handleRedirect}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
    );
  }

  // Generate a random avatar using UI Avatars
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    profile.username
  )}&background=random&color=fff&size=128`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-4 border-b pb-4">
          <img
            src={avatarUrl}
            alt="Profile Avatar"
            className="w-16 h-16 rounded-full shadow-sm border"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{profile.username}</h1>
            <p className="text-sm text-gray-500">User ID: {profile.id}</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium text-gray-700">{profile.phoneNumber}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Button */}
       
      </div>
    </div>
  );
};

export default Profile;
