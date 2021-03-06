/// <reference path="../../../lib/phaser/phaser.d.ts"/>

import { Pipe } from './Pipe';
import { Rocket } from './Rocket';
import { Config } from './Config';
import { PipeSide } from './PipeSide';
import {Rockets} from "./Rockets";
import { MoveAction } from './actions/MoveAction';
import { DelayAction } from './actions/DelayAction';
import { SequenceAction } from './actions/SequenceAction';
import { GameActionExecutor } from './actions/GameActionExecutor';

import TileDimensions = Config.TileDimensions;

export class RocketStation {
    private rocketStationField:Pipe[][];
    private rockets:Rocket[];

    private game:Phaser.Game;
    private position:Phaser.Point;
    private rocketGame:Rockets;
    private actionExecutor:GameActionExecutor;

    constructor(game:Phaser.Game, position:Phaser.Point, rocketGame:Rockets) {
        this.rockets = [];
        this.rocketStationField = [];
        this.position = position;
        this.game = game;
        this.rocketGame = rocketGame;

        this.actionExecutor = new GameActionExecutor();
        Rockets.addAnimatable(this.actionExecutor);

        this.generateRockets();

        this.actionExecutor.allActionsEnd.add(this.tryExplodePipes, this);

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
            
            this.rockets[i] = new Rocket(this.game, rocketPosition);
        }
    }

    private getTilePosition(row:number, column:number):Phaser.Point {
        return new Phaser.Point(
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

                this.rocketStationField[i][j] = new Pipe(this.game, this.getInitialTilePosition(i, j));
                this.rocketStationField[i][j].pressed.add(this.onPipeTilePressed, this);

                this.movePipe(i, j, i);
            }
        }
    }

    private onPipeTilePressed():void {
        this.calculatePipeConnections();
        this.tryExplodePipes();
    }

    private getInitialTilePosition(row:number, column:number):Phaser.Point {
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
        this.rocketGame.addScores(launchedRockers);
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
        this.rocketStationField[row][column].pressed.add(this.tryExplodePipes, this);
        var pipe = this.rocketStationField[row][column];
        this.rocketStationField[row][column] = null;
        pipe.kill();
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
    }
}