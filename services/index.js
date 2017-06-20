'use strict';

var  admin = require('./admin');
var  user = require('./user');

console.info('loading services...');

module.exports = {
    admin:admin,
    user:user
}