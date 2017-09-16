import { Pipe } from '../Pipe';
import { Event } from "robotlegs";

export class PipeRotatedEvent extends Event {
    public static Name:string = "PipeRotatedEvent";

    public pipe:Pipe;
    
    constructor(pipe:Pipe) {
        super(PipeRotatedEvent.Name);
        this.pipe = pipe;
    }
}