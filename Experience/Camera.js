import Experience from "./Experience";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CameraHelper, Vector3 } from "three";

import GUI from 'lil-gui'; 


export default class Camera {
    constructor() {
        this.target = new THREE.Vector3(-7, 1.0, 5)

        this.cameraPosition = {}
        this.cameraPosition.desk = new THREE.Vector3(-5,3.12,1.14)

        this.actualPosition = this.cameraPosition.desk


        this.experience = Experience.getInstance();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.activeCamera = this.orthographicCamera
        console.log("ActiveCamera ",this.activeCamera);



        this.setControl();
        console.log("dev ", this.experience.dev)

        this.debug()

        
        //this.update();
    }



    createOrthographicCamera() {
        const left = -this.sizes.aspect * this.sizes.frustrum / 2;
        const top = this.sizes.frustrum / 2
        
        this.orthographicCamera = new THREE.OrthographicCamera(
            left, -left,
            top, -top,
            0,50
            
        );

        this.scene.add(this.orthographicCamera);
        this.orthographicCamera.position.y = 3;
        console.log("ortho ",this.orthographicCamera);
        this.orthographicCamera.position.set(...this.actualPosition)
        this.orthographicCamera.zoom = 1//2.
        //this.orthographicCamera.lookAt(this.target)
    }

    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(18, this.sizes.aspect, 0.1, 1000);
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.set(-4.11, 5, -2.5);


    }

    orbit(mouseX,mouseY) {
        this.activeCamera.position.x = this.actualPosition.x + 4*mouseX; //Change 4 with proportion of distance to target
        this.activeCamera.position.y = this.actualPosition.y + 2*mouseY;
    }

    setControl() {
        this.controls = new OrbitControls(this.activeCamera, this.canvas);
        this.controls.target = this.target;
        //this.controls.object.lookAt(this.target)
        this.update();
        console.log('set control ', this.controls);
        //this.controls.object.updateProjectionMatrix();

    }

    resize() {
        // Updating Perspective Camera on Resize

        //if (this.activeCamera == this.perspectiveCamera) {
            this.perspectiveCamera.aspect = this.sizes.aspect;
            this.perspectiveCamera.updateProjectionMatrix();
        //}
        //else {
            // Updating Orthographic Camera on Resize
            this.orthographicCamera.left =
                (-this.sizes.aspect * this.sizes.frustrum) / 2;
            this.orthographicCamera.right =
                (this.sizes.aspect * this.sizes.frustrum) / 2;
            this.orthographicCamera.top = this.sizes.frustrum / 2;
            this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
            this.orthographicCamera.updateProjectionMatrix();
        //}
    }

    update() {

        this.controls.update();
        //this.debug();

    }



    debug() {
        if(this.experience.dev){

            this.debug = {}
            this.debug.perspectiveCamera = new THREE.CameraHelper(this.perspectiveCamera)
            this.debug.orthographicCamera = new THREE.CameraHelper(this.orthographicCamera)
            console.log("Ortho ",this.orthographicCamera );
        console.log("OrthoHelper ",this.debug.orthographicCamera );
        console.log("debug perspective", this.debug.perspectiveCamera)
        this.scene.add(this.debug.perspectiveCamera)
        this.scene.add(this.debug.orthographicCamera)
        
        
        const gui = new GUI({title : "Camera"})
        gui.add( this.orthographicCamera.position, 'x', -10,-5)
        gui.add( this.orthographicCamera.position, 'y', -10,10)
        gui.add( this.orthographicCamera.position, 'z', -10,10)
        gui.add( this.orthographicCamera, 'zoom', 0,10)
        gui.add( {"RefreshZoom" : () => this.activeCamera.updateProjectionMatrix()}, "RefreshZoom" )
        
        
    }



        //const geoCube = new THREE.BoxGeometry(1,1,1)
        //const mat = new THREE.MeshBasicMaterial();
        //const mesh = new THREE.Mesh(geoCube, mat)
        ///this.scene.add(mesh)

        //mesh.position.copy(this.orthographicCamera.position);

        console.log("Position: ", this.controls);
        console.log('Target: ', this.controls.target);
        console.log('Controls: ', this.controls);
        //this.debugD.cube2.position.set(this.perspectiveCamera.position.x, this.perspectiveCamera.position.y, this.perspectiveCamera.position.z);
    }
}