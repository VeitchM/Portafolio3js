import * as THREE from "three";
import { floorPowerOfTwo } from "three/src/math/MathUtils.js";
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
        this.center = new THREE.Vector3(-6.6,0,4)
        this.resources.on("assetsLoaded", ()=> {
            this.corridor = new Corridor()
            this.floor()
            this.debug()
        })
        this.lighting = new Lighting();
        
    }

    themeSwitch(value) {
        console.log(this);
        this.lighting.themeSwitch(value);



    }
    
    floor() {
        const circleGeometry = new THREE.CircleGeometry(20, 32);
        const material = new THREE.MeshLambertMaterial({ color: 0xffffff });//Lambert is the second fastest material
        this.floor = new THREE.Mesh(circleGeometry, material);
        this.floor.receiveShadow = true
        this.floor.castShadow = true
        this.scene.add(this.floor);// Probaba si era eso por lo que no se proyectan sombras
        this.floor.rotation.x = -Math.PI/2
        this.floor.position.set(...this.center)
        this.floor.position.y = -1
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
