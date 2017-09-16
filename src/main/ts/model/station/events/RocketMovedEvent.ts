import { Rocket } from '../Rocket';
import { Event } from "robotlegs";

export class RocketMovedEvent extends Event {
    public static Name:string = "RocketMovedEvent";

    public rocket:Rocket;
    
    constructor(rocket:Rocket) {
        super(RocketMovedEvent.Name);
        this.rocket = rocket;
    }
}