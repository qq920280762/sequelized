'use strict'
const redis         = require('redis');
const config        = require('../config');
const sessionClient = redis.createClient(config.session.server.port, config.session.server.host, {
    'auth_pass': config.session.server.pass,
    'db'       : config.session.server.db
});

module.exports.session = sessionClient;