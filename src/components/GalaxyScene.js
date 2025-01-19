import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useLoader} from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import CameraController from './CameraController';
import OrbitController from './OrbitController';
import GalaxyParticles from './GalaxyParticles';
import NavigationObject from './NavigationObject';
import SunObject from './SunObject';
import SpaceObject from './SpaceObject';
import SpaceStation from './SpaceStation';
import './GalaxyScene.css';
import MoonOrbitController from './MoonOrbitController';
import RotationController from './RotationController';
import WarpSpeedEffect from './WarpSpeedEffect';


function GalaxyScene() {
    const [zooming, setZooming] = useState(false);
    const [globalOrbiting, setGlobalOrbiting] = useState(true);
    const [controlsEnabled, setControlsEnabled] = useState(true);
    const [navObjectPosition, setNavObjectPosition] = useState(new THREE.Vector3(0, 0, 0));
    const [warpSpeed, setWarpSpeed] = useState(false);
    const [warpCompletedCallback, setWarpCompletedCallback] = useState(null);
    const navigate = useNavigate();
    const cameraTarget = useRef(new THREE.Vector3(0, 0, 10));
    const initialCameraPosition = useRef(new THREE.Vector3(0, 3, 8));
    const focusTarget = useRef(new THREE.Vector3(0, 0, 0));
    const spaceStationModel = useLoader(GLTFLoader, './assets/ISS_stationary.glb');
    console.log(spaceStationModel);

    const handleReset = () => {

        cameraTarget.current = initialCameraPosition.current.clone();  //Reset camera
        setZooming(true);
        setGlobalOrbiting(true);
        setControlsEnabled(true);

        setTimeout(() => {
            setZooming(false);
        }, 500);
    };

    //const handleWarp = (onComplete) => {
    //    setWarpSpeed(true);
    //    setWarpCompletedCallback(() => onComplete);

    //    setTimeout(() => {
    //        setWarpSpeed(false);
    //        if (onComplete) onComplete();
    //    }, 2000);
    //}

    return (
        <>
            <Canvas
                camera={{ position: [0, 3, 8], fov: 75 }}
                style={{ width: '100vw', height: '100vh' }}
                gl={{ alpha: false }}>

                <color attach="background" args={['black']} />
                <ambientLight intensity={2} />
                {/*<pointLight*/}
                {/*    position={[0, 0, 0]}*/}
                {/*    intensity={10}*/}
                {/*    castShadow*/}
                {/*    distance={50}*/}
                {/*    decay={2}*/}
                {/*/>*/}

                <WarpSpeedEffect enabled={warpSpeed }/>

                <CameraController
                    cameraTarget={cameraTarget}
                    zooming={zooming}
                    setZooming={setZooming}
                    focusTarget={focusTarget}
                />

                <Stars
                    radius={120} // Starfield radius
                    depth={40}   // Starfield depth
                    count={5000} // Number of stars
                    factor={5}   // Star size
                    saturation={1} // Color saturation
                    fade={true}  // Fades stars at the edge
                />

                <SunObject />

                {/*{spaceStationModel && (*/}
                {/*    <primitive*/}
                {/*        object={spaceStationModel.scene}*/}
                {/*        scale={[0.005, 0.005, 0.005]} // Adjust size*/}
                {/*        position={[-7, 0, 0]} // Position in the scene*/}
                {/*        //rotation={[0, Math.PI / 4, 0]} // Optional rotation*/}
                {/*    />*/}
                {/*)}*/}

                <OrbitController radius={2} speed={0.2} axis={[0, 1, 0]} orbiting={globalOrbiting}>
                    <SpaceObject
                        args={[0.3, 32, 32]}
                        texturePath="./assets/textures/redPlanet.jpg"
                    />
                </OrbitController>

                <OrbitController radius={3} speed={0.1} axis={[0, 1, 0]} orbiting={globalOrbiting}>
                    <NavigationObject
                        geometryType="sphereGeometry"
                        args={[0.3, 32, 32]}
                        label="About"
                        texturePath="./assets/textures/neptune.jpg"
                        destination="/about"
                    />
                </OrbitController>

                <OrbitController radius={5} speed={0.05} axis={[0, 1, 0]} orbiting={globalOrbiting }>
                    <NavigationObject
                        geometryType="sphereGeometry"
                        args={[0.4, 32, 32]}
                        label="Projects"
                        texturePath="./assets/textures/jupiter.jpg"
                        destination="/projects"
                    />  
                    <MoonOrbitController radius={0.6} speed={0.2} dynamicCenter={navObjectPosition}>
                        <SpaceObject
                            args={[0.05, 32, 32]}
                            texturePath="./assets/textures/moon1.jpg"
                        />
                    </MoonOrbitController>
                    <MoonOrbitController radius={0.7} speed={0.2} dynamicCenter={navObjectPosition}>
                        <SpaceObject
                            args={[0.05, 32, 32]}
                            texturePath="./assets/textures/moon2.jpg"
                        />
                    </MoonOrbitController>
                    <MoonOrbitController radius={0.8} speed={0.1} dynamicCenter={navObjectPosition}>
                        <SpaceObject
                            args={[0.06, 32, 32]}
                            texturePath="./assets/textures/moon3.jpg"
                        />
                    </MoonOrbitController>
                </OrbitController>

                <OrbitController radius={6} speed={0.03}>
                    <SpaceStation
                        modelPath="/assets/ISS_stationary.glb"
                        label="Contact"
                        destination="/contact"
                    />
                </OrbitController>
                
                <RotationController speed={-0.0005}>
                    <GalaxyParticles />
                </RotationController>

                <OrbitControls enabled={controlsEnabled}/> 

            </Canvas>

            <div className="spacecraft-overlay">
                <div className="top-bar">
                    <div className="barcode"></div>
                    <h1>Mary Cigliola: Portfolio</h1>
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
                    <button onClick={() => handleReset()}>Reset View</button>
                </div>
                <div className="bottom-bar">
                    <div className="angled-line"></div>
                </div>
            </div>
        </>
    );
}

export default GalaxyScene;