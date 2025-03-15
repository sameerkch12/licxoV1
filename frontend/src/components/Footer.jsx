import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className=" bg-[#000000] text-white">
      <div className="container mx-auto px-4 py-10">
        {/* Top section with logo and social links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-700 pb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-2xl font-bold">Licxo</span>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/share/15puDoG1pp/?mibextid=qi2Omg"
              className="hover:text-red-500 transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/AssociateL94400?t=XWpJtb3kMygoUthJEGh89g&s=08"
              className="hover:text-red-500 transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/licxo1?igsh=MXJ4czl5eDgwNXRi&utm_source=qr"
              className="hover:text-red-500 transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/licxo-logistics-b23330354?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              className="hover:text-red-500 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400 mb-4 text-justify">
              Welcome to <span className="text-lg font-bold">Licxo</span>, your
              one-stop destination for finding the best rental properties,
              rooms, and PGs (Paying Guest accommodations) near you. At{" "}
              <span className="text-lg font-bold">Licxo</span>, we make the
              process of finding a rental property easier and more convenient by
              offering a wide range of options for rooms, PGs, and entire
              properties. Whether you're searching for a comfortable room, a
              budget-friendly PG, or a fully furnished rental property,{" "}
              <span className="text-lg font-bold">Licxo</span> has something to
              suit every need. Not only can you find available rentals, but you
              can also list your own property, room, or PG to reach a wider
              audience. Our platform integrates seamlessly with Google Maps,
              allowing users to easily find PGs, rooms, and properties near
              their location. Explore the vast variety of options at{" "}
              <span className="text-lg font-bold">Licxo</span> and make your
              property search hassle-free today!
            </p>

            <div className="flex items-center text-gray-400 mb-2">
              <Phone className="h-4 w-4 mr-2" />
              <span className="font-bold text-base">+91 8085439701</span>
            </div>
            <div className="flex items-center text-gray-400">
              <Mail className="h-4 w-4 mr-2" />
              <span className="font-bold text-base">
                licxologistics@gmail.com
              </span>
            </div>
          </div>

          

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to the Licxo newsletter for the latest rental
              properties, rooms, and PGs. Stay updated with new listings and
              exclusive offers on Licxo. Don’t miss out—join the Licxo community
              today!
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your Email Address"
                className="px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        {/* Quick Links with React Router Links */}
        <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Properties", path: "/properties" },
                { name: "Contact Us", path: "/contact" },
                { name: "FAQs", path: "/faqs" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-red-500 transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        {/* Popular Locations */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-red-500">
            Popular Locations At <span className="text-">Licxo</span>
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["Durg", "Raipur"],
              ["Bhilai", "Charoda"],
            ].map((pair, index) => (
              <div key={index} className="flex gap-4">
                {pair.map((city) => (
                  <a
                    key={city}
                    href="#"
                    className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg shadow hover:bg-red-500 hover:text-white transition-colors text-sm text-center w-full"
                  >
                    {city}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Licxo. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link
              to="/private_policy"
              className="hover:text-red-500 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms_of_service"
              className="hover:text-red-500 transition-colors"
            >
              Terms of Service
            </Link>
            <Link to="/" className="hover:text-red-500 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
