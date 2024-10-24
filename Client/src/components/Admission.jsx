import React from 'react'

function Admission() {
  return (
    <div class="flex items-center justify-center h-full">
    <form class="w-full max-w-lg p-8 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 text-black dark:border-gray-700">
        <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Student Admission Form</h2>
        
        <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="name">Full Name</label>
            <input type="text" id="name" class="block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="John Doe" required=""/>
        </div>

        <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="email">Email Address</label>
            <input type="email" id="email" class="block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="example@example.com" required=""/>
        </div>

        <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="phone">Phone Number</label>
            <input type="number" id="phone" class="block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="+1 (555) 123-4567" required=""/>
        </div>

        <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="course">Course of Study</label>
            <select id="course" class="block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required="">
                <option value="" disabled="" selected="">Select a course</option>
                <option value="pharmacy">Pharmacy</option>
                <option value="pharmaceutical_science">Pharmaceutical Science</option>
                <option value="clinical_pharmacy">Clinical Pharmacy</option>
            </select>
        </div>

        <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="dob">Date of Birth</label>
            <input type="date" id="dob" class="block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required=""/>
        </div>

        <div class="mb-6">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="address">Address</label>
            <textarea id="address" rows="4" class="block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="123 Main St, City, Country" required=""></textarea>
        </div>

        <button type="submit" class="w-full px-5 py-3 text-base font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"><a href="/page">  Submit</a></button>
    </form>
</div>
  )
}

export default Admission