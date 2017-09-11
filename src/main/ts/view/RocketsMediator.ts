import {inject, IEventDispatcher} from "robotlegs";
import {Mediator} from "robotlegs-pixi";
import {Rockets} from "./Rockets";
import {GameEvent} from "../events/GameEvent";
import { EnterFrameEvent } from '../events/EnterFrameEvent';

export class RocketsMediator extends Mediator<Rockets> {
    public initialize() {
        this.addContextListener(GameEvent.RESOURCES_LOADED, this.createBackground.bind(this));
        
        this.dispatch(new GameEvent(GameEvent.APPLICATION_STARTED));
    }

    public createBackground():void {
        this.view.createBackground();
        this.view.createStation();
    }

    public destroy () {
        //do nothing
    }
}
