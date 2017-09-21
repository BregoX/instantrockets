import { Color } from '../../model/station/data/Color';
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
        this.y = 150;

        this.position = new Point(this.x, this.y);

        this.rockets = [];
        this.rocketStationField = [];
    }

    public addPipe(pipe:Pipe):void {
        let pipeView:PipeView = new PipeView(pipe);

        if(this.rocketStationField[pipe.i] == null) {
            this.rocketStationField[pipe.i] = [];
        }

        this.rocketStationField[pipe.i][pipe.j] = pipeView;

        pipeView.on('pointerdown', this.onPipeTouched.bind(this, pipe));
        this.addChild(pipeView);
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
        let pipeView:PipeView = this.rocketStationField[pipe.i][pipe.j];

        pipeView.x = pipe.x;
        pipeView.y = pipe.y;

        pipeView.position = new Point(pipe.x, pipe.y);

        pipeView.rotation = pipe.rotation;

        if(pipe.isReadyToLaunch()) {
            pipeView.tint = Color.Green;
        } else if(pipe.isSteamConnected) {
            pipeView.tint = Color.Yellow;
        } else if(pipe.isRocketConnected) {
            pipeView.tint = Color.Red;
        } else {
            pipeView.tint = Color.White;
        }
    }

    public addRocket(rocket:Rocket):void {
        let rocketView = new RocketView(new Point(rocket.x, rocket.y));
        this.rockets[rocket.row] = rocketView;
        this.addChild(rocketView);
    }
}