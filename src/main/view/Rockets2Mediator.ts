import { inject, IEventDispatcher } from "robotlegs";
import { Mediator } from "robotlegs-pixi";
import {Rockets2} from "./Rockets2";
import {GameEvent} from "../ts/events/GameEvent";
import {BalanceModel} from "../ts/BalanceModel";

export class Rockets2Mediator extends Mediator<Rockets2> {


    @inject(IEventDispatcher)
    eventDispatcher: IEventDispatcher;

    @inject(BalanceModel)
    balanceModel:BalanceModel;

    initialize()
    {
        console.log("Rockets2Mediator initialized!");
        debugger;
        this.eventDispatcher.dispatchEvent(new GameEvent(GameEvent.APPLICATION_STARTED));
    }

    destroy () {
        console.log("Rockets2Mediator destroyed!");
    }

}
