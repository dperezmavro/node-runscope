const expect = require('expect');

const all = require('../../clients/all.js');

describe('All', () => {
    it('Should exist',() => {
        expect(all).toExist();
        expect(all).toNotEqual({})
    });
});
