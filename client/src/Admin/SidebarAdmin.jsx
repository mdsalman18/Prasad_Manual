import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { BarChart, Newspaper, Book, Computer } from "lucide-react";
import { Tooltip } from "@mui/material";

const SidebarAdmin = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="fixed h-screen w-64 flex flex-col bg-gradient-to-br from-black to-gray-900 px-5 py-8 shadow-xl">
        <div className="flex justify-center items-center mt-1">
          <h1 className="text-2xl font-bold uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-gray-500 to-red-500 animate-text mt-1">
            Admin Portal
          </h1>
        </div>
    <NavLink to="/adminportal">
        <img
          src=""
          alt="photo"
          className="w-16 h-16 rounded-full border-2 border-yellow-500 shadow-lg mx-auto"
        />
    </NavLink>
        <h1 className="mt-4 text-xl font-semibold text-white uppercase">
          Admin Name
        </h1>

        <div className="mt-6 flex flex-1 flex-col justify-between">
          <nav className="space-y-7">
            <div className="space-y-3">
              <Tooltip title="Add new batches for the upcoming semester" arrow>
                <NavLink
                  className="flex items-center rounded-lg px-3 py-2 text-gray-200 transition duration-300 hover:bg-yellow-500 hover:text-white transform hover:scale-105"
                  to="addnew"
                >
                  <BarChart className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">Add New Batches</span>
                </NavLink>
              </Tooltip>
              <Tooltip title="Register a new student to the system" arrow>
                <NavLink
                  className="flex items-center rounded-lg px-3 py-2 text-gray-200 transition duration-300 hover:bg-yellow-500 hover:text-white transform hover:scale-105"
                  to="newstu"
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
                </NavLink>
              </Tooltip>
              <Tooltip title="Add new employees or professors" arrow>
                <NavLink
                  className="flex items-center rounded-lg px-3 py-2 text-gray-200 transition duration-300 hover:bg-yellow-500 hover:text-white transform hover:scale-105"
                  to="newemp"
                >
                  <Newspaper className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">Add New Employees/Staff</span>
                </NavLink>
              </Tooltip>
              <Tooltip title="Add new subjects to the curriculum" arrow>
                <NavLink
                  className="flex items-center rounded-lg px-3 py-2 text-gray-200 transition duration-300 hover:bg-yellow-500 hover:text-white transform hover:scale-105"
                  to="newsub"
                >
                  <Book className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">Add New Subjects</span>
                </NavLink>
              </Tooltip>
              <Tooltip title="Create and manage classes or sections" arrow>
                <NavLink
                  className="flex items-center rounded-lg px-3 py-2 text-gray-200 transition duration-300 hover:bg-yellow-500 hover:text-white transform hover:scale-105"
                  to="newcsv"
                >
                  <Computer className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">Upload CSV</span>
                </NavLink>
              </Tooltip>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main style={{scrollbarWidth: "none"}} className="ml-64 w-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarAdmin;
