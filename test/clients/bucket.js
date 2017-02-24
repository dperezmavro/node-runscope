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

    it('Should return promise for /buckets', () => {
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

    it('Should return correct /buckets/<id> url', () => {
        var b = new Bucket(undefined, undefined);
        var id = uuid();
        expect(b.getBucketDetailsUrl(id)).toBe(`/buckets/${id}`);
    });

    it('Should return promise for /buckets/<id>', () => {
        var instance = {get: function(){}};
        var id = uuid();
        sinon.stub(instance, 'get', function(url) {
            expect(url).toEqual(`/buckets/${id}`);
            return new Promise((acc, rej) => {});
        })

        var b = new Bucket(undefined, undefined);
        b.instance = instance;
        var a = b.bucketDetails(id);

        expect(a.then).toNotBe(undefined);
    });

    it('Should set this.bucketKey for /buckets/<id>', () => {
        var instance = {get: function(){}};
        var id = uuid();
        sinon.stub(instance, 'get', function(url) {
            expect(url).toEqual(`/buckets/${id}`);
            return new Promise((acc, rej) => {});
        })

        var b = new Bucket(undefined, undefined);
        b.instance = instance;
        b.bucketDetails(id);
        expect(b.bucketKey).toEqual(id);
    });

    it('Should set this.bucketName for /buckets/<id>', () => {
        var instance = {get: function(){}};
        var id = uuid();
        var name = uuid();
        sinon.stub(instance, 'get', function(url) {
            expect(url).toEqual(`/buckets/${id}`);
            return new Promise((acc, rej) => {});
        })

        var b = new Bucket(undefined, undefined);
        b.instance = instance;
        b.bucketDetails(id);
        expect(b.bucketKey).toEqual(id);
        expect(b.bucketName).toEqual(name);
    });


});
