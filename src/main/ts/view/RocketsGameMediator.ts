import { inject, IEventDispatcher } from "robotlegs";
import { Mediator } from "robotlegs-pixi";
import { RocketsGameView } from "./RocketsGameView";
import { ApplicationStartedEvent } from "../platform/events/ApplicationStartedEvent";
import { UpdateFrameEvent } from "../platform/events/UpdateFrameEvent";
import { GameEvent } from "../controller/events/GameEvent";

export class RocketsMediator extends Mediator<RocketsGameView> {
    public initialize() {
        this.addContextListener(GameEvent.RESOURCES_LOADED, this.onResourcesLoaded.bind(this));
    }

    public onResourcesLoaded():void {
        this.view.createBackground();
        this.view.createStation();
    }

    public destroy () {
        //do nothing
    }
}