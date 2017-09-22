import { PipePressedEvent } from '../events/PipePressedEvent';
import { RocketStation } from '../../model/station/RocketStation';
import { inject, injectable, Command } from "robotlegs";
import { GameStartedEvent } from '../events/GameStartedEvent';

@injectable()
export class RotatePipeCommand extends Command {
    @inject(RocketStation)
    public rocketStation:RocketStation;

    @inject(PipePressedEvent)
    public event:PipePressedEvent;

    public execute() {
        this.rocketStation.rotatePipe(this.event.pipe.i, this.event.pipe.j);
    }
}