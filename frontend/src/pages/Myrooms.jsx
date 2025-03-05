import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';

export default function Myrooms() {
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Container for Button with Better Spacing */}
      <div className="flex justify-center mt-16">
        <button 
          onClick={() => navigate('/addhotel')} 
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 shadow-lg"
        >
          Add Room
        </button>
      </div>
    </>
  )
}
