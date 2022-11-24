import * as THREE from "three";
import Experience from "../Experience.js";

export default class Lighting {
    constructor() {
        this.experience = Experience.getInstance();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        
        this.sunLight = new THREE.DirectionalLight("#ffffff",3)
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 200;
        this.sunLight.shadow.mapSize.set(1024,1024);
        this.sunLight.shadow.normalBias = 0.05
        //this.scene.position.set(0,10,0)

        this.scene.add(this.sunLight)
        console.log("SunLight")
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.3))

    }
}
