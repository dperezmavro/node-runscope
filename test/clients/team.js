const expect = require('expect');
const sinon = require('sinon');
const uuid = require('uuid');

const Team = require('../../clients/team.js');
const Runscope = require('../../lib/runscope.js');

describe('Team', () => {
    const apiData = [
        {
            "email": "grace@example.com",
            "name": "Grace Hopper",
            "uuid": uuid(),
        },
        {
            "email": "ada@example.com",
            "name": "Ada Lovelace",
            "uuid": uuid()
        }
    ];

    it('Should exist',() => {
        expect(Team).toExist();
        expect(Team).toNotEqual({});
    });

    it('Should extend runscope', () => {
        var b = new Team(undefined);
        expect(b instanceof Runscope).toBe(true);
    });

    it('Should return /teams/id/people url', () => {
        var a = new Team(undefined);
        var id = uuid();
        expect(a.getTeamsMemberListUrl(id)).toEqual(`/teams/${id}/people`);
    });

    it('Should return a promise for /account', () => {
        var instance = {get: function(){}};
        sinon.stub(instance, 'get', function(url) {
            return new Promise((acc, rej) => {});
        });

        var a = new Team(undefined);
        a.instance = instance;
        var res = a.teamMembersList(undefined);
        expect(res.then).toNotBe(undefined);
    });
    //
    // it('Should call /account with the correct parameters', () => {
    //     var instance = {get: function(){}};
    //     sinon.stub(instance, 'get', function(url) {
    //         expect(url).toEqual('/account');
    //         return new Promise((acc, rej) => {});
    //     });
    //
    //     var a = new Team(undefined);
    //     a.accountResource();
    // });
    //
    // it('Should fail promise for /account', () => {
    //     var instance = {get: function(){}};
    //     var id = uuid();
    //     sinon.stub(instance, 'get', function(url) {
    //         return new Promise((acc, rej) => {
    //             rej(id);
    //         });
    //     });
    //
    //     var a = new Team(undefined);
    //     a.instance = instance;
    //     a.accountResource()
    //     .then((e) => { expect(0).toBe(1)},
    //     (err) => {
    //         expect(err).toBe(id);
    //     });
    // });
    //
    // it('Should resolve promise for /account', () => {
    //     var instance = {get: function(){}};
    //     sinon.stub(instance, 'get', function(url) {
    //         return new Promise((acc, rej) => {
    //             acc(apiResponse);
    //         });
    //     });
    //
    //     var a = new Team(undefined);
    //     a.instance = instance;
    //     a.accountResource()
    //     .then((data) => {
    //         expect(data).toBe(apiData);
    //     },
    //     (e) => { expect(0).toBe(1)});
    // });
    //
    // it('Should modify this.data for /account', () => {
    //
    //     var instance = {get: function(){}};
    //     sinon.stub(instance, 'get', function(url) {
    //         return new Promise((acc, rej) => {
    //             acc(apiResponse);
    //         });
    //     });
    //
    //     var a = new Team(undefined);
    //     a.instance = instance;
    //     a.accountResource()
    //     .then(
    //     (resp) => {
    //         expect(resp).toEqual(apiData);
    //         expect(a.data).toEqual(apiData);
    //     },
    //     (err) => {
    //         expect(0).toBe(1);
    //     });
    // });

});
