
import { Event }  from "robotlegs";

export class UpdateFrameEvent extends Event {
    public static Name:string = "UpdateFrameEvent";

    private time:number;

    public getTime() {
        return this.time;
    };

    public setTime(time:number):void {
        this.time = time;
    }

    constructor() {
        super(UpdateFrameEvent.Name);
        this.time = 0;
    }
}