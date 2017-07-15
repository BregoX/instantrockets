/// <reference path="../../../lib/phaser/phaser.d.ts"/>

import { Config } from "./Config";

export class Rocket {
    private sprite:Phaser.Sprite;
    private level:number = Config.RocketParameters.INITIAL_LEVEL;
    private scoreMultiplier:number = Config.RocketParameters.SCORE_MULTIPLIER;
    private readyToLaunch:boolean;

    constructor(game:Phaser.Game, position:Phaser.Point){
        this.sprite = game.add.sprite(0, 0, Config.Atlas.NAME, Config.Atlas.ROCKET);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.position = position;
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