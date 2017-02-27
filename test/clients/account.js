const expect = require('expect');
const sinon = require('sinon');
const uuid = require('uuid');

const Account = require('../../clients/account.js');
const Runscope = require('../../lib/runscope.js');

describe('Account', () => {
    const apiData = {
        "name": "Grace Hopper",
        "uuid": uuid(),
        "email": "grace@example.com",
        "teams": [
            {
                "uuid": uuid(),
                "name": "Amazing Grace"
            }
        ]
    };
    const apiResponse ={
        "data": apiData,
        "meta": {
            "status": "success"
        }
    }

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

    it('Should fail promise for /account', () => {
        var instance = {get: function(){}};
        var id = uuid();
        sinon.stub(instance, 'get', function(url) {
            return new Promise((acc, rej) => {
                rej(id);
            });
        });

        var a = new Account(undefined);
        a.instance = instance;
        a.accountResource()
        .then((e) => { expect(0).toBe(1)},
        (err) => {
            expect(err).toBe(id);
        });
    });

    it('Should resolve promise for /account', () => {
        var instance = {get: function(){}};
        sinon.stub(instance, 'get', function(url) {
            return new Promise((acc, rej) => {
                acc(apiResponse);
            });
        });

        var a = new Account(undefined);
        a.instance = instance;
        a.accountResource()
        .then((data) => {
            expect(data).toBe(apiData);
        },
        (e) => { expect(0).toBe(1)});
    });

    it('Should modify this.data for /account', () => {

        var instance = {get: function(){}};
        sinon.stub(instance, 'get', function(url) {
            return new Promise((acc, rej) => {
                acc(apiResponse);
            });
        });

        var a = new Account(undefined);
        a.instance = instance;
        a.accountResource()
        .then(
        (resp) => {
            expect(resp).toEqual(apiData);
            expect(a.data).toEqual(apiData);
        },
        (err) => {
            expect(0).toBe(1);
        });
    });

});
