import { Container, Text, Point, Sprite } from "pixi.js";
import {Rocket} from "../Rocket";
import {IAnimatable} from "../IAnimatable";
import {RocketStation} from "../RocketStation";

export class Rockets extends Container {
    private leftTime:number;
    private timeLeftText:Text;
    private scoreText:Text;
    private score:number;
    private rocketsToLaunch:number;
    private rocketsLaunched:number;
    private previousTime:number;
    private animatables:Array<IAnimatable> = [];

    constructor() {
        super();
        this.timeLeftText = new Text();
        this.scoreText = new Text();
        this.previousTime = 0;
    }

    public addAnimatable(animatable:IAnimatable) {
        this.animatables.push(animatable);
    }

    public removeAnimatable(animatable:IAnimatable) {
        this.animatables.splice(this.animatables.indexOf(animatable), 1);
    }

    public render(time:number) {
        let frameDuration = time - this.previousTime;
        this.update(frameDuration);
        this.previousTime = time;
    }

    protected update(frameDuration:number) {
        for(let animatable of this.animatables) {
            animatable.animate(frameDuration);
        }
    }

    public createStation():RocketStation {
        return new RocketStation(this, new Point(50, -222));
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

