const expect = require('expect');
const sinon = require('sinon');
const uuid = require('uuid');

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
    });

    it('Should return the bucket list url', () => {
        var b = new Bucket(undefined, undefined);
        expect(b.getBucketListUrl()).toEqual("/buckets");
    });

    it('Should return promise for get request', () => {
        var instance = {get: function(){}};
        sinon.stub(instance, 'get', function(url) {
            expect(url).toEqual('/buckets');
            return new Promise((acc, rej) => {});
        })

        var b = new Bucket(undefined, undefined);
        b.instance = instance;
        var a = b.bucketList();

        expect(a.then).toNotBe(undefined);
    });

    it('Should return promise for get request', () => {
        var b = new Bucket(undefined, undefined);
        var id = uuid();
        expect(b.getBucketDetailsUrl(id)).toBe(`/buckets/${id}`);
    });
});
