import { Rocket } from '../Rocket';
import { Event } from "robotlegs";

export class RocketCreatedEvent extends Event {
    public static Name:string = "RocketCreatedEvent";

    public rocket:Rocket;
    
    constructor(rocket:Rocket) {
        super(RocketCreatedEvent.Name);
        this.rocket = rocket;
    }
}