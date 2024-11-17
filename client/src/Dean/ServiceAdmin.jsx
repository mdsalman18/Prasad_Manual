import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { BarChart, Newspaper, Menu } from "lucide-react";

const ServiceAdmin = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div className="flex h-screen">
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
          <a href="/service/monthly">
            <h1 className="text-2xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-500 mt-2">
              Dean Portal
            </h1>
          </a>
          {/* <img
            src=""
            alt="photo"
            className="w-20 h-20 rounded-full border-2 border-gray-500 shadow-lg mt-4"
          />
          <h1 className="mt-4 text-lg font-semibold text-white uppercase">
            Dean Name
          </h1> */}
        </div>

        <nav className="mt-8 space-y-4">
          <Tooltip title="View attendance records" arrow>
            <a
              href="/service/viewattendance"
              className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-500 hover:text-white"
            >
              <BarChart className="h-5 w-5" />
              <span className="ml-3 text-sm">View Attendance</span>
            </a>
          </Tooltip>
          <Tooltip title="Monthly Reports" arrow>
            <a
              href="/service/monthly"
              className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-500 hover:text-white"
            >
              <Newspaper className="h-5 w-5" />
              <span className="ml-3 text-sm">Monthly Report</span>
            </a>
          </Tooltip>
        </nav>
      </aside>

      <main className={'flex-1 bg-black overflow-auto transition-all duration-300 ${isSidebarVisible ? "pl-62" : "pl-0"} p-8'}>      
        <button
          className="text-white bg-gray-700 px-4 py-2 rounded-full"
          onClick={() => setSidebarVisible(!isSidebarVisible)}
        >
          <Menu className=""/>
          {/* {isSidebarVisible ? "Hide Sidebar" : "Show Sidebar"} */}
        </button>
        
        <Outlet />
      </main>
    </div>
  );
};

export default ServiceAdmin;
