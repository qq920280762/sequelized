/**
 * Created by matri on 2016-12-16.
 */
'use strict';

const MemoryStore = require('./stores/memory');

let AutoCache = function (opts) {
    opts               = opts || {};
    this.store         = opts.store || new MemoryStore();
    this.defaultTTL    = opts.ttl;
    this.showUpdateLog = opts.showUpdateLog || false;
    this.i             = 0;
};

AutoCache.prototype.test = function () {
    this.i++;
    console.log(this.i);
};

AutoCache.prototype.get = function (hash, key, callback, ttl) {
    if (!hash || typeof(hash) != 'string') {
        console.error('hash must be a string value');
    }
    if (typeof(key) == 'function') {
        if(!isNaN(callback)){
            ttl = callback;
        }
        if(!isNaN(ttl)){
            ttl = ttl;
        }
        callback = key;
        key=null;

    }
    ttl = !isNaN(ttl)?ttl:this.defaultTTL;

    return new Promise((resolve, reject) => {
        this.store.get(hash, key)
            .then((response) => {
                if ((!response || !(ttl > 0) ) && typeof(callback) == 'function') {

                    callback((data) => {
                        //缓存时间无效或者待存数据无效
                        if (!(ttl > 0) || !data) {
                            if(response){
                                this.store.remove(hash, key);
                            }
                            resolve(data);
                        }else{
                            //设置缓存
                            this.store.set(hash, key, data, ttl)
                                .then((result) => {
                                    if (!!data && this.showUpdateLog) {
                                        let _key = hash;
                                        if (key) {
                                            _key += '-' + key;
                                        }
                                        console.log('update data cache:' + _key + ' ,ttl:' + ttl);
                                    }
                                    resolve(data);
                                })
                                .catch((err) => {
                                    let _key = hash;
                                    if (key) {
                                        _key += '-' + key;
                                    }
                                    console.error('set Data:' + _key + ' failed,err:' + err);
                                    resolve(data);
                                });
                        }
                    });
                }
                else {
                    resolve(response);
                }
            })
            .catch((e) => {
                reject(e);
            });
    });
};

AutoCache.prototype.set = function (key,field, data, ttl) {
    return this.store.set(key,field, data, ttl);
};

AutoCache.prototype.getAll = function (key) {
    return this.store.getAll(key);
};

AutoCache.prototype.remove = function (key,field) {
    return this.store.remove(key,field);
};

AutoCache.prototype.removeByRegex = function (regex) {
    if (!regex || regex.length === 0) {
        return;
    }
    return this.store.removeByRegex(regex);
};

AutoCache.prototype.clear = function () {
    return this.store.clear();
};

module.exports = AutoCache;