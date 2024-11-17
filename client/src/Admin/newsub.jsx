import { useState } from "react";
import { Outlet } from "react-router-dom";
import { BarChart, Newspaper, Book, Computer } from "lucide-react";
import { Tooltip } from "@mui/material";


const NewSub = () => {
  const [formData, setFormData] = useState({
    subname: "",
    phase: "",
    ACDyear: "",
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
      subname: "",
      phase: "",
      ACDyear: "",
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
      <aside className="h-screen w-72 bg-gradient-to-br from-black to-gray-900 p-6 shadow-lg">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-500 mt-2 animate-text">
            Admin Portal
          </h1>
          <img
            src=""
            alt="photo"
            className="w-20 h-20 rounded-full border-2 border-gray-500 shadow-lg mt-4"
          />
          <h1 className="mt-4 text-lg font-semibold text-white uppercase">
            Admin Name
          </h1>
        </div>

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

          <Tooltip title="Add new subjects to the curriculum" arrow>
            <a
              href="/newsub"
              className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-500 hover:text-white transform hover:scale-105 transition-all"
            >
              <Book className="h-5 w-5" />
              <span className="ml-3 text-sm">Add New Subjects</span>
            </a>
          </Tooltip>

          <Tooltip title="Create and manage classes or sections" arrow>
            <a
              href="/adminportal"
              className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-500 hover:text-white transform hover:scale-105 transition-all"
            >
              <Computer className="h-5 w-5" />
              <span className="ml-3 text-sm">Create Class/Sections</span>
            </a>
          </Tooltip>
        </nav>
      </aside>

      <div className="flex-1 p-10 bg-gradient-to-br from-black to-gray-900 shadow-inner rounded-lg text-white">
        <Outlet />
        <div>
        <h2 className="mb-3 text-6xl font-bold leading-none tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-500 via-gray-400 to-gray-300 animate-text">
        ADD NEW SUBJECT
          </h2>

          <div id="manualForm" className="mt-8 w-1/2 mx-auto">
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="subname"
                >
                  Subject Name
                </label>
                <input
                  type="text"
                  name="subname"
                  value={formData.subname}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter Subject Name"
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phase"
                >
                  Phase
                </label>
                <select
                  name="phase"
                  value={formData.phase}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" disabled>
                    Select Phase
                  </option>
                  <option value="Phase I">Phase I</option>
                  <option value="Phase II">Phase II</option>
                  <option value="Phase III Part I">Phase III Part I</option>
                  <option value="Phase III Part II">Phase III Part II</option>
                </select>
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="ACDyear"
                >
                  Batch
                </label>
                <select
                  name="ACDyear"
                  value={formData.ACDyear}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" disabled>
                    Select Batch
                  </option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={!isFormValid()} // Disable the button if the form is not valid
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                    !isFormValid() ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Submit
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

export default NewSub;
