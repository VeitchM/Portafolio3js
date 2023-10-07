import GUI from "lil-gui";
import * as THREE from "three";
import { PointLight } from "three";
import Experience from "../Experience";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

import GSAP from "gsap";

export default class Lighting {
  constructor() {
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.timeline = new GSAP.timeline();
    this.lights = {};

    this.sunLight();
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const ambientLightColor = new THREE.Color("rgb(246,245,245)");
    this.scene.background = ambientLightColor;
    this.scene.add(this.ambientLight);

    this.lightsCorridor();

    //this.debug();

    //this.deve()
  }

  showCorridor() {
    const lights = Object.values(this.lights.corridor);
    console.log("lights: ", lights);
    lights.forEach((light) => {
      light.targIntensity = light.intensity;
      light.intensity = 0;
      this.timeline.to(light, {
        ease: "none.none",
        intensity: light.targIntensity,
        duration: Math.random() * 2 + 1,
        delay: Math.random() * 2 + 1,
      });
    });
    //this.scene.add(light);
    // const addOneByOne = (vector) => {
    //     if (vector.length>0){
    //         this.scene.add(vector.pop());
    //         setTimeout(() => {addOneByOne(vector)},1500)
    //     }

    // }
    //addOneByOne(lights)
    setTimeout(() => {
      this.scene.add(...lights);
    }, 1000);
  }
  deve() {
    this.colorObj = { color: { r: 1, g: 1, b: 1 } };
    this.gui = new GUI();
    this.gui.addColor(this.colorObj, "color");
  }

  themeSwitch(value) {
    if (value === "dark") {
      this.darkTheme();
    } else this.lightTheme();
  }

  darkTheme() {
    const ambientLightColor = new THREE.Color("rgb(135,155,204)"); //"rgb(17.25%, 23.13%, 68.63%)");
    console.log("theme", ambientLightColor, this.scene.background);
    GSAP.to(this.scene.background, { ...ambientLightColor });

    GSAP.to(this.sunLight.color, { r: 0.1725, g: 0.2313, b: 0.6863 });
    GSAP.to(this.sunLight, { intensity: 0.5 });
    //dark color 0x574f9f
    GSAP.to(this.ambientLight, { intensity: 0.1 });
    GSAP.to(this.ambientLight.color, { r: 0.1725, g: 0.2313, b: 0.6863 });
    GSAP.to(this.lights.corridor.window, { intensity: 0.2 });
    GSAP.to(this.lights.corridor.window.color, { r: 0, g: 0, b: 1 });
  }

  lightTheme() {
    const ambientLightColor = new THREE.Color("rgb(246,245,245)");
    GSAP.to(this.scene.background, { ...ambientLightColor });
    GSAP.to(this.sunLight.color, { r: 1, g: 0.9, b: 0.9 });
    GSAP.to(this.sunLight, { intensity: 3 });

    GSAP.to(this.ambientLight.color, { r: 1, g: 0.9, b: 0.9 });
    GSAP.to(this.ambientLight, { intensity: 0.5 });
    GSAP.to(this.lights.corridor.window, { intensity: 4 });
    GSAP.to(this.lights.corridor.window.color, { r: 1, g: 0.9, b: 0.7 });
  }
  sunLight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 3);

    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.shadow.camera.bottom = -5;
    this.sunLight.shadow.camera.right = 10;

    this.sunLight.position.set(-10, 7, 3);

    const targetSunLight = new THREE.Object3D();
    targetSunLight.position.set(-5, 0, 1);
    this.scene.add(targetSunLight);
    this.sunLight.target = targetSunLight;

    this.scene.add(this.sunLight);
  }

  lightsCorridor() {
    this.lights.corridor = {};

    const pointLight = (name, color, intensity, position) => {
      const light = new THREE.PointLight(color, 0);
      this.timeline.to(light, {
        intensity: intensity,
        duration: Math.random() * 3,
      });
      light.position.copy(position);
      //light.castShadow = true;
      light.shadow.normalBias = 0.005;
      //light.shadow.bias = -0.00001
      //up.shadowMapWidth = 2048
      light.shadow.radius = 0;
      //light.shadow.blurSamples = 1
      this.lights.corridor[name] = light;
      //this.scene.add(light);
      return light;
    };

    const rectLight = (
      name,
      color,
      intensity,
      position,
      width,
      height,
      direction
    ) => {
      const light = new THREE.RectAreaLight(color, 0, width, height);
      this.timeline.to(light, {
        intensity: intensity,
        duration: Math.random() * 3,
      });
      light.position.copy(position);
      light.lookAt(direction.add(position));
      this.lights.corridor[name] = light;
      //this.scene.add(light);
      //const helper = new RectAreaLightHelper(light)
      //this.scene.add(helper)

      return light;
    };

    const lightDesktopInt = 0.05;
    const up = pointLight(
      "up",
      0x5787ff,
      0.5 + 0.3,
      new THREE.Vector3(-6.8, 2.4, 4)
    );
    up.castShadow = true;
    //pointLight("down", 0x5787ff, .1, new THREE.Vector3(-7.2, 0.8, 3.8))
    //rectLight("topDesktop", 0xFFD9DD, .5, new THREE.Vector3(-6.75, 1.4, 4.959), 1.1, .6, new THREE.Vector3(0, -1, 0))

    //pointLight("topDesktop", 0xFEFFF0, lightDesktopInt * 3, new THREE.Vector3(-6.7113, 1.3725 - 0.1, 4.6715))
    //rectLight("booksDown", 0xB4C9FF, .5, new THREE.Vector3(-7.15, 1.7, 5), .5, .6, new THREE.Vector3(0, -1, 0))

    //pointLight("booksDown", 0xB4C9FF, lightDesktopInt, new THREE.Vector3(-7.057, 1.687, 4.958))
    //pointLight("booksUp", 0xB4C9FF, .5, new THREE.Vector3(-7.05, 1.9494, 4.9587))
    //rectLight("booksUp", 0xB4C9FF, 1, new THREE.Vector3(-7.15, 2.1, 5), .5, .6, new THREE.Vector3(0, -1, 0))

    //rectLight("helmet", 0xFFF200, .5, new THREE.Vector3(-6.4, 1.6871, 4.959), .6, .4, new THREE.Vector3(0, -1, 0))

    // rectLight("rope", 0xFFD9DD, .5, new THREE.Vector3(-6.4, 2, 4.959), .6, .6, new THREE.Vector3(0, -1, 0))

    rectLight(
      "window",
      0xfffbdd,
      5,
      new THREE.Vector3(-7.9, 1.17, 4.14785),
      1.87,
      1.87,
      new THREE.Vector3(1, 0, 0)
    );
  }

  debug() {
    if (this.experience.dev == 1) {
      const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
      this.scene.add(helper);

      Object.values(this.lights.corridor).map((light) => {
        //this.scene.add(new THREE.PointLightHelper(light, 0.1))
        //this.scene.add(new THREE.CameraHelper(light.shadow.camera))
      });
    }
  }
}
