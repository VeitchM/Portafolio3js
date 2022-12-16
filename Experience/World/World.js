import EventEmitter from "events";
import * as THREE from "three";
import { floorPowerOfTwo } from "three/src/math/MathUtils.js";
import Experience from "../Experience.js";
import Corridor from './Corridor'
import Lighting from "./Lighting"

export default class World extends EventEmitter {
    constructor() {
        super();
        this.experience = Experience.getInstance();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.center = new THREE.Vector3(-6.6,0,4)
       
        this.background()
        this.lighting = new Lighting();
        this.resources.on("assetsLoaded", ()=> {
            this.corridor = new Corridor()
            this.debug()
            this.emit("worldReady")
        })
        
    }

    themeSwitch(value) {
        console.log(this);
        this.lighting.themeSwitch(value);





    }


      /** Use setFunc Callback on each child of children and in the children of child recursevely */
      recursiveSet(children, setFunc) {
        children.forEach(child => {
            setFunc(child);
            if (child.children)
                recursiveSet(child.children, setFunc);
        })
    }
    
    background() {
        const planeGeometry = new THREE.CircleGeometry(80, 4);
        const material = new THREE.MeshLambertMaterial({ color: 0xffffff });//Lambert is the second fastest material
        this.floor = new THREE.Mesh(planeGeometry, material);
        //this.floor.scale.set(0.1,.1,.1)
        this.floor.receiveShadow = true
        this.floor.rotation.x = -Math.PI/2
        this.floor.position.set(...this.center)
        this.floor.position.y = -2
        this.scene.add(this.floor);// Probaba si era eso por lo que no se proyectan sombras



    }

 
    
    resize() {
        
    }
    
    update() {
        
    }

    debug() {
        if(this.experience.dev){
            
            this.scene.add(
                new THREE.GridHelper(20, 20),
                new THREE.AxesHelper(5));
            }
            console.log(this.scene)
        }
    }
