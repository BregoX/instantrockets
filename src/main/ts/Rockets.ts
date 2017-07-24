/// <reference path="../../../lib/phaser/phaser.d.ts"/>

import { Config } from './Config';
import { Rocket } from './Rocket';
import { RocketStation } from './RocketStation';
import {IAnimatable} from "./IAnimatable";


export class Rockets {
    public static GAME:Phaser.Game;
    private static animatables:Array<IAnimatable> = [];

    private game: Phaser.Game;
    private score:number = 0;
    private leftTime:number = 60 * 1000;
    private scoreText:Phaser.Text;
    private timeLeftText:Phaser.Text;
    private rocketsToLaunch:number;
    private rocketsLaunched:number;
    private isGameEnded:Boolean = false;

    constructor() {
        Rockets.GAME = this.game = new Phaser.Game(
            Config.GameDimensions.WIDTH,
            Config.GameDimensions.HEIGHT,
            Phaser.WEBGL,
            Config.GamePlacement.ATTACH_TO_BODY,
            this);
    }

    public addScores(rockets:Array<Rocket>)
    {
        for(let rocket of rockets) {
            this.addScore(rocket);
        }
        this.countLaunchedRockets(rockets.length);
        this.scoreText.text = "Score: " + this.score;
    }

    private addScore(rocket:Rocket) {
        this.score += rocket.getScoreReward();
    }

    private countLaunchedRockets(launchedRocketsCount:number)
    {
        this.rocketsLaunched += launchedRocketsCount;

        if(launchedRocketsCount >= this.rocketsToLaunch) {
            this.endGame();
        }
    }

    private endGame() {
        if(!this.isGameEnded) {
            this.isGameEnded = true;
            console.log("Game Over");
        }
    }

    public preload() {
        this.game.load.atlasJSONHash('assets', './assets/assets.png', './assets/assets.json');
    }

    public create() {
        this.createBackground();
        this.scoreText = Rockets.GAME.add.text(0, 0, "Score: 0", {fill: "#ff0044"});
        this.timeLeftText = Rockets.GAME.add.text(0, 50, "Time Left: 60", {fill: "#ff0044"});
        this.createStation();
    }

    public render() {
        for(let animateable of Rockets.animatables) {
            animateable.animate(this.game.time.elapsedMS);
        }
        this.leftTime -= this.game.time.elapsed;
        const time = this.leftTime < 0 ? 0 : this.leftTime;
        if(time == 0) {
            this.timeLeftText.text = "Game Over";
            this.endGame();
        } else {
            this.timeLeftText.text = "Time Left: " + Math.ceil(time / 1000);
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
        return new RocketStation(this.game, new Phaser.Point(50, -222), this);
    }
}
