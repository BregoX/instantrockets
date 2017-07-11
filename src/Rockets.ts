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
        this.game.load.atlasJSONHash('pipe', 'spritesheet.png', 'spritesheet.json');
    }

    public create() {
        this.createBackground();
        this.createPipe();
    }

    private createBackground() {
        var background = this.game.add.sprite(0, 0, 'background');
        background.inputEnabled = true;
        background.height = this.game.height;
        background.width = this.game.width;
    }

    private createPipe() {
        var pipe = this.game.add.sprite(0, 0, 'pipe', 'bent');
        pipe.inputEnabled = true;
        pipe.height = 50;
        pipe.width = 50;
        pipe.x = 200;
        pipe.y = 200;
        pipe.anchor.setTo(0.5, 0.5);
        pipe.events.onInputDown.add(() => {
            pipe.angle += 90;
        });
    }
}
