import React, { useState } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleScrollToFooter = () => {
    const Footer = document.getElementById("footer");
    if (Footer) {
      Footer.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <div className=" border-b bg-black border-gray-200 text-white dark:bg-gray-800 dark:border-gray-700">
      <nav className=" w-full bg-black opacity-100 flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
        <img src="/pimslogo.jpeg" alt="College Logo" className="h-8 mx-8" />
          <span className="self-center text-3xl font-bold whitespace-nowrap dark:text-white">
            PIMS
          </span>
        </a>
        <button
          onClick={toggleMenu}
          className="inline-flex items-center p-4  px-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
              <button
                onClick={handleScrollToAbout}
                className="hover:text-blue-600 text-white dark:hover:text-blue-500"
              >
                About
              </button>
            </li>
            
            <li>
              <button
                onClick={handleScrollToFooter}
                className="hover:text-blue-600 text-white dark:hover:text-blue-500"
              >
                Contact
              </button>
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
            className="text-white w-24  mx-8  bg-blue-600 -translate-x-4 md:translate-x-0 translate-y-1 md:translate-y-0 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          >
           <Link to="login">
              Login
            </Link>
        
          </a>

        </div>
      </nav>
      <Outlet />
    </div>
    
  );
};

export default Navbar;
