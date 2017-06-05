// const expect = require('expect');
// const sinon = require('sinon');
// const uuid = require('uuid');
//
// const Test = require('../../clients/test.js');
// const Runscope = require('../../lib/runscope.js');
//
// describe('Test', () => {
//     const testDetails = {
//         "created_at": 1438832081,
//         "created_by": {
//             "email": "grace@example.com",
//             "name": "Grace Hopper",
//             "id": "4ee15ecc-7fe1-43cb-aa12-ef50420f2cf9"
//         },
//         "default_environment_id": "a50b63cc-c377-4823-9a95-8b91f12326f2",
//         "description": null,
//         "environments": [
//             {
//                 "emails": {
//                     "notify_all": false,
//                     "notify_on": "all",
//                     "notify_threshold": 1,
//                     "recipients": []
//                 },
//                 "initial_variables": {
//                     "base_url": "https://api.example.com"
//                 },
//                 "integrations": [
//                     {
//                         "description": "Pagerduty Account",
//                         "integration_type": "pagerduty",
//                         "id": "53776d9a-4f34-4f1f-9gff-c155dfb6692e"
//                     }
//                 ],
//                 "name": "Test Settings",
//                 "parent_environment_id": null,
//                 "preserve_cookies": false,
//                 "regions": [
//                     "us1"
//                 ],
//                 "remote_agents": [],
//                 "script": "",
//                 "test_id": "626a024c-f75e-4f57-82d4-104fe443c0f3",
//                 "id": "a50b63cc-c377-4823-9a95-8b91f12326f2",
//                 "verify_ssl": true,
//                 "webhooks": null
//             }
//         ],
//         "last_run": null,
//         "name": "Sample Name",
//         "schedules": [],
//         "steps": [
//             {
//                 "assertions": [
//                     {
//                         "comparison": "is_equal",
//                         "source": "response_status",
//                         "value": 200
//                     }
//                 ],
//                 "auth": {},
//                 "body": "",
//                 "form": {},
//                 "headers": {},
//                 "method": "GET",
//                 "note": "",
//                 "step_type": "request",
//                 "url": "https://yourapihere.com/",
//                 "id": "53f8e1fd-0989-491a-9f15-cc055f27d097",
//                 "variables": []
//             }
//         ],
//         "trigger_url": "http://api.runscope.com/radar/b96ecee2-cce6-4d80-8f07-33ac22a22ebd/trigger",
//         "id": "626a024c-f75e-4f57-82d4-104fe443c0f3"
//     };
//     const testDetailApiResponse = {
//         "data": testDetails,
//         "error": null,
//         "meta": {
//             "status": "success"
//         }
//     }
//
//     it('Should exist',() => {
//         expect(Test).toExist();
//         expect(Test).toNotEqual({});
//     });
//
//     it('Should extend runscope', () => {
//         var b = new Test(undefined, undefined, undefined);
//         expect(b instanceof Runscope).toBe(true);
//     });
//
//     it('Should generate /buckets/id/tests/id url', () => {
//         var tid = uuid();
//         var bid = uuid();
//         var b = new Test(undefined, bid, tid);
//         expect(b.generateTestDetailUrl()).toEqual(`/buckets/${bid}/tests/${tid}`);
//     });
//
//     it('Should call instance with correct URL for /buckets/id/tests/id', () => {
//         var tid = uuid();
//         var bid = uuid();
//         var b = new Test(undefined, bid, tid);
//
//         var instance = {get: function(){}};
//         sinon.stub(instance, 'get', function(url) {
//             return new Promise((acc, rej) => {
//                 expect(url).toEqual(`/buckets/${bid}/tests/${tid}`);
//             });
//         });
//
//         b.instance = instance;
//         b.testDetail();
//     });
//
//     it('Should return  promise for /buckets/id/tests/id', () => {
//         var instance = {get: function(){}};
//         sinon.stub(instance, 'get', function() {
//             return new Promise((acc, rej) => {
//                 acc(testDetailApiResponse);
//             });
//         })
//         var b = new Test(undefined, undefined, undefined);
//         b.instance = instance;
//         var a = b.testDetail();
//         expect(a.then).toNotBe(undefined);
//     });
//
//     it('Should reject  promise for /buckets/id/tests/id url', () => {
//         var instance = {get: function(){}};
//         var id = uuid();
//         sinon.stub(instance, 'get', function() {
//             return new Promise((acc, rej) => {
//                 rej(id);
//             });
//         } )
//         var b = new Test(undefined, undefined, undefined);
//         b.instance = instance;
//         b.testDetail()
//         .then(
//             (data) => {expect(0).toBe(1);},
//             (err) => {expect(err).toEqual(id);}
//         );
//     });
//
//     it('Should resolve promise for /buckets/id/tests/id url', () => {
//         var instance = {get: function(){}};
//         var id = uuid();
//         sinon.stub(instance, 'get', function() {
//             return new Promise((acc, rej) => {
//                 acc(testDetailApiResponse);
//             });
//         } )
//         var b = new Test(undefined, undefined, undefined);
//         b.instance = instance;
//         b.testDetail()
//         .then(
//             (data) => {expect(data).toEqual(testDetails);},
//             (err) => {expect(0).toBe(1);}
//         );
//     });
//
//     it('Should modify this.data for /buckets/id/tests/id url', () => {
//         var instance = {get: function(){}};
//         var id = uuid();
//         sinon.stub(instance, 'get', function() {
//             return new Promise((acc, rej) => {
//                 acc(testDetailApiResponse);
//             });
//         } )
//         var b = new Test(undefined, undefined, undefined);
//         b.instance = instance;
//         b.testDetail()
//         .then(
//             (data) => {
//                 expect(b.data).toEqual(testDetails);
//             },
//             (err) => {expect(0).toBe(1);}
//         );
//     });
// });
