import { IGameAction } from './IGameAction';
import { ActionResult } from './ActionResult';
import { IAnimatable } from './../IAnimatable';

export class GameActionExecutor implements IAnimatable {

    private actions:Array<IGameAction> = [];

    private _isRunning = false;
    public allActionsEnd:Phaser.Signal = new Phaser.Signal();

    get isRunning():boolean {
        return this._isRunning;
    }

    public run(action:IGameAction) {
        this.actions.push(action);
        this._isRunning = true;
    }

    public stop() {
        this.actions.splice(0, this.actions.length);
        this._isRunning = false;
    }

    public animate(elapsedTime:number):void {
        if(!this._isRunning) {
            return;
        }

        this.runActions(elapsedTime);
    }

    private runActions(elapsedTime:number) {
        const actionsToEnd = [];

        for (let action of this.actions) {
            const result = action.step(elapsedTime);
            if(result == ActionResult.Finished) {
                actionsToEnd.push(action);
            }
        }

        for (let action of actionsToEnd) {
            this.actions.splice(this.actions.indexOf(action), 1);
        }

        if(this.actions.length == 0) {
            this._isRunning = false;
            this.allActionsEnd.dispatch();
        }
    }
}


