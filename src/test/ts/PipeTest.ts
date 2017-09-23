import 'reflect-metadata';
import { Pipe } from '../../main/ts/model/station/Pipe';
import * as Chai from 'chai';
import { describe, it } from 'mocha';
import { EventDispatcherMock } from './mock/EventDispatcherMock';

describe('My context', () => {
    describe('Some event', () => {
        it('should result in something', () => {
            let pipe = new Pipe(10, 20, 0, 0, new EventDispatcherMock());

            Chai.expect(pipe.x).to.eq(10);
            Chai.expect(pipe.y).to.eq(20);
            Chai.expect(pipe.i).to.eq(0);
            Chai.expect(pipe.j).to.eq(0);
        });
    });
});