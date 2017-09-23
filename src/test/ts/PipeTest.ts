import 'reflect-metadata';
import { Pipe } from '../../main/ts/model/station/Pipe';
import { EventDispatcherMock } from './mock/EventDispatcherMock';
import { expect } from 'chai';

describe('My context', () => {
    describe('Some event', () => {
        it('should result in something', () => {
            let pipe = new Pipe(10, 20, 0, 0, new EventDispatcherMock());

            expect(pipe.x).to.equal(10);
            expect(pipe.y).to.equal(20);
            expect(pipe.i).to.equal(0);
            expect(pipe.j).to.equal(0);
        });
    });
});