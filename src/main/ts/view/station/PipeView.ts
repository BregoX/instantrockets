import { Pipe } from '../../model/station/Pipe';
import { Sprite, MiniSignal, Point } from 'pixi.js';
import { PipeType } from '../../model/station/data/PipeType';
import { Config } from '../../Config';

export class PipeView extends Sprite {
    constructor(pipe:Pipe) {
        super(PIXI.loader.resources["assets/assets.json"].textures[PipeView.getSpriteName(pipe.type)]);
        this.buttonMode = true;
        this.anchor.set(0.5);
        this.position = new Point(pipe.x, pipe.y);

        this.interactive = true;
        this.buttonMode = true;

        this.x = this.position.x;
        this.y = this.position.y;
    }

    private static getSpriteName(type:PipeType) {
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