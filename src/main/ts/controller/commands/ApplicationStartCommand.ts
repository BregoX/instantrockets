import { InitializeFacebookCommand } from './InitializeFacebookCommand';
import { SequenceMacro } from "robotlegs-macrobot";
import { LoadResourcesCommand } from "./LoadResourcesCommand";
import { GameStartCommand } from './GameStartCommand';

export class ApplicationStartCommand extends SequenceMacro {
    prepare():void {
        this.add(InitializeFacebookCommand);
        this.add(LoadResourcesCommand);
        this.add(GameStartCommand);
    }
}
