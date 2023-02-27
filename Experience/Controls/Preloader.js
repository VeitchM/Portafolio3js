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
        this.timeline = new GSAP.timeline()
        this.timelineDescription  = new GSAP.timeline()
        this.timelineStudy  = new GSAP.timeline()

        this.homePageClasses = [".hero-main-title", ".hero-main-description", ".hero-second-subheading", ".second-sub"]

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
        this.timeline.set(".animatedis", { yPercent: 100 })

    }

    //onScroll(e){
    //     if(canScroll)
    //         window.removeEventListener("wheel",this.onScroll.bind(this))
    //  }





    playIntro() {

        this.introCube();


        const frameIndex = (name) => { return this.camera.frameIndex(name) }
        const timeline = this.camera.timeline


        timeline.to(".preloader", {
            opacity: 0,
            onComplete: () => {
                document.querySelector(".preloader").remove()

            }

        })
            .to(this.introCube.scale, {
                x: 1, y: 1, z: 1,
                duration: 1,
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
                yPercent: 100,
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
        const corridor = this.scene.children.find(children => children.name == 'Corridor');

        const setProperties = (object) => {
            if (object instanceof THREE.Mesh) {
                this.timeline.to(object, {
                    transition: 1,
                    //ease: "power3.out(2)",
                    ease: 'none.none',
                    delay: Math.random() * 5,
                    duration: Math.random() * 2 + .1,

                    onUpdate: () => { Corridor.objectTransition(object); }
                }, "corridor")


            }

        };

        recursiveSet(corridor.children, setProperties);
        this.homePageAppear();


        setTimeout(() => {
            this.emit('enablecontrols');
            this.experience.world.corridor.showCorridorOptimized()
            this.experience.world.lighting.showCorridor()
            this.timeline.to(".arrow-svg-wrapper", { opacity: 1 })
            this.timeline.to(".toggle-theme", { opacity: 1 })
            this.timeline.to(".toggle-language", { opacity: 1 }, "<")




        }, 8000)







        //element.position.add(hideTranslation)
        //creo que ni estan en la scena





    }

    homePageAppear() {
        this.homePageApply(this.reappearParameters)
    }

    homePageApply(callBack) {
        console.log(this.timeline)
        this.timeline.to(...callBack(".hero-main-title"), "corridor");
        this.timeline.to(...callBack(".hero-main-description"), "<");
        this.timeline.to(...callBack(".hero-second-subheading"), "<");
        this.timeline.to(...callBack(".second-sub"), "<");
    }
    homePageDissappear() {
        this.homePageApply(this.dissapearParameters)
    }

    reappearParameters(cssClass, duration = 1, stagger = 0.05, delay = 0) {
        return [cssClass + " .animatedis", {
            yPercent: 0,
            stagger: stagger,
            duration: duration,
            delay: delay,
            ease: "back.out(1.7)",
        }]
    }
    dissapearParameters(cssClass, duration = 1, stagger = 0.05, delay = 0) {
        return [cssClass + " .animatedis", {
            yPercent: 100,
            stagger: stagger,
            duration: duration,
            delay: delay,
            ease: "back.out(1.7)",
        }]
    }

    translateHome(language) {
        //Horrible dont do at home
        let descriptionText 
        let studyText
        if (language == 'es') {
             descriptionText = 'Estudiante Avanzado de Ingenieria Informatica'
             studyText = 'ESTUDIANDO EN'
        }
        else {
             descriptionText = 'Advanced student of software engineering'
             studyText = 'STUDYNG AT'
        }

        const description = document.querySelector(".hero-main-description");
        const study = document.querySelector(".hero-second-subheading")
        const tlDesc = this.timelineDescription
        const tlStud = this.timelineStudy

        tlDesc.to(...this.dissapearParameters(".hero-main-description", 0.5, 0.02)).then( () => {
            description.innerHTML = descriptionText
            convert(description);
            tlDesc.set(".hero-main-description .animatedis ", { yPercent: 100 })
            tlDesc.to(...this.reappearParameters(".hero-main-description", 0.5, 0.02));

        });

        tlStud.to(...this.dissapearParameters(".hero-second-subheading", 0.5)).then(() => {
            console.log('translateHome')
            study.innerHTML = studyText
            convert(study);
            tlStud.set(".hero-second-subheading .animatedis ", { yPercent: 100 })
            tlStud.to(...this.reappearParameters(".hero-second-subheading", 0.5));

        });

        //convert(document.querySelector(".hero-second-subheading"));
    }
}