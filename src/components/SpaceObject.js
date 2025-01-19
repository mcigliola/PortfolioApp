import React, { useRef } from 'react';
import { useLoader} from '@react-three/fiber';
import { TextureLoader } from 'three';

function SpaceObject({ geometryType = 'sphereGeometry', args = [1, 32, 32], texturePath, position}) {

    const meshRef = useRef();
    const texture = useLoader(TextureLoader, texturePath);

    return (
        <mesh position={position} ref={meshRef}>
            {React.createElement(geometryType, {args}) }
            <meshStandardMaterial map={texture} color={texture ? null : 'blue'} />
        </mesh>
    );
}

export default SpaceObject;