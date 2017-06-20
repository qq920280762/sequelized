'use strict';
require('./logTemplate');//(部署splunk系统,管理日志)
const express = require('express');
const cors = require('cors');
const path    = require('path');
const favicon = require('serve-favicon');
//const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');

const session       = require('express-session');
const redisStore    = require('connect-redis')(session);
//const logTemplate   = require('./logTemplate');
const sessionFilter = require('./sessionFilter');
const config        = require('./config');
const utils         = require('./utils');
const Cache         = require('./utils/cache');
//初始化自动缓存工具
const autoCache = new Cache({
    showUpdateLog: true,
    store        : null //缺省值为内存 new Cache.RedisStore(config.cache)
});


const index = require('./routes/index');

const app = express();

// view engine setup
//设置引擎模板 ejs
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
//设置引擎模板html
app.set('views', path.join(__dirname, 'views'));
app.engine("html",require("ejs").__express);
app.set('view engine', 'html');
//替换ejs模板标签中'%'为'$' , eg.: '<$locals.title$>'
//require('ejs').delimiter = '$';

//定义网站的ICON图标
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//日志格式 : dev格式
//app.use(logger('dev'));
//自定义日志格式
//app.use(logTemplate);
//请求参数处理
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//cookie解析
app.use(cookieParser());
//静态资源路由
app.use(express.static(path.join(__dirname, 'public')));
//跨域
app.use(cors());
//拦截器
app.use(sessionFilter);

//session 转存
if (config.session.useRedis) {
    app.use(session({
        genid            : function (req) {
            return req[config.session.name];
        },
        name             : config.session.name,
        secret           : utils.encryption({
            content: config.session.secret
        }),
        resave           : config.session.resave,
        rolling          : config.session.rolling,
        saveUninitialized: config.session.saveUninitialized,
        cookie           : config.cookie,
        store            : new redisStore(config.session.server)
    }));
}
else {
    app.use(session({
        genid            : function (req) {
            return req[config.session.name];
        },
        name             : config.session.name,
        secret           : utils.encryption({
            content: config.session.secret
        }),
        resave           : config.session.resave,
        rolling          : config.session.rolling,
        saveUninitialized: config.session.saveUninitialized,
        cookie           : config.cookie
    }));
}

//将用户数据响应到页面
app.all('*', function (req, res, next) {
    res.locals.SESSION = req.session;
    res.locals.CDN     = config.CDN;
    next();
});

app.use('/', index);

// 404或转发错误处理
app.use(function (req, res, next) {
    const err    = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 错误处理
app.use(function (err, req, res, next) {
    // console.error(req.method+' '+req.url + ' '+err.stack + '\n');
    // set locals, only providing error in development
    res.locals.SESSION = req.session;
    res.locals.CDN     = config.CDN;
    res.locals.message = req.app.get('env') === 'development' ? err.message : 'invited fail';
    res.locals.error   = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
