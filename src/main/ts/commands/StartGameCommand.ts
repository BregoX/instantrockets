
import {AsyncCommand} from "robotlegs-macrobot";
import {Rockets2} from "../../view/Rockets2";

export class StartGameCommand extends AsyncCommand {
    public execute(): void {
        Rockets2.ROOT_VIEW.createStation();
        this.dispatchComplete(true);
    }
}
