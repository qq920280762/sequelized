var express      = require('express');
var router       = express.Router();
var services     = require('../services');
var config       = require('../config');
var adminService = services.admin;


const users = require('./users');
router.use('/users', users);

/* GET home page. */

router.get('/index', function (req, res, next) {
    if (req[config.userCache.name]) {
        res.redirect('/');
    }
    else {
        res.render('user/login');
    }
});

router.get('/login', function (req, res, next) {
    if (req[config.userCache.name]) {
        res.redirect('/');
    }
    else {
        res.render('user/login');
    }
});

router.get('/register', function (req, res, next) {
    if (req[config.userCache.name]) {
        res.redirect('/');
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
