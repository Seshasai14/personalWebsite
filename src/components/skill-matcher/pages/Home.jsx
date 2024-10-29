import React from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate(); 
    const navigateToFinders = () => {
        navigate('/finderPage'); 
    };
    const navigateToDevelopers = () => {
        navigate('/developerForm'); 
    };
    return (
        <div className="flex min-h-screen bg-gray-300">
            <div className="flex flex-col items-center justify-center w-full p-8">
                <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">
                    Welcome To Skill Matcher Application
                </h1>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={navigateToDevelopers}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                        Developers
                    </button>
                    <button
                        onClick={navigateToFinders}
                        className="bg-green-500 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                        Finders
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
