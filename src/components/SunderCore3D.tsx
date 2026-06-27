'use client';
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function HolographicWireframe() {
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (innerRef.current && outerRef.current) {
      // Complex, architectural counter-rotation
      innerRef.current.rotation.x -= delta * 0.2;
      innerRef.current.rotation.y += delta * 0.3;
      
      outerRef.current.rotation.x += delta * 0.1;
      outerRef.current.rotation.z -= delta * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group scale={1.2}>
        {/* Inner Core: Data Engine */}
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial 
            color="#ff2a85" 
            wireframe={true} 
            transparent={true} 
            opacity={0.3} 
          />
        </mesh>

        {/* Outer Shell: Pipeline Grid */}
        <mesh ref={outerRef} scale={1.8}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial 
            color="#00e1ff" 
            wireframe={true} 
            transparent={true} 
            opacity={0.15} 
          />
        </mesh>
        
        {/* Core Glow Particle */}
        <mesh>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </Float>
  );
}

export default function SunderCore3D() {
  return (
    <div className="w-full h-full pointer-events-none z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* A purely glowing, wireframe architecture. No lights needed as materials are Basic. */}
        <HolographicWireframe />
      </Canvas>
    </div>
  );
}
