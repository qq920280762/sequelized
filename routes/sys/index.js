'use strict';
const express = require('express');
const router = express.Router();

const menus = require('./menus');
const buttons = require('./buttons');
const applications = require('./applications');
const privileges = require('./privileges');
const users = require('./users');


router.use('/menus',menus);
router.use('/buttons',buttons);
router.use('/applications',applications);
router.use('/privileges',privileges);
router.use('/users',users);

module.exports = router;