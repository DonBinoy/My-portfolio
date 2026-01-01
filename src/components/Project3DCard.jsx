import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, MeshDistortMaterial, RoundedBox, useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';

const Screen = ({ image }) => {
    // Use a fallback if texture fails to load
    // For now, we'll use a color if image is not a valid URL
    return (
        <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[1.9, 1.3]} />
            <meshStandardMaterial
                color={image ? "#ffffff" : "#2a1e3d"}
                emissive="#7c3aed"
                emissiveIntensity={0.1}
            />
            {/* Texture would go here: <primitive object={texture} attach="map" /> */}
            <Html
                transform
                distanceFactor={1.5}
                position={[0, 0, 0.01]}
                style={{
                    width: '190px',
                    height: '130px',
                    background: 'var(--gradient-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    borderRadius: '4px',
                    overflow: 'hidden'
                }}
            >
                <div style={{ textAlign: 'center', padding: '10px' }}>
                    {image ? <img src={image} alt="Project" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span>Preview Image</span>}
                </div>
            </Html>
        </mesh>
    );
};

const Mockup = ({ image }) => {
    const groupRef = useRef();

    useFrame((state) => {
        const { mouse } = state;
        if (groupRef.current) {
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.5, 0.1);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.5, 0.1);
        }
    });

    return (
        <group ref={groupRef}>
            {/* Device Body */}
            <RoundedBox
                args={[2, 1.4, 0.1]} // Width, height, depth
                radius={0.05} // Radius of the rounded corners
                smoothness={4} // The number of curve segments
            >
                <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.2} />
            </RoundedBox>

            {/* Screen Area */}
            <Screen image={image} />

            {/* Bezel */}
            <mesh position={[0, 0, 0.051]}>
                <planeGeometry args={[1.95, 1.35]} />
                <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
            </mesh>
        </group>
    );
};

const Project3DCard = ({ image, title }) => {
    return (
        <div className="project-3d-card-container">
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 3]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <Mockup image={image} />
                </Float>
            </Canvas>
        </div>
    );
};

export default Project3DCard;
