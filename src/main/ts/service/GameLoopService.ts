import { injectable, inject, IEventDispatcher } from "robotlegs";
import { IAnimatable } from "../model/actions/IAnimatable";
import { UpdateFrameEvent } from "../platform/events/UpdateFrameEvent";

@injectable()
export class GameLoopService {
    private previousTime:number;
    private animatable:IAnimatable;
    
    @inject(IEventDispatcher)
    public eventDispatcher:IEventDispatcher;

    public constructor() {
        this.previousTime = 0;
    }

    public start(animatable:IAnimatable):void {
        this.animatable = animatable;
        this.eventDispatcher.addEventListener(UpdateFrameEvent.Name, this.update.bind(this), UpdateFrameEvent);
    }
    
    private update(time:number):void {
        let frameDuration = time - this.previousTime;
        this.updateFrame(frameDuration);
        this.previousTime = time;
    }
    
    private updateFrame(frameDuration:number):void {
        this.animatable.animate(frameDuration);
    }
}

