import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Text, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const SkillOrb = ({ position, color, name, icon: Icon }) => {
    const meshRef = useRef();
    const [hovered, setHovered] = React.useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.1;
            meshRef.current.rotation.y = Math.cos(state.clock.getElapsedTime()) * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group position={position}>
                <Sphere
                    args={[0.8, 64, 64]}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    ref={meshRef}
                >
                    <MeshDistortMaterial
                        color={color}
                        speed={hovered ? 3 : 1.5}
                        distort={hovered ? 0.4 : 0.2}
                        radius={0.8}
                        emissive={color}
                        emissiveIntensity={hovered ? 0.5 : 0.2}
                        transparent
                        opacity={0.8}
                    />
                </Sphere>

                <Text
                    position={[0, -1.2, 0]}
                    fontSize={0.2}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    font="https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkFtoMM3T6rjS3F9XRaMDvdvMjX.woff"
                >
                    {name}
                </Text>
            </group>
        </Float>
    );
};

const Connections = ({ points, color }) => {
    const lineGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(...p)));
        return geometry;
    }, [points]);

    return (
        <line geometry={lineGeometry}>
            <lineBasicMaterial color={color} transparent opacity={0.2} />
        </line>
    );
};

const Skills3DScene = ({ skills }) => {
    const points = useMemo(() => {
        return skills.map((_, i) => [
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 5
        ]);
    }, [skills]);

    return (
        <group>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />

            {skills.map((skill, i) => (
                <SkillOrb
                    key={i}
                    position={points[i]}
                    color={skill.color}
                    name={skill.name}
                    icon={skill.icon}
                />
            ))}

            <Connections points={points} color="#7C3AED" />
        </group>
    );
};

const Skills3D = ({ skills }) => {
    return (
        <div className="skills-3d-canvas">
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 12]} />
                <Skills3DScene skills={skills} />
            </Canvas>
        </div>
    );
};

export default Skills3D;
