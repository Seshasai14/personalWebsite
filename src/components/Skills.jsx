import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
const skills = [
    { name: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'Bootstrap', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg' },
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name:'GitHub',logo:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg'},
    { name:'Netlify',logo:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/netlify/netlify-original.svg'}
];

const Skills = () => {
    const {theme}=useContext(ThemeContext);
    return (
        <div className={`min-h-screen flex flex-col items-center justify-center ${theme === 'light' ? 'bg-white' : 'bg-gray-900'} p-4`}>
            <h1 className={`text-5xl font-bold mb-8 ${theme==='light'?'text-black':'text-white'}`}>My Skills</h1>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {skills.map((skill) => (
                    <div
                        key={skill.name}
                        className= {`${theme==='light'?'bg-gray-100':'darkbg'} p-4 bg-white rounded-lg shadow-lg text-center`}
                    >
                        <img src={skill.logo} alt={`${skill.name} logo`} className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-lg font-medium">{skill.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;