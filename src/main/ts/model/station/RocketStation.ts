import { PipeIndexChangedEvent } from './events/PipeIndexChangedEvent';
import { PipeKilledEvent } from './events/PipeKilledEvent';
import { RocketsLaunchedEvent } from './events/RocketsLaunchedEvent';
import { Pipe } from './Pipe';
import { Rocket } from './Rocket';
import { Config } from '../../Config';
import { Point, Container } from "pixi.js";
import { GameActionExecutor } from '../actions/GameActionExecutor';
import { SequenceAction } from '../actions/SequenceAction';
import { DelayAction } from '../actions/DelayAction';
import { MoveAction } from '../actions/MoveAction';
import { PipeSide } from './data/PipeSide';
import { inject, injectable, IEventDispatcher } from 'robotlegs';

import TileDimensions = Config.TileDimensions;

@injectable()
export class RocketStation {
    
    private rocketStationField:Pipe[][];
    private rockets:Rocket[];

    private position:Point;

    @inject(GameActionExecutor)
    public actionExecutor:GameActionExecutor;

    @inject(IEventDispatcher)
    public eventDispatcher:IEventDispatcher;

    constructor(position:Point) {
        this.rockets = [];
        this.rocketStationField = [];
        this.position = position;
    }

    public start():void {
        this.generateRockets();
        this.actionExecutor.onCompleteCallback.push(this.tryExplodePipes.bind(this));
        this.generatePipes();
        this.tryExplodePipes();
    }

    private generateRockets():void {
        let column = Config.RocketStationParameters.ROCKET_STATION_WIDTH;
        for(let i = 0; i < Config.RocketStationParameters.ROCKET_STATION_HEIGHT; i++) {
            if(this.rockets[i] != null) {
                continue;
            }

            let rocketPosition = this.getTilePosition(i, column);
            rocketPosition.x += Config.RocketStationParameters.ROCKET_OFFSET;
            
            this.rockets[i] = new Rocket(rocketPosition.x, rocketPosition.y, i, this.eventDispatcher);
        }
    }

    private getTilePosition(row:number, column:number):Point {
        return new Point(
            column * Config.TileDimensions.WIDTH + this.position.x + Config.TileDimensions.WIDTH / 2,
            row * Config.TileDimensions.HEIGHT - this.position.y + Config.TileDimensions.HEIGHT / 2)
    }

    private generatePipes():void {
        this.fillRocketStationWithPipes();
        this.calculatePipeConnections();
    }

    private fillRocketStationWithPipes():void {
        for(let i = 0; i < Config.RocketStationParameters.ROCKET_STATION_HEIGHT; i++) {
            for(let j = 0; j < Config.RocketStationParameters.ROCKET_STATION_WIDTH; j++) {
                if(this.rocketStationField[i] == null) {
                    this.rocketStationField[i] = [];
                }

                if(this.rocketStationField[i][j] != null) {
                    continue;
                }

                let pipePosition = this.getInitialTilePosition(i, j);
                this.rocketStationField[i][j] = new Pipe(pipePosition.x, pipePosition.y, i, j, this.eventDispatcher);

                this.movePipe(i, j, i);
            }
        }
    }

    public rotatePipe(i:number, j:number):void {
        let pipe = this.rocketStationField[i][j];
        pipe.rotate();
        this.calculatePipeConnections();
        this.tryExplodePipes();
    }

    private getInitialTilePosition(row:number, column:number):Point {
        let point = this.getTilePosition(row, column);
        point.y = -2 * TileDimensions.HEIGHT;
        return point;
    }

    private movePipe(row:number, column:number, destinationRow:number) {
        let destination = this.getTilePosition(destinationRow, column);
        this.actionExecutor.run(new SequenceAction([
            new DelayAction(200),
            new MoveAction(this.rocketStationField[row][column], destination, 300)]));
    }

    private calculatePipeConnections():void {
        this.connectPipes();
        this.startSteam();
        this.startRockets();
    }

    private connectPipes():void {
        for(let j = 0; j < Config.RocketStationParameters.ROCKET_STATION_WIDTH; j++) {
            for(let i = 0; i < Config.RocketStationParameters.ROCKET_STATION_HEIGHT; i ++) {
                this.connectPipe(i, j);
            }
        }
    }

    private connectPipe(row:number, column:number):void {
        let pipe = this.rocketStationField[row][column];
        pipe.reset();
        for(let side of pipe.getPipeConnectionSides()) {
            this.handleSide(side, pipe, row, column);
        }
    }

    private handleSide(side:PipeSide, pipe:Pipe, row:number, column:number):void {
        switch(side) {
            case PipeSide.Up: {
                pipe.upPipe = this.getUpPipe(row, column);
                return;
            }
            case PipeSide.Right: {
                pipe.rightPipe = this.getRightPipe(row, column);
                return;
            }
            case PipeSide.Down: {
                pipe.downPipe = this.getDownPipe(row, column);
                return;
            }
            case PipeSide.Left: {
                pipe.leftPipe = this.getLeftPipe(row, column);
                return;
            }
        }
    }

    private getUpPipe(row:number, column:number):Pipe {
        return row == 0 || !this.rocketStationField[row - 1][column].isSideConnected(PipeSide.Down) ? null : this.rocketStationField[row - 1][column];
    }

    private getRightPipe(row:number, column:number):Pipe {
        return column == Config.RocketStationParameters.ROCKET_STATION_WIDTH - 1 || !this.rocketStationField[row][column + 1].isSideConnected(PipeSide.Left) ? null : this.rocketStationField[row][column + 1];
    }

    private getDownPipe(row:number, column:number):Pipe {
        return row == Config.RocketStationParameters.ROCKET_STATION_HEIGHT - 1 || !this.rocketStationField[row + 1][column].isSideConnected(PipeSide.Up) ? null : this.rocketStationField[row + 1][column];
    }

    private getLeftPipe(row:number, column:number):Pipe {
        return column == 0 || !this.rocketStationField[row][column - 1].isSideConnected(PipeSide.Right) ? null : this.rocketStationField[row][column - 1];
    }

    private startSteam():void {
        for(let i = 0; i < Config.RocketStationParameters.ROCKET_STATION_HEIGHT; i++) {
            let pipe = this.rocketStationField[i][0];
            if(pipe.isSideConnected(PipeSide.Left)) {
                pipe.connectSteam();
            }
        }
    }

    private startRockets():void {
        for(let i = 0; i < Config.RocketStationParameters.ROCKET_STATION_HEIGHT; i++) {
            let pipe = this.rocketStationField[i][Config.RocketStationParameters.ROCKET_STATION_WIDTH - 1];
            if(pipe.isSideConnected(PipeSide.Right)) {
                pipe.connectRocket();

                if(pipe.isReadyToLaunch()) {
                    this.rockets[i].prepareForLaunch();
                }
            }
        }
    }

    private tryExplodePipes():void {
        if(this.actionExecutor.isRunning)
            return;

        this.launchRockets();
        this.shufflePipes();
        this.generatePipes();
    }

    private launchRockets():void {
        const launchedRockers:Array<Rocket> = [];
        for (var i = 0; i < Config.RocketStationParameters.ROCKET_STATION_HEIGHT; i++) {
            let rocket = this.rockets[i];
            if(rocket.isReadyToLaunch()) {
                launchedRockers.push(rocket);
                this.rockets[i].launch();
            }
        }

        this.eventDispatcher.dispatchEvent(new RocketsLaunchedEvent());
    }

    private shufflePipes():void {
        for (var j = 0; j < Config.RocketStationParameters.ROCKET_STATION_WIDTH; j++) {
            this.shuffleColumn(j);
        }
    }

    private shuffleColumn(column:number):void {
        var emptySlot = -1;
        for (var i = Config.RocketStationParameters.ROCKET_STATION_HEIGHT - 1; i >= 0; i--) {
            if (this.rocketStationField[i][column].isReadyToLaunch()) {
                this.destroyPipe(i, column);
                emptySlot = this.findEmptySlot(i, column, emptySlot);
            }
            else if(emptySlot != -1) {
                this.movePipe(i, column, emptySlot);
                this.adjustField(i, column, emptySlot);
                emptySlot = this.findEmptySlot(i, column, emptySlot);
            }
        }
    }

    private destroyPipe(row:number, column:number):void {
        var pipe = this.rocketStationField[row][column];
        this.rocketStationField[row][column] = null;
        
        this.eventDispatcher.dispatchEvent(new PipeKilledEvent(pipe));
    }

    private findEmptySlot(row:number, column:number, emptySlot:number):number {
        if(emptySlot == -1) {
            return row;
        }

        for (var i = emptySlot; i >= 0; i--) {
            if(this.rocketStationField[i][column] == null) {
                return i;
            }
        }

        throw "Empty slot not found.";
    }

    private adjustField(row:number, column:number, emptySlot:number):void {
        this.rocketStationField[emptySlot][column] = this.rocketStationField[row][column];
        this.rocketStationField[row][column] = null;

        let pipe = this.rocketStationField[emptySlot][column];
        pipe.changeIndexes(emptySlot, column);
    }
}