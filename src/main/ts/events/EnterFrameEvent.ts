import {Event}  from "robotlegs";

export class EnterFrameEvent extends Event {
    public static NAME:string = "ENTER_FRAME";

    private frameTime:number;

    constructor(frameTime:number) {
        super(EnterFrameEvent.NAME);
        this.frameTime = frameTime;
    }

    public getFrameTime():number {
        return this.frameTime;
    }
}