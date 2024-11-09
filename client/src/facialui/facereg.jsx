import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Facereg = () => {
  const [image, setImage] = useState(null);
  const [attendanceFinished, setAttendanceFinished] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', enrollment: '' });
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };
    startCamera();
  }, []);

  const handleCapture = async () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const imageData = canvasRef.current.toDataURL('image/png');
    setImage(imageData);

    try {
      const response = await fetch('/api/facerecognition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData }),
      });
      const data = await response.json();
      setUserInfo(data); // Data should include name and enrollment fields
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleRetake = () => {
    setImage(null);
    setUserInfo({ name: '', enrollment: '' });
    window.location.reload();
  };

  const handleSubmit = () => {
    window.location.reload();
  };

  const handleFinishAttendance = () => {
    setAttendanceFinished(true);
    alert('Attendance Finished!');
    navigate('/sheet');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans bg-gradient-to-r from-black to-gray-600 text-white">
      {/* User Info Form Box */}
      <div className="flex flex-col items-center justify-center p-6 border border-gray-600 rounded-lg bg-gray-800 shadow-lg m-4 max-w-xs w-full md:w-1/3">
        <h2 className="text-2xl mb-6 font-semibold text-center text-blue-400">Student Information</h2>
        <form className="flex flex-col gap-4 w-full mb-35">
          <label className="text-lg font-medium">Name</label>
          <input
            type="text"
            value={userInfo.name}
            readOnly
            className="px-3 py-2 bg-gray-700 border border-gray-500 rounded-md focus:outline-none"
          />
          <label className="text-lg font-medium">Enrollment Number</label>
          <input
            type="text"
            value={userInfo.enrollment}
            readOnly
            className="px-3 py-2 bg-gray-700 border border-gray-500 rounded-md focus:outline-none"
          />
        </form>
      </div>

      {/* Main Capture Section */}
      <div className="flex flex-col items-center justify-center p-8 w-full md:w-2/3 relative mb-20">
        
        {!image ? (
          
          <div className="flex flex-col items-center p-6 border border-gray-600 rounded-lg bg-gray-700 shadow-lg max-w-md w-full">
            <h1 className="text-3xl text-center mb-8 font-bold text-blue-300">CAPTURE YOUR FACE</h1>
            <video ref={videoRef} autoPlay playsInline className="w-full max-w-md rounded-lg"></video>
            <button 
              onClick={handleCapture} 
              className="mt-6 px-6 py-2 text-lg bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Capture Photo
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center p-6 border border-gray-600 rounded-lg bg-gray-700 shadow-lg max-w-md w-full mb-8">
            <h2 className="text-2xl mb-6 text-blue-400 font-bold">Preview</h2>
            <img src={image} alt="Captured" className="w-full max-w-md rounded-lg mb-6" />
            <div className="flex gap-4">
              <button 
                onClick={handleRetake} 
                className="px-6 py-2 text-lg bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Retake
              </button>
              <button 
                onClick={handleSubmit} 
                className="px-6 py-2 text-lg bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Finish Attendance Button - Always Visible */}
        <button 
          onClick={handleFinishAttendance} 
          className="fixed bottom-8 right-8 px-6 py-3 text-lg bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Finish Attendance
        </button>

        <canvas ref={canvasRef} width="300" height="300" className="hidden"></canvas>
      </div>
    </div>
  );
};

export default Facereg;
