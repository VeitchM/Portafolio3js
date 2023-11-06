import {
  ContactShadows,
  Environment,
  OrbitControls,
  PresentationControls,
  useGLTF,
} from "@react-three/drei";
import { Canvas, Object3DNode, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { Suspense } from "react";
import * as React from "react";
import { Mesh, Object3D, Object3DEventMap, Vector3 } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

import GSAP from "gsap";
import Camera from "./Camera";
import Lights from "./Lights";
import Floor from "./Floor";

const MAX_DURATION = 7;
const MIN_DURATION = 0.5;
const MAX_DELAY = 7;

const color = "#ffe882";
const colorDark = "#6672a3";

export default function Corridor() {
  return (
    <div className="h-screen w-screen fixed ">
      <Canvas  orthographic shadows={"soft"}>
        <Suspense fallback={null}>
          {/* <PresentationControls
            snap
            global
            // zoom={0.8}
            // rotation={[0, -Math.PI / 4, 0]}
            polar={[-Math.PI / 4, 0]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          > */}
            <Camera />
            <Model />
            <Lights />
          {/* </PresentationControls> */}
          {/* <Environment preset="warehouse" /> */}
          <Floor />
        </Suspense>
        {/* <OrbitControls/> */}
      </Canvas>
    </div>
  );
}

function Model() {
  const gltf = useGLTF("/models/corridor.glb");
  const gltfOptimized = useGLTF("/models/corridorOptimized.glb");

  const [showOptimized, setShowOptimized] = React.useState(false);

  console.log("GLTF Corridor", gltf);
  const controls = useControls({
    position: [0, 0, 0],
    // [8, 0, -5],
    rotation: [0, 0, 0],
  });
  const timeline = GSAP.timeline();

  React.useEffect(() => {
    recursiveSet(gltf.scene.children, (object) =>
      setHideAppear(object, timeline)
    ).filter((value) => value !== undefined);

    recursiveSet(gltfOptimized.scene.children, castShadow);

    console.log("GLTF loaded", gltf);

    setTimeout(
      () => {
        setShowOptimized(true);
      },
      (MAX_DELAY + MAX_DURATION) * 1000
    );
  }, [gltf]);

  React.useEffect(() => {
    console.log("Model Corridor", showOptimized);
  });

  return (
    <group position={controls.position}>
      {showOptimized ? (
        // null
        <primitive object={gltfOptimized.scene} />
      ) : (
        <primitive object={gltf.scene} />
      )}
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

// Move to utils
export function recursiveSet<T>(
  children: CouldHaveChild[],
  setFunc: (child: CouldHaveChild) => T
): T[] {
  return children
    .map((child) => {
      const appearPromise = setFunc(child);
      let appearPromises: T[] = [];
      if (child.children)
        appearPromises = recursiveSet(child.children, setFunc);
      return [appearPromise, ...appearPromises];
    })
    .flat();
}

/** It sets a function where it all the objects */
function setHideAppear(object: CouldHaveChild, timeline: GSAPTimeline) {
  if (object instanceof Mesh) {
    const scale = object.scale.clone();
    object.castShadow = true;
    object.receiveShadow = true;
    const position = object.position.clone();
    object.scale.set(0, 0, 0);
    object.position.add(new Vector3(5, 5, -5));
    // console.log("OBJECT ID ", object.id);

    const duration =
      Math.random() * (MAX_DURATION - MIN_DURATION) + MIN_DURATION;
    const delay = Math.random() * MAX_DELAY;

    return timeline
      .to(
        object.scale,
        { ...scale, duration, delay },
        // object.id.toString()
        "appearingThings"
      )
      .to(
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

function castShadow(object: CouldHaveChild) {
  if (object instanceof Mesh) {
    object.castShadow = true;
    object.receiveShadow = true;
    // object.scale. = object.position =
  }
}
