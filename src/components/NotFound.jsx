import React from 'react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="text-9xl font-extrabold text-white animate-bounce">
          404
        </div>
        <h2 className="mt-6 text-3xl font-bold text-white">
          Page Not Found
        </h2>
        <p className="mt-2 text-lg text-purple-100">
          Oops! The page you're looking for doesn't exist.
        </p>
        <div className="mt-8">
          <a
            href="/"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition duration-300"
          >
            Go back home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
