import Experience from "./Experience";
import * as THREE from "three";


import GUI from 'lil-gui'; 


export default class Camera {
    constructor() {
        this.experience = Experience.getInstance();
        this.camera = this.experience.camera
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;


        window.addEventListener("mousemove", (e) => this.onMouseMove(e));

        
    }
    
    onMouseMove(e){
        const mouseX = e.clientX / window.innerWidth - .5; // Convert position to range between -0.5 and +0.5
        const mouseY = e.clientY / window.innerHeight - .5;
        this.camera.orbit(mouseX,mouseY)
        //console.log("mouse X ", mouseX);
        //this.camera.activeCamera
    }






}