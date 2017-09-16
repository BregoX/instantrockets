import { Pipe } from '../Pipe';
import { Event } from "robotlegs";

export class PipeRocketConnectedEvent extends Event {
    public static Name:string = "PipeRocketConnectedEvent";

    public pipe:Pipe;
    
    constructor(pipe:Pipe) {
        super(PipeRocketConnectedEvent.Name);
        this.pipe = pipe;
    }
}