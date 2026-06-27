'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

export function LiquidOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme, systemTheme } = useTheme();
  const { viewport, pointer } = useThree();

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  // Smooth mouse interpolation for cinematic feel
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Base slow, ethereal rotation
      meshRef.current.rotation.x += delta * 0.05;
      meshRef.current.rotation.y += delta * 0.08;

      // Mouse follow interaction (smooth and heavy)
      targetRotation.current.x = (pointer.y * viewport.height) / 12;
      targetRotation.current.y = (pointer.x * viewport.width) / 12;

      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotation.current.x, 0.02);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotation.current.y, 0.02);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[1.5, 128, 128]} />
        
        {/* Ethereal, Frosted, Milky Glass Shader */}
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={2.5}
          roughness={0.35} /* Frosted, milky look */
          transmission={1}
          ior={1.2} /* Soft, non-harsh refraction */
          chromaticAberration={0.03}
          anisotropy={0.5}
          distortion={0.3} /* Liquid surface movement */
          distortionScale={0.5}
          temporalDistortion={0.05} /* Slow, ethereal morphing */
          iridescence={0.2}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          clearcoat={0.1}
          attenuationDistance={isDark ? 0.8 : 3}
          attenuationColor={isDark ? '#444444' : '#ffffff'}
          color={isDark ? '#aaaaaa' : '#ffffff'}
          background={new THREE.Color(isDark ? '#000000' : '#ffffff')}
        />
      </mesh>
      
      {/* Studio lighting for soft, diffuse reflections */}
      <Environment preset={isDark ? "studio" : "city"} environmentIntensity={isDark ? 0.4 : 0.8} />
      
      {/* Soft Ambient Fill */}
      <ambientLight intensity={isDark ? 0.5 : 1} color={isDark ? "#ffffff" : "#ffffff"} />
      
      {/* Intense Rim Light (Top Right) to create the glowing edge */}
      <directionalLight 
        position={[4, 5, -2]} 
        intensity={isDark ? 4 : 2} 
        color="#ffffff" 
      />
      
      {/* Soft Backlight (Bottom Left) for dimension */}
      <spotLight 
        position={[-5, -5, -2]} 
        intensity={isDark ? 2 : 1} 
        color={isDark ? "#888888" : "#ffffff"} 
        angle={0.5} 
        penumbra={1} 
      />
    </Float>
  );
}
