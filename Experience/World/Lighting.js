import * as THREE from "three";
import { PointLight } from "three";
import Experience from "../Experience.js";

export default class Lighting {


    constructor() {
        this.experience = Experience.getInstance();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.sunLight();
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.5))
        this.lightsDesktop();

        //this.debug();




    }

    sunLight() {
        this.sunLight = new THREE.DirectionalLight("#ffffff", 3)

        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(1024, 1024);
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.shadow.camera.bottom = -5
        this.sunLight.position.set(-10, 7, 3);

        const targetSunLight = new THREE.Object3D();
        targetSunLight.position.set(-5, 0, 1);
        this.scene.add(targetSunLight);
        this.sunLight.target = targetSunLight;

        this.scene.add(this.sunLight)
    }

    lightsDesktop() {
        this.lightsDesktop = {};

        const pointLight = (name, color, intensity, position) => {
            const light = new THREE.PointLight(color, intensity);
            light.position.copy(position);
            //light.castShadow = true;
            light.shadow.normalBias = 0.005
            //light.shadow.bias = -0.00001
                    
            //up.shadowMapWidth = 2048
            light.shadow.radius = 0;
            //light.shadow.blurSamples = 1
            this.lightsDesktop[name] = light
            this.scene.add(light);
            return light;
        }
        const lightDesktopInt = 0.05
        const up = pointLight("up",0xFFEDB7, .5+.3, new THREE.Vector3(-6.8,2.4,4))
        up.castShadow = true
        pointLight("down",0xFFEDB7, .3, new THREE.Vector3(-7.2,0.8,3.8))
        pointLight("topDesktop",0xFEFFF0, lightDesktopInt*3, new THREE.Vector3(-6.7113,1.3725-0.1,4.6715))
        pointLight("booksDown",0xB4C9FF, lightDesktopInt , new THREE.Vector3(-7.057,1.687,4.958))
        pointLight("booksUp",0xB4C9FF, .5, new THREE.Vector3(-7.05,1.9494,4.9587))
        pointLight("helmet",0xFFF200, lightDesktopInt, new THREE.Vector3(-6.2515,1.6871,4.959))
        pointLight("rope",0xFFD9DD, lightDesktopInt, new THREE.Vector3(-6.61,1.898, 4.96))
        pointLight("rope2",0xFFD9DD, lightDesktopInt, new THREE.Vector3(-6.119,1.898, 4.96))
        
     

    }

    debug() {
        if (this.experience.dev == 1) {

            const helper = new THREE.CameraHelper(this.sunLight.shadow.camera)
            this.scene.add(helper)

            Object.values(this.lightsDesktop).map((light) => {
                this.scene.add(new THREE.PointLightHelper(light,0.1))
                this.scene.add(new THREE.CameraHelper(light.shadow.camera))
            })

        }
    }

}
