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

export default class Experience {
  static instance: undefined | Experience;
  static getInstance = (canvas) => {
    if (Experience.instance) return Experience.instance;
    else new Experience(canvas);
  };

  constructor(canvas) {
    Experience.instance = this;

    //this.dev = 0;

    this.sizes = new Sizes();
    this.resources = new Resources(assets);
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.time = new Time();
    this.camera = new Camera();
    this.renderer = new Renderer();

    this.world = new World();
    this.preloader = new Preloader();
    this.controls = new Controls();
    //  this.preloader.on("enablecontrols", () => {
    //     this.controls = new Controls();
    //  });

    this.time.on("update", () => {
      this.camera.update();
      this.update();
    });
    this.sizes.on("resize", () => {
      this.resize();
    });

    //this.renderer = new THREE.WebGLRenderer({
    //    canvas
    //  })
  }
  resize() {
    this.renderer.resize();
    this.camera.resize();
  }

  update() {
    //this.preloader.update();
    //this.world.update();
    this.renderer.update();
    this.camera.update();
    this.controls.update();

    //if (this.controls) {
    //    this.controls.update();
  }
}
