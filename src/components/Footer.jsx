import React, { useState, useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const Footer = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    return <div>Error: ThemeContext is not provided</div>;
  }

  const { theme } = context;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const recipientEmail = 'nudurupatiseshasai14@gmail.com';  
    const subject = `Contact from ${formData.name}`;
    const mailtoBody = `
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
    `;
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailtoBody)}`;

    window.location.href = mailtoUrl;
  };

  return (
    <footer className={`py-16 px-4 ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Contact Me</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-lg">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="message" className="text-lg">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              required
              rows="4"
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
      <br/>
      <br/>
      <p className="text-center mb-0 pb-0">Made With ❤️ By Sesha</p>
    </footer>
  );
};

export default Footer;
