import {
    inject,
    injectable,
    IEventDispatcher,
    Command
} from "robotlegs";

import { GameStartedEvent } from '../events/GameStartedEvent';

@injectable()
export class GameStartCommand extends Command {
    @inject(IEventDispatcher)
    public eventDispatcher:IEventDispatcher;

    public execute() {
        this.eventDispatcher.dispatchEvent(new GameStartedEvent());
    }
}