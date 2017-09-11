import {Container} from "pixi.js";
import {IAnimatable} from "../IAnimatable";

export class View extends Container {
    private previousTime:number;
    private animatables:Array<IAnimatable> = [];

    constructor() {
        super();
        this.previousTime = 0;
    }

    public addAnimatable(animatable:IAnimatable) {
        this.animatables.push(animatable);
    }

    public removeAnimatable(animatable:IAnimatable) {
        this.animatables.splice(this.animatables.indexOf(animatable), 1);
    }

    public render(time:number) {
        let frameDuration = time - this.previousTime;
        this.update(frameDuration);
        this.previousTime = time;
    }

    protected update(frameDuration:number) {
        for(let animatable of this.animatables) {
            animatable.animate(frameDuration);
        }
    }
}

