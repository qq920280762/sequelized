'use strict';
//const express = require('express');
//const logger  = require('morgan');
const utils   = require('./utils');
//const logs    = express();

let getTime = function () {
    return '[' + utils.getLogTime() + ']::::\t'
};

//logger.token('nowTime', function () {
//    return getTime();
//});
//logger.token('ipAddress', function (req) {
//    return utils.getIpAddress(req);
//});
//logger.format('self', '\x1b[29m[ :nowTime ] \x1b[34m:ipAddress \x1b[33m:method \x1b[0m:url \x1b[36m:status \x1b[33m:response-time \x1b[0mms');
//
//logs.use(logger('self'));

let oLog   = console.log;
let oError = console.error;
let oWarn  = console.warn;
let oInfo  = console.info;
let oTrace = console.trace;


let log = function () {
    let args = [getTime()];
    for (let k in arguments) {
        if (arguments[k] instanceof Error) {
            args.push(arguments[k]);
        }
        else if (arguments[k] instanceof Object) {
            args.push(JSON.stringify(arguments[k]));
        }
        else {
            args.push(arguments[k]);
        }
    }
    oLog.apply(null, args);
};

let warn  = function () {
    let args = [getTime()];
    for (let k in arguments) {
        if (arguments[k] instanceof Error) {
            args.push(arguments[k]);
        }
        else if (arguments[k] instanceof Object) {
            args.push(JSON.stringify(arguments[k]));
        }
        else {
            args.push(arguments[k]);
        }
    }
    oWarn.apply(null, args);
};
let error = function () {
    let args = [getTime()];
    for (let k in arguments) {
        if (arguments[k] instanceof Error) {
            args.push(arguments[k]);
        }
        else if (arguments[k] instanceof Object) {
            args.push(JSON.stringify(arguments[k]));
        }
        else {
            args.push(arguments[k]);
        }
    }
    oError.apply(null, args);
};

let info = function () {
    let args = [getTime()];
    for (let k in arguments) {
        if (arguments[k] instanceof Error) {
            args.push(arguments[k]);
        }
        else if (arguments[k] instanceof Object) {
            args.push(JSON.stringify(arguments[k]));
        }
        else {
            args.push(arguments[k]);
        }
    }
    oInfo.apply(null, args);
};

let trace     = function () {
    let args = [getTime()];
    for (let k in arguments) {
        if (arguments[k] instanceof Error) {
            args.push(arguments[k]);
        }
        else if (arguments[k] instanceof Object) {
            args.push(JSON.stringify(arguments[k]));
        }
        else {
            args.push(arguments[k]);
        }
    }
    oTrace.apply(null, args);
};
console.log   = log;
console.info  = info;
console.trace = trace;
console.warn  = warn;
console.error = error;

//module.exports = logs;
