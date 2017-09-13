
import { Event }  from "robotlegs";

export class UpdateFrameEvent extends Event {
    public static NAME:string = "UPDATE_FRAME";

    private time:number;
    public getTime() {
        return this.time;
    };

    constructor(time:number) {
        super(UpdateFrameEvent.NAME);
        this.time = time;
    }
}