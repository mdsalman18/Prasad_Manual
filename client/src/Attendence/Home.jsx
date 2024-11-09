import React from "react";

const handleScrollToAbout = () => {
  const aboutSection = document.getElementById("about");
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: "smooth" });
  }
};
const handleScrollToHome = () => {
  const aboutSection = document.getElementById("Home");
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: "smooth" });
  }
};
function HomeAbout() {
  return (
    <div>
      {/* Home Section */}
      <div
      id="Home"
        className="relative flex flex-col items-center justify-center h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/college.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Home Content */}
        <div className="relative z-10 p-6 text-center text-white">
          <h1 className="mb-4 text-5xl font-extrabold leading-none tracking-tight md:text-6xl lg:text-7xl">
            Prasad Institute Of Medical Science
          </h1>
          <p className="mb-6 text-lg font-normal text-gray-300 lg:px-36 sm:px-16">
            Empowering students to achieve their dreams through education, innovation, and community engagement.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/admission"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-purple-800 focus:ring-4 focus:ring-purple-500 dark:focus:ring-purple-900"
            >
              Enroll Now
            </a>
            {/* <a
              href="https://pimslko.edu.in"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-200 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 focus:ring-4 focus:ring-gray-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              Learn More
            </a> */}
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="max-w-sm p-6 bg-gray-800 bg-opacity-80 border border-gray-700 rounded-lg shadow hover:bg-opacity-90">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
                Centre of Excellence
              </h5>
              <p className="font-normal text-gray-400">
                PIMS Hospital has dedicated Center of Excellence for several key specialties and super specialties.
              </p>
            </div>
            <div className="max-w-sm p-6 bg-gray-800 bg-opacity-80 border border-gray-700 rounded-lg shadow hover:bg-opacity-90">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
                Quality Services
              </h5>
              <p className="font-normal text-gray-400">
                The quality of patient care is possible in PIMS Hospital because of an engaged workforce that takes pride.
              </p>
            </div>
            <div className="max-w-sm p-6 bg-gray-800 bg-opacity-80 border border-gray-700 rounded-lg shadow hover:bg-opacity-90">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
                Health Care
              </h5>
              <p className="font-normal text-gray-400">
                Presently it is a premier institution of Doctoral medical education and training.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="bg-gray-900 text-gray-300 px-6 py-12 md:px-12 lg:px-20">
  <div className="container mx-auto space-y-12">
    
    {/* Header Section */}
    <header className="text-center space-y-4 mb-8">
      <h1 className="text-4xl font-extrabold text-blue-300">About Prasad Institute of Medical Sciences (PIMS)</h1>
      <p className="text-lg font-light text-gray-400">Healthcare with a Heart</p>
    </header>

    {/* Section Layout */}
    <div className="space-y-10">
      {/* Introduction Section */}
      <section className="bg-gray-800 p-8 md:p-12 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-semibold text-blue-400 flex items-center">
          <i className="fas fa-hospital mr-3 text-blue-300"></i> Introduction
        </h2>
        <p className="mt-4 leading-relaxed">
          Prasad Institute of Medical Sciences is a budding institute in the field of medical education and research.
          It was established with the objective of providing medical services to society with care, personal touch, and perfection.
        </p>
        <p className="mt-2 leading-relaxed">
          Our founder, Er. B.P. Yadav, envisioned creating a hospital in Lucknow, U.P., India, where the poor and rural
          masses could have access to advanced medical care in an atmosphere of love and compassion.
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-800 p-8 md:p-12 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-semibold text-blue-400 flex items-center">
          <i className="fas fa-bullseye mr-3 text-blue-300"></i> Our Mission
        </h2>
        <p className="mt-4 leading-relaxed">
          Our mission is – <span className="italic">To Reach the Unreached</span> – by providing outstanding and affordable
          medical care in a patient-friendly environment and in a spirit of compassion, regardless of race, caste, or religion.
        </p>
        <p className="mt-2 leading-relaxed">
          PIMS is dedicated to establishing a center of excellence in health care and improving the well-being of the community
          through quality programs in preventive medicine, medical education, and research.
        </p>
      </section>

      {/* Infrastructure Section */}
      <section className="bg-gray-800 p-8 md:p-12 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-semibold text-blue-400 flex items-center">
          <i className="fas fa-building mr-3 text-blue-300"></i> Infrastructure
        </h2>
        <p className="mt-4 leading-relaxed">
          PIMS brings together a dedicated team of physicians, nurses, and other healthcare professionals to provide the highest
          standards of medical treatment. Our extensive infrastructure includes modern operating theatres and 410 beds, with
          comprehensively equipped intensive care units.
        </p>
      </section>

      {/* Objectives Section */}
      <section className="bg-gray-800 p-8 md:p-12 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-semibold text-blue-400 flex items-center">
          <i className="fas fa-check-circle mr-3 text-blue-300"></i> Our Objectives
        </h2>
        <ul className="mt-4 space-y-2 list-inside list-disc">
          <li>Total dedication to understanding and fulfilling patient needs</li>
          <li>Total devotion to providing efficient and reliable patient care services</li>
          <li>Efficient, prompt, and courteous service with a commitment to integrity and fairness</li>
          <li>Encouraging patients to help themselves and the Institute to serve them better</li>
          <li>Providing a challenging and rewarding career for every employee</li>
          <li>Ensuring transparency in our functioning</li>
          <li>Periodic and regular monitoring of our services</li>
        </ul>
      </section>
    </div>
  </div>
</div>
{/* Transition Section */}
<div className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 py-16 px-6 md:px-12 lg:px-20">
  <div className="container mx-auto text-center space-y-6">
    <h2 className="text-3xl font-extrabold text-blue-300">
      Join Us in Our Mission to Serve
    </h2>
    <p className="text-lg font-light text-gray-400">
      Become part of a community that believes in compassionate care, academic excellence, and making a positive impact on society. Explore our facilities, courses, and services today.
    </p>
    <a
      href="https://pimslko.edu.in"
      className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-purple-800 focus:ring-4 focus:ring-purple-500 dark:focus:ring-purple-900"
    >
      Contact Us
    </a>
  </div>
</div>


      {/* footer section */}
      <footer id="footer" className="bg-gray-900 text-gray-400 py-12 mt-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-6 lg:px-12">
        
        {/* About PIMS Section */}
        <div>
        <h2 className="text-xl font-bold text-white mb-6">ABOUT PIMS</h2>
          <p className="text-sm leading-relaxed">
            Prasad Institute of Medical Sciences is a budding institute in the field of medical education and research. It aims to provide medical services to society with care, personal touch, and perfection.
          </p>
        </div>

        {/* Useful Links Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-100 mb-6">USEFUL LINKS</h2>
          <ul className="space-y-3 text-sm">
          <li>
              <button
                onClick={handleScrollToHome}
                className="hover:text-blue-600 text-white dark:hover:text-blue-500"
              >
                Home
              </button>
            </li>          
            <li>
              <button
                onClick={handleScrollToAbout}
                className="hover:text-blue-600 text-white dark:hover:text-blue-500"
              >
                About PIMS
              </button>
            </li>                 <li><a href="#" className="hover:underline hover:text-blue-400 transition duration-300">Facilities</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-400 transition duration-300">Our Experts</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-400 transition duration-300">Courses</a></li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-100 mb-6">QUICK LINKS</h2>
          <ul className="space-y-3 text-sm">
            {/* <li><a href="#" className="hover:underline hover:text-blue-400 transition duration-300">Admission</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-400 transition duration-300">Citizen Charter</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-400 transition duration-300">Anti Ragging Committee</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-400 transition duration-300">Posh Internal Policy</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-400 transition duration-300">Unit / Dep. Wise beds Distribution</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-400 transition duration-300">Hostel Rules & Regulations</a></li> */}
            <li><a href="https://pimslko.edu.in" className="hover:underline hover:text-blue-400 transition duration-300">Contacts</a></li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-100 mb-6">CONTACT US</h2>
          <p className="text-sm leading-relaxed">Sarai Shahzadi, Banthara, Kanpur Road, Lucknow (U.P) - 226401</p>
          <p className="mt-4 text-sm"><a href="tel:+919721523088" className="hover:text-blue-400 transition duration-300">+91 9721523088</a></p>
          <p className="mt-2 text-sm"><a href="tel:+919721453166" className="hover:text-blue-400 transition duration-300">+91 9721453166</a></p>
          <p className="mt-2 text-sm"><a href="mailto:prasadhospitallko@gmail.com" className="hover:text-blue-400 transition duration-300">prasadhospitallko@gmail.com</a></p>
          
          <div className="flex space-x-4 mt-6">
            <a href="#" className="hover:text-blue-400 transition duration-300"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-blue-400 transition duration-300"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-blue-400 transition duration-300"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" className="hover:text-blue-400 transition duration-300"><i className="fab fa-instagram"></i></a>
          </div>
          
          {/* <p className="text-xs text-gray-500 mt-6">Last Update: 29/07/2024</p> */}
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-xs text-gray-500">
        <p>© 2024 All Rights Reserved by PIMS | Designed and Developed by Mangos Orange</p>
      </div>
    </footer>
    </div>
  );
}

export default HomeAbout;
