import { Event } from "robotlegs";

export class GameStartedEvent extends Event {
    public static Name:string = "GameStartedEvent";

    constructor() {
        super(GameStartedEvent.Name);
    }
}
