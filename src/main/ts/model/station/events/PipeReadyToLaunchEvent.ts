import { Pipe } from '../Pipe';
import { Event } from "robotlegs";

export class PipeReadyToLaunchEvent extends Event {
    public static Name:string = "PipeReadyToLaunchEvent";

    public pipe:Pipe;
    
    constructor(pipe:Pipe) {
        super(PipeReadyToLaunchEvent.Name);
        this.pipe = pipe;
    }
}