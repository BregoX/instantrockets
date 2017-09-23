import { IEventDispatcher, IEvent } from "robotlegs";
import { NotImplementedError } from "../../../main/ts/errors/NotImplementedError";

export class EventDispatcherMock implements IEventDispatcher {
    private dispatchedEvents:IEvent[];

    constructor() {
        this.dispatchedEvents = [];
    }

    public getLastDispatchedEvent():IEvent {
        return this.dispatchedEvents.pop();
    }

    addEventListener(type:string, listener:Function, thisObject?:any, useCapture?:boolean, priority?:number):void {
        throw new NotImplementedError();
    }

    once(type:string,listener:Function, thisObject?:any, useCapture?:boolean, priority?:number):void {
        throw new NotImplementedError();
    }

    removeEventListener(type:string, listener:Function, thisObject?:any, useCapture?:boolean):void {
        throw new NotImplementedError();
    }

    hasEventListener(type:string):boolean {
        throw new NotImplementedError();
    }

    dispatchEvent(event:IEvent):boolean {
        this.dispatchedEvents.push(event);
        return true;
    }

    willTrigger(type:string):boolean {
        throw new NotImplementedError();
    }
}