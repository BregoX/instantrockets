import { RocketMovedEvent } from '../../../main/ts/model/station/events/RocketMovedEvent';
import { EventDispatcherMock } from '../mock/EventDispatcherMock';
import { Rocket } from '../../../main/ts/model/station/Rocket';
import 'reflect-metadata';
import { Pipe } from '../../../main/ts/model/station/Pipe';
import { expect } from 'chai';
import { Config } from '../../../main/ts/Config';

describe('Rocket', function() {
    it('should reward player with proper score', function() {
        let rocket = new Rocket(0, 0, 0, new EventDispatcherMock());

        let reward = rocket.getScoreReward();

        expect(reward).to.equal(Config.RocketParameters.INITIAL_LEVEL * Config.RocketParameters.SCORE_MULTIPLIER);
    });

    it('should emit move event with proper coordinates when moved', function() {
        let eventDispatcher = new EventDispatcherMock();
        let rocket = new Rocket(0, 0, 0, eventDispatcher);

        rocket.move(10, 10);
        let event:RocketMovedEvent = <RocketMovedEvent>eventDispatcher.getLastDispatchedEvent();

        expect(event.rocket.x).to.equal(10);
        expect(event.rocket.y).to.equal(10);
    });

    it('should not be prepared for launch right after creation', function() {
        let rocket = new Rocket(0, 0, 0, new EventDispatcherMock());

        expect(rocket.isReadyToLaunch()).to.equal(false);
    });

    it('should be prepared for launch after being told to do so', function() {
        let rocket = new Rocket(0, 0, 0, new EventDispatcherMock());
        
        rocket.prepareForLaunch();

        expect(rocket.isReadyToLaunch()).to.equal(true);
    })

    it('should get back to not launched state after being launched', function () {
        let rocket = new Rocket(0, 0, 0, new EventDispatcherMock());
        
        rocket.prepareForLaunch();
        rocket.launch();

        expect(rocket.isReadyToLaunch()).to.equal(false);
    })
});