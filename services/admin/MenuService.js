'use strict';
const util = require('util');
const model = require('../../model');
const Base  = require('../BaseDao');

//构造函数
function MenuService() {
    //call:在当前上下文对象中创建Base构造函数中的所有属性和方法
    Base.call(this, model.admin.Menu);
}
//继承BaseDao
util.inherits(MenuService, Base);

MenuService.prototype.getAllByIdsAndAppIds = function(appIds,ids){
    return new Promise(function(resolve,reject){
        model.admin.Menu.findAll({
            where:{
                applicationId:{$in:appIds},
                id:{$in:ids}
            }
        })
        .then(function(results){
            resolve(results);
        })
        .catch(function(err){
            reject(err);
        })
    });
}
MenuService.prototype.getCountByPid = function(pid){
    return new Promise(function(resolve,reject){
        model.admin.Menu.count({
                where:{
                    pid:pid
                }
            })
            .then(function(results){
                resolve(results);
            })
            .catch(function(err){
                reject(err);
            })
    });
}

module.exports = MenuService;