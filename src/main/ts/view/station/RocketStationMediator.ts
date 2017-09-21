import { RocketMovedEvent } from '../../model/station/events/RocketMovedEvent';
import { RocketsLaunchedEvent } from '../../model/station/events/RocketsLaunchedEvent';
import { RocketCreatedEvent } from '../../model/station/events/RocketCreatedEvent';
import { PipeKilledEvent } from '../../model/station/events/PipeKilledEvent';
import { PipeUpdatedEvent } from '../../model/station/events/PipeUpdatedEvent';
import { PipeCreatedEvent } from '../../model/station/events/PipeCreatedEvent';
import { RocketStationView } from './RocketStationView';
import { inject, IEventDispatcher } from "robotlegs";
import { Mediator } from "robotlegs-pixi";
import { Pipe } from '../../model/station/Pipe';

export class RocketStationMediator extends Mediator<RocketStationView> {
    public initialize() {
        this.addContextListener(PipeCreatedEvent.Name, this.onPipeCreated.bind(this));
        this.addContextListener(PipeUpdatedEvent.Name, this.onPipeUpdated.bind(this));
        this.addContextListener(PipeKilledEvent.Name, this.onPipeKilled.bind(this));

        this.addContextListener(RocketCreatedEvent.Name, this.onRocketCreated.bind(this));
        // this.addContextListener(RocketMovedEvent.Name, this.onPipeCreated.bind(this));
        // this.addContextListener(RocketsLaunchedEvent.Name, this.onPipeCreated.bind(this));
    }

    public onPipeCreated(event:PipeCreatedEvent):void {
        this.view.addPipe(event.pipe);
    }

    public onPipeUpdated(event:PipeUpdatedEvent):void {
        this.view.updatePipe(event.pipe);
    }

    public onRocketCreated(event:RocketCreatedEvent):void {
        this.view.addRocket(event.rocket);
    }

    public onPipeKilled(event:PipeKilledEvent):void {
        this.view.removePipe(event.pipe);
    }

    public destroy () {
        //do nothing
    }
}