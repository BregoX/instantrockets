import { inject, injectable, IEventDispatcher } from "robotlegs";
import {GameEvent} from "./events/GameEvent";

@injectable()
export class BalanceModel {

    @inject(IEventDispatcher)
    eventDispatcher: IEventDispatcher;

    _scores:number = 0;

     public increaseScores(score:number) {
         this._scores += score;
         this.eventDispatcher.dispatchEvent(new GameEvent(GameEvent.SCORES_CHANGED));
     }
}
