/// <reference path="../../../lib/phaser/phaser.d.ts"/>

import {Config} from "./Config"

export class Rockets {
    private game: Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(
            Config.GameDimensions.WIDTH,
            Config.GameDimensions.HEIGHT,
            Phaser.WEBGL,
            Config.GamePlacement.ATTACH_TO_BODY,
            this);
    }

    public preload() {
        this.game.load.atlasJSONHash('assets', './assets/assets.png', './assets/assets.json');
    }

    public create() {
        this.createBackground();
        this.createPipe();
    }

    private createBackground() {
        const background = this.game.add.sprite(0, 0, 'assets', 'bg.png');
        background.inputEnabled = true;
        background.height = this.game.height;
        background.width = this.game.width;
    }

    private createPipe() {
        const pipe = this.game.add.sprite(0, 0, 'assets', 'triple.png');
        pipe.inputEnabled = true;
        pipe.x = 200;
        pipe.y = 200;
        pipe.anchor.setTo(0.5, 0.5);
        pipe.events.onInputDown.add(() => {
            pipe.angle += 90;
        });
    }
}
