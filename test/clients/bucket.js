const expect = require('expect');
const sinon = require('sinon');
const uuid = require('uuid');

const {
  Bucket,
  Runscope
} = require('../../index.js');

describe('Bucket', () => {
  const bucketData = [
    {
        "auth_token": null,
        "default": false,
        "key": uuid(),
        "name": "Lucky Notebook",
        "team": {
          "name": "Personal Team",
          "uuid": uuid()
        },
        "verify_ssl": true
    },
    {
        "auth_token": null,
        "default": false,
        "key": uuid(),
        "auth_token": uuid(),
        "name": "Mobile Apps",
        "team": {
          "name": "Mobile Team",
          "uuid": uuid()
        },
        "verify_ssl": true
    },
  ];
  const bucketList = {
    "data": bucketData,
    "meta": {
        "status": "success"
    }
  };

  const bucketDetails = {
    "auth_token": null,
    "default": false,
    "key": uuid(),
    "name": "Mobile Apps",
    "team": {
        "name": "Mobile Team",
        "uuid": uuid()
    },
    "verify_ssl": true
  }
  const bucketDetailsResponse = {
    "data": bucketDetails,
    "meta": {
        "status": "success"
    }
  }

  const testList = [
    {
        "created_at": 1438828991,
        "created_by": {
          "email": "grace@example.com",
          "name": "Grace Hopper",
          "id": uuid()
        },
        "default_environment_id": uuid(),
        "description": "An internal API!",
        "name": "My Service",
        "id": uuid()
    }
  ]
  const testListApiResponse = {
    "data": testList,
    "error": null,
    "meta": {
        "status": "success"
    }
  }

  it('Should exist',() => {
    expect(Bucket).toExist();
    expect(Bucket).toNotEqual({});
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

  it('Should return data for /buckets', () => {
    var instance = {get: function(){}};
    sinon.stub(instance, 'get', function(url) {
        return new Promise((acc, rej) => {
          acc(bucketList);
        });
    })

    var b = new Bucket(undefined, undefined);
    b.instance = instance;
    b.bucketList()
    .then((response) => {
        expect(response).toEqual(bucketData);
    },
    (err) => {
        expect(0).toBe(1);
    });
  });

  it('Should fail for /buckets', () => {
    var instance = {get: function(){}};
    var id = uuid();
    sinon.stub(instance, 'get', function(url) {
        return new Promise((acc, rej) => {
          rej(id);
        });
    })

    var b = new Bucket(undefined, undefined);
    b.instance = instance;
    b.bucketList()
    .then((response) => {
        expect(0).toBe(1);
    },
    (err) => {
        expect(err).toBe(id);
    });
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
    sinon.stub(instance, 'get', function(url) {
        expect(url).toEqual(`/buckets/${bucketDetails.key}`);
        return new Promise((acc, rej) => {
          acc(bucketDetailsResponse);
        });
    })

    var b = new Bucket(undefined, undefined);
    b.instance = instance;
    b.bucketDetails(bucketDetails.key)
    .then((data) => {
        expect(b.bucketKey).toEqual(bucketDetails.key);
        expect(b.bucketName).toEqual(bucketDetails.name);
    });
  });

  it('Should set this.data for /buckets/<id>', () => {
    var instance = {get: function(){}};
    var id = uuid();
    var name = uuid();
    sinon.stub(instance, 'get', function(url) {
        expect(url).toEqual(`/buckets/${id}`);
        return new Promise((acc, rej) => {
          acc(bucketDetailsResponse);
        });
    })

    var b = new Bucket(undefined, undefined);
    b.instance = instance;
    b.bucketDetails(id)
    .then((data) => {
        expect(b.data).toEqual(bucketDetails);
    });
  });

  it('Should should call the failure handler for /buckets/<id>', () => {
    var instance = {get: function(){}};
    var id = uuid();
    sinon.stub(instance, 'get', function(url) {
        expect(url).toEqual(`/buckets/${id}`);
        return new Promise((acc, rej) => {
          rej(id);
        });
    })

    var b = new Bucket(undefined, undefined);
    b.instance = instance;
    b.bucketDetails(id)
    .then((data) => {
        expect(0).toBe(1);
    },
    (err) => {
        expect(err).toEqual(id);
    });
  });

  it('Should generate test list url', () => {
    var id = uuid();
    var bucket = new Bucket(undefined, id);
    expect(bucket.generateTestListUrl()).toEqual(`/buckets/${id}/tests?count=30`);

    expect(bucket.generateTestListUrl(40)).toEqual(`/buckets/${id}/tests?count=40`);
  });

  it('Should return Promise for /buckets/id/tests', () => {
    var id = uuid();
    var instance = {get: function(){}};
    sinon.stub(instance, 'get', function(url) {
        return new Promise((acc, rej) => {});
    })

    var b = new Bucket(undefined, undefined);
    b.instance = instance;
    var a = b.getTestList();
    expect(a.then).toNotBe(undefined);
  });

  it('Should reject for /buckets/id/tests', () => {
    var id = uuid();
    var instance = {get: function(){}};
    sinon.stub(instance, 'get', function(url) {
        return new Promise((acc, rej) => { rej(id); });
    })

    var b = new Bucket(undefined, undefined);
    b.instance = instance;
    b.getTestList()
    .then(
        (data) => {expect(0).toBe(1);},
        (err) => {expect(err).toEqual(id);}
    );
  });

  it('Should resolve promise for /buckets/id/tests', () => {
    var instance = {get: function(){}};
    sinon.stub(instance, 'get', function(url) {
        return new Promise((acc, rej) => { acc(testListApiResponse); });
    })

    var b = new Bucket(undefined, undefined);
    b.instance = instance;
    b.getTestList()
    .then(
        (data) => {expect(data).toEqual(testList);},
        (err) => {expect(0).toBe(1);}
    );
  });

  it('Should modify this.testList promise for /buckets/id/tests', () => {
    var instance = {get: function(){}};
    sinon.stub(instance, 'get', function(url) {
        return new Promise((acc, rej) => { acc(testListApiResponse); });
    })

    var b = new Bucket(undefined, undefined);
    b.instance = instance;
    b.getTestList()
    .then(
        (data) => {expect(b.testList).toEqual(testList);},
        (err) => {expect(0).toBe(1);}
    );
  });
});
