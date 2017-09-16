import { Pipe } from '../Pipe';
import { Event } from "robotlegs";

export class PipeSteamConnectedEvent extends Event {
    public static Name:string = "PipeSteamConnectedEvent";

    public pipe:Pipe;
    
    constructor(pipe:Pipe) {
        super(PipeSteamConnectedEvent.Name);
        this.pipe = pipe;
    }
}