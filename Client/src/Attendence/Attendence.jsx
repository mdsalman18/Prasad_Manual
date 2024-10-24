import React, { useEffect, useState } from "react";
import "./Attendence.css";
import Service from "../components/Service";
import { toast } from 'react-toastify';

const Attendence = () => {
  const [classSection, setClassSection] = useState('');
  const [year, setYear] = useState('');
  const [attendanceDate, setAttendanceDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [subject, setSubject] = useState('');

  const allStudents = [
    { rollNo: 1, name: 'John Doe', fathersName: 'Mr. Doe', present: true, email: 'john@example.com', phase: 1 },
    { rollNo: 2, name: 'Jane Smith', fathersName: 'Mr. Smith', present: false, email: 'jane@example.com', phase: 2 },
    { rollNo: 3, name: 'Michael Brown', fathersName: 'Mr. Brown', present: true, email: 'michael@example.com', phase: 3 },
    { rollNo: 4, name: 'Emily Davis', fathersName: 'Mr. Davis', present: true, email: 'emily@example.com', phase: 4 },
    { rollNo: 5, name: 'William Wilson', fathersName: 'Mr. Wilson', present: false, email: 'william@example.com', phase: 1 },
    { rollNo: 6, name: 'Olivia Johnson', fathersName: 'Mr. Johnson', present: true, email: 'olivia@example.com', phase: 2 },
    { rollNo: 7, name: 'James Martinez', fathersName: 'Mr. Martinez', present: true, email: 'james@example.com', phase: 3 },
    { rollNo: 8, name: 'Isabella Garcia', fathersName: 'Mr. Garcia', present: false, email: 'isabella@example.com', phase: 4 },
    { rollNo: 9, name: 'Alexander Rodriguez', fathersName: 'Mr. Rodriguez', present: true, email: 'alexander@example.com', phase: 1 },
    { rollNo: 10, name: 'Sophia Hernandez', fathersName: 'Mr. Hernandez', present: true, email: 'sophia@example.com', phase: 2 },
    { rollNo: 11, name: 'Daniel Moore', fathersName: 'Mr. Moore', present: false, email: 'daniel@example.com', phase: 3 },
    { rollNo: 12, name: 'Charlotte Taylor', fathersName: 'Mr. Taylor', present: true, email: 'charlotte@example.com', phase: 4 },
    { rollNo: 13, name: 'Ethan Anderson', fathersName: 'Mr. Anderson', present: true, email: 'ethan@example.com', phase: 1 },
    { rollNo: 14, name: 'Amelia Thomas', fathersName: 'Mr. Thomas', present: false, email: 'amelia@example.com', phase: 2 },
    { rollNo: 15, name: 'Logan Jackson', fathersName: 'Mr. Jackson', present: true, email: 'logan@example.com', phase: 3 },
    { rollNo: 16, name: 'Mia White', fathersName: 'Mr. White', present: true, email: 'mia@example.com', phase: 4 },
    { rollNo: 17, name: 'Lucas Harris', fathersName: 'Mr. Harris', present: false, email: 'lucas@example.com', phase: 1 },
    { rollNo: 18, name: 'Ava Martin', fathersName: 'Mr. Martin', present: true, email: 'ava@example.com', phase: 2 },
    { rollNo: 19, name: 'Mason Thompson', fathersName: 'Mr. Thompson', present: true, email: 'mason@example.com', phase: 3 },
    { rollNo: 20, name: 'Harper Martinez', fathersName: 'Mr. Martinez', present: false, email: 'harper@example.com', phase: 4 },
    { rollNo: 21, name: 'Liam Robinson', fathersName: 'Mr. Robinson', present: true, email: 'liam@example.com', phase: 1 },
    { rollNo: 22, name: 'Ella Clark', fathersName: 'Mr. Clark', present: true, email: 'ella@example.com', phase: 2 },
    { rollNo: 23, name: 'Noah Lewis', fathersName: 'Mr. Lewis', present: false, email: 'noah@example.com', phase: 3 },
    { rollNo: 24, name: 'Aiden Walker', fathersName: 'Mr. Walker', present: true, email: 'aiden@example.com', phase: 4 },
    { rollNo: 25, name: 'Grace Hall', fathersName: 'Mr. Hall', present: true, email: 'grace@example.com', phase: 1 },
    { rollNo: 26, name: 'Carter Allen', fathersName: 'Mr. Allen', present: false, email: 'carter@example.com', phase: 2 },
    { rollNo: 27, name: 'Ryan Scott', fathersName: 'Mr. Scott', present: true, email: 'ryan@example.com', phase: 1 },
    { rollNo: 28, name: 'Zoe Wright', fathersName: 'Mr. Wright', present: false, email: 'zoe@example.com', phase: 2 },
    { rollNo: 29, name: 'Nathan Green', fathersName: 'Mr. Green', present: true, email: 'nathan@example.com', phase: 3 },
    { rollNo: 30, name: 'Lily Adams', fathersName: 'Mr. Adams', present: true, email: 'lily@example.com', phase: 4 },
    { rollNo: 31, name: 'Jack Cooper', fathersName: 'Mr. Cooper', present: false, email: 'jack@example.com', phase: 1 },
    { rollNo: 32, name: 'Sophie Turner', fathersName: 'Mr. Turner', present: true, email: 'sophie@example.com', phase: 2 },
    { rollNo: 33, name: 'Henry Carter', fathersName: 'Mr. Carter', present: true, email: 'henry@example.com', phase: 3 },
    { rollNo: 34, name: 'Luna Ward', fathersName: 'Mr. Ward', present: false, email: 'luna@example.com', phase: 4 },
    { rollNo: 35, name: 'Leo Wood', fathersName: 'Mr. Wood', present: true, email: 'leo@example.com', phase: 1 },
    { rollNo: 36, name: 'Ella Hughes', fathersName: 'Mr. Hughes', present: true, email: 'ella.h@example.com', phase: 2 },
    { rollNo: 37, name: 'Owen Fisher', fathersName: 'Mr. Fisher', present: false, email: 'owen@example.com', phase: 3 },
    { rollNo: 38, name: 'Grace Bell', fathersName: 'Mr. Bell', present: true, email: 'grace.b@example.com', phase: 4 },
    { rollNo: 39, name: 'Samuel Long', fathersName: 'Mr. Long', present: true, email: 'samuel@example.com', phase: 1 },
    { rollNo: 40, name: 'Isla Perry', fathersName: 'Mr. Perry', present: false, email: 'isla@example.com', phase: 2 },
    { rollNo: 41, name: 'Eli Brooks', fathersName: 'Mr. Brooks', present: true, email: 'eli@example.com', phase: 3 },
    { rollNo: 42, name: 'Aria Powell', fathersName: 'Mr. Powell', present: true, email: 'aria@example.com', phase: 4 },
    { rollNo: 43, name: 'Sebastian King', fathersName: 'Mr. King', present: false, email: 'sebastian@example.com', phase: 1 },
    { rollNo: 44, name: 'Chloe Price', fathersName: 'Mr. Price', present: true, email: 'chloe@example.com', phase: 2 },
    { rollNo: 45, name: 'Lucas Foster', fathersName: 'Mr. Foster', present: true, email: 'lucas@example.com', phase: 3 },
    { rollNo: 46, name: 'Mila Sanders', fathersName: 'Mr. Sanders', present: false, email: 'mila@example.com', phase: 4 },
    { rollNo: 47, name: 'Dylan Rogers', fathersName: 'Mr. Rogers', present: true, email: 'dylan@example.com', phase: 1 },
    { rollNo: 48, name: 'Sienna Griffin', fathersName: 'Mr. Griffin', present: true, email: 'sienna@example.com', phase: 2 },
    { rollNo: 49, name: 'Caleb Richardson', fathersName: 'Mr. Richardson', present: false, email: 'caleb@example.com', phase: 3 },
    { rollNo: 50, name: 'Hannah Cox', fathersName: 'Mr. Cox', present: true, email: 'hannah@example.com', phase: 4 },
    { rollNo: 51, name: 'Benjamin Lee', fathersName: 'Mr. Lee', present: true, email: 'benjamin@example.com', phase: 1}
];

const phase1Subjects = ["Anatomy" ,"Physiology","Biochemistry","Community Medicine", "Foundation Course", "ECA"]
const phase2Subjects = ["Community Medicine" ,"Pathology","Microbiology","Pharmacology", "Forensic Med & TC","Medicine","Surgery", "Obs & Gyn","ECA"]
const phase3Subjects = ["Community Medicine" ,"Medicine","Surgery","Paediatrics", "Forensic Med & TC","Orthopaedics","Ophthalmology","ENT", "Obs & Gyn","ECA"]
const phase4Subjects = ["Psychiatry" ,"Medicine","Surgery","Dermatology", "Radiology","Orthopaedics","Paediatrics","ENT", "Anaesthsiology","Ophthalmology","Obs & Gyn"]

const [filteredStudents, setFilteredStudents] = useState([]);
const [availableSubjects, setAvailableSubjects] = useState([]);
const [checkedStudents, setCheckedStudents] = useState([]);
const [markAbsent, setMarkAbsent] = useState([]);
const [markLeave, setMarkLeave] = useState([]);


useEffect(() => {
  // Reset subject selection when phase changes
  setSubject('');
  
  // Update available subjects based on selected phase
  switch(classSection) {
    case 'Phase I':
      setAvailableSubjects(phase1Subjects);
      break;
    case 'Phase II':
      setAvailableSubjects(phase2Subjects);
      break;
    case 'Phase III Part I':
      setAvailableSubjects(phase3Subjects);
      break;
    case 'Phase III Part II':
      setAvailableSubjects(phase4Subjects);
      break;
    default:
      setAvailableSubjects([]);
  }
}, [classSection]);


useEffect(() => {
  let phase = 0;
  switch(classSection) {
    case 'Phase I':
      phase = 1;
      break;
    case 'Phase II':
      phase = 2;
      break;
    case 'Phase III Part I':
      phase = 3;
      break;
    case 'Phase III Part II':
      phase = 4;
      break;
    default:
      phase = 0;
  }

  const newFilteredStudents = phase === 0 ? [] : allStudents.filter(student => student.phase === phase);
  setFilteredStudents(newFilteredStudents);
  
  setCheckedStudents(new Array(newFilteredStudents.length).fill(false));
  setMarkAbsent(new Array(newFilteredStudents.length).fill(false));
  setMarkLeave(new Array(newFilteredStudents.length).fill(false));
}, [classSection]);


const handleCheckAll = () => {
  setCheckedStudents(new Array(filteredStudents.length).fill(true));
  setMarkAbsent(new Array(filteredStudents.length).fill(false));
  setMarkLeave(new Array(filteredStudents.length).fill(false));
};

const handleAbsentAll = () => {
  setMarkAbsent(new Array(filteredStudents.length).fill(true));
  setCheckedStudents(new Array(filteredStudents.length).fill(false));
  setMarkLeave(new Array(filteredStudents.length).fill(false));
};

const handleLeaveAll = () => {
  setMarkLeave(new Array(filteredStudents.length).fill(true));
  setCheckedStudents(new Array(filteredStudents.length).fill(false));
  setMarkAbsent(new Array(filteredStudents.length).fill(false));
};

const handleClearAll = () => {
  setMarkAbsent(new Array(filteredStudents.length).fill(false));
  setCheckedStudents(new Array(filteredStudents.length).fill(false));
  setMarkLeave(new Array(filteredStudents.length).fill(false));
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
  toast.success("Attendence Updated In Record!", {
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
              id="class-year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-44 ml-8"
            >
              <option value="" disabled>Select class</option>
              <option value="2020">2020</option>
              <option value="2021 II">2021</option>
              <option value="2022 III Part I">2022</option>
              <option value="2023 III Part II">2023</option>
            </select>
          </div>

          <div className="flex flex-col items-center justify-center h-full">
            <label
              htmlFor="class-section"
              className="block mb-2 text-sm font-medium text-gray-500 dark:text-white ml-4"
            >
              Select Phase <span className="text-red-500">*</span>
            </label>
            <select
              id="class-section"
              value={classSection}
              onChange={(e) => setClassSection(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-44 ml-8"
            >
              <option value="" disabled>Select class</option>
              <option value="Phase I">MBBS Phase I</option>
              <option value="Phase II">MBBS Phase II</option>
              <option value="Phase III Part I">MBBS Phase III Part I</option>
              <option value="Phase III Part II">MBBS Phase III Part II</option>
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
            <option value="09:00-10:00">08:00 AM - 09:00 AM</option>
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
              {availableSubjects.map((subj, index) => (
                <option key={index} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
          </div>
        <div className="flex flex-col items-center justify-center h-full">
          <label
            htmlFor="subject"
            className="block mb-2 text-sm font-medium text-gray-500 dark:text-white ml-4"
          >
            Lecture number <span className="text-red-500">*</span>
          </label>
          <select
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" disabled>Select Lecture Count</option>
            <option value="lecture 1">lecture 1</option>
            <option value="lecture 2">lecture 2</option>
            <option value="lecture 3">lecture 3</option>
            <option value="lecture 4">lecture 4</option>
            <option value="lecture 5">lecture 5</option>
            <option value="lecture 6">lecture 6</option>
            <option value="lecture 7">lecture 7</option>
            <option value="lecture 8">lecture 8</option>
            <option value="lecture 9">lecture 9</option>
            <option value="lecture 10">lecture 10</option>

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

      {/* Attendance Marking Table */}
      {filteredStudents.length > 0 && (
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
                
                <th className=" px-4 py-2 border-b text-black text-left  ">Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student.rollNo} >
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
                  
                  <td className="py-2 px-4 border-b text-black ">{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredStudents.length > 0 && (
        <div className="flex mt-4 md:flex-row flex-col justify-center">
          <button className="p-4 mx-8 my-2 rounded-lg text-white text-center bg-blue-600 py-2 hover:underline" onClick={handleClearAll}>Clear All</button>
          <button className="p-4 mx-8 my-2 rounded-lg text-center text-white bg-blue-600 py-2 hover:underline" onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Attendence;