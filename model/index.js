'use strict';

const admin = require('./admin');
const user = require('./user');

console.log('loading model...');

module.exports = {
    admin: admin,
    user: user
}