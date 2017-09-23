import 'reflect-metadata';
import { Pipe } from '../../main/ts/model/station/Pipe';
import { describe, it } from 'mocha';
import { EventDispatcherMock } from './mock/EventDispatcherMock';
import * as Assertion from 'chai';

describe('My context', () => {
    describe('Some event', () => {
        it('should result in something', () => {
            let pipe = new Pipe(10, 20, 0, 0, new EventDispatcherMock());

            Assertion.expect(pipe.x).to.eq(10);
            Assertion.expect(pipe.y).to.eq(20);
            Assertion.expect(pipe.i).to.eq(0);
            Assertion.expect(pipe.j).to.eq(0);
        });
    });
});