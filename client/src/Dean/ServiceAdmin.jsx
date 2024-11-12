import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { BarChart, Newspaper } from "lucide-react";

const ServiceAdmin = () => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gradient-to-br from-black to-gray-900 p-6 shadow-lg">
        <div className="flex flex-col items-center">
          <NavLink to="monthly">
            <h1 className="text-2xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-500 mt-2">
              Dean Portal
            </h1>
          </NavLink>
          <img
            src=""
            alt="photo"
            className="w-20 h-20 rounded-full border-2 border-gray-500 shadow-lg mt-4"
          />
          <h1 className="mt-4 text-lg font-semibold text-white uppercase">
            Dean Name
          </h1>
        </div>

        <nav className="mt-8 space-y-4">
          <Tooltip title="View attendance records" arrow>
            <NavLink
              to="viewattendance"
              className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-500 hover:text-white"
            >
              <BarChart className="h-5 w-5" />
              <span className="ml-3 text-sm">View Attendance</span>
            </NavLink>
          </Tooltip>
          <Tooltip title="Monthly Reports" arrow>
            <NavLink
              to="monthly"
              className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-500 hover:text-white"
            >
              <Newspaper className="h-5 w-5" />
              <span className="ml-3 text-sm">Monthly Report</span>
            </NavLink>
          </Tooltip>
        </nav>
      </aside>

      <main className="flex-1 bg-black overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default ServiceAdmin;

