import { RocketMovedEvent } from '../../model/station/events/RocketMovedEvent';
import { RocketsLaunchedEvent } from '../../model/station/events/RocketsLaunchedEvent';
import { RocketCreatedEvent } from '../../model/station/events/RocketCreatedEvent';
import { PipeSteamConnectedEvent } from '../../model/station/events/PipeSteamConnectedEvent';
import { PipeRotatedEvent } from '../../model/station/events/PipeRotatedEvent';
import { PipeRocketConnectedEvent } from '../../model/station/events/PipeRocketConnectedEvent';
import { PipeReadyToLaunchEvent } from '../../model/station/events/PipeReadyToLaunchEvent';
import { PipeMovedEvent } from '../../model/station/events/PipeMovedEvent';
import { PipeKilledEvent } from '../../model/station/events/PipeKilledEvent';
import { PipeIndexChangedEvent } from '../../model/station/events/PipeIndexChangedEvent';
import { PipeCreatedEvent } from '../../model/station/events/PipeCreatedEvent';
import { RocketStationView } from './RocketStationView';
import { inject, IEventDispatcher } from "robotlegs";
import { Mediator } from "robotlegs-pixi";

export class RocketStationMediator extends Mediator<RocketStationView> {
    public initialize() {
        this.addContextListener(PipeCreatedEvent.Name, this.onPipeCreated.bind(this));
        this.addContextListener(PipeIndexChangedEvent.Name, this.onPipeCreated.bind(this));
        this.addContextListener(PipeKilledEvent.Name, this.onPipeCreated.bind(this));
        this.addContextListener(PipeMovedEvent.Name, this.onPipeCreated.bind(this));
        this.addContextListener(PipeReadyToLaunchEvent.Name, this.onPipeCreated.bind(this));
        this.addContextListener(PipeRocketConnectedEvent.Name, this.onPipeCreated.bind(this));
        this.addContextListener(PipeRotatedEvent.Name, this.onPipeCreated.bind(this));
        this.addContextListener(PipeSteamConnectedEvent.Name, this.onPipeCreated.bind(this));
        this.addContextListener(RocketCreatedEvent.Name, this.onPipeCreated.bind(this));
        this.addContextListener(RocketMovedEvent.Name, this.onPipeCreated.bind(this));
        this.addContextListener(RocketsLaunchedEvent.Name, this.onPipeCreated.bind(this));
    }

    public onPipeCreated():void {}

    public destroy () {
        //do nothing
    }
}