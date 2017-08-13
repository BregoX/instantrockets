import { Container } from "pixi.js";

export class Rockets2 extends Container {

    public static ROOT_VIEW:Rockets2;

    constructor () {
        super();
        Rockets2.ROOT_VIEW = this;
    }

}

