/// <reference path="../../../../node_modules/robotlegs-pixi/definitions/pixi.d.ts" />

import 'reflect-metadata';
import 'robotlegs';

import PIXI = require('pixi.js');

import { Context, MVCSBundle, IEventDispatcher } from "robotlegs";
import { ContextView, PixiBundle } from "robotlegs-pixi";
import { InjectionConfig } from "./InjectionConfig";
import { Rockets } from "../view/Rockets";
import { Config } from "../Config";
import { GameEvent } from '../events/GameEvent';

export class Application {
    private stage:PIXI.Container;
    private renderer:PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    private context:Context;
    private eventDispatcher:IEventDispatcher;

    constructor () {
        this.renderer = PIXI.autoDetectRenderer(Config.GameDimensions.WIDTH, Config.GameDimensions.HEIGHT, {});
        this.stage = new PIXI.Container();

        this.context = new Context();
        this.context.install(MVCSBundle, PixiBundle).
            configure(InjectionConfig).
            configure(new ContextView(this.renderer.plugins.interaction)).
            initialize();

        this.eventDispatcher = this.context.injector.get(IEventDispatcher);

        document.body.appendChild(this.renderer.view);
    }

    private render(time:number) {
        var updateEvent:GameEvent = new GameEvent(GameEvent.UPDATE_FRAME);
        updateEvent.time = time;
        this.eventDispatcher.dispatchEvent(updateEvent);
        this.renderer.render(this.stage);
        window.requestAnimationFrame(this.render.bind(this));
    }

    public start(view:PIXI.Container):void {
        this.eventDispatcher.dispatchEvent(new GameEvent(GameEvent.APPLICATION_STARTED));
        this.stage.addChild(view);
        window.requestAnimationFrame(this.render.bind(this));
    }
}