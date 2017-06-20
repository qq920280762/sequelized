'use strict';

const Sequelize = require('sequelize');
const config    = require('../dbSource');

module.exports.admindb = new Sequelize(
    config.admindb.database,
    config.admindb.user,
    config.admindb.password,
    config.admindb.properties
);


module.exports.userdb = new Sequelize(
    config.userdb.database,
    config.userdb.user,
    config.userdb.password,
    config.userdb.properties
);