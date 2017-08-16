import {Event}  from "robotlegs";
export class GameEvent extends Event {
    static APPLICATION_STARTED:string = "APPLICATION_STARTED";
    static SCORES_CHANGED:string = "SCORES_CHANGED";
}
