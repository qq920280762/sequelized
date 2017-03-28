'use strict';

const admin = require('./admin');
const auser = require('./auser');

console.info('loading model...');

module.exports = {
    admin: admin,
    auser: auser
}