'use strict';
const crypto = require("crypto");
const config = require("../config");

/**
 * 时间对象的格式化
 */
Date.prototype.format = function (fmt) {
    var o = {
        "M{1,2}": this.getMonth() + 1, //月份
        "d{1,2}": this.getDate(), //日
        "h{1,2}": this.getHours(), //小时
        "m{1,2}": this.getMinutes(), //分
        "s{1,2}": this.getSeconds(), //秒
        "q{1,2}": Math.floor((this.getMonth() + 3) / 3), //季度
        "S{1,3}": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) {
            var v = o[k] + '';
            while (v.length < RegExp.$1.length) {
                v = '0' + v;
            }
            fmt = fmt.replace(RegExp.$1, v);
            /*fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)
             ? (o[k])
             : (("00" + o[k]).substr(("" + o[k]).length)));*/
        }
    return fmt;
};

function getLogTime() {
    return new Date().format('yyyy-MM-dd hh:mm:ss:SSS');
}

function md5(str) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    //noinspection JSUnresolvedFunction
    str = md5sum.digest('hex');
    return str;
}

function getUUID() {
    var uuid = '';
    for (var i = 0; i < 4; i++) {
        uuid += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return uuid;
}

/**
 * 通用加密
 * @param options ( default: config.encryption )
 *      - description: { algorithm:'md5/sha1/aes ',content:'待加密内容 ',key:'salt值,-1为不加salt',charset:'utf8' }
 * @returns {*}
 */
function encryption(options) {
    var algorithm = config.encryption.algorithm;
    var content   = getUUID();
    var key       = config.encryption.key;
    var charset   = config.encryption.charset;
    if (options) {
        if (options.algorithm) {
            algorithm = options.algorithm;
        }
        if (options.content) {
            content = options.content.toString();
        }
        if (options.key) {
            if (options.key == -1) {
                key = '';
            }
            else {
                key = options.key;
            }
        }
        if (options.charset) {
            charset = options.charset;
        }

    }
    return crypto.createHash(algorithm, key).update(content, charset).digest('hex');
};

/**
 * 签名 (按非空的key的ASCII码倒序)
 * @param options
 * @param exclude
 * @returns {string}
 */
function sign(options, exclude = []) {
    var keys  = Object.keys(options),
        sigin = '';
    keys.sort();
    keys.reverse();
    keys.forEach(function (key) {
        if (exclude.indexOf(key) < 0) {
            sigin += '&' + key + '=' + options[key].toString().trim();
        }
    });
    sigin = encryption({content: sigin.substr(1)});
    return sigin;
};

/**
 * 隐藏文本过长字符
 */
function hideTextInfo(context, length) {
    if (context) {
        if (context.length >= length) {
            var subStr = context.substring(0, length);
            return subStr + "...";
        }
        else {
            return context;
        }
    }
    else {
        return null;
    }
}

/**
 * 排序
 * @param key
 * @param desc
 * @returns {Function}
 */
function keyDesc(key, desc) {
    return function (a, b) {
        return desc ? (a[key] > b[key] ? -1 : a[key] == b[key] ? 0 : 1) : (a[key] > b[key] ? 1 : a[key] == b[key] ? 0 : -1);
    }
}

function getIpAddress(req) {
    if (!req) {
        return '';
    }
    var ipAddress = (req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket || {}).remoteAddress || '').replace('::ffff:', '');
    if (ipAddress.indexOf("::1") > -1) {
        ipAddress = "172.0.0.1";
    }
    return ipAddress;
};


function treesEncode(data, pid) {
    var trees = [], temp;
    for (var i in data) {
        if (data[i].pid == pid) {
            trees.push(data[i]);
            temp = treesEncode(data, data[i].id);
            if (temp.length > 0) {
                data[i].children = temp;
            }
        }
    }
    return trees;
}


function treesDecode(trees) {
    var result = [];
    for (var i in trees) {
        var one = {},tree = trees[i];
        for (var k in tree) {
            if ('children' != k) {
                one[k] = tree[k];
            }
        }
        result.push(one);
        if (tree.children) {
            result.concat(tree.children);
        }
    }

    return result;
}

module.exports.getLogTime   = getLogTime;
module.exports.hideTextInfo = hideTextInfo;
module.exports.getIpAddress = getIpAddress;
module.exports.getUUID      = getUUID;
module.exports.encryption   = encryption;
module.exports.sign         = sign;
module.exports.md5          = md5;
module.exports.keyDesc      = keyDesc;
module.exports.treesEncode  = treesEncode;
module.exports.treesDecode  = treesDecode;