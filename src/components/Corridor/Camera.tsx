import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect } from "react";
import * as React from "react";
import { Vector3 } from "three";

export default function Camera() {
  const Three = useThree();
  const controls = useControls({
    frame: { options: arrayFramesNames },
  });
  useEffect(() => {
    const camera = Three.camera;
    const intro = frames[controls.frame];
    camera.position.copy(intro.position);
    camera.lookAt(intro.target);
    Three.camera.zoom = intro.zoom;
    Three.camera.updateProjectionMatrix();
    console.log("THREE CAMERA", Three.camera);
  });

  return <></>;
}

enum FramesNames {
  Intro,
  IntroSecond,
  Desk,
  SideDesk,
  Balcony,
}

const arrayFramesNames  = 

Object.keys(FramesNames).filter((key)=>isNaN(Number(key))) as  (keyof typeof FramesNames)[];
console.log("Object keys",Object.keys(FramesNames));

// function extractKeysFromEnum<T>(enum:{[key in keyof T]:string}{

// }

console.log("Object entries",Object.entries(FramesNames));

console.log("Array frames names",arrayFramesNames);


type Frame = { position: Vector3; target: Vector3; zoom: number };

function setFrames() {
  // let cameraFrames : Record<keyof typeof FramesNames,  Frame>

  const Desk = {
    position: new Vector3(-5 - 0.8, 3.12 - 0.35, 1.14),
    target: new Vector3(-7 - 0.8, 1.0 - 0.35, 5),
    zoom: 250,
  };
  const IntroSecond = { ...shiftFrame(Desk, -5, 0), zoom: 100 };
  const Intro = { ...Desk, zoom: 50 };

  const SideDesk = { ...shiftFrame(Desk, 1.8, 0.35), zoom: 250 };
  const Balcony = {
    position: new Vector3(-16, 3.2 + 0.5, 1.14),
    target: new Vector3(-11, 0.6 + 0.5, 5),
    zoom: 250,
  };

  /**  Defines the order of the frames for transitions */
  // frames = ["intro","intro2","desk", "sideDesk","balcon"];
  // // Actual frame exist for doing changes from the given state by the scroll controller
  // actualFrame = { ...cameraFrames.intro };
  // transition = 0;
  const cameraFrames: { [key in keyof typeof FramesNames]: Frame } = {
    Intro,
    IntroSecond,
    Desk,
    SideDesk,
    Balcony,
  };
  return cameraFrames;
}

const frames = setFrames();

function frameIndex(name: keyof typeof FramesNames) {
  return FramesNames[name];
}

/** It's update the actual frame from the transition class attribute */
//     function updateActualFrame() {
//         if(!freeCam){

//             let toFrame = frames[Math.ceil(transition)]
//             let fromFrame = frames[Math.floor(transition)]
//             //console.log("transition",transition, toFrame, fromFrame);
//             //console.trace()
//             //could be optimized, setting only when started or finished, or maybe i should let the builder improve it
//         for (const attribute of ["position", "target"]) {
//             let fromVector = cameraFrames[fromFrame][attribute];
//             let toVector = cameraFrames[toFrame][attribute];
//             actualFrame[attribute] = fromVector.clone().multiplyScalar(1 - transition % 1)
//             .add(toVector.clone().multiplyScalar(transition % 1));
//         }

//     activeCamera.zoom =actualFrame.zoom = cameraFrames[fromFrame].zoom * (1-transition % 1) + cameraFrames[toFrame].zoom * (transition % 1)
//     activeCamera.updateProjectionMatrix()

//     controls.target = actualFrame.target

// }

// }

/** Gives a clone of frame shifted by the given cordinates)*/
function shiftFrame(cameraFrame: Frame, x: number, y: number) {
  const direction = cameraFrame.target
    .clone()
    .addScaledVector(cameraFrame.position, -1);

  let vectorX = new Vector3(0, 1.0, 0).cross(direction);
  vectorX = vectorX.normalize().multiplyScalar(x ? x : 0);

  let vectorY = new Vector3(0, 1.0, 0).multiplyScalar(y ? y : 0);

  const clon = { ...cameraFrame };

  clon.target = cameraFrame.target.clone();
  clon.target.add(vectorX).add(vectorY);
  clon.position = cameraFrame.position.clone();
  clon.position.add(vectorX).add(vectorY);

  return clon;
}

// function orbit(mouseX, mouseY) {
//     if(!freeCam){
//     activeCamera.position.x = actualFrame.position.x + 4 * mouseX; //Change 4 with proportion of distance to target
//     activeCamera.position.y = actualFrame.position.y + 2 * mouseY;
//     activeCamera.position.z = actualFrame.position.z;
//     }
// }
