import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const CertificationGrid = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    return <div>Error: ThemeContext is not provided</div>;
  }

  const { theme } = context;

  const certifications = [
    {
      title: "Free Code Camp Frontend Libraries",
      description: "Certification in Frontend Development Libraries including React, Bootstrap, and more.",
      link: "https://drive.google.com/file/d/1Fl1zyC1fl3Pec6PuMhBaa5q1o75H03He/view?usp=sharing"
    },
    {
      title: "Python Foundation",
      description: "Comprehensive certification in Python programming fundamentals and best practices.",
      link: "https://drive.google.com/file/d/1QutzRSGO4jfreWDzaoRF6Q96wlD0isBg/view?usp=sharing"
    },
    {
      title: "AWS Academy Cloud Foundations",
      description: "Certification in AWS cloud computing basics and services.",
      link: "https://drive.google.com/file/d/1jf1u4o6m52uN13Jhax2RUYBB_M37y2dX/view?usp=sharing"
    },
    {
      title: "Alteryx Designer",
      description: "Certification in data analytics and workflow automation using Alteryx Designer.",
      link: "https://drive.google.com/file/d/1QutzRSGO4jfreWDzaoRF6Q96wlD0isBg/view?usp=sharing"
    }
  ];

  return (
    <div className={`container mx-auto px-4 py-8 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
      
      <h2 className="text-3xl font-bold text-center mb-6">Certifications</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {certifications.map((cert, index) => (
          <div 
            key={index} 
            className={`border rounded-lg shadow p-6 hover:shadow-lg transition-shadow ${
              theme === 'light' 
                ? 'bg-white border-gray-200 text-gray-900 hover:bg-gray-100' 
                : 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700'
            }`}
          >
            <div>
              <h5 className="mb-3 text-xl font-bold tracking-tight">
                {cert.title}
              </h5>
              <p className="mb-4 font-normal">
                {cert.description}
              </p>
              <a 
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg focus:ring-4 focus:outline-none ${
                  theme === 'light' 
                    ? 'bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-300' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-800'
                }`}
              >
                View Certificate
                <svg 
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2" 
                  aria-hidden="true" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 14 10"
                >
                  <path 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationGrid;
