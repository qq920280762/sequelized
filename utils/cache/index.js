'use strict';

const autoCache = require('./lib');

module.exports            = autoCache;
module.exports.RedisStore = require('./lib/stores/redis');