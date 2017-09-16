import { Pipe } from '../Pipe';
import { Event } from "robotlegs";

export class PipeCreatedEvent extends Event {
    public static Name:string = "PipeCreatedEvent";

    public pipe:Pipe;
    
    constructor(pipe:Pipe) {
        super(PipeCreatedEvent.Name);
        this.pipe = pipe;
    }
}