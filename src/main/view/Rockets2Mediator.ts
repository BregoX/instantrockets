import { inject } from "robotlegs";
import { Mediator } from "robotlegs-pixi";
import {Rockets2} from "./Rockets2";
import { IEventDispatcher } from "robotlegs";
import {GameEvent} from "../ts/events/GameEvent";

export class Rockets2Mediator extends Mediator<Rockets2> {


    @inject(IEventDispatcher)
    eventDispatcher: IEventDispatcher;

    initialize()
    {
        console.log("Rockets2Mediator initialized!");
        this.eventDispatcher.dispatchEvent(new GameEvent(GameEvent.APPLICATION_STARTED));
    }

    destroy () {
        console.log("Rockets2Mediator destroyed!");
    }

}
