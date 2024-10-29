import { useState } from "react";
import { Outlet } from "react-router-dom";
import { BarChart, Newspaper, Book, Computer } from "lucide-react";

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
      <div className="flex-1 p-10 bg-gradient-to-br from-black to-gray-900 shadow-inner rounded-lg text-white">
        <Outlet />
        <div>
          <h2 className="mb-3 text-6xl font-bold leading-none tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-gray-400 to-yellow-500 animate-text">
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
