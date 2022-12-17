import { EventEmitter } from "events";
import Experience from "../Experience.js";
import GSAP from "gsap";
import convert from "../Utils/covertDivsToSpans.js";
import * as THREE from "three"
import { Vector3 } from "three";
import recursiveSet from "../Utils/recursiveSet.js";
import Corridor from "../World/Corridor.js";

export default class Preloader extends EventEmitter {
    constructor() {
        super();
        this.experience = Experience.getInstance();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        });

        //window.removeEventListener("wheel",this.onScroll.bind(this))

        this.setAssets();
        this.world.on("worldReady", () => {
            this.playIntro();
        });
    }

    setAssets() {
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-description"));
        convert(document.querySelector(".hero-second-subheading"));
        convert(document.querySelector(".second-sub"));


    }

    //onScroll(e){
    //     if(canScroll)
    //         window.removeEventListener("wheel",this.onScroll.bind(this))
    //  }


    reappearParameters(cssClass) {
        return [cssClass + " .animatedis", {
            yPercent: -100,
            stagger: 0.05,
            ease: "back.out(1.7)",
        }]
    }


    playIntro() {

        this.introCube();


        const frameIndex = (name) => { return this.camera.frameIndex(name) }
        console.log("intro2", frameIndex("intro2"));
        const timeline = this.camera.timeline


      
        timeline.to(".preloader", {
            opacity: 0,
            onComplete: () => {
               document.querySelector(".preloader").remove()
             
            }

        })
            .to(this.introCube.scale, {
            x: 1, y: 1, z: 1,
            duration:1,
            ease: "power3.inOut(2.5)",
        })
            .to(this.camera, {
                transition: frameIndex('intro2'),
                ease: "power3.inOut(2.5)",
                delay: 0.5,//1,
                duration: 2,//3,
                onUpdate: () => {
                    this.camera.updateActualFrame();
                },

            })
            .to(...this.reappearParameters(".intro-text"))
            .to(".intro-text .animatedis", {
                yPercent: 0,
                stagger: 0.05,
                delay: 0.5,
                ease: "back.out(1.7)",
            }, "spinzoom")
        timeline.to(this.introCube.rotation, {
            y: Math.PI * 3,
            ease: "power3.inOut(2.5)",
            delay: 0.6,//1,
            duration: 2,//3,)
        }, "spinzoom")
        timeline.to(this.camera, {
            transition: frameIndex("desk"),
            ease: "power3.inOut(2.5)",
            delay: 0.6,//1,
            duration: 2,//3,
            onUpdate: () => {
                this.camera.updateActualFrame();
            },

        }, "spinzoom")
        timeline.to(this.introCube.scale, {
            x: 4,
            z: 2,
            ease: "power3.inOut(2.5)",
            delay: 0,//1,
            duration: 1.2,//3,)
        },)
        timeline.to(this.introCube.scale, {
            x: 0,
            y: 0,
            z: 0,
            ease: "power3.in(2.5)",
            delay: 0,//1,
            duration: 0.8,//3,)
            onComplete: () => {
                //console.log("secondIntro");
                this.playSecondIntro()
            }
        },)


        console.log("playIntro");


    }

    introCube() {
        this.introCube = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshStandardMaterial());
        this.introCube.castShadow = true;
        this.introCube.receiveShadow = true;
        this.introCube.position.copy(this.camera.cameraFrames.desk.target);
        this.introCube.lookAt(this.camera.cameraFrames.desk.position);
        this.introCube.rotateY(Math.PI / 4);
        let direction = this.camera.actualFrame.target.clone().addScaledVector(this.camera.actualFrame.position, -1).normalize();
        this.introCube.rotateOnWorldAxis(new Vector3(0, 1, 0).cross(direction), Math.PI * 1 / 2 - direction.angleTo(new Vector3(0, 1, 0)));
        this.introCube.scale.set(0, 0, 0);
        this.scene.add(this.introCube);
    }

    playSecondIntro() {
        console.log("Second Intro init");
        const timeline = new GSAP.timeline()
        const corridor = this.scene.children.find(children => children.name == 'Corridor');

        const setProperties = (object) => {
            if (object instanceof THREE.Mesh) {
                timeline.to(object, {
                    transition: 1,
                    ease: "power3.out(2)",
                    delay: Math.random() * 5,
                    duration: Math.random() * 2 + .1,

                    onUpdate: () => { Corridor.objectTransition(object); }
                }, "corridor")


            }

        };

        recursiveSet(corridor.children, setProperties);
        timeline.to(...this.reappearParameters(".hero-main-title"), "corridor")
        timeline.to(...this.reappearParameters(".hero-main-description"), "corridor")
        timeline.to(...this.reappearParameters(".hero-second-subheading"), "corridor")
        timeline.to(...this.reappearParameters(".second-sub"), "corridor")
        timeline.to(".toggle-bar",{opacity:1},"corridor")
        setTimeout( () => {console.log(this); this.emit('enablecontrols')},5000)


        this.experience.world.lighting.showCorridor()





        //element.position.add(hideTranslation)
        //creo que ni estan en la scena





    }
}