const expect = require('expect');

const Bucket = require('../../clients/bucket.js');
const Runscope = require('../../lib/runscope.js');

describe('Bucket', () => {
    it('Should exist',() => {
        expect(Bucket).toExist();
        expect(Bucket).toNotEqual({});
    });

    it('Should extend runscope', () => {
        var b = new Bucket(undefined);
        expect(b instanceof Runscope).toBe(true);
    })
});
