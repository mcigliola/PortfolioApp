import React, { useEffect } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import { ShaderMaterial, Vector2 } from 'three';

class WarpSpeedMaterial extends ShaderMaterial {
    constructor() {
        super({
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uTime;
                uniform vec2 uResolution;
                varying vec2 vUv;

                void main() {
                    vec2 st = (vUv - 0.5) * 2.0; // Center the UV coordinates
                    float speed =  mod(uTime, 1.0);
                    float intensity = 1.0 / length(st) * 0.4;

                    // Simulate star streaks
                    float streak = fract(length(st) * 10.0 - uTime * 3.0) * intensity;
                    gl_FragColor = vec4(vec3(streak), 1.0);
                }
            `,
        });
    }
}

extend({ WarpSpeedMaterial });

function WarpSpeedEffect({ enabled, onComplete }) {
    const ref = React.useRef();

    useEffect(() => {
        const handleResize = () => {
            ref.current.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useFrame(({ clock }) => {
        if (enabled && ref.current) {
            ref.current.uniforms.uTime.value = clock.elapsedTime;
        }
    });

    return (
        enabled && (
            <mesh>
                <planeGeometry args={[2, 2]} />
                <warpSpeedMaterial ref={ref} />
            </mesh>
        )
    );
}

export default WarpSpeedEffect;