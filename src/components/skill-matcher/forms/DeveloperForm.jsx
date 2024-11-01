import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeveloperForm = () => {
    const [developer, setDeveloper] = useState({
        name: '',
        branch: '',
        domain_mail_id: '',
        domain_expertise: '',
        projects: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDeveloper({
            ...developer,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Split projects by comma and trim spaces to create an array
            const projectArray = developer.projects.split(',').map(proj => proj.trim());

            const response = await fetch('https://render-backend-clnp.onrender.com/api/developers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...developer, projects: projectArray }),
            });

            if (response.ok) {
                const result = await response.json();
                toast.success('Developer registered successfully!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setDeveloper({
                    name: '',
                    branch: '',
                    domain_mail_id: '',
                    domain_expertise: '',
                    projects: ''
                });
            } else if (response.status === 400) {
                toast.error('Invalid data provided. Please check the inputs.', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else if (response.status === 500) {
                toast.error('Server error. Please try again later.', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                toast.warn('Unexpected error occurred. Please try again.', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            toast.error('Network error. Please check your connection.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Developer Registration</h1>
            <form className="flex flex-col w-full max-w-md" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={developer.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    className="mb-4 p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="branch"
                    value={developer.branch}
                    onChange={handleChange}
                    placeholder="Branch"
                    required
                    className="mb-4 p-2 border border-gray-300 rounded"
                />
                <input
                    type="email"
                    name="domain_mail_id"
                    value={developer.domain_mail_id}
                    onChange={handleChange}
                    placeholder="Domain Email ID"
                    required
                    className="mb-4 p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="domain_expertise"
                    value={developer.domain_expertise}
                    onChange={handleChange}
                    placeholder="Domain Expertise"
                    required
                    className="mb-4 p-2 border border-gray-300 rounded"
                />
                <textarea
                    name="projects"
                    value={developer.projects}
                    onChange={handleChange}
                    placeholder="Projects (comma-separated)"
                    className="mb-4 p-2 border border-gray-300 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default DeveloperForm;
