const req = require('app-root-path').require;

var Runscope = req('lib/runscope.js');

class Environment extends Runscope {
    constructor(token, bucket_key, test_id){
        super(token);
        this.bucketKey = bucket_key;
        this.bucketName = undefined;
        this.testList = undefined;
    }

    generateListEnvironmentsUrl(tid){
        return `/buckets/${this.bucketKey}/tests/${tid}/environments`;
    }

    /**
    *   @see https://www.runscope.com/docs/api/environments#list
    */
    listEnvironments(testId){
        return new Promise((acc, rej) => {
            this.get(this.generateListEnvironmentsUrl(testId))
            .then(
                (data) => {
                    acc(data.data);
                },
                rej
            );
        });
    }

    generateListSharedEnvironmentsUrl(){
        return `/buckets/${this.bucketKey}/environments`;
    }

    /**
    * @see https://www.runscope.com/docs/api/environments#list-shared
    */
    listSharedEnvironments(){
        return new Promise((acc, rej) => {
            this.get(this.generateListSharedEnvironmentsUrl())
            .then(
                (data) => {
                    acc(data.data);
                },
                rej
            );
        });
    }
}

module.exports = Environment;
