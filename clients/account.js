const req = require('app-root-path').require;

var Runscope = req('lib/runscope.js');

class Account extends Runscope {
    constructor(token){
        super(token);
        this.data = undefined;
    }

    getAccountUrl(){
        return '/account';
    }

    /**
    * Get the current account details.
    *
    * @see [Account Resource]{@link https://www.runscope.com/docs/api/account}
    * @returns {Object} Account object.
    */
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
