import { Pipe } from '../Pipe';
import { Event } from "robotlegs";

export class PipeUpdatedEvent extends Event {
    public static Name:string = "PipeUpdatedEvent";

    public pipe:Pipe;
    
    constructor(pipe:Pipe) {
        super(PipeUpdatedEvent.Name);
        this.pipe = pipe;
    }
}