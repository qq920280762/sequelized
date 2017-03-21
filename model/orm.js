'use strict';

const Sequelize = require('sequelize');
const config    = require('../dbSource');


module.exports.admindb = new Sequelize(
    config.admindb.database,
    config.admindb.user,
    config.admindb.password,
    config.admindb.properties
);


module.exports.auserdb = new Sequelize(
    config.auserdb.database,
    config.auserdb.user,
    config.auserdb.password,
    config.auserdb.properties
);