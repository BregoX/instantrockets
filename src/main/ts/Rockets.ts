/// <reference path="../../../lib/phaser/phaser.d.ts"/>

import { Config } from './Config';
import { Pipe } from './Pipe';
import { Rocket } from './Rocket';
import { RocketStation } from './RocketStation';
import {GameActionExecutor} from "./actions/GameActionExecutor";
import {DelayAction} from "./actions/DelayAction";
import {IAnimatable} from "./IAnimatable";


export class Rockets {
    private game: Phaser.Game;
    private static animatables:Array<IAnimatable> = [];

    constructor() {
        this.game = new Phaser.Game(
            Config.GameDimensions.WIDTH,
            Config.GameDimensions.HEIGHT,
            Phaser.WEBGL,
            Config.GamePlacement.ATTACH_TO_BODY,
            this);
    }

    public preload() {
        this.game.load.atlasJSONHash('assets', './assets/assets.png', './assets/assets.json');
    }

    public create() {
        this.createBackground();
        let station = this.createStation();
        let executor = new GameActionExecutor();
        executor.run(new DelayAction(100));
        Rockets.addAnimatable(executor);
    }

    public render() {
        for(let animateable of Rockets.animatables) {
            animateable.animate(this.game.time.elapsedMS);
        }
    }

    public static addAnimatable(animatable:IAnimatable) {
        this.animatables.push(animatable);
    }

    public static removeAnimatable(animatable:IAnimatable) {
        this.animatables.splice(this.animatables.indexOf(animatable), 1);
    }


    private createBackground() {
        const background = this.game.add.sprite(0, 0, 'assets', 'bg.png');
        background.inputEnabled = true;
        background.height = this.game.height;
        background.width = this.game.width;
    }

    private createStation():RocketStation {
        return new RocketStation(this.game, new Phaser.Point(50, -222))
    }
}
