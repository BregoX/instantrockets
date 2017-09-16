import { Pipe } from '../../model/station/Pipe';
import { PipeView } from './PipeView';
import { RocketView } from './RocketView';
import { Point, Container, MiniSignal } from "pixi.js";
import { Config } from '../../Config';
import { PipeType } from '../../model/station/data/PipeType';
import { Rocket } from '../../model/station/Rocket';

export class RocketStationView extends Container {

    private rocketStationField:PipeView[][];
    private rockets:RocketView[];

    public pipeTouched:Function;

    constructor() {
        super();

        this.x = 50;
        this.y = -222;

        this.rockets = [];
        this.rocketStationField = [];
    }

    public addPipe(pipe:Pipe):void {
        let pipeView:PipeView = new PipeView(this.getSpriteName(pipe.type), new Point(pipe.x, pipe.y));
        this.rocketStationField[pipe.i][pipe.j] = pipeView;
        pipeView.on('pointerdown', this.onPipeTouched.bind(this, pipe));
    }

    private onPipeTouched(pipe:Pipe) {
        this.pipeTouched.apply(pipe);
    }

    public removePipe(pipe:Pipe):void {
        let pipeView:PipeView = this.rocketStationField[pipe.i][pipe.j];
        pipeView.off('pointerdown');

        this.removeChild(pipeView);
        pipeView.destroy();
        
        this.rocketStationField[pipe.i][pipe.j] = null;
    }

    public updatePipe(pipe:Pipe):void {

    }

    public addRocket(rocket:Rocket):void {
        
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