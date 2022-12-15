import { EventEmitter } from "events";

export default class Sizes extends EventEmitter {
    _resize(){
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspect = this.width / this.height;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);
        this.emit("resize")
    }

    constructor() {
        super();
        this.frustrum = 5;
        this._resize();
        window.addEventListener("resize", ()=>{this._resize();
        })
        

    }

    
}