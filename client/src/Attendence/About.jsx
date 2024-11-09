import React from 'react';

function About() {
  return (
    <div className="bg-gray-900 text-gray-300 p-6 md:p-10 lg:p-20">
      <div className="container mx-auto space-y-10">
        {/* Header Section */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-blue-400">About Prasad Institute of Medical Sciences (PIMS)</h1>
          <p className="text-lg font-light text-gray-400">Healthcare with a Heart</p>
        </header>

        {/* Introduction Section */}
        <section className="bg-gray-800 p-6 md:p-10 rounded-lg shadow-lg space-y-4">
          <h2 className="text-2xl font-semibold text-blue-400">Introduction</h2>
          <p className="leading-relaxed">
            Prasad Institute of Medical Sciences is a budding institute in the field of medical education and research. It was established with the objective of providing medical services to society with care, personal touch, and perfection.
          </p>
          <p className="leading-relaxed">
            Our founder, Er. B.P. Yadav, envisioned creating a hospital in Lucknow, U.P., India, where the poor and rural masses could have access to advanced medical care in an atmosphere of love and compassion.
          </p>
        </section>

        {/* Mission Section */}
        <section className="bg-gray-800 p-6 md:p-10 rounded-lg shadow-lg space-y-4">
          <h2 className="text-2xl font-semibold text-blue-400">Our Mission</h2>
          <p className="leading-relaxed">
            Our mission is – <span className="italic">To Reach the Unreached</span> – by providing outstanding and affordable medical care in a patient-friendly environment and in a spirit of compassion, regardless of race, caste, or religion.
          </p>
          <p className="leading-relaxed">
            PIMS is dedicated to establishing a center of excellence in health care and improving the well-being of the community through quality programs in preventive medicine, medical education, and research.
          </p>
        </section>

        {/* Infrastructure Section */}
        <section className="bg-gray-800 p-6 md:p-10 rounded-lg shadow-lg space-y-4">
          <h2 className="text-2xl font-semibold text-blue-400">Infrastructure</h2>
          <p className="leading-relaxed">
            PIMS brings together a dedicated team of physicians, nurses, and other healthcare professionals to provide the highest standards of medical treatment. Our extensive infrastructure includes modern operating theatres and 410 beds, with comprehensively equipped intensive care units.
          </p>
        </section>

        {/* Objectives Section */}
        <section className="bg-gray-800 p-6 md:p-10 rounded-lg shadow-lg space-y-4">
          <h2 className="text-2xl font-semibold text-blue-400">Our Objectives</h2>
          <ul className="list-disc list-inside space-y-2">
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
  );
}

export default About;
