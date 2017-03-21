'use strict';
const express           = require('express');
const logger            = require('morgan');
const fileStreamRotator = require('file-stream-rotator');
const path              = require('path');
const fs                = require('fs');
const config            = require('./config');
const utils             = require('./utils');
const logs              = express();

logger.token('nowTime', function () {
    return utils.getLogTime();
});
logger.token('ipAddress', function (req) {
    return utils.getIpAddress(req);
});
logger.format('self', '\x1b[29m[ :nowTime ] \x1b[34m:ipAddress \x1b[33m:method \x1b[0m:url \x1b[36m:status \x1b[33m:response-time \x1b[0mms');

if (config.log.writeFile) {
    const logDirectory = path.join(__dirname, 'logs');
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

    const normalLogStream = fileStreamRotator.getStream({
        date_format: 'YYYYMMDD',
        filename   : path.join(logDirectory, 'normal-%DATE%.log'),
        frequency  : 'daily',
        verbose    : false
    });
    logs.use(logger('combined', {stream: normalLogStream}));
}
else {
    logs.use(logger('self'));
}
const originError = console.error;
const originLog   = console.log;
const originInfo  = console.info;
const originTrace = console.trace;
const originWarn  = console.warn;

function log(msg) {
    originLog('[ ' + utils.getLogTime() + ' ] :::: ' + msg);
}
function info(msg) {
    originInfo('[ ' + utils.getLogTime() + ' ] :::: ' + msg);
}
function trace(msg) {
    originTrace('[ ' + utils.getLogTime() + ' ] :::: ' + msg);
}

function warn(err) {
    if (typeof(err) == 'string') {
        originWarn('[ ' + utils.getLogTime() + ' ] :::: ' + err);
    }
    else if (err instanceof Error) {
        originWarn('[ ' + utils.getLogTime() + ' ] :::: ' + err.message + ' status:' + (err.status || '-') + '\n' + err.stack);
    }
}

function error(err) {
    let content = "";
    if (typeof(err) == 'string') {
        content = '[ ' + utils.getLogTime() + ' ] :::: ' + err;
    }
    else if (err instanceof Error) {
        content = '[ ' + utils.getLogTime() + ' ] :::: ' + err.message + ' status:' + (err.status || '-') + '\n' + err.stack;
    }
    originError(content);
    if (config.log.writeFile) {
        const logDirectory = path.join(__dirname, 'logs');
        fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
        const errorLogFile = fileStreamRotator.getStream({
            date_format: 'YYYYMMDD',
            filename   : path.join(logDirectory, 'error-%DATE%.log'),
            frequency  : 'daily',
            verbose    : false
        });
        errorLogFile.write(content);
    }

}
console.log    = log;
console.info   = info;
console.trace  = trace;
console.warn   = warn;
console.error  = error;
module.exports = logs;
