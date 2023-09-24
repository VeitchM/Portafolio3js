import * as THREE from "three";
import Experience from "../Experience";
import recursiveSet from "../Utils/recursiveSet.js";

export default class Corridor {
  constructor() {
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.corridor = this.resources.items.corridor;
    this.corridorOptimized = this.resources.items.corridorOptimized;
    this.corridorOptimized.scene.name = this.corridor.scene.name = "Corridor";

    recursiveSet(this.corridorOptimized.scene.children, this.setShadows);
    this.setModel();

    this.scene.add(this.corridor.scene);

    console.log("Corridor: ", this.corridor);
    console.log("Scene: ", this.scene);
  }

  showCorridorOptimized() {
    console.log("Corridor Optimized");
    console.log("Scene before", this.scene);

    const children = this.scene.children;
    const isCorridor = (child) => child.name === "Corridor";
    const newChildren = [];
    children.forEach((element) => {
      if (!isCorridor(element)) newChildren.push(element);
    });
    this.scene.children = newChildren;
    this.scene.add(this.corridorOptimized.scene);
    console.log("Scene before", this.scene);
  }
  /*
    it s not possible, the method called merge meshes just merge geometryes, so materials are lost
    sceneToOneMesh(scene){
        console.log('sceneToConvert', scene)
        const meshes = []
        const addMeshes = (object) => {
            if (object.type === 'Mesh'){
                meshes.push(object)
            }
        }
        recursiveSet(scene.children,addMeshes)
        console.log('Meshes', meshes)
        const unifiedMesh = new THREE.Mesh(...meshes)
        console.log(unifiedMesh)
        return unifiedMesh;
    }
    */

  static objectTransition(object) {
    object.position.addVectors(
      object.originalPosition,
      new THREE.Vector3(0, 2, -1).multiplyScalar(1 - object.transition)
    );
    object.scale.copy(
      object.originalScale.clone().multiplyScalar(object.transition)
    );
  }

  setShadows = (object) => {
    //console.log(object);

    object.castShadow = true;
    object.receiveShadow = true;
  };
  setModel() {
    const setProperties = (object) => {
      if (object instanceof THREE.Mesh) {
        this.setShadows(object);
        object.transition = 0;
        object.originalScale = object.scale.clone();
        object.originalPosition = object.position.clone();
        //maybe put in a function in utils
        object.position.add(new THREE.Vector3(0, -5, 0)); //hides below the floor
        object.scale.multiplyScalar(object.transition);
      }
    };

    recursiveSet(this.corridor.scene.children, setProperties);
  }

  resize() {}

  update() {}
}
