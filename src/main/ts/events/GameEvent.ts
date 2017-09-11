import {Event}  from "robotlegs";

export class GameEvent extends Event {
    public static APPLICATION_STARTED:string = "APPLICATION_STARTED";
    public static RESOURCES_LOADED:string = "RESOURCES_LOADED";
}
