import React from 'react'

function Signup() {
  return (
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <div class="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center text-gray-900">Sign Up</h2>
        <form class="space-y-4">
          <div>
            <label
              class="block mb-1 text-sm font-medium text-gray-700"
              for="name"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              class="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Doe"
              required=""
            />
          </div>
          <div>
            <label
              class="block mb-1 text-sm font-medium text-gray-700"
              for="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              class="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="example@example.com"
              required=""
            />
          </div>
          <div>
            <label
              class="block mb-1 text-sm font-medium text-gray-700"
              for="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              class="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="********"
              required=""
            />
          </div>
          <div>
            <label
              class="block mb-1 text-sm font-medium text-gray-700"
              for="confirm-password"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              class="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="********"
              required=""
            />
          </div>
          <button
            type="submit"
            class="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          >
            Create Account
          </button>
        </form>
        <p class="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" class="text-blue-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup