import { EventEmitter } from "events";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import Experience from "../Experience";
import assets from "./assets";

export default class Resources extends EventEmitter {
    constructor(assets) {
        super()
        this.experience = Experience.getInstance();
        // this.renderer = this.experience.renderer; // is it neccesary?
        this.assets = assets;


        this.items = {}
        this.queue = this.assets.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
        
    }
    
    setLoaders() {
        this.loaders = {
            gltfLoader: new GLTFLoader(),
            dracoLoader: new DRACOLoader(),
        }
        this.loaders.dracoLoader.setDecoderPath("/draco/")
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
    }
    
    startLoading() {
        //console.log("resources set Loaders")
        for (const asset of this.assets) {
            if (asset.type == "glbModel") {
                this.loaders.gltfLoader.load(asset.path, (file) => {
                    this.singleAssetLoaded(asset, file);
                    //console.log("Loaded " ,asset.name)
                })
            }
            //can add others types of files here
        }
    }

    singleAssetLoaded(asset, file) {
        this.loaded++
        this.items[asset.name] = file;
        this.loaded === this.queue && this.emit("assetsLoaded") 
    }


}
