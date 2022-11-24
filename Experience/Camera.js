import Experience from "./Experience";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector3 } from "three";


export default class Camera {
    constructor() {
        this.target = new THREE.Vector3(-6.2,1.5, 4)
        this.experience = Experience.getInstance();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.createPerspectiveCamera();
        this.createOrthographicCamera();

        
        
        this.setControl();
        console.log("dev ",this.experience.dev)
        if(this.experience.dev==1){
            
            //this.debug()
            this.scene.add(
                new THREE.GridHelper(20,20),
                new THREE.AxesHelper(5));
            console.log("dev")
        }
        //this.update();
    }

  

    createOrthographicCamera() {
        this.frustrum = 5;
        const left = -this.sizes.aspects * this.frustrum / 2;
        const top = this.frustrum/2 
        
        this.orthographicCamera = new THREE.OrthographicCamera(
            left, -left , 
            top, -top
        );
        this.scene.add(this.orthographicCamera);
        this.orthographicCamera.position.z = 3;
     }

    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(18, this.sizes.aspect, 0.1, 1000);
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.set(-4.11,3, -2.5);
      

    }
    setControl() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.target= this.target;
        //this.controls.object.lookAt(this.target)
        this.update();
        console.log('set control ',this.controls);
        //this.controls.object.updateProjectionMatrix();
        
    }

    resize() {
        // Updating Perspective Camera on Resize
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        // Updating Orthographic Camera on Resize
        this.orthographicCamera.left =
            (-this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.right =
            (this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.top = this.sizes.frustrum / 2;
        this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
        this.orthographicCamera.updateProjectionMatrix();
    }

    update() {
      
        this.controls.update();
        //this.debug();
        
    }

    initDebug(){
        this.debugD = {};
        this.debugD.geometry = new THREE.BoxGeometry();
        this.debugD.material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        this.debugD.cube = new THREE.Mesh(this.debugD.geometry, this.debugD.material);
        this.debugD.cube2 = new THREE.Mesh(this.debugD.geometry, this.debugD.material);
        this.scene.add(this.debugD.cube,this.debugD.cube2);
        
    }

    debug(){
        if (!this.debugD){
            console.log('init');
            this.initDebug();
            this.debugD.init = true;
        }
        this.debugD.cube.position.set(this.target.x, this.target.y, this.target.z);
        console.log("Position: ",this.controls);
        console.log('Target: ',this.controls.target);
        console.log('Controls: ',this.controls);
        this.debugD.cube2.position.set(this.perspectiveCamera.position.x, this.perspectiveCamera.position.y, this.perspectiveCamera.position.z);
    }
}