import {IGameAction} from "./IGameAction";
import {ActionResult} from "./ActionResult";
    import {Point} from 'pixi.js';
import {IActable} from "./IActable";

export class MoveAction implements IGameAction {
    private actable:IActable;
    private destination:Point;
    private duration:number;
    private isStarted:Boolean;
    private isCompleted:Boolean;

    public constructor(actable:IActable, destination:Point, duration:number) {
        this.actable = actable;
        this.destination = destination;
        this.duration = duration;
        this.isStarted = false;
        this.isCompleted = false;
    }

    public step(deltaTime:number):ActionResult {
            // if(!this.isStarted) {
            //     let self = this;
            //     this.isStarted = true;
            //     const tween = Rockets.GAME.add.tween(this.actable).to({x : this.destination.x, y:this.destination.y}, this.duration, "Linear", true);
            //     tween.onComplete.add(function() {
            //         self.isCompleted = true;
            //     });
            // }
            this.actable.x = this.destination.x;
            this.actable.y = this.destination.y;
            this.isCompleted = true;
        return this.isCompleted ? ActionResult.Finished : ActionResult.Continue;
    }
} 


