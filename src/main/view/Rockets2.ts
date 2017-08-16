import {Container, Text, Point} from "pixi.js";
import {Rocket} from "../ts/Rocket";
import {IAnimatable} from "../ts/IAnimatable";
import {RocketStation} from "../ts/RocketStation";

export class Rockets2 extends Container {

    public static ROOT_VIEW: Rockets2;
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
        Rockets2.ROOT_VIEW = this;
        this.timeLeftText = new Text();
        this.scoreText = new Text();
    }

    public enterFrame(time: number) {
        this.updateFrame(time - this._prevTime);
        this._prevTime = time;
    }

    public createStation():RocketStation {
        debugger;
        return new RocketStation(this, new Point(50, -222));
    }

    public static addAnimatable(animatable:IAnimatable) {
        this.animatables.push(animatable);
    }

    public static removeAnimatable(animatable:IAnimatable) {
        this.animatables.splice(this.animatables.indexOf(animatable), 1);
    }

    updateFrame(frameDuration: number) {
        for(let animateable of Rockets2.animatables) {
            animateable.animate(frameDuration);
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
        // if(!this.isGameEnded) {
        //     this.isGameEnded = true;
        //     console.log("Game Over");
        // }
    }


}

