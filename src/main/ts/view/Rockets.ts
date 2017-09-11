import { View } from '../application/View';
import { Container, Text, Point, Sprite } from "pixi.js";
import {Rocket} from "../Rocket";
import {IAnimatable} from "../IAnimatable";
import {RocketStation} from "../RocketStation";

export class Rockets extends View {
    private leftTime:number;
    private timeLeftText:Text;
    private scoreText:Text;
    private score:number;
    private rocketsToLaunch:number;
    private rocketsLaunched:number;

    constructor() {
        super();
        this.timeLeftText = new Text();
        this.scoreText = new Text();
    }

    public createStation():RocketStation {
        return new RocketStation(this, new Point(50, -222));
    }

    public update(frameDuration:number) {
        super.update(frameDuration);
    }

    public createBackground():void {
        let sprite = new Sprite(PIXI.loader.resources["assets/assets.json"].textures["bg.png"]);
        this.addChild(sprite);
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

    private endGame() {}
}

