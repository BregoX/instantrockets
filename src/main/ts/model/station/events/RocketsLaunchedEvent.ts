import { Event } from "robotlegs";

export class RocketsLaunchedEvent extends Event {
    public static Name:string = "RocketsLaunchedEvent";

    constructor() {
        super(RocketsLaunchedEvent.Name);
    }
}