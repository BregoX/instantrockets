import {Container, Text, Point} from "pixi.js";
import {Rocket} from "../Rocket";
import {IAnimatable} from "../IAnimatable";
import {RocketStation} from "../RocketStation";

export class Rockets extends Container {
    public static ROOT_VIEW: Rockets;
    private static animatables:Array<IAnimatable> = [];
    private _prevTime: number = 0;
    private leftTime:number;
    private timeLeftText:Text;
    private scoreText:Text;
    private score:number;
    private rocketsToLaunch:number;
    private rocketsLaunched:number;

    constructor() {
        super();
        Rockets.ROOT_VIEW = this;
        this.timeLeftText = new Text();
        this.scoreText = new Text();
    }

    public enterFrame(time: number) {
        this.updateFrame(time - this._prevTime);
        this._prevTime = time;
    }

    public createStation():RocketStation {
        return new RocketStation(this, new Point(50, -222));
    }

    public static addAnimatable(animatable:IAnimatable) {
        this.animatables.push(animatable);
    }

    public static removeAnimatable(animatable:IAnimatable) {
        this.animatables.splice(this.animatables.indexOf(animatable), 1);
    }

    public updateFrame(frameDuration: number) {
        for(let animatable of Rockets.animatables) {
            animatable.animate(frameDuration);
        }
        this.leftTime -= frameDuration;
        const time = this.leftTime < 0 ? 0 : this.leftTime;
        if(time == 0) {
            this.timeLeftText.text = "Game Over";
            this.endGame();
        } else {
            this.timeLeftText.text = "Time Left: " + Math.ceil(time / 1000);
        }
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
        //end game
    }
}

