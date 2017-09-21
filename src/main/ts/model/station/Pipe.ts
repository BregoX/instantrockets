import { PipeCreatedEvent } from './events/PipeCreatedEvent';
import { Config } from "../../Config";
import { IActable } from "../actions/IActable";
import { PipeType } from "./data/PipeType";
import { PipeSide } from "./data/PipeSide";
import { IEventDispatcher } from "robotlegs";
import { PipeUpdatedEvent } from './events/PipeUpdatedEvent';

export class Pipe implements IActable {
    private rotationState:number = 0;

    public type:PipeType;
    
    public isSteamConnected:boolean = false;
    public isRocketConnected:boolean = false;

    public x:number;
    public y:number;

    public i:number;
    public j:number;

    public rotation:number;

    public upPipe:Pipe;
    public rightPipe:Pipe;
    public downPipe:Pipe;
    public leftPipe:Pipe;

    private eventDispatcher:IEventDispatcher;

    constructor(x:number, y:number, i:number, j:number, eventDispatcher:IEventDispatcher) {
        this.eventDispatcher = eventDispatcher;
        
        this.type = this.generateType();
        this.i = i;
        this.j = j;

        this.x = x;
        this.y = y;

        this.rotate(this.generateRotation());
    }

    public changeIndexes(i:number, j:number) {
        this.i = i;
        this.j = j;
        
        this.eventDispatcher.dispatchEvent(new PipeUpdatedEvent(this));
    }

    public move(x:number, y:number) {
        this.x = x;
        this.y = y;

        this.eventDispatcher.dispatchEvent(new PipeUpdatedEvent(this));
    }

    public connectSteam() {
        if(this.isSteamConnected) {
            return;
        }

        this.isSteamConnected = true;
        this.eventDispatcher.dispatchEvent(new PipeUpdatedEvent(this));

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
        this.eventDispatcher.dispatchEvent(new PipeUpdatedEvent(this));

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

    public reset() {
        this.upPipe = null;
        this.downPipe = null;
        this.rightPipe = null;
        this.leftPipe = null;

        this.isSteamConnected = false;
        this.isRocketConnected = false;

        this.eventDispatcher.dispatchEvent(new PipeUpdatedEvent(this));
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

    public rotate(times:number = 1) {
        let oldRotationState:number = this.rotationState;
        let newRotationState:number = (oldRotationState + times) % PipeSide.length;
        let rotationTimes:number = newRotationState - oldRotationState;
        this.rotationState = newRotationState;
        this.rotation = 90 * rotationTimes * Math.PI / 180;
    }
}