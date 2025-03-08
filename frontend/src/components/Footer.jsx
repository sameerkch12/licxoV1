import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        {/* Top section with logo and social links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-700 pb-6">
          <div className="flex items-center mb-4 md:mb-0">
            
            <span className="text-2xl font-bold">Licxo</span>
          </div>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/share/15puDoG1pp/?mibextid=qi2Omg" className="hover:text-red-500 transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://x.com/AssociateL94400?t=XWpJtb3kMygoUthJEGh89g&s=08" className="hover:text-red-500 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com/licxo1?igsh=MXJ4czl5eDgwNXRi&utm_source=qr" className="hover:text-red-500 transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/licxo-logistics-b23330354?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="hover:text-red-500 transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400 mb-4">
              Discover your ideal PG or rental house with LicXo. We connect property owners with tenants to make finding accommodations easier and faster.
            </p>
            <div className="flex items-center text-gray-400 mb-2">
              <Phone className="h-4 w-4 mr-2" />
              <span>+91 8085439701</span>
            </div>
            <div className="flex items-center text-gray-400">
              <Mail className="h-4 w-4 mr-2" />
              <span>licxologistics@gmail.com</span>
            </div>
          </div>

          {/* Quick Links with React Router Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Properties', path: '/properties' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'FAQs', path: '/faqs' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-gray-400 hover:text-red-500 transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Property Types</h3>
            <ul className="space-y-2">
              {['Single Rooms', 'Shared Apartments', 'PG Accommodations', 'Studio Apartments', 'Flats'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-red-500 transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest property listings and updates.
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

        {/* Popular Locations */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Popular Locations</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {['Durg', 'Raipur', 'Bhilai', 'Charoda',].map((city) => (
              <a
                key={city}
                href="#"
                className="text-gray-400 hover:text-red-500 transition-colors text-sm"
              >
                {city}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Licxo. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link to="/private_policy" className="hover:text-red-500 transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-red-500 transition-colors">Terms of Service</Link>
            <Link to="/" className="hover:text-red-500 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
