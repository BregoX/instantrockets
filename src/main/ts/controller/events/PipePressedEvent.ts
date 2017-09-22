import { Pipe } from '../../model/station/Pipe';
import { Event } from "robotlegs";

export class PipePressedEvent extends Event {
    public static Name:string = "PipePressedEvent";

    public pipe:Pipe;

    constructor(pipe:Pipe) {
        super(PipePressedEvent.Name);
        this.pipe = pipe;
    }
}
