import { FacebookService } from './service/FacebookService';
import { InitializeFacebookCommand } from './controller/commands/InitializeFacebookCommand';
import { PipePressedEvent } from './controller/events/PipePressedEvent';
import { RocketStation } from './model/station/RocketStation';
import { GameActionExecutor } from './model/actions/GameActionExecutor';
import { GameLoopService } from './service/GameLoopService';
import { RocketStationMediator } from './view/station/RocketStationMediator';
import { RocketStationView } from './view/station/RocketStationView';
import { RocketsGameView } from './view/RocketsGameView';
import { inject, injectable, IConfig, IInjector, IEventCommandMap } from "robotlegs";
import { IMediatorMap } from "robotlegs-pixi";
import { ApplicationStartedEvent } from "./platform/events/ApplicationStartedEvent";
import { ApplicationStartCommand } from "./controller/commands/ApplicationStartCommand";
import { RocketsGameMediator } from './view/RocketsGameMediator';
import { RotatePipeCommand } from './controller/commands/RotatePipeCommand';

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
        this.mapServices();
        this.mapModel();
    }

    private mapMediators() {
        this.mediatorMap.map(RocketsGameView).toMediator(RocketsGameMediator);
        this.mediatorMap.map(RocketStationView).toMediator(RocketStationMediator);
    }

    private mapCommands() {
        this.commandMap.map(ApplicationStartedEvent.Name).toCommand(ApplicationStartCommand);
        this.commandMap.map(PipePressedEvent.Name).toCommand(RotatePipeCommand);
    }

    private mapServices() {
        this.injector.bind(GameLoopService).toSelf().inSingletonScope();
        this.injector.bind(FacebookService).toSelf().inSingletonScope();
    }

    private mapModel() {
        this.injector.bind(GameActionExecutor).toSelf().inSingletonScope();
        this.injector.bind(RocketStation).toSelf().inSingletonScope();
    }
}
