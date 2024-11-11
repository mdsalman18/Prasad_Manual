import { useState } from "react";
import { Outlet } from "react-router-dom";
import { BarChart, Newspaper, Book, Computer } from "lucide-react";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import { Tooltip } from "@mui/material";


const NewCSV = () => {
  const [formData, setFormData] = useState({
    subname: "",
    phase: "",
    ACDyear: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [selectedBatch, setSelectedBatch] = useState("");
  const [file, setFile] = useState(null);

  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const isFormValid = () => {
    return selectedBatch && file;
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!isFormValid()) {
      toast.error("Please fill all fields and upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosInstance.post(`/${selectedBatch}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => {
    toast.success("CSV File uploaded successfully!")
    setSuccessMessage("CSV File uploaded successfully!");
    setIsVisible(true);
  })
  .catch(e=> {
    toast.error("CSV File uploaded Failed!")
    setErrorMessage("CSV File uploaded Failed!");
    setIsError(true);
  })

    // Reset form after upload
    setFormData({
      subname: "",
      phase: "",
      ACDyear: "",
    });
    setSelectedBatch("");
    setFile(null);

    setTimeout(() => {
      setIsVisible(false);
      setIsError(false);
      window.location.reload(); // Refresh the page
    }, 5000);
  };

  return (
    <div className="flex">
      <aside className="h-screen w-72 bg-gradient-to-br from-black to-gray-900 p-6 shadow-lg">
        <div className="flex flex-col items-center">
          <NavLink href="/adminportal">
          <h1 className="text-2xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-500 mt-2 animate-text">
            Admin Portal
          </h1>
          </NavLink>
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
            <NavLink
              href="/addnew"
              className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-500 hover:text-white transform hover:scale-105 transition-all"
            >
              <BarChart className="h-5 w-5" />
              <span className="ml-3 text-sm">Add New Batches</span>
            </NavLink>
          </Tooltip>

          <Tooltip title="Register a new student to the system" arrow>
            <NavLink
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
            </NavLink>
          </Tooltip>

          <Tooltip title="Add new employees or professors" arrow>
            <NavLink
              href="/newemp"
              className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-500 hover:text-white transform hover:scale-105 transition-all"
            >
              <Newspaper className="h-5 w-5" />
              <span className="ml-3 text-sm">Add New Staff</span>
            </NavLink>
          </Tooltip>

          {/* <Tooltip title="Add new subjects to the curriculum" arrow>
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
          </Tooltip> */}
        </nav>
      </aside>
      <div className="flex items-center justify-center min-h-screen w-full bg-gray-300 dark:bg-gray-800">
      <div className="w-full max-w-lg rounded-xl shadow-2xl bg-gradient-to-br from-gray-900 to-gray-500 p-8 mb-8 ">
        <h2 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-gray-200 to-yellow-400">
          UPLOAD CSV
        </h2>
        <Outlet />
        <form onSubmit={handleUpload} className="space-y-6">
          <div>
            <label className="block text-gray-300 font-semibold mb-2">
              Select Batch
            </label>
            <select
              value={selectedBatch}
              onChange={handleBatchChange}
              className="w-full p-3 border border-gray-500 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200"
              required
            >
              <option value="">-- Select Phase --</option>
              <option value="Phase1">Phase I</option>
              <option value="Phase2">Phase II</option>
              <option value="Phase3-P1">Phase III part I</option>
              <option value="Phase3-P2">Phase III part II</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-300 font-semibold mb-2">
              Upload CSV File
            </label>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-500 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full font-bold py-3 rounded-lg transition-colors duration-300 ${
              isFormValid()
                ? "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
                : "bg-gray-500 text-gray-300 cursor-not-allowed"
            }`}
            // disabled={!isFormValid()}
          >
            Upload
          </button>
        </form>
        {isVisible && (
          <p className="text-green-500 text-center mt-6 font-semibold">
            {successMessage}
          </p>
        )}
        {isError && (
          <p className="text-red-500 text-center mt-6 font-semibold">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
    </div>
  );
};

export default NewCSV;
