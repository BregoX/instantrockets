
import { Event }  from "robotlegs";

export class UpdateFrameEvent extends Event {
    public static Name:string = "UpdateFrameEvent";

    private time:number;
    public getTime() {
        return this.time;
    };

    constructor(time:number) {
        super(UpdateFrameEvent.Name);
        this.time = time;
    }
}