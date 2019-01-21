import {PipePressedEvent} from "../../events/PipePressedEvent";

export class PipePressedEventWrapper {

    private pipePressedEvent:PipePressedEvent;

    public setupEvent(event:PipePressedEvent) {
        this.pipePressedEvent = event;
    }

    public getEvent():PipePressedEvent {
        return this.pipePressedEvent;
    }
}