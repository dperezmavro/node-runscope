const expect = require('expect');

const index = require('../index.js');

describe('Index', () => {
    it('Should run tests correctly',() => {
        expect(1).toBe(1);
    });

    it('Should exist', () => {
        expect(index).toExist();
        expect(index).toNotEqual({});
    })
});
