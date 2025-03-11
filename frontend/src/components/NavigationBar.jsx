import { IoMdHome } from "react-icons/io";
import { FiPlusCircle } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  return !!localStorage.getItem("token");
};

const NavigationBar = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();

  const handleAddHotel = () => {
    if (isAuthenticated) {
      navigate("/addhotel");
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="fixed bottom-0 left-0 h-20 w-full bg-blue-950 rounded-t-3xl lg:hidden">
        <ul className="flex justify-between items-center px-6 h-full">
          <li className="flex flex-col items-center">
            <a href="/" className="flex flex-col items-center text-white">
              <IoMdHome className="text-2xl" />
              Home
            </a>
          </li>
          <li>
            <button onClick={handleAddHotel} className="flex flex-col items-center text-white">
              <FiPlusCircle className="text-2xl" />
              Add
            </button>
          </li>
          <li>
            <a href="/profile" className="flex flex-col items-center text-white">
              <CgProfile className="text-2xl" />
              Profile
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavigationBar;
