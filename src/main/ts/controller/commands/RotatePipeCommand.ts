import { PipePressedEvent } from '../events/PipePressedEvent';
import { RocketStation } from '../../model/station/RocketStation';
import { inject, injectable, Command } from "robotlegs";
import { GameStartedEvent } from '../events/GameStartedEvent';
import {PipePressedEventWrapper} from "./utils/PipePressedEventWrapper";

@injectable()
export class RotatePipeCommand extends Command {
    @inject(RocketStation)
    public rocketStation:RocketStation;

    // @inject(PipePressedEvent)
    // public event:PipePressedEvent;

    @inject(PipePressedEventWrapper)
    public  eventWrapper:PipePressedEventWrapper;

    public execute() {
        this.rocketStation.rotatePipe(this.eventWrapper.getEvent().pipe.i, this.eventWrapper.getEvent().pipe.j);
    }
}