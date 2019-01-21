import {SequenceMacro, SubCommandPayload} from "robotlegs-macrobot";
import { inject, injectable} from "robotlegs";
import {PipePressedEvent} from "../events/PipePressedEvent";
import {RotatePipeCommand} from "./RotatePipeCommand";
import {PipePressedEventWrapper} from "./utils/PipePressedEventWrapper";

@injectable()
export class HandleRotatePipeCommand extends SequenceMacro {

    @inject(PipePressedEvent)
    public pipeEvent:PipePressedEvent;

    private pipePressedEventWrapper:PipePressedEventWrapper;

    prepare(): void {
        this.pipePressedEventWrapper = new PipePressedEventWrapper();
        const payload: SubCommandPayload = new SubCommandPayload(this.pipePressedEventWrapper, PipePressedEventWrapper);
        this.add(RotatePipeCommand).withPayloads(payload);
    }

    public execute() {
        this.pipePressedEventWrapper.setupEvent(this.pipeEvent);
        super.execute();
    }

}