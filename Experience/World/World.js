import * as THREE from "three";
import Experience from "../Experience.js";
import Corridor from './Corridor'
import Lighting from "./Lighting"

export default class World {
    constructor() {
        this.experience = Experience.getInstance();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.resources.on("assetsLoaded", ()=> {
            this.corridor = new Corridor()
        })
        this.lighting = new Lighting();
        console.log(this.scene)

    }



    resize() {

    }

    update() {
 
    }
}
