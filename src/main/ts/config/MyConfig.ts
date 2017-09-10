import {
    inject,
    injectable,
    IConfig,
    IInjector,
    IEventCommandMap
} from "robotlegs";

import {IMediatorMap} from "robotlegs-pixi";

import {Rockets} from "../view/Rockets";
import {RocketsMediator} from "../view/RocketsMediator";
import {GameEvent} from "../../ts/events/GameEvent";
import {ProceedApplicationStartCommand} from "../../ts/commands/ProceedApplicationStartCommand";

@injectable()
export class MyConfig implements IConfig {

    @inject(IInjector)
    injector:IInjector;

    @inject(IMediatorMap)
    mediatorMap:IMediatorMap;

    @inject(IEventCommandMap)
    commandMap:IEventCommandMap;

    configure () {
        this.mapMediators();
        this.mapCommands();
    }

    mapMediators() {
        this.mediatorMap.map(Rockets).toMediator(RocketsMediator);
    }

    mapCommands() {
        this.commandMap.map(GameEvent.APPLICATION_STARTED).toCommand(ProceedApplicationStartCommand);
    }

}
