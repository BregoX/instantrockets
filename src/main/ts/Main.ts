import { Application } from "./application/Application";
import { Rockets } from "./view/Rockets";

let app = new Application();
app.start(new Rockets());