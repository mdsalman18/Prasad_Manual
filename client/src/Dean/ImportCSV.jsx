import React, { useState } from "react";
import { Upload, AlertCircle, CheckCircle2 } from "lucide-react";
import axiosInstance from "../axiosInstance";

const ImportCSV = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateHeaders = (headers) => {
    const requiredHeaders = [
      "roll_no",
      "name",
      "fathers_name",
      "student_mobile",
      "father_mobile",
      "email"
    ];
    return requiredHeaders.every(header => 
      headers.includes(header)
    );
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setError("");
    setSuccess(false);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (selectedFile.type !== "text/csv") {
      setError("Please upload a CSV file only");
      setFile(null);
      return;
    }

    // Read and validate CSV headers
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const firstLine = text.split('\n')[0];
      const headers = firstLine.split(',').map(header => header.trim());
      
      if (!validateHeaders(headers)) {
        setError("CSV must contain headers: NAME, PHONE NUMBER, BATCH NUMBER");
        setFile(null);
        return;
      }

      setFile(selectedFile);
    };
    reader.readAsText(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData();
    formData.append("file", file);

    try {
      
      const res = await axiosInstance.post('/upload-file/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log(res.data);
        setSuccess(true);
        setFile(null);
      })
      .catch(e => {
        console.log(e);
      })

      

    } catch (err) {
      setError(err.message || "Failed to upload file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex min-h-screen justify-end">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="mb-3 text-5xl font-bold leading-none text-gray-400 tracking-tight text-center md:text-6xl lg:text-7xl dark:text-white underline">
          Importing CSV file
        </h1>
        
        <h2 className="text-2xl lg:text-3xl pt-6 uppercase text-center">
          Instructions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 mx-auto gap-6 text-center mt-8">
          <div className="text-lg md:text-xl text-gray-800 font-bold tracking-widest outline rounded outline-1 outline-yellow-800 flex justify-center items-center bg-yellow-100 hover:shadow-xl hover:bg-yellow-900/80 backdrop-blur-sm hover:text-white hover:scale-95 transition py-8 px-3">
            Upload the CSV file only
          </div>
          <div className="text-lg md:text-xl text-gray-800 font-bold tracking-widest outline rounded outline-1 outline-yellow-800 flex justify-center items-center bg-yellow-100 hover:shadow-xl hover:bg-yellow-900/80 backdrop-blur-sm hover:text-white hover:scale-95 transition py-8 px-3">
            The file must and only contain headers - NAME, PHONE NUMBER, BATCH NUMBER
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 mt-6 text-red-600 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-4 w-4" />
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 p-4 mt-6 text-green-600 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle2 className="h-4 w-4" />
            <p>File uploaded successfully!</p>
          </div>
        )}

        <div className="flex flex-col justify-center items-center gap-4 mt-12">
          <label className="w-24 h-24 outline outline-gray-200 transition-all duration-500 hover:bg-gray-200 flex flex-col justify-center items-center rounded-lg cursor-pointer">
            <Upload 
              className={`h-10 w-10 ${loading ? 'animate-pulse' : ''}`} 
              aria-hidden="true" 
            />
            <input 
              type="file" 
              className="hidden" 
              accept=".csv"
              onChange={handleFileChange}
              disabled={loading}
            />
          </label>
          
          {file && (
            <p className="text-sm text-gray-600">
              Selected: {file.name}
            </p>
          )}
          
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className={`px-6 py-2 rounded-lg font-medium ${
              !file || loading
                ? 'bg-green-400 cursor-not-allowed'
                : 'bg-yellow-600 hover:bg-yellow-700 text-white'
            } transition-colors`}
          >
            {loading ? 'Uploading...' : 'Upload CSV'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportCSV;