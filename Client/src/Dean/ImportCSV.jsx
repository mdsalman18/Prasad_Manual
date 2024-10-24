import React from "react";
import { Outlet, Link } from "react-router-dom";
import {
  BarChart,
  Newspaper,
  Book,
  Computer,
  Upload,
} from "lucide-react";


const ImportCSV = () => {


  return (
    
    <div className="flex">
{/*       
      <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r bg-black px-5 py-8">
        <img src="" className="w10 border" />
        <div className="mt-6 flex flex-1 flex-col justify-between">
          <nav className="-mx-3 space-y-7 ">
            <div className="space-y-3 ">
              <label className="px-3 text-xl font-bold uppercase text-white">
                Anurag Rathore
              </label>
              <a
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
                href="#"
              >
                <BarChart className="h-5 w-5" aria-hidden="true" />

                <span className="mx-2 text-sm font-medium">Add New Batches</span>
              </a>
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
      
      <Outlet /> */}
      <div className="">
      <h1 className="mb-3 text-5xl font-bold leading-none tracking-tight text-center text-gray-900 md:text-6xl lg:text-7xl dark:text-white underline">
   Importing CSV file
</h1>
<h2 className="text-2xl lg:text-3xl pt-6  uppercase text-center">Intructions</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 w-1/2 mx-auto gap-6 text-center">
                        <div className="text-lg md:text-xl text-gray-800 font-bold tracking-widest outline rounded outline-1 outline-yellow-800 flex justify-center items-center mt-8 bg-yellow-100 hover:shadow-xl hover:bg-yellow-900/80 backdrop-blur-sm hover:text-white hover:scale-95 transition py-8 px-3">
                            Upload the CSV file only
                        </div>
                        <div className="text-lg md:text-xl text-gray-800 font-bold tracking-widest outline rounded outline-1 outline-yellow-800 flex justify-center items-center mt-8 bg-yellow-100 hover:shadow-xl hover:bg-yellow-900/80 backdrop-blur-sm hover:text-white hover:scale-95 transition py-8 px-3">
                            The file must and only contain headers - NAME, PHONE NUMBER, BATCH NUMBER
                        </div>
                        
                    </div>
      
                    <div className="flex flex-col justify-center items-center gap-2 mt-12">
                    <label className="w-24 h-24 outline outline-gray-200 transition-all duration-500 hover:bg-gray-200 flex flex-col justify-center items-center rounded-lg cursor-pointer">
                    <Upload className="h-10 w-10" aria-hidden="true" />
                        <input type="file" className="hidden"  />
                    </label>
                    <p>Upload CSV file only</p>
                </div>
      </div>
    </div>
  );
};

export default ImportCSV;