/// <reference path="../../../../node_modules/robotlegs-pixi/definitions/pixi.d.ts" />

import 'reflect-metadata';
import 'robotlegs';

import PIXI = require('pixi.js');

import { injectable, Command, Context, MVCSBundle, IEventDispatcher } from "robotlegs";
import { ContextView, PixiBundle } from "robotlegs-pixi";
import { decorate } from "inversify";

import { UpdateFrameEvent } from './events/UpdateFrameEvent';
import { ApplicationStartedEvent } from './events/ApplicationStartedEvent';
import { Container, CanvasRenderer, WebGLRenderer } from 'pixi.js';

decorate(injectable(), Command);

export class Application {
    private stage:Container;
    private renderer:CanvasRenderer | WebGLRenderer;
    private context:Context;
    private eventDispatcher:IEventDispatcher;
    private updateFrameEvent:UpdateFrameEvent;
    private ratio:number;

    constructor (config:any, width:number, height:number) {
        this.renderer = PIXI.autoDetectRenderer(width, height, {});
        this.ratio = width / height;
        this.updateFrameEvent = new UpdateFrameEvent();
        this.stage = new Container();

        this.context = new Context();
        this.context.install(MVCSBundle, PixiBundle).
            configure(config).
            configure(new ContextView(this.renderer.plugins.interaction)).
            initialize();

        this.eventDispatcher = this.context.injector.get(IEventDispatcher);

        document.body.appendChild(this.renderer.view);
        window.onresize = this.onResize.bind(this);
        this.onResize();
    }

    private onResize() {
        var width:number;
        var height:number;

        if(this.isPortrait()) {
            width = window.innerWidth;
            height = Math.floor(width / this.ratio);
        } else {
            height = window.innerHeight;
            width = Math.floor(height * this.ratio);
        }

        this.renderer.view.style.width = `${width}px`;
        this.renderer.view.style.height = `${height}px`;
    }

    private isPortrait() {
        return (window.innerWidth / window.innerHeight) < 1;
    }

    private render(time:number) {
        this.dispatchUpdateFrame(time);
        this.renderer.render(this.stage);
        window.requestAnimationFrame(this.render.bind(this));
    }

    private dispatchUpdateFrame(time:number):void {
        this.updateFrameEvent.setTime(time);
        this.eventDispatcher.dispatchEvent(this.updateFrameEvent);
    }

    public start(view:Container):void {
        this.stage.addChild(view);
        window.requestAnimationFrame(this.render.bind(this));
        this.eventDispatcher.dispatchEvent(new ApplicationStartedEvent());
    }
}