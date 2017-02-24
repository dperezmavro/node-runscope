const expect = require('expect');

const Runscope = require('../../lib/runscope.js');

describe('Runscope', () => {
    it('Should run tests correctly',() => {
        expect(1).toBe(1);
    });

    it('Should exist', () => {
        expect(Runscope).toExist();
        expect(Runscope).toNotEqual({});
    })
});
