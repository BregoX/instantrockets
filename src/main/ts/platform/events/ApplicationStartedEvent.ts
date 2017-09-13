import { Event }  from "robotlegs";

export class ApplicationStartedEvent extends Event {
    public static NAME:string = "APPLICATION_STARTED";

    constructor() {
        super(ApplicationStartedEvent.NAME);
    }
    public time:number;
}