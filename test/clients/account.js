const expect = require('expect');
const sinon = require('sinon');
const uuid = require('uuid');

const Account = require('../../clients/account.js');
const Runscope = require('../../lib/runscope.js');

describe('Bucket', () => {
    it('Should exist',() => {
        expect(Account).toExist();
        expect(Account).toNotEqual({});
    });

    it('Should extend runscope', () => {
        var b = new Account(undefined);
        expect(b instanceof Runscope).toBe(true);
    });

    it('Should return /accounts url', () => {
        var a = new Account(undefined);
        expect(a.getAccountUrl()).toEqual('/account');
    });

    it('Should return a promise for /account', () => {
        var instance = {get: function(){}};
        sinon.stub(instance, 'get', function(url) {
            return new Promise((acc, rej) => {});
        });

        var a = new Account(undefined);
        a.instance = instance;
        var res = a.accountResource();
        expect(res.then).toNotBe(undefined);
    });

    it('Should call /account with the correct parameters', () => {
        var instance = {get: function(){}};
        sinon.stub(instance, 'get', function(url) {
            expect(url).toEqual('/account');
            return new Promise((acc, rej) => {});
        });

        var a = new Account(undefined);
        a.accountResource();
    });
});
