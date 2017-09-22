import { Color } from '../../model/station/data/Color';
import { Pipe } from '../../model/station/Pipe';
import { PipeView } from './PipeView';
import { RocketView } from './RocketView';
import { Point, Container, MiniSignal, Text } from "pixi.js";
import { Config } from '../../Config';
import { PipeType } from '../../model/station/data/PipeType';
import { Rocket } from '../../model/station/Rocket';
import { Signal } from "micro-signals";

export class RocketStationView extends Container {

    private rocketStationField:PipeView[][];
    private textField:Text[][];
    private rockets:RocketView[];

    public pipeTouched:Signal<Pipe>;

    constructor() {
        super();

        this.x = 50;
        this.y = 224;

        let self = this;
        window["testbed"].setRocketStationHeight = function(y) {
            self.y = y;
        }

        this.position = new Point(this.x, this.y);

        this.rockets = [];
        this.rocketStationField = [];
        this.textField = [];
        this.pipeTouched = new Signal<Pipe>();
    }

    public addPipe(pipe:Pipe):void {
        let pipeView:PipeView = new PipeView(pipe);

        if(this.rocketStationField[pipe.i] == null) {
            this.rocketStationField[pipe.i] = [];
        }

        this.rocketStationField[pipe.i][pipe.j] = pipeView;

        pipeView.on('pointerdown', this.onPipeTouched.bind(this, pipe));

        this.addChild(pipeView);

        if(this.textField[pipe.i] == null) {
            this.textField[pipe.i] = [];
        }

        let text = new Text(pipe.i + ";" + pipe.j, { fill: "#FFFFFF" });
        text.x = pipeView.x - Config.TileDimensions.WIDTH / 2;
        text.y = pipeView.y - Config.TileDimensions.HEIGHT / 2;

        this.textField[pipe.i][pipe.j] = text;

        this.addChild(text);
    }

    private onPipeTouched(pipe:Pipe) {
        this.pipeTouched.dispatch(pipe);
    }

    public removePipe(pipe:Pipe):void {
        let pipeView:PipeView = this.rocketStationField[pipe.i][pipe.j];
        pipeView.off('pointerdown');

        this.removeChild(pipeView);
        pipeView.destroy();

        let text = this.textField[pipe.i][pipe.j];
        this.removeChild(text);
        text.destroy();

        this.textField[pipe.i][pipe.j] = null;
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

        let text = this.textField[pipe.i][pipe.j];
        text.x = pipe.x - Config.TileDimensions.WIDTH / 2;
        text.y = pipe.y - Config.TileDimensions.HEIGHT / 2;
    }

    public changeIndex(previousRow:number, targetRow:number, column:number):void {
        this.textField[targetRow][column] = this.textField[previousRow][column];
        this.rocketStationField[targetRow][column] = this.rocketStationField[previousRow][column];
    }

    public addRocket(rocket:Rocket):void {
        let rocketView = new RocketView(new Point(rocket.x, rocket.y));
        this.rockets[rocket.row] = rocketView;
        this.addChild(rocketView);
    }
}