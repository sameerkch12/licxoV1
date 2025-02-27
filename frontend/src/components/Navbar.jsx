import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoReorderThree } from "react-icons/io5";
import { IoPersonCircleSharp } from "react-icons/io5";
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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogin = () => {
    setDropdownOpen(false);
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setDropdownOpen(false);
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

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-lg text-white"
            >
              {username && username[0]?.toUpperCase()}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-black hover:bg-gray-200"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="block w-full px-4 py-2 text-left text-black hover:bg-gray-200"
                  >
                    Login
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="fixed top-0 left-0 w-full h-14 bg-white border-b flex items-center justify-between z-10 lg:hidden px-4">
        <button className="text-black text-5xl">
          <IoReorderThree />
        </button>
        <img src={logo} alt="logo" className="h-12" />
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-center w-10 h-10 text-2xl text-black"
          >
            {isAuthenticated ? (
              <span className="bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center text-lg text-white">
                {username && username[0]?.toUpperCase()}
              </span>
            ) : (
              <IoPersonCircleSharp />
            )}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-black hover:bg-gray-200"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="block w-full px-4 py-2 text-left text-black hover:bg-gray-200"
                >
                  Login
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;