import PIXI = require('pixi.js');

import {Sprite, Point} from "pixi.js";
import { Config } from "./Config";
import {Rockets} from "./view/Rockets";

export class Rocket {
    private sprite:Sprite;
    private level:number = Config.RocketParameters.INITIAL_LEVEL;
    private scoreMultiplier:number = Config.RocketParameters.SCORE_MULTIPLIER;
    private readyToLaunch:boolean;

    constructor(game:Rockets, position:Point){
        this.sprite = new Sprite(PIXI.loader.resources["assets/assets.json"].textures[Config.Atlas.ROCKET]);

        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.position = position;
        game.addChild(this.sprite);
    }

    public isReadyToLaunch() {
        return this.readyToLaunch;
    }

    public getScoreReward() {
        return this.level * this.scoreMultiplier;
    }

    public kill() {
        this.sprite.destroy();
    }

    public prepareForLaunch() {
        this.readyToLaunch = true;
    }

    public launch() {
        this.readyToLaunch = false;
    }
}