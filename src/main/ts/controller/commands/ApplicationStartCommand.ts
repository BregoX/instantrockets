import { InitializeFacebookCommand } from './InitializeFacebookCommand';
import { SequenceMacro } from "robotlegs-macrobot";
import { LoadResourcesCommand } from "./LoadResourcesCommand";
import { GameStartCommand } from './GameStartCommand';
import { StartFacebookCommand } from './StartFacebookCommand';

export class ApplicationStartCommand extends SequenceMacro {
    prepare():void {
        this.add(InitializeFacebookCommand);
        this.add(LoadResourcesCommand);
        this.add(StartFacebookCommand);
        this.add(GameStartCommand);
    }
}
