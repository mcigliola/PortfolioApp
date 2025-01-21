import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import RotationController from './RotationController';
import { useNavigate } from 'react-router-dom';
import './ContactScene.css';
import SpaceStation from './SpaceStation';

function ContactScene() {
    const navigate = useNavigate();

    return (
        <div className="canvas-container">
            <Canvas
                className="canvas-background"
                camera={{ position: [0, 0, 5], fov: 40 }}
            >
                <color attach="background" args={['black']} />
                <ambientLight intensity={2} />
                <Stars
                    radius={120} // Starfield radius
                    depth={40}   // Starfield depth
                    count={5000} // Number of stars
                    factor={5}   // Star size
                    saturation={1} // Color saturation
                    fade={true}  // Fades stars at the edge
                />
                <group position={[-1.5, 0, 0]}>
                    <RotationController speed={-0.001}>
                        <mesh scale={[5, 5, 5]}>
                            <SpaceStation
                                modelPath="/assets/ISS_stationary.glb"
                                scale={[0.005, 0.005, 0.005]}
                                label={null}
                                destination={null}
                            />
                        </mesh>
                    </RotationController>
                </group>
                <OrbitControls  />
                {/*<OrbitControls enableZoom={false} />*/}
            </Canvas>

            <div className="contact-textbox">
                <h2>Let's Collaborate!</h2>
                <p>I'd love to hear from you, whether it's about potential projects, collaborations, or just to connect.</p>
                <div className="contact-links">
                    <a href="https://github.com/mcigliola" target="_blank" rel="noopener noreferrer">
                        <img src="./assets/icons/github-mark-white.png" alt="GitHub" />
                    </a>
                    <a href="https://linkedin.com/in/mary-cigliola" target="_blank" rel="noopener noreferrer">
                        <img src="./assets/icons/LI-In-Bug.png" alt="LinkedIn" />
                    </a>
                </div>
            </div>

            {/* Spacecraft overlay*/}
            <div className="spacecraft-overlay">
                <div className="top-bar">
                    <div className="barcode"></div>
                    <h1>Contact Mary</h1>
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
    )
}

export default ContactScene;