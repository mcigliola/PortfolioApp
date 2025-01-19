import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function MoonOrbitController({
    radius = 1,
    speed = 0.01,
    dynamicCenter,
    children
}) {
    const objectRef = useRef();
    const phaseOffset = useRef(Math.random() * Math.PI * 2);

    React.useEffect(() => {
        if (objectRef.current) {
            const initialPosition = new THREE.Vector3(
                dynamicCenter.x + radius * Math.cos(phaseOffset.current),
                dynamicCenter.y,
                dynamicCenter.z * Math.sin(phaseOffset.current)
            );

            objectRef.current.position.copy(initialPosition);
            objectRef.current.userData.initialPosition = initialPosition.clone();

        }
    }, [radius, dynamicCenter]);

    useFrame(({ clock }) => {
        if (dynamicCenter && objectRef.current) {
            const elapsedTime = clock.getElapsedTime();
            const x = dynamicCenter.x + radius * Math.cos(elapsedTime * speed + phaseOffset.current);
            const z = dynamicCenter.z + radius * Math.sin(elapsedTime * speed + phaseOffset.current);
            const y = dynamicCenter.y;

            objectRef.current.position.set(x, y, z);
        }
    });

    return <group ref={objectRef}>{children}</group>;
}

export default MoonOrbitController;