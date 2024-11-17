import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { saveAs } from 'file-saver';

const Monthly = () => {
  const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
  const [frequency, setFrequency] = useState("Monthly");
  const [selectedQuarter, setSelectedQuarter] = useState("");
  const [selectedHalf, setSelectedHalf] = useState("");
  const [classSection, setClassSection] = useState('');
  const [students , setStudents] = useState([]);
  const [subject, setSubject] = useState('');
  const [availableSubjects, setAvailableSubjects] = useState([]);


  useEffect(() => {
    const fetchData = async ()=> {
    const studentData = await axiosInstance.get(`/${subject}/`)
    
    const formattedStudents = studentData.data.map((student) => {
      const monthlyAttendance = {};

      // Process each date and status
      student.dates.forEach((date, index) => {
        const status = student.statuses[index];
        const month = date.slice(0, 7); // Extracts 'YYYY-MM'

        // Initialize monthly data if not already present
        if (!monthlyAttendance[month]) {
          monthlyAttendance[month] = { present: 0, absent: 0, total: 0 };
        }

        // Update present or absent count based on status
        if (status === "P") {
          monthlyAttendance[month].present += 1;
        } else if (status === "A") {
          monthlyAttendance[month].absent += 1;
        }
        monthlyAttendance[month].total += 1;
      });

      return {
        ...student,
        monthlyAttendance,
      };
    });

    setStudents(formattedStudents);
  }
  fetchData()
  }, [subject]);

  useEffect(() => {
    const fetchAndSetStudents = async () => {
      switch (classSection) {
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
    };
  
    fetchAndSetStudents();
  }, [classSection]);
  
  
  // const monthLabels = [
  //   "Jan-24",
  //   "Feb-24",
  //   "Mar-24",
  //   "Apr-24",
  //   "May-24",
  //   "June-24",
  //   "July-24",
  //   "Aug-24",
  //   "Sept-24",
  //   "Oct-24",
  //   "Nov-24",
  //   "Dec-24",
  // ];
  const monthMapping = {
    "Jan-24": "2024-01", "Feb-24": "2024-02", "Mar-24": "2024-03",
    "Apr-24": "2024-04", "May-24": "2024-05", "June-24": "2024-06",
    "July-24": "2024-07", "Aug-24": "2024-08", "Sept-24": "2024-09",
    "Oct-24": "2024-10", "Nov-24": "2024-11", "Dec-24": "2024-12"
  };
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
  


  // const getMonthIndex = (month) => monthLabels.indexOf(month);

  // const handleStartMonthChange = (e) => {
  //   const selectedMonth = e.target.value;
  //   setStartMonth(selectedMonth);
  //   if (getMonthIndex(selectedMonth) > getMonthIndex(endMonth)) {
  //     setEndMonth(selectedMonth);
  //   }
  // };

  // const handleEndMonthChange = (e) => {
  //   setEndMonth(e.target.value);

  // }

  const handleFrequencyChange = (e) => {
    setFrequency(e.target.value);
    setSelectedQuarter("");
    setSelectedHalf("");
    // setEndMonth(startMonth);
  };

  const handleQuarterChange = (e) => {
    setSelectedQuarter(e.target.value);
    // setEndMonth(startMonth);
  };

  const handleHalfChange = (e) => {
    setSelectedHalf(e.target.value);
    // setEndMonth(startMonth);
  };


  const visibleDates = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (!startDate || !endDate) {
      return [];
    }
  
    return students.length > 0
      ? Array.from(
          new Set(
            students.flatMap((student) =>
              student.dates.filter((date) => {
                const current = new Date(date);
                return current >= start && current <= end;
              })
            )
          )
        ).sort((a, b) => new Date(a) - new Date(b))
      : [];
  };
  


  
  const calculateAttendanceForPeriod = (student) => {
    const dates = visibleDates();
    let totalPresent = 0;
    let totalClasses = 0;
  
    dates.forEach(date => {
      const index = student.dates.indexOf(date);
      if (index !== -1) {
        const status = student.statuses[index];
        if (status === "P") totalPresent++;
        totalClasses++;
      }
    });
  
    const attendancePercentage = totalClasses > 0
      ? ((totalPresent / totalClasses) * 100).toFixed(2)
      : 0;
  
    return {
      totalPresent,
      totalClasses,
      attendancePercentage
    };
  };
  

  const downloadCSV = () => {
    // Headers for CSV
    const headers = ['Roll No', 'Name', "Father's Name", ...visibleDates(), 'Total Classes', 'Total Presence', 'Population %'];
    
    // Rows for CSV
    const rows = students.map((student) => {
        
      // Calculate total presence and total classes for the selected period
      const { totalPresent, totalClasses, attendancePercentage } = calculateAttendanceForPeriod(student);
  
      // Gather attendance data for each visible month
      const attendanceData = visibleDates().map(month => {
        const monthKey = monthMapping[month];
        return student.monthlyAttendance[monthKey] ? student.monthlyAttendance[monthKey].present : 0;
      });
  
      // Add a row with rollNo and fathersName fields
      return [
        student.roll_number,    
        student.student_name,
        student.fathers_name,   
        ...attendanceData,
        totalClasses,
        totalPresent,
        `${attendancePercentage}%`
      ];
    });
  
    // Create CSV content
    const csvContent = [
      headers.join(','), 
      ...rows.map(row => row.join(','))
    ].join('\n');
  
    // Create a blob and trigger the download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'attendance_report.csv');
  };
  
  

  return (
    <div className="bg-black mb-6 min-h-screen">
      <div className="my-5">
        <h1 className="font-bold text-center mt-4 my-4 text-xl text-white">
        Attendence Report
        </h1>

        <div className="flex flex-wrap lg:flex-nowrap justify-evenly">
        <div className="flex flex-col items-center justify-center h-full">
            <label
              htmlFor="class-section"
              className="block mb-2 text-sm font-medium text-white dark:text-white ml-4"
            >
              Select Phase <span className="text-red-500">*</span>
            </label>
            <select
              id="class-section"
              value={classSection}
              onChange={(e) => setClassSection(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-44 ml-8"
            >
              <option value="" disabled>Select Phase</option>
              <option value="Phase I">MBBS Phase I</option>
              <option value="Phase II">MBBS Phase II</option>
              <option value="Phase III Part I">MBBS Phase III Part I</option>
              <option value="Phase III Part II">MBBS Phase III Part II</option>
            </select>
          </div>

          
        <div className="flex flex-col items-center justify-center h-full">
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-white dark:text-white ml-4"
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
                <option key = {index} value = {subj[1]}>
                  {subj[0]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-center justify-center h-full">
            <label
              htmlFor="frequency"
              className="block mb-2 text-sm font-medium text-white ml-5"
            >
              Frequency <span className="text-red-500">*</span>
            </label>
            <select
              id="frequency"
              value={frequency}
              onChange={handleFrequencyChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ml-8"
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Half-Yearly">Half-Yearly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          {frequency === "Quarterly" && (
            <div className="flex items-center flex-col justify-center h-full">
              <label
                htmlFor="quarter"
                className="block mb-2 text-sm font-medium text-white ml-5"
              >
                Select Quarter <span className="text-red-500">*</span>
              </label>
              <select
                id="quarter"
                value={selectedQuarter}
                onChange={handleQuarterChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ml-8"
              >
                <option value="">Select Quarter</option>
                <option value="1">Quarter 1</option>
                <option value="2">Quarter 2</option>
                <option value="3">Quarter 3</option>
                <option value="4">Quarter 4</option>
              </select>
            </div>
          )}

          {frequency === "Half-Yearly" && (
            <div className="flex items-center flex-col justify-center h-full">
              <label
                htmlFor="half"
                className="block mb-2 text-sm font-medium text-white ml-5"
              >
                Select Half <span className="text-red-500">*</span>
              </label>
              <select
                id="half"
                value={selectedHalf}
                onChange={handleHalfChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ml-8"
              >
                <option value="">Select Half</option>
                <option value="1">First Half</option>
                <option value="2">Second Half</option>
              </select>
            </div>
          )}

          {frequency === "Monthly" && (
            <>
              <div className="flex flex-col items-center justify-center h-full">
  <label
    htmlFor="start-date"
    className="block mb-2 text-sm font-medium text-white ml-5"
  >
    Starting Date <span className="text-red-500">*</span>
  </label>
  <input
    type="date"
    id="start-date"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ml-8"
  />
</div>

<div className="flex flex-col items-center justify-center h-full">
  <label
    htmlFor="end-date"
    className="block mb-2 text-sm font-medium text-white ml-5"
  >
    Ending Date <span className="text-red-500">*</span>
  </label>
  <input
    type="date"
    id="end-date"
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ml-8"
  />
</div>

            </>
          )}
        </div>

        <div className="ml-[4%]  flex justify-evenly overflow-x-auto border border-white mt-5">
          <div className="w-[1100px] ">
            <table className="min-w-full border-collapse border border-gray-400  mx-auto overflow-scroll">
            <thead>
  <tr className="bg-gray-700">
    <th className="border border-gray-300 text-left p-4 text-white">
      Roll No
    </th>
    <th className="border border-gray-300 text-left p-4 text-white">
      Student Name
    </th>
    <th className="border border-gray-300 text-left p-4 text-white">
      Father's Name
    </th>
    {visibleDates().map((date, index) => (
      <th
        key={index}
        className="border border-gray-300 text-left p-4 text-white"
      >
        {date}
      </th>
    ))}
    <th className="border border-gray-300 text-left p-4 text-white">
      Total Classes
    </th>
    <th className="border border-gray-300 text-left p-4 text-white">
      Total Presence
    </th>
    <th className="border border-gray-300 text-left p-4 text-white">
      Attendance %
    </th>
  </tr>
</thead>
<tbody>
  {students.map((student, index) => {
    const { totalPresent, totalClasses, attendancePercentage } = calculateAttendanceForPeriod(student);

    return (
      <tr key={index} className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}>
        <td className="border border-gray-300 p-4 text-white">{student.roll_number}</td>
        <td className="border border-gray-300 p-4 text-white">{student.student_name}</td>
        <td className="border border-gray-300 p-4 text-white">{student.fathers_name}</td>
        {visibleDates().map((date, dateIndex) => {
          const index = student.dates.indexOf(date);
          const status = index !== -1 ? student.statuses[index] : "0";
          return (
            <td key={dateIndex} className="border border-gray-300 p-4 text-white">
              {status === "P" ? 1 : 0}
            </td>
          );
        })}
        <td className="border border-gray-300 p-4 text-white">{totalClasses}</td>
        <td className="border border-gray-300 p-4 text-white">{totalPresent}</td>
        <td className="border border-gray-300 p-4 text-white">{attendancePercentage}</td>
      </tr>
    );
  })}
</tbody>

            </table>
          </div>
        </div>
        <div className="flex justify-center my-5">
          <button
            onClick={downloadCSV}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
          Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Monthly;
