import React, { useRef } from 'react';
import { useFrame, useLoader, extend } from '@react-three/fiber';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import robotoFont from 'three/examples/fonts/helvetiker_regular.typeface.json';

extend({ TextGeometry });

function NavigationObject({
    geometryType = 'sphereGeometry', // Default geometry type
    args = [0.3, 32, 32], // Default arguments for geometry
    texturePath = null, // Optional texture path
    customObject = null, // Optional 3D model
    label = '', // Optional label
    destination = '/', // Default destination
    onWarp,
}) {
    const meshRef = useRef();
    const labelRef = useRef();
    const objectRef = useRef();
    const texture = useLoader(THREE.TextureLoader, texturePath);
    const font = new FontLoader().parse(robotoFont);
    const navigate = useNavigate();

    useFrame(({ camera }) => {
        if (labelRef.current && objectRef.current) {
            const currentPosition = objectRef.current.position.clone();
            const targetPosition = currentPosition.clone().add(new THREE.Vector3(0, 0.5, 0));

            labelRef.current.position.lerp(targetPosition, 0.1);
            labelRef.current.lookAt(camera.position); // Keep label facing camera
        }
    });

    const handleClick = () => {
        if (onWarp) {
            onWarp(() => navigate(destination));
        }
        else {
            navigate(destination);
        }
    };

    return (
        <group onClick={handleClick} ref={objectRef }>
            {customObject ? (
                <primitive object={customObject} />
            ) : (
                    <mesh ref={meshRef} >
                        {React.createElement(geometryType, { args })}
                        <meshStandardMaterial map={texture} />
                    </mesh>
            ) }
            {label && (
                <mesh ref={labelRef} position={[0, 0.5, 0] }>
                    <textGeometry args={[label, { font, size: 0.2, height: 0.02 }]} />
                    <meshStandardMaterial color="white" />
                </mesh>
            )}
        </group>
    );
}

export default NavigationObject;