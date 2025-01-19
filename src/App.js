import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GalaxyScene from './components/GalaxyScene';
import AboutScene from './components/AboutScene';
import ProjectsScene from './components/ProjectsScene';
import ContactScene from './components/ContactScene';
import './App.css';



function App() {
    console.log("App is rendering");
    return (
        <Router>
            <div >
                <Routes>
                    <Route path="/" element={<GalaxyScene />} />
                    <Route path="/about" element={<AboutScene />} />
                    <Route path="/projects" element={<ProjectsScene />} />
                    <Route path="/contact" element={<ContactScene />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;