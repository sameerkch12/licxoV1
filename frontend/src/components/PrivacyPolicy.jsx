import React from "react"
import {
  Shield,
  Mail,
  MapPin,
  Lock,
  Bell,
  Users,
  Database,
  ArrowLeft,
  FileText,
  RefreshCw
} from "lucide-react"
import { Link } from "react-router-dom";

const PolicySection = ({ icon: Icon, title, content }) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-3">
      <Icon className="w-6 h-6 text-indigo-600 flex-shrink-0" />
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
    </div>
    <div className="text-gray-600 leading-relaxed pl-9">{content}</div>
  </div>
)

export default function PrivacyPolicy({ onBack }) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })

  const sections = [
    {
      icon: Database,
      title: "Information Received, Collected, and Stored by the Company",
      content:
        "Licxo collects and stores various types of information to provide and improve our services. This includes personal details such as your name, mobile number, email address, and home address. Additionally, we collect rental property details, including images and house addresses, submitted by users. Any user-generated content, such as messages or additional listing details, is also stored to facilitate the rental process. Users have the option to delete their rental property listings at any time, ensuring full control over their shared data."
    },
    {
      icon: Bell,
      title:
        "Information Automatically Collected / Tracked While Navigation (Clear GIFs)",
      content:
        "While navigating our platform, we may automatically collect certain data to enhance user experience and improve our services. This includes technical details such as your IP address, browser type, operating system, and device model. We also collect and store location details to provide relevant rental property suggestions. Additionally, we use clear GIFs and cookies to track user engagement, analyze usage trends, and optimize website functionality."
    },
    {
      icon: Users,
      title: "Information from Other Sources",
      content:
        "We may receive information from third-party sources to enhance our service offerings. This may include publicly available data from government records or real estate listings. If users log in through third-party authentication services such as Google or Facebook, we may access limited account details from these platforms. Such integrations help improve security and provide seamless access to our services."
    },
    {
      icon: FileText,
      title: "How Collected Data is Used",
      content:
        "The information we collect is used primarily to improve and personalize our services. We facilitate communication between property owners and renters, verify property listings, and prevent fraudulent activities. Additionally, we use the data to send important updates, service notifications, and promotional offers. Location-based data helps us recommend rental properties that best match user preferences. Our goal is to ensure a seamless and efficient rental experience for all users."
    },
    {
      icon: Users,
      title: "Information Sharing",
      content:
        "Licxo does not sell or rent personal user data. However, certain information may be shared under specific circumstances. Property-related details are shared between property owners and renters to facilitate transactions. We may also share necessary information with third-party service providers who assist in platform operations, such as payment processing and data storage. Additionally, we may disclose information if required by law, to comply with legal obligations, or in response to legal requests. In cases of business mergers or acquisitions, user data may be transferred as part of the company's assets."
    },
    {
      icon: Lock,
      title: "Information Security",
      content:
        "To safeguard your information, we implement robust security measures, including data encryption, secure storage systems, and strict access controls. Regular security audits are conducted to prevent unauthorized access and data breaches. We are committed to continuously enhancing our security practices to ensure the safety of user information."
    },
    {
      icon: RefreshCw,
      title: "Updates and Changes",
      content:
        "This Privacy Policy may be updated periodically to reflect changes in our data handling practices or legal requirements. Users will be notified of significant changes via email or through updates posted on our website. The updated policy will be effective as of the date specified at the top of this document."
    }
  ]

  return (

    <div className="min-h-screen bg-gray-50">
     
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center ">
        <Link
          to="/"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back </span>
        </Link>
      </div>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-8 sm:px-10">
            <div className="flex items-center justify-between">
              <div>

                <h1 className="text-3xl font-bold text-white">
                  Privacy Policy
                </h1>
                <p className="mt-2 text-indigo-100">
                  Effective Date: {currentDate}
                </p>
              </div>
              <Shield className="w-12 h-12 text-white opacity-80" />
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-8 sm:px-10">
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-8 leading-relaxed">
                Licxo Company is committed to
                protecting your privacy. This Privacy Policy outlines how we
                collect, use, store, and share your information when you use our
                services to find rental properties. By using our platform, you
                consent to the practices described in this policy.
              </p>

              {sections.map((section, index) => (
                <PolicySection
                  key={index}
                  icon={section.icon}
                  title={section.title}
                  content={section.content}
                />
              ))}

              {/* Contact Section */}
              <div className="mt-12 p-6 bg-gray-50 rounded-xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Contact Us
                </h2>
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-5 h-5 text-indigo-600" />
                  <a
                    href="mailto:contact@licxo.com"
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    licxologistics@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                  <span className="text-gray-600">Bhilai, chhattisgarh</span>
                </div>
              </div>

              <p className="text-gray-600 mt-8 text-center">
                Thank you for trusting Licxo with your rental needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
