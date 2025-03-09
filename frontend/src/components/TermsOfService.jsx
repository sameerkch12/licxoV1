import React from "react"
import {
  Scroll,
  Shield,
  UserCheck,
  Home,
  AlertCircle,
  Lock,
  FileText,
  Mail
} from "lucide-react"
import Backbuttom from "./Backbuttom"

const TermsOfService = () => {
  return (
    
    <div className="max-w-4xl mx-auto">
        <div className="flex mt-7">
        <Backbuttom/>
        </div>
       

      <div className="bg-[#5850EC] text-white p-8 rounded-t-xl relative">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
          <p className="opacity-90">Effective Date: March 14, 2024</p>
        </div>
        <Shield className="absolute right-8 top-1/2 -translate-y-1/2 w-8 h-8 opacity-80" />
      </div>

      <div className="bg-white p-6 rounded-b-xl shadow-lg">
        <div className="space-y-8">
          <section className="prose">
            <div className="flex items-start gap-4">
              <Scroll className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Welcome to Licxo!
                </h2>
                <p className="text-gray-600">
                  These Terms of Service ("Terms") govern your use of our
                  platform and services. By accessing or using Licxo, you agree
                  to comply with these Terms. If you do not agree, please
                  refrain from using our services.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-start gap-4">
              <Home className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  1. Use of Services
                </h2>
                <p className="text-gray-600">
                  Licxo provides a platform for users to find rental properties.
                  You must be at least 18 years old to use our services. You
                  agree not to misuse our platform, violate any laws, or
                  interfere with other users' rights.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-start gap-4">
              <UserCheck className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  2. User Accounts and Responsibilities
                </h2>
                <p className="text-gray-600">
                  To list or contact property owners, you may need to create an
                  account. You are responsible for maintaining the
                  confidentiality of your account details and ensuring their
                  accuracy.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  3. Property Listings and Accuracy
                </h2>
                <p className="text-gray-600">
                  Users who list rental properties on Licxo must ensure that all
                  details, including descriptions and images, are accurate and
                  up to date.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-start gap-4">
              <Lock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  4. Privacy and Data Protection
                </h2>
                <p className="text-gray-600">
                  Your privacy is important to us. By using our services, you
                  acknowledge that Licxo may collect and process your personal
                  data in accordance with our Privacy Policy.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  5. Limitations of Liability
                </h2>
                <p className="text-gray-600">
                  Licxo provides its services on an "as is" basis. We do not
                  guarantee the availability, accuracy, or reliability of
                  listings.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  6. Termination of Services
                </h2>
                <p className="text-gray-600">
                  Licxo reserves the right to suspend or terminate your account
                  at any time if you violate these Terms. Users may also delete
                  their accounts at their discretion.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Contact Us
                </h2>
                <p className="text-gray-600">
                  For any questions regarding our Terms of Service, please
                  contact us at licxologistics@gmail.com
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          Thank you for using Licxo!
        </div>
      </div>
    </div>
  )
}

export default TermsOfService
