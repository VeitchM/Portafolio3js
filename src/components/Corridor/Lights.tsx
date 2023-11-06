import gsap from "gsap";
import {
  AmbientLight as AmbientLightType,
  CameraHelper,
  Color,
  DirectionalLight,
  Light,
  Object3D,
  OrthographicCamera,
  PointLight,
  RectAreaLight,
  Vector3,
} from "three";
import { Shadow } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Themes, useTheme } from "../../providers/ThemeProvider";
import { useEffect, useMemo, useRef } from "react";

export default function Lights() {
  return (
    <>
      <AmbientLight />
      <SunLight />
      <UpLight />
      <WindowsLight />
    </>
  );
}

//Components ====================================

function AmbientLight() {
  const ref = useLightTheme<AmbientLightType>({
    light: { color: new Color("#f6f5f5"), intensity: 0.5 },
    dark: { color: new Color("#879bcc"), intensity: 0.1 },
  });

  return <ambientLight ref={ref} color={0xffffff} intensity={0.5} />;
}

function SunLight() {
  const target = useMemo(() => {
    const obj = new Object3D();
    obj.position.set(-5, 0, 1);
    return obj;
  }, []);

  // const Three = useThree();
  // const cameraRef = useRef<OrthographicCamera>(null);
  // useEffect(() => {
  //   const cameraHelper = new CameraHelper(cameraRef.current!);
  //   Three.scene.add(cameraHelper);
  // }, []);

  const ref = useLightTheme<DirectionalLight>({
    light: { color: new Color("#ffffe6"), intensity: 3 },
    dark: { color: new Color("#2c3baf"), intensity: 4 },
  });

  return (
    //   <cameraHelper>
    <directionalLight
      castShadow={true}
      shadow-normalBias={0.1}
      intensity={3}
      shadow-mapSize={[1024, 1024]}
      position={[-10, 7, 3]}
      ref={ref}
      target={target}
    >
      <orthographicCamera
        // ref={cameraRef}
        attach="shadow-camera"
        args={[-1, 4, 2, -10]}
        far={10}
      />
    </directionalLight>
  );
}

function WindowsLight() {
  const lightRef = useLightTheme<RectAreaLight>({
    light: { color: new Color("#ffffe6"), intensity: 4 },
    dark: { color: new Color("#7080f9"), intensity: 8 },
  });

  return (
    <rectAreaLight
      position={[-7.9, 1.17, 4.14785]}
      name={"LightUp"}
      intensity={4}
      width={1.87}
      height={1.87}
      ref={lightRef}
      color={0xfffbdd}
      rotation={[0, -Math.PI / 2, 0]}
      //  lookAt={rectLightTarget}
    />
  );
}

function UpLight() {
  const lightRef = useLightTheme<PointLight>({
    light: { color: new Color("#5787ff"), intensity: 0.8 },
    dark: { color: new Color("#5787ff"), intensity: 0.6 },
  });
  return (
    <>
      <pointLight
        position={[-6.8, 2.4, 4]}
        name={"LightUp"}
        ref={lightRef}
        intensity={0.8}
        color={0x5787ff}
        castShadow
        shadow-normalBias={0.05}
        shadow-radius={1}
      />
      {/* <axesHelper position={[-6.8, 2.4, 4]} /> */}
    </>
  );
}

//Theme logic ==================================

type LightProperties = { color: Color; intensity: number };
type ThemeProperties = { dark: LightProperties; light: LightProperties };
function onThemeChange(
  theme: keyof typeof Themes,
  light: Light,
  properties: ThemeProperties
) {
  gsap
    .timeline()
    .to(light.color, properties[theme].color, "TurningLights")
    .to(light, { intensity: properties[theme].intensity }, "TurningLights");
}

function useLightTheme<T extends Light>(themeProperties: ThemeProperties) {
  const lightRef = useRef<T>(null);
  const theme = useTheme();

  useEffect(() => {
    onThemeChange(theme, lightRef.current!, themeProperties);
  }, [theme]);

  return lightRef;
}

// function darkTheme() {
//     const ambientLightColor = new Color("rgb(135,155,204)"); //"rgb(17.25%, 23.13%, 68.63%)");
//     console.log("theme", ambientLightColor, scene.background);
//     gsap.to(scene.background, { ...ambientLightColor });

//     gsap.to(sunLight.color, { r: 0.1725, g: 0.2313, b: 0.6863 });
//     gsap.to(sunLight, { intensity: 0.5 });
//     //dark color 0x574f9f
//     gsap.to(ambientLight, { intensity: 0.1 });
//     gsap.to(ambientLight.color, { r: 0.1725, g: 0.2313, b: 0.6863 });
//     gsap.to(lights.corridor.window, { intensity: 0.2 });
//     gsap.to(lights.corridor.window.color, { r: 0, g: 0, b: 1 });
//   }

//   function lightTheme() {
//     const ambientLightColor = new Color("rgb(246,245,245)");
//     gsap.to(scene.background, { ...ambientLightColor });
//     gsap.to(sunLight.color, { r: 1, g: 0.9, b: 0.9 });
//     gsap.to(sunLight, { intensity: 3 });

//     gsap.to(ambientLight.color, { r: 1, g: 0.9, b: 0.9 });
//     gsap.to(ambientLight, { intensity: 0.5 });
//     gsap.to(lights.corridor.window, { intensity: 4 });
//     gsap.to(lights.corridor.window.color, { r: 1, g: 0.9, b: 0.7 });
//   }

//   function sunLight() {
//     const sunLight = new DirectionalLight("#ffffff", 3);

//     sunLight.castShadow = true;
//     sunLight.shadow.camera.far = 20;
//     sunLight.shadow.mapSize.set(1024, 1024);
//     sunLight.shadow.normalBias = 0.05;
//     sunLight.shadow.camera.bottom = -5;
//     sunLight.shadow.camera.right = 10;

//     sunLight.position.set(-10, 7, 3);

//     const targetSunLight = new Object3D();
//     targetSunLight.position.set(-5, 0, 1);
//     scene.add(targetSunLight);
//     sunLight.target = targetSunLight;

//     scene.add(sunLight);
//   }

//   function lightsCorridor() {
//     const lights.corridor = {};

//     const pointLight = (name, color, intensity, position) => {
//       const light = new THREE.PointLight(color, 0);
//       timeline.to(light, {
//         intensity: intensity,
//         duration: Math.random() * 3,
//       });
//       light.position.copy(position);
//       //light.castShadow = true;
//       light.shadow.normalBias = 0.005;
//       //light.shadow.bias = -0.00001
//       //up.shadowMapWidth = 2048
//       light.shadow.radius = 0;
//       //light.shadow.blurSamples = 1
//       lights.corridor[name] = light;
//       //scene.add(light);
//       return light;
//     };

//     const rectLight = (
//       name,
//       color,
//       intensity,
//       position,
//       width,
//       height,
//       direction
//     ) => {
//       const light = new THREE.RectAreaLight(color, 0, width, height);
//       timeline.to(light, {
//         intensity: intensity,
//         duration: Math.random() * 3,
//       });
//       light.position.copy(position);
//       light.lookAt(direction.add(position));
//       lights.corridor[name] = light;
//       //scene.add(light);
//       //const helper = new RectAreaLightHelper(light)
//       //scene.add(helper)

//       return light;
//     };
