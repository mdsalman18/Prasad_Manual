import React, { useEffect, useState } from "react";
import "./Attendence.css";
import Service from "../components/Service";
import { toast } from 'react-toastify';
import axiosInstance from "../axiosInstance";

const Attendence = () => {
  const [classSection, setClassSection] = useState('');
  const [year, setYear] = useState('');
  const [attendanceDate, setAttendanceDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [subject, setSubject] = useState('');

  
  

const phase1Subjects = ["Anatomy" ,"Physiology","Biochemistry","Community Medicine", "Foundation Course", "ECA"]
const phase2Subjects = ["Community Medicine" ,"Pathology","Microbiology","Pharmacology", "Forensic Med & TC","Medicine","Surgery", "Obs & Gyn","ECA"]
const phase3Subjects = ["Community Medicine" ,"Medicine","Surgery","Paediatrics", "Forensic Med & TC","Orthopaedics","Ophthalmology","ENT", "Obs & Gyn","ECA"]
const phase4Subjects = ["Psychiatry" ,"Medicine","Surgery","Dermatology", "Radiology","Orthopaedics","Paediatrics","ENT", "Anaesthsiology","Ophthalmology","Obs & Gyn"]

const [filteredStudents, setFilteredStudents] = useState([]);
const [allStudents, setAllStudents] = useState([]);
const [availableSubjects, setAvailableSubjects] = useState([]);
const [checkedStudents, setCheckedStudents] = useState([]);
const [markAbsent, setMarkAbsent] = useState([]);

const getStudents = async () => {
  axiosInstance.get('/students/')
  .then(res => {
    console.log(res);
    setAllStudents(res.data)
  })
  .catch(e => {
    console.log(e);
  })
}
useEffect(() => {
  getStudents();
}, [])

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

  const newFilteredStudents = phase === 0 ? allStudents : allStudents.filter(student => student.phase === phase);
  //
//  when a phase field is given then set setFilteredStudents to newFilteredStudents
  //
  setFilteredStudents(allStudents);
  
  setCheckedStudents(new Array(newFilteredStudents.length).fill(false));
  setMarkAbsent(new Array(newFilteredStudents.length).fill(false));
}, [classSection]);


const handleCheckAll = () => {
  setCheckedStudents(new Array(filteredStudents.length).fill(true));
  setMarkAbsent(new Array(filteredStudents.length).fill(false));
};

const handleAbsentAll = () => {
  setMarkAbsent(new Array(filteredStudents.length).fill(true));
  setCheckedStudents(new Array(filteredStudents.length).fill(false));
};


const handleClearAll = () => {
  setMarkAbsent(new Array(filteredStudents.length).fill(false));
  setCheckedStudents(new Array(filteredStudents.length).fill(false));
};

const handleCheckboxChange = (index) => {
  const updatedCheckedStudents = [...checkedStudents];
  updatedCheckedStudents[index] = !updatedCheckedStudents[index];
  setCheckedStudents(updatedCheckedStudents);

  if (updatedCheckedStudents[index]) {
    const updatedMarkAbsent = [...markAbsent];
    updatedMarkAbsent[index] = false;
    setMarkAbsent(updatedMarkAbsent);
  }
};

const handleAbsentChange = (index) => {
  const updatedMarkedStudents = [...markAbsent];
  updatedMarkedStudents[index] = !updatedMarkedStudents[index];
  setMarkAbsent(updatedMarkedStudents);

  if (updatedMarkedStudents[index]) {
    const updatedCheckedStudents = [...checkedStudents];
    updatedCheckedStudents[index] = false;
    setCheckedStudents(updatedCheckedStudents);
  }
};




const formatAttendanceData = () => {
  const attendance_list = filteredStudents.map((student, index) => {
    // Determine status based on checked or absent state
    let status = "A"; // Default to absent
    if (checkedStudents[index]) {
      status = "P";
    } else if (markAbsent[index]) {
      status = "A";
    }

    return {
      student: index+1, // Using roll_no as student identifier
      date: attendanceDate || new Date().toISOString().split('T')[0], // Use selected date or today's date
      status: status
    };
  }).filter(attendance => attendance.status === "P" || attendance.status === "A"); // Only include marked students

  return { attendance_list };
};

const handleSubmit = async () => {
  // Validate if date is selected
  if (!attendanceDate) {
    toast.error("Please select attendance date!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return;
  }

  // Validate if any student is marked
  const anyStudentMarked = checkedStudents.some(checked => checked) || markAbsent.some(absent => absent);
  if (!anyStudentMarked) {
    toast.error("Please mark at least one student's attendance!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return;
  }

  try {
    const attendanceData = formatAttendanceData();
    
    // Send data to backend
    const response = await axiosInstance.post('/anatomy/', attendanceData).then(res => {

    
    console.log(res);
    
    
      toast.success("Attendance Updated In Record!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    
    })
      
      handleClearAll();
    }
 catch (error) {    
    console.error("Error submitting attendance:", error);
    toast.error("Failed to update attendance. Please try again!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};


  

  return (

    <div className=" bg-black mb-6">

      {/* this is the start of selection things */}
      <div className='my-5'>
        <h1 className="font-bold text-center mt-4 my-4 text-xl">Student Attendance</h1>

        
        <div className="flex flex-wrap lg:flex-nowrap justify-evenly gap-10">

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
            <option value="" disabled>Select Lecture Type</option>
            <option value="Lecture">Lecture</option>
            <option value="Practical">Practical</option>
            <option value="Morning Posting">Morning Posting</option>
            <option value="Family Adoption Programme">Family Adoption Programme</option>
            <option value="Self Directed Learning">Self Directed Learning</option>
            <option value="Small Gp Discussion">Small Gp Discussion</option>
            <option value="AETCOM">AETCOM</option>
            <option value="Pandemic Module">Pandemic Module</option>
            <option value="Sports/Yoga & Extra Curricular Acititvies">Sports/ Yoga & Extra Curricular Acititvies</option>
            <option value="Electives">Electives</option>
 
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
                    onClick={handleCheckAll}
                    className="px-4 py-2 bg-green-600 text-black rounded border-2">
                    Present <i className="fa-regular fa-circle"></i>
                  </button>
                </th>
                <th className="py-2 px-4 border-b text-black text-left">
                  <button
                    onClick={handleAbsentAll}
                    className="px-4 py-2 text-black bg-red-600 rounded border-2">
                    Absent <i className="fa-regular fa-circle"></i>
                  </button>
                </th>
                
                <th className=" px-4 py-2 border-b text-black text-left  ">Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student.id} >
                  <td className="py-2 px-4 border-b text-black">{student.roll_no}</td>
                  <td className="py-2 px-4 border-b text-black">{student.name}</td>
                  <td className="py-2 px-4 border-b text-black">{student.fathers_name}</td>
                  
                  <td className="py-2 px-4 border-b pl-6">
                    <input
                      className="w-6 h-6 mx-8"
                      type="checkbox"
                      checked={checkedStudents[index]}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                  <td className="py-2 px-4 border-b pl-6 text-black">
                    <input
                      type="checkbox"
                      className="w-6 h-6 mx-8"
                      checked={markAbsent[index]}
                      onChange={() => handleAbsentChange(index)}
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
