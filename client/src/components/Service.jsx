import React from "react";
import { Outlet, Link } from "react-router-dom";
import {
  BarChart,
  Newspaper,
  Book,
  Computer,
} from "lucide-react";


const Service = () => {
  return (
    
    <div className="flex">
      <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r bg-black px-5 py-8">
        <img src="" alt="photo" className="w10" />
        <div className="mt-6 flex flex-1 flex-col justify-between">
          <nav className="-mx-3 space-y-7 ">
            <div className="space-y-3 ">
              <label className="px-3 text-xl font-bold uppercase text-white">
                Anurag Rathore
              </label>
              <a
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
                href="/addnew"
              >
                <BarChart className="h-5 w-5" aria-hidden="true" />

                <span className="mx-2 text-sm font-medium">Add New Batches</span>
              </a>
              {/* <Link to="/aout">Button</Link> */}
              <a
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-user"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="mx-2 text-sm font-medium">Add New Student</span>
              </a>
              <a
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                href="#"
              >
                <Newspaper className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Add new employees/Professors</span>
              </a>
              <a
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                href="#"
              >
                <Book className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Add new subjects</span>
              </a>
              <a
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                href="#"
              >
                <Computer className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Create class/sections</span>
              </a>
              
            </div>
            
            
          </nav>
        </div>
      </aside>
      <Outlet />
    </div>
  );
};

export default Service;