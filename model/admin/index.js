'use strict';
var orm    = require('../orm');
var path   = require('path');
var config = require('../../config');

module.exports.Account = orm.admindb.import('Account');
if (config.model.isSynchronized) {
    this.Account.sync({force: config.model.mustCreate})
        .catch(function (e) {
            console.error(e);
        });
}
module.exports.AccountRole = orm.admindb.import('AccountRole');
if (config.model.isSynchronized) {
    this.AccountRole.sync({force: config.model.mustCreate})
        .catch(function (e) {
            console.error(e);
        });
}
module.exports.Application = orm.admindb.import('Application');
if (config.model.isSynchronized) {
    this.Application.sync({force: config.model.mustCreate})
        .catch(function (e) {
            console.error(e);
        });
}
module.exports.AccountApplication = orm.admindb.import('AccountApplication');
if (config.model.isSynchronized) {
    this.AccountApplication.sync({force: config.model.mustCreate})
        .catch(function (e) {
            console.error(e);
        });
}
module.exports.Button = orm.admindb.import('Button');
if (config.model.isSynchronized) {
    this.Button.sync({force: config.model.mustCreate})
        .catch(function (e) {
            console.error(e);
        });
}
module.exports.EditLogs = orm.admindb.import('EditLogs');
if (config.model.isSynchronized) {
    this.EditLogs.sync({force: config.model.mustCreate})
        .catch(function (e) {
            console.error(e);
        });
}
module.exports.LoginLogs = orm.admindb.import('LoginLogs');
if (config.model.isSynchronized) {
    this.LoginLogs.sync({force: config.model.mustCreate})
        .catch(function (e) {
            console.error(e);
        });
}
module.exports.Menu = orm.admindb.import('Menu');
if (config.model.isSynchronized) {
    this.Menu.sync({force: config.model.mustCreate})
        .catch(function (e) {
            console.error(e);
        });
}
module.exports.Privilege = orm.admindb.import('Privilege');
if (config.model.isSynchronized) {
    this.Privilege.sync({force: config.model.mustCreate})
        .catch(function (e) {
            console.error(e);
        });
}
module.exports.Role = orm.admindb.import('Role');
if (config.model.isSynchronized) {
    this.Role.sync({force: config.model.mustCreate})
        .catch(function (e) {
            console.error(e);
        });
}