var Runscope = require('../lib/runscope.js');

class Bucket extends Runscope {
    constructor(token, bucket_key){
        super(token);
        this.bucket_key = bucket_key;
    }

    getBucketListUrl(){
        return "/buckets";
    }

    bucketList(){
        return this.get(this.getBucketListUrl());
    }

    getBucketDetailsUrl(bucketKey){
        return this.getBucketListUrl() + `/${bucketKey}`;
    }
}

module.exports = Bucket;
