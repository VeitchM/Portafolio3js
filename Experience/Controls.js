import Experience from "./Experience";
import * as THREE from "three";

import GSAP from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

let camera 

export default class Controls {
    constructor() {
        this.experience = Experience.getInstance();
        this.camera = this.experience.camera
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.lastMousePosition = {mouseX: 0, mouseY: 0};

        //moves with mouse
        window.addEventListener("mousemove", (e) => this.onMouseMove(e));

        //
        GSAP.registerPlugin(ScrollTrigger);

        this.timeline = new GSAP.timeline(),
        
        camera = this.camera;

        this.timeline.to(this.camera.actualPosition, 
            {x: 5,
            onUpdate: () => this.onMouseMove(this.lastMousePosition),
            scrollTrigger:{
                trigger: ".first-move",
                markers: true,
                start: "top top",
                end: "bottom bottom",
                scrub:1,
            }})
    }
    
    onMouseMove(e){
        const mouseX = e.clientX / window.innerWidth - .5; // Convert position to range between -0.5 and +0.5
        const mouseY = e.clientY / window.innerHeight - .5;
        this.camera.orbit(mouseX,mouseY)
        this.lastMousePosition=e
        //console.log("mouse X ", mouseX);
        //this.camera.activeCamera
    }






}