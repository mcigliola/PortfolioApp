import React, { useMemo } from 'react';

function GalaxyParticles() {
    const { positions, colors } = useMemo(() => {
        const posArray = [];
        const colorArray = [];
        for (let i = 0; i < 2000; i++) {
            const r_min = 3.5; // Minimum radius
            const r = r_min + Math.random() * (4 - r_min); // Range from r_min to 4
            const theta = Math.random() * Math.PI * 2;

            posArray.push(
                r * Math.cos(theta),
                (Math.random() - 0.5) * 0.5,
                r * Math.sin(theta)
            );

            // Generate random RGB values for the color
            const red = Math.random() * 0.2 + 0.8; // Red: 0.8 to 1.0
            const green = Math.random() * 0.2 + 0.8; // Green: 0.8 to 1.0
            const blue = Math.random() * 0.5;       // Blue: 0.0 to 0.5
            colorArray.push(red, green, blue);
        }

        return {
            positions: new Float32Array(posArray),
            colors: new Float32Array(colorArray),
        };
    }, []);

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={positions}
                    count={positions.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    array={colors}
                    count={colors.length / 3}
                    itemSize={3}
                />
            </bufferGeometry>
            <shaderMaterial
                vertexShader={`
                    attribute vec3 color;
                    varying vec3 vColor;

                    void main() {
                        vColor = color; // Pass the color to the fragment shader
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                        gl_PointSize = 2.0; // Adjust size of the points
                    }
                `}
                fragmentShader={`
                    varying vec3 vColor;

                    void main() {
                        float dist = length(gl_PointCoord - vec2(0.5));
                        if (dist > 0.5) discard; // Discard pixels outside the circle
                        gl_FragColor = vec4(vColor, 1.0); // Apply the color
                    }
                `}
                transparent
            />
        </points>
    );
}

export default GalaxyParticles;