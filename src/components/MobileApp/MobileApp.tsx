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
import Section from "../Section/Section";
import { Section as section } from "../../../Experience/Languages/content";
import { Variants, motion, useInView } from "framer-motion";
// import { PhoneOptimized } from "./PhoneOptimized";

const animationVariants: Variants = {
  appear: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 40, damping: 24 },
  },
  hidden: { opacity: 0, y: 800, transition: { duration: 0.2 } },
};

function Model(props: {}) {
  const group = useRef<any>();
  // Load model

  // Make it float
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // console.log('rendered');

    if (group?.current?.rotation) {
      group.current.rotation.x = Math.cos(t / 2) / 20 - 0.05;
      group.current.rotation.y = Math.sin(t / 4) / 20;
      group.current.rotation.z = Math.sin(t / 2) / 15;
      group.current.position.y = -2 + Math.sin(t) / 6 + 2;
    }
  });
  return (
    <group ref={group} dispose={null}>
      <Phone  />
    </group>
  );
}

export default function MobileApp(props: { section: section }) {
  // const { color } = useControls("Test", { color: "#2e13b1" });
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref,{margin: "200px 0px -800px"});
  console.log("inView", inView);

  return (
    <motion.div initial={"hidden"} whileInView={"appear"}>
      <div ref={ref}>
        <Section text={props.section} number={4} />
      </div>

      <motion.div
        variants={animationVariants}
        initial="hidden"
        animate={inView ? "appear" : "hidden"}
        className="lg:fixed -top-[10vh] w-screen h-screen  -z-10"
      >
        <div className="w-screen h-[10%]  bg-gradient-to-t  from-background-variant" />
        <div className="w-full lg:flex h-full relative bg-background-variant">
          <div className="lg:w-1/2  h-full ">
            <Canvas  frameloop={inView? 'always' : 'never'} camera={{ position: [5, 0, 15], fov: 22 }}>
              {/* <pointLight position={[20, 10, 10]} intensity={2} /> */}
              <Suspense fallback={null}>
                <Model />
                <Environment preset="warehouse" />
              </Suspense>
              <ContactShadows
                position={[0, -2.5, 0]}
                scale={20}
                blur={2}
                far={4.5}
              />

              {/* <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI / 2.2}
        /> */}
            </Canvas>
          </div>
        </div>
        <div className="w-full h-[10vh]  bg-gradient-to-b  from-background-variant" />
      </motion.div>
    </motion.div>
  );
}
