import * as THREE from "three";
import React, { Suspense, useRef } from "react";
import { Canvas, GroupProps, useFrame } from "@react-three/fiber";
import {
  Html,
  Environment,
  useGLTF,
  ContactShadows,
  OrbitControls,
} from "@react-three/drei";
import Phone from "./Phone";
import { useControls } from "leva";

function Model(props: {}) {
  const group = useRef<any>();
  // Load model

  // Make it float
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    console.log({ group });

    if (group?.current?.rotation) {
      group.current.rotation.x = Math.cos(t / 2) / 20 - 0.05;
      group.current.rotation.y = Math.sin(t / 4) / 20;
      group.current.rotation.z = Math.sin(t / 2) / 15;
      group.current.position.y = -2 + Math.sin(t) / 6 + 2;
    }
  });
  return (
    <group ref={group} dispose={null}>
      <Phone ref={group} />
    </group>
  );
}

export default function MobileApp() {
  const { color } = useControls("Test", { color: "#2e13b1" });

  return (
    <div className="w-full h-screen relative">
      <Canvas camera={{ position: [5, 0, 15], fov: 22 }}>
        <pointLight position={[20, 10, 10]} intensity={0} />
        <Suspense fallback={null}>
          <Model />
          <Environment preset="city" />
        </Suspense>
        <ContactShadows position={[0, -2.5, 0]} scale={20} blur={2} far={4.5} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  );
}
