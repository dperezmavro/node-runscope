const req = require('app-root-path').require;
const expect = require('expect');
const sinon = require('sinon');
const uuid = require('uuid');

const {
  Environment,
  Runscope
} = req('index.js');

describe('Environment', () => {

  it('Should exist',() => {
    expect(Environment).toExist();
    expect(Environment).toNotEqual({});
  });

  it('Should extend runscope', () => {
    var b = new Environment(undefined, undefined, undefined);
    expect(b instanceof Runscope).toBe(true);
  });

  it('Should generate /buckets/id/tests/id/environments url', () => {
    var tid = uuid();
    var bid = uuid();
    var b = new Environment(undefined, bid);
    expect(b.generateListEnvironmentsUrl(tid)).toEqual(`/buckets/${bid}/tests/${tid}/environments`);
  });

  it('Should call instance with correct URL for /buckets/id/tests/id/environments', () => {
    var tid = uuid();
    var bid = uuid();
    var b = new Environment(undefined, bid);

    var instance = {get: function(){}};
    sinon.stub(instance, 'get', function(url) {
        return new Promise((acc, rej) => {
          expect(url).toEqual(`/buckets/${bid}/tests/${tid}/environments`);
        });
    });

    b.instance = instance;
    b.listEnvironments(tid);
  });

  it('Should return promise for /buckets/id/tests/id/environments', () => {
    var instance = {get: function(){}};
    sinon.stub(instance, 'get', function() {
        return new Promise((acc, rej) => {});
    })
    var b = new Environment(undefined, undefined);
    b.instance = instance;
    var a = b.listEnvironments(undefined);
    expect(a.then).toNotBe(undefined);
  });

  it('Should reject promise for /buckets/id/tests/id/environments url', () => {
    var instance = {get: function(){}};
    var id = uuid();
    sinon.stub(instance, 'get', function() {
        return new Promise((acc, rej) => {
          rej(id);
        });
    } )
    var b = new Environment(undefined, undefined);
    b.instance = instance;
    b.listEnvironments(undefined)
    .then(
        (data) => {expect(0).toBe(1);},
        (err) => {expect(err).toEqual(id);}
    );
  });

  it('Should resolve promise for /buckets/id/tests/id/environments url', () => {
    var instance = {get: function(){}};
    var id = uuid();
    sinon.stub(instance, 'get', function() {
        return new Promise((acc, rej) => {
          acc({data: 'foo'});
        });
    } )
    var b = new Environment(undefined, undefined);
    b.instance = instance;
    b.listEnvironments(undefined)
    .then(
        (data) => {expect(data).toEqual('foo');},
        (err) => {expect(0).toBe(1);}
    );
  });

  it('Should call instance with correct URL for listSharedEnvironments', () => {
    var tid = uuid();
    var bid = uuid();
    var b = new Environment(undefined, bid);

    var instance = {get: function(){}};
    sinon.stub(instance, 'get', function(url) {
        return new Promise((acc, rej) => {
          expect(url).toEqual(`/buckets/${bid}/environments`);
        });
    });

    b.instance = instance;
    b.listSharedEnvironments(tid);
  });

  it('Should return promise for listSharedEnvironments', () => {
    var instance = {get: function(){}};
    sinon.stub(instance, 'get', function() {
        return new Promise((acc, rej) => {});
    })
    var b = new Environment(undefined, undefined);
    b.instance = instance;
    var a = b.listSharedEnvironments();
    expect(a.then).toNotBe(undefined);
  });

  it('Should reject promise for listSharedEnvironments url', () => {
    var instance = {get: function(){}};
    var id = uuid();
    sinon.stub(instance, 'get', function() {
        return new Promise((acc, rej) => {
          rej(id);
        });
    } )
    var b = new Environment(undefined, undefined);
    b.instance = instance;
    b.listSharedEnvironments()
    .then(
        (data) => {expect(0).toBe(1);},
        (err) => {expect(err).toEqual(id);}
    );
  });

  it('Should resolve promise for listSharedEnvironments url', () => {
    var instance = {get: function(){}};
    var id = uuid();
    sinon.stub(instance, 'get', function() {
        return new Promise((acc, rej) => {
          acc({data: 'bar'});
        });
    } )
    var b = new Environment(undefined, undefined);
    b.instance = instance;
    b.listSharedEnvironments()
    .then(
        (data) => {expect(data).toEqual('bar');},
        (err) => {expect(0).toBe(1);}
    );
  });

  it('Should generate getEnvironmentDetails url', () => {
    var eid = uuid();
    var bid = uuid();
    var b = new Environment(undefined, bid);
    expect(b.generateGetEnvironmentDetailsUrl(eid)).toEqual(`/buckets/${bid}/environments/${eid}`);
  });

  it('Should call instance with correct URL for getEnvironmentDetails', () => {
    var eid = uuid();
    var bid = uuid();
    var b = new Environment(undefined, bid);

    var instance = {get: function(){}};
    sinon.stub(instance, 'get', function(url) {
        return new Promise((acc, rej) => {
          expect(url).toEqual(`/buckets/${bid}/environments/${eid}`);
        });
    });

    b.instance = instance;
    b.getEnvironmentDetails(eid);
  });

  it('Should return promise for getEnvironmentDetails', () => {
    var instance = {get: function(){}};
    sinon.stub(instance, 'get', function() {
        return new Promise((acc, rej) => {});
    })
    var b = new Environment(undefined, undefined);
    b.instance = instance;
    var a = b.getEnvironmentDetails(undefined);
    expect(a.then).toNotBe(undefined);
  });

  it('Should reject promise for getEnvironmentDetails url', () => {
    var instance = {get: function(){}};
    var id = uuid();
    sinon.stub(instance, 'get', function() {
        return new Promise((acc, rej) => {
          rej(id);
        });
    } )
    var b = new Environment(undefined, undefined);
    b.instance = instance;
    b.getEnvironmentDetails(undefined)
    .then(
        (data) => {expect(0).toBe(1);},
        (err) => {expect(err).toEqual(id);}
    );
  });

  it('Should resolve promise for getEnvironmentDetails url', () => {
    var instance = {get: function(){}};
    var id = uuid();
    sinon.stub(instance, 'get', function() {
        return new Promise((acc, rej) => {
          acc({data: 'baz'});
        });
    } )
    var b = new Environment(undefined, undefined);
    b.instance = instance;
    b.getEnvironmentDetails()
    .then(
        (data) => {expect(data).toEqual('baz');},
        (err) => {expect(0).toBe(1);}
    );
  });



  it('Should generate getEnvironmentDetails url', () => {
    var eid = uuid();
    var tid = uuid();
    var bid = uuid();
    var b = new Environment(undefined, bid);
    expect(b.generateGetEnvironmentDetailsForTestUrl(tid, eid)).toEqual(`/buckets/${bid}/tests/${tid}/environments/${eid}`);
  });

  it('Should call instance with correct URL for getEnvironmentDetailsForTest', () => {
    var eid = uuid();
    var bid = uuid();
    var tid = uuid();
    var b = new Environment(undefined, bid);

    var instance = {get: function(){}};
    sinon.stub(instance, 'get', function(url) {
        return new Promise((acc, rej) => {
          expect(url).toEqual(`/buckets/${bid}/tests/${tid}/environments/${eid}`);
        });
    });

    b.instance = instance;
    b.getEnvironmentDetailsForTest(tid, eid);
  });

  it('Should return promise for getEnvironmentDetailsForTest', () => {
    var instance = {get: function(){}};
    sinon.stub(instance, 'get', function() {
        return new Promise((acc, rej) => {});
    })
    var b = new Environment(undefined, undefined);
    b.instance = instance;
    var a = b.getEnvironmentDetailsForTest(undefined, undefined);
    expect(a.then).toNotBe(undefined);
  });

  it('Should reject promise for getEnvironmentDetailsForTest url', () => {
    var instance = {get: function(){}};
    var id = uuid();
    sinon.stub(instance, 'get', function() {
        return new Promise((acc, rej) => {
          rej(id);
        });
    } )
    var b = new Environment(undefined, undefined);
    b.instance = instance;
    b.getEnvironmentDetailsForTest(undefined, undefined)
    .then(
        (data) => {expect(0).toBe(1);},
        (err) => {expect(err).toEqual(id);}
    );
  });

  it('Should resolve promise for getEnvironmentDetailsForTest url', () => {
    var instance = {get: function(){}};
    var eid = uuid();
    var tid = uuid();
    sinon.stub(instance, 'get', function() {
        return new Promise((acc, rej) => {
          acc({data: 'baz'});
        });
    } )
    var b = new Environment(undefined, undefined);
    b.instance = instance;
    b.getEnvironmentDetailsForTest(eid, tid)
    .then(
        (data) => {expect(data).toEqual('baz');},
        (err) => {expect(0).toBe(1);}
    );
  });
});
