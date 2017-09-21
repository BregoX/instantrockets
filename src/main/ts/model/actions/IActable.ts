import {Point} from 'pixi.js';

export interface IActable {
    x:number;
    y:number;
    move(x:number, y:number);
}