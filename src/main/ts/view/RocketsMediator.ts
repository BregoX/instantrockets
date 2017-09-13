import { inject, IEventDispatcher } from "robotlegs";
import { Mediator } from "robotlegs-pixi";
import { Rockets } from "./Rockets";
import { ApplicationStartedEvent } from "../platform/events/ApplicationStartedEvent";
import { UpdateFrameEvent } from "../platform/events/UpdateFrameEvent";
import { GameEvent } from "../controller/events/GameEvent";

export class RocketsMediator extends Mediator<Rockets> {
    public initialize() {
        this.addContextListener(GameEvent.RESOURCES_LOADED, this.onResourcesLoaded.bind(this));
        this.addContextListener(UpdateFrameEvent.NAME, this.onUpdateFrame.bind(this), UpdateFrameEvent)
    }

    public onResourcesLoaded():void {
        this.view.createBackground();
        this.view.createStation();
    }

    public onUpdateFrame(event:UpdateFrameEvent):void {
        this.view.render(event.getTime());
    }

    public destroy () {
        //do nothing
    }
}