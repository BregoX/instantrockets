import { Pipe } from '../Pipe';
import { Event } from "robotlegs";

export class PipeIndexChangedEvent extends Event {
    public static Name:string = "PipeIndexChangedEvent";

    public previousRow:number;
    public targetRow:number;
    public column:number;
    
    constructor(previousRow:number, targetRow:number, column:number) {
        super(PipeIndexChangedEvent.Name);
        this.previousRow = previousRow;
        this.targetRow = targetRow;
        this.column = column;
    }
}