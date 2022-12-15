import Experience from "./Experience";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CameraHelper, Vector3 } from "three";

import GUI from 'lil-gui';


export default class Camera {
    constructor() {
        //this.actualFrame.target = new THREE.Vector3(-7, 1.0, 5)


        this.setFrames();



        this.experience = Experience.getInstance();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.activeCamera = this.orthographicCamera



        this.setControl();
        console.log("dev ", this.experience.dev)

        this.debug()

        this.orbit(0, 0)
        this.activeCamera.zoom = this.actualFrame.zoom;
        this.activeCamera.updateProjectionMatrix();
        console.log("Camera", this);

    }

    setFrames() {
        this.cameraFrames = {};

        this.cameraFrames.desk = {
            position: new THREE.Vector3(-5-.8, 3.12-.35, 1.14),
            target: new THREE.Vector3(-7-.8, 1.0-.35, 5),
            zoom: .75
        };

        this.cameraFrames.sideDesk = { ...this.shiftFrame(this.cameraFrames.desk, 1.8, .35), zoom: 2 };
        this.cameraFrames.prueba = { ...this.shiftFrame(this.cameraFrames.desk, 1.5, 0), zoom: 2 };
        console.log(this.cameraFrames);

        /**  Defines the order of the frames for transitions */
        this.frames = ["desk", "sideDesk"];
        // Actual frame exist for doing changes from the given state by the scroll controller
        this.actualFrame = { ...this.cameraFrames.desk };
        this.transition = 0;
    }

    /** It's update the actual frame from the transition class attribute */
    updateActualFrame() {

        let toFrame = this.frames[Math.ceil(this.transition)]
        let fromFrame = this.frames[Math.floor(this.transition)]

        //could be optimized, setting only when started or finished, or maybe i should let the builder improve it






        for (const attribute of ["position", "target"]) {
            let fromVector = this.cameraFrames[fromFrame][attribute];
            let toVector = this.cameraFrames[toFrame][attribute];
            this.actualFrame[attribute] = fromVector.clone().multiplyScalar(1 - this.transition % 1)
                .add(toVector.clone().multiplyScalar(this.transition % 1));
        }
        
        this.activeCamera.zoom =this.actualFrame.zoom = this.cameraFrames[fromFrame].zoom * (1-this.transition % 1) + this.cameraFrames[toFrame].zoom * (this.transition % 1) 
        this.activeCamera.updateProjectionMatrix()
        
        this.controls.target = this.actualFrame.target


    }

    /** Gives a clone of frame shifted by the given cordinates)*/  
    shiftFrame(cameraFrame, x, y) {
        const direction = cameraFrame.target.clone().addScaledVector(cameraFrame.position, -1)
        
        let vectorX = new Vector3(0, 1.0, 0).cross(direction)
        console.log("shift1",cameraFrame,"vX",vectorX,x,y,"direction",direction);
        vectorX = vectorX.normalize().multiplyScalar(x? x: 0)
        console.log("shift2",cameraFrame,"vX",vectorX,x,y,"direction",direction);

        let vectorY = new Vector3(0, 1.0, 0).multiplyScalar(y ? y : 0)

        const clon = { ...cameraFrame }

        clon.target = cameraFrame.target.clone()
        clon.target.add(vectorX).add(vectorY)
        clon.position = cameraFrame.position.clone()
        clon.position.add(vectorX).add(vectorY)
        console.log("shift",cameraFrame,"vX",vectorX,"vY",vectorY,x,y,clon,"direction",direction);

        return clon
    }

    orbit(mouseX, mouseY) {
        this.activeCamera.position.x = this.actualFrame.position.x + 4 * mouseX; //Change 4 with proportion of distance to target
        this.activeCamera.position.y = this.actualFrame.position.y + 2 * mouseY;
        this.activeCamera.position.z = this.actualFrame.position.z;
    }

    createOrthographicCamera() {
        const left = -this.sizes.aspect * this.sizes.frustrum / 2;

        const top = this.sizes.frustrum / 2

        this.orthographicCamera = new THREE.OrthographicCamera(
            left, -left,
            top, -top,
            0, 50

        );

        this.scene.add(this.orthographicCamera);
        //this.orthographicCamera.position.y = 3;
        //this.orthographicCamera.position.copy(this.actualFrame.position)
        this.orthographicCamera.zoom = 1//2.
    }

    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(18, this.sizes.aspect, 0.1, 1000);
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.set(-4.11, 5, -2.5);

        //this.orthographicCamera.lookAt(this.actualFrame.target)
    }




    setControl() {
        this.controls = new OrbitControls(this.activeCamera, this.canvas);
        this.controls.target = this.actualFrame.target;
        //this.controls.object.lookAt(this.actualFrame.target)

        this.update();
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
        //console.log(this.activeCamera);
        //this.debug();

    }



    debug() {
        if (this.experience.dev) {

            this.debug = {}
            this.debug.perspectiveCamera = new THREE.CameraHelper(this.perspectiveCamera)
            this.debug.orthographicCamera = new THREE.CameraHelper(this.orthographicCamera)
            console.log("Ortho ", this.orthographicCamera);
            this.scene.add(this.debug.perspectiveCamera)
            this.scene.add(this.debug.orthographicCamera)


            const gui = new GUI({ title: "Camera" })
            gui.add(this.orthographicCamera.position, 'x', -10, -5)
            gui.add(this.orthographicCamera.position, 'y', -10, 10)
            gui.add(this.orthographicCamera.position, 'z', -10, 10)
            gui.add({ "RefreshZoom": () => this.activeCamera.updateProjectionMatrix() }, "RefreshZoom")




            //const geoCube = new THREE.BoxGeometry(1,1,1)
            gui.add(this.orthographicCamera, 'zoom', 0, 10)
            //const mat = new THREE.MeshBasicMaterial();

            //const mesh = new THREE.Mesh(geoCube, mat)
            ///this.scene.add(mesh)

            //mesh.position.copy(this.orthographicCamera.position);

            console.log("Position: ", this.controls);
            console.log('Controls: ', this.controls);
        }
    }
}
//this.debugD.cube2.position.set(this.perspectiveCamera.position.x, this.perspectiveCamera.position.y, this.perspectiveCamera.position.z);
