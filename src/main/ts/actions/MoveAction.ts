import {IGameAction} from "./IGameAction";
import {ActionResult} from "./ActionResult";
    import {Point} from 'pixi.js';
import {IActable} from "./IActable";

export class MoveAction implements IGameAction {
    private actable:IActable;
    private startPoint:Point;
    private destination:Point;
    private duration:number;
    private totalDuration:number;
    private isStarted:Boolean;
    private isCompleted:Boolean;
    private stepX:number;
    private directionX:number;
    private stepY:number;
    private directionY:number;

    public constructor(actable:IActable, destination:Point, duration:number) {
        this.actable = actable;
        this.startPoint = new Point(actable.x, actable.y);
        this.destination = destination;
        this.duration = 0;
        this.totalDuration = duration;
        this.isStarted = false;
        this.isCompleted = false;

        this.stepX = Math.abs(this.startPoint.x - this.destination.x) / this.totalDuration;
        this.directionX = this.destination.x >= this.startPoint.x ? 1 : -1;

        this.stepY = Math.abs(this.startPoint.y - this.destination.y) / this.totalDuration;
        this.directionY = this.destination.y >= this.startPoint.y ? 1 : -1;
    }

    public step(deltaTime:number):ActionResult {
        this.duration += deltaTime;
        if(this.duration > this.totalDuration) {
            this.duration = this.totalDuration;
            this.isCompleted = true;
            this.actable.x = this.destination.x;
            this.actable.y = this.destination.y;
        } else {
            this.moveX();
            this.moveY();
        }


        return this.isCompleted ? ActionResult.Finished : ActionResult.Continue;
    }

    private moveX() {
        this.actable.x = this.startPoint.x + this.stepX * this.duration * this.directionX;
    }

    private moveY() {
        this.actable.y = this.startPoint.y + this.stepY * this.duration * this.directionY;
}
} 


