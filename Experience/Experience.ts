import * as THREE from "three";

import Sizes from "./Utils/Sizes";
import Resources from "./Utils/Resources";
import assets from "./Utils/assets";

import Camera from "./Camera";
import Renderer from "./Renderer";
import Controls from "./Controls/controls";

import Time from "./Utils/Time";
import World from "./World/World";
import Preloader from "./Controls/Preloader";

type Canvas = Element;

export default class Experience {
  static instance: undefined | Experience;

  /** Must be called after being created */
  static getInstance = () => {
    return Experience.instance as Experience;
  };
  mustRerender: boolean = true;
  sizes: Sizes;
  resources: Resources;
  canvas: Canvas;
  scene: THREE.Scene;
  time: Time;
  camera: Camera;
  renderer: Renderer;
  world: World;
  preloader: Preloader;
  controls: Controls;

  constructor(canvas: Canvas) {
    Experience.instance = this;

    //this.dev = 0;

    this.sizes = new Sizes();
    this.resources = new Resources(assets);
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();

    this.world = new World();
    this.preloader = new Preloader();
    this.controls = new Controls();

    this.sizes.on("resize", () => {
      this.resize();
    });
    console.log("This on constructor", this);

    this.setMustRerender(true);
  }
  resize() {
    this.renderer.resize();
    this.camera.resize();
  }

  setMustRerender(value: boolean) {
    this.mustRerender = value;
    if (value) {
      this.renderer.setAnimationLoop(() => this.update());
    } else {
      this.renderer.setAnimationLoop(null);
    }
  }

  update() {
      //this.preloader.update();
      //this.world.update();
      this.controls.update();
      this.camera.update();
      this.renderer.update();
    //if (this.controls) {
    //    this.controls.update();
  }
}
