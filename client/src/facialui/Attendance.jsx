import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function AutomaticAttendance() {
  
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedPhase, setSelectedPhase] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedLectureType, setSelectedLectureType] = useState('');
  const navigate = useNavigate();

  const handleStartAttendance = () => {
    // Check if all required fields are filled
    if (
      !selectedBatch ||
      !selectedPhase ||
      !selectedSubject ||
      !selectedDate ||
      !selectedTimeSlot ||
      !selectedLectureType
    ) {
      // Show an alert if any field is empty
      alert('Please fill out all the fields before starting the attendance.');
      return; // Prevent navigation if validation fails
    }
    
    // Create an object with all the form data
    const attendanceData = {
      batch: selectedBatch,
      phase: selectedPhase,
      subject: selectedSubject,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      lectureType: selectedLectureType
    };
    
    // Navigate to the AttendanceCapture page and pass the data
    navigate('/face', { state: { attendanceData } });
  };

  // Subject options based on phase selection
  const subjectsByPhase = {
    'Phase 1': ['Anatomy', 'Physiology', 'Biochemistry', 'Community Medicine', 'Foundation Course', 'ECA'],
    'Phase 2': ['Community Medicine', 'Pathology', 'Microbiology', 'Pharmacology', 'Forensic Med & TC', 'Medicine', 'Surgery', 'Obs & Gyn', 'ECA'],
    'Phase 3 Part 1': ['Community Medicine', 'Forensic Medicine & Toxicology', 'Medicine', 'Surgery', 'Paediatrics', 'Orthopaedics', 'Ophthalmology', 'ENT', 'Obs & Gyn', 'ECA'],
    'Phase 3 Part 2': ['Medicine', 'Surgery', 'Obs & Gyn', 'Psychiatry', 'Dermatology', 'Radiology', 'Paediatrics', 'Orthopaedics', 'ENT', 'Anaesthesiology', 'Ophthalmology']
  };

  // Lecture types
  const lectureTypes = [
    'Lecture', 'Practical', 'Morning Posting', 'Family Adoption Programme',
    'Self Directed Learning', 'Small Gp Discussion', 'AETCOM', 'Pandemic Module',
    'Sports/ Yoga & Extra Curricular Activities', 'Electives'
  ];

  // Time slots
  const timeSlots = [
    '8 am to 9 am', '9 am to 10 am', '10 am to 11 am', '11 am to 12 pm',
    '11 am to 1 pm', '9 am to 12 pm', '10 am to 12 pm', '12 pm to 1 pm',
    '1 pm to 2 pm', '2 pm to 3 pm', '3 pm to 4 pm', '4 pm to 5 pm',
    '2 pm to 4 pm', '3 pm to 5 pm'
  ];

  return (
    
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-black to-gray-600">
      <div className="flex flex-col w-3/4 bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-20">
        {/* Centered Heading */}
        <h2 className="text-3xl font-bold text-slate-300 mb-4 text-center mt-6">Facial Attendance</h2>
        
        <div className="flex">
          {/* Left Section: Form */}
          <div className="w-1/2 p-8">
            <form className="space-y-6">
              {/* Dropdown for selecting Batch */}
              <div className="mb-4">
                <label className="block text-slate-300">Select Batch:</label>
                <select
                  className="mt-2 block w-full py-2 px-3 border border-gray-300 bg-gray-600 rounded-md"
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                >
                  <option value="">Select Batch</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                </select>
              </div>

              {/* Dropdown for selecting Phase */}
              <div className="mb-4">
                <label className="block text-slate-300">Select Phase:</label>
                <select
                  className="mt-2 block w-full py-2 px-3 border border-gray-300 bg-gray-600 rounded-md"
                  value={selectedPhase}
                  onChange={(e) => {
                    setSelectedPhase(e.target.value);
                    setSelectedSubject('');
                  }}
                >
                  <option value="">Select Phase</option>
                  <option value="Phase 1">Phase 1</option>
                  <option value="Phase 2">Phase 2</option>
                  <option value="Phase 3 Part 1">Phase 3 Part 1</option>
                  <option value="Phase 3 Part 2">Phase 3 Part 2</option>
                </select>
              </div>

              {/* Dropdown for selecting Subject */}
              <div className="mb-4">
                <label className="block text-slate-300">Select Subject:</label>
                <select
                  className="mt-2 block w-full py-2 px-3 border border-gray-300 bg-gray-600 rounded-md"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  disabled={!selectedPhase}
                >
                  <option value="">Select Subject</option>
                  {selectedPhase &&
                    subjectsByPhase[selectedPhase].map((subject, index) => (
                      <option key={index} value={subject}>
                        {subject}
                      </option>
                    ))}
                </select>
              </div>
            </form>
          </div>

          {/* Right Section: Additional Dropdowns */}
          <div className="w-1/2 p-8">
            <form className="space-y-6">
              {/* Dropdown for selecting Date */}
              <div className="mb-4">
                <label className="block text-slate-300">Select Date:</label>
                <input
                  type="date"
                  className="mt-2 block w-full py-2 px-3 border border-gray-300 bg-gray-600 rounded-md"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              {/* Dropdown for selecting Time Slot */}
              <div className="mb-4">
                <label className="block text-slate-300">Select Time Slot:</label>
                <select
                  className="mt-2 block w-full py-2 px-3 border border-gray-300 bg-gray-600 rounded-md"
                  value={selectedTimeSlot}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                >
                  <option value="">Select Time Slot</option>
                  {timeSlots.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dropdown for selecting Lecture Type */}
              <div className="mb-4">
                <label className="block text-slate-300">Select Lecture Type:</label>
                <select
                  className="mt-2 block w-full py-2 px-3 border border-gray-300 bg-gray-600 rounded-md"
                  value={selectedLectureType}
                  onChange={(e) => setSelectedLectureType(e.target.value)}
                >
                  <option value="">Select Lecture Type</option>
                  {lectureTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
        </div>

        {/* Start Taking Attendance Button */}
        <div className="flex justify-center mt-6 mb-8">
          <button
            type="button"
            onClick={handleStartAttendance}
            className="bg-slate-900 text-white font-bold py-3 px-16 rounded-lg hover:bg-slate-500 focus:outline-none"
          >
            Start Taking Attendance
          </button>
        </div>
      </div>
    </div>
  );
}

export default AutomaticAttendance;
