import { IGameAction } from './IGameAction';
import { ActionResult } from './ActionResult';

    export class DelayAction implements IGameAction
    {
        private targetTime:number;
        private elapsedTime:number;

        constructor(delay:number){
            this.targetTime = delay;
            this.elapsedTime = 0;
        }




        public step (deltaTime:number):ActionResult{
            this.elapsedTime += deltaTime;

            if(this.elapsedTime >= this.targetTime) {
                return ActionResult.Finished;
            }
            return ActionResult.Continue;
        }

    }


