

import {PipeType} from "./PipeType";
import { Color } from './Color';
import { Config } from './Config';
import { PipeSide } from './PipeSide';
import {IActable} from "./actions/IActable";
import {MoveAction} from "./actions/MoveAction";
import {Sprite, MiniSignal, Point} from 'pixi.js';
import {Rockets} from "./view/Rockets";

export class Pipe implements IActable {
    private sprite:Sprite;

    private rotationState:number = 0;

    private type:PipeType;
    private isSteamConnected:boolean = false;
    private isRocketConnected:boolean = false;

    private _x: number;
    private _y: number;

    public upPipe:Pipe;
    public rightPipe:Pipe;
    public downPipe:Pipe;
    public leftPipe:Pipe;

    public pressed:Function;

    constructor(game:Rockets, position:Point) {
        this.type = this.generateType();
        this.sprite = new Sprite(
            PIXI.loader.resources["assets/assets.json"].textures[this.getSpriteName(this.type)]);
        this.sprite.buttonMode = true;
        this.sprite.anchor.set(0.5);
        this.sprite.position = position;
        this.rotate(this.generateRotation());
        game.addChild(this.sprite);

        // this.sprite.events.onInputDown.add(this.onTouch, this);
        this.sprite.interactive = true;
        this.sprite.buttonMode = true;
        this.sprite.on('pointerdown', this.onTouch.bind(this));

        this.x = position.x;
        this.y = position.y;

    }

    public connectSteam() {
        if(this.isSteamConnected) {
            return;
        }

        this.isSteamConnected = true;
        this.setTint(Color.Yellow);

        if(this.upPipe != null) {
            this.upPipe.connectSteam();
        }

        if(this.rightPipe != null) {
            this.rightPipe.connectSteam();
        }

        if(this.downPipe != null) {
            this.downPipe.connectSteam();
        }

        if(this.leftPipe != null) {
            this.leftPipe.connectSteam();
        }
    }

    public connectRocket() {
        if(this.isRocketConnected) {
            return;
        }

        this.isRocketConnected = true;
        this.setTint(this.isReadyToLaunch() ? Color.Green : Color.Red);

        if(this.upPipe != null) {
            this.upPipe.connectRocket();
        }

        if(this.rightPipe != null) {
            this.rightPipe.connectRocket();
        }

        if(this.downPipe != null) {
            this.downPipe.connectRocket();
        }

        if(this.leftPipe != null) {
            this.leftPipe.connectRocket();
        }
    }

    public isSideConnected(side:PipeSide):boolean {
        return this.getPipeConnectionSides().indexOf(side) > -1;
    }

    public isReadyToLaunch():boolean {
        return this.isSteamConnected && this.isRocketConnected;
    }

    public getPipeConnectionSides():PipeSide[] {
        let sides:PipeSide[] = this.getInitialConnectionSides();
        return this.rotateConnectionSides(sides);
    }

    public kill():void {
        this.pressed = null;
        this.sprite.destroy();
    }

    public reset() {
        this.upPipe = null;
        this.downPipe = null;
        this.rightPipe = null;
        this.leftPipe = null;

        this.isSteamConnected = false;
        this.isRocketConnected = false;

        this.setTint(Color.White);
    }

    private setTint(color:number) {
        this.sprite.tint = color;
    }

    private getInitialConnectionSides():PipeSide[] {
        switch(this.type) {
            case PipeType.Sides2Bent:
                return [PipeSide.Left, PipeSide.Up];
            case PipeType.Sides2Straight:
                return [PipeSide.Left, PipeSide.Right];
            case PipeType.Sides3:
                return [PipeSide.Left, PipeSide.Down, PipeSide.Right];
            case PipeType.Sides4:
                return [PipeSide.Up, PipeSide.Right, PipeSide.Down, PipeSide.Left];
            //case PipeType.Sides1:
            //    return [PipeSide.Left];
        }
    }

    private rotateConnectionSides(sides:PipeSide[]):PipeSide[] {
        for(let i in sides) {
            let rotatedSide = this.rotateConnectionSide(sides[i]);
            sides[i] = rotatedSide;
        }
        return sides;
    }

    private rotateConnectionSide(side:PipeSide) {
        return (side + this.rotationState) % PipeSide.length;
    }

    private generateType():PipeType {
        return Math.round(Math.random() * (PipeType.length - 1));
    }

    private generateRotation():number {
        return Math.round(Math.random() * (PipeSide.length - 1));
    }

    private rotate(times:number = 1) {
        let oldRotationState:number = this.rotationState;
        let newRotationState:number = (oldRotationState + times) % PipeSide.length;
        let rotationTimes:number = newRotationState - oldRotationState;
        var rot = 90 * rotationTimes * Math.PI / 180;
        this.sprite.rotation += rot;
        this.rotationState = newRotationState;
    }

    private onTouch() {
        this.rotate();
        this.pressed.apply(this);
    }

    private getSpriteName(type:PipeType) {
        switch(type) {
            //case PipeType.Sides1: return Config.Atlas.PIPE_SIDES_1;
            case PipeType.Sides2Bent: return Config.Atlas.PIPE_SIDES_2_BENT;
            case PipeType.Sides2Straight: return Config.Atlas.PIPE_SIDES_2_STRAIGHT;
            case PipeType.Sides3: return Config.Atlas.PIPE_SIDES_3;
            case PipeType.Sides4: return Config.Atlas.PIPE_SIDES_4;
        }

        throw "Sprite type not supported.";
    }

    get x():number {
        return this._x;
    }

    set x(value:number) {
        this._x = this.sprite.x = value;
    }

    get y():number {
        return this._y;
    }

    set y(value: number) {
        this._y = this.sprite.y = value;
    }
}