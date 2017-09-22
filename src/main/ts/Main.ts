import { Application } from "./platform/Application";
import { InjectionConfig } from "./InjectionConfig";
import { RocketsGameView } from "./view/RocketsGameView";

let applicationWidth = 375;
let applicationHeight = 667;

let application = new Application(InjectionConfig, applicationWidth, applicationHeight);
application.start(new RocketsGameView());

window["testbed"] = {};