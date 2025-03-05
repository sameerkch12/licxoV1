import { Home, PlusCircle, Phone, MessageSquare, User, Hotel, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/LicxoLogo.png"

const useAuth = () => {
  return !!localStorage.getItem("token");
};

const getUsername = () => {
  return localStorage.getItem("username") || "";
};

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const username = isAuthenticated ? getUsername() : "";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = () => {
    setSidebarOpen(false);
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setSidebarOpen(false);
    window.location.href = "/"; // Redirect to home and refresh
  };

  return (
    <div>
      {/* Desktop Navbar */}
      <div className="lg:flex items-center justify-between border-b h-14 bg-white text-black shadow-md hidden">
        <div className="flex-1 flex justify-center">
          <img src={logo} alt="logo" className="w-32 h-12" />
        </div>
        <div className="flex items-center pr-4 space-x-4">
          {isAuthenticated ? (
            <button
              onClick={() => navigate("/addhotel")}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
            >
              <PlusCircle className="mr-1 h-5 w-5" />
              Add Listing
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
            >
              <PlusCircle className="mr-1 h-5 w-5" />
              Sign up
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="fixed top-0 left-0 w-full h-14 bg-white border-b flex items-center justify-center z-10 lg:hidden px-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute left-4 text-black"
        >
          <Menu className="h-8 w-8" />
        </button>
        <img src={logo} alt="logo" className="h-12" />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-20 p-4 rounded-r-lg transition-transform transform translate-x-0 flex flex-col justify-between">
          <div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-black text-lg font-semibold px-3 py-1 rounded-md hover:bg-gray-200 transition flex items-center"
            >
              <X className="h-5 w-5 mr-1" /> Close
            </button>
            <ul className="mt-6 space-y-4">
              {!isAuthenticated && (
                <li>
                  <button
                    onClick={handleLogin}
                    className="block w-full px-4 py-2 text-left text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
                  >
                    Login
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center w-full px-4 py-2 text-left text-black rounded-md hover:bg-gray-200 transition"
                >
                  <Home className="mr-2 h-5 w-5" /> Home Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/addhotel")}
                  className="flex items-center w-full px-4 py-2 text-left text-black rounded-md hover:bg-gray-200 transition"
                >
                  <PlusCircle className="mr-2 h-5 w-5" /> Add Your Room
                </button>
              </li>
              {isAuthenticated && (
                <>
                  <li>
                    <button
                      onClick={() => navigate("/myrooms")}
                      className="flex items-center w-full px-4 py-2 text-left text-black rounded-md hover:bg-gray-200 transition"
                    >
                      <Hotel className="mr-2 h-5 w-5" /> My Rooms
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate("/profile")}
                      className="flex items-center w-full px-4 py-2 text-left text-black rounded-md hover:bg-gray-200 transition"
                    >
                      <User className="mr-2 h-5 w-5" /> Profile
                    </button>
                  </li>
                </>
              )}
              <li>
                <button
                  onClick={() => navigate("/contact")}
                  className="flex items-center w-full px-4 py-2 text-left text-black rounded-md hover:bg-gray-200 transition"
                >
                  <Phone className="mr-2 h-5 w-5" /> Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/feedback")}
                  className="flex items-center w-full px-4 py-2 text-left text-black rounded-md hover:bg-gray-200 transition"
                >
                  <MessageSquare className="mr-2 h-5 w-5" /> Feedback
                </button>
              </li>
            </ul>
          </div>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-center text-white bg-red-500 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;