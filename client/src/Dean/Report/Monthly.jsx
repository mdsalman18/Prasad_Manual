import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

const Monthly = () => {
  const [startMonth, setStartMonth] = useState("Jan-24");
  const [endMonth, setEndMonth] = useState("Jan-24");
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
  
  
  const monthLabels = [
    "Jan-24",
    "Feb-24",
    "Mar-24",
    "Apr-24",
    "May-24",
    "June-24",
    "July-24",
    "Aug-24",
    "Sept-24",
    "Oct-24",
    "Nov-24",
    "Dec-24",
  ];
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
  


  const getMonthIndex = (month) => monthLabels.indexOf(month);

  const handleStartMonthChange = (e) => {
    const selectedMonth = e.target.value;
    setStartMonth(selectedMonth);
    if (getMonthIndex(selectedMonth) > getMonthIndex(endMonth)) {
      setEndMonth(selectedMonth);
    }
  };

  const handleEndMonthChange = (e) => {
    setEndMonth(e.target.value);

  }

  const handleFrequencyChange = (e) => {
    setFrequency(e.target.value);
    setSelectedQuarter("");
    setSelectedHalf("");
    setEndMonth(startMonth);
  };

  const handleQuarterChange = (e) => {
    setSelectedQuarter(e.target.value);
    setEndMonth(startMonth);
  };

  const handleHalfChange = (e) => {
    setSelectedHalf(e.target.value);
    setEndMonth(startMonth);
  };


  const visibleMonths = () => {
    const startIndex = getMonthIndex(startMonth);
    const endIndex = getMonthIndex(endMonth);
    let monthsToDisplay = [];

    if (frequency === "Monthly") {
      return monthLabels.slice(startIndex, endIndex + 1);
    } else if (frequency === "Quarterly" && selectedQuarter) {
      const quarterStartMonths = {
        1: [0, 1, 2], // Jan, Feb, Mar
        2: [3, 4, 5], // Apr, May, Jun
        3: [6, 7, 8], // Jul, Aug, Sept
        4: [9, 10, 11], // Oct, Nov, Dec
      };
      quarterStartMonths[selectedQuarter].forEach((monthIndex) => {
        if (monthIndex >= startIndex) {
          monthsToDisplay.push(monthLabels[monthIndex]);
        }
      });
    } else if (frequency === "Half-Yearly" && selectedHalf) {
      const halfStartMonths = {
        1: [0, 1, 2, 3, 4, 5], // First Half: Jan to Jun
        2: [6, 7, 8, 9, 10, 11], // Second Half: Jul to Dec
      };
      halfStartMonths[selectedHalf].forEach((monthIndex) => {
        if (monthIndex >= startIndex) {
          monthsToDisplay.push(monthLabels[monthIndex]);
        }
      });
    } else if (frequency === "Yearly") {
      monthsToDisplay = monthLabels.slice(0, 12); // Display all 12 months
    }

    return monthsToDisplay;
  };


  
  const calculateAttendanceForPeriod = (student) => {
    const months = visibleMonths();
    let totalPresent = 0;
    let totalClasses = 0;

    months.forEach(month => {
      const monthKey = monthMapping[month];
      if (student.monthlyAttendance[monthKey]) {
        totalPresent += student.monthlyAttendance[monthKey].present;
        totalClasses += student.monthlyAttendance[monthKey].total;
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
                  htmlFor="start-month"
                  className="block mb-2 text-sm font-medium text-white ml-5"
                >
                  Starting Month <span className="text-red-500">*</span>
                </label>
                <select
                  id="start-month"
                  value={startMonth}
                  onChange={handleStartMonthChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ml-8"
                >
                  <option value="">Select Starting Month</option>
                  {monthLabels.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col items-center justify-center h-full">
                <label
                  htmlFor="end-month"
                  className="block mb-2 text-sm font-medium text-white ml-5"
                >
                  Ending Month <span className="text-red-500">*</span>
                </label>
                <select
                  id="end-month"
                  value={endMonth}
                  onChange={handleEndMonthChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ml-8"
                >
                  <option value="">Select Ending Month</option>
                  {monthLabels.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
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
                  {visibleMonths().map((month, index) => (
                    <th
                      key={index}
                      className="border border-gray-300 text-left p-4 text-white"
                    >
                      {month}
                    </th>
                  ))}
                  <th className="border border-gray-300 text-left p-4 text-white">
                    Total Classes
                  </th>
                  <th className="border border-gray-300 text-left p-4 text-white">
                    Total Presence
                  </th>
                  <th className="border border-gray-300 text-left p-4 text-white">
                    Proportion %
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
                      {visibleMonths().map((month, monthIndex) => {
                        const monthKey = monthMapping[month];
                        const monthData = student.monthlyAttendance[monthKey];
                        return (
                          <td key={monthIndex} className="border border-gray-300 p-4 text-white">
                            {monthData ? monthData.present : 0}
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
      </div>
    </div>
  );
};

export default Monthly;