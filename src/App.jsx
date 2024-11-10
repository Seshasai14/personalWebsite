import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import Skills from './components/Skills';
import Footer from './components/Footer';
import ChatApp from './components/chatapp/ChatApp';
import WeatherApp from './components/weather/weatherApp';
import PomodoroClock from './components/pomodoro/pomodoroClock';
import MarkdownApp from './components/markdown/markdownApp';
import Experience from './components/Experience';
import Home from "./components/skill-matcher/pages/Home";
import DeveloperForm from "./components/skill-matcher/forms/DeveloperForm";
import FinderPage from "./components/skill-matcher/forms/FinderPage";
import { ThemeProvider } from './components/ThemeContext'; 
const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Hero />
                <ProjectsSection />
                <Skills />
                <Experience />
                <Footer />
              </>
            } 
          />
          <Route path="/chatApp" element={<ChatApp />} />
          <Route path="/weatherApp" element={<WeatherApp />} /> 
          <Route path="/pomodoroClock" element={<PomodoroClock/>}/>
          <Route path="/markdownPreviewer" element={<MarkdownApp/>}/>
          <Route  path="/skillMatcher" element={<Home />} />
          <Route path="/developerForm" element={<DeveloperForm/>} />
          <Route path="/finderPage" element={<FinderPage/>} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;
