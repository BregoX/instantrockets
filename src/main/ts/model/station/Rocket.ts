import { IActable } from '../actions/IActable';
import PIXI = require('pixi.js');

import { Sprite, Point } from "pixi.js";
import { Config } from '../../Config';
import { IEventDispatcher } from 'robotlegs';

export class Rocket implements IActable {
    private level:number = Config.RocketParameters.INITIAL_LEVEL;
    private scoreMultiplier:number = Config.RocketParameters.SCORE_MULTIPLIER;
    private readyToLaunch:boolean;

    public x:number;
    public y:number;

    private eventDispatcher:IEventDispatcher;

    constructor(x:number, y:number, eventDispatcher:IEventDispatcher) {
        this.eventDispatcher = eventDispatcher;
        this.move(x, y);
    }

    public move(x:number, y:number) {
        this.x = x;
        this.y = y;

        //dispatch move event
    }

    public isReadyToLaunch() {
        return this.readyToLaunch;
    }

    public getScoreReward() {
        return this.level * this.scoreMultiplier;
    }

    public prepareForLaunch() {
        this.readyToLaunch = true;
    }

    public launch() {
        this.readyToLaunch = false;
    }
}