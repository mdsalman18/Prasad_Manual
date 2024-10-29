import { useState } from "react";
import { Outlet } from "react-router-dom";
import { BarChart, Newspaper, Book, Computer } from "lucide-react";

const NewEmp = () => {
  const [formData, setFormData] = useState({
    empname: "",
    jdate: "",
    username: "",
    emailid: "",
    cpassword:"",
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
      empname: "",
    jdate: "",
    username: "",
    emailid: "",
    cpassword:"",
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
      <div className="flex-1 p-10 bg-gradient-to-br from-black to-gray-900 shadow-inner rounded-lg text-white">
        <Outlet />
        <div>
          <h2 className="mb-3 text-6xl font-bold leading-none tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-gray-400 to-yellow-500 animate-text">
            ADD NEW EMPLOYEE
          </h2>

          <div id="manualForm" className="mt-8 w-1/2 mx-auto">
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="text"
                >
                  Employee Name
                </label>
                <input
                  type="text"
                  name="empname"
                  value={formData.empname}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter employee Name"
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="date"
                >
                  Date of Joining
                </label>
                <input
                  type="date"
                  name="jdate"
                  value={formData.jdate}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                type="usernames"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                  
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email ID
                </label>
                <input
                type="email"
                  name="emailid"
                  value={formData.emailid}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                  
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Create Password
                </label>
                <input
                type="password"
                  name="cpassword"
                  value={formData.cpassword}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                  
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={!isFormValid()} // Disable the button if the form is not valid
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isFormValid() ? "opacity-50 cursor-not-allowed" : ""
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

export default NewEmp;
