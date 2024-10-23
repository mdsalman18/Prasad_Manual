import React, { useState } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className=" border-b bg-black border-gray-200 text-white dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            MBBS college
          </span>
        </a>
        <button
          onClick={toggleMenu}
          className="inline-flex items-center p-4 px-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <i class="fa-solid fa-bars fa-2xl"></i>
        </button>
        <div className={`w-full md:block md:w-auto ${isOpen ? "" : "hidden"}`}>
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 mt-4 md:mt-0 text-sm font-medium text-gray-900 dark:text-gray-400">
            <li>
              <a
                href="/"
                className="hover:text-blue-600 text-white dark:hover:text-blue-500"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-600 text-white dark:hover:text-blue-500"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/admission"
                className="hover:text-blue-600 text-white dark:hover:text-blue-500"
              >
                Admission
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-600 text-white dark:hover:text-blue-500"
              >
                Contact
              </a>
            </li>
            <li>
              <NavLink
                to="/attendence"
                className="hover:text-blue-600 text-white dark:hover:text-blue-500"
              >
                Attendence
              </NavLink>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-600 text-white dark:hover:text-blue-500"
              >
                Details
              </a>
            </li>
            
          </ul>
        </div>

        <div
          className={`flex items-center justify-between flex-col md:order-2  ${
            !isOpen ? "hidden md:flex md:flex-row" : "md:flex-row"
          } `}
        >
          <a
            href="login"
            className="text-white  bg-blue-600 -translate-x-4 md:translate-x-0 translate-y-1 md:translate-y-0 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          >
           <Link to="login">
              Login
              </Link>
        
          </a>

          <a
            href="signup"
            className="text-white ml-4 -translate-x-4 md:translate-x-0 translate-y-2 md:translate-y-0 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          ><Link to="signup">
          Sign Up
          </Link>
          </a>
        </div>
      </div>
      <Outlet />
    </nav>
    
  );
};

export default Navbar;
