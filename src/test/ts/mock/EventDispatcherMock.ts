import { IEventDispatcher, IEvent } from "robotlegs";

export class EventDispatcherMock implements IEventDispatcher {
    addEventListener(type: string, listener: Function, thisObject?: any, useCapture?: boolean, priority?: number): void {
        //do nothing
    }

    once(type: string, listener: Function, thisObject?: any, useCapture?: boolean, priority?: number): void {
        //do nothing
    }

    removeEventListener(type: string, listener: Function, thisObject?: any, useCapture?: boolean): void {
        //do nothing
    }

    hasEventListener(type: string): boolean {
        return false;
    }
    dispatchEvent(event: IEvent): boolean {
        return false;
    }
    willTrigger(type: string): boolean {
        return false;
    }
}