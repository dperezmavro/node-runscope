const expect = require('expect');

const Runscope = require('../index.js');

describe('Runscope', () => {
    it('Should run tests correctly',() => {
        expect(1).toBe(1);
    });

    it('should exist', () => {
        expect(Runscope).toExist();
        expect(Runscope).toNotEqual({});
    })
});
