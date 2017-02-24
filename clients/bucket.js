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

    /**
     * Get a list of buckets.
     *
     * @see [Bucket List]{@link https://www.runscope.com/docs/api/buckets#bucket-list}
     * @returns {Array} The current value of the tag.
     */
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

    /**
     * Get the details for bucketKeycurrent value of the tag.
     *
     * @param {string} bucketKey - Bucket Key to fetch
     *
     * @see [Bucket Detail]{@link https://www.runscope.com/docs/api/buckets#bucket-detail}
     * @returns {Object} The current value of the tag.
     */
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
