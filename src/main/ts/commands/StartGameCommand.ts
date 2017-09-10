
import {AsyncCommand} from "robotlegs-macrobot";
import {Rockets} from "../view/Rockets";

export class StartGameCommand extends AsyncCommand {
    public execute(): void {
        Rockets.ROOT_VIEW.createStation();
        this.dispatchComplete(true);
    }
}
