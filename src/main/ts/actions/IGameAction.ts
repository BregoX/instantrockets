import { ActionResult } from './ActionResult';
export interface IGameAction {
    step(deltaTime:number):ActionResult;
}

