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
        this.lastMousePosition = { clientX: window.innerWidth/2, clientY: window.innerHeight/2 };

        //moves with mouse
        window.addEventListener("mousemove", (e) => this.onMouseMove(e));
        this.mouseLerp = {
            current : {mouseX: 0, mouseY:0},
            target : {mouseX: 0, mouseY: 0},
            ease: 0.01
        }

        
        //
        GSAP.registerPlugin(ScrollTrigger);

        this.timeline = new GSAP.timeline(),

            camera = this.camera;

        this.timeline.to(this.camera,
            {
                transition: 1,

                onUpdate: () => {
                    this.camera.updateActualFrame();
                    this.onMouseMove(this.lastMousePosition)
                },
                //onComplete: () => { console.log(this.camera) },
                scrollTrigger: {
                    trigger: ".first-move",
                    markers: true,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                }
            })
    }

    onMouseMove(e) {
        const mouseX = e.clientX / window.innerWidth - .5; // Convert position to range between -0.5 and +0.5
        const mouseY = e.clientY / window.innerHeight - .5;
        this.mouseLerp.target = { mouseX:mouseX, mouseY:mouseY}
        console.log(this.mouseLerp.current);
        this.lastMousePosition = e


    }

    update(){
        this.mouseLerp.current = GSAP.utils.interpolate(this.mouseLerp.current, this.mouseLerp.target,this.mouseLerp.ease)
        this.camera.orbit(this.mouseLerp.current.mouseX, this.mouseLerp.current.mouseY)


    }






}