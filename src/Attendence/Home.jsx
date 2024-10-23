import React from "react";
import { Outlet, Link } from "react-router-dom";

function Home() {
  return (
    <div class="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <h1 class="mb-4 text-5xl font-extrabold leading-none tracking-tight text-gray-900 md:text-6xl lg:text-7xl dark:text-white">
        Welcome to Our College
      </h1>
      <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        Empowering students to achieve their dreams through education,
        innovation, and community engagement.
      </p>
      <div class="flex space-x-4">
        <a
          href="/admission"
          class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          Enroll
        </a>
        <a
          href="#"
          class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          Learn More
        </a>
      </div>
      <div class="mt-10">
        <h2 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
          Upcoming Events
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Open House
            </h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">
              Join us for our Open House event on March 15th to explore our
              campus and meet faculty.
            </p>
          </div>
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Career Fair
            </h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">
              Don't miss our Career Fair on April 20th, where you can connect
              with potential employers.
            </p>
          </div>
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Graduation Ceremony
            </h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">
              Celebrate our graduates on May 25th at the annual Graduation
              Ceremony.
            </p>
          </div>
        </div>
      </div>
      <Outlet/>
    </div>
  );
}

export default Home;
