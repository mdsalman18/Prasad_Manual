import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PresenceSheet() {
    const location = useLocation();
    const [attendanceFinished, setAttendanceFinished] = useState(false);
    const navigate = useNavigate();

    const attendanceData = location.state?.attendanceData || []; // Access passed attendance data or use an empty array if none is provided

    // Dummy data for testing
    const dummyData = [
        { enrolmentNo: 'EN001', name: 'John Doe', subject: 'Anatomy', date: '2024-10-28', status: 'Present' },
        { enrolmentNo: 'EN002', name: 'Jane Smith', subject: 'Anatomy', date: '2024-10-28', status: 'Absent' },
        { enrolmentNo: 'EN003', name: 'Alice Johnson', subject: 'Anatomy', date: '2024-10-28', status: 'Present' },
        { enrolmentNo: 'EN004', name: 'Bob Brown', subject: 'Anatomy', date: '2024-10-28', status: 'Absent' },
    ];

    const handleSubmitAttendance = () => {
        setAttendanceFinished(true);
        alert('Attendance is Marked');
        navigate('/fatten');
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-black to-gray-600 text-white">
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-5xl mb-40">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Presence Sheet</h1>
                <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden shadow-md">
                    <thead>
                        <tr className="text-blue-300">
                            <th className="px-6 py-4 border-b-2 border-gray-600 text-left">Enrolment No</th>
                            <th className="px-6 py-4 border-b-2 border-gray-600 text-left">Name</th>
                            <th className="px-6 py-4 border-b-2 border-gray-600 text-left">Subject</th>
                            <th className="px-6 py-4 border-b-2 border-gray-600 text-left">Date</th>
                            <th className="px-6 py-4 border-b-2 border-gray-600 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(attendanceData.length > 0 ? attendanceData : dummyData).map((entry, index) => (
                            <tr key={index} className="hover:bg-gray-600 transition">
                                <td className="px-6 py-4 border-b border-gray-600">{entry.enrolmentNo}</td>
                                <td className="px-6 py-4 border-b border-gray-600">{entry.name}</td>
                                <td className="px-6 py-4 border-b border-gray-600">{entry.subject}</td>
                                <td className="px-6 py-4 border-b border-gray-600">{entry.date}</td>
                                <td className={`px-6 py-4 border-b border-gray-600 font-semibold ${entry.status === 'Present' ? 'text-green-400' : 'text-red-400'}`}>
                                    {entry.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button 
                    onClick={handleSubmitAttendance} 
                    className="fixed bottom-8 right-8 px-6 py-3 text-lg bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default PresenceSheet;
