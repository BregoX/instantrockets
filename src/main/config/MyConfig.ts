import {
    inject,
    injectable,
    IConfig,
    IInjector,
    IEventCommandMap
} from "robotlegs";

import { IMediatorMap } from "robotlegs-pixi";

import {Rockets2} from "../view/Rockets2";
import {Rockets2Mediator} from "../view/Rockets2Mediator";
import {GameEvent} from "../ts/events/GameEvent";
import {ProceedApplicationStartCommand} from "../ts/commands/ProceedApplicationStartCommand";

@injectable()
export class MyConfig implements IConfig {

    @inject(IInjector)
    injector: IInjector;

    @inject(IMediatorMap)
    mediatorMap: IMediatorMap;

    @inject(IEventCommandMap)
    commandMap: IEventCommandMap;

    configure () {
        this.mapMediators();
        this.mapCommands();
    }

    mapMediators() {
        this.mediatorMap.map(Rockets2).toMediator(Rockets2Mediator);
    }

    mapCommands() {
        this.commandMap.map(GameEvent.APPLICATION_STARTED).toCommand(ProceedApplicationStartCommand);
    }

}
