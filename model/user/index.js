'use strict';
var orm    = require('../orm');
var config = require('../../config');

module.exports.Person = orm.userdb.import('Person');
if (config.model.isSynchronized) {
    this.Person.sync({force: config.model.mustCreate})
        .catch(function (e) {
            console.error(e);
        });
}
module.exports.RegisterLogs = orm.userdb.import('RegisterLogs');
if (config.model.isSynchronized) {
    this.RegisterLogs.sync({force: config.model.mustCreate})
        .catch(function (e) {
            console.error(e);
        });
}
