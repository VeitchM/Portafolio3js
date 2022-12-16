import * as THREE from "three";
import Experience from "../Experience.js";
import recursiveSet from "../Utils/recursiveSet.js";

export default class Corridor {
    constructor() {
        this.experience = Experience.getInstance();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.corridor = this.resources.items.corridor;
        this.corridor.scene.name = "Corridor"

        this.setModel();

        this.scene.add(this.corridor.scene)




        console.log("cube")
        console.log('Corridor: ', this.corridor)
        console.log('Scene: ', this.scene)

    }



    static objectTransition(object) {
        object.position.addVectors(
                object.originalPosition,
                new THREE.Vector3(0,2,-1).multiplyScalar(1-object.transition))
        object.scale.copy(
            object.originalScale.clone().multiplyScalar(object.transition))
    }

    setModel() {



        const setShadows = (object) => {
            //console.log(object);

            object.castShadow = true;
            object.receiveShadow = true;
        }


        const setProperties = (object) => {
            if (object instanceof THREE.Mesh) {
                setShadows(object);
                object.transition = 0
                object.originalScale = object.scale.clone();
                object.originalPosition = object.position.clone();
                //maybe put in a function in utils
                object.position.add(new THREE.Vector3(0, -5, 0)) //hides below the floor
                object.scale.multiplyScalar(object.transition)

            }
        }

        recursiveSet(this.corridor.scene.children, setProperties)

    }

    resize() {

    }

    update() {

    }
}