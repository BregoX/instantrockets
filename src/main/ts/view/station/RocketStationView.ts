import { PipeView } from './PipeView';
import { RocketView } from './RocketView';
import { Config } from '../Config';

import { Point, Container } from "pixi.js";
import { Rockets } from './Rockets';
import { GameActionExecutor } from '../model/actions/GameActionExecutor';
import { SequenceAction } from '../model/actions/SequenceAction';
import { DelayAction } from '../model/actions/DelayAction';
import { MoveAction } from '../model/actions/MoveAction';
import { PipeSide } from '../model/PipeSide';

import TileDimensions = Config.TileDimensions;

export class RocketStationView extends Container {

    private rocketStationField:PipeView[][];
    private rockets:RocketView[];

    constructor() {
        super();

        this.x = 50;
        this.y = -222;

        this.rockets = [];
        this.rocketStationField = [];
    }

    public addPipe():void {
        this.on('pointerdown', this.onTouch.bind(this));
    }

    public removePipe():void {
        this.sprite.destroy();
    }

    public updatePipe():void {

    }

    public addRocket():void {
        
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
}