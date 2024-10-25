import {useState} from "react";
import { Outlet, Link } from "react-router-dom";
import { BarChart, Newspaper, Book, Computer, Upload } from "lucide-react";

const AddNewStudent = () => {

  const [formData, setFormData] = useState({
    batch:"",
    rollno: "",
    name: "",
    email: "",
    phone: "",
    fname:"",
    femail: "",
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
      rollno: "",
      name: "",
      email: "",
      phone: "",
      fname: "",
      femail: "",
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
      <aside className="flex h-screen w-64 flex-col overflow-y-auto bg-gradient-to-br from-black to-gray-900 px-5 py-8 shadow-xl">
      <div className="flex justify-center items-center mt-4">
      <a href="/admin">
      <h1
  className="text-2xl md:text-2xl font-bold uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-gray-500 to-red-500 animate-text"
>
  Admin Portal
</h1>
</a>

</div>
      <img src="" alt="photo" className="w-16 h-16 rounded-full border-2 border-yellow-500 shadow-lg" />
        <div className="mt-6 flex flex-1 flex-col justify-between">
          <nav className="-mx-3 space-y-7 ">
            <div className="space-y-3 ">
              <label className="px-3 text-xl font-bold uppercase text-white">
                Anurag Rathore
              </label>
              <a
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
                href="addnew"
              >
                <BarChart className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Add New Batches</span>
              </a>
              <a
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                href="newstu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-user"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="mx-2 text-sm font-medium">Add New Student</span>
              </a>
              <a
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                href="newemp"
              >
                <Newspaper className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Add new employees/Professors</span>
              </a>
              <a
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                href="newsub"
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

      <div className="flex-1 p-10 bg-gradient-to-br from-black to-gray-900 shadow-inner rounded-lg text-white">
        <Outlet />
        <div>
      <h2 className="mb-3 text-6xl font-bold leading-none tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-gray-400 to-yellow-500 animate-text">
        ADD NEW STUDENT
      </h2>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 w-1/2 mx-auto gap-6 text-center">
        <div className="buttonStyles">
          <a href="/importcsv">Import CSV</a>
        </div>
        <div className="flex justify-center items-center text-xl font-semibold leading-none tracking-tight text-gray-900 md:text-xl lg:text-xl dark:text-white">
  <a href="#manualForm" className="">Add manually</a>
</div>



      </div> */}

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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rollno">
              Roll Number
            </label>
            <input
              type="integer"
              name="rollno"
              value={formData.rollno}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Roll number"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Student Name
            </label>
            <input
              type="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Student Name"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Student Email ID
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Student Email ID"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Father Name
            </label>
            <input
              type="text"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Father Name"
            />
          </div>

          <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
          Father Phone Number
        </label>
        <input
          type="integer"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter Father phone number"
        />
      </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Father Email ID
            </label>
            <input
              type="email"
              name="femail"
              value={formData.femail}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Father Email ID"
            />
          </div>

          <div className="flex items-center justify-between">
          <button
  type="submit"
  disabled={!isFormValid()} // Disable the button if the form is not valid
  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
>
  Submit
</button>

              </div>
        </form>
        {isVisible && <p className="text-green-500 text-center mt-4">{successMessage}</p>} {/* Conditional rendering for success message */}

        <h2 className="mb-3 text-s font-calab leading-none tracking-tight text-center text-gray-900 md:text-s lg:text-s dark:text-white underline">
        OR
      </h2>
      <div className="flex flex-col justify-center items-center gap-2 mt-12">
            <label className="w-24 h-24 outline outline-gray-200 rounded-lg transition-all duration-500 hover:bg-gray-300 flex flex-col justify-center items-center cursor-pointer shadow-md hover:shadow-xl">
              <Upload className="h-10 w-10 text-yellow-500" aria-hidden="true" />
              <input type="file" className="hidden" />
            </label>
            <p className="text-gray-400 mt-2">Upload CSV file only</p>
          </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default AddNewStudent;
