var Runscope = require('../lib/runscope.js');

class Bucket extends Runscope {
    constructor(token, bucket_key){
        super(token);
        this.bucketKey = bucket_key;
        this.bucketName = undefined;
        this.data = undefined;
    }

    getBucketListUrl(){
        return "/buckets";
    }

    bucketList(){
        return new Promise((acc, rej) => {
            this.get(this.getBucketListUrl())
            .then((resp) => {
                acc(resp.data);
            },
            (err) => {
                rej(err);
            });
        });
    }

    getBucketDetailsUrl(bucketKey){
        return this.getBucketListUrl() + `/${bucketKey}`;
    }

    bucketDetails(bucketKey){
        this.bucketKey = bucketKey;
        return new Promise((acc, rej) => {

            this.get(this.getBucketDetailsUrl(bucketKey))
            .then((data) => {
                this.bucketName = data.data.name;
                this.data = data.data;
                acc(data.data);
            }, (err) => {
                rej(err);
            });
        });
    }
}

module.exports = Bucket;
