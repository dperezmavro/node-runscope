var Runscope = require('../lib/runscope.js');

class Account extends Runscope {
    constructor(token){
        super(token);
        this.data = undefined;
    }

    getAccountUrl(){
        return '/account';
    }

    accountResource(){
        return new Promise((acc, rej) => {
            this.get(this.getAccountUrl())
            .then((data) => {
                this.data = data.data;
                acc(data.data);
            },
            (err) => {
                rej(err);
            });
        });
    }
}

module.exports = Account;
