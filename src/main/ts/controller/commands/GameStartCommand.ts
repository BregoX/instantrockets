import { GameActionExecutor } from '../../model/actions/GameActionExecutor';
import { RocketStation } from '../../model/station/RocketStation';
import { GameLoopService } from '../../service/GameLoopService';
import { inject, injectable, IEventDispatcher, Command } from "robotlegs";
import { GameStartedEvent } from '../events/GameStartedEvent';

@injectable()
export class GameStartCommand extends Command {
    @inject(IEventDispatcher)
    public eventDispatcher:IEventDispatcher;

    @inject(GameLoopService)
    public gameLoop:GameLoopService;

    @inject(GameActionExecutor)
    public actionExecutor:GameActionExecutor;

    @inject(RocketStation)
    public rocketStation:RocketStation;

    public execute() {
        this.gameLoop.start(this.actionExecutor);
        this.eventDispatcher.dispatchEvent(new GameStartedEvent());
        this.rocketStation.start();
    }
}