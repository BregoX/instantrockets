
    import {IGameAction} from "./IGameAction";
    import {ActionResult} from "./ActionResult";
    export class SequenceAction implements IGameAction
    {
        private actionQueue:Array<IGameAction>;
        private currentAction:IGameAction;

        public constructor(sequencedActions:Array<IGameAction>)
        {
            this.actionQueue = [];

            for(let action of sequencedActions) {
                this.actionQueue.push(action);
            }

            this.currentAction = this.actionQueue.shift();
        }

        public step(deltaTime:number):ActionResult
        {
            let result = this.currentAction.step(deltaTime);

            if(result == ActionResult.Continue) {
                return ActionResult.Continue;
            }

            if(this.actionQueue.length == 0) {
                return ActionResult.Finished;
            }

            this.currentAction = this.actionQueue.shift();
            return ActionResult.Continue;
        }
    }