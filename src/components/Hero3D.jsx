import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShape = ({ position, color, speed = 1, distort = 0.3 }) => {
    return (
        <Float speed={speed * 2} rotationIntensity={2} floatIntensity={2}>
            <Sphere args={[1, 64, 64]} position={position} scale={0.5}>
                <MeshDistortMaterial
                    color={color}
                    speed={speed}
                    distort={distort}
                    radius={1}
                />
            </Sphere>
        </Float>
    );
};

const Particles = ({ count = 1000 }) => {
    const points = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 10;
            p[i * 3 + 1] = (Math.random() - 0.5) * 10;
            p[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return p;
    }, [count]);

    const pointsRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        pointsRef.current.rotation.y = time * 0.05;
        pointsRef.current.rotation.x = time * 0.03;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={points}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                color="#7C3AED"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
};

const Scene = () => {
    const groupRef = useRef();

    useFrame((state) => {
        const { mouse } = state;
        if (groupRef.current) {
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.2, 0.1);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.2, 0.1);
        }
    });

    return (
        <group ref={groupRef}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} color="#EC4899" intensity={0.5} />

            <FloatingShape position={[-2, 1, 0]} color="#7C3AED" speed={1.5} distort={0.4} />
            <FloatingShape position={[2, -1, -1]} color="#EC4899" speed={1.2} distort={0.3} />
            <FloatingShape position={[-1, -2, 1]} color="#6B46C1" speed={2} distort={0.5} />

            <Particles count={2000} />
        </group>
    );
};

const Hero3D = () => {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <Scene />
            </Canvas>
        </div>
    );
};

export default Hero3D;
