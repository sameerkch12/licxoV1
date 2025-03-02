import { useState ,useEffect } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Smartphone, Lock, User, ArrowRight, CheckCircle, Home, LogOut } from "lucide-react";

// Use your own API URL here
const API_URL = import.meta.env.VITE_API_URL || "https://api.example.com";

const Login = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      // Immediately navigate to your Home route
      navigate("/");
    }
  }, [isLoggedIn]);

  // Handle sending OTP
  const handleSendOtp = async () => {
    if (!phoneNumber) return alert("Please enter a phone number.");
    setLoading(true);

    try {
      await axios.post(`${API_URL}/api/v1/user/send-otp`, { phoneNumber });
      setStep(2);
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle verifying OTP
  const handleVerifyOtp = async () => {
    if (!otp) return alert("Please enter the OTP.");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/v1/user/verify`, {
        phoneNumber,
        code: otp,
      });

      if (response.data.userExists) {
        // User exists; login
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        setIsLoggedIn(true);
      } else {
        // New user; go to username step
        setUserExists(false);
        setStep(3);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle completing registration
  const handleCompleteRegistration = async () => {
    if (!username) return alert("Please enter a username.");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/v1/user/register`, {
        phoneNumber,
        username,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", username);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error completing registration:", error);
      alert("Failed to complete registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
  };

  // Framer-motion variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // If user is logged in, show header + logout only (no welcome box)
 

  // Otherwise show login flow
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Image and branding */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Home size={32} />
            <h1 className="text-4xl font-bold">RoomFinder</h1>
          </div>
          <p className="text-blue-100 text-lg">Find your perfect room in minutes</p>
        </div>
        
        <div className="relative h-64">
          <img 
            src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
            alt="Modern room interior" 
            className="absolute bottom-0 left-0 w-full h-full object-cover rounded-lg opacity-80"
          />
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 p-3 rounded-lg">
            <p className="text-white text-sm">Hundreds of rooms available in your area</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-blue-200">© 2025 RoomFinder. All rights reserved.</p>
        </div>
      </div>
      
      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-gray-50">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="w-full max-w-md"
        >
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  <Smartphone size={20} />
                </div>
                <span className="text-xs mt-1">Phone</span>
              </div>
              
              <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  <Lock size={20} />
                </div>
                <span className="text-xs mt-1">Verify</span>
              </div>
              
              <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  <User size={20} />
                </div>
                <span className="text-xs mt-1">Profile</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-2 text-gray-800">
              {step === 1 && "Find Your Room"}
              {step === 2 && "Verification"}
              {step === 3 && "Create Profile"}
            </h2>
            
            <p className="text-gray-600 mb-6">
              {step === 1 && "Enter your phone number to get started"}
              {step === 2 && "Enter the OTP sent to your phone"}
              {step === 3 && "Choose a username for your account"}
            </p>

            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative mb-6">
                  <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <button
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending OTP...
                    </div>
                  ) : (
                    <>
                      Continue <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <div className="flex justify-center gap-2">
                    {[...Array(6)].map((_, i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl font-bold"
                        value={otp[i] || ""}
                        onChange={(e) => {
                          const newOtp = otp.split('');
                          newOtp[i] = e.target.value;
                          setOtp(newOtp.join(''));
                          
                          // Auto-focus next input
                          if (e.target.value && i < 5) {
                            const nextInput = e.target.parentElement?.nextElementSibling?.querySelector('input');
                            if (nextInput) nextInput.focus();
                          }
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Didn't receive code? <button className="text-blue-600 font-medium">Resend</button>
                  </p>
                </div>
                <button
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Verifying...
                    </div>
                  ) : (
                    <>
                      Verify OTP <CheckCircle size={18} />
                    </>
                  )}
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative mb-6">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <button
                  onClick={handleCompleteRegistration}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating Account...
                    </div>
                  ) : (
                    <>
                      Complete Registration <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </motion.div>
            )}
            
            <div className="mt-6 text-center text-sm text-gray-600">
              {step === 1 && (
                <p>
                  By continuing, you agree to our{" "}
                  <a href="#" className="text-blue-600 font-medium">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 font-medium">
                    Privacy Policy
                  </a>
                </p>
              )}
              {step > 1 && (
                <button onClick={() => setStep(step - 1)} className="text-blue-600 font-medium">
                  Go back to previous step
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
