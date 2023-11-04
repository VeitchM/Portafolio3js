import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, Object3DNode, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { Suspense } from "react";
import * as React from "react";
import {  Mesh, Object3D, Object3DEventMap, Vector3 } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

import GSAP from "gsap";
import Camera from "./Camera";

export default function Corridor() {
  return (
    <div className="h-screen w-screen">
      <Canvas orthographic >
        <Suspense fallback={null}>
          <Model />
          <Camera />
          <Environment preset="warehouse" />
        </Suspense>
      </Canvas>
    </div>
  );
}



function Model() {
  const gltf = useGLTF("/models/corridor.glb");

  console.log("GLTF Corridor", gltf);
  const controls = useControls({ position: [0,0,0],
    // [8, 0, -5], 
    rotation: [0, 0, 0] });
  const timeline = GSAP.timeline();

  React.useEffect(() => {
    recursiveSet(gltf.scene.children, (object) =>
      setHideAppear(object, timeline)
    );
  }, [gltf]);

  return (
    <group position={controls.position}>
      <primitive object={gltf.scene} />;
    </group>
  );
  //   <mesh
  //     geometry={mesh.geometry}
  //     key={mesh.id}
  //     position={mesh.position}
  //     scale={mesh.scale}
  //     rotation={mesh.rotation}
  //     material={mesh.material}
  //   />

  // <mesh>
  //   <boxGeometry args={[1, 1, 1]} />
  //   <meshStandardMaterial color={"hotpink"} />
  // </mesh>
}

type CouldHaveChild = {
  children?: CouldHaveChild[];
  position: Vector3;
  scale: Vector3;
  id: number;
};

export function recursiveSet(
  children: CouldHaveChild[],
  setFunc: (child: CouldHaveChild) => void
) {
  children.forEach((child) => {
    setFunc(child);
    if (child.children) recursiveSet(child.children, setFunc);
  });
}


/** It sets a function where it all the objects */
function setHideAppear(object: CouldHaveChild, timeline: GSAPTimeline) {
  if (object instanceof Mesh) {
    const scale = object.scale.clone();
    const position = object.position.clone();
    object.scale.set(0, 0, 0);
    object.position.add(new Vector3(5, 5, -5));
    // console.log("OBJECT ID ", object.id);

    const duration = Math.random() * 7 + 0.5;
    const delay = Math.random() * 7;

    timeline.to(
      object.scale,
      { ...scale, duration, delay },
      // object.id.toString()
      "appearingThings"
    );
    timeline.to(
      object.position,
      {
        ...position,
        duration,
        delay,
      },
      // object.id.toString()
      "appearingThings"
    );
    // object.scale. = object.position =
  }
}
