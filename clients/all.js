const req = require('app-root-path').require;

module.exports = {
    Account: req('clients/account.js'),
    Bucket: req('clients/bucket.js'),
    Team: req('clients/team.js'),
    Test: req('clients/test.js')
}
