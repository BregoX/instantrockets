import { FacebookService } from '../../service/FacebookService';
import PIXI = require('pixi.js');
import { AsyncCommand } from "robotlegs-macrobot";
import { injectable, inject } from 'robotlegs';

@injectable()
export class InitializeFacebookCommand extends AsyncCommand {

    @inject(FacebookService)
    public facebookService:FacebookService;

    public execute() {
        this.facebookService.initialize().then(this.facebookInitialized.bind(this));
    }

    public facebookInitialized() {
        this.dispatchComplete(true);
    }
}
