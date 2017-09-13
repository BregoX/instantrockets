import {
    inject,
    injectable,
    IConfig,
    IInjector,
    IEventCommandMap
} from "robotlegs";

import {IMediatorMap} from "robotlegs-pixi";

import {Rockets} from "./view/Rockets";
import {RocketsMediator} from "./view/RocketsMediator";
import {ApplicationStartedEvent} from "./platform/events/ApplicationStartedEvent";
import { ApplicationStartCommand } from "./controller/commands/ApplicationStartCommand";

@injectable()
export class InjectionConfig implements IConfig {

    @inject(IInjector)
    injector:IInjector;

    @inject(IMediatorMap)
    mediatorMap:IMediatorMap;

    @inject(IEventCommandMap)
    commandMap:IEventCommandMap;

    configure() {
        this.mapMediators();
        this.mapCommands();
    }

    mapMediators() {
        this.mediatorMap.map(Rockets).toMediator(RocketsMediator);
    }

    mapCommands() {
        this.commandMap.map(ApplicationStartedEvent.NAME).toCommand(ApplicationStartCommand);
    }
}
