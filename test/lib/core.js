const expect = require('expect');

const core = require('../../lib/core.js');

describe('Core', () => {
    it('Should exist',() => {
        expect(core).toExist();
        expect(core).toNotEqual({});
    });
});
