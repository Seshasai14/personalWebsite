import React from 'react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* 404 Number with animation */}
      <div className="absolute -top-20 -left-20 text-[20rem] font-black text-gray-100 select-none animate-float">
        404
      </div>

      <div className="max-w-md w-full space-y-8 text-center z-10">
        <h1 className="text-5xl font-bold text-black">Page Not Found</h1>
        <p className="text-xl text-gray-700">
          Oops! The page you're looking for doesn't exist.
        </p>
        <div className="mt-8">
          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-black text-lg font-medium rounded-md text-black bg-white hover:bg-black hover:text-white transition-colors duration-300"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
