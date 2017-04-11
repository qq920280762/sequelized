'use strict';

const config   = require('./config');
const utils = require('./utils');
const cache    = require('./utils/cacheSessionUtils');

/**
 *  sessionId 改名为tokenId 方便单点登录~
 *  主要用 tokenId 和 signature 两个加密参数锁定一个在线用户 :
 *  --H5 规则 : cookie 带上 tokenId 和 accountInfo(里面含signature);
 *  --APP规则 : headers 带上 tokenId 和 signature
 */

module.exports = function (req, res, next) {

    /* 跨域 */

//    res.header ("Access-Control-Allow-Origin", "*");
//    res.header ("Access-Control-Allow-Headers", "X-Requested-With");
//    res.header ("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//    res.header ("X-Powered-By", ' 3.2.1');
//    res.header ("Content-Type", "application/json;charset=utf-8");

    /* 过滤 */

    first(req)
        .then(function(response){
            if(!response){
                return last(req);
            }
        })
        .then(function(){
            if (!req[config.session.name]) {
                req[config.session.name] = utils.encryption();
            }
            req.ipAddress = utils.getIpAddress(req);
            next();
        })
        .catch(function(e){
            var err    = new Error();
            err.status = 404;
            err.stack  = e;
            next(err);
        });
};

function first(req){
    return new Promise(function(resolve,reject){
        try{
            if(req.cookies){
                if(!req.cookies[config.session.name]){
                    //reject(config.session.name+' is failure');
                    resolve(false);
                }else{
                    /^s:(\w+)\..*$/.test(req.cookies[config.session.name]);
                    req[config.session.name] = RegExp.$1;
                    if (req.cookies[config.userCache.name]) {
                        const accountInfo = req.cookies[config.userCache.name];
                        if (typeof accountInfo == 'object' && utils.sign(accountInfo,[config.userCache.sign_name]) == accountInfo[config.userCache.sign_name]) {
                            req[config.userCache.sign_name] = accountInfo[config.userCache.sign_name];
                            req[config.userCache.name] = accountInfo;
                            if (req[config.session.name] != utils.encryption({content: accountInfo[config.userCache.key_name]})) {
                                cache.session.del((config.session.server.prefix || 'sess:') + req[config.session.name],function(){
                                    req[config.session.name] = utils.encryption({content: accountInfo[config.userCache.key_name]});
                                    resolve(true);
                                });
                            }else{
                                resolve(true);
                            }
                        }
                        else {
                            reject(config.userCache.key_name+' is failure');
                        }
                    }else{
                        resolve(true);
                    }
                }

            }else{
                resolve(false);
            }
        }catch(e){
            reject(e);
        }
    });
}
function last(req){
    return new Promise(function(resolve,reject){
        try{
            if(req.headers[config.session.name]){
                req[config.session.name] = req.headers[config.session.name];
                if(req.headers[config.userCache.sign_name]){
                    cache.session.get((config.session.server.prefix || 'sess:') + req[config.session.name],function(error,data){
                        if(!error&&data&&typeof data =='string'){
                            const accountInfo = JSON.parse(data)[config.userCache.name];
                            if (utils.sign(accountInfo,[config.userCache.sign_name]) == req.headers[config.userCache.sign_name]) {
                                req[config.userCache.sign_name] = req.headers[config.userCache.sign_name];
                                req[config.userCache.name] = accountInfo;
                                resolve(true);
                            }else{
                                reject(config.userCache.key_name+' is failure');
                            }
                        }else{
                            reject(config.session.name+' is failure');
                        }
                    });
                }else{
                    resolve(true);
                }
            }else{
                resolve(false);
            }
        }catch(e){
            reject(e);
        }
    });
}