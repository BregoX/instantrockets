import PIXI = require('pixi.js');

import {Sprite} from "pixi.js";
import {Rockets2} from "../../view/Rockets2";
import {AsyncCommand} from "robotlegs-macrobot";

export class CreateBackgroundCommand  extends AsyncCommand {

    public execute(): void {
        console.log('CreateBackgroundCommand');
        let sprite = new Sprite(
            PIXI.loader.resources["assets/assets.json"].textures["bg.png"]
        );
        Rockets2.ROOT_VIEW.addChild(sprite);
        this.dispatchComplete(true);
    }

}
