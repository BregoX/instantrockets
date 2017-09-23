import { PipeIndexChangedEvent } from '../../model/station/events/PipeIndexChangedEvent';
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
import { SignalBinding } from 'micro-signals';
import { PipePressedEvent } from '../../controller/events/PipePressedEvent';

export class RocketStationMediator extends Mediator<RocketStationView> {
    private pipeTouchedBinding:SignalBinding;

    public initialize() {
        this.addContextListener(PipeCreatedEvent.Name, this.onPipeCreated.bind(this));
        this.addContextListener(PipeUpdatedEvent.Name, this.onPipeUpdated.bind(this));
        this.addContextListener(PipeKilledEvent.Name, this.onPipeKilled.bind(this));
        this.addContextListener(PipeIndexChangedEvent.Name, this.onPipeIndexChanged.bind(this));

        this.addContextListener(RocketCreatedEvent.Name, this.onRocketCreated.bind(this));
        // this.addContextListener(RocketMovedEvent.Name, this.onPipeCreated.bind(this));
        // this.addContextListener(RocketsLaunchedEvent.Name, this.onPipeCreated.bind(this));

        this.pipeTouchedBinding = this.view.pipeTouched.add(this.onPipeTouched.bind(this));
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

    public onPipeIndexChanged(event:PipeIndexChangedEvent):void {
        this.view.changeIndex(event.previousRow, event.targetRow, event.column);
    }

    public onPipeKilled(event:PipeKilledEvent):void {
        this.view.removePipe(event.pipe);
    }

    public onPipeTouched(pipe:Pipe):void {
        this.eventDispatcher.dispatchEvent(new PipePressedEvent(pipe));
    }

    public destroy () {
        this.pipeTouchedBinding.detach();
    }
}