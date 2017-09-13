import PIXI = require('pixi.js');
import { AsyncCommand } from "robotlegs-macrobot";

export class LoadResourcesCommand extends AsyncCommand {
    public execute() {
        PIXI.loader.add("assets/assets.json").load(this.resourcesLoaded.bind(this));
    }

    public resourcesLoaded() {
        this.dispatchComplete(true);
    }
}
