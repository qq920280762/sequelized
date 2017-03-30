'use strict';
const express = require('express');
const router = express.Router();
const config = require('../../config')

const menus = require('./menus');
const buttons = require('./buttons');
const applications = require('./applications');
const privileges = require('./privileges');
const users = require('./users');
const roles = require('./roles');


/**
 * 验证登录
 */
router.all('*',function(req,res,next){
    if (!req[config.userCache.name] || !req[config.userCache.name][config.userCache.key_name]) {
        res.redirect('/index');
    }else{
        req.userId = req[config.userCache.name][config.userCache.key_name];
        next();
    }
})
router.use('/menus',menus);
router.use('/buttons',buttons);
router.use('/applications',applications);
router.use('/privileges',privileges);
router.use('/users',users);
router.use('/roles',roles);

module.exports = router;