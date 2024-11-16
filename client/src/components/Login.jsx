import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for different user credentials and navigate accordingly
    if (email === 'staff@gmail.com' && password === 'staff123') {
      navigate('/attendence');
    } else if (email === 'dean@gmail.com' && password === 'dean123') {
      navigate('/service/monthly');
    } 
      else if (email === 'admin@gmail.com' && password === 'admin123') {
        navigate('/adminportal');
      }
    else {
      toast.error('Error while logging in')
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Login to Your Account</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full p-2.5 border border-gray-300 text-black rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full p-2.5 border text-black border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </form>
        {/* <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400">
          Don’t have an account?{' '}
          <a href="/signup" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
            Sign up
          </a>
        </p> */}
      </div>
    </div>
  );
}

export default Login;
