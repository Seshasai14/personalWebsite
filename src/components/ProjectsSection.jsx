import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; 
import '../index.css';
import chatApp from '../assets/chatApp.webp';
import markDown from '../assets/markDown.webp';
import pomodoroClock from '../assets/pomodoroClock.webp';
import weatherApp from '../assets/weatherApp.webp';
import skillMatcher from '../assets/skillMatcher.webp';
import TripPlanner from '../assets/TripPlanner.webp';
import { ThemeContext } from './ThemeContext';
const ProjectsSection = () => {
    const projects = [
        { id: 1, name: 'Weather App', img: weatherApp, link: '/weatherApp' },
        { id: 2, name: 'Skill Matcher', img:skillMatcher , link: '/skillMatcher' },
        { id: 3, name: 'Trip Planner', img: TripPlanner, link: '/tripPlanner' },
        { id: 4, name: 'Chat Application', img: chatApp, link: '/chatApp' },
        { id: 5, name: 'Pomodoro Clock', img: pomodoroClock, link: '/pomodoroClock' },
        { id: 6, name: 'Markdown Previewer', img: markDown, link: '/markdownPreviewer' },
        ,
    ];
    const { theme } = useContext(ThemeContext);
    return (
        <div className={`min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
            <h1 className={`text-5xl text-center font-bold mb-56 ${theme === 'light' ? 'text-black' : 'text-white'}`}>PROJECTS</h1>
            <div className='lg:flex flex-row items-center justify-evenly font-Poppins'>
                {projects.map(proj => (
                    <Link
                        key={proj.id}
                        to={proj.link}
                        className={`flex flex-col items-center m-2 rounded-2xl p-2 transition ease-out hover:scale-125 ${theme === 'light' ? 'bg-darkBg' : 'bg-lightBg'} `}
                    >
                        <img src={proj.img} alt={`${proj.name} logo`} className='w-40 h-40' />
                        <p className='font-medium text-1xl'>{proj.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProjectsSection;
