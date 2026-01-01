import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const FloatingIcons = () => {
    const groupRef = useRef();

    useFrame((state) => {
        const { clock } = state;
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
            groupRef.current.rotation.x = Math.cos(clock.getElapsedTime() * 0.5) * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Abstract floating elements for contact section */}
            <Float speed={4} rotationIntensity={1} floatIntensity={2}>
                <Sphere args={[0.5, 64, 64]} position={[-4, 2, -2]}>
                    <MeshDistortMaterial
                        color="#7C3AED"
                        speed={2}
                        distort={0.4}
                        radius={0.5}
                    />
                </Sphere>
            </Float>
            <Float speed={3} rotationIntensity={1.5} floatIntensity={1.5}>
                <Sphere args={[0.3, 64, 64]} position={[4, -2, -3]}>
                    <MeshDistortMaterial
                        color="#6D28D9"
                        speed={3}
                        distort={0.5}
                        radius={0.3}
                    />
                </Sphere>
            </Float>
            <Float speed={5} rotationIntensity={2} floatIntensity={3}>
                <Sphere args={[0.2, 64, 64]} position={[2, 3, -4]}>
                    <MeshDistortMaterial
                        color="#8B5CF6"
                        speed={1.5}
                        distort={0.3}
                        radius={0.2}
                    />
                </Sphere>
            </Float>
        </group>
    );
};

const Contact3D = () => {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <FloatingIcons />
            </Canvas>
        </div>
    );
};

export default Contact3D;
