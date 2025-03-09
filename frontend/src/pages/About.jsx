import React from "react"
import { Home, Mail, Phone, Search, Users, Clock, Shield } from "lucide-react"


export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
    <div className="bg-[#5850EC] text-white p-8 rounded-t-xl relative">
      <button className="absolute left-4 top-4 text-white/80 hover:text-white">
        ← Back
      </button>
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">About Licxo</h1>
        <p className="opacity-90">Your Trusted Property Partner</p>
      </div>
      <Shield className="absolute right-8 top-1/2 -translate-y-1/2 w-8 h-8 opacity-80" />
    </div>

    <div className="bg-white p-8 rounded-b-xl shadow-lg">
      <div className="space-y-12">
        {/* Mission Statement */}
        <div className="text-center max-w-2xl mx-auto">
          <Home className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Discover your ideal PG or rental house with LicXo. We connect
            property owners with tenants to make finding accommodations easier
            and faster.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 py-8">
          <div className="text-center">
            <Search className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Easy Search</h3>
            <p className="text-gray-600">
              Find your perfect accommodation with our intuitive search system
            </p>
          </div>
          <div className="text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">
              Direct Connection
            </h3>
            <p className="text-gray-600">
              Connect directly with property owners and tenants
            </p>
          </div>
          <div className="text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">
              Quick Process
            </h3>
            <p className="text-gray-600">
              Save time with our streamlined rental process
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Get in Touch
          </h2>
          <div className="space-y-4 max-w-md mx-auto">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-600" />
              <a
                href="tel:+918085439701"
                className="text-blue-600 hover:text-blue-800"
              >
                +91 8085439701
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <a
                href="mailto:licxologistics@gmail.com"
                className="text-blue-600 hover:text-blue-800"
              >
                licxologistics@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="text-center text-gray-600 pt-6 border-t border-gray-200">
          <p>Trusted by property owners and tenants across India</p>
        </div>
      </div>
    </div>
  </div>
  )
}
