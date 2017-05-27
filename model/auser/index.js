'use strict';
var orm    = require('../orm');
var config = require('../../config');

module.exports.Person = orm.auserdb.import('Person');
if (config.model.isSynchronized) {
    this.Person.sync({force: config.model.mustCreate})
        .catch(function (e) {
            console.error(e);
        });
}
module.exports.RegisterLogs = orm.auserdb.import('RegisterLogs');
if (config.model.isSynchronized) {
    this.RegisterLogs.sync({force: config.model.mustCreate})
        .catch(function (e) {
            console.error(e);
        });
}
