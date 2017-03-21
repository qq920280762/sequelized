var express      = require('express');
var router       = express.Router();
var config       = require('../config');
var utils        = require('../utils');
var cache        = require('../utils/cacheSessionUtils');
var services     = require('../services');
var adminService = services.admin;


//用户登陆
router.post('/login', userLogin);
//用户登出
router.get('/logout', userLogout);
//用户注册
router.post('/register', userRegister);


/**
 * 用户登陆
 *
 * ---- 登录后,接下来的每次访问,
 *      req都会自动绑上 `req.tokenId`
 *      和 `req.accountInfo`;
 *
 *      ---- 描述 req.accountInfo 的 keys :
 *      [
 *         userId,account,ipAddress,deviceType,loginTime
 *       ]
 *
 * @param req
 * @param res
 * @param next
 */
function userLogin(req, res, next) {
    var account    = req.body.account;
    var password   = req.body.pwd;
    res.locals.msg = "";
    if (!account || !password) {
        return res.render('user/login', {msg: '账号或密码不能为空'});
    }
    //实例化
    let accountSv = new adminService.accountService();

    accountSv.getOne({password: utils.md5(password), $or: {cellphone: account, accountNo: account,email: account}})
        .then((result) => {
            if (!result) {
                res.render('user/login', {msg: '用户名或密码错误'});
                return Promise.reject("normal");
            }
            if (!result.dataValues.id) {
                res.render('user/login', {msg: '此账号暂时无法登陆'});
                return Promise.reject("normal");
            }
            //更新登陆时间/登录IP/登录设备类型
            let updateParams = {loginTime: new Date(), ipAddress: req.ipAddress, deviceType: '0'};
            let whereParams  = {id: result.id};
            accountSv.updateByParams(updateParams, whereParams);

            //返回用户信息
            let usrInfo = {};

            usrInfo[config.userCache.key_name] = result.id;
            usrInfo.account                    = result.accountNo;
            usrInfo.ipAddress                  = result.ipAddress;
            usrInfo.deviceType                 = result.deviceType;
            usrInfo.signature                  = result.signature;
            usrInfo.sex                        = result.sex;
            usrInfo.nickname                   = result.nickname;
            usrInfo.loginTime                  = new Date(result.loginTime).format('yyyy年MM月dd日 hh:mm:ss');

            usrInfo[config.userCache.sign_name] = utils.sign(usrInfo);
            req.session.user  = usrInfo;
            res.cookie(config.userCache.name, usrInfo, config.cookie);
            res.redirect('/index');
        })
        .catch(function (ex) {
            if (ex != "normal") {
                console.error(ex);
                res.render('user/login', {msg: '获取用户信息失败'});
            }
        });
}


/**
 * 用户登出
 * @param req
 * @param res
 * @param next
 */
function userLogout(req, res, next) {
    if (req[config.userCache.name]) {
        if(req.cookies && req.cookies[config.userCache.name]){
            req.session.destroy();
            res.cookie(config.userCache.name, '', {maxAge: -1});
        }
        if (config.session.useRedis) {
            cache.session.del((config.session.server.prefix || 'sess:') + req[config.session.name]);
        }
    }
    res.redirect('/');
}


function userRegister (req,res,next){
    var email    = req.body.email;
    var password   = req.body.pwd;
    res.locals.msg = "";
    if (!email || !password) {
        return res.render('user/login', {msg: '邮箱或密码不能为空'});
    }
    //实例化
    let accountSv = new adminService.accountService();

    //返回用户信息
    let usrInfo = {};

    accountSv.getOne({$or:{email:email,accountNo:email}})
    .then(function(result){
        if(!result){
            return accountSv.createEntity({password:utils.md5(password),email:email,accountNo:email});
        }else{
            res.render('user/register',{msg:'邮箱已注册'});
            return Promise.reject('normal');
        }
    })
    .then(function(result){
        if(result){
            //res.render('user/login')
            usrInfo[config.userCache.key_name] = result.id;
            usrInfo.account                    = result.accountNo;
            usrInfo.ipAddress                  = result.ipAddress;
            usrInfo.deviceType                 = result.deviceType;
            usrInfo.signature                  = result.signature;
            usrInfo.sex                        = result.sex;
            usrInfo.nickname                   = result.nickname;
            usrInfo.loginTime                  = new Date(result.loginTime).format('yyyy年MM月dd日 hh:mm:ss');
            usrInfo[config.userCache.sign_name] = utils.sign(usrInfo);

            //更新登陆时间/登录IP/登录设备类型
            let updateParams = {loginTime: new Date(), ipAddress: req.ipAddress, deviceType: '0'};
            let whereParams  = {id: result.id};
            return accountSv.updateByParams(updateParams, whereParams);

        }else{
            res.render('user/register',{msg:'注册失败'});
            return Promise.reject('normal');
        }
    })
    .then(function(result){
        if(result){
            req.session.user  = usrInfo;
            res.cookie(config.userCache.name, usrInfo, config.cookie);
            res.redirect('/index');
        }else{
            res.render('user/login',{msg:'登录失败'});
            return Promise.reject('normal');
        }

    })
    .catch(function(err){
        if(!(err==='normal')){
            console.log(err);
            res.render('user/register',{msg:'数据异常'});
        }

    });

}


module.exports = router;
