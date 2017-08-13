
import {SequenceMacro} from "robotlegs-macrobot";
import {PreloadResourcesCommand} from "./PreloadResourcesCommand";
import {CreateBackgroundCommand} from "./CreateBackgroundCommand";


export class ProceedApplicationStartCommand extends SequenceMacro {

    prepare(): void {
      this.add(PreloadResourcesCommand);
      this.add(CreateBackgroundCommand);
    }

}
