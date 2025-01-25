import React from 'react';
import { Canvas} from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import RotationController from './RotationController';
import { useNavigate } from 'react-router-dom';
import TypingText from './TypingText';
import AboutText from '../Content/AboutText';
import './AboutScene.css';

function AboutScene() {
    const navigate = useNavigate();

    return (
        <div className="canvas-container" >
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
                <group position={[-2, 0, 0]}>
                    <RotationController speed={-0.001 }>
                        <mesh> 
                            <sphereGeometry args={[1, 32, 32]} />
                            <meshStandardMaterial map={new THREE.TextureLoader().load('./assets/textures/neptune.jpg')} />
                        </mesh>
                    </RotationController>
                </group>
                <OrbitControls enableZoom={false }/>
            </Canvas>

            {/* Text box */}
            <div className="about-textbox">
                <pre>{AboutText}</pre>
            </div>

            {/* Spacecraft overlay*/}
            <div className="spacecraft-overlay">
                <div className="top-bar">
                    <div className="barcode"></div>
                    <h1>About Mary</h1>
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

export default AboutScene;