import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import {
  BarChart,
  Wallet,
  Newspaper,
  BellRing,
  Paperclip,
  Brush,
  Wrench,
} from "lucide-react";


const ServiceAdmin = () => {
  return (
    
    <div className="flex">
      <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r bg-black px-5 py-8">
        {/* <img src="" alt="photo" className="w10" /> */}
        <div className="mt-6 flex flex-1 flex-col justify-between">
          <nav className="mx-3 space-y-6 ">
            <div className="mx-3 space-y-6">
            <label className="px-3 text-xl font-semibold uppercase text-white">
                Dean Portal
              </label>
            </div>
            <div className="space-y-3 ">
              <label className="px-3 text-lg font-semibold uppercase text-white">
                Dean Name
              </label>
              <NavLink
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
                to="viewattendance"
              >
                <BarChart className="h-5 w-5" aria-hidden="true" />

                <span className="mx-2 text-sm font-medium">View Attendance</span>
              </NavLink>

                <a
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  href="/service/monthly"
                >
                  <Newspaper className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">Monthly Report</span>
                </a>

                {/* <a
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  href="#"
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
                  class="lucide lucide-library"
                >
                  <path d="m16 6 4 14" />
                  <path d="M12 6v14" />
                  <path d="M8 8v12" />
                  <path d="M4 4v16" />
                </svg>
                  <span className="mx-2 text-sm font-medium">Quarterly Report</span>
                </a> */}

                <a
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  href="#"
                >
                  <Wrench className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">Modify Attendance</span>
                </a>

                <NavLink
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  to="addbatch"
                >
                  <Wrench className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">Upload CSV</span>
                </NavLink>
              </div>
          </nav>
        </div>
      </aside>
      <Outlet />
    </div>
  );
};

export default ServiceAdmin;