/// <reference path="../../../lib/phaser/phaser.d.ts"/>

import {PipeType} from "./PipeType"
import {PipeSide} from "./PipeSide"
import {Config} from "./Config"

export class Pipe {
    private sprite:Phaser.Sprite;

    private pipeSidesCount:number = 4;

    private rotationState:number;

    private type:PipeType;
    private isSteamConnected:boolean;
    private isRocketConnected:boolean;

    public isReadyToLaunch():boolean {
        return this.isSteamConnected && this.isRocketConnected;
    }

    constructor(game:Phaser.Game, position:Phaser.Point) {
        this.type = this.generateType();
        this.sprite = game.add.sprite(0, 0, Config.Atlas.NAME, this.getSpriteName(this.type));
        this.sprite.inputEnabled = true;
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.position = position;
        this.rotationState = this.generateRotation();
        this.rotate(this.rotationState);
        this.sprite.events.onInputDown.add(() => {
            this.onTouch()
        });
    }

    private generateType():PipeType {
        var random = new Phaser.RandomDataGenerator([Math.random()]);
        return random.between(0, PipeType.length - 1);
    }

    private generateRotation():number {
        var random = new Phaser.RandomDataGenerator([Math.random()]);
        return random.between(0, this.pipeSidesCount - 1);
    }

    private rotate(times:number = 1) {
        let oldRotationState:number = this.rotationState;
        let newRotationState:number = (oldRotationState + times) % this.pipeSidesCount;
        let rotationTimes:number = newRotationState - oldRotationState;
        this.sprite.angle += (90 * rotationTimes);
    }

    private onTouch() {
        this.rotate();
    }

    private getSpriteName(type:PipeType) {
        switch(type) {
            case PipeType.Sides1: return Config.Atlas.PIPE_SIDES_1;
            case PipeType.Sides2Bent: return Config.Atlas.PIPE_SIDES_2_BENT;
            case PipeType.Sides2Straight: return Config.Atlas.PIPE_SIDES_2_STRAIGHT;
            case PipeType.Sides3: return Config.Atlas.PIPE_SIDES_3;
            case PipeType.Sides4: return Config.Atlas.PIPE_SIDES_4;
        }

        throw "Sprite type not supported.";
    }
}