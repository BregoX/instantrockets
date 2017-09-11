import {
    inject,
    injectable,
    IEventDispatcher,
    Command
} from "robotlegs";

import { GameEvent } from '../events/GameEvent';
import { decorate } from "inversify";

decorate(injectable(), Command);

@injectable()
export class GameStartCommand extends Command {

    @inject(IEventDispatcher)
    public eventDispatcher:IEventDispatcher;

    public execute() {
        this.eventDispatcher.dispatchEvent(new GameEvent(GameEvent.RESOURCES_LOADED));
    }
}