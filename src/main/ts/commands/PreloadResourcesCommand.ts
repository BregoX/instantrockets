import PIXI = require('pixi.js');
import {AsyncCommand} from "robotlegs-macrobot";

export class PreloadResourcesCommand extends AsyncCommand {
    execute() {
        PIXI.loader.add("assets/assets.json")
            .load(this.resourcesLoaded.bind(this));
    }

    resourcesLoaded() {
        console.log('Resources loaded');
        this.dispatchComplete(true);
    }
}
