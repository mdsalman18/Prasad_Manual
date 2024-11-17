import {useState} from "react";
import { Outlet, Link } from "react-router-dom";
import { BarChart, Newspaper, Book, Computer, Menu } from "lucide-react";
import { Tooltip } from "@mui/material";


const AddNewBatch2 = () => {

  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const [formData, setFormData] = useState({
    batch: "",
    sDate: "",
    eDate:"",
    Course: "",
    Outlet: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Set the success message
    setSuccessMessage("Entry has been recorded!");

    // Optionally, you could log the form data
    console.log("Form Data Submitted:", formData);

    // Clear the form fields (optional)
    setFormData({
      batch: "",
      sDate: "",
      eDate:"",
      Course: "",
    });

    // Show the success message
    setIsVisible(true);

    // Hide the message after 3 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };


  const buttonStyles =
    "text-lg md:text-xl text-gray-800 font-bold tracking-widest outline rounded outline-1 outline-yellow-800 flex justify-center items-center mt-8 bg-yellow-100 hover:shadow-xl hover:bg-yellow-900/80 backdrop-blur-sm hover:text-white hover:scale-95 transition py-8 px-3";

  return (
    <div className="flex">
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
          <a href="/adminportal">
            <h1 className="text-2xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-500 mt-2">
              Admin Portal
            </h1>
          </a>
          {/* <img
            src=""
            alt="photo"
            className="w-20 h-20 rounded-full border-2 border-gray-500 shadow-lg mt-4"
          />
          <h1 className="mt-4 text-lg font-semibold text-white uppercase">
            Admin Name
          </h1> */}
        </div>

        {isSidebarVisible && (
          <nav className="mt-8 space-y-4">
            <Tooltip title="Add new batches for the upcoming semester" arrow>
              <a
                href="/addnew"
                className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-500 hover:text-white transform hover:scale-105 transition-all"
              >
                <BarChart className="h-5 w-5" />
                <span className="ml-3 text-sm">Add New Batches</span>
              </a>
            </Tooltip>

            <Tooltip title="Register a new student to the system" arrow>
              <a
                href="/newstu"
                className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-500 hover:text-white transform hover:scale-105 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="7" r="4" />
                  <path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2" />
                </svg>
                <span className="ml-3 text-sm">Add New Student</span>
              </a>
            </Tooltip>

            <Tooltip title="Add new employees or professors" arrow>
              <a
                href="/newemp"
                className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-500 hover:text-white transform hover:scale-105 transition-all"
              >
                <Newspaper className="h-5 w-5" />
                <span className="ml-3 text-sm">Add New Staff</span>
              </a>
            </Tooltip>
          </nav>
        )}
      </aside>

      <div className={`flex-1 transition-all duration-300 ${isSidebarVisible ? "pl-62" : "pl-0"} p-8 bg-gradient-to-br from-black to-gray-900 text-white`}>
      <button
          className="text-white bg-gray-700 px-4 py-2 rounded-full"
          onClick={() => setSidebarVisible(!isSidebarVisible)}
        >
          <Menu className=""/>
          {/* {isSidebarVisible ? "Hide Sidebar" : "Show Sidebar"} */}
        </button>
        <Outlet />
        <div>
      <h2 className="mb-3 text-6xl font-bold leading-none tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-500 via-gray-400 to-gray-300 animate-text">
        ADD NEW BATCH
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 w-1/2 mx-auto gap-6 text-center">
        {/* <div className="buttonStyles">
          <a href="/importcsv">Import CSV</a>
        </div> */}
        {/* <div className="flex justify-center items-center text-xl font-semibold leading-none tracking-tight text-gray-900 md:text-xl lg:text-xl dark:text-white">
  <a href="#manualForm" className="">Add manually</a>
</div> */}



      </div>

      <div id="manualForm" className="mt-8 w-1/2 mx-auto">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="batch">
              Batch Name/ID
            </label>
            <input
              type="text"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Batch Name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
              Start Date
            </label>
            <input
              type="date"
              name="sDate"
              value={formData.sDate}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter start Date"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
              End Date
            </label>
            <input
              type="date"
              name="eDate"
              value={formData.eDate}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter end Date"
            />
          </div>

          <div className="mb-6">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course">
    Course
  </label>
  <select
    name="Course"
    value={formData.Course}
    onChange={handleChange}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  >
    <option value="" disabled>Select a course</option>
    <option value="Computer Science">MBBS</option>
    <option value="Mathematics">BDS</option>
    
  </select>
</div>





          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={!isFormValid()} // Disable the button if the form is not valid
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
              Add Batch
            </button>
          </div>
        </form>
        {isVisible && (
              <p className="text-green-500 text-center mt-4">{successMessage}</p>
            )}
      </div>
    </div>
      </div>
    </div>
  );
};

export default AddNewBatch2;
