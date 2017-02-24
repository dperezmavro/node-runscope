const expect = require('expect');

const bucket = require('../../clients/bucket.js');

describe('Bucket', () => {
    it('Should exist',() => {
        expect(bucket).toExist();
        expect(bucket).toNotEqual({})
    });
});
