const req = require('app-root-path').require;

var Runscope = req('lib/runscope.js');

class Bucket extends Runscope {
    constructor(token, bucket_key){
        super(token);
        this.bucketKey = bucket_key;
        this.bucketName = undefined;
        this.data = undefined;
        this.testList = undefined;
    }

    getBucketListUrl(){
        return "/buckets";
    }

    /**
     * Get a list of buckets.
     *
     * @see [Bucket List]{@link https://www.runscope.com/docs/api/buckets#bucket-list}
     * @returns {Array} Of Bucket objects.
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
     * @returns {Object} Bucket Object.
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

    generateTestListUrl(){
        return `/buckets/${this.bucketKey}/tests`
    }
    /**
    * @see https://www.runscope.com/docs/api/tests#list
    */
    getTestList(){
        return new Promise((acc, rej) => {
            this.get(this.generateTestListUrl())
            .then(
                (data) => {
                    this.testList = data.data;
                    acc(data.data);
                },
                (err) => {
                    rej(err);
                }
            );
        })
    }
}

module.exports = Bucket;
