import * as THREE from "three";
import Experience from "../Experience.js";

export default class Corridor {
    constructor() {
        this.experience = Experience.getInstance();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        const cube = new THREE.Mesh(geometry, material);
        //this.scene.add(cube);

        this.corridor = this.resources.items.corridor;
        this.scene.add(this.corridor.scene)
        console.log("cube")

    }



    resize() {

    }

    update() {
 
    }
}