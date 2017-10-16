import { injectable, inject, IEventDispatcher } from "robotlegs";
import { IAnimatable } from "../model/actions/IAnimatable";

declare var FBInstant;

@injectable()
export class FacebookService {
    @inject(IEventDispatcher)
    private eventDispatcher:IEventDispatcher;

    public constructor() {}

    public initialize():Promise<void> {
        return FBInstant.initializeAsync();
    }
}

