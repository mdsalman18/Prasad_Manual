import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import { BarChart, Newspaper, Book, Computer } from "lucide-react";

const AddNewBatch = () => {
  return (
    <div className="flex min-h-screen">
      <div className="">
        <h1 className="mb-3 text-5xl font-bold leading-none tracking-tight text-center text-gray-400 md:text-6xl lg:text-7xl dark:text-white underline">
          Add New Batch
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 w-1/2 mx-auto gap-6 text-center">
          <div className="text-lg md:text-xl text-gray-800 font-bold tracking-widest outline rounded outline-1 outline-yellow-800 flex justify-center items-center mt-8 bg-yellow-100 hover:shadow-xl hover:bg-yellow-900/80 backdrop-blur-sm hover:text-white hover:scale-95 transition py-8 px-3">
            <NavLink to="/service/importcsv"> Import CSV </NavLink>
          </div>
          <div className="text-lg md:text-xl text-gray-800 font-bold tracking-widest outline rounded outline-1 outline-yellow-800 flex justify-center items-center mt-8 bg-yellow-100 hover:shadow-xl hover:bg-yellow-900/80 backdrop-blur-sm hover:text-white hover:scale-95 transition py-8 px-3">
            <NavLink to="/service/importcsv">
              {" "}
              Add manually - roll_no, student_name, fathers_name, student_mobile, father_mobile, email
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewBatch;
