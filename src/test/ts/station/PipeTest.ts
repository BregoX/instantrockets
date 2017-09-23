import { PipeUpdatedEvent } from '../../../main/ts/model/station/events/PipeUpdatedEvent';
import 'reflect-metadata';
import { Pipe } from '../../../main/ts/model/station/Pipe';
import { EventDispatcherMock } from '../mock/EventDispatcherMock';
import { expect } from 'chai';

describe('Pipe', () => {
    it('should reset properly', () => {
        let eventDispatcher = new EventDispatcherMock();
        let pipe = new Pipe(10, 20, 0, 0, eventDispatcher);

        pipe.connectSteam();
        pipe.connectRocket();

        pipe.upPipe = new Pipe(10, 20, 0, 0, eventDispatcher);
        pipe.downPipe = new Pipe(10, 20, 0, 0, eventDispatcher);
        pipe.leftPipe = new Pipe(10, 20, 0, 0, eventDispatcher);
        pipe.rightPipe = new Pipe(10, 20, 0, 0, eventDispatcher);

        pipe.reset();
        let event:PipeUpdatedEvent = <PipeUpdatedEvent>eventDispatcher.getLastDispatchedEvent();

        expect(event.pipe.isReadyToLaunch()).to.equal(false);
        expect(event.pipe.isSteamConnected).to.equal(false);
        expect(event.pipe.isRocketConnected).to.equal(false);
        expect(event.pipe.upPipe).to.equal(null);
        expect(event.pipe.downPipe).to.equal(null);
        expect(event.pipe.leftPipe).to.equal(null);
        expect(event.pipe.rightPipe).to.equal(null);
    });
});