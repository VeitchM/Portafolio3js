//https://gltf.pmnd.rs/

import React, { useRef } from "react";
import * as THREE from "three";
import { useGLTF, useVideoTexture } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

export default function Phone(props: { ref?: GroupProps["ref"] }) {
  const { nodes, materials } = useGLTF("/models/iphoneForPage.gltf") as any;

  const texture = useVideoTexture("/videos/pastechPT.webm");
  // const texture = useVideoTexture("/videos/nexum.mp4");
  console.log({ texture });

  return (
    <group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cellphone.geometry}
        material={materials.PhoneColorLight}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cellphone_1.geometry}
        material={materials.backlensProjection}
      />
      <mesh
        castShadow
        receiveShadow
        // onClick={() => console.log("MeralCellphoneClicked")}
        // onWheel={()=>{console.log("wheel over")}}
        geometry={nodes.cellphone_2.geometry}
        material={materials.Metal}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cellphone_3.geometry}
        material={materials["Dark screen edges"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cellphone_4.geometry}
        //   material={materials["Screen on"]}
      >
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cellphone_5.geometry}
        material={materials.proyection}
      />
    </group>
  );
}

useGLTF.preload("/models/iphoneForPage.gltf");
