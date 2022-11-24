import * as THREE from "three";
import Experience from "../Experience.js";

export default class Lighting {
    constructor() {
        this.experience = Experience.getInstance();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.sunLight = new THREE.DirectionalLight("#ffffff", 3)
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(1024, 1024);
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.shadow.camera.bottom = -5
        this.sunLight.position.set(-10, 7, 3);
        const targetSunLight = new THREE.Object3D();
        targetSunLight.position.set(-5, 0, 1);
        this.scene.add(targetSunLight);

        this.sunLight.target = targetSunLight;

        const helper = new THREE.CameraHelper(this.sunLight.shadow.camera)
        this.scene.add(helper)


        this.scene.add(this.sunLight)
        console.log("SunLight")
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.3))

    }
}
