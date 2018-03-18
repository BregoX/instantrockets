import { Container, Text, Point, Sprite } from "pixi.js";
import { RocketStationView } from "./station/RocketStationView";

export class RocketsGameView extends Container {
    constructor() {
        super();
    }

    public createStation():void {
        this.addChild(new RocketStationView());
    }

    //TODO.PAVELZA: background should be a part of station component
    public createBackground():void {
        let sprite = new Sprite(PIXI.loader.resources["assets/assets.json"].textures["bg.png"]);
        this.addChild(sprite);
    }
}