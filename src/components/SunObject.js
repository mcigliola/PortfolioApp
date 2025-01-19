import React, { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

function SunObject() {
    const texture = useLoader(TextureLoader, './assets/textures/sun.jpg');

    return (
        <mesh position={new THREE.Vector3(0, 0, 0)} castShadow>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial map={texture} />
            <pointLight
                intensity={4}
                color="yellow"
                distance={100}
                decay={2}
                castShadow
            />
        </mesh>
    );
}

export default SunObject;