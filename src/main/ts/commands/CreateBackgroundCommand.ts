import PIXI = require('pixi.js');

import {Sprite} from "pixi.js";
import {Rockets} from "../view/Rockets";
import {AsyncCommand} from "robotlegs-macrobot";

export class CreateBackgroundCommand  extends AsyncCommand {

    public execute(): void {
        console.log('CreateBackgroundCommand');
        let sprite = new Sprite(
            PIXI.loader.resources["assets/assets.json"].textures["bg.png"]
        );
        Rockets.ROOT_VIEW.addChild(sprite);
        this.dispatchComplete(true);
    }

}
