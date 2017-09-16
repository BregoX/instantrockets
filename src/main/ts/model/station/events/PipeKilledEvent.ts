import { Pipe } from '../Pipe';
import { Event } from "robotlegs";

export class PipeKilledEvent extends Event {
    public static Name:string = "PipeKilledEvent";

    public pipe:Pipe;
    
    constructor(pipe:Pipe) {
        super(PipeKilledEvent.Name);
        this.pipe = pipe;
    }
}