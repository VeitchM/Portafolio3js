import * as THREE from "three";
import Experience from "./Experience.js";

export default class Renderer {
    constructor() {

        // TO DO TODO Apply unreal bloom pass
        //https://threejs.org/examples/webgl_postprocessing_unreal_bloom.html
        // https://www.youtube.com/watch?v=ZtK70Tb9uqg
        this.experience = Experience.getInstance();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;

        this.setRenderer();
    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
        });

        this.renderer.physicallyCorrectlights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.resize();
      //  this.renderer.setSize(this.sizes.width, this.sizes.height);
      //  this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    resize() {
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        //this.renderer.setSize(1000, 1000);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
        
    }

    update() {
        // this.renderer.setViewport(0, 0, this.sizes.width, this.sizes.height);
        //console.log("El ultimo ", this.camera.activeCamera);
        this.renderer.render(this.scene, this.camera.activeCamera);
        // Second Screen
        // this.renderer.setScissorTest(true);
        // this.renderer.setViewport(
        //     this.sizes.width - this.sizes.width / 3,
        //     this.sizes.height - this.sizes.height / 3,
        //     this.sizes.width / 3,
        //     this.sizes.height / 3
        // );

        // this.renderer.setScissor(
        //     this.sizes.width - this.sizes.width / 3,
        //     this.sizes.height - this.sizes.height / 3,
        //     this.sizes.width / 3,
        //     this.sizes.height / 3
        // );

    

        // this.renderer.setScissorTest(false);
    }
}
