import React, { useState} from 'react';
import { Canvas} from '@react-three/fiber';
import { OrbitControls, Stars} from '@react-three/drei';
import OrbitController from './OrbitController';
import RotationController from './RotationController';
import { useNavigate } from 'react-router-dom';
import SpaceObject from './SpaceObject';
import projectsData from '../projectsData';
import './ProjectsScene.css';


function ProjectsScene() {
    const navigate = useNavigate();

    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

    const handleNext = () => {
        setCurrentProjectIndex((prev) => (prev + 1) % projectsData.length);
    };

    const handlePrev = () => {
        setCurrentProjectIndex((prev) =>
            prev === 0 ? projectsData.length - 1 : prev - 1
        );
    };

    const currentProject = projectsData[currentProjectIndex];

    return (
        <div className="canvas-container">
            <Canvas
                className="canvas-background"
                camera={{ position: [0, 5, 5], fov: 40 }}
            >
                <color attach="background" args={['black']} />
                <ambientLight intensity={2} />
                <Stars
                    radius={120}
                    depth={40}
                    count={5000}
                    factor={5}
                    saturation={1}
                    fade
                />
                <group position={[-3.5, 0, 0]}>
                    {/* Planet */}
                    <RotationController speed={-0.001}>
                        <SpaceObject
                            args={[0.8, 32, 32]}
                            texturePath={'./assets/textures/jupiter.jpg'} />
                    </RotationController>
                    {/* Moons */}
                    <OrbitController radius={1.2} speed={0.1}>
                        <SpaceObject
                            args={[0.15, 32, 32]}
                            texturePath={'./assets/textures/moon1.jpg'} />
                    </OrbitController>
                    <OrbitController radius={1.5} speed={0.2}>
                        <SpaceObject
                            args={[0.15, 32, 32]}
                            texturePath={'./assets/textures/moon2.jpg'} />
                    </OrbitController>
                    <OrbitController radius={1.8} speed={0.3}>
                        <SpaceObject
                            args={[0.15, 32, 32]}
                            texturePath={'./assets/textures/moon3.jpg'} />
                    </OrbitController>
                </group>
                <OrbitControls enableZoom={false} />
            </Canvas>

            {/* Project Slide */}
            <div className="project-slide">
                <h2>{currentProject.title}</h2>
                <p>{currentProject.details}</p>
                <a href={currentProject.link} target="_blank" rel="noopener noreferrer">
                    View on GitHub
                </a>
                {currentProject.images && currentProject.images.length > 0 && (
                    <div >
                        {currentProject.images.map((image, index) => (
                            <img key={index} src={image} alt={`Project ${currentProject.title} - ${index + 1}`} />
                        ))}
                    </div>
                )}
                {/* Navigation Buttons */}
                <div className="slide-navigation">
                    <button onClick={handlePrev}>Previous</button>
                    <button onClick={handleNext}>Next</button>
                </div>
            </div>

            {/* Spacecraft Overlay */}
            <div className="spacecraft-overlay">
                <div className="top-bar">
                    <div className="barcode"></div>
                    <h1>Projects</h1>
                </div>

                <div className="left-panel">
                    <div className="circle"></div>
                    <div className="line"></div>
                </div>

                <div className="right-panel">
                    <div className="vertical-line"></div>
                    <div className="small-box"></div>
                </div>

                <div className="spacecraft-controls">
                    <button onClick={() => navigate("/")}>Return to System</button>
                </div>
                <div className="bottom-bar">
                    <div className="angled-line"></div>
                </div>
            </div>
        </div>
    );
}

export default ProjectsScene;