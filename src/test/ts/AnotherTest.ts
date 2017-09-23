import 'reflect-metadata';
import { Pipe } from '../../main/ts/model/station/Pipe';
import * as Chai from 'chai';
import { describe, it } from 'mocha';

describe('My another context', () => {
    describe('Some other event', () => {
        it('should result in something else', () => {
            Chai.expect(true).to.eq(true);
        });
    });
});