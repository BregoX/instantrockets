import 'reflect-metadata';
import { Pipe } from '../../main/ts/model/station/Pipe';
import { describe, it } from 'mocha';
import * as Assertion from 'chai';

describe('My another context', () => {
    describe('Some other event', () => {
        it('should result in something else', () => {
            Assertion.expect(true).to.eq(true);
        });
    });
});