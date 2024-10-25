import React from "react";
import { Outlet, Link } from "react-router-dom";
import { BarChart, Newspaper, Book, Computer } from "lucide-react";
import { Tooltip } from "@mui/material"; // Added Tooltip from MUI for interactivity


const AdminPortal = () => {
  return (
    <div className="flex">
      <aside className="flex h-screen w-64 flex-col overflow-y-auto bg-gradient-to-br from-black to-gray-900 px-5 py-8 shadow-xl">
        <div className="flex justify-center items-center mt-1">
        <h1
  className="text-2xl md:text-2xl font-bold uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-gray-500 to-red-500 animate-text mt-1"
>
  Admin Portal
</h1>

        </div>

        <img
          src=""
          alt="photo"
          className="w-16 h-16 rounded-full border-2 border-yellow-500 shadow-lg mx-auto"
        />
        <h1 className="mt-4 text-xl font-semibold text-white uppercase">
            Anurag Rathore
          </h1>

        <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="space-y-7">
            <div className="space-y-3">
              <Tooltip title="Add new batches for the upcoming semester" arrow>
                <a
                  className="flex items-center rounded-lg px-3 py-2 text-gray-200 transition duration-300 hover:bg-yellow-500 hover:text-white transform hover:scale-105"
                  href="/addnew"
                >
                  <BarChart className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">Add New Batches</span>
                </a>
              </Tooltip>
              <Tooltip title="Register a new student to the system" arrow>
                <a
                  className="flex items-center rounded-lg px-3 py-2 text-gray-200 transition duration-300 hover:bg-yellow-500 hover:text-white transform hover:scale-105"
                  href="/newstu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-user"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span className="mx-2 text-sm font-medium">Add New Student</span>
                </a>
              </Tooltip>
              <Tooltip title="Add new employees or professors" arrow>
                <a
                  className="flex items-center rounded-lg px-3 py-2 text-gray-200 transition duration-300 hover:bg-yellow-500 hover:text-white transform hover:scale-105"
                  href="/newemp"
                >
                  <Newspaper className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">
                    Add New Employees/Professors
                  </span>
                </a>
              </Tooltip>
              <Tooltip title="Add new subjects to the curriculum" arrow>
                <a
                  className="flex items-center rounded-lg px-3 py-2 text-gray-200 transition duration-300 hover:bg-yellow-500 hover:text-white transform hover:scale-105"
                  href="/newsub2"
                >
                  <Book className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">Add New Subjects</span>
                </a>
              </Tooltip>
              <Tooltip title="Create and manage classes or sections" arrow>
                <a
                  className="flex items-center rounded-lg px-3 py-2 text-gray-200 transition duration-300 hover:bg-yellow-500 hover:text-white transform hover:scale-105"
                  href="/adminportal"
                >
                  <Computer className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">
                    Create Class/Sections
                  </span>
                </a>
              </Tooltip>
            </div>
          </nav>
        </div>
      </aside>

      <div className="flex-1 p-10 bg-gradient-to-br from-black to-gray-900 shadow-inner rounded-lg text-white">
        <Outlet />
        
        {/* KPI Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Total Batches */}
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
