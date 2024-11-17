import React from "react";
import { Tooltip } from "@mui/material";

const AdminPortal = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black to-gray-600">
      {/* Centered Container */}
      <div className="w-96 p-8 bg-gradient-to-br from-black to-gray-900 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-500 animate-text mb-6">
          Attendance Portal
        </h1>
        <img
          src=""
          alt="photo"
          className="w-24 h-24 rounded-full border-2 border-gray-500 shadow-lg mx-auto mb-4"
        />
        <h2 className="text-lg font-semibold text-white uppercase mb-8">
          Staff Name
        </h2>

        {/* Buttons for Attendance Options */}
        <div className="flex flex-col gap-6">
          <Tooltip title="Mark attendance manually" arrow>
            <a href="/attendence">
              <button className="w-full px-6 py-3 text-lg font-semibold text-gray-200 bg-gray-700 hover:bg-gray-600 rounded-lg shadow-md transition">
                Manual Attendance
              </button>
            </a>
          </Tooltip>

          <Tooltip title="Mark attendance using facial recognition" arrow>
            <a href="http://127.0.0.1:8001/">
              <button className="w-full px-6 py-3 text-lg font-semibold text-gray-200 bg-gray-700 hover:bg-gray-600 rounded-lg shadow-md transition">
                Facial Attendance
              </button>
            </a>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
