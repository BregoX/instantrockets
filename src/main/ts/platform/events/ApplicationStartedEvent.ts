import { Event }  from "robotlegs";

export class ApplicationStartedEvent extends Event {
    public static Name:string = "ApplicationStartedEvent";

    constructor() {
        super(ApplicationStartedEvent.Name);
    }
    public time:number;
}