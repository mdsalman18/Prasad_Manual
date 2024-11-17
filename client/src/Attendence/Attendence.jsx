import React, { useEffect, useState } from "react";
import "./Attendence.css";
import { toast } from 'react-toastify';
import axiosInstance from "../axiosInstance";

const Attendence = () => {
  const [classSection, setClassSection] = useState('');
  const [year, setYear] = useState('');
  const [attendanceDate, setAttendanceDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [subject, setSubject] = useState('');
  const [lectureType, setLectureType] = useState('');


  const phase1Subjects = [
    ["Anatomy", "anatomy"],
    ["Physiology", "physiology"],
    ["Biochemistry", "biochemistry"],
    ["Community-Medicine", "communitymedicine"],
    ["Foundation-Course", "foundationcourse"],
    ["ECA", "ecaI"],
  ];
  const phase2Subjects = [
    ["Community Medicine", "communitymedicine2"],
    ["Pathology", "pathology"],
    ["Microbiology", "microbiology"],
    ["Pharmacology", "pharmacology"],
    ["Forensic Med & TC", "forensicmedandtc1"],
    ["Medicine", "medicine1"],
    ["Surgery", "surgery1"],
    ["Obs & Gyn", "obsandgyn1"],
    ["ECA", "eca2"]
  ];
  
  const phase3Subjects = [
    ["Community Medicine", "communitymedicine3"],
    ["Medicine", "medicine2"],
    ["Surgery", "surgery2"],
    ["Paediatrics", "paediatrics"],
    ["Forensic Med & TC", "forensicmedandtc2"],
    ["Orthopaedics", "orthopaedics"],
    ["Ophthalmology", "ophthalmology"],
    ["ENT", "ent"],
    ["Obs & Gyn", "obsandgyn2"],
    ["ECA", "ecaIII"]
  ];
  
  const phase4Subjects = [
    ["Psychiatry", "psychiatry"],
    ["Medicine", "medicine3"],
    ["Surgery", "surgery3"],
    ["Dermatology", "dermatology"],
    ["Radiology", "radiology"],
    ["Orthopaedics", "orthopaedics2"],
    ["Paediatrics", "paediatrics2"],
    ["ENT", "ent2"],
    ["Anaesthesiology", "anaesthsiology"],
    ["Ophthalmology", "ophthalmology2"],
    ["Obs & Gyn", "obsandgyn3"]
  ];
  
const [filteredStudents, setFilteredStudents] = useState([]);
const [availableSubjects, setAvailableSubjects] = useState([]);
const [checkedStudents, setCheckedStudents] = useState([]);
const [markAbsent, setMarkAbsent] = useState([]);

const getStudents = async (phase = "students1") => {
    const res = await axiosInstance.get(`/${phase}/`)
    .then(res => {
      setFilteredStudents(res.data);
      setCheckedStudents(new Array(res.data.length).fill(false));
      setMarkAbsent(new Array(res.data.length).fill(false));
      console.log(res.data);
  })
   .catch (e => { 
    console.log(e);
  })
};


useEffect(() => {
  const fetchAndSetStudents = async () => {
    switch (classSection) {
      case 'Phase I':
        await getStudents('students1');
        setAvailableSubjects(phase1Subjects);
        break;
      case 'Phase II':
        await getStudents('students2');
        setAvailableSubjects(phase2Subjects);
        break;
      case 'Phase III Part I':
        await getStudents('students3');
        setAvailableSubjects(phase3Subjects);
        break;
      case 'Phase III Part II':
        await getStudents('students4');
        setAvailableSubjects(phase4Subjects);
        break;
      default:
        setAvailableSubjects([]);
    }
  };

  fetchAndSetStudents();
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
      roll_number : student.roll_no , // Using roll_no as student identifier
      date: attendanceDate || new Date().toISOString().split('T')[0], // Use selected date or today's date
      status: status,
      lectureType: lectureType 
    };
  }).filter(attendance => attendance.status === "P" || attendance.status === "A"); 

  return { attendance_list };
};

const handleSubmit = async () => {
  // Validate if date is selected
  console.log(subject);
  
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
    const response = await axiosInstance.post(`/${subject}/`, attendanceData).then(res => {

    
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
      setTimeout(() => {
        window.location.reload();
      }, 4000); // 2 seconds delay for user experience
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

    <div className="specific-container bg-gray">

      {/* this is the start of selection things */}
      <div className="bg my-5">
  <h1 className="font-bold text-center mt-4 my-4 text-xl">Student Attendance</h1>

  <div className="flex flex-wrap lg:flex-nowrap justify-evenly gap-10">
    {/** Common Flex Container */}
    <div className="flex flex-col items-start w-48 ml-5">
      <label
        htmlFor="year-section"
        className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
      >
        Select Batch <span className="text-red-500">*</span>
      </label>
      <select
        id="class-year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" disabled>Select class</option>
        <option value="2020">2020</option>
        <option value="2021 II">2021</option>
        <option value="2022 III Part I">2022</option>
        <option value="2023 III Part II">2023</option>
      </select>
    </div>

    <div className="flex flex-col items-start w-48">
      <label
        htmlFor="class-section"
        className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
      >
        Select Phase <span className="text-red-500">*</span>
      </label>
      <select
        id="class-section"
        value={classSection}
        onChange={(e) => setClassSection(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" disabled>Select Phase</option>
        <option value="Phase I">MBBS Phase I</option>
        <option value="Phase II">MBBS Phase II</option>
        <option value="Phase III Part I">MBBS Phase III Part I</option>
        <option value="Phase III Part II">MBBS Phase III Part II</option>
      </select>
    </div>

    <div className="flex flex-col items-start w-48">
      <label
        htmlFor="attendance-date"
        className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
      >
        Attendance Date <span className="text-red-500">*</span>
      </label>
      <input
        type="date"
        id="attendance-date"
        value={attendanceDate}
        onChange={(e) => setAttendanceDate(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>

    <div className="flex flex-col items-start w-48">
      <label
        htmlFor="time-slot"
        className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
      >
        Select Time Slot <span className="text-red-500">*</span>
      </label>
      <select
        id="time-slot"
        value={timeSlot}
        onChange={(e) => setTimeSlot(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" disabled>Select time slot</option>
        <option value="08:00-09:00">08:00 AM - 09:00 AM</option>
        <option value="09:00-10:00">09:00 AM - 10:00 AM</option>
        <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
        <option value="11:00-12:00">11:00 AM - 12:00 PM</option>
        <option value="12:00-13:00">12:00 PM - 01:00 PM</option>
        <option value="13:00-14:00">01:00 PM - 02:00 PM</option>
        <option value="14:00-15:00">02:00 PM - 04:00 PM</option>
        <option value="16:00-17:00">04:00 PM - 05:00 PM</option>
      </select>
    </div>

    <div className="flex flex-col items-start w-48">
      <label
        htmlFor="subject"
        className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
      >
        Select Subject <span className="text-red-500">*</span>
      </label>
      <select
        id="subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" disabled>Select subject</option>
        {availableSubjects.map((subj, index) => (
          <option key={index} value={subj[1]}>
            {subj[0]}
          </option>
        ))}
      </select>
    </div>

    <div className="flex flex-col items-start w-48 mr-5">
      <label
        htmlFor="lecture-type"
        className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
      >
        Select Lecture Type <span className="text-red-500">*</span>
      </label>
      <select
        id="lecture-type"
        value={lectureType}
        onChange={(e) => setLectureType(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" disabled>Select Lecture Type</option>
        <option value="Lecture">Lecture</option>
        <option value="Practical">Practical</option>
        <option value="Morning-Posting">Morning Posting</option>
        <option value="Family-Adoption-Programme">Family Adoption Programme</option>
        <option value="Self-Directed-Learning">Self Directed Learning</option>
        <option value="Small-Gp-Discussion">Small Gp Discussion</option>
        <option value="AETCOM">AETCOM</option>
        <option value="Pandemic-Module">Pandemic Module</option>
        <option value="Sports/Yoga&Extra-Curricular-Acititvies">
          Sports/ Yoga & Extra Curricular Activities
        </option>
        <option value="Electives">Electives</option>
      </select>
    </div>
  </div>



      {/* <div className="w-1/2 m-auto mt-5">
        <button className=" px-4 py-2 bg-blue-600  text-black rounded border-2">
          Search
        </button>
      </div> */}
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