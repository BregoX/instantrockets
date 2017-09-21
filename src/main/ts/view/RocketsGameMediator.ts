import { inject, IEventDispatcher } from "robotlegs";
import { Mediator } from "robotlegs-pixi";
import { RocketsGameView } from "./RocketsGameView";
import { ApplicationStartedEvent } from "../platform/events/ApplicationStartedEvent";
import { UpdateFrameEvent } from "../platform/events/UpdateFrameEvent";
import { GameStartedEvent } from "../controller/events/GameStartedEvent";

export class RocketsGameMediator extends Mediator<RocketsGameView> {
    public initialize() {
        this.addContextListener(GameStartedEvent.Name, this.onGameStarted.bind(this));
    }

    public onGameStarted():void {
        this.view.createBackground();
        this.view.createStation();
    }

    public destroy () {
        //do nothing
    }
}