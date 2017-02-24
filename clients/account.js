var Runscope = require('../lib/runscope.js');

class Account extends Runscope {
    constructor(token){
        super(token);
    }

    getAccountUrl(){
        return '/account';
    }

    accountResource(){
        return this.get(this.getAccountUrl());
    }
}

module.exports = Account;
