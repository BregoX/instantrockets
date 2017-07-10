/// <reference path="./static/scripts/phaser.d.ts"/>

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
        this.game.load.image('background', 'background.png');
    }

    public create() {
        this.createBackground();
    }

    private createBackground() {
        var background = this.game.add.sprite(0, 0, 'background');
        background.anchor.setTo(0, 0);
        background.height = this.game.height;
        background.width = this.game.width;
    }
}
