
//是否微信浏览器
function is_weixin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    }
    else {
        return false;
    }
}

//是否是iOS端
function is_ios() {
    var ua = window.navigator.userAgent;
    if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        return true;
    }
    else {
        return false;
    }
}

//是否是Android端
function is_android() {
    var ua = window.navigator.userAgent;
    if (ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1) {
        return true;
    }
    else {
        return false;
    }
}

//模板引擎
function nano(template, data) {
    return template.replace(/\{([\w\.]*)\}/g, function (str, key) {
        var keys = key.split("."), v = data[keys.shift()];
        for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
        return (typeof v !== "undefined" && v !== null) ? v : "";
    });
};

//字节单位转换
function bytesToSize(bytes) {
    if (bytes === 0) return '0 B';

    var k = 1024;

    var sizes = ['B', 'K', 'M', 'G', 'T', 'P', 'EB', 'ZB', 'YB'];

    i = Math.floor(Math.log(bytes) / Math.log(k));

    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    //toPrecision(3) 后面保留一位小数，如1.0GB                                                                                                                  //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

//获取浏览器地址参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r   = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
}

//时间对象的格式化
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

//修改jQuery的默认$
var $$ = jQuery.noConflict();

//jQuery tmpl 中用来格式化日期
function formatDate(datevalue, formatter) {
    return new Date(datevalue).format(formatter);
}


/**
 * 获取浏览器唯一标识
 * @param domain
 */
function getUUID(domain) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext("2d");
    var txt = domain;
    var bin2hex = function(s) {
        var i, l, o = '',
            n;

        s += '';

        for (i = 0, l = s.length; i < l; i++) {
            n = s.charCodeAt(i)
                .toString(16);
            o += n.length < 2 ? '0' + n : n;
        }

        return o;
    }
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.textBaseline = "tencent";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125,1,62,20);
    ctx.fillStyle = "#069";
    ctx.fillText(txt, 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText(txt, 4, 17);

    var b64 = canvas.toDataURL().replace("data:image/png;base64,","");
    var bin = atob(b64);
    var crc = bin2hex(bin.slice(-16,-12));
    return crc;
}


//收集pv数据
(function(){
    var href = window.location.host + window.location.pathname;
    var channel = getQueryString("bdcid");
    var uuid = getUUID(href);
    //来源
    var from = 0,
        browser = 0;//O:PC 1:ISO 2:ANDROID
    if (is_weixin()) {
        from = 1; //微信
    }
    if(is_android()){
        browser = 2;
    }else if (is_ios()) {
        browser = 1; //iOS
    }
    $$.post('/pv/collect', {href: href, channel: channel, from: from, browser: browser,uuid:uuid});
})();