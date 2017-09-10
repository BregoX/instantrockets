/// <reference path="../../../node_modules/robotlegs-pixi/definitions/pixi.d.ts" />

import "reflect-metadata";
import "robotlegs";

import PIXI = require('pixi.js');

// import {Rockets} from "./Rockets";
import {Context, MVCSBundle, EventDispatcherExtension, EventCommandMapExtension} from "robotlegs";
import {ContextView, PixiBundle} from "robotlegs-pixi";
import {MyConfig} from "./config/MyConfig";
import {Rockets} from "./view/Rockets";
import {Config} from "./Config";

class Main {
    stage: PIXI.Container;
    renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    context: Context;

    constructor () {
        this.renderer = PIXI.autoDetectRenderer(Config.GameDimensions.WIDTH, Config.GameDimensions.HEIGHT, {});
        this.stage = new PIXI.Container();

        this.context = new Context();
        this.context.install(
            MVCSBundle,
            PixiBundle,
            EventDispatcherExtension,
            EventCommandMapExtension
        ).
        configure(new ContextView((<any>this.renderer).plugins.interaction)).
        configure(MyConfig).
        initialize();

        this.stage.addChild(new Rockets());

        document.body.appendChild(this.renderer.view);
    }

    render = (frameTime) => {
        Rockets.ROOT_VIEW.enterFrame(frameTime);
        this.renderer.render(this.stage);
        window.requestAnimationFrame(this.render);
    }
}

let main = new Main();
main.render(0);