import { RocketStationMediator } from './view/station/RocketStationMediator';
import { RocketStationView } from './view/station/RocketStationView';
import { RocketsGameView } from './view/RocketsGameView';
import {
    inject,
    injectable,
    IConfig,
    IInjector,
    IEventCommandMap
} from "robotlegs";

import {IMediatorMap} from "robotlegs-pixi";

import {ApplicationStartedEvent} from "./platform/events/ApplicationStartedEvent";
import { ApplicationStartCommand } from "./controller/commands/ApplicationStartCommand";
import { RocketsGameMediator } from './view/RocketsGameMediator';

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
        this.mediatorMap.map(RocketsGameView).toMediator(RocketsGameMediator);
        this.mediatorMap.map(RocketStationView).toMediator(RocketStationMediator);
    }

    mapCommands() {
        this.commandMap.map(ApplicationStartedEvent.NAME).toCommand(ApplicationStartCommand);
    }
}
