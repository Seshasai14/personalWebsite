// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import Skills from './components/Skills';
import Footer from './components/Footer';
import ChatApp from './components/chatapp/ChatApp';
import { ThemeProvider } from './components/ThemeContext'; // Ensure this path is correct

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <ProjectsSection />
              <Skills />
              <Footer />
            </>
          } />
          <Route path="/chatApp" element={<ChatApp />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;
