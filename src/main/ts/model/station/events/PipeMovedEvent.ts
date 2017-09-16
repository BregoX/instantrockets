import { Pipe } from '../Pipe';
import { Event } from "robotlegs";

export class PipeMovedEvent extends Event {
    public static Name:string = "PipeMovedEvent";

    public pipe:Pipe;
    
    constructor(pipe:Pipe) {
        super(PipeMovedEvent.Name);
        this.pipe = pipe;
    }
}