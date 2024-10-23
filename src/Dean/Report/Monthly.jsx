import React, { useState } from 'react';

const Monthly = () => {
    const [startMonth, setStartMonth] = useState('Jan-24');
    const [endMonth, setEndMonth] = useState('Jan-24');
    const [frequency, setFrequency] = useState('Monthly');
    const [selectedQuarter, setSelectedQuarter] = useState('');
    const [selectedHalf, setSelectedHalf] = useState('');

    const classesPerMonth = 30;

    const students = [
        { rollNo: 1, name: 'John Doe', fathersName: 'Mr. Doe', attendance: [22, 18, 20, 25, 20, 22, 23, 21, 22, 19, 20, 23] },
        { rollNo: 2, name: 'Jane Smith', fathersName: 'Mr. Smith', attendance: [25, 20, 21, 23, 19, 21, 22, 18, 20, 24, 22, 19] },
        { rollNo: 3, name: 'Michael Brown', fathersName: 'Mr. Brown', attendance: [20, 10, 30, 16, 23, 20, 22, 11, 25, 25, 20, 10] },
        { rollNo: 4, name: 'Emily Davis', fathersName: 'Mr. Davis', attendance: [25, 22, 11, 25, 19, 21, 22, 22, 23, 21, 22, 19] }
    ];

    const monthLabels = [
        'Jan-24', 'Feb-24', 'Mar-24', 'Apr-24', 'May-24', 'June-24', 'July-24',
        'Aug-24', 'Sept-24', 'Oct-24', 'Nov-24', 'Dec-24'
    ];

    const getMonthIndex = (month) => {
        return monthLabels.findIndex(label => label === month);
    };

    const handleStartMonthChange = (e) => {
        setStartMonth(e.target.value);
        if (getMonthIndex(e.target.value) > getMonthIndex(endMonth)) {
            setEndMonth(e.target.value);
        }
    };

    const handleEndMonthChange = (e) => {
        setEndMonth(e.target.value);
    };

    const handleFrequencyChange = (e) => {
        setFrequency(e.target.value);
        setSelectedQuarter(''); // Reset selected quarter when frequency changes
        setSelectedHalf(''); // Reset selected half when frequency changes
        setEndMonth(startMonth); // Reset end month to start month if frequency changes
    };

    const handleQuarterChange = (e) => {
        setSelectedQuarter(e.target.value);
        setEndMonth(startMonth); // Reset end month to start month if quarter changes
    };

    const handleHalfChange = (e) => {
        setSelectedHalf(e.target.value);
        setEndMonth(startMonth); // Reset end month to start month if half changes
    };

    const getTotalMonths = () => {
        const startIndex = getMonthIndex(startMonth);
        const endIndex = getMonthIndex(endMonth);
        return (startIndex >= 0 && endIndex >= 0 && startIndex <= endIndex) ? (endIndex - startIndex + 1) : 0;
    };

    
    const visibleMonths = () => {
        const startIndex = getMonthIndex(startMonth);
        const endIndex = getMonthIndex(endMonth);
        let monthsToDisplay = [];
    
        if (frequency === 'Monthly') {
            monthsToDisplay = monthLabels.slice(startIndex, endIndex + 1);
        } else if (frequency === 'Quarterly' && selectedQuarter) {
            const quarterStartMonths = {
                '1': [0, 1, 2], // Jan, Feb, Mar
                '2': [3, 4, 5], // Apr, May, Jun
                '3': [6, 7, 8], // Jul, Aug, Sept
                '4': [9, 10, 11] // Oct, Nov, Dec
            };
            quarterStartMonths[selectedQuarter].forEach((monthIndex) => {
                if (monthIndex >= startIndex) {
                    monthsToDisplay.push(monthLabels[monthIndex]);
                }
            });
        } else if (frequency === 'Half-Yearly' && selectedHalf) {
            const halfStartMonths = {
                '1': [0, 1, 2, 3, 4, 5], // First Half: Jan to Jun
                '2': [6, 7, 8, 9, 10, 11] // Second Half: Jul to Dec
            };
            halfStartMonths[selectedHalf].forEach((monthIndex) => {
                if (monthIndex >= startIndex) {
                    monthsToDisplay.push(monthLabels[monthIndex]);
                }
            });
        } else if (frequency === 'Yearly') {
            monthsToDisplay = monthLabels.slice(0, 12); // Display all 12 months
        }
    
        return monthsToDisplay;
    };
    
    
    const calculatePresence = (attendance) => {
        console.log(attendance);
        if (frequency === 'Quarterly' && selectedQuarter === 'Quarter 1') {
            const startIndex = getMonthIndex(0);
            const endIndex = getMonthIndex(2);
            return attendance.slice(startIndex, endIndex + 1).reduce((acc, curr) => acc + curr, 0);
        } else if(frequency === 'Quarterly' && selectedQuarter === 'Quarter 2'){
            const startIndex = getMonthIndex(3);
            const endIndex = getMonthIndex(5);
            return attendance.slice(startIndex, endIndex + 1).reduce((acc, curr) => acc + curr, 0);
        }else if(frequency === 'Quarterly' && selectedQuarter === 'Quarter 3'){
            const startIndex = getMonthIndex(6);
            const endIndex = getMonthIndex(8);
            return attendance.slice(startIndex, endIndex + 1).reduce((acc, curr) => acc + curr, 0);
        }else if(frequency === 'Quarterly' && selectedQuarter === 'Quarter 4'){
            const startIndex = getMonthIndex(9);
            const endIndex = getMonthIndex(11);
            return attendance.slice(startIndex, endIndex + 1).reduce((acc, curr) => acc + curr, 0);
        } else if (frequency === 'Half-Yearly' && selectedHalf === 'First Half') {
            const startIndex = getMonthIndex(0);
            const endIndex = getMonthIndex(5);
            return attendance.slice(startIndex, endIndex + 1).reduce((acc, curr) => acc + curr, 0);
        }else if (frequency === 'Half-Yearly' && selectedHalf === 'Second Half') {
            const startIndex = getMonthIndex(6);
            const endIndex = getMonthIndex(11);
            return attendance.slice(startIndex, endIndex + 1).reduce((acc, curr) => acc + curr, 0);
        } else if (frequency === 'Yearly') {
            const startIndex = getMonthIndex(0);
            const endIndex = getMonthIndex(11);
            return attendance.slice(startIndex, endIndex + 1).reduce((acc, curr) => acc + curr, 0);
        }
        const startIndex = getMonthIndex(startMonth);
        const endIndex = getMonthIndex(endMonth);
        return attendance.slice(startIndex, endIndex + 1).reduce((acc, curr) => acc + curr, 0);
    };


    // const getVisibleAttendance = (attendance) => {
    //     console.log(attendance)
    //     // Get the index for slicing based on the frequency and selected options
    //     let startIndex = 0;
    //     let endIndex = 0;
    
    //     if (frequency === 'Quarterly') {
    //         if (selectedQuarter === 'Quarter 1') {
    //             startIndex = getMonthIndex(0); // January
    //             endIndex = getMonthIndex(2); // March
    //         } else if (selectedQuarter === 'Quarter 2') {
    //             startIndex = getMonthIndex(3); // April
    //             endIndex = getMonthIndex(5); // June
    //         } else if (selectedQuarter === 'Quarter 3') {
    //             startIndex = getMonthIndex(6); // July
    //             endIndex = getMonthIndex(8); // September
    //         } else if (selectedQuarter === 'Quarter 4') {
    //             startIndex = getMonthIndex(9); // October
    //             endIndex = getMonthIndex(11); // December
    //         }
    //     } else if (frequency === 'Half-Yearly') {
    //         if (selectedHalf === 'First Half') {
    //             startIndex = getMonthIndex(0); // January
    //             endIndex = getMonthIndex(5); // June
    //         } else if (selectedHalf === 'Second Half') {
    //             startIndex = getMonthIndex(6); // July
    //             endIndex = getMonthIndex(11); // December
    //         }
    //     } else if (frequency === 'Yearly') {
    //         startIndex = getMonthIndex(0); // January
    //         endIndex = getMonthIndex(11); // December
    //     } else if (frequency === 'Monthly') {
    //         // Handle the monthly case using startMonth and endMonth selections
    //         startIndex = getMonthIndex(startMonth);
    //         endIndex = getMonthIndex(endMonth);
    //     } else {
    //         // Default to the whole year if no frequency is selected
    //         startIndex = 0;
    //         endIndex = 11;
    //     }
    
    //     // Calculate total presence within the specified range
    //     return attendance.slice(startIndex, endIndex + 1);
    // };


   
    
    const getTotalClassesHeld = () => {
        let totalMonths = getTotalMonths();
        
        if (frequency === 'Quarterly' && selectedQuarter) {
            totalMonths = 3; // Each quarter spans three months
        } else if (frequency === 'Half-Yearly' && selectedHalf) {
            totalMonths = 6; // Each half-year spans six months
        } else if (frequency === 'Yearly') {
            totalMonths = 12; // The whole year spans twelve months
        }
        
        return totalMonths * classesPerMonth;
    };

    const totalClassesHeld = getTotalClassesHeld();

    
    
    return (
        <div className="bg-black mb-6">
            <div className='my-5'>
                <h1 className="font-bold text-center mt-4 my-4 text-xl text-white">Report</h1>

                <div className="flex flex-wrap lg:flex-nowrap justify-evenly">
                    <div className="flex items-center justify-center h-full">
                        <label htmlFor="frequency" className="block mb-2 text-sm font-medium text-white ml-5">
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

                    {frequency === 'Quarterly' && (
                        <div className="flex items-center justify-center h-full">
                            <label htmlFor="quarter" className="block mb-2 text-sm font-medium text-white ml-5">
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

                    {frequency === 'Half-Yearly' && (
                        <div className="flex items-center justify-center h-full">
                            <label htmlFor="half" className="block mb-2 text-sm font-medium text-white ml-5">
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

                    {frequency === 'Monthly' && (
                        <>
                            <div className="flex items-center justify-center h-full">
                                <label htmlFor="start-month" className="block mb-2 text-sm font-medium text-white ml-5">
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
                                        <option key={index} value={month}>{month}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center justify-center h-full">
                                <label htmlFor="end-month" className="block mb-2 text-sm font-medium text-white ml-5">
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
                                        <option key={index} value={month}>{month}</option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}
                </div>

                <div className=" overflow-scroll m-5 ">
                <table className="min-w-full border-collapse border border-gray-400 mt-5 mx-auto overflow-scroll">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="border border-gray-300 text-left p-4 text-white">Roll No</th>
                                <th className="border border-gray-300 text-left p-4 text-white">Name</th>
                                <th className="border border-gray-300 text-left p-4 text-white">Father's Name</th>
                                {visibleMonths().map((month, index) => (
                                    <th key={index} className="border border-gray-300 text-left p-4 text-white">{month}</th>
                                ))}
                                <th className="border border-gray-300 text-left p-4 text-white">Total Classes</th>
                                <th className="border border-gray-300 text-left p-4 text-white">Total Presence</th>
                                <th className="border border-gray-300 text-left p-4 text-white">Proportion %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => {
                                // const visibleAttendance = getVisibleAttendance(student.attendance);
                                // console.log(visibleAttendance);
                                const totalPresence = calculatePresence(student.attendance);
                                // const totalPresence = getTotalPresence();
                                const proportion = totalClassesHeld ? ((totalPresence / totalClassesHeld) * 100).toFixed(2) : 0;

                                return (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}>
                                        <td className="border border-gray-300 p-4 text-white">{student.rollNo}</td>
                                        <td className="border border-gray-300 p-4 text-white">{student.name}</td>
                                        <td className="border border-gray-300 p-4 text-white">{student.fathersName}</td>
                                        {visibleMonths().map((month, monthIndex) => (
                                            <td key={monthIndex} className="border border-gray-300 p-4 text-white">
                                                {student.attendance[getMonthIndex(month)] || 0}
                                            </td>
                                        ))}
                                        <td className="border border-gray-300 p-4 text-white">{totalClassesHeld}</td>
                                        <td className="border border-gray-300 p-4 text-white">{totalPresence}</td>
                                        <td className="border border-gray-300 p-4 text-white">{proportion}%</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className='flex justify-center'>
                    <h2 className="font-bold text-white my-4">
                        Total Classes Held: {totalClassesHeld}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Monthly;