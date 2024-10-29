import React from "react";
import { Outlet, Link } from "react-router-dom";
import { BarChart, Newspaper, Book, Computer } from "lucide-react";
import { Tooltip } from "@mui/material"; // Added Tooltip from MUI for interactivity


const AdminPortal = () => {
  return (
    <div className="flex">
      
      <div className="flex-1 p-10 bg-gradient-to-br from-black to-gray-900 shadow-inner rounded-lg text-white">
        
  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300">
    <div className="flex items-center justify-center text-yellow-500 mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    </div>
    <h3 className="text-3xl font-bold text-white">Total Batches</h3>
    <p className="text-5xl font-extrabold text-yellow-500">10</p>
    <div className="w-full bg-gray-600 rounded-full h-2.5 mt-4">
      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "10%" }}></div>
    </div>
  </div>

  {/* Total Students */}
  <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300">
    <div className="flex items-center justify-center text-yellow-500 mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2" />
      </svg>
    </div>
    <h3 className="text-3xl font-bold text-white">Total Students</h3>
    <p className="text-5xl font-extrabold text-yellow-500">250</p>
    <div className="w-full bg-gray-600 rounded-full h-2.5 mt-4">
      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "25%" }}></div>
    </div>
  </div>

  {/* Total Teachers */}
  <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300">
    <div className="flex items-center justify-center text-yellow-500 mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20v-2a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v2" />
        <circle cx="8" cy="7" r="4" />
      </svg>
    </div>
    <h3 className="text-3xl font-bold text-white">Total Teachers</h3>
    <p className="text-5xl font-extrabold text-yellow-500">15</p>
    <div className="w-full bg-gray-600 rounded-full h-2.5 mt-4">
      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "15%" }}></div>
    </div>
  </div>

  {/* Total Subjects */}
  <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300">
    <div className="flex items-center justify-center text-yellow-500 mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="6" r="4" />
      </svg>
    </div>
    <h3 className="text-3xl font-bold text-white">Total Subjects</h3>
    <p className="text-5xl font-extrabold text-yellow-500">5</p>
    <div className="w-full bg-gray-600 rounded-full h-2.5 mt-4">
      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "25%" }}></div>
    </div>
  </div>

  {/* Total Sessions */}
  <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300">
    <div className="flex items-center justify-center text-yellow-500 mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M3 12h18M12 3v18" />
      </svg>
    </div>
    <h3 className="text-3xl font-bold text-white">Total Sessions</h3>
    <p className="text-5xl font-extrabold text-yellow-500">20</p>
    <div className="w-full bg-gray-600 rounded-full h-2.5 mt-4">
      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "40%" }}></div>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default AdminPortal;
