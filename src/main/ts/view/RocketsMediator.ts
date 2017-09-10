import {inject, IEventDispatcher} from "robotlegs";
import {Mediator} from "robotlegs-pixi";
import {Rockets} from "./Rockets";
import {GameEvent} from "../events/GameEvent";

export class RocketsMediator extends Mediator<Rockets> {
    @inject(IEventDispatcher)
    eventDispatcher: IEventDispatcher;

    initialize()
    {
        console.log("RocketsMediator initialized!");
        this.eventDispatcher.dispatchEvent(new GameEvent(GameEvent.APPLICATION_STARTED));
    }

    destroy () {
        console.log("RocketsMediator destroyed!");
    }
}
