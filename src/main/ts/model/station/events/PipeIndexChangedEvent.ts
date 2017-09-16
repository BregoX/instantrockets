import { Pipe } from '../Pipe';
import { Event } from "robotlegs";

export class PipeIndexChangedEvent extends Event {
    public static Name:string = "PipeIndexChangedEvent";

    public pipe:Pipe;
    
    constructor(pipe:Pipe) {
        super(PipeIndexChangedEvent.Name);
        this.pipe = pipe;
    }
}