import Experience from "../Experience";
import * as THREE from "three";
import ASScroll from "@ashthornton/asscroll";
import GSAP from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger.js";




export default class Controls {


    constructor() {
        this.experience = Experience.getInstance();
        this.camera = this.experience.camera
        this.frameIndex = (name) => { return this.camera.frameIndex(name) }
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.world = this.experience.world;
        this.preloader = this.experience.preloader;
        this.lastMousePosition = { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 };
        this.setMouseController();


        //Make page visible
        document.getElementsByClassName("page")[0].style.visibility = "visible";


        this.preloader.on("enablecontrols", () => {
            GSAP.registerPlugin(ScrollTrigger);
            this.setThemeController();
            if (
                !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                )
            ) {
                console.log("android");
               // this.smoothScroll = this.setupASScroll();
            }
            console.log('notAndroid');
            console.log("userAgent", navigator.userAgent)
            this.setScrollController();

        })

    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.2,
            disableRaf: true,
        });

        GSAP.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement,
        });

        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            fixedMarkers: true,
        });

        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);

        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(
                    ".gsap-marker-start, .gsap-marker-end, [asscroll]"
                ),
            });
        });
        return asscroll;
    }




    setThemeController() {
        this.theme = {};
        const toggleButton = this.theme.toggleButton = document.querySelector(".toggle-button");
        const toggleCircle = this.theme.toggleCircle = document.querySelector(".toggle-circle")
        toggleButton.addEventListener("click", () => {
            toggleCircle.classList.toggle("slide");
            this.theme.value = this.theme.value === "dark" ? "light" : "dark";
            document.body.classList.toggle("theme-light");
            document.body.classList.toggle("theme-dark");
            this.themeSwitch(this.theme.value)
        })

    }

    themeSwitch(value) {
        console.log(this);
        this.world.themeSwitch(value);



    }

    setScrollController() {
        ScrollTrigger.matchMedia({

            all: () => {
                this.setProgressBar();
                // },

                // "(min-width: 969px)": () => {


                this.camera.timeline.to(this.camera, {
                    transition: this.frameIndex("sideDesk"),

                    onUpdate: () => {
                        this.camera.updateActualFrame(); //this.onMouseMove(this.lastMousePosition)
                    },
                    //onComplete: () => { console.log(this.camera) },
                    scrollTrigger: {
                        trigger: ".first-move",
                        // markers: true,
                        start: "top top",
                        end: "bottom top",
                        scrub: 4,
                        invalidateOnRefresh: true //toDo uncomment this
                    }
                }),
                    this.camera.timeline.to(this.camera, {
                        transition: this.frameIndex("balcon"),

                        onUpdate: () => {
                            this.camera.updateActualFrame(); //this.onMouseMove(this.lastMousePosition)
                        },
                        //onComplete: () => { console.log(this.camera) },
                        scrollTrigger: {
                            trigger: ".second-move",
                            // markers: true,
                            start: "top top",
                            end: "bottom top",
                            scrub: 4,
                            invalidateOnRefresh: true //toDo uncomment this
                        }
                    })


            }
        })
    }

    setProgressBar() {
        this.sections = document.querySelectorAll(".section");
        this.sections.forEach((section) => {
            this.progressWrapper =
                section.querySelector(".progress-wrapper");
            this.progressBar = section.querySelector(".progress-bar");

            if (section.classList.contains("right")) {
                GSAP.to(section, {
                    borderTopLeftRadius: 10,
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "top top",
                        scrub: 0.6,
                    },
                });
                GSAP.to(section, {
                    borderBottomLeftRadius: 700,
                    scrollTrigger: {
                        trigger: section,
                        start: "bottom bottom",
                        end: "bottom top",
                        scrub: 0.6,
                    },
                });
            } else {
                GSAP.to(section, {
                    borderTopRightRadius: 10,
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "top top",
                        scrub: 0.6,
                    },
                });
                GSAP.to(section, {
                    borderBottomRightRadius: 700,
                    scrollTrigger: {
                        trigger: section,
                        start: "bottom bottom",
                        end: "bottom top",
                        scrub: 0.6,
                    },
                });
            }
            GSAP.from(this.progressBar, {
                scaleY: 0,
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.4,
                    pin: this.progressWrapper,
                    pinSpacing: false,
                },
            });
        });
    }

    setMouseController() {
        window.addEventListener("mousemove", (e) => this.onMouseMove(e));//TODO anular al principio

        this.mouseLerp = {
            current: { mouseX: 0, mouseY: 0 },
            target: { mouseX: 0, mouseY: 0 },
            ease: 0.01
        };
    }

    onMouseMove(e) {
        const mouseX = e.clientX / window.innerWidth - .5; // Convert position to range between -0.5 and +0.5
        const mouseY = e.clientY / window.innerHeight - .5;
        this.mouseLerp.target = { mouseX: mouseX, mouseY: mouseY }
        this.lastMousePosition = e


    }




    /** update use by experience frame by frame to refresh */
    update() {
        this.mouseLerp.current = GSAP.utils.interpolate(this.mouseLerp.current, this.mouseLerp.target, this.mouseLerp.ease)
        this.camera.orbit(this.mouseLerp.current.mouseX, this.mouseLerp.current.mouseY)


    }






}


