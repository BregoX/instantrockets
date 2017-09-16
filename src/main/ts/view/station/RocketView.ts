import PIXI = require('pixi.js');

import { Sprite, Point } from "pixi.js";
import { Config } from '../../Config';

export class RocketView extends Sprite {
    constructor(position:Point){
        super(PIXI.loader.resources["assets/assets.json"].textures[Config.Atlas.ROCKET])

        this.anchor.set(0.5, 0.5);
        this.position = position;
    }
}