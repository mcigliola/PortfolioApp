import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { useNavigate } from 'react-router-dom';
import robotoFont from 'three/examples/fonts/helvetiker_regular.typeface.json';

function SpaceStation({ modelPath, label, destination }) {
    const navigate = useNavigate();
    const model = useLoader(GLTFLoader, modelPath);
    //scale = [0.005, 0.005, 0.005];
    const labelRef = useRef();
    const font = new FontLoader().parse(robotoFont);

    useFrame(({ camera }) => {
        if (labelRef.current) {
            labelRef.current.lookAt(camera.position);
        }
    });

    const handleClick = () => {
        navigate(destination);
    };

    return (
        <group onClick={handleClick}>
            <primitive object={model.scene} scale={[0.005, 0.005, 0.005]} />
            {label && (
                <mesh ref={labelRef} position={[0, 0.5, 0]}>
                    <textGeometry args={[label, { font, size: 0.2, height: 0.2 }]} />
                    <meshStandardMaterial color="white"/>
                </mesh>
            ) }
        </group>
    )
}

export default SpaceStation;