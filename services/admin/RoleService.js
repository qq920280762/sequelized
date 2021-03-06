'use strict';
const util = require('util');
const model = require('../../model');
const Base  = require('../BaseService');

//构造函数
function RoleService() {
    //call:在当前上下文对象中创建Base构造函数中的所有属性和方法
    Base.call(this, model.admin.Role);
}
//继承BaseDao
util.inherits(RoleService, Base);

RoleService.prototype.getAllById = function(id){
    return new Promise(function(resolve,reject){
        model.admin.Role.findAll({
                where:{
                    id:{
                        $gte:id
                    }
                },
                order:'id desc'
            })
            .then(function(results){
                resolve(results);
            })
            .catch(function(err){
                reject(err);
            });
    });
}

RoleService.prototype.getCountByPid = function(pid){
    return new Promise(function(resolve,reject){
        model.admin.Role.count({
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


module.exports = RoleService;