/// <reference path="../../../lib/phaser/phaser.d.ts"/>

import { Config } from './Config';
import { Pipe } from './Pipe';
import { Rocket } from './Rocket';

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
        let pipe:Pipe = this.createPipe();
        let rocket:Rocket = this.createRocket();

        pipe.pressed.addOnce(() => {
            window.alert("Rocket killed.");
            rocket.kill();
        });
    }

    private createBackground() {
        const background = this.game.add.sprite(0, 0, 'assets', 'bg.png');
        background.inputEnabled = true;
        background.height = this.game.height;
        background.width = this.game.width;
    }

    private createPipe():Pipe {
        return new Pipe(this.game, new Phaser.Point(100, 100));
    }

    private createRocket():Rocket {
        return new Rocket(this.game, new Phaser.Point(200, 200));
    }
}
