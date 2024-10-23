import React, { useState, useEffect } from "react";
// import "./ViewAttendance.css";
import { toast } from 'react-toastify';

const ViewAttendance = () => {
  const [classSection, setClassSection] = useState('');
  const [attendanceDate, setAttendanceDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [subject, setSubject] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchAttendanceData = () => {
    // Example data for demonstration purposes
    const data = [
      { rollNo: 1, name: 'John Doe', fathersName: 'Mr. Doe', present: true, email: 'john.doe@example.com' },
      { rollNo: 2, name: 'Jane Smith', fathersName: 'Mr. Smith', present: false, email: 'jane.smith@example.com' },
      { rollNo: 3, name: 'Mike Johnson', fathersName: 'Mr. Johnson', present: true, email: 'mike.johnson@example.com' },
    ];
    setAttendanceData(data);
    toast.success("Attendance data fetched successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
    });
  };

  useEffect(() => {
    if (classSection && attendanceDate && timeSlot && subject) {
      fetchAttendanceData();
    }
  }, [classSection, attendanceDate, timeSlot, subject]);

  function handleViewAttendance() {
    if (!classSection || !attendanceDate || !timeSlot || !subject) {
      toast.error("Please fill out all fields to view attendance.");
      return;
    }
    fetchAttendanceData();
  }

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div className="bg-black mb-6">
      <div className='my-5'>
        <h1 className="font-bold text-center mt-4 my-4 text-xl text-white">Student Attendance</h1>
        <div className="flex flex-wrap lg:flex-nowrap justify-evenly">
          <div className="flex items-center justify-center h-full">
            <label htmlFor="class-section" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white ml-4">
              Select Class Section <span className="text-red-500">*</span>
            </label>
            <select
              id="class-section"
              value={classSection}
              onChange={(e) => setClassSection(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-32 ml-8"
            >
              <option value="" disabled>Select Batch</option>
              <option value="A">2020 Phase I</option>
              <option value="B">2020 Phase II</option>
              <option value="C">2020 Phase III</option>
              <option value="C">2021 Phase I</option>
              <option value="C">2021 Phase II</option>
              <option value="C">2021 Phase III</option>
              <option value="C">2022 Phase I</option>
              <option value="C">2022 Phase II</option>
              <option value="C">2022 Phase III</option>
              <option value="C">2023 Phase I</option>
              <option value="C">2023 Phase II</option>
              <option value="C">2023 Phase III</option>
              <option value="C">2024 Phase I</option>
              <option value="C">2024 Phase II</option>
              <option value="C">2024 Phase III</option>
              <option value="C">2025 Phase I</option>
              <option value="C">2025 Phase II</option>
              <option value="C">2025 Phase III</option>
            </select>
          </div>

          <div className="flex items-center justify-center h-full">
            <label htmlFor="attendance-date" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white ml-5">
              Attendance Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="attendance-date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-8"
            />
          </div>

          <div className="flex items-center justify-center h-full">
            <label htmlFor="time-slot" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white ml-4">
              Select Time Slot <span className="text-red-500">*</span>
            </label>
            <select
              id="time-slot"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>Select time slot</option>
              <option value="08:00-09:00">08:00 AM - 09:00 AM</option>
              <option value="09:00-10:00">09:00 AM - 10:00 AM</option>
              <option value="09:00-12:00">09:00 AM - 12:00 PM</option>
              <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
              <option value="10:00-12:00">10:00 AM - 12:00 PM</option>
              <option value="11:00-12:00">11:00 AM - 12:00 PM</option>
              <option value="11:00-01:00">11:00 AM - 01:00 PM</option>
              <option value="12:00-01:00">12:00 PM - 01:00 PM</option>
              <option value="01:00-02:00">01:00 PM - 02:00 PM</option>
              <option value="02:00-03:00">02:00 PM - 03:00 PM</option>
              <option value="03:00-04:00">03:00 PM - 04:00 PM</option>
              <option value="04:00-05:00">04:00 PM - 05:00 PM</option>
            </select>
          </div>

          <div className="flex items-center justify-center h-full">
            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white ml-4">
              Select Subject <span className="text-red-500">*</span>
            </label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>Select subject</option>
              <option value="Pharmaceutical">Pharmaceutical</option>
              <option value="Anatomy">Anatomy</option>
              <option value="Physiology">Physiology</option>
              <option value="Biochemistry">Biochemistry</option>
              <option value="Community Medicine ">Community Medicine </option>
              <option value="Pathology">Pathology</option>
              <option value="Microbiology">Microbiology</option>
              <option value="Pharmacology">Pharmacology</option>
              <option value="Forensic Medicine">Forensic Medicine</option>
              <option value="Orthopaedics">Orthopaedics</option>
              <option value="Anaesthesiology">Anaesthesiology</option>
              <option value="Radiology">Radiology</option>
              <option value="Emergency Medicine">Emergency Medicine</option>
              <option value="Surgery">Surgery</option>
              <option value="Ophthalmology">Ophthalmology</option>
              <option value="Obstetrics and Gynaecology">Obstetrics and Gynaecology</option>
              <option value="Paediatrics">Paediatrics</option>
              <option value="Psychiatry">Psychiatry</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </select>
          </div>

          <div className="flex items-center justify-center h-full">
            <button
              onClick={handleViewAttendance}
              className="ml-4 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              View Attendance
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mx-10 mb-6">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Roll No.</th>
              <th scope="col" className="px-6 py-3">Student Name</th>
              <th scope="col" className="px-6 py-3">Father's Name</th>
              <th scope="col" className="px-6 py-3">Attendance Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((student, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{student.rollNo}</td>
                <td className="px-6 py-4 cursor-pointer text-blue-600 hover:underline" onClick={() => handleStudentClick(student)}>
                  {student.name}
                </td>
                <td className="px-6 py-4">{student.fathersName}</td>
                <td className="px-6 py-4">{student.present ? 'Present' : 'Absent'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Display Selected Student Details */}
      {selectedStudent && (
        <div className="p-4 border-t mt-4">
          <h2 className="text-lg font-bold text-white">Student Details</h2>
          <p><strong>Name:</strong> {selectedStudent.name}</p>
          <p><strong>Roll No:</strong> {selectedStudent.rollNo}</p>
          <p><strong>Father's Name:</strong> {selectedStudent.fathersName}</p>
          <p><strong>Email:</strong> {selectedStudent.email}</p>
          <p><strong>Attendance Status:</strong> {selectedStudent.present ? 'Present' : 'Absent'}</p>
        </div>
      )}
    </div>
  );
};

export default ViewAttendance;