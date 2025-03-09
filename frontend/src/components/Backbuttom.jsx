import React from 'react'
import {
 ArrowLeft,
   
  } from "lucide-react"
  import { Link } from "react-router-dom";

export default function Backbuttom() {
  return (
    <div>
       <div className="mb-8 flex items-center ">
              <Link
                to="/"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span>Back </span>
              </Link>
            </div>
    </div>
  )
}
