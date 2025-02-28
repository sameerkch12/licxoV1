import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoReorderThree } from "react-icons/io5";
import { FaCommentDots } from "react-icons/fa";
import logo from "../assets/Licxo.jpg";

const useAuth = () => {
  return !!localStorage.getItem("token");
};

const getUsername = () => {
  return localStorage.getItem("username") || "";
};

const Navbar = () => {
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
              <IoMdAddCircleOutline className="mr-1 text-xl" />
              Add Listing
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
            >
              <IoMdAddCircleOutline className="mr-1 text-xl" />
              Sign up
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="fixed top-0 left-0 w-full h-14 bg-white border-b flex items-center justify-center z-10 lg:hidden px-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute left-4 text-black text-5xl"
        >
          <IoReorderThree />
        </button>
        <img src={logo} alt="logo" className="h-12" />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-20 p-4 rounded-r-lg transition-transform transform translate-x-0 flex flex-col justify-between">
          <div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-black text-lg font-semibold px-3 py-1 rounded-md hover:bg-gray-200 transition"
            >
              ✖ Close
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
                <Link
                  to="/feedback"
                  className="flex items-center w-full px-4 py-2 text-left text-black rounded-md hover:bg-gray-200 transition"
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaCommentDots className="mr-2" /> Feedback
                </Link>
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
};

export default Navbar;
