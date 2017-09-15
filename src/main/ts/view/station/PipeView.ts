import { Sprite, MiniSignal, Point } from 'pixi.js';
import { Config } from "../Config";
import { IActable } from '../model/actions/IActable';
import { PipeType } from '../model/PipeType';
import { Color } from '../model/Color';
import { PipeSide } from '../model/PipeSide';

export class PipeView extends Sprite {
    constructor(spriteName:string, position:Point) {
        super(PIXI.loader.resources["assets/assets.json"].textures[spriteName]);
        this.buttonMode = true;
        this.anchor.set(0.5);
        this.position = position;

        this.interactive = true;
        this.buttonMode = true;

        this.x = position.x;
        this.y = position.y;
    }
}