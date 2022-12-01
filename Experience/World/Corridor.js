import * as THREE from "three";
import Experience from "../Experience.js";

export default class Corridor {
    constructor() {
        this.experience = Experience.getInstance();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.corridor = this.resources.items.corridor;

        this.setModel();

        this.scene.add(this.corridor.scene)

      

        console.log("cube")
        console.log('Corridor: ', this.corridor)
        console.log('Scene: ', this.scene)

    }


    setModel() {

        const recursiveSet = (children, setFunc) => {
            children.forEach(child => {
                setFunc(child);
                if (child.children)
                    recursiveSet(child.children, setFunc);
            })
        }
        
        const setShadows = (object) => {
            console.log(object);
            if(object instanceof THREE.Mesh){
            object.castShadow = true;
            object.receiveShadow = true;
            }
        }
        
        recursiveSet(this.corridor.scene.children, setShadows)

    }

    resize() {

    }

    update() {

    }
}