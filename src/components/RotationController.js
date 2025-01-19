import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function RotationController({ speed = 0.01, children }) {
    const objectRef = useRef();

    useFrame(() => {
        if (objectRef.current) {
            objectRef.current.rotation.y += speed;
        }
    });

    return <group ref={objectRef}>{children}</group>;
}

export default RotationController;