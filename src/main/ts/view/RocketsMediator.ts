import { inject, IEventDispatcher } from "robotlegs";
import { Mediator } from "robotlegs-pixi";
import { Rockets } from "./Rockets";
import { GameEvent } from "../events/GameEvent";

export class RocketsMediator extends Mediator<Rockets> {
    public initialize() {
        this.addContextListener(GameEvent.RESOURCES_LOADED, this.onResourcesLoaded.bind(this));
        this.dispatch(new GameEvent(GameEvent.APPLICATION_STARTED));
    }

    public onResourcesLoaded():void {
        this.view.createBackground();
        this.view.createStation();
    }

    public destroy () {
        //do nothing
    }
}
