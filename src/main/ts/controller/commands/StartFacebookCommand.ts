import { FacebookService } from '../../service/FacebookService';
import PIXI = require('pixi.js');
import { AsyncCommand } from "robotlegs-macrobot";
import { injectable, inject } from 'robotlegs';

@injectable()
export class StartFacebookCommand extends AsyncCommand {

    @inject(FacebookService)
    public facebookService:FacebookService;

    public execute() {
        this.facebookService.start().then(this.facebookStarted.bind(this));
    }

    public facebookStarted() {
        this.dispatchComplete(true);
    }
}
