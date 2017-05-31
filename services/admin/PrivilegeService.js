'use strict';
const util = require('util');
const model = require('../../model');
const Base  = require('../BaseService');

//构造函数
function PrivilegeService() {
    //call:在当前上下文对象中创建Base构造函数中的所有属性和方法
    Base.call(this, model.admin.Privilege);
}
//继承BaseDao
util.inherits(PrivilegeService, Base);

PrivilegeService.prototype.getAllByMaster = function(master,masterValues,access){
    return new Promise(function(resolve,reject){
        model.admin.Privilege.findAll({
                where:{
                    master:master,
                    masterValue:{$in:masterValues},
                    access:access
                }
            })
            .then(function(results){
                resolve(results);
            })
            .catch(function(err){
                reject(err);
            });
    });

}

module.exports = PrivilegeService;