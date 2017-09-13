/// <reference path="../../../../node_modules/robotlegs-pixi/definitions/pixi.d.ts" />

import 'reflect-metadata';
import 'robotlegs';

import PIXI = require('pixi.js');

import { injectable, Command, Context, MVCSBundle, IEventDispatcher } from "robotlegs";
import { ContextView, PixiBundle } from "robotlegs-pixi";
import { decorate } from "inversify";

import { UpdateFrameEvent } from './events/UpdateFrameEvent';
import { ApplicationStartedEvent } from './events/ApplicationStartedEvent';

decorate(injectable(), Command);

export class Application {
    private stage:PIXI.Container;
    private renderer:PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    private context:Context;
    private eventDispatcher:IEventDispatcher;

    constructor (config:any, width:number, height:number) {
        this.renderer = PIXI.autoDetectRenderer(width, height, {});
        this.stage = new PIXI.Container();

        this.context = new Context();
        this.context.install(MVCSBundle, PixiBundle).
            configure(config).
            configure(new ContextView(this.renderer.plugins.interaction)).
            initialize();

        this.eventDispatcher = this.context.injector.get(IEventDispatcher);

        document.body.appendChild(this.renderer.view);
    }

    private render(time:number) {
        this.eventDispatcher.dispatchEvent(new UpdateFrameEvent(time));
        this.renderer.render(this.stage);
        window.requestAnimationFrame(this.render.bind(this));
    }

    public start(view:PIXI.Container):void {
        this.eventDispatcher.dispatchEvent(new ApplicationStartedEvent());
        this.stage.addChild(view);
        window.requestAnimationFrame(this.render.bind(this));
    }
}