import React from "react"
import { MapPin, Phone, Mail, Building, Shield } from "lucide-react"
import Backbuttom from "../components/Backbuttom"

const ContactUs = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex mt-8">

      <Backbuttom/>
      </div>
     
      <div className="bg-[#5850EC] text-white p-8 rounded-t-xl relative">
       
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
          <p className="opacity-90">We're here to help!</p>
        </div>
        <Shield className="absolute right-8 top-1/2 -translate-y-1/2 w-8 h-8 opacity-80" />
      </div>

      <div className="bg-white p-8 rounded-b-xl shadow-lg">
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <Building className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Our Company
              </h2>
              <p className="text-gray-600 text-lg font-medium">Licxo.in</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Mailing Address
              </h2>
              <p className="text-gray-600">
                Dakshin Vasundhara nagar, Bhilai-3,
                <br />
                Behind Puri typing charoda,
                <br />
                Durg, Chhattisgarh
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Phone
              </h2>
              <a
                href="tel:+919303393026"
                className="text-blue-600 hover:text-blue-800 text-lg"
              >
                +91 93033 93026
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Email
              </h2>
              <a
                href="mailto:licxologistics@gmail.com"
                className="text-blue-600 hover:text-blue-800 break-all"
              >
                licxologistics@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-600">
            We aim to respond to all inquiries within 24 hours during business
            days.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
