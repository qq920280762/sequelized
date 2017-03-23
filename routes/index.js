'use strict';
var express      = require('express');
var router       = express.Router();
var services     = require('../services');
var config       = require('../config');
var adminService = services.admin;


const users = require('./users');
const sys = require('./sys');

router.use('/users', users);
router.use('/sys', sys);


/**
 * 进入首页
 */
router.get('/index',get_login);
/**
 * 进入登录页
 */
router.get('/login', get_login);

function get_login(req, res, next) {
    if (req[config.userCache.name]) {
        res.redirect('/');
    }
    else {
        res.render('user/login');
    }
}


router.get('/register', function (req, res, next) {
    if (req[config.userCache.name]) {
        res.render('user/register');
    }
    else {
        res.render('user/register');
    }
});

router.get('/', function (req, res, next) {
    if (req[config.userCache.name]) {
        var accountSv = new adminService.accountService();
        accountSv.getOne({id: req[config.userCache.name][config.userCache.key_name]})
            .then(function (results) {
                if (results) {
                    res.render('index');
                }
                else {
                    res.render('user/login', {msg: '用户数据丢失!'});
                }

            })
            .catch(function (err) {
                console.error(err);
                res.render('user/login', {msg: '获取用户信息异常!'});
            });
    }
    else {
        res.redirect('/index');
    }
});

module.exports = router;
