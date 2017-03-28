'use strict';

var  admin = require('./admin');
var  auser = require('./auser');

console.info('loading services...');

module.exports = {
    admin:admin,
    auser:auser
}