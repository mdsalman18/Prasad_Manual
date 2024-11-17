import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { BarChart, Newspaper, Book, Computer, Menu } from "lucide-react";
import { Tooltip } from "@mui/material";

const AdminPortal = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`transition-all duration-300 ${
          isSidebarVisible ? "w-72" : "w-0"
        } h-screen bg-gradient-to-br from-black to-gray-900 overflow-hidden shadow-lg`}
      >
        <div
          className={`transition-opacity duration-300 ${
            isSidebarVisible ? "opacity-100" : "opacity-0"
          } flex flex-col items-center`}
        >
          <a href="/adminportal">
            <h1 className="text-2xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-500 mt-2">
              Admin Portal
            </h1>
          </a>
          {/* <img
            src=""
            alt="photo"
            className="w-20 h-20 rounded-full border-2 border-gray-500 shadow-lg mt-4"
          />
          <h1 className="mt-4 text-lg font-semibold text-white uppercase">
            Admin Name
          </h1> */}
        </div>

        {isSidebarVisible && (
          <nav className="mt-8 space-y-4">
            <Tooltip title="Add new batches for the upcoming semester" arrow>
              <a
                href="/addnew"
                className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-500 hover:text-white transform hover:scale-105 transition-all"
              >
                <BarChart className="h-5 w-5" />
                <span className="ml-3 text-sm">Add New Batches</span>
              </a>
            </Tooltip>

            <Tooltip title="Register a new student to the system" arrow>
              <a
                href="/newstu"
                className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-500 hover:text-white transform hover:scale-105 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="7" r="4" />
                  <path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2" />
                </svg>
                <span className="ml-3 text-sm">Add New Student</span>
              </a>
            </Tooltip>

            <Tooltip title="Add new employees or professors" arrow>
              <a
                href="/newemp"
                className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-500 hover:text-white transform hover:scale-105 transition-all"
              >
                <Newspaper className="h-5 w-5" />
                <span className="ml-3 text-sm">Add New Staff</span>
              </a>
            </Tooltip>
          </nav>
        )}
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarVisible ? "pl-62" : "pl-0"} p-8 bg-gradient-to-br from-black to-gray-900 text-white`}>
      <button
          className="text-white bg-gray-700 px-4 py-2 rounded-full"
          onClick={() => setSidebarVisible(!isSidebarVisible)}
        >
          <Menu className=""/>
          {/* {isSidebarVisible ? "Hide Sidebar" : "Show Sidebar"} */}
        </button>

        <Outlet />

        {/* KPI Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Total Batches", value: 10, icon: <BarChart />, width: "10%" },
            { title: "Total Students", value: 250, icon: <Computer />, width: "25%" },
            { title: "Total Teachers", value: 15, icon: <Newspaper />, width: "15%" },
            { title: "Total Subjects", value: 5, icon: <Book />, width: "25%" },
            { title: "Total Sessions", value: 20, icon: <Computer />, width: "40%" },
          ].map((kpi, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-all"
            >
              <div className="text-gray-400 mb-4">{kpi.icon}</div>
              <h3 className="text-2xl font-semibold">{kpi.title}</h3>
              <p className="text-5xl font-bold text-gray-400 mt-2">{kpi.value}</p>
              <div className="w-full bg-gray-600 rounded-full h-2 mt-4">
                <div className="bg-white h-2 rounded-full" style={{ width: kpi.width }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
