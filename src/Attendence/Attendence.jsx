import React, { useState } from "react";
import "./Attendence.css";
import Service from "../components/Service";
import { toast } from 'react-toastify';

const Attendence = () => {
  const [classSection, setClassSection] = useState('');
  const [attendanceDate, setAttendanceDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [subject, setSubject] = useState('');

  const students = [
    { rollNo: 1, name: 'John Doe', fathersName: 'Mr. Doe', present: true, email: 'john@example.com' },
    { rollNo: 2, name: 'Jane Smith', fathersName: 'Mr. Smith', present: false, email: 'jane@example.com' },
    { rollNo: 3, name: 'Michael Brown', fathersName: 'Mr. Brown', present: true, email: 'michael@example.com' },
    { rollNo: 4, name: 'Emily Davis', fathersName: 'Mr. Davis', present: true, email: 'emily@example.com' },
    { rollNo: 5, name: 'William Wilson', fathersName: 'Mr. Wilson', present: false, email: 'william@example.com' },
    { rollNo: 6, name: 'Olivia Johnson', fathersName: 'Mr. Johnson', present: true, email: 'olivia@example.com' },
    { rollNo: 7, name: 'James Martinez', fathersName: 'Mr. Martinez', present: true, email: 'james@example.com' },
    { rollNo: 8, name: 'Isabella Garcia', fathersName: 'Mr. Garcia', present: false, email: 'isabella@example.com' },
    { rollNo: 9, name: 'Alexander Rodriguez', fathersName: 'Mr. Rodriguez', present: true, email: 'alexander@example.com' },
    { rollNo: 10, name: 'Sophia Hernandez', fathersName: 'Mr. Hernandez', present: true, email: 'sophia@example.com' },
    { rollNo: 11, name: 'Daniel Moore', fathersName: 'Mr. Moore', present: false, email: 'daniel@example.com' },
    { rollNo: 12, name: 'Charlotte Taylor', fathersName: 'Mr. Taylor', present: true, email: 'charlotte@example.com' },
    { rollNo: 13, name: 'Ethan Anderson', fathersName: 'Mr. Anderson', present: true, email: 'ethan@example.com' },
    { rollNo: 14, name: 'Amelia Thomas', fathersName: 'Mr. Thomas', present: false, email: 'amelia@example.com' },
    { rollNo: 15, name: 'Logan Jackson', fathersName: 'Mr. Jackson', present: true, email: 'logan@example.com' },
    { rollNo: 16, name: 'Mia White', fathersName: 'Mr. White', present: true, email: 'mia@example.com' },
    { rollNo: 17, name: 'Lucas Harris', fathersName: 'Mr. Harris', present: false, email: 'lucas@example.com' },
    { rollNo: 18, name: 'Ava Martin', fathersName: 'Mr. Martin', present: true, email: 'ava@example.com' },
    { rollNo: 19, name: 'Mason Thompson', fathersName: 'Mr. Thompson', present: true, email: 'mason@example.com' },
    { rollNo: 20, name: 'Harper Martinez', fathersName: 'Mr. Martinez', present: false, email: 'harper@example.com' },
    { rollNo: 21, name: 'Liam Robinson', fathersName: 'Mr. Robinson', present: true, email: 'liam@example.com' },
    { rollNo: 22, name: 'Ella Clark', fathersName: 'Mr. Clark', present: true, email: 'ella@example.com' },
    { rollNo: 23, name: 'Noah Lewis', fathersName: 'Mr. Lewis', present: false, email: 'noah@example.com' },
    { rollNo: 24, name: 'Aiden Walker', fathersName: 'Mr. Walker', present: true, email: 'aiden@example.com' },
    { rollNo: 25, name: 'Grace Hall', fathersName: 'Mr. Hall', present: true, email: 'grace@example.com' },
    { rollNo: 26, name: 'Carter Allen', fathersName: 'Mr. Allen', present: false, email: 'carter@example.com' },
  ];

  const [checkedStudents, setCheckedStudents] = useState(new Array(students.length).fill(false));
  const [markAbsent, setMarkAbsent] = useState(new Array(students.length).fill(false));
  const [markLeave, setMarkLeave] = useState(new Array(students.length).fill(false));

  const handleCheckAll = () => {
    setCheckedStudents(new Array(students.length).fill(true));
    setMarkAbsent(new Array(students.length).fill(false));
    setMarkLeave(new Array(students.length).fill(false));
  };

  const handleAbsentAll = () => {
    setMarkAbsent(new Array(students.length).fill(true));
    setCheckedStudents(new Array(students.length).fill(false));
    setMarkLeave(new Array(students.length).fill(false));
  };

  const handleLeaveAll = () => {
    setMarkLeave(new Array(students.length).fill(true));
    setCheckedStudents(new Array(students.length).fill(false));
    setMarkAbsent(new Array(students.length).fill(false));
  };

  const handleClearAll = () => {
    setMarkAbsent(new Array(students.length).fill(false));
    setCheckedStudents(new Array(students.length).fill(false));
    setMarkLeave(new Array(students.length).fill(false));
  };

  const handleCheckboxChange = (index) => {
    const updatedCheckedStudents = [...checkedStudents];
    updatedCheckedStudents[index] = !updatedCheckedStudents[index];
    setCheckedStudents(updatedCheckedStudents);
  
    if (updatedCheckedStudents[index]) {
      const updatedMarkAbsent = [...markAbsent];
      const updatedMarkLeave = [...markLeave];
      updatedMarkAbsent[index] = false;
      updatedMarkLeave[index] = false;
      setMarkAbsent(updatedMarkAbsent);
      setMarkLeave(updatedMarkLeave);
    }
  };

  const handleAbsentChange = (index) => {
    const updatedMarkedStudents = [...markAbsent];
    updatedMarkedStudents[index] = !updatedMarkedStudents[index];
    setMarkAbsent(updatedMarkedStudents);
  
    if (updatedMarkedStudents[index]) {
      const updatedCheckedStudents = [...checkedStudents];
      const updatedMarkLeave = [...markLeave];
      updatedCheckedStudents[index] = false;
      updatedMarkLeave[index] = false;
      setCheckedStudents(updatedCheckedStudents);
      setMarkLeave(updatedMarkLeave);
    }
  };

  const handleLeaveChange = (index) => {
    const updatedMarkLeave = [...markLeave];
    updatedMarkLeave[index] = !updatedMarkLeave[index];
    setMarkLeave(updatedMarkLeave);
  
    if (updatedMarkLeave[index]) {
      const updatedCheckedStudents = [...checkedStudents];
      const updatedMarkAbsent = [...markAbsent];
      updatedCheckedStudents[index] = false;
      updatedMarkAbsent[index] = false;
      setCheckedStudents(updatedCheckedStudents);
      setMarkAbsent(updatedMarkAbsent);
    }
  };

  const handleSubmit = () => {
    toast.success("Success!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  

  return (

    <div className=" bg-black mb-6">

      {/* this is the start of selection things */}
      <div className='my-5'>
      <h1 className="font-bold text-center mt-4 my-4 text-xl">Student Attendance</h1>
      <div className="flex flex-wrap lg:flex-nowrap justify-evenly">
        <div className="flex flex-col items-center justify-center h-full">
          <label
            htmlFor="class-section"
            className="block mb-2 text-sm font-medium text-gray-500 dark:text-white ml-4"
          >
            Select Batch <span className="text-red-500">*</span>
          </label>
          <select
            id="class-section"
            value={classSection}
            onChange={(e) => setClassSection(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-44 ml-8"
          >
            <option value="" disabled>Select class</option>
            <option value="Phase I">Phase I</option>
            <option value="B">Phase II</option>
            <option value="C">Section III Part I</option>
            <option value="D">Section III Part II</option>
          </select>
        </div>

        <div className="flex flex-col items-center justify-center h-full">
          <label
            htmlFor="attendance-date"
            className="block mb-2 text-sm font-medium text-gray-500 dark:text-white ml-5"
          >
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

        <div className="flex flex-col items-center justify-center h-full">
          <label
            htmlFor="time-slot"
            className="block mb-2 text-sm font-medium text-gray-500 dark:text-white ml-4"
          >
            Select Time Slot <span className="text-red-500">*</span>
          </label>
          <select
            id="time-slot"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" disabled>Select time slot</option>
            <option value="09:00-10:00">09:00 AM - 10:00 AM</option>
            <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
            <option value="11:00-12:00">11:00 AM - 12:00 PM</option>
            <option value="12:00-13:00">12:00 PM - 01:00 PM</option>
            <option value="13:00-14:00">01:00 PM - 02:00 PM</option>
            <option value="14:00-15:00">02:00 PM - 03:00 PM</option>
            <option value="15:00-16:00">03:00 PM - 04:00 PM</option>
            <option value="16:00-17:00">04:00 PM - 05:00 PM</option>
          </select>
        </div>

        <div className="flex flex-col items-center justify-center h-full">
          <label
            htmlFor="subject"
            className="block mb-2 text-sm font-medium text-gray-500 dark:text-white ml-4"
          >
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
            <option value="Microbiology">Microbiology</option>
            <option value="Pathology">Pathology</option>
            <option value="Biology">Biology</option>
            <option value="Extra">Extra</option>
          </select>
        </div>

        <div className="flex flex-col items-center justify-center h-full">
          <label
            htmlFor="subject"
            className="block mb-2 text-sm font-medium text-gray-500 dark:text-white ml-4"
          >
            Select Subject <span className="text-red-500">*</span>
          </label>
          <select
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" disabled>Select User Group</option>
            <option value="lecture 1">lecture 1</option>
            <option value="lecture 2">lecture 2</option>
            <option value="lecture 3">lecture 3</option>
            <option value="lecture 4">lecture 4</option>
            <option value="lecture 5">lecture 5</option>
            <option value="lecture 6">lecture 6</option>
            <option value="lecture 7">lecture 7</option>
            <option value="lecture 8">lecture 8</option>
          </select>
        </div>
      </div>

      <div className="w-1/2 m-auto mt-5">
        <button className=" px-4 py-2 bg-blue-600  text-black rounded border-2">
          Search
        </button>
      </div>
      </div>
      {/* this is the end of selection things */}

      {/* Attendence Markings */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-black text-left">Roll No</th>
              <th className="py-2 px-4 border-b text-black text-left">Name</th>
              <th className="py-2 px-4 border-b text-black text-left">Father's Name</th>
              <th className="py-2 px-4 border-b text-black text-left">
                <button
                  onClick={handleAbsentAll}
                  className="px-4 py-2 text-black bg-red-600 rounded border-2">
                  Absent <i className="fa-regular fa-circle"></i>
                </button>
              </th>
              <th className="py-2 px-4 border-b text-black text-left">
                <button
                  onClick={handleCheckAll}
                  className="px-4 py-2 bg-green-600 text-black rounded border-2">
                  Present <i className="fa-regular fa-circle"></i>
                </button>
              </th>
              <th className="py-2 px-4 border-b text-black text-left">
                <button
                  onClick={handleLeaveAll}
                  className="px-4 py-2 bg-yellow-400 text-black rounded border-2">
                  Leave <i className="fa-regular fa-circle"></i>
                </button>
              </th>
              <th className="py-2 px-4 border-b text-black text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.rollNo}>
                <td className="py-2 px-4 border-b text-black">{student.rollNo}</td>
                <td className="py-2 px-4 border-b text-black">{student.name}</td>
                <td className="py-2 px-4 border-b text-black">{student.fathersName}</td>
                <td className="py-2 px-4 border-b pl-6 text-black">
                  <input
                    type="checkbox"
                    className="w-6 h-6 mx-8"
                    checked={markAbsent[index]}
                    onChange={() => handleAbsentChange(index)}
                  />
                </td>
                <td className="py-2 px-4 border-b pl-6">
                  <input
                    className="w-6 h-6 mx-8"
                    type="checkbox"
                    checked={checkedStudents[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
                <td className="py-2 px-4 border-b pl-6">
                  <input
                    className="w-6 h-6 mx-8"
                    type="checkbox"
                    checked={markLeave[index]}
                    onChange={() => handleLeaveChange(index)}
                  />
                </td>
                <td className="py-2 px-4 border-b text-black">{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex mt-4 md:flex-row flex-col justify-evenly">
        <button className="p-4 mx-4 my-2 rounded-lg text-white text-center bg-blue-600 py-2 hover:underline" onClick={handleClearAll}>Clear All</button>
        <button className="p-4 mx-4 my-2 rounded-lg text-center text-white bg-blue-600 py-2 hover:underline" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Attendence;