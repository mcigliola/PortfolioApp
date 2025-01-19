import React, { useRef } from 'react';
import { useFrame} from '@react-three/fiber';
import * as THREE from 'three';

function OrbitController({
    orbiting = true,
    radius = 5,
    speed = 0.01,
    center = [0, 0, 0],
    axis = [0, 1, 0],
    children
}) {
    const objectRef = useRef();
    const pivot = new THREE.Vector3(...center);
    const rotationAxis = new THREE.Vector3(...axis).normalize();


    React.useEffect(() => {
        if (objectRef.current) {
            const phase = Math.random() * Math.PI * 2; // Random angle in radians
            const initialPosition = new THREE.Vector3(
                radius * Math.cos(phase), 
                0,
                radius * Math.sin(phase)
            );

            initialPosition.add(pivot);

            objectRef.current.position.copy(initialPosition);
            
        }
    }, [radius, pivot]);

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        const angle = elapsedTime * speed;

        const position = new THREE.Vector3(
            radius * Math.cos(angle),
            0,
            radius * Math.sin(angle)
        );

        position.add(pivot);

        if (orbiting && objectRef.current) {
            objectRef.current.position.copy(position);
        }
    });

    return <group ref={objectRef}>{children}</group>;

}

export default OrbitController;