/// <reference path="../../../../node_modules/robotlegs-pixi/definitions/pixi.d.ts" />

import 'reflect-metadata';
import 'robotlegs';

import PIXI = require('pixi.js');

import { Context, MVCSBundle } from "robotlegs";
import { ContextView, PixiBundle } from "robotlegs-pixi";
import { MyConfig } from "../config/MyConfig";
import { Rockets } from "../view/Rockets";
import { Config } from "../Config";
import { View } from '../application/View';

export class Application {
    private stage:PIXI.Container;
    private renderer:PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    private context:Context;
    private view:View;

    constructor () {
        this.renderer = PIXI.autoDetectRenderer(Config.GameDimensions.WIDTH, Config.GameDimensions.HEIGHT, {});
        this.stage = new PIXI.Container();

        this.context = new Context();
        this.context.install(MVCSBundle, PixiBundle).
            configure(new ContextView((<any>this.renderer).plugins.interaction)).
            configure(MyConfig).
            initialize();

        document.body.appendChild(this.renderer.view);
    }

    private render(time:number) {
        this.view.render(time);
        this.renderer.render(this.stage);
        window.requestAnimationFrame(this.render.bind(this));
    }

    public start(view:View):void {
        this.view = view;
        this.stage.addChild(this.view);
        window.requestAnimationFrame(this.render.bind(this));
    }
}