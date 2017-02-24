var Runscope = require('../lib/runscope.js');

class Bucket extends Runscope {
    constructor(token, bucket_key){
        super(token);
        this.bucketKey = bucket_key;
        this.bucketName = undefined;
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

    bucketDetails(bucketKey){
        this.bucketKey = bucketKey;
        return this.get(this.getBucketDetailsUrl(bucketKey));
    }
}

module.exports = Bucket;
